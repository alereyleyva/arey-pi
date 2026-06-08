import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "bun:test";
import {
  buildDoctorReport,
  docsScaffoldFiles,
  parseBootstrapFlags,
  specScaffoldFiles,
  areyPiHarnessContext,
  shouldActivateAreyPiHarness,
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

describe("natural-language harness activation", () => {
  test("activates only when the user opts into Arey Pi", () => {
    expect(shouldActivateAreyPiHarness("Implementa password reset siguiendo Arey Pi")).toBe(true);
    expect(shouldActivateAreyPiHarness("Implementa password reset")).toBe(false);
  });

  test("injects universal guidance and lets the agent infer work mode", () => {
    const context = areyPiHarnessContext("Corrige el bug de sesiones con Arey Pi");

    expect(context).toContain("Arey Pi harness is active");
    expect(context).toContain("Infer the user's intent yourself");
    expect(context).toContain("parent Arey Pi orchestrator");
    expect(context).toContain("Feature or behaviour change");
    expect(context).toContain("Bugfix");
    expect(context).toContain("arey-pi.spec-author");
    expect(context).toContain("arey-pi.tdd-implementer");
    expect(context).toContain("arey-pi.engineering-reviewer");
    expect(context).toContain("Final evidence format:");
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
