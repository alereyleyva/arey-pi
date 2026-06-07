---
description: Assess project alignment with Pi Framework rules
argument-hint: "[scope or focus]"
---

Assess this repository for Pi Framework Project Readiness.

Scope/focus: $ARGUMENTS

Run in audit mode by default: inspect and report, do not modify files.

Evaluate alignment with Pi Framework rules:

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
- AI Harness: AGENTS.md, Pi Framework setup, skills, prompts, subagents, technology guidance, command discoverability, and safety rules

Prefer using the `pi-framework.project-evaluator` subagent if available. Otherwise perform the audit directly.

Read and apply these policies when present:

- `rules/16-project-readiness.md`
- `rules/15-ai-harness.md`
- `rules/18-database-specs.md`
- `rules/09-definition-of-done.md`
- `rules/12-test-quality.md`
- `rules/14-quality-tooling.md`
- `rules/13-engineering-quality.md`

Return a scored readiness report with evidence, blockers, quick wins, and a recommended implementation plan. Do not install tooling or change files unless I explicitly approve Bootstrap Mode.
