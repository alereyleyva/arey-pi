# Definition of Done

## Core Rule

A change is done only when specs, tests, and code are aligned.

Completion is not based only on code compiling or tests passing. The durable project knowledge must also be correct.

## Required Conditions

A change is complete when:

- relevant Gherkin specs exist or are explicitly confirmed unaffected;
- production behaviour is covered by meaningful tests;
- test quality has been assessed with mutation testing, coverage, or explicit review appropriate to risk;
- TDD was followed for production behaviour;
- bug fixes include regression tests;
- tests pass, or any inability to run them is clearly documented;
- weak, shallow, or unvalidated generated tests are not accepted as sufficient evidence;
- architecture and code quality meet the senior engineering standard defined by Arey AI;
- formatting, linting/static analysis, type checking where applicable, and relevant dynamic analysis have passed or are explicitly blocked with evidence;
- if the project lacks required quality tooling, tooling selection/configuration has been discussed with the user and captured as follow-up or implementation work;
- specs, tests, and code agree;
- architecture docs or high-quality ADRs are updated when durable decisions changed;
- DBML database specs exist and are precisely synchronised when the project has a database and the change touches schema, migrations, ORM models, or persistence contracts;
- glossary is updated when domain language changed;
- code changes are scoped and minimal for the intended behaviour;
- project-facing prose follows the configured language style, UK English by default;
- specs use semantic line breaks, and touched documentation preserves or improves semantic line breaks;
- residual risks are reported;
- incremental Conventional Commits are created when work spans meaningful steps.

## Not Done

A change is not done if:

- behaviour changed but Gherkin was not updated or justified unaffected;
- tests were skipped silently;
- production code was written without TDD evidence;
- failing tests remain unresolved without explicit blocker status;
- code contradicts canonical specs;
- database schema, migrations, ORM models, or persistence code drift from canonical DBML;
- implementation is correct but architecturally weak, brittle, overcomplicated, or low quality;
- formatter, linter/static analyser, type checker, or required dynamic analysis fails without explicit blocker status;
- the project lacks quality tooling and the gap has not been surfaced to the user;
- significant technical decisions exist only in chat, implementation comments, or low-value ADRs that do not explain context, options, tradeoffs, and consequences;
- project-facing prose mixes language styles without reason;
- specs or touched docs ignore semantic line break conventions;
- unrelated cleanup is mixed into the change without approval.

## Completion Report

Agents should close with:

```txt
Done summary:
- Behaviour/spec impact:
- Tests/TDD:
- Validation:
- Quality tooling:
- Spec sync:
- Architecture/code quality:
- Architecture/ADR/glossary:
- Database/DBML:
- Commits:
- Residual risks:
```
