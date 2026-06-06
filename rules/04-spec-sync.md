# Spec Sync

## Purpose

Spec sync guarantees that specs, tests, and code agree at the end of every task.

It applies whether the work started with Spec-Driven Mode or Direct Change Mode.

## Core Rule

Every completed change must end with canonical specs synchronized or explicitly confirmed unaffected.

The final result must be one of:

```txt
Specs updated
```

or:

```txt
Specs unaffected: <reason>
```

## Sync Dimensions

At task completion, agents must consider each canonical dimension:

- **Gherkin:** Did observable behaviour, API/CLI contracts, rules, errors, permissions, or edge cases change?
- **Tests:** Do tests represent the intended behaviour and trace to relevant specs where practical?
- **Architecture:** Did boundaries, dependencies, storage, integrations, or system constraints change?
- **ADRs:** Was a non-trivial decision made that future agents/developers need to know?
- **Glossary:** Was a new domain term introduced or an existing meaning changed?

## Required Behaviour

If behaviour changed, update Gherkin.

If architecture changed, update architecture docs or create/update an ADR.

If durable domain language changed, update the glossary.

If only implementation changed and behaviour stayed the same, explain why specs are unaffected and name the coverage relied on where practical.

## Conflict Handling

If specs, tests, and code disagree, agents must not silently pick the current implementation.

They must resolve the disagreement by:

- implementing the canonical spec;
- updating the spec with explicit user approval;
- or stopping for clarification.

## Final Report Format

Agents should close with a compact sync report:

```txt
Spec sync:
- Gherkin:
- Tests:
- Architecture/ADR:
- Glossary:
- Status:
```
