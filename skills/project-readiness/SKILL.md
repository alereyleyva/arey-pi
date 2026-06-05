---
name: project-readiness
description: Evaluate whether a repository is aligned with Pi Framework and whether its AI harness is ready for reliable agent work. Use when assessing specs, tests, quality tooling, AGENTS.md, skills, prompts, subagents, or project readiness.
---

# Project Readiness

Use this skill to assess whether a project is ready to operate under Pi Framework.

Project readiness has two connected dimensions:

1. **Framework Alignment** — specs, tests, quality tooling, architecture/code quality, spec sync, DoD, commits.
2. **AI Harness Readiness** — AGENTS.md, Pi Framework setup, project skills/prompts/subagents, technology guidance, command discoverability, safety rules.

## Required Reading

Read these policy files when available in the framework package or project:

- `rules/15-project-readiness.md`
- `rules/00-framework-principles.md`
- `rules/09-definition-of-done.md`
- `rules/12-test-quality.md`
- `rules/14-quality-tooling.md`
- `rules/13-engineering-quality.md`

If the files are missing from the target project, report that as part of the assessment rather than assuming compliance.

## Default Mode: Audit

Audit mode is read-only.

Inspect the repository and produce a readiness report. Do not modify files, install dependencies, or change configuration unless the user explicitly asks for Bootstrap Mode.

## What to Inspect

Look for:

- `AGENTS.md`, `CLAUDE.md`, `.pi/settings.json`, `.pi/`, `.agents/`
- `specs/features/`, `specs/architecture/`, `specs/decisions/`, glossary
- test directories and test runner config
- quality tooling config: formatter, linter, typecheck, coverage, mutation testing
- project scripts: `package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`, Makefile, Justfile, CI
- README/developer docs
- git history conventions when useful

## Output

Produce:

```md
# Pi Framework Project Readiness Report

## Overall
- Framework Alignment: N/5
- AI Harness Readiness: N/5
- Overall Readiness: N/5

## Blockers

## Quick Wins

## Framework Alignment
- Canonical Specs
- Tests/TDD
- Test Quality
- Quality Tooling
- Architecture/Code Quality
- Spec Sync/Process
- Commits/Process

## AI Harness Readiness
- AGENTS.md
- Pi Framework Setup
- Skills/Prompts/Subagents
- Technology-Specific Guidance
- Command Discoverability
- Agent Safety

## Recommended Plan

## Residual Risks / Unknowns
```

For every score, include evidence with file paths or explicit missing-file observations.

## Bootstrap Mode

Only after user approval, implement selected improvements such as:

- creating or updating `AGENTS.md`;
- adding missing validation scripts;
- adding spec directory skeletons;
- adding framework prompts or skills;
- documenting quality tooling;
- adding ADR/glossary structure.

Bootstrap Mode must follow Pi Framework policies, including quality tooling, DoD, and incremental Conventional Commits.
