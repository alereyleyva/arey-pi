# Arey Pi Documentation

This directory documents the Arey Pi package as it exists today.

## Start here

- `commands.md` documents the Pi extension commands,
  the always-on workflow runtime,
  and protected env-file guardrails.
- `adoption.md` explains how to introduce Arey Pi into an existing repository.
- `workflows.md` describes the internal delivery workflows the runtime expects agents to follow.
- `workflow-diagram.md` provides a visual workflow map.
- `pi-subagents.md` explains how Arey Pi agents should be used with `pi-subagents`.
- `templates.md` documents every bootstrap template and its project-local target.

## Current package surface

Arey Pi currently provides:

- a Pi extension at `extensions/arey-pi/`;
- setup commands `/arey-doctor` and `/arey-bootstrap`;
- automatic hidden workflow context injection before agent turns;
- env-file write/edit guardrails;
- six Arey Pi subagent role definitions;
- focused skills for readiness,
  spec sync,
  TDD,
  and engineering review;
- focused prompt templates for assessment,
  ADR review,
  feature specs,
  Red-Green-Refactor,
  drift sync,
  and engineering review;
- operating rules under `rules/`;
- bootstrap templates for `AGENTS.md`,
  specs,
  DBML,
  ADRs,
  glossary,
  and project docs.

## Maintenance rule

When package behaviour changes,
update the relevant docs in the same change:

- command or runtime changes: `commands.md`, `workflows.md`, and `README.md`;
- bootstrap target changes: `templates.md`, `commands.md`, tests, and `README.md`;
- subagent changes: `pi-subagents.md`, `agents/README.md`, and `README.md`;
- policy changes: `rules/README.md` and affected workflow docs.
