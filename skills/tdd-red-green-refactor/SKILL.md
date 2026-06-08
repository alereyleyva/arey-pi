---
name: tdd-red-green-refactor
description: Implement behaviour changes with Arey Pi strict Red-Green-Refactor. Use when adding features, fixing bugs, or changing production behaviour where tests must drive implementation.
---

# TDD Red-Green-Refactor

Use this skill for production behaviour changes under Arey Pi.

TDD is mandatory unless the user explicitly chooses a non-behaviour mode or a project constraint blocks it. If blocked, report the blocker; do not claim TDD evidence.

## Required Reading

Read these files when available:

- `AGENTS.md`
- `rules/engineering/tdd.md`
- `rules/engineering/test-quality.md`
- `rules/engineering/engineering-quality.md`
- `rules/engineering/quality-tooling.md`
- `rules/core/definition-of-done.md`
- `rules/specs/spec-sync.md`
- affected Gherkin specs under `specs/features/`
- existing tests and test runner configuration

## Workflow

1. **Understand accepted behaviour**
   - Identify the canonical spec, bug report, or explicit user acceptance criteria.
   - Ask focused questions if behaviour is ambiguous.

2. **Red**
   - Add or update meaningful tests before production code changes.
   - Prefer `tests/`, `test/`, `spec/`, or equivalent dedicated test directories.
   - Do not place tests inside production source directories by default.
   - Run the narrowest relevant test command and capture failure evidence.

3. **Green**
   - Implement the smallest high-quality production change.
   - Avoid speculative abstractions and broad rewrites.
   - Run the failing test again and capture passing evidence.

4. **Refactor**
   - Improve clarity/design only while tests remain green.
   - Keep behaviour unchanged during refactor.

5. **Validate**
   - Run available formatter, lint/static analysis, typecheck, tests, coverage, mutation testing, or dynamic checks appropriate to risk.
   - Surface missing quality tooling as a gap.

6. **Sync**
   - Update specs, docs, DBML, ADRs, glossary, or architecture docs when the intended behaviour or contract changed.

## Output

Return:

```txt
TDD report:
- Behaviour:
- Tests added/updated and location:
- Red evidence:
- Green evidence:
- Refactor evidence:
- Validation commands and results:
- Spec/docs/ADR/DBML/glossary impact:
- Quality notes:
- Residual risks:
```
