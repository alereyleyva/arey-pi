# Documentation Sync

## Purpose

Documentation sync ensures that project-facing instructions and operational knowledge stay aligned with the change that was made.

It complements spec sync.
Specs preserve canonical product and system intent.
Documentation sync preserves how humans and agents understand, use, operate, and extend the project.

## Core Rule

Every completed change must consider whether documentation needs to be updated.

The final result must include one of:

```txt
Docs updated
```

or:

```txt
Docs unaffected: <reason>
```

Do not leave users, maintainers, or future agents with stale instructions.

## Documentation Dimensions

At task completion, agents must consider whether the change affects:

- `README.md` files;
- `docs/` content;
- root or nested `AGENTS.md` files;
- Pi prompts, skills, rules, agents, or extension docs;
- developer setup, commands, package manager, tooling, or validation instructions;
- public API, CLI, configuration, environment variables, or deployment instructions;
- architecture overview docs;
- ADR indexes or decision references;
- troubleshooting, operational runbooks, or release notes;
- examples, templates, or onboarding material.

## Required Behaviour

If user-facing usage changes, update README or docs.

If agent behaviour, commands, safety rules, or project workflow changes, update `AGENTS.md`, skills, prompts, rules, or agent docs as appropriate.

If development commands, package manager, tooling, validation, or release process changes, update developer documentation.

If architecture or operational expectations change, update architecture docs, runbooks, or ADR references where appropriate.

If docs are unaffected, explain why in the final report.

## Quality Bar

Documentation updates must be accurate, minimal, and useful.

Agents must avoid:

- stale command examples;
- documenting features that do not exist;
- copying policy text into multiple places when a link or reference is better;
- broad doc rewrites unrelated to the change;
- mixing language styles;
- ignoring semantic line breaks in specs or touched docs.

## Relationship to Spec Sync

Spec sync answers whether canonical behaviour and durable project knowledge are aligned.

Documentation sync answers whether users, maintainers, and agents have the correct operational instructions.

Both checks are required before completion.

## Final Report Format

Agents should include documentation sync in final reports:

```txt
Documentation sync:
- README/docs:
- AGENTS.md/AI harness:
- Skills/prompts/rules/agents:
- Developer commands/tooling:
- Status:
```
