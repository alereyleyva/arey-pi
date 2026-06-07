# Architecture Decision Records

## Purpose

Architecture Decision Records persist meaningful technical decisions that shape the system over time.

ADRs are not meeting notes, implementation diaries, or paperwork.
They exist to preserve decisions with real architectural, operational, product, or long-term maintenance impact.

## Core Rule

Create an ADR when a decision is significant enough that a future senior engineer or agent would need to understand why the system works that way.

Do not create ADRs for trivial choices, obvious implementation details, or decisions that can be safely inferred from local code.

## Quality Bar

An ADR must be useful after the original conversation is forgotten.

A high-quality ADR explains:

- the context that made the decision necessary;
- the decision that was made;
- the options seriously considered;
- the tradeoffs and consequences;
- the constraints that shaped the decision;
- the expected impact on architecture, operations, data, security, testing, or delivery;
- when the decision should be revisited.

If an ADR does not clarify future work, it should not exist.

## When to Create an ADR

Create or update an ADR for decisions involving:

- major framework or platform choices;
- persistence or database strategy;
- API contracts or integration patterns;
- authentication, authorisation, security, or privacy models;
- eventing, queues, background jobs, or distributed systems;
- deployment, runtime, infrastructure, or operational constraints;
- data ownership, tenancy, retention, or migration strategy;
- module boundaries or dependency direction;
- substantial performance, reliability, or scalability tradeoffs;
- accepted technical debt with meaningful consequences;
- deviations from Pi Framework rules;
- irreversible or expensive-to-reverse choices.

## When Not to Create an ADR

Do not create ADRs for:

- tiny local refactors;
- routine bug fixes;
- obvious library usage within an existing standard;
- formatting or tooling changes with no durable tradeoff;
- implementation steps that are already clear from code and tests;
- temporary notes that belong in a task plan;
- decisions that have no meaningful future consequence.

If the decision is too small for an ADR but still worth remembering, consider updating comments, docs, glossary, or existing architecture notes instead.

## Required Structure

Use this structure unless the project already has an equivalent ADR template:

```md
# ADR-NNNN: Title

## Status

Proposed | Accepted | Superseded | Deprecated

## Relationship

Supersedes:
Superseded by:
Amends:
Amended by:
Narrows:
Expands:
Depends on:
Related:

## Scope

Where does this decision apply?
Where does it not apply?

## Context

What problem, constraint, or opportunity forced a decision?

## Decision

What did we decide?

## Options Considered

What realistic alternatives were considered?
Why were they not chosen?

## Consequences

What improves?
What gets worse?
What new constraints or responsibilities exist?

## Impact

Which areas are affected?
Consider architecture, data, security, operations, testing, specs, and delivery.

## Revisit When

What signals should cause this decision to be reviewed?
```

## Location and Naming

Default location:

```txt
specs/decisions/
```

Recommended naming:

```txt
ADR-0001-use-postgresql-for-primary-storage.md
ADR-0002-adopt-event-driven-billing-integration.md
```

Use semantic line breaks and UK English.

## Status Lifecycle

ADRs should have a clear status:

- **Proposed:** not yet accepted;
- **Accepted:** current decision;
- **Superseded:** replaced by a newer ADR;
- **Deprecated:** no longer recommended but not directly replaced.

Do not silently edit history when a major decision changes.
Prefer adding a new ADR that relates to the old one explicitly.

## Relationships Between ADRs

ADRs may overlap, refine, or replace earlier decisions.
Those relationships must be explicit.

Use relationship fields consistently:

- **Supersedes:** the new ADR fully replaces an older ADR.
- **Superseded by:** the old ADR points to the newer replacing ADR.
- **Amends:** the new ADR partially changes an older ADR while leaving the rest valid.
- **Amended by:** the old ADR points to a newer partial amendment.
- **Narrows:** the new ADR restricts where an older decision applies.
- **Expands:** the new ADR applies an older decision to additional scope.
- **Depends on:** the new ADR relies on another decision still being valid.
- **Related:** the ADRs are relevant to each other but do not change each other's status or scope.

## Supersession and Overlap

When a new ADR replaces an older decision:

1. Create a new ADR explaining why the decision changed.
2. Set the new ADR relationship to `Supersedes: ADR-NNNN`.
3. Update the old ADR status to `Superseded`.
4. Set the old ADR relationship to `Superseded by: ADR-NNNN`.
5. Update architecture docs, Gherkin, DBML, glossary, or tests when the current system truth changes.

When a new ADR only partially changes an older decision, do not mark the older ADR as fully superseded.
Use `Amends`, `Narrows`, or `Expands`, and make the affected scope explicit in both ADRs where practical.

Historical ADRs should remain readable.
Do not delete or rewrite meaningful context to make history look cleaner.

## Conflict Handling

Accepted newer ADRs only override older ADRs when the relationship is explicit.

If two accepted ADRs appear to conflict and no relationship explains the overlap, agents must stop and report the conflict.
They must not silently choose the newer, older, or easier decision.

Report conflicts with evidence:

```txt
ADR conflict detected:
- ADR-0004 says: ...
- ADR-0010 says: ...
- No supersession, amendment, narrowing, or expansion relationship found.
Decision required.
```

## Current Architecture Truth

ADRs preserve decision history.
Architecture overview docs describe the current architecture.

The current decision set is derived from:

- accepted ADRs;
- minus superseded or deprecated ADRs;
- plus explicit amendments, narrowing, expansions, and dependencies.

Because deriving current truth from many ADRs can become difficult, durable current-state architecture docs should be updated when ADRs materially change the system.

## Relationship to Specs

ADRs explain why durable technical decisions were made.
They do not replace:

- Gherkin behaviour specs;
- DBML database specs;
- tests;
- glossary entries;
- architecture overview docs.

When a decision affects behaviour, update Gherkin.
When it affects the data model, update DBML.
When it introduces domain language, update the glossary.
When it changes system structure, update architecture docs.

## Agent Behaviour

Agents must identify whether their work includes a meaningful architectural decision.

If it does, they must either:

- create or update an ADR;
- update an existing ADR's status;
- or explicitly report why an ADR is not warranted.

Agents must not create low-value ADRs just to satisfy process.

## Review Checklist

Before accepting an ADR, check:

- Does it capture a real decision, not just an implementation step?
- Is the impact significant enough to justify an ADR?
- Is the context understandable without chat history?
- Are alternatives and tradeoffs honest?
- Are consequences explicit?
- Does it say when to revisit the decision?
- Does it declare relationships to overlapping ADRs?
- Does it avoid silent conflict with accepted ADRs?
- Does it link to affected specs, DBML, architecture docs, or follow-up work where useful?
- Is it written with semantic line breaks and UK English?

## Acceptance Rule

An ADR is valuable only if it improves future decision-making.

A change is not complete when it makes or changes a significant technical decision but leaves no high-quality ADR or explicit no-ADR rationale.
