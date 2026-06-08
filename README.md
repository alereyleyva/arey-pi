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
- tests must be meaningful, reviewed, kept outside production source directories, and strengthened with coverage or mutation testing where risk warrants it;
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
extensions/  # Directory-style Pi extension for doctor, bootstrap, and workflows
docs/        # Package documentation
skills/      # On-demand Arey Pi workflows and instructions
prompts/     # Reusable Pi prompt workflows
rules/       # Arey Pi operating rules
templates/   # Bootstrap templates for AGENTS.md, specs, ADRs, DBML, glossary, and reports
```

The rules are the policy layer.
The skills and prompts make those policies usable inside Pi.
The agents define the intended specialist roles for subagent-backed delivery.

Arey Pi includes focused prompt templates and skills for feature specs,
strict Red-Green-Refactor,
spec drift repair,
ADR assessment,
and adversarial engineering review.

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
Implement password reset.
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

Arey Pi also ships an extension with native setup commands and automatic natural-language harness activation.

When the Arey Pi agents are available to `pi-subagents`, the project evaluator runtime name is:

```txt
arey-pi.project-evaluator
```

## Extension-backed workflow

Arey Pi includes a polished extension-backed setup and natural-language workflow harness:

```txt
/arey-doctor      # check package, subagent, prompt, skill, and project readiness setup
/arey-bootstrap   # full safe bootstrap: agents, AGENTS.md, specs, docs, and templates
/arey-bootstrap --agentsmd  # also create a starter AGENTS.md if missing
/arey-bootstrap --specs     # scaffold starter specs directories and glossary
/arey-bootstrap --docs      # scaffold starter docs directory
/arey-bootstrap --full      # explicit alias for the default full bootstrap
/arey-bootstrap --force     # full bootstrap and overwrite selected project-local files
# Development workflows are natural-language first:
# "Implementa password reset"
# "Corrige este bug"
# "Revisa el current diff"
```

The goal is that users work naturally without development commands.
When the package is installed,
Arey Pi automatically injects quiet harness context behind the scenes on every agent turn.
The parent agent infers the work mode,
acts as orchestrator,
use specialist subagents when available,
inject the relevant delivery guidance,
and apply simple event-based guardrails for protected paths.

See:

- `docs/commands.md` for setup commands and natural-language workflow behaviour;
- `docs/adoption.md` for adopting Arey Pi in an existing repository;
- `docs/workflows.md` for workflow expectations;
- `docs/workflow-diagram.md` for the visual framework workflow;
- `docs/pi-subagents.md` for optimised `pi-subagents` usage;
- `docs/templates.md` for bootstrap template details.

## Development

Arey Pi uses Bun as its package manager and Biome for extension formatting and linting.

```bash
bun install
bun run format
bun run test
bun run check
```

`bun run check` runs Biome linting, TypeScript type checking, and Bun tests.

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
and professional setup extension commands exist.

Arey Pi now includes always-on natural-language harness injection,
focused prompts,
TDD/spec-sync/review skills,
and extension-core tests.

Next improvements include stronger bootstrap scaffolding,
custom Arey Pi tools,
and deeper enforcement through Pi extension events.
