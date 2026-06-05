# Engineering Quality

## Purpose

Pi Framework values rebuildability, specs, and TDD because they support excellent software engineering. They are not substitutes for excellent architecture and code.

The highest implementation priority is to produce code and architecture at the level of an exceptional senior software engineer.

## Core Rule

Rebuildable does not mean disposable in quality.

Production code must be designed and implemented with care, even if it can later be discarded and recreated from specs and tests.

Agents must not use rebuildability as an excuse for rushed, sloppy, overcomplicated, fragile, or low-quality implementation.

## Priority Order

When implementing, agents should optimize for:

1. Correct behavior according to canonical specs.
2. High-quality tests that protect the behavior.
3. Excellent architecture and code quality.
4. Rebuildability from durable knowledge.
5. Delivery speed.

Speed is valuable only when it does not undermine correctness, test quality, architecture, maintainability, or validation tooling.

## Architecture Quality

Architecture should be:

- simple without being simplistic;
- cohesive;
- loosely coupled where boundaries matter;
- explicit about responsibilities;
- aligned with domain concepts;
- easy to test;
- easy to replace in parts;
- resistant to accidental complexity;
- honest about tradeoffs.

Agents should prefer designs that make invalid states hard to represent, important flows easy to understand, and future change localized.

## Code Quality

Production code should be:

- consistently formatted by project tooling;
- free of lint/static-analysis violations;
- clear;
- minimal;
- readable;
- maintainable;
- appropriately typed where the language supports it;
- explicit about errors and edge cases;
- free of unnecessary cleverness;
- free of unrelated cleanup;
- consistent with the surrounding codebase;
- structured around domain behavior rather than incidental mechanics.

Good code should make the intended behavior obvious and make incorrect changes harder.

## Senior Engineer Standard

Agents should behave like a highly experienced software engineer who:

- understands the domain before coding;
- chooses the simplest robust design;
- avoids premature abstraction;
- avoids copy-paste and hidden coupling;
- names concepts precisely;
- treats errors, boundaries, and edge cases deliberately;
- keeps changes scoped;
- leaves the system easier to understand than before;
- documents durable decisions outside code;
- challenges low-quality requirements or designs respectfully.

## Prohibited Behavior

Agents must not:

- generate code that merely satisfies tests while being poorly designed;
- hard-code behavior just to turn tests green;
- create broad abstractions without demonstrated need;
- hide complexity behind vague helpers;
- introduce global state casually;
- weaken boundaries for convenience;
- ignore errors or edge cases;
- mix unrelated refactors into feature work;
- accept brittle generated code without review;
- optimize for speed over long-term quality.

## Relationship to TDD

TDD is not only Red → Green. It includes Refactor.

After tests are green, agents must consider whether the implementation deserves a quality refactor before completion.

Refactoring is expected when the green implementation is correct but not yet clean, expressive, or maintainable.

## Relationship to Rebuildability

Rebuildability increases confidence that code can be replaced. It does not lower the quality bar for the current implementation.

A rebuildable module should still be well-designed because:

- high-quality code is easier to validate against specs;
- clean architecture makes future rewrites safer;
- good boundaries make partial replacement possible;
- readable code reduces spec drift and agent mistakes.

## Review Expectations

Engineering review should check:

- correctness;
- test strength;
- architectural fit;
- simplicity;
- cohesion and coupling;
- naming;
- error handling;
- maintainability;
- consistency with project patterns;
- unnecessary complexity;
- rebuildability.

If code is correct but poor quality, the change is not done.

## Acceptance Rule

A change is complete only when the implementation is not merely working, but also designed and written to a high engineering standard appropriate to its risk and importance.
