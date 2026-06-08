import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import {
  buildDoctorReport,
  docsScaffoldFiles,
  parseBootstrapFlags,
  requiredAgents,
  specScaffoldFiles,
  workflowMessage,
  type ScaffoldFile,
} from "./arey-pi-core.js";

const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const agentSourceDir = join(packageRoot, "agents");
const rulesDir = join(packageRoot, "rules");
const templatesDir = join(packageRoot, "templates");

function cwdFrom(ctx: unknown): string {
  const maybe = ctx as { cwd?: string };
  return maybe.cwd ?? process.cwd();
}

function fileExists(path: string): boolean {
  try {
    return existsSync(path) && statSync(path).isFile();
  } catch {
    return false;
  }
}

function dirExists(path: string): boolean {
  try {
    return existsSync(path) && statSync(path).isDirectory();
  } catch {
    return false;
  }
}

function copyAgents(targetDir: string, force: boolean): { copied: string[]; skipped: string[]; missing: string[] } {
  mkdirSync(targetDir, { recursive: true });

  const copied: string[] = [];
  const skipped: string[] = [];
  const missing: string[] = [];

  for (const agent of requiredAgents) {
    const source = join(agentSourceDir, agent);
    const target = join(targetDir, agent);

    if (!fileExists(source)) {
      missing.push(agent);
      continue;
    }

    if (fileExists(target) && !force) {
      skipped.push(agent);
      continue;
    }

    copyFileSync(source, target);
    copied.push(agent);
  }

  return { copied, skipped, missing };
}

type ScaffoldResult = { created: string[]; skipped: string[] };

function templateContent(name: string): string {
  return readFileSync(join(templatesDir, name), "utf8");
}

function writeTemplateIfMissing(file: ScaffoldFile, force: boolean, cwd: string, result: ScaffoldResult) {
  const target = join(cwd, file.target);
  mkdirSync(dirname(target), { recursive: true });

  if (fileExists(target) && !force) {
    result.skipped.push(file.target);
    return;
  }

  writeFileSync(target, templateContent(file.template));
  result.created.push(file.target);
}

function scaffoldFiles(cwd: string, force: boolean, files: ScaffoldFile[]): ScaffoldResult {
  const result: ScaffoldResult = { created: [], skipped: [] };

  for (const file of files) {
    writeTemplateIfMissing(file, force, cwd, result);
  }

  return result;
}

function scaffoldSpecs(cwd: string, force: boolean): ScaffoldResult {
  return scaffoldFiles(cwd, force, specScaffoldFiles);
}

function scaffoldDocs(cwd: string, force: boolean): ScaffoldResult {
  return scaffoldFiles(cwd, force, docsScaffoldFiles);
}

function starterAgentsMd(): string {
  return templateContent("AGENTS.md");
}

function sendWorkflow(
  pi: ExtensionAPI,
  args: string,
  ctx: {
    ui: { notify(message: string, level?: string): void };
    isIdle(): boolean;
  },
  kind: string,
  usage: string,
) {
  if (!args.trim()) {
    ctx.ui.notify(usage, "warning");
    return;
  }

  const message = workflowMessage(kind, args);
  if (ctx.isIdle()) {
    pi.sendUserMessage(message);
  } else {
    pi.sendUserMessage(message, { deliverAs: "followUp" });
    ctx.ui.notify("Arey Pi workflow queued as follow-up", "info");
  }
}

function packageVersion(): string {
  try {
    const pkg = JSON.parse(readFileSync(join(packageRoot, "package.json"), "utf8")) as { version?: string };
    return pkg.version ?? "unknown";
  } catch {
    return "unknown";
  }
}

export default function areyPi(pi: ExtensionAPI) {
  pi.registerCommand("arey-doctor", {
    description: "Check Arey Pi package, project bootstrap, and subagent readiness",
    handler: async (_args, ctx) => {
      const cwd = cwdFrom(ctx);
      const projectAgentDir = join(cwd, ".pi", "agents", "arey-pi");
      const commands = pi.getCommands();
      const hasSubagentsCommand = commands.some((command) => command.name.startsWith("subagents-doctor"));
      const installedAgents = requiredAgents.filter((agent) => fileExists(join(projectAgentDir, agent)));
      const missingAgents = requiredAgents.filter((agent) => !fileExists(join(projectAgentDir, agent)));
      const packageAgents = requiredAgents.filter((agent) => fileExists(join(agentSourceDir, agent)));
      const prompts = commands.filter(
        (command) => command.source === "prompt" && command.sourceInfo?.source?.includes("arey-pi"),
      );
      const skills = commands.filter(
        (command) => command.source === "skill" && command.sourceInfo?.source?.includes("arey-pi"),
      );

      const report = buildDoctorReport({
        packageVersion: packageVersion(),
        cwd,
        packageRulesPresent: dirExists(rulesDir),
        packageTemplatesPresent: dirExists(templatesDir),
        packageAgentsCount: packageAgents.length,
        requiredAgentsCount: requiredAgents.length,
        hasSubagentsCommand,
        installedAgentsCount: installedAgents.length,
        hasRootAgentsMd: fileExists(join(cwd, "AGENTS.md")),
        hasPiSettings: fileExists(join(cwd, ".pi", "settings.json")),
        promptsCount: prompts.length,
        skillsCount: skills.length,
        missingAgents,
      });

      pi.sendMessage({
        customType: "arey-pi-doctor",
        content: report,
        display: true,
        details: {},
      });
    },
  });

  pi.registerCommand("arey-bootstrap", {
    description: "Install Arey Pi subagents and optionally scaffold specs/docs",
    handler: async (args, ctx) => {
      const cwd = cwdFrom(ctx);
      const { force, createAgentsMd, createSpecs, createDocs } = parseBootstrapFlags(args);
      const targetDir = join(cwd, ".pi", "agents", "arey-pi");
      const result = copyAgents(targetDir, force);
      const specsResult = createSpecs ? scaffoldSpecs(cwd, force) : { created: [], skipped: [] };
      const docsResult = createDocs ? scaffoldDocs(cwd, force) : { created: [], skipped: [] };
      const agentsMdPath = join(cwd, "AGENTS.md");
      let agentsMdStatus = "unchanged";

      if (!fileExists(agentsMdPath) && (createAgentsMd || force)) {
        writeFileSync(agentsMdPath, starterAgentsMd());
        agentsMdStatus = "created";
      } else if (fileExists(agentsMdPath) && createAgentsMd && !force) {
        agentsMdStatus = "skipped existing";
      }

      const report = [
        "# Arey Pi Bootstrap",
        "",
        `- Target: ${relative(cwd, targetDir)}`,
        `- Copied agents: ${result.copied.length}`,
        `- Skipped existing agents: ${result.skipped.length}`,
        `- Missing package agents: ${result.missing.length}`,
        `- AGENTS.md: ${agentsMdStatus}`,
        `- Spec scaffold created: ${specsResult.created.length}`,
        `- Spec scaffold skipped: ${specsResult.skipped.length}`,
        `- Docs scaffold created: ${docsResult.created.length}`,
        `- Docs scaffold skipped: ${docsResult.skipped.length}`,
        "",
        "## Copied agents",
        result.copied.length ? result.copied.map((agent) => `- ${agent}`).join("\n") : "- none",
        "",
        "## Skipped agents",
        result.skipped.length ? result.skipped.map((agent) => `- ${agent}`).join("\n") : "- none",
        "",
        "## Created scaffold files",
        [...specsResult.created, ...docsResult.created].length
          ? [...specsResult.created, ...docsResult.created].map((path) => `- ${path}`).join("\n")
          : "- none",
        "",
        "## Skipped scaffold files",
        [...specsResult.skipped, ...docsResult.skipped].length
          ? [...specsResult.skipped, ...docsResult.skipped].map((path) => `- ${path}`).join("\n")
          : "- none",
        "",
        "Run `/arey-doctor` to verify setup.",
      ].join("\n");

      pi.sendMessage({
        customType: "arey-pi-bootstrap",
        content: report,
        display: true,
        details: { agents: result, specs: specsResult, docs: docsResult, agentsMd: agentsMdStatus },
      });
    },
  });

  pi.registerCommand("arey-feature", {
    description: "Run an Arey Pi spec-to-TDD feature workflow",
    handler: async (args, ctx) => sendWorkflow(pi, args, ctx, "feature", "Usage: /arey-feature <feature request>"),
  });

  pi.registerCommand("arey-bugfix", {
    description: "Run an Arey Pi regression-test-first bugfix workflow",
    handler: async (args, ctx) => sendWorkflow(pi, args, ctx, "bugfix", "Usage: /arey-bugfix <bug description>"),
  });

  pi.registerCommand("arey-sync", {
    description: "Run Arey Pi spec, test, code, DBML, ADR, and glossary sync",
    handler: async (args, ctx) =>
      sendWorkflow(pi, args || "the current repository", ctx, "sync", "Usage: /arey-sync [scope]"),
  });

  pi.registerCommand("arey-review", {
    description: "Run an Arey Pi adversarial engineering review",
    handler: async (args, ctx) =>
      sendWorkflow(pi, args || "the current diff", ctx, "review", "Usage: /arey-review [scope]"),
  });

  pi.registerCommand("arey-assess", {
    description: "Assess project readiness against Arey Pi rules",
    handler: async (args, ctx) =>
      sendWorkflow(pi, args || "the current repository", ctx, "assess", "Usage: /arey-assess [scope]"),
  });
}
