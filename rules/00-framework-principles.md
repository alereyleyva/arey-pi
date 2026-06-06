# Framework Principles

## Purpose

This framework defines a software delivery model for projects that must remain understandable, testable, and rebuildable over time.

Its central premise is:

> Specs are durable. Tests are executable truth. Code is disposable.

The framework optimizes for preserving intent outside the current implementation so that code can be refactored, replaced, or fully rewritten without losing product or domain knowledge.

Rebuildability never lowers the quality bar. Pi Framework expects architecture and code to be designed and written at an exceptional senior engineering standard.

## Core Model

A project using this framework is governed by three synchronized layers:

1. **Canonical specs** define intended behaviour and durable project knowledge.
2. **Tests** execute and verify the intended behaviour.
3. **Code** implements the behaviour and may be replaced.

The implementation is not the primary memory of the project. If important behaviour, constraints, or decisions only exist in code, the project is not fully captured.

## Durable Knowledge

Durable project knowledge belongs in:

- Gherkin feature specs;
- automated tests;
- architecture documents;
- Architecture Decision Records;
- domain glossary entries;
- explicit project rules and constraints.

Production code may contain useful local explanations, but it must not be the only place where product behaviour, business rules, architectural decisions, or domain vocabulary are preserved.

## Development Guarantees

Every completed change must preserve these guarantees:

1. **Canonical behaviour is represented in specs.**
2. **Production behaviour is covered by meaningful tests.**
3. **TDD is followed for production behaviour.**
4. **Architecture and code meet a high senior engineering standard.**
5. **Specs, tests, and code are synchronized before completion.**
6. **Durable decisions are persisted outside implementation code.**
7. **The resulting system remains rebuildable from durable knowledge.**

## Work Modes

The framework supports two work modes:

- **Spec-Driven Mode** for non-trivial, ambiguous, product, domain, API, or architectural work.
- **Direct Change Mode** for small, local, obvious, or mechanical changes.

Direct Change Mode is a lighter path, not an escape hatch. It still requires TDD where production behaviour is involved and always requires final spec synchronization.

## Agent Bias

Agents should prefer the lightest workflow that preserves the guarantees.

Do not add ceremony for simple tasks, but do not close work with missing tests, stale specs, undocumented decisions, or unresolved drift.
