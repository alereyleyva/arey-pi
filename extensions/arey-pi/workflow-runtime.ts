import {
  isToolCallEventType,
  type ExtensionAPI,
  type ToolCallEvent,
  type ToolCallEventResult,
} from "@earendil-works/pi-coding-agent";
import { areyPiHarnessContext } from "./core.ts";

function isProtectedEnvPath(path: string): boolean {
  return path.split("/").some((segment) => segment === ".env" || segment.startsWith(".env."));
}

function editedPath(event: ToolCallEvent): string | undefined {
  if (isToolCallEventType("write", event) || isToolCallEventType("edit", event)) {
    return event.input.path;
  }

  return undefined;
}

function handleMutationGuardrails(event: ToolCallEvent): ToolCallEventResult | undefined {
  const path = editedPath(event);
  if (!path) return undefined;

  if (isProtectedEnvPath(path)) {
    return { block: true, reason: `Arey Pi guardrail: env file writes are protected: ${path}` };
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

  pi.on("tool_call", (event) => handleMutationGuardrails(event));
}
