import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import type { ExtensionAPI, ExtensionCommandContext } from "@earendil-works/pi-coding-agent";
import {
  buildDoctorReport,
  docsScaffoldFiles,
  parseBootstrapFlags,
  requiredAgents,
  specScaffoldFiles,
  type ScaffoldFile,
} from "./core.ts";
import { agentSourceDir, cwdFrom, dirExists, fileExists, packageRoot, rulesDir, templatesDir } from "./paths.ts";

type AgentCopyResult = { copied: string[]; skipped: string[]; missing: string[] };
type ScaffoldResult = { created: string[]; skipped: string[] };

function copyAgents(targetDir: string, force: boolean): AgentCopyResult {
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

function templateContent(name: string): string {
  return readFileSync(join(templatesDir, name), "utf8");
}

function writeTemplateIfMissing(file: ScaffoldFile, force: boolean, cwd: string, result: ScaffoldResult): void {
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

function packageVersion(): string {
  try {
    const pkg = JSON.parse(readFileSync(join(packageRoot, "package.json"), "utf8")) as { version?: string };
    return pkg.version ?? "unknown";
  } catch {
    return "unknown";
  }
}

function buildBootstrapReport(input: {
  cwd: string;
  targetDir: string;
  agents: AgentCopyResult;
  specs: ScaffoldResult;
  docs: ScaffoldResult;
  agentsMd: string;
}): string {
  const createdScaffold = [...input.specs.created, ...input.docs.created];
  const skippedScaffold = [...input.specs.skipped, ...input.docs.skipped];

  return [
    "# Arey Pi Bootstrap",
    "",
    `- Target: ${relative(input.cwd, input.targetDir)}`,
    `- Copied agents: ${input.agents.copied.length}`,
    `- Skipped existing agents: ${input.agents.skipped.length}`,
    `- Missing package agents: ${input.agents.missing.length}`,
    `- AGENTS.md: ${input.agentsMd}`,
    `- Spec scaffold created: ${input.specs.created.length}`,
    `- Spec scaffold skipped: ${input.specs.skipped.length}`,
    `- Docs scaffold created: ${input.docs.created.length}`,
    `- Docs scaffold skipped: ${input.docs.skipped.length}`,
    "",
    "## Copied agents",
    input.agents.copied.length ? input.agents.copied.map((agent) => `- ${agent}`).join("\n") : "- none",
    "",
    "## Skipped agents",
    input.agents.skipped.length ? input.agents.skipped.map((agent) => `- ${agent}`).join("\n") : "- none",
    "",
    "## Created scaffold files",
    createdScaffold.length ? createdScaffold.map((path) => `- ${path}`).join("\n") : "- none",
    "",
    "## Skipped scaffold files",
    skippedScaffold.length ? skippedScaffold.map((path) => `- ${path}`).join("\n") : "- none",
    "",
    "Run `/arey-doctor` to verify setup.",
  ].join("\n");
}

function handleDoctor(pi: ExtensionAPI, ctx: ExtensionCommandContext): void {
  const cwd = cwdFrom(ctx);
  const projectAgentDir = join(cwd, ".pi", "agents", "arey-pi");
  const commands = pi.getCommands();
  const installedAgents = requiredAgents.filter((agent) => fileExists(join(projectAgentDir, agent)));
  const missingAgents = requiredAgents.filter((agent) => !fileExists(join(projectAgentDir, agent)));
  const packageAgents = requiredAgents.filter((agent) => fileExists(join(agentSourceDir, agent)));
  const prompts = commands.filter(
    (command) => command.source === "prompt" && command.sourceInfo?.source?.includes("arey-pi"),
  );
  const skills = commands.filter(
    (command) => command.source === "skill" && command.sourceInfo?.source?.includes("arey-pi"),
  );

  pi.sendMessage({
    customType: "arey-pi-doctor",
    content: buildDoctorReport({
      packageVersion: packageVersion(),
      cwd,
      packageRulesPresent: dirExists(rulesDir),
      packageTemplatesPresent: dirExists(templatesDir),
      packageAgentsCount: packageAgents.length,
      requiredAgentsCount: requiredAgents.length,
      hasSubagentsCommand: commands.some((command) => command.name.startsWith("subagents-doctor")),
      installedAgentsCount: installedAgents.length,
      hasRootAgentsMd: fileExists(join(cwd, "AGENTS.md")),
      hasPiSettings: fileExists(join(cwd, ".pi", "settings.json")),
      promptsCount: prompts.length,
      skillsCount: skills.length,
      missingAgents,
    }),
    display: true,
    details: {},
  });
}

function handleBootstrap(pi: ExtensionAPI, args: string, ctx: ExtensionCommandContext): void {
  const cwd = cwdFrom(ctx);
  const { force, createAgentsMd, createSpecs, createDocs } = parseBootstrapFlags(args);
  const targetDir = join(cwd, ".pi", "agents", "arey-pi");
  const agents = copyAgents(targetDir, force);
  const specs = createSpecs ? scaffoldFiles(cwd, force, specScaffoldFiles) : { created: [], skipped: [] };
  const docs = createDocs ? scaffoldFiles(cwd, force, docsScaffoldFiles) : { created: [], skipped: [] };
  const agentsMdPath = join(cwd, "AGENTS.md");
  let agentsMd = "unchanged";

  if (!fileExists(agentsMdPath) && (createAgentsMd || force)) {
    writeFileSync(agentsMdPath, templateContent("AGENTS.md"));
    agentsMd = "created";
  } else if (fileExists(agentsMdPath) && createAgentsMd && !force) {
    agentsMd = "skipped existing";
  }

  pi.sendMessage({
    customType: "arey-pi-bootstrap",
    content: buildBootstrapReport({ cwd, targetDir, agents, specs, docs, agentsMd }),
    display: true,
    details: { agents, specs, docs, agentsMd },
  });
}

export function registerBootstrapCommands(pi: ExtensionAPI): void {
  pi.registerCommand("arey-doctor", {
    description: "Check Arey Pi package, project bootstrap, and subagent readiness",
    handler: (_args, ctx) => {
      handleDoctor(pi, ctx);
      return Promise.resolve();
    },
  });

  pi.registerCommand("arey-bootstrap", {
    description: "Install Arey Pi subagents and optionally scaffold specs/docs",
    handler: (args, ctx) => {
      handleBootstrap(pi, args, ctx);
      return Promise.resolve();
    },
  });
}
