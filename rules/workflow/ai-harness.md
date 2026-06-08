# AI Harness

## Purpose

The AI harness is the project infrastructure that lets agents work reliably, safely, and consistently under Arey Pi.

It is a first-class Arey Pi rule, not an optional convenience and not an external concern. If agents are expected to contribute to a project, the project must expose enough context, commands, skills, prompts, and safety rails for them to do high-quality work.

## Core Rule

A project using Arey Pi must maintain an explicit AI harness appropriate to its complexity, stack, and risk.

The AI harness should make it easy for agents to discover:

- what the project is;
- how it is structured;
- which Arey Pi rules apply;
- where canonical specs live;
- how to run validation;
- which tooling is required;
- which technologies require special guidance;
- what agents must not do.

## Required Harness Components

### AGENTS.md

Projects should provide an `AGENTS.md` file with:

- project overview;
- Arey Pi instructions;
- links to relevant rules/specs;
- common setup and validation commands;
- Definition of Done expectations;
- quality tooling commands;
- commit conventions;
- safety constraints;
- project structure notes;
- known pitfalls and non-obvious conventions.

`AGENTS.md` is the bootstrap context for agents. It should be concise enough to read at startup and specific enough to prevent repeated rediscovery.

### Nested AGENTS.md

Large or multi-domain repositories may use nested `AGENTS.md` files to provide local instructions for a subtree.

Use nested files when different areas have meaningfully different:

- technology stacks;
- validation commands;
- architecture boundaries;
- domain language;
- safety constraints;
- generated file rules;
- ownership or review expectations.

Nested `AGENTS.md` files should refine or specialize the root instructions, not contradict them. If local instructions conflict with root Arey Pi rules, the conflict must be explicit and resolved by the user or project maintainers.

Because Pi loads context files from parent directories and the current working directory at startup, nested `AGENTS.md` works best when agents are launched from the relevant subtree or when the root `AGENTS.md` tells agents which nested files to read for specific areas.

### Pi Configuration

Projects should document or configure how Arey Pi is loaded, for example through:

- `.pi/settings.json`;
- package installation instructions;
- local package references;
- project README instructions;
- explicit prompts or skills.

Agents should be able to tell whether Arey Pi is installed, vendored, or expected as external context.

### Skills

Projects should provide or reference skills when agents need specialized guidance for:

- project-specific workflows;
- important frameworks or libraries;
- domain concepts;
- testing strategy;
- quality tooling;
- deployment or operations;
- security-sensitive areas.

Technology-specific skills are especially valuable when correct work depends on ecosystem details that agents may otherwise hallucinate or rediscover.

### Prompts

Projects should provide reusable prompts for common workflows when useful, such as:

- feature delivery;
- bug fix;
- spec sync;
- project assessment;
- architecture review;
- release validation;
- migration work.

Prompts should apply Arey Pi rules instead of duplicating stale instructions.

### Subagents

When `pi-subagents` is used, projects may define role agents for recurring responsibilities such as:

- planning;
- implementation;
- review;
- spec sync;
- test quality review;
- project evaluation;
- domain-specific analysis.

Subagents must respect Arey Pi role boundaries and worktree safety rules.

### Command Discoverability

Validation and setup commands should be discoverable from one or more of:

- `AGENTS.md`;
- README;
- package/build scripts;
- Makefile;
- Justfile;
- CI configuration;
- project docs.

Agents should not need to guess how to format, lint, typecheck, test, run coverage, or perform mutation testing.

### Safety Rails

The AI harness should document restrictions for:

- secrets;
- environment variables;
- destructive commands;
- database operations;
- migrations;
- generated files;
- external services;
- deployment;
- ownership or human review requirements.

## Missing Harness

If a project lacks an adequate AI harness, agents must surface the gap.

They should propose improvements and ask for approval before adding or changing harness infrastructure.

For non-trivial projects, missing `AGENTS.md`, undiscoverable validation commands, or absent safety rules are Arey Pi readiness issues.

## Harness Quality

A good AI harness is:

- concise;
- current;
- specific to the project;
- connected to canonical rules and specs;
- easy to update;
- safe by default;
- useful for both humans and agents.

A weak AI harness is:

- generic;
- stale;
- disconnected from real commands;
- missing safety constraints;
- missing technology-specific guidance;
- too verbose to be reliably followed;
- dependent on chat history.

## Acceptance Rule

A project is not fully aligned with Arey Pi unless its AI harness is adequate for the level of agent work expected in that project.

AI harness gaps should be evaluated and prioritised like any other Arey Pi rule gap.
