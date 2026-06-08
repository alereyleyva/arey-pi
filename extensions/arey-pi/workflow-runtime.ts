import {
  isToolCallEventType,
  type ExtensionAPI,
  type ExtensionContext,
  type ToolCallEvent,
  type ToolCallEventResult,
} from "@earendil-works/pi-coding-agent";
import {
  createWorkflowState,
  detectAutoWorkflowIntent,
  workflowHarnessMessage,
  workflowMessage,
  type WorkflowState,
} from "./core.ts";

const workflowEntryType = "arey-pi-workflow";

type WorkflowEntryData = { active: WorkflowState | null };
type WorkflowStore = { active: WorkflowState | undefined };
type SessionEntry = ReturnType<ExtensionContext["sessionManager"]["getEntries"]>[number];
type CustomSessionEntry = Extract<SessionEntry, { type: "custom" }>;
type WorkflowCustomEntry = CustomSessionEntry & { customType: typeof workflowEntryType };

function activePhase(state: WorkflowState): string | undefined {
  return state.phases.find((phase) => phase.status === "active")?.id;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isWorkflowState(value: unknown): value is WorkflowState {
  if (!isObject(value)) return false;
  return (
    typeof value.id === "string" &&
    typeof value.kind === "string" &&
    typeof value.target === "string" &&
    typeof value.createdAt === "string" &&
    Array.isArray(value.phases) &&
    Array.isArray(value.guardrails)
  );
}

function isWorkflowEntryData(value: unknown): value is WorkflowEntryData {
  if (!isObject(value) || !("active" in value)) return false;
  return value.active === null || isWorkflowState(value.active);
}

function isWorkflowCustomEntry(value: unknown): value is WorkflowCustomEntry {
  return isObject(value) && value.type === "custom" && value.customType === workflowEntryType;
}

function latestPersistedWorkflow(ctx: ExtensionContext): WorkflowState | undefined {
  const entry = ctx.sessionManager.getEntries().filter(isWorkflowCustomEntry).at(-1);

  if (!entry || !isWorkflowEntryData(entry.data)) return undefined;
  return entry.data.active ?? undefined;
}

function updateWorkflowUi(state: WorkflowState | undefined, ctx: ExtensionContext): void {
  if (!state) {
    ctx.ui.setStatus("arey-pi", undefined);
    ctx.ui.setWidget("arey-pi-workflow", undefined);
    return;
  }

  const done = state.phases.filter((phase) => phase.status === "done").length;
  ctx.ui.setStatus("arey-pi", ctx.ui.theme.fg("accent", `Arey ${state.kind} ${done}/${state.phases.length}`));
  ctx.ui.setWidget(
    "arey-pi-workflow",
    state.phases.map((phase) => {
      const mark = phase.status === "done" ? "☑" : phase.status === "active" ? "▶" : "☐";
      return `${mark} ${phase.id}: ${phase.label}`;
    }),
  );
}

function persistWorkflow(pi: ExtensionAPI, state: WorkflowState | undefined): void {
  pi.appendEntry(workflowEntryType, { active: state ?? null } satisfies WorkflowEntryData);
}

function activateWorkflow(pi: ExtensionAPI, store: WorkflowStore, state: WorkflowState, ctx: ExtensionContext): void {
  store.active = state;
  persistWorkflow(pi, state);
  updateWorkflowUi(state, ctx);
}

function workflowKickoffMessage(state: WorkflowState): string {
  return [workflowHarnessMessage(state), "", workflowMessage(state.kind, state.target)].join("\n\n");
}

function isSensitivePath(path: string): boolean {
  return [".env", ".git/", "node_modules/"].some((protectedPath) => path.includes(protectedPath));
}

function isSpecOrDocPath(path: string): boolean {
  return (
    /(^|\/)(specs|docs|prompts|rules|skills|agents|templates)(\/|$)/.test(path) ||
    path.endsWith("AGENTS.md") ||
    path.endsWith("README.md")
  );
}

function isTestPath(path: string): boolean {
  return /(^|\/)(__tests__|tests?|spec)(\/|$)/.test(path) || /\.(test|spec)\.[cm]?[jt]sx?$/.test(path);
}

function shouldWarnProductionEdit(state: WorkflowState, path: string): string | undefined {
  if (isSpecOrDocPath(path) || isTestPath(path)) return undefined;

  const phase = activePhase(state);
  if (state.kind === "feature" && (phase === "scope" || phase === "specs")) {
    return "Feature workflow guardrail: production edits should wait until canonical specs are confirmed.";
  }

  if (state.kind === "feature" && phase === "red") {
    return "Feature workflow guardrail: production edits should wait until a meaningful failing Red test is observed.";
  }

  if (state.kind === "bugfix" && (phase === "reproduce" || phase === "red")) {
    return "Bugfix workflow guardrail: production edits should wait until the bug is reproduced with a failing regression test.";
  }

  return undefined;
}

function editedPath(event: ToolCallEvent): string | undefined {
  if (isToolCallEventType("write", event) || isToolCallEventType("edit", event)) {
    return event.input.path;
  }

  return undefined;
}

function handleMutationGuardrails(
  store: WorkflowStore,
  event: ToolCallEvent,
  ctx: ExtensionContext,
): ToolCallEventResult | undefined {
  const path = editedPath(event);
  if (!path) return undefined;

  if (isSensitivePath(path)) {
    ctx.ui.notify(`Blocked write to protected path: ${path}`, "warning");
    return { block: true, reason: `Arey Pi guardrail: path is protected: ${path}` };
  }

  if (!store.active) return undefined;

  const warning = shouldWarnProductionEdit(store.active, path);
  if (warning) {
    ctx.ui.notify(`${warning}\nPath: ${path}`, "warning");
  }

  return undefined;
}

export function registerWorkflowRuntime(pi: ExtensionAPI): void {
  const store: WorkflowStore = { active: undefined };

  pi.on("session_start", (_event, ctx) => {
    store.active = latestPersistedWorkflow(ctx);
    updateWorkflowUi(store.active, ctx);
  });

  pi.on("before_agent_start", (event, ctx) => {
    if (store.active) return undefined;

    const intent = detectAutoWorkflowIntent(event.prompt);
    if (!intent) return undefined;

    const state = createWorkflowState(intent.kind, intent.target);
    activateWorkflow(pi, store, state, ctx);

    return {
      message: {
        customType: "arey-pi-auto-workflow",
        content: workflowKickoffMessage(state),
        display: false,
        details: { workflow: state, source: "natural-language" },
      },
    };
  });

  pi.on("tool_call", (event, ctx) => handleMutationGuardrails(store, event, ctx));
}
