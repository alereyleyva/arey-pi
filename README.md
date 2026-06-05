# Pi Framework

A Pi package for software delivery where canonical Gherkin specs are the source of truth, tests are executable truth, and production code is replaceable.

## Core thesis

> Specs are durable. Tests are executable truth. Code is disposable.

The framework is designed around:

- canonical behavior persisted as Gherkin specs;
- non-negotiable TDD for production behavior;
- mandatory synchronization between specs, tests, and code;
- rebuildable modules that can be discarded and recreated from durable project knowledge;
- incremental work with Conventional Commits.

## Package contents

```txt
agents/      # Pi subagent role definitions, when pi-subagents is installed
skills/      # On-demand framework workflows and instructions
prompts/     # Reusable Pi prompt workflows
rules/       # Framework policies and operating rules
templates/   # Project/spec/ADR templates
```

## Status

Initial architecture and policy drafting in progress.
