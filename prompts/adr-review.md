---
description: Decide whether a change needs an ADR and review ADR quality
argument-hint: "[decision or change]"
---

Assess ADR impact for:

$ARGUMENTS

Inspect relevant specs, architecture docs, existing ADRs, README/docs, tests, and implementation context.

Determine whether the change records a significant technical decision because it affects architecture, data model, security model, operability, public contracts, deployment, dependency strategy, or long-term maintainability.

If an ADR is needed:

- propose the ADR title and location under `specs/decisions/`;
- capture context, decision, alternatives considered, consequences, risks, and follow-up work;
- keep the decision durable and independent of transient implementation details;
- update glossary, DBML, architecture docs, or README when affected.

If no ADR is needed, explain why.

Return:

```txt
ADR assessment:
- Decision/change reviewed:
- ADR required: yes/no
- Evidence:
- Proposed ADR changes:
- Architecture/docs/glossary/DBML impact:
- Open questions:
```
