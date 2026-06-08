# Engineering Quality

## Purpose

Engineering quality is the standard that keeps Arey Pi from becoming a documentation and test exercise around mediocre software.

Specs, TDD, test quality, DBML, ADRs, quality tooling, and rebuildability all exist to support excellent engineering. They do not replace the need for excellent architecture and code.

Arey Pi's expectation is simple:

> Build as the most senior, careful, pragmatic software engineer on the team would build.

## Core Rule

Production code must be correct, well-tested, well-designed, maintainable, and consistent with the project's durable knowledge.

Rebuildability never lowers the quality bar. Code may be replaceable, but the current implementation must still be excellent for its context, risk, and importance.

Agents must not treat passing tests, generated code, or future rewriteability as excuses for weak design.

## Priority Order

When implementation tradeoffs arise, optimise in this order:

1. Correct behaviour according to canonical specs.
2. Meaningful tests that protect the behaviour.
3. Excellent architecture and code quality.
4. Precise synchronisation with durable knowledge.
5. Rebuildability from specs, tests, ADRs, DBML, and architecture docs.
6. Delivery speed.

Speed matters only when it does not compromise correctness, test quality, architecture, maintainability, security, operability, or validation tooling.

## Universal Design Standard

The following principles are not team style preferences. They are baseline expectations for well-built software.

Agents should apply them pragmatically, not dogmatically. A deliberate exception is acceptable only when the tradeoff is explicit and, if durable, documented in an ADR or architecture note.

## Simplicity

Prefer the simplest robust design that satisfies the known requirements.

Good simplicity removes accidental complexity without hiding essential domain complexity.

Agents should avoid:

- speculative abstractions;
- unnecessary layers;
- cleverness that obscures intent;
- generic frameworks for one concrete use case;
- premature optimisation;
- broad rewrites when a focused change is safer.

## Cohesion and Coupling

Code should have high cohesion and low unnecessary coupling.

Responsibilities should be grouped by reason to change. Dependencies should be explicit, directional, and justified.

Agents should avoid hidden coupling through global state, shared mutable data, implicit environment assumptions, temporal ordering, or undocumented side effects.

## SOLID as Engineering Heuristics

Use SOLID as practical design heuristics, not as ceremony.

- **Single Responsibility:** modules should have a clear reason to change.
- **Open/Closed:** design extension points where variation is real, not imagined.
- **Liskov Substitution:** implementations must honour the contracts they claim to satisfy.
- **Interface Segregation:** interfaces should be focused and not force irrelevant dependencies.
- **Dependency Inversion:** depend on stable abstractions when doing so reduces real coupling and improves testability.

Applying SOLID should make the system clearer. If it makes the design more abstract, indirect, or brittle without a real benefit, it is being misused.

## Clean Boundaries

Boundaries should make the system easier to understand, test, and change.

Where applicable:

- domain logic should not depend unnecessarily on infrastructure;
- I/O, frameworks, persistence, and external services should sit at the edges;
- core behaviour should be testable without heavy runtime setup;
- adapters should be replaceable;
- dependencies should point towards stable policy and domain concepts, not incidental mechanisms.

Clean architecture is not mandatory layering. It is disciplined dependency direction and clear separation of responsibilities.

## Domain Modelling

Important domain concepts should be named and represented explicitly.

Agents should prefer code that:

- uses the language of the domain;
- makes invariants visible;
- makes invalid states hard to represent where the language allows it;
- keeps business rules close to the concepts they govern;
- avoids scattering domain rules across unrelated technical plumbing.

If durable domain knowledge is discovered while coding, it should be reflected in Gherkin, glossary, tests, or architecture docs as appropriate.

## Encapsulation and Information Hiding

Implementation details should be hidden behind stable, meaningful interfaces.

Encapsulation should protect invariants and reduce the cost of change. It should not be used to obscure behaviour, hide poor naming, or create unnecessary indirection.

## Explicit Contracts

Inputs, outputs, errors, side effects, and invariants should be explicit.

Use types, schemas, validation, assertions, preconditions, postconditions, or tests as appropriate for the language and risk.

Agents should avoid APIs where callers must guess:

- what values are valid;
- what errors can occur;
- whether data is mutated;
- whether operations are idempotent;
- what external effects happen.

## Error Handling

Error handling is part of design quality.

Good error handling:

- distinguishes expected failures from programming errors;
- preserves useful diagnostic context;
- avoids swallowing errors silently;
- avoids leaking secrets;
- provides actionable messages where user-facing;
- keeps recovery paths explicit;
- is covered by tests for important failure modes.

## Security and Privacy

Security and privacy are default engineering responsibilities.

Agents should consider:

- least privilege;
- input validation;
- output encoding where relevant;
- authentication and authorisation boundaries;
- secret handling;
- safe logging;
- data minimisation;
- retention and deletion rules;
- dependency and supply-chain risk;
- tenant or user data isolation.

Security-sensitive tradeoffs must not be hidden in implementation details.

## Operability

Production-quality systems should be diagnosable and operable.

Where relevant, design should include:

- useful logs;
- metrics;
- traces;
- health checks;
- clear failure modes;
- migration and rollback considerations;
- performance characteristics that can be reasoned about.

Do not add observability noise blindly. Add the signals needed to understand and operate the system.

## Performance Awareness

Avoid premature micro-optimisation, but do not ignore obvious performance risks.

Agents should consider algorithmic complexity, N+1 queries, unbounded memory growth, excessive network calls, unnecessary serial work, lock contention, and expensive operations in hot paths.

Performance decisions that shape architecture or user-visible guarantees should be persisted in architecture docs or ADRs.

## Code Quality

Production code should be:

- consistently formatted by project tooling;
- free of lint/static-analysis violations;
- clear and readable;
- minimal but complete;
- appropriately typed where the language supports it;
- explicit about errors and edge cases;
- named with precision;
- cohesive;
- locally understandable;
- consistent with surrounding patterns;
- free of unrelated cleanup;
- structured around domain behaviour rather than incidental mechanics.

Good code makes intended behaviour obvious and incorrect changes harder.

## Refactoring Discipline

TDD is not only Red → Green. It includes Refactor.

After tests are green, agents must ask whether the implementation is clean enough to accept.

Refactoring should:

- preserve behaviour;
- keep tests green;
- improve names, boundaries, cohesion, duplication, or clarity;
- stay within scope;
- avoid mixing unrelated cleanup with feature work;
- be committed separately when it is a meaningful unit of work.

If the green implementation is correct but low quality, the work is not done.

## Generated and Agent-Written Code

Generated code and agent-written code require review.

Agents must not accept code simply because it compiles or passes tests. They must check whether it is understandable, maintainable, scoped, secure, and architecturally appropriate.

Brittle generated code, shallow abstractions, duplicated implementation logic, and hard-coded paths to satisfy tests are engineering quality failures.

## Relationship to Rebuildability

Rebuildability means the system can be recreated from durable knowledge. It does not mean current code can be careless.

High-quality code improves rebuildability because:

- clean boundaries make partial replacement safer;
- readable code reduces spec drift;
- explicit contracts make tests stronger;
- good domain modelling clarifies Gherkin and glossary entries;
- documented tradeoffs make rewrites more reliable.

## Relationship to Tooling

Formatters, linters, type checkers, static analysers, dynamic analysers, coverage, and mutation testing are part of the engineering quality system.

Tooling does not prove design excellence, but failing or absent tooling is a quality risk that must be addressed or explicitly reported.

## Prohibited Behaviour

Agents must not:

- generate code that merely satisfies tests while being poorly designed;
- hard-code behaviour just to turn tests green;
- create broad abstractions without demonstrated need;
- hide complexity behind vague helpers;
- introduce global state casually;
- weaken boundaries for convenience;
- ignore errors, edge cases, security, or privacy;
- mix unrelated refactors into feature work;
- accept brittle generated code without review;
- optimise for speed over long-term quality;
- leave important design decisions only in chat, comments, or implementation details.

## Review Expectations

Engineering review should check:

- correctness;
- test strength;
- architectural fit;
- simplicity;
- cohesion and coupling;
- SOLID principle violations where relevant;
- clean boundary and dependency direction;
- domain modelling;
- naming;
- explicit contracts;
- error handling;
- security and privacy;
- operability;
- performance risks;
- maintainability;
- consistency with project patterns;
- unnecessary complexity;
- rebuildability.

## Acceptance Rule

A change is complete only when the implementation is not merely working, but designed and written to a high engineering standard appropriate to its risk and importance.

If code is correct but architecturally weak, brittle, overcomplicated, insecure, unmaintainable, or inconsistent with durable project knowledge, it is not done.
