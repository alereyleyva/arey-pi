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

Tests must live outside production source directories by default.
Do not colocate test files beside production files in `src/` or equivalent source trees unless an existing project convention explicitly requires it or the user approves an exception.

## Red

Before implementation, create, update, or identify a test that fails for the intended reason.

Valid Red evidence includes:

- a newly added failing test in the dedicated test directory;
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

## Test Location

Use a dedicated test/spec directory for automated tests.

Preferred locations include project conventions such as:

```txt
tests/
test/
__tests__/
spec/
```

When adding tests for code under `src/`, mirror the production module structure under the chosen test directory instead of creating sibling test files inside `src/`.

Example:

```txt
src/domain/accounts/password-reset.ts
tests/domain/accounts/password-reset.test.ts
```

If a repository already has a clear separate test root, follow it.
If it only has colocated tests, ask before continuing the pattern or migrating it.
If a framework mandates colocated tests, document the constraint in the final evidence.

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
- test location and any exception to separate test directories;
- tests not run and why;
- residual risks.
