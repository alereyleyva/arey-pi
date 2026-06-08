# Arey Pi

[![npm package](https://img.shields.io/npm/v/arey-pi.svg)](https://www.npmjs.com/package/arey-pi)

Arey Pi is an opinionated Pi package for spec-centred, TDD-driven software delivery.

It defines a way of working where canonical specs preserve intent,
tests execute that intent,
production code stays replaceable,
and engineering quality is non-negotiable.

## Core thesis

> Specs are durable. Tests are executable truth. Code is disposable.

Arey Pi is designed for projects that should remain understandable,
testable,
rebuildable,
and safe for humans and agents to evolve over time.

## What Arey Pi enforces

Arey Pi is built around these guarantees:

- behaviour is captured in canonical Gherkin specs;
- database projects keep canonical DBML specs precisely synchronised;
- TDD is mandatory for production behaviour changes;
- tests must be meaningful, reviewed, and strengthened with coverage or mutation testing where risk warrants it;
- architecture and code must meet a senior engineering quality bar;
- significant technical decisions are captured in high-quality ADRs;
- specs, tests, code, DBML, ADRs, glossary, and architecture docs stay synchronised;
- README files, docs, AGENTS.md, skills, prompts, rules, agents, commands, and tooling instructions are kept synchronised when affected;
- quality tooling is part of Definition of Done, not optional polish;
- work is incremental and uses Conventional Commits;
- AI harness setup is treated as a first-class project rule.

## Package contents

```txt
agents/      # Arey Pi subagent role definitions for pi-subagents
extensions/  # Slash commands for doctor, bootstrap, and workflows
skills/      # On-demand Arey Pi workflows and instructions
prompts/     # Reusable Pi prompt workflows
rules/       # Arey Pi operating rules
```

The rules are the policy layer.
The skills and prompts make those policies usable inside Pi.
The agents define the intended specialist roles for subagent-backed delivery.

## Current subagent architecture

Arey Pi is designed to work with `pi-subagents`.

The core delivery topology is:

```txt
tech-lead
├── spec-author
├── tdd-implementer
├── spec-syncer
├── engineering-reviewer
└── project-evaluator
```

The intended daily experience is natural language first:

```txt
Implement password reset following Arey Pi.
```

The parent agent should act as the tech lead,
then use specialist subagents when available for specs,
TDD implementation,
spec sync,
and engineering review.

The package includes an extension that can install those definitions into the project-local `pi-subagents` discovery path automatically.

## Installation

Install Arey Pi:

```bash
pi install npm:arey-pi
```

For project-local installation:

```bash
pi install -l npm:arey-pi
```

For subagent-backed workflows, also install `pi-subagents`:

```bash
pi install npm:pi-subagents
```

## Usage today

Audit a repository against Arey Pi readiness with the prompt workflow:

```txt
/assess-project
```

Or load the readiness skill directly:

```txt
/skill:project-readiness
```

Arey Pi also ships an extension with native workflow commands.

When the Arey Pi agents are available to `pi-subagents`, the project evaluator runtime name is:

```txt
arey-pi.project-evaluator
```

## Extension-backed workflow

Arey Pi includes a polished extension-backed workflow:

```txt
/arey-doctor      # check package, subagent, prompt, skill, and project readiness setup
/arey-bootstrap   # install project-local Arey Pi agents
/arey-bootstrap --agentsmd  # also create a starter AGENTS.md if missing
/arey-bootstrap --specs     # scaffold starter specs directories and glossary
/arey-bootstrap --docs      # scaffold starter docs directory
/arey-bootstrap --full      # scaffold agents, AGENTS.md, specs, and docs
/arey-bootstrap --force     # overwrite selected project-local Arey Pi files
/arey-feature     # run spec → TDD → sync → review for a feature
/arey-bugfix      # run regression-test-first bug fixing
/arey-sync        # verify specs, docs, tests, code, DBML, ADRs, and glossary alignment
/arey-review      # run adversarial engineering review
/arey-assess      # assess project readiness against Arey Pi rules
```

The goal is that users can either speak naturally or use explicit commands,
while Arey Pi handles the disciplined workflow behind the scenes.

See `docs/commands.md` for detailed command behaviour, options, and examples.

## Development

Arey Pi uses Bun as its package manager and Biome for extension formatting and linting.

```bash
bun install
bun run format
bun run check
```

`bun run check` runs Biome linting and TypeScript type checking.

## Rule categories

Arey Pi rules are organised as:

```txt
rules/
├── core/          # principles, work modes, DoD, conflict handling
├── specs/         # Gherkin, DBML, spec sync, language style
├── engineering/   # TDD, test quality, code quality, tooling, rebuildability
├── architecture/  # architecture memory and ADR quality
├── workflow/      # agent workflows, documentation sync, AI harness, commits
└── assessment/    # project readiness
```

See `rules/README.md` for the full policy index.

## Status

Arey Pi is pre-1.0.

The policy layer,
readiness workflow,
documentation sync rule,
core subagent role definitions,
and professional extension commands exist.

Next milestones include richer templates,
stronger bootstrap scaffolding,
and deeper integration with `pi-subagents` discovery.
