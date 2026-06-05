# Definition of Done

## Core Rule

A change is done only when specs, tests, and code are aligned.

Completion is not based only on code compiling or tests passing. The durable project knowledge must also be correct.

## Required Conditions

A change is complete when:

- relevant Gherkin specs exist or are explicitly confirmed unaffected;
- production behavior is covered by meaningful tests;
- test quality has been assessed with mutation testing, coverage, or explicit review appropriate to risk;
- TDD was followed for production behavior;
- bug fixes include regression tests;
- tests pass, or any inability to run them is clearly documented;
- weak, shallow, or unvalidated generated tests are not accepted as sufficient evidence;
- architecture and code quality meet the senior engineering standard defined by the framework;
- specs, tests, and code agree;
- architecture docs or ADRs are updated when durable decisions changed;
- glossary is updated when domain language changed;
- code changes are scoped and minimal for the intended behavior;
- residual risks are reported;
- incremental Conventional Commits are created when work spans meaningful steps.

## Not Done

A change is not done if:

- behavior changed but Gherkin was not updated or justified unaffected;
- tests were skipped silently;
- production code was written without TDD evidence;
- failing tests remain unresolved without explicit blocker status;
- code contradicts canonical specs;
- implementation is correct but architecturally weak, brittle, overcomplicated, or low quality;
- important decisions only exist in chat or implementation comments;
- unrelated cleanup is mixed into the change without approval.

## Completion Report

Agents should close with:

```txt
Done summary:
- Behavior/spec impact:
- Tests/TDD:
- Validation:
- Spec sync:
- Architecture/code quality:
- Architecture/ADR/glossary:
- Commits:
- Residual risks:
```
