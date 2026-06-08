import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const agentSourceDir = join(packageRoot, "agents");
const rulesDir = join(packageRoot, "rules");
const requiredAgents = [
  "tech-lead.md",
  "spec-author.md",
  "tdd-implementer.md",
  "spec-syncer.md",
  "engineering-reviewer.md",
  "project-evaluator.md",
];

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

function writeIfMissing(path: string, content: string, force: boolean, cwd: string, result: ScaffoldResult) {
  mkdirSync(dirname(path), { recursive: true });

  if (fileExists(path) && !force) {
    result.skipped.push(relative(cwd, path));
    return;
  }

  writeFileSync(path, content);
  result.created.push(relative(cwd, path));
}

function starterSpecsReadme(): string {
  return `# Specs

This directory contains canonical Arey Pi project specifications.

Specs are durable project knowledge.
Keep them synchronised with tests, code, DBML, ADRs, glossary, architecture docs, and project documentation.
`;
}

function starterFeaturesReadme(): string {
  return `# Behaviour Specs

Write behaviour specs in Gherkin.

Use semantic line breaks in feature files and accompanying notes.
Each feature should describe externally observable behaviour, not implementation details.
`;
}

function starterDatabaseReadme(): string {
  return `# Database Specs

Database projects must keep canonical DBML specs here or document the canonical DBML location.

DBML must stay synchronised with migrations, ORM models, SQL DDL, constraints, indexes, and relationships.
`;
}

function starterArchitectureReadme(): string {
  return `# Architecture

Use this directory for durable architecture memory.

Document boundaries, integrations, ownership, constraints, and current system structure that future humans and agents need to preserve.
`;
}

function starterDecisionsReadme(): string {
  return `# Decisions

Use this directory for high-quality ADRs.

ADRs should capture meaningful technical decisions, context, options, tradeoffs, consequences, revisit conditions, and supersession relationships.
`;
}

function starterGlossary(): string {
  return `# Glossary

Use this glossary for durable domain language.

## Terms

<!--
Add terms as they become important.

Example:

### Account

Definition.

Related specs:
- specs/features/example.feature
-->
`;
}

function starterDocsReadme(): string {
  return `# Documentation

Use this directory for project-facing documentation that is not itself a canonical spec.

Keep usage, setup, commands, operations, and workflow instructions synchronised with the implementation and Arey Pi rules.
`;
}

function scaffoldSpecs(cwd: string, force: boolean): ScaffoldResult {
  const result: ScaffoldResult = { created: [], skipped: [] };

  writeIfMissing(join(cwd, "specs", "README.md"), starterSpecsReadme(), force, cwd, result);
  writeIfMissing(join(cwd, "specs", "features", "README.md"), starterFeaturesReadme(), force, cwd, result);
  writeIfMissing(join(cwd, "specs", "database", "README.md"), starterDatabaseReadme(), force, cwd, result);
  writeIfMissing(join(cwd, "specs", "architecture", "README.md"), starterArchitectureReadme(), force, cwd, result);
  writeIfMissing(join(cwd, "specs", "decisions", "README.md"), starterDecisionsReadme(), force, cwd, result);
  writeIfMissing(join(cwd, "specs", "glossary.md"), starterGlossary(), force, cwd, result);

  return result;
}

function scaffoldDocs(cwd: string, force: boolean): ScaffoldResult {
  const result: ScaffoldResult = { created: [], skipped: [] };

  writeIfMissing(join(cwd, "docs", "README.md"), starterDocsReadme(), force, cwd, result);

  return result;
}

function starterAgentsMd(): string {
  return `# Agent Instructions

This project uses Arey Pi.

## Delivery rules

- Treat canonical specs as the source of truth.
- Use Gherkin for behaviour specs.
- Use DBML for database specs when the project has persistence.
- Follow TDD for production behaviour changes.
- Keep specs, tests, code, DBML, ADRs, glossary, architecture docs, README files, docs, AGENTS.md, commands, and tooling instructions synchronised.
- Capture significant technical decisions in high-quality ADRs.
- Run formatter, lint/static analysis, typecheck, tests, and relevant dynamic analysis where available.
- Use incremental Conventional Commits for meaningful steps.

## Subagents

Project-local Arey Pi subagents live in:

\`\`\`txt
.pi/agents/arey-pi/
\`\`\`

Use them through pi-subagents when available.
`;
}

function workflowMessage(kind: string, args: string): string {
  const target = args.trim() || "the current repository/task";
  const common = `Act as the Arey Pi tech lead. Use pi-subagents when available and appropriate. Keep orchestration authority in the parent session. Follow Arey Pi rules, preserve TDD, and report evidence clearly.`;

  switch (kind) {
    case "feature":
      return `${common}\n\nRun the Arey Pi feature workflow for: ${target}\n\nExpected flow: spec-author for canonical specs, tdd-implementer for Red-Green-Refactor, spec-syncer for final alignment, and engineering-reviewer for adversarial quality review when risk warrants it.`;
    case "bugfix":
      return `${common}\n\nRun the Arey Pi bugfix workflow for: ${target}\n\nStart with a regression test that fails for the bug, then implement the minimal high-quality fix, synchronise specs, and review engineering quality.`;
    case "sync":
      return `${common}\n\nRun Arey Pi spec and documentation sync for: ${target}\n\nVerify Gherkin, tests, code, DBML, ADRs, glossary, architecture docs, README files, docs, AGENTS.md, skills, prompts, rules, agents, commands, and tooling instructions. End with both a spec status and a documentation status.`;
    case "review":
      return `${common}\n\nRun an Arey Pi engineering review for: ${target}\n\nReview architecture, code quality, test quality, quality tooling, security, privacy, operability, maintainability, and spec/ADR/DBML concerns. Classify findings by severity.`;
    case "assess":
      return `${common}\n\nAssess this repository against Arey Pi Project Readiness. Audit only by default. Produce scores, evidence, blockers, quick wins, and a prioritised improvement plan.`;
    default:
      return `${common}\n\nWork on: ${target}`;
  }
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

      const report = [
        "# Arey Pi Doctor",
        "",
        `- Package: arey-pi@${packageVersion()}`,
        `- Project: ${cwd}`,
        `- Package rules present: ${dirExists(rulesDir) ? "yes" : "no"}`,
        `- Package agents present: ${packageAgents.length}/${requiredAgents.length}`,
        `- pi-subagents command detected: ${hasSubagentsCommand ? "yes" : "no"}`,
        `- Project-local Arey Pi agents: ${installedAgents.length}/${requiredAgents.length}`,
        `- Root AGENTS.md: ${fileExists(join(cwd, "AGENTS.md")) ? "yes" : "no"}`,
        `- .pi/settings.json: ${fileExists(join(cwd, ".pi", "settings.json")) ? "yes" : "no"}`,
        `- Arey Pi prompts discovered: ${prompts.length}`,
        `- Arey Pi skills discovered: ${skills.length}`,
        "",
        "## Missing project agents",
        missingAgents.length ? missingAgents.map((agent) => `- ${agent}`).join("\n") : "- none",
        "",
        "## Recommended next step",
        installedAgents.length === requiredAgents.length
          ? "- Project-local Arey Pi subagents are installed. Use `/arey-feature`, `/arey-bugfix`, `/arey-sync`, `/arey-review`, or natural language."
          : "- Run `/arey-bootstrap` to install project-local Arey Pi subagents.",
      ].join("\n");

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
      const flags = args.split(/\s+/).filter(Boolean);
      const force = flags.includes("--force");
      const full = flags.includes("--full");
      const hasSelectiveScaffoldFlag = flags.some((flag) =>
        ["--agentsmd", "--specs", "--docs", "--full"].includes(flag),
      );
      const defaultFullBootstrap = !hasSelectiveScaffoldFlag;
      const createAgentsMd = defaultFullBootstrap || flags.includes("--agentsmd") || full;
      const createSpecs = defaultFullBootstrap || flags.includes("--specs") || full;
      const createDocs = defaultFullBootstrap || flags.includes("--docs") || full;
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
