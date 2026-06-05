# Framework Principles

## Purpose

This framework defines a software delivery model for projects that must remain understandable, testable, and rebuildable over time.

Its central premise is:

> Specs are durable. Tests are executable truth. Code is disposable.

The framework optimizes for preserving intent outside the current implementation so that code can be refactored, replaced, or fully rewritten without losing product or domain knowledge.

## Core Model

A project using this framework is governed by three synchronized layers:

1. **Canonical specs** define intended behavior and durable project knowledge.
2. **Tests** execute and verify the intended behavior.
3. **Code** implements the behavior and may be replaced.

The implementation is not the primary memory of the project. If important behavior, constraints, or decisions only exist in code, the project is not fully captured.

## Durable Knowledge

Durable project knowledge belongs in:

- Gherkin feature specs;
- automated tests;
- architecture documents;
- Architecture Decision Records;
- domain glossary entries;
- explicit project rules and constraints.

Production code may contain useful local explanations, but it must not be the only place where product behavior, business rules, architectural decisions, or domain vocabulary are preserved.

## Development Guarantees

Every completed change must preserve these guarantees:

1. **Canonical behavior is represented in specs.**
2. **Production behavior is covered by tests.**
3. **TDD is followed for production behavior.**
4. **Specs, tests, and code are synchronized before completion.**
5. **Durable decisions are persisted outside implementation code.**
6. **The resulting system remains rebuildable from durable knowledge.**

## Work Modes

The framework supports two work modes:

- **Spec-Driven Mode** for non-trivial, ambiguous, product, domain, API, or architectural work.
- **Direct Change Mode** for small, local, obvious, or mechanical changes.

Direct Change Mode is a lighter path, not an escape hatch. It still requires TDD where production behavior is involved and always requires final spec synchronization.

## Agent Bias

Agents should prefer the lightest workflow that preserves the guarantees.

Do not add ceremony for simple tasks, but do not close work with missing tests, stale specs, undocumented decisions, or unresolved drift.
