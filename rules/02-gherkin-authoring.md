# Gherkin Authoring

## Purpose

Gherkin feature specs persist canonical behavior in a format that is readable by humans, usable by agents, and traceable to tests.

Gherkin is the default format for functional and behavioral specs.

## Location

Canonical Gherkin specs live under:

```txt
specs/features/
```

Recommended organization is by domain or capability:

```txt
specs/features/auth/login.feature
specs/features/billing/subscription.feature
specs/features/api/users.feature
```

## What Belongs in Gherkin

Use Gherkin for:

- user-visible behavior;
- business rules;
- domain workflows;
- API behavior;
- CLI behavior;
- validation rules;
- permission rules;
- error states;
- externally observable side effects;
- important edge cases;
- bug regressions when they clarify intended behavior.

## What Does Not Belong in Gherkin

Avoid encoding incidental implementation details such as:

- class names;
- private function names;
- internal file structure;
- database queries unless externally contractual;
- framework mechanics;
- low-level algorithms unless they are part of the domain contract;
- temporary implementation workarounds.

## Style

Gherkin should be written in domain language.

Prefer clear behavioral structure:

```gherkin
Feature: Account login

  Rule: Registered users can authenticate with valid credentials

    Scenario: Successful login with valid credentials
      Given a registered user exists
      When the user submits valid credentials
      Then the system creates an authenticated session
      And the user can access their account
```

Use `Rule` when it makes business rules clearer. Use `Scenario Outline` when examples express the rule better than prose.

## Scenario Quality

A good scenario is:

- observable;
- testable;
- specific;
- written in business/domain language;
- focused on one behavior or rule;
- free of incidental implementation detail.

A scenario should be easy to map to one or more tests.

## Coverage Expectations

Feature specs should normally include:

- a happy path;
- relevant failure paths;
- important edge cases;
- permission or validation boundaries when applicable.

Do not add scenarios only for quantity. Each scenario should clarify intended behavior.

## Traceability

Tests should reference related features/scenarios where practical.

Example:

```ts
// Feature: Account login
// Scenario: Successful login with valid credentials
```

or equivalent test naming.

## Update Rule

Every observable behavior change must either:

1. add a Gherkin scenario;
2. update an existing scenario;
3. explicitly state that existing scenarios already cover the behavior;
4. stop for clarification if the change conflicts with existing Gherkin.
