export const requiredAgents = [
  "tech-lead.md",
  "spec-author.md",
  "tdd-implementer.md",
  "spec-syncer.md",
  "engineering-reviewer.md",
  "project-evaluator.md",
] as const;

export type ScaffoldFile = { template: string; target: string };

export const specScaffoldFiles: ScaffoldFile[] = [
  { template: "specs-readme.md", target: "specs/README.md" },
  { template: "features-readme.md", target: "specs/features/README.md" },
  { template: "feature.feature", target: "specs/features/example.feature" },
  { template: "database-readme.md", target: "specs/database/README.md" },
  { template: "database.dbml", target: "specs/database/schema.dbml" },
  { template: "architecture-readme.md", target: "specs/architecture/README.md" },
  { template: "decisions-readme.md", target: "specs/decisions/README.md" },
  { template: "adr.md", target: "specs/decisions/0001-record-architecture-decision.md" },
  { template: "glossary.md", target: "specs/glossary.md" },
];

export const docsScaffoldFiles: ScaffoldFile[] = [
  { template: "docs-readme.md", target: "docs/README.md" },
  { template: "project-readiness-report.md", target: "docs/project-readiness-report.md" },
];

const selectiveBootstrapFlags = ["--agentsmd", "--specs", "--docs", "--full"];

export type BootstrapPlan = {
  flags: string[];
  force: boolean;
  full: boolean;
  defaultFullBootstrap: boolean;
  createAgentsMd: boolean;
  createSpecs: boolean;
  createDocs: boolean;
};

export function parseBootstrapFlags(args: string): BootstrapPlan {
  const flags = args.split(/\s+/).filter(Boolean);
  const force = flags.includes("--force");
  const full = flags.includes("--full");
  const hasSelectiveScaffoldFlag = flags.some((flag) => selectiveBootstrapFlags.includes(flag));
  const defaultFullBootstrap = !hasSelectiveScaffoldFlag;

  return {
    flags,
    force,
    full,
    defaultFullBootstrap,
    createAgentsMd: defaultFullBootstrap || flags.includes("--agentsmd") || full,
    createSpecs: defaultFullBootstrap || flags.includes("--specs") || full,
    createDocs: defaultFullBootstrap || flags.includes("--docs") || full,
  };
}

export function shouldActivateAreyPiHarness(prompt: string): boolean {
  const normalized = prompt.toLowerCase();
  if (normalized.includes("arey pi harness is active")) return false;
  return /\barey(?:\s+pi)?\b/.test(normalized);
}

const evidenceSummary = `Final evidence format:\n- Behaviour/spec impact:\n- Tests/TDD, including test location:\n- Validation commands and results:\n- Quality tooling:\n- Spec sync:\n- Documentation sync:\n- Architecture/ADR/glossary impact:\n- Database/DBML impact:\n- Residual risks:`;

export function areyPiHarnessContext(prompt: string): string {
  const target = prompt.trim() || "the current request";

  return [
    "Arey Pi harness is active for this request.",
    "Work naturally; do not expose workflow ceremony unless it helps the user.",
    "Infer the user's intent yourself. The work may be a feature, bugfix, sync, review, assessment, or a mixed task.",
    "Select the matching Arey Pi posture:",
    "- Feature or behaviour change: clarify scope, update/confirm canonical Gherkin first, then preserve Red → Green → Refactor.",
    "- Bugfix: reproduce with a meaningful failing regression test before production changes.",
    "- Sync: inspect drift across specs, tests, code, DBML, ADRs, glossary, README, docs, AGENTS.md, skills, prompts, rules, agents, commands, templates, and tooling instructions.",
    "- Review: perform adversarial engineering review with severity-classified findings.",
    "- Assessment: audit readiness with evidence, blockers, quick wins, and a prioritised improvement plan.",
    "Use pi-subagents when available and useful, but keep orchestration in the parent session and one writer in the active worktree.",
    "Tests should live outside production source directories by default.",
    "Do not rewrite specs to hide implementation defects.",
    "Report evidence and residual risks clearly before finalising.",
    "",
    `User request: ${target}`,
    "",
    evidenceSummary,
  ].join("\n");
}

export type DoctorReportInput = {
  packageVersion: string;
  cwd: string;
  packageRulesPresent: boolean;
  packageTemplatesPresent: boolean;
  packageAgentsCount: number;
  requiredAgentsCount: number;
  hasSubagentsCommand: boolean;
  installedAgentsCount: number;
  hasRootAgentsMd: boolean;
  hasPiSettings: boolean;
  promptsCount: number;
  skillsCount: number;
  missingAgents: string[];
};

export function buildDoctorReport(input: DoctorReportInput): string {
  return [
    "# Arey Pi Doctor",
    "",
    `- Package: arey-pi@${input.packageVersion}`,
    `- Project: ${input.cwd}`,
    `- Package rules present: ${input.packageRulesPresent ? "yes" : "no"}`,
    `- Package templates present: ${input.packageTemplatesPresent ? "yes" : "no"}`,
    `- Package agents present: ${input.packageAgentsCount}/${input.requiredAgentsCount}`,
    `- pi-subagents command detected: ${input.hasSubagentsCommand ? "yes" : "no"}`,
    `- Project-local Arey Pi agents: ${input.installedAgentsCount}/${input.requiredAgentsCount}`,
    `- Root AGENTS.md: ${input.hasRootAgentsMd ? "yes" : "no"}`,
    `- .pi/settings.json: ${input.hasPiSettings ? "yes" : "no"}`,
    `- Arey Pi prompts discovered: ${input.promptsCount}`,
    `- Arey Pi skills discovered: ${input.skillsCount}`,
    "",
    "## Missing project agents",
    input.missingAgents.length ? input.missingAgents.map((agent) => `- ${agent}`).join("\n") : "- none",
    "",
    "## Recommended next step",
    input.installedAgentsCount === input.requiredAgentsCount
      ? "- Project-local Arey Pi subagents are installed. Use natural language such as `Implementa password reset siguiendo Arey Pi`."
      : "- Run `/arey-bootstrap` to install project-local Arey Pi subagents.",
  ].join("\n");
}
