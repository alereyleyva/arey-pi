import {
  isToolCallEventType,
  type ExtensionAPI,
  type ExtensionContext,
  type ToolCallEvent,
  type ToolCallEventResult,
} from "@earendil-works/pi-coding-agent";
import { areyPiHarnessContext } from "./core.ts";

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
