# TDD

## Purpose

TDD is mandatory for production behaviour.

Tests are the executable truth that verifies canonical specs and makes rebuildable code possible.

## Core Rule

Production behaviour must be introduced or changed through:

```txt
Red → Green → Refactor
```

This applies to features, bug fixes, behaviour changes, risky refactors, API/CLI behaviour, validation, permissions, persistence, and error handling.

## Red

Before implementation, create, update, or identify a test that fails for the intended reason.

Valid Red evidence includes:

- a newly added failing test;
- an updated failing test;
- an existing failing test that already captures the intended behaviour;
- a documented inability to run the test, including the exact intended command and reason.

A failure caused by setup, syntax, environment, or unrelated behaviour does not count as valid Red evidence.

## Green

Implement the smallest scoped change that makes the relevant test pass.

Green evidence should show:

- the relevant test passes;
- relevant surrounding tests pass where practical;
- no assertions were weakened just to pass;
- no unrelated behaviour was changed.

## Refactor

After Green, refactor only while tests remain green.

Refactoring should improve clarity, structure, duplication, or maintainability without expanding scope or changing behaviour.

## Bug Fixes

Every bug fix requires a regression test.

The expected flow is:

```txt
Reproduce with failing test → Fix → Passing regression test → Relevant suite green → Spec sync
```

## Pure Refactors

A pure refactor may rely on existing tests if the agent can explain why coverage is sufficient.

If coverage is weak and the refactor is risky, add characterization tests before changing production code.

## Prohibited Practices

Agents must not:

- write production behaviour first and tests later;
- weaken tests to make implementation pass;
- delete failing tests without justification;
- claim Red from irrelevant failures;
- skip test execution silently;
- expand scope beyond the spec/test intent.

## Evidence

Completion must report:

- related Gherkin scenario if applicable;
- Red evidence;
- Green evidence;
- refactor status;
- commands run;
- tests not run and why;
- residual risks.
