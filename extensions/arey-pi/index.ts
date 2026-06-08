import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { registerBootstrapCommands } from "./bootstrap.ts";
import { registerWorkflowRuntime } from "./workflow-runtime.ts";

export default function areyPi(pi: ExtensionAPI): void {
  registerBootstrapCommands(pi);
  registerWorkflowRuntime(pi);
}
