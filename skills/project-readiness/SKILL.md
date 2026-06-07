---
name: project-readiness
description: Evaluate whether a repository is aligned with Pi Framework rules. Use when assessing specs, tests, quality tooling, AGENTS.md, skills, prompts, subagents, or project readiness.
---

# Project Readiness

Use this skill to assess whether a project is ready to operate under Pi Framework.

Project readiness evaluates alignment with Pi Framework rules.

Project readiness covers all applicable framework rules, including specs, TDD, database specs, quality tooling, architecture/code quality, spec sync, AI harness, DoD, and commits.

## Required Reading

Read these policy files when available in the framework package or project:

- `rules/16-project-readiness.md`
- `rules/15-ai-harness.md`
- `rules/18-database-specs.md`
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

- root and nested `AGENTS.md`, `CLAUDE.md`, `.pi/settings.json`, `.pi/`, `.agents/`
- `specs/features/`, `specs/database/`, `specs/architecture/`, `specs/decisions/`, glossary
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
- Overall Readiness: N/5
- Lowest Rule Scores:
- Highest Rule Scores:

## Blockers

## Quick Wins

## Rule Scores
- Canonical Specs
- Gherkin Authoring
- Tests/TDD
- Test Quality
- Quality Tooling
- Engineering Quality
- Spec Sync
- Database Specs, when applicable
- Rebuildability
- Architecture Memory
- Incremental Commits
- AI Harness

## Recommended Plan

## Residual Risks / Unknowns
```

For every score, include evidence with file paths or explicit missing-file observations.

## Bootstrap Mode

Only after user approval, implement selected improvements such as:

- creating or updating `AGENTS.md`;
- adding missing validation scripts;
- adding spec directory skeletons;
- adding initial DBML skeletons for database projects;
- adding framework prompts or skills;
- documenting quality tooling;
- adding ADR/glossary structure.

Bootstrap Mode must follow Pi Framework policies, including quality tooling, DoD, and incremental Conventional Commits.
