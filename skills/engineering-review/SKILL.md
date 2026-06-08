---
name: engineering-review
description: Perform an adversarial Arey Pi engineering review of a diff, feature, bugfix, plan, or repository area. Use to assess correctness, tests, quality tooling, security, maintainability, and spec/docs sync before completion.
---

# Engineering Review

Use this skill for independent, adversarial review.

Default mode is read-only. Do not edit files unless the user explicitly asks for fixes after findings are reported.

Prefer fresh context when running as a subagent so the review does not inherit the implementer's assumptions.

## Required Reading

Read these files when available:

- `rules/engineering/engineering-quality.md`
- `rules/engineering/test-quality.md`
- `rules/engineering/quality-tooling.md`
- `rules/engineering/tdd.md`
- `rules/core/definition-of-done.md`
- `rules/specs/spec-sync.md`
- `rules/workflow/documentation-sync.md`
- `rules/architecture/adrs.md`
- current diff, relevant specs, tests, code, and validation output

## Review Checklist

Assess:

- behaviour correctness and edge cases;
- simplicity and maintainability;
- architecture boundaries and coupling;
- security, privacy, data-loss, concurrency, auth, payments, migrations, and public API risks;
- test quality, assertion strength, and test location;
- whether TDD evidence exists for behaviour changes;
- formatter, lint/static analysis, typecheck, tests, coverage, mutation, and dynamic validation evidence;
- generated-code quality and hallucination risk;
- spec, DBML, ADR, glossary, README, docs, AGENTS.md, skills, prompts, rules, agents, commands, templates, and tooling sync.

## Severity

- **Blocker**: must fix before completion.
- **Major**: should fix before merge unless explicitly accepted.
- **Minor**: improvement or maintainability concern.
- **Question**: needs product/architecture/user decision.

## Output

Return:

```txt
Engineering review:
- Scope:
- Files inspected:
- Blockers:
- Major findings:
- Minor findings:
- Questions:
- Positive evidence:
- Missing validation:
- Sync concerns:
- Recommended next actions:
```
