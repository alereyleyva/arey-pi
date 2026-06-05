# Conflict Resolution

## Purpose

This policy defines what to do when user requests, specs, tests, and code disagree.

## Authority Order

Default authority order:

1. Explicit current user instruction.
2. Canonical specs.
3. Tests.
4. Existing code.
5. Agent inference.

This order does not mean every user instruction should silently overwrite specs. If a user instruction changes intended behavior, specs must be updated explicitly.

## Spec vs Code

If canonical specs and code disagree, specs define intended behavior by default.

Agents should either align code with specs or ask whether the spec should change.

## Spec vs Tests

If tests and specs disagree, resolve the mismatch before relying on either one.

Possible outcomes:

- update tests to match specs;
- update specs with explicit approval;
- ask for clarification.

## User Request vs Specs

If the user requests behavior that conflicts with canonical specs, the agent must treat it as a possible spec change.

The task should include spec updates unless the user explicitly says not to persist the new behavior, in which case the agent should clarify the intended lifecycle of the change.

## Code vs Tests

If tests fail against current code, agents must determine whether:

- the code is wrong;
- the test is stale or incorrect;
- the spec is missing or ambiguous;
- the environment is broken.

Do not delete or weaken tests without understanding the mismatch.

## Ambiguity

Ask for clarification when resolving the conflict would require a product, domain, or architectural decision that is not already clear.

Do not hide uncertainty by choosing the easiest implementation path.
