# Project Readiness

## Purpose

Project Readiness evaluates whether a repository is prepared to use Pi Framework effectively.

It combines two related assessments:

1. **Framework Alignment:** whether the project follows Pi Framework's engineering guarantees.
2. **AI Harness Readiness:** whether the project gives agents the instructions, skills, commands, and safety rails they need to apply the framework reliably.

A project can have good specs and tests but still be hard for agents to work on if the AI harness is weak. Conversely, a good harness cannot compensate for missing specs, weak tests, or absent quality tooling.

## Core Rule

Projects should be periodically evaluated for both framework alignment and AI harness readiness.

Assessment is read-only by default. Findings should produce evidence, scores, risks, and a prioritized improvement plan before any changes are made.

## Framework Alignment Areas

Evaluate the project across these areas:

### Canonical Specs

Check whether:

- `specs/features/` exists where applicable;
- Gherkin specs describe meaningful observable behavior;
- specs avoid incidental implementation details;
- important domains, APIs, CLIs, errors, permissions, and edge cases are covered;
- glossary, architecture docs, and ADRs exist when the project complexity requires them.

### Tests and TDD

Check whether:

- there is a clear test suite;
- tests are easy to run;
- tests can be traced to specs or requirements where practical;
- bug fixes have regression tests;
- test structure supports TDD;
- tests are meaningful rather than shallow generated assertions.

### Test Quality

Check whether:

- coverage is available or intentionally absent;
- mutation testing is configured for critical code or proposed as an improvement;
- tests assert behavior rather than implementation mechanics;
- edge cases and failure paths are covered for important behavior;
- surviving mutants or weak assertions are triaged when evidence exists.

### Quality Tooling

Check whether the project defines:

- formatter;
- linter/static analyzer;
- type checking where applicable;
- test command;
- composed check/validation command;
- relevant dynamic analysis for project risk.

If tooling is absent, assessment must recommend options and mark the project as not fully ready.

### Architecture and Code Quality

Check whether:

- architecture is understandable;
- boundaries and responsibilities are clear;
- code follows consistent patterns;
- durable decisions are documented outside code;
- complexity is justified;
- the implementation reflects senior engineering standards.

### Spec Sync and Process

Check whether:

- specs, tests, and code appear aligned;
- the Definition of Done is documented;
- Conventional Commits are used;
- incremental commits are practiced for meaningful work;
- validation expectations are discoverable.

## AI Harness Readiness Areas

Evaluate whether agents can reliably work in the project.

### AGENTS.md

Check whether `AGENTS.md` exists and includes:

- project overview;
- framework instructions;
- links to relevant rules/specs;
- common commands;
- validation/DoD expectations;
- commit conventions;
- safety constraints;
- project structure notes;
- known pitfalls.

### Pi Framework Installation

Check whether Pi Framework is installed, referenced, or otherwise available through project settings, package configuration, local docs, or explicit instructions.

### Skills, Prompts, and Agents

Check whether the project has useful AI harness resources such as:

- framework skills;
- stack-specific skills;
- domain-specific skills;
- project workflow prompts;
- evaluation/review prompts;
- subagents for planning, implementation, review, spec sync, or project evaluation where `pi-subagents` is used.

### Technology-Specific Guidance

Check whether agents have guidance for the project's important technologies, frameworks, libraries, test runners, deployment model, and quality tools.

If a project relies on uncommon or subtle technology behavior, consider adding custom skills or project docs so agents do not repeatedly rediscover it.

### Command Discoverability

Check whether setup and validation commands are obvious from:

- `package.json` scripts;
- Makefile;
- Justfile;
- task runner config;
- README;
- AGENTS.md;
- CI config.

Agents should not have to guess how to format, lint, typecheck, test, or run the project.

### Agent Safety

Check whether the project documents:

- secret handling;
- environment variable rules;
- destructive command restrictions;
- database/migration precautions;
- deployment restrictions;
- generated file policies;
- ownership or review requirements.

## Scoring

Use a 0-5 score for each category:

| Score | Meaning |
| --- | --- |
| 0 | Missing |
| 1 | Poor |
| 2 | Partial |
| 3 | Adequate |
| 4 | Strong |
| 5 | Excellent |

Avoid false precision. Scores are meant to prioritize improvement, not gamify compliance.

## Suggested Categories

Framework Alignment:

- Canonical specs
- Tests/TDD
- Test quality
- Quality tooling
- Architecture/code quality
- Spec sync/process
- Commits/process

AI Harness Readiness:

- AGENTS.md
- Pi Framework installation/reference
- Skills/prompts/subagents
- Technology-specific guidance
- Command discoverability
- Agent safety

## Required Report

A readiness report should include:

```txt
Project Readiness Report
- Overall readiness:
- Framework alignment:
- AI harness readiness:
- Blockers:
- Quick wins:
- Recommended plan:
```

For each category, include:

```txt
- Score:
- Evidence:
- Findings:
- Recommendations:
```

## Assessment Modes

### Audit Mode

Read-only. Produce findings and recommendations. Do not modify project files.

### Bootstrap Mode

After audit and user approval, implement selected improvements such as:

- adding or updating `AGENTS.md`;
- adding missing validation scripts;
- adding spec skeletons;
- adding framework prompts or skills;
- documenting quality tooling;
- creating ADR/glossary structure.

Bootstrap Mode must still follow incremental Conventional Commits.

## Acceptance Rule

A project is not fully ready for Pi Framework until both framework alignment and AI harness readiness are adequate for its risk and complexity.

Missing AI harness setup is a real engineering gap because it prevents agents from applying the framework consistently.
