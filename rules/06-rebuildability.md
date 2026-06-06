# Rebuildability

## Purpose

The framework treats production code as replaceable. A healthy project can discard and recreate implementation modules from durable knowledge.

## Core Rule

A module is rebuildable when another agent or developer can understand and recreate its intended behaviour from:

- Gherkin specs;
- tests;
- architecture docs;
- ADRs;
- glossary;
- project rules.

The old implementation may be useful context, but it must not be required to recover intent.

## Disposable Code Principle

Code is valuable, but it is not the canonical memory of the system.

Agents should actively move durable knowledge out of implementation-only places into specs, tests, architecture docs, ADRs, or glossary entries.

## Rebuildability Signals

A module may not be rebuildable when:

- behaviour is only discoverable by reading implementation code;
- tests assert mechanics but not intended behaviour;
- Gherkin specs are missing or stale;
- architectural constraints are implicit;
- domain terms are undefined;
- critical decisions exist only in comments, commit history, or chat.

## Rewrites

A rewrite should start from canonical specs and tests, not by copying the previous implementation.

The previous code can be inspected for migration clues, edge cases, and compatibility risks, but canonical specs/tests define the target.

## Agent Behaviour

When working on a module, agents should ask:

> Could this module be deleted and recreated from the durable project knowledge?

If the answer is no, improve the specs/tests/docs when the current task touches the relevant area.
