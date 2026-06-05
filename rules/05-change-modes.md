# Change Modes

## Purpose

The framework supports both full Spec-Driven Development and direct changes. The goal is to avoid unnecessary ceremony while preserving TDD, spec sync, and rebuildability.

## Spec-Driven Mode

Use Spec-Driven Mode for:

- new features;
- non-trivial behavior changes;
- ambiguous requirements;
- business rule changes;
- public API or CLI changes;
- architectural changes;
- module rewrites;
- security, permission, persistence, or integration behavior;
- work where future rebuildability depends on capturing intent first.

Default flow:

```txt
Intent → Gherkin/Canonical Spec → Test → Code → Refactor → Spec Sync → Review
```

## Direct Change Mode

Use Direct Change Mode for:

- small obvious fixes;
- local implementation cleanup;
- mechanical refactors;
- formatting or naming changes;
- changes fully covered by existing specs/tests;
- low-risk internal changes with no observable behavior change.

Default flow:

```txt
Intent → Test/Coverage Check → Code → Validation → Spec Sync Check → Done
```

## Non-Negotiables

Direct Change Mode does not allow agents to skip:

- TDD for production behavior;
- regression tests for bug fixes;
- final spec sync;
- conflict resolution;
- reporting residual risks.

## Escalation

Switch from Direct Change Mode to Spec-Driven Mode when:

- intent becomes ambiguous;
- behavior changes more than expected;
- specs are missing or stale;
- tests are inadequate for the risk;
- architectural or domain decisions appear;
- the change grows beyond the original small scope.
