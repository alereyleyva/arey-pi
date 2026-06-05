---
description: Assess project alignment with Pi Framework and AI harness readiness
argument-hint: "[scope or focus]"
---

Assess this repository for Pi Framework Project Readiness.

Scope/focus: $ARGUMENTS

Run in audit mode by default: inspect and report, do not modify files.

Evaluate both:

1. Framework Alignment
   - canonical Gherkin specs
   - tests and TDD support
   - test quality, coverage, mutation testing readiness
   - formatter/linter/static analysis/typecheck/dynamic validation
   - architecture and code quality signals
   - spec sync and Definition of Done
   - Conventional Commits / incremental process

2. AI Harness Readiness
   - AGENTS.md quality
   - Pi Framework installation or references
   - project-local skills, prompts, and subagents
   - technology-specific agent guidance
   - command discoverability
   - agent safety rules

Prefer using the `pi-framework.project-evaluator` subagent if available. Otherwise perform the audit directly.

Read and apply these policies when present:

- `rules/15-project-readiness.md`
- `rules/09-definition-of-done.md`
- `rules/12-test-quality.md`
- `rules/14-quality-tooling.md`
- `rules/13-engineering-quality.md`

Return a scored readiness report with evidence, blockers, quick wins, and a recommended implementation plan. Do not install tooling or change files unless I explicitly approve Bootstrap Mode.
