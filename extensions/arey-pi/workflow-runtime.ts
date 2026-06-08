import {
  isToolCallEventType,
  type ExtensionAPI,
  type ExtensionContext,
  type ToolCallEvent,
  type ToolCallEventResult,
} from "@earendil-works/pi-coding-agent";
import { areyPiHarnessContext, shouldActivateAreyPiHarness } from "./core.ts";

const areyPiSessionEntryType = "arey-pi-session";

type HarnessSessionData = { active: boolean };
type HarnessStore = { active: boolean };
type SessionEntry = ReturnType<ExtensionContext["sessionManager"]["getEntries"]>[number];
type CustomSessionEntry = Extract<SessionEntry, { type: "custom" }>;
type HarnessCustomEntry = CustomSessionEntry & { customType: typeof areyPiSessionEntryType };

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isHarnessSessionData(value: unknown): value is HarnessSessionData {
  return isObject(value) && typeof value.active === "boolean";
}

function isHarnessCustomEntry(value: unknown): value is HarnessCustomEntry {
  return isObject(value) && value.type === "custom" && value.customType === areyPiSessionEntryType;
}

function latestHarnessSessionState(ctx: ExtensionContext): boolean {
  const entry = ctx.sessionManager.getEntries().filter(isHarnessCustomEntry).at(-1);
  return entry && isHarnessSessionData(entry.data) ? entry.data.active : false;
}

function persistHarnessState(pi: ExtensionAPI, active: boolean): void {
  pi.appendEntry(areyPiSessionEntryType, { active } satisfies HarnessSessionData);
}

function updateHarnessUi(active: boolean, ctx: ExtensionContext): void {
  ctx.ui.setStatus("arey-pi", active ? ctx.ui.theme.fg("accent", "Arey Pi") : undefined);
  ctx.ui.setWidget(
    "arey-pi-harness",
    active
      ? [
          "Arey Pi active: natural-language harness guidance is injected.",
          "The agent infers feature/bugfix/sync/review/assessment intent.",
        ]
      : undefined,
  );
}

function activateHarness(pi: ExtensionAPI, store: HarnessStore, ctx: ExtensionContext): void {
  store.active = true;
  persistHarnessState(pi, true);
  updateHarnessUi(true, ctx);
}

function isSensitivePath(path: string): boolean {
  return [".env", ".git/", "node_modules/"].some((protectedPath) => path.includes(protectedPath));
}

function editedPath(event: ToolCallEvent): string | undefined {
  if (isToolCallEventType("write", event) || isToolCallEventType("edit", event)) {
    return event.input.path;
  }

  return undefined;
}

function handleMutationGuardrails(
  store: HarnessStore,
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

  return undefined;
}

export function registerWorkflowRuntime(pi: ExtensionAPI): void {
  const store: HarnessStore = { active: false };

  pi.on("session_start", (_event, ctx) => {
    store.active = latestHarnessSessionState(ctx);
    updateHarnessUi(store.active, ctx);
  });

  pi.on("before_agent_start", (event, ctx) => {
    const requestedAreyPi = shouldActivateAreyPiHarness(event.prompt);
    if (!store.active && !requestedAreyPi) return undefined;
    if (requestedAreyPi) activateHarness(pi, store, ctx);

    return {
      message: {
        customType: "arey-pi-harness-context",
        content: areyPiHarnessContext(event.prompt),
        display: false,
        details: { source: requestedAreyPi ? "natural-language" : "active-session" },
      },
    };
  });

  pi.on("tool_call", (event, ctx) => handleMutationGuardrails(store, event, ctx));
}
