---
description: Draft or update canonical Arey Pi Gherkin specs for a feature
argument-hint: "<feature request>"
---

Draft or update canonical Arey Pi feature specs for:

$ARGUMENTS

Work in spec-first mode.

Requirements:

- inspect existing `specs/features/`, glossary, ADRs, docs, tests, and related code before writing;
- identify actors, business terms, rules, assumptions, non-goals, edge cases, and open questions;
- write behaviour-focused Gherkin, not UI or implementation scripts;
- prefer `Rule` sections and concrete examples where they clarify intent;
- update glossary, ADR, DBML, architecture docs, or README only when affected;
- do not change production code;
- if requirements are ambiguous, ask focused questions instead of inventing policy.

Prefer using `arey-pi.spec-author` when available.

Return:

```txt
Spec handoff:
- Feature scope:
- Files read:
- Specs added/updated:
- Scenarios/rules covered:
- Open questions:
- Test implications:
- ADR/DBML/glossary/docs impact:
```
