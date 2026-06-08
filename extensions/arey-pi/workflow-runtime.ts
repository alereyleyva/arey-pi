import {
  isToolCallEventType,
  type ExtensionAPI,
  type ExtensionContext,
  type ToolCallEvent,
  type ToolCallEventResult,
} from "@earendil-works/pi-coding-agent";
import { areyPiHarnessContext } from "./core.ts";

function updateHarnessUi(ctx: ExtensionContext): void {
  ctx.ui.setStatus("arey-pi", ctx.ui.theme.fg("accent", "Arey Pi"));
  ctx.ui.setWidget("arey-pi-harness", [
    "Arey Pi active: harness guidance is injected on every turn.",
    "The parent agent orchestrates specialist subagents when useful.",
  ]);
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

function handleMutationGuardrails(event: ToolCallEvent, ctx: ExtensionContext): ToolCallEventResult | undefined {
  const path = editedPath(event);
  if (!path) return undefined;

  if (isSensitivePath(path)) {
    ctx.ui.notify(`Blocked write to protected path: ${path}`, "warning");
    return { block: true, reason: `Arey Pi guardrail: path is protected: ${path}` };
  }

  return undefined;
}

export function registerWorkflowRuntime(pi: ExtensionAPI): void {
  pi.on("session_start", (_event, ctx) => {
    updateHarnessUi(ctx);
  });

  pi.on("before_agent_start", (event) => ({
    message: {
      customType: "arey-pi-harness-context",
      content: areyPiHarnessContext(event.prompt),
      display: false,
      details: { source: "always-on" },
    },
  }));

  pi.on("tool_call", (event, ctx) => handleMutationGuardrails(event, ctx));
}
