---
description: Implement accepted behaviour with strict Arey Pi Red-Green-Refactor
argument-hint: "<accepted behaviour or spec>"
---

Implement the accepted behaviour through strict Arey Pi TDD:

$ARGUMENTS

Rules:

- read applicable specs, tests, code, AGENTS.md, and quality tooling first;
- add or update a meaningful failing test before production behaviour changes;
- keep tests outside production source directories by default;
- implement the smallest high-quality production change to pass;
- refactor only while tests remain green;
- run formatter, lint/static analysis, typecheck, tests, and coverage/mutation checks where relevant and available;
- do not claim TDD if the Red phase cannot be demonstrated.

Prefer using `arey-pi.tdd-implementer` when available.

Return:

```txt
Red-Green-Refactor report:
- Behaviour implemented:
- Tests added/updated and location:
- Red evidence:
- Green evidence:
- Refactor notes:
- Validation commands and results:
- Spec/docs/ADR/DBML/glossary impact:
- Residual risks:
```
