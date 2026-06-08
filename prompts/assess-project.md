---
description: Assess project alignment with Arey Pi rules
argument-hint: "[scope or focus]"
---

Assess this repository for Arey Pi Project Readiness.

Scope/focus: $ARGUMENTS

Run in audit mode by default: inspect and report, do not modify files.

Evaluate alignment with Arey Pi rules:

- canonical Gherkin specs
- Gherkin authoring quality
- tests and TDD support
- test quality, coverage, mutation testing readiness
- formatter/linter/static analysis/typecheck/dynamic validation
- architecture and code quality signals
- spec sync and Definition of Done
- DBML database specs when the project uses a database
- rebuildability and architecture memory
- Conventional Commits / incremental process
- AI Harness: AGENTS.md, Arey Pi setup, skills, prompts, subagents, technology guidance, command discoverability, and safety rules

Prefer using the `arey-pi.project-evaluator` subagent if available. Otherwise perform the audit directly.

Read and apply these policies when present:

- `rules/assessment/project-readiness.md`
- `rules/workflow/ai-harness.md`
- `rules/specs/database-specs.md`
- `rules/core/definition-of-done.md`
- `rules/engineering/test-quality.md`
- `rules/engineering/quality-tooling.md`
- `rules/engineering/engineering-quality.md`

Return a scored readiness report with evidence, blockers, quick wins, and a recommended implementation plan. Do not install tooling or change files unless I explicitly approve Bootstrap Mode.
