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

export type WorkflowKind = "feature" | "bugfix" | "sync" | "review" | "assess" | string;

export function workflowMessage(kind: WorkflowKind, args: string): string {
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
      ? "- Project-local Arey Pi subagents are installed. Use `/arey-feature`, `/arey-bugfix`, `/arey-sync`, `/arey-review`, or natural language."
      : "- Run `/arey-bootstrap` to install project-local Arey Pi subagents.",
  ].join("\n");
}
