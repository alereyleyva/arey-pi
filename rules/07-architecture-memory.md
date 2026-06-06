# Architecture Memory

## Purpose

Architecture memory preserves durable technical decisions and system constraints outside implementation code.

It ensures future agents can understand not just what the system does, but why it is shaped that way.

## Canonical Architecture Sources

Use:

- architecture docs for current system structure and constraints;
- ADRs for decisions, tradeoffs, and consequences;
- glossary for domain language;
- Gherkin for observable behaviour affected by architecture.

Recommended locations:

```txt
specs/architecture/
specs/decisions/
specs/glossary.md
```

## When to Update Architecture Memory

Update architecture memory when work introduces or changes:

- component boundaries;
- data ownership;
- persistence strategy;
- public API shape;
- integration patterns;
- queues/events/background jobs;
- auth/security model;
- deployment/runtime assumptions;
- performance or reliability constraints;
- important dependencies;
- accepted technical debt;
- major tradeoffs or rejected alternatives.

## ADR Rule

Create or update an ADR for non-trivial decisions that future maintainers should not have to rediscover.

An ADR should capture:

- context;
- decision;
- options considered;
- consequences;
- status.

## Agent Behaviour

Agents must not leave important architecture decisions only in code comments, task summaries, or chat history.

If a task makes an architectural decision, persist it before marking the work complete.
