# Arey Pi

A Pi package for software delivery where canonical Gherkin specs are the source of truth, tests are executable truth, production code is replaceable, and engineering quality is non-negotiable.

## Core thesis

> Specs are durable. Tests are executable truth. Code is disposable.

Arey Pi is designed around:

- canonical behaviour persisted as Gherkin specs;
- non-negotiable TDD for production behaviour;
- mandatory synchronisation between specs, tests, and code;
- rebuildable modules that can be discarded and recreated from durable project knowledge;
- incremental work with Conventional Commits.

## Installation

```bash
pi install npm:arey-pi
```

For project-local installation:

```bash
pi install -l npm:arey-pi
```

## Package contents

```txt
agents/      # Pi subagent role definitions, when pi-subagents is installed
skills/      # On-demand Arey Pi workflows and instructions
prompts/     # Reusable Pi prompt workflows
rules/       # Framework policies and operating rules
templates/   # Project/spec/ADR templates
```

## Usage

Use the readiness workflow to audit a project:

```txt
/assess-project
```

Or load the skill directly:

```txt
/skill:project-readiness
```

When `pi-subagents` is installed, the package also provides:

```txt
arey-pi.project-evaluator
```

## Status

Initial architecture and policy drafting in progress.
