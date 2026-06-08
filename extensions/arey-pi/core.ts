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

export type WorkflowPhase = {
  id: string;
  label: string;
  status: "pending" | "active" | "done";
  guardrail?: string;
};

export type WorkflowState = {
  id: string;
  kind: WorkflowKind;
  target: string;
  createdAt: string;
  phases: WorkflowPhase[];
  guardrails: string[];
};

const featurePhases: Omit<WorkflowPhase, "status">[] = [
  { id: "scope", label: "Scope, risk, non-goals, and unknowns clarified" },
  {
    id: "specs",
    label: "Canonical Gherkin/spec impact confirmed",
    guardrail: "Do not edit production behaviour before specs are confirmed.",
  },
  {
    id: "red",
    label: "Meaningful failing Red test observed",
    guardrail: "Do not edit production behaviour before Red evidence exists.",
  },
  { id: "green", label: "Small Green implementation completed" },
  { id: "refactor", label: "Refactor completed with tests green" },
  { id: "sync", label: "Specs, docs, ADR, DBML, glossary sync checked" },
  { id: "review", label: "Fresh engineering review completed or explicitly waived" },
  { id: "evidence", label: "Final evidence and residual risks reported" },
];

const bugfixPhases: Omit<WorkflowPhase, "status">[] = [
  { id: "reproduce", label: "Expected vs actual behaviour and scope reproduced" },
  {
    id: "red",
    label: "Failing regression test observed",
    guardrail: "Do not edit production behaviour before a failing regression test exists.",
  },
  { id: "fix", label: "Small fix completed" },
  { id: "refactor", label: "Refactor completed with regression tests green" },
  { id: "sync", label: "Specs, docs, ADR, DBML, glossary sync checked" },
  { id: "review", label: "Risk-based fresh engineering review completed or waived" },
  { id: "evidence", label: "Final evidence and residual risks reported" },
];

const syncPhases: Omit<WorkflowPhase, "status">[] = [
  { id: "inspect", label: "Requested scope and current diff inspected" },
  { id: "drift", label: "Drift classified as blocking, recommended, or unaffected" },
  { id: "fix", label: "Safe drift fixed or decision requested" },
  { id: "validate", label: "Relevant validation run" },
  { id: "evidence", label: "Sync status and evidence reported" },
];

const reviewPhases: Omit<WorkflowPhase, "status">[] = [
  { id: "inspect", label: "Scope, diff, and relevant files inspected" },
  { id: "findings", label: "Findings classified by severity" },
  { id: "evidence", label: "Review evidence and residual risks reported" },
];

const assessPhases: Omit<WorkflowPhase, "status">[] = [
  { id: "audit", label: "Repository readiness audited" },
  { id: "score", label: "Scores, blockers, and quick wins produced" },
  { id: "plan", label: "Prioritised improvement plan reported" },
];

const defaultGuardrails = [
  "Keep one writer in the active worktree at a time.",
  "Do not use production source directories for tests by default.",
  "Do not rewrite specs to hide implementation defects.",
  "Report validation commands and residual risks before finalising.",
];

const evidenceSummary = `Final evidence format:\n- Behaviour/spec impact:\n- Tests/TDD, including test location:\n- Validation commands and results:\n- Quality tooling:\n- Spec sync:\n- Documentation sync:\n- Architecture/ADR/glossary impact:\n- Database/DBML impact:\n- Residual risks:`;

function commonWorkflowMessage(): string {
  return [
    "Act as the Arey Pi tech lead.",
    "Use pi-subagents when available and appropriate.",
    "Keep orchestration authority in the parent session, give child agents bounded tasks, and keep one writer in the active worktree at a time.",
    "Clarify blocking ambiguity before editing; otherwise proceed incrementally.",
    "Follow Arey Pi rules, preserve TDD for behaviour changes, and report evidence clearly.",
  ].join(" ");
}

function featureWorkflow(target: string): string {
  return [
    commonWorkflowMessage(),
    "",
    `Run the Arey Pi feature workflow for: ${target}`,
    "",
    "Execution contract:",
    "1. Scope: identify behaviour, impacted users, non-goals, risk level, and unknowns.",
    "2. Specs: confirm or update canonical Gherkin before production behaviour changes; use arey-pi.spec-author when available.",
    "3. TDD: use arey-pi.tdd-implementer for Red → Green → Refactor; tests must live outside production source directories by default.",
    "4. Implementation: make the smallest high-quality change; avoid speculative architecture.",
    "5. Sync: use arey-pi.spec-syncer to align specs, tests, code, DBML, ADRs, glossary, README, docs, AGENTS.md, skills, prompts, rules, agents, commands, and tooling instructions when affected.",
    "6. Review: use fresh-context arey-pi.engineering-reviewer or reviewers when risk warrants it.",
    "",
    "Use scout/context-builder/planner first if codebase context is not clear.",
    evidenceSummary,
  ].join("\n");
}

function bugfixWorkflow(target: string): string {
  return [
    commonWorkflowMessage(),
    "",
    `Run the Arey Pi bugfix workflow for: ${target}`,
    "",
    "Execution contract:",
    "1. Reproduce: identify expected vs actual behaviour and affected scope.",
    "2. Regression test first: add or update a meaningful failing test that proves the bug before changing production code.",
    "3. Fix: implement the smallest high-quality correction without broad rewrites unless necessary.",
    "4. Refactor: improve design only while regression tests and existing tests remain green.",
    "5. Sync: update Gherkin, docs, DBML, ADRs, glossary, or architecture docs when the intended behaviour or design contract changed.",
    "6. Review: request fresh engineering review for security, data-loss, concurrency, auth, payment, migration, or public API bugs.",
    "",
    "If a failing regression test cannot be demonstrated, state the blocker explicitly and do not claim TDD evidence.",
    evidenceSummary,
  ].join("\n");
}

function syncWorkflow(target: string): string {
  return [
    commonWorkflowMessage(),
    "",
    `Run Arey Pi spec and documentation sync for: ${target}`,
    "",
    "Sync contract:",
    "1. Inspect the requested scope and current diff before editing.",
    "2. Verify alignment across canonical Gherkin, tests, production code, DBML, ADRs, glossary, architecture docs, README files, docs, AGENTS.md, skills, prompts, rules, agents, commands, templates, and tooling instructions.",
    "3. Classify drift as blocking, recommended, or unaffected.",
    "4. Fix safe drift directly when the intended behaviour is clear; otherwise ask for a decision.",
    "5. Do not rewrite specs to hide implementation defects.",
    "6. Run relevant validation after changes.",
    "",
    "End with both statuses exactly: `Specs updated` or `Specs unaffected`; `Docs updated` or `Docs unaffected`, with evidence.",
    evidenceSummary,
  ].join("\n");
}

export function createWorkflowState(kind: WorkflowKind, args: string, now = new Date()): WorkflowState {
  const target = args.trim() || "the current repository/task";
  const sourcePhases =
    kind === "feature"
      ? featurePhases
      : kind === "bugfix"
        ? bugfixPhases
        : kind === "sync"
          ? syncPhases
          : kind === "review"
            ? reviewPhases
            : kind === "assess"
              ? assessPhases
              : reviewPhases;

  return {
    id: `arey-${kind}-${now.getTime()}`,
    kind,
    target,
    createdAt: now.toISOString(),
    phases: sourcePhases.map((phase, index) => ({ ...phase, status: index === 0 ? "active" : "pending" })),
    guardrails: defaultGuardrails,
  };
}

export function completeWorkflowPhase(state: WorkflowState, phaseId: string): WorkflowState {
  let completedIndex = -1;
  const phases = state.phases.map((phase, index) => {
    if (phase.id !== phaseId) return phase;
    completedIndex = index;
    return { ...phase, status: "done" as const };
  });

  if (completedIndex === -1) return state;

  return {
    ...state,
    phases: phases.map((phase, index) =>
      index === completedIndex + 1 && phase.status === "pending" ? { ...phase, status: "active" as const } : phase,
    ),
  };
}

export type AutoWorkflowKind = "feature" | "bugfix" | "sync" | "review" | "assess";
export type AutoWorkflowIntent = { kind: AutoWorkflowKind; target: string };

export function detectAutoWorkflowIntent(prompt: string): AutoWorkflowIntent | undefined {
  const text = prompt.trim();
  const normalized = text.toLowerCase();
  const mentionsArey = /\barey(?:\s+pi)?\b/.test(normalized);
  const asksFramework = /siguiendo\s+arey|following\s+arey|con\s+arey|against\s+arey|arey\s+pi/.test(normalized);

  if (!mentionsArey && !asksFramework) return undefined;
  if (normalized.includes("arey harness workflow is active")) return undefined;

  const kind = /\bbug\b|bugfix|fix|arregla|corrige|regression|regresi[oó]n/.test(normalized)
    ? "bugfix"
    : /\bsync\b|sincroniza|drift|aline(a|ar)|alignment/.test(normalized)
      ? "sync"
      : /review|revisa|audita|audit/.test(normalized)
        ? "review"
        : /assess|readiness|eval[uú]a|diagn[oó]stico/.test(normalized)
          ? "assess"
          : "feature";

  return { kind, target: text };
}

export function buildWorkflowReport(state: WorkflowState): string {
  const done = state.phases.filter((phase) => phase.status === "done").length;
  const checklist = state.phases
    .map((phase) => {
      const mark = phase.status === "done" ? "x" : " ";
      const active = phase.status === "active" ? " ← active" : "";
      return `- [${mark}] ${phase.id}: ${phase.label}${active}`;
    })
    .join("\n");

  return [
    "# Arey Pi Harness Workflow",
    "",
    `- ID: ${state.id}`,
    `- Kind: ${state.kind}`,
    `- Target: ${state.target}`,
    `- Progress: ${done}/${state.phases.length}`,
    "",
    "## Phases",
    checklist,
    "",
    "## Active guardrails",
    ...state.guardrails.map((guardrail) => `- ${guardrail}`),
    "",
    "## Harness behaviour",
    "- This workflow is activated from natural language and guides the agent quietly.",
    "- The user should not need workflow commands or manual phase advancement.",
    "- Progress is advisory and evidence-led, not user-facing ceremony.",
  ].join("\n");
}

export function workflowHarnessMessage(state: WorkflowState): string {
  return [
    "Arey Pi harness workflow is active.",
    "Treat the checklist as the controlling delivery state, not just advisory prose.",
    "Use the checklist as quiet guidance for sequencing and evidence, not as user-facing ceremony.",
    "Do not ask the user to advance phases manually; report evidence naturally as work progresses.",
    "If a guardrail prevents the next edit, report the missing evidence instead of guessing.",
    "",
    buildWorkflowReport(state),
  ].join("\n");
}

export function workflowMessage(kind: WorkflowKind, args: string): string {
  const target = args.trim() || "the current repository/task";

  switch (kind) {
    case "feature":
      return featureWorkflow(target);
    case "bugfix":
      return bugfixWorkflow(target);
    case "sync":
      return syncWorkflow(target);
    case "review":
      return `${commonWorkflowMessage()}\n\nRun an Arey Pi engineering review for: ${target}\n\nPrefer fresh-context review. Review architecture, code quality, test quality and location, quality tooling, security, privacy, operability, maintainability, and spec/ADR/DBML/documentation concerns. Classify findings by severity.`;
    case "assess":
      return `${commonWorkflowMessage()}\n\nAssess this repository against Arey Pi Project Readiness. Audit only by default. Produce scores, evidence, blockers, quick wins, and a prioritised improvement plan.`;
    default:
      return `${commonWorkflowMessage()}\n\nWork on: ${target}`;
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
      ? "- Project-local Arey Pi subagents are installed. Use natural language such as `Implementa password reset siguiendo Arey Pi`."
      : "- Run `/arey-bootstrap` to install project-local Arey Pi subagents.",
  ].join("\n");
}
