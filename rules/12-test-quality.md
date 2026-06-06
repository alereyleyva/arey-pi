# Test Quality

## Purpose

TDD only works when tests meaningfully constrain behaviour.

This policy defines how agents should assess whether generated or modified tests are valuable, behaviour-focused, and capable of catching real regressions.

## Core Rule

A test is not good because it exists, passes, or increases coverage.

A good test fails when the intended behaviour is broken and passes for the right reason when the behaviour is implemented correctly.

## Quality Dimensions

Agents should assess test quality across these dimensions:

1. **Behavioural relevance:** the test validates behaviour that matters to users, domain rules, APIs, CLIs, integrations, or important internal contracts.
2. **Spec traceability:** the test can be connected to a Gherkin scenario, regression, ADR, or explicit requirement.
3. **Failure quality:** the test would fail for a meaningful behavioural regression, not only for incidental implementation changes.
4. **Assertion strength:** the test asserts outcomes, state changes, side effects, errors, or contracts clearly enough to catch wrong implementations.
5. **Minimal coupling:** the test avoids depending on private implementation details unless intentionally characterizing legacy code before refactor.
6. **Maintainability:** the test is readable, focused, deterministic, and not overly broad.
7. **Regression value:** for bug fixes, the test would have failed before the fix.

## Coverage

Coverage is useful but insufficient.

Agents may use coverage to detect untested areas, but they must not treat high coverage as proof of quality.

Coverage is most useful for:

- identifying unexecuted branches in changed code;
- finding missing edge case tests;
- detecting untested error paths;
- guiding review after refactors or rewrites.

Coverage is weak when:

- assertions are shallow;
- tests execute code without validating outcomes;
- tests only mirror implementation details;
- generated tests assert mocks rather than behaviour;
- coverage increases without mutation or failure evidence.

## Mutation Testing

Mutation testing is the preferred evidence for test strength when practical.

A useful test suite should kill meaningful mutants in changed behaviour.

Agents should consider mutation testing especially for:

- domain rules;
- validation logic;
- permissions and security-sensitive code;
- financial or billing logic;
- complex conditionals;
- bug fixes;
- rewrites;
- modules intended to be rebuildable from specs/tests.

Mutation testing is not required for every tiny change, but the framework should prefer it for critical or high-risk behaviour.

## Mutation Score

Mutation score thresholds are project-specific, but agents should report mutation results when available.

Suggested defaults:

- **Critical domain/security logic:** 90%+ mutation score for touched code, or explicit justification.
- **Normal behaviour changes:** 75%+ mutation score for touched code, or explicit justification.
- **Exploratory/legacy characterization:** no fixed score, but surviving meaningful mutants should be reviewed.

The score alone is not enough. Surviving mutants must be triaged for whether they represent real test gaps, equivalent mutants, or irrelevant implementation details.

## Surviving Mutants

When mutation testing finds surviving mutants, agents should classify them as:

- **test gap:** add or strengthen tests;
- **equivalent mutant:** behaviour is unchanged, document why;
- **irrelevant mutant:** not tied to durable behaviour, document why;
- **spec gap:** update Gherkin/specs because intended behaviour is unclear;
- **design smell:** implementation is too hard to specify or validate.

Do not ignore surviving mutants silently.

## Generated Test Review

Generated tests require extra scrutiny.

Agents must reject or improve tests that:

- only assert that a function was called;
- duplicate implementation logic instead of asserting behaviour;
- snapshot large outputs without explaining what matters;
- depend on arbitrary timing;
- over-mock collaborators so the real contract is not exercised;
- assert private structure instead of observable behaviour;
- pass even if important logic is removed;
- lack a clear connection to a spec, bug, or requirement.

## Negative and Edge Cases

For behaviour changes, agents should consider whether tests cover:

- happy path;
- invalid input;
- boundary values;
- missing permissions;
- error handling;
- idempotency or repeated actions;
- persistence/integration side effects;
- backwards compatibility where relevant.

Not every change needs all categories, but omitted important categories should be intentional.

## Test Review Heuristic

Before accepting a test, ask:

> If I intentionally broke the behaviour in the simplest realistic way, would this test fail?

If the answer is no, the test is probably weak.

## Required Evidence

For non-trivial production changes, agents should report:

- tests added or modified;
- related Gherkin scenarios or requirements;
- Red evidence;
- Green evidence;
- coverage results when run;
- mutation testing results when run;
- surviving mutants and their classification;
- test quality concerns or residual risks.

## When Mutation Testing Is Not Available

If mutation testing is not configured or practical, agents should report that explicitly and use alternative evidence:

- focused manual test review;
- branch/line coverage for touched code;
- deliberate failure checks;
- regression reproduction;
- edge case analysis;
- reviewer validation.

This should be reported as weaker evidence than mutation testing.

## Acceptance Rule

A change with weak tests is not complete merely because tests pass.

If tests do not meaningfully protect the intended behaviour, agents must strengthen them, report the gap as a blocker, or ask for approval to proceed with residual risk.
