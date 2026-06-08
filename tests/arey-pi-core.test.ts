import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "bun:test";
import {
  buildDoctorReport,
  buildWorkflowReport,
  completeWorkflowPhase,
  createWorkflowState,
  detectAutoWorkflowIntent,
  docsScaffoldFiles,
  parseBootstrapFlags,
  specScaffoldFiles,
  workflowHarnessMessage,
  workflowMessage,
} from "../extensions/arey-pi/core.ts";

const repoRoot = join(import.meta.dir, "..");

describe("parseBootstrapFlags", () => {
  test("defaults to full safe bootstrap when no selective flags are passed", () => {
    expect(parseBootstrapFlags("")).toMatchObject({
      flags: [],
      force: false,
      full: false,
      defaultFullBootstrap: true,
      createAgentsMd: true,
      createSpecs: true,
      createDocs: true,
    });
  });

  test("uses selective scaffold flags when present", () => {
    expect(parseBootstrapFlags("--specs --force")).toMatchObject({
      flags: ["--specs", "--force"],
      force: true,
      full: false,
      defaultFullBootstrap: false,
      createAgentsMd: false,
      createSpecs: true,
      createDocs: false,
    });
  });

  test("treats --full as explicit full bootstrap", () => {
    expect(parseBootstrapFlags("--full")).toMatchObject({
      full: true,
      defaultFullBootstrap: false,
      createAgentsMd: true,
      createSpecs: true,
      createDocs: true,
    });
  });
});

describe("scaffold file plans", () => {
  test("lists the canonical spec scaffold files", () => {
    expect(specScaffoldFiles.map((file) => file.target)).toEqual([
      "specs/README.md",
      "specs/features/README.md",
      "specs/features/example.feature",
      "specs/database/README.md",
      "specs/database/schema.dbml",
      "specs/architecture/README.md",
      "specs/decisions/README.md",
      "specs/decisions/0001-record-architecture-decision.md",
      "specs/glossary.md",
    ]);
  });

  test("lists the project documentation scaffold files", () => {
    expect(docsScaffoldFiles.map((file) => file.target)).toEqual([
      "docs/README.md",
      "docs/project-readiness-report.md",
    ]);
  });
});

describe("harness workflow state", () => {
  test("creates a feature checklist with active first phase and guardrails", () => {
    const state = createWorkflowState("feature", "add password reset", new Date("2026-01-01T00:00:00.000Z"));

    expect(state.id).toBe("arey-feature-1767225600000");
    expect(state.target).toBe("add password reset");
    expect(state.phases[0]).toMatchObject({ id: "scope", status: "active" });
    expect(state.phases.map((phase) => phase.id)).toEqual([
      "scope",
      "specs",
      "red",
      "green",
      "refactor",
      "sync",
      "review",
      "evidence",
    ]);
    expect(state.guardrails).toContain("Keep one writer in the active worktree at a time.");
  });

  test("completes a phase and activates the next pending phase", () => {
    const state = createWorkflowState("bugfix", "session bypass", new Date("2026-01-01T00:00:00.000Z"));
    const updated = completeWorkflowPhase(state, "reproduce");

    expect(updated.phases[0]).toMatchObject({ id: "reproduce", status: "done" });
    expect(updated.phases[1]).toMatchObject({ id: "red", status: "active" });
  });

  test("renders workflow reports and harness prompts", () => {
    const state = createWorkflowState("sync", "current diff", new Date("2026-01-01T00:00:00.000Z"));
    const report = buildWorkflowReport(state);
    const prompt = workflowHarnessMessage(state);

    expect(report).toContain("# Arey Pi Harness Workflow");
    expect(report).toContain("- [ ] inspect: Requested scope and current diff inspected ← active");
    expect(report).toContain("The user should not need workflow commands");
    expect(prompt).toContain("Treat the checklist as the controlling delivery state");
  });
});

describe("natural-language workflow detection", () => {
  test("detects Arey Pi feature requests without slash commands", () => {
    expect(detectAutoWorkflowIntent("Implementa password reset siguiendo Arey Pi")).toMatchObject({
      kind: "feature",
      target: "Implementa password reset siguiendo Arey Pi",
    });
  });

  test("detects Arey Pi bugfix requests", () => {
    expect(detectAutoWorkflowIntent("Corrige el bug de sesiones con Arey Pi")).toMatchObject({ kind: "bugfix" });
  });

  test("ignores ordinary prompts that do not opt into Arey Pi", () => {
    expect(detectAutoWorkflowIntent("Implementa password reset")).toBeUndefined();
  });
});

describe("workflowMessage", () => {
  test("builds feature workflow messages with target, execution contract, and evidence requirements", () => {
    const message = workflowMessage("feature", "add password reset");

    expect(message).toContain("Act as the Arey Pi tech lead");
    expect(message).toContain("Run the Arey Pi feature workflow for: add password reset");
    expect(message).toContain("Execution contract:");
    expect(message).toContain("arey-pi.spec-author");
    expect(message).toContain("arey-pi.tdd-implementer");
    expect(message).toContain("arey-pi.spec-syncer");
    expect(message).toContain("Final evidence format:");
    expect(message).toContain("Keep orchestration authority in the parent session");
  });

  test("builds bugfix workflow messages with regression-test-first guardrails", () => {
    const message = workflowMessage("bugfix", "session refresh bypasses verification");

    expect(message).toContain("Run the Arey Pi bugfix workflow for: session refresh bypasses verification");
    expect(message).toContain("Regression test first");
    expect(message).toContain("If a failing regression test cannot be demonstrated");
    expect(message).toContain("Final evidence format:");
  });

  test("builds sync workflow messages with drift classification and final statuses", () => {
    const message = workflowMessage("sync", "current diff");

    expect(message).toContain("Run Arey Pi spec and documentation sync for: current diff");
    expect(message).toContain("Classify drift as blocking, recommended, or unaffected");
    expect(message).toContain("README files");
    expect(message).toContain("`Specs updated` or `Specs unaffected`");
    expect(message).toContain("`Docs updated` or `Docs unaffected`");
  });

  test("uses a default target when args are empty", () => {
    expect(workflowMessage("review", "   ")).toContain("the current repository/task");
  });
});

describe("buildDoctorReport", () => {
  test("summarises package and project readiness inputs", () => {
    const report = buildDoctorReport({
      packageVersion: "0.2.0",
      cwd: "/repo",
      packageRulesPresent: true,
      packageTemplatesPresent: true,
      packageAgentsCount: 6,
      requiredAgentsCount: 6,
      hasSubagentsCommand: true,
      installedAgentsCount: 5,
      hasRootAgentsMd: false,
      hasPiSettings: true,
      promptsCount: 1,
      skillsCount: 1,
      missingAgents: ["project-evaluator.md"],
    });

    expect(report).toContain("# Arey Pi Doctor");
    expect(report).toContain("- Package: arey-pi@0.2.0");
    expect(report).toContain("- Package templates present: yes");
    expect(report).toContain("- Project-local Arey Pi agents: 5/6");
    expect(report).toContain("- Root AGENTS.md: no");
    expect(report).toContain("- project-evaluator.md");
    expect(report).toContain("Run `/arey-bootstrap`");
  });

  test("recommends workflows when all project agents are installed", () => {
    const report = buildDoctorReport({
      packageVersion: "0.2.0",
      cwd: "/repo",
      packageRulesPresent: true,
      packageTemplatesPresent: true,
      packageAgentsCount: 6,
      requiredAgentsCount: 6,
      hasSubagentsCommand: true,
      installedAgentsCount: 6,
      hasRootAgentsMd: true,
      hasPiSettings: true,
      promptsCount: 1,
      skillsCount: 1,
      missingAgents: [],
    });

    expect(report).toContain("- none");
    expect(report).toContain("Use natural language");
  });
});

describe("package workflow resources", () => {
  test("ships the focused workflow prompt templates", () => {
    const promptsDir = join(repoRoot, "prompts");
    const prompts = readdirSync(promptsDir).filter((file) => file.endsWith(".md"));

    expect(prompts).toEqual(
      expect.arrayContaining([
        "assess-project.md",
        "feature-spec.md",
        "red-green-refactor.md",
        "sync-drift.md",
        "engineering-review.md",
        "adr-review.md",
      ]),
    );

    for (const prompt of prompts) {
      const content = readFileSync(join(promptsDir, prompt), "utf8");
      expect(content).toContain("description:");
    }
  });

  test("ships focused workflow skills with valid Skill frontmatter", () => {
    const skillNames = ["project-readiness", "tdd-red-green-refactor", "spec-sync", "engineering-review"];

    for (const skillName of skillNames) {
      const skillPath = join(repoRoot, "skills", skillName, "SKILL.md");
      expect(existsSync(skillPath)).toBe(true);

      const content = readFileSync(skillPath, "utf8");
      expect(content).toContain(`name: ${skillName}`);
      expect(content).toContain("description:");
    }
  });
});
