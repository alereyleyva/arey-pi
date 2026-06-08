import { describe, expect, test } from "bun:test";
import {
  buildDoctorReport,
  docsScaffoldFiles,
  parseBootstrapFlags,
  specScaffoldFiles,
  workflowMessage,
} from "../extensions/arey-pi/core.ts";

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

describe("workflowMessage", () => {
  test("builds feature workflow messages with target and orchestration guidance", () => {
    const message = workflowMessage("feature", "add password reset");

    expect(message).toContain("Act as the Arey Pi tech lead");
    expect(message).toContain("Run the Arey Pi feature workflow for: add password reset");
    expect(message).toContain("arey-pi.spec-author");
    expect(message).toContain("arey-pi.tdd-implementer");
    expect(message).toContain("Keep orchestration authority in the parent session");
  });

  test("builds sync workflow messages with spec and documentation sync requirements", () => {
    const message = workflowMessage("sync", "current diff");

    expect(message).toContain("Run Arey Pi spec and documentation sync for: current diff");
    expect(message).toContain("README files");
    expect(message).toContain("End with both a spec status and a documentation status");
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
    expect(report).toContain("Project-local Arey Pi subagents are installed");
  });
});
