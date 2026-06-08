# Spec Sync

## Purpose

Spec sync guarantees that specs, tests, and code agree at the end of every task.

It applies whether the work started with Spec-Driven Mode or Direct Change Mode.

## Core Rule

Every completed change must end with canonical specs synchronised or explicitly confirmed unaffected.

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
- **Database/DBML:** Did migrations, ORM models, SQL DDL, schema definitions, indexes, constraints, relationships, or persistence contracts change?
- **ADRs:** Was a meaningful technical decision made that future agents/developers need to understand, and is it important enough for a high-quality ADR rather than process noise?
- **Glossary:** Was a new domain term introduced or an existing meaning changed?
- **Documentation:** Did README files, docs, AGENTS.md, skills, prompts, rules, agents, examples, templates, commands, or tooling instructions change or need to change?

## Required Behaviour

If behaviour changed, update Gherkin.

If architecture changed, update architecture docs or create/update a high-quality ADR when the decision has durable impact.

If database structure changed, update the canonical DBML spec precisely.

If durable domain language changed, update the glossary.

If usage, setup, commands, agent instructions, tooling, or project workflow changed, update documentation or explicitly confirm docs are unaffected.

If only implementation changed and behaviour stayed the same, explain why specs and docs are unaffected and name the coverage relied on where practical.

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
- Database/DBML:
- Glossary:
- Documentation:
- Status:
```
