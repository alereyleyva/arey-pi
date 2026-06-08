# Canonical Specs

## Purpose

Canonical specs are the source of truth for intended project behaviour and durable project knowledge.

They are not secondary documentation. They are the contract that allows the implementation to be safely changed, discarded, or rebuilt.

## Canonical Sources

Arey AI recognises these canonical sources:

| Source | Purpose |
| --- | --- |
| Gherkin feature specs | Observable behaviour, workflows, business rules, API/CLI contracts, important edge cases |
| Tests | Executable verification of the specs and regression protection |
| Architecture docs | System boundaries, constraints, major components, integration models |
| DBML database specs | Canonical database structure for projects with persistent storage |
| ADRs | Important technical decisions, tradeoffs, accepted consequences |
| Glossary | Domain language, concepts, meanings, aliases, and forbidden terms |
| Project rules | Non-negotiable engineering policies and local conventions |

## Authority

Canonical specs define intended behaviour by default.

If existing code disagrees with canonical specs, agents must not assume the code is correct. They must either:

- align the implementation with the specs;
- update the specs if the user explicitly approves the new behaviour;
- or stop and ask for clarification when intent is unclear.

## Required Persistence

A behaviour, rule, decision, or constraint should be persisted canonically when it is:

- user-visible;
- externally observable;
- part of a public or internal contract;
- a business or domain rule;
- relevant to validation, permissions, errors, security, or persistence;
- important for future rebuilds;
- likely to surprise future implementers;
- needed to understand why the system is shaped a certain way.

## Non-Canonical Knowledge

The following are not sufficient as durable sources of truth by themselves:

- implementation code;
- inline comments;
- chat history;
- temporary plans;
- stale README prose;
- agent assumptions;
- inferred behaviour from current implementation.

They may inform updates, but durable knowledge must be promoted into canonical specs, tests, DBML database specs, ADRs, architecture docs, or glossary entries.

## Acceptance Rule

A change is not complete until canonical specs are either updated or explicitly confirmed unaffected.
