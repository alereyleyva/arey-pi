# Arey Pi Commands

Arey Pi ships a Pi extension that registers native setup slash commands and a runtime harness.
When the package is installed,
the extension injects quiet workflow guidance automatically before every agent turn and blocks unsafe env-file mutations.

## Command overview

```txt
/arey-doctor
/arey-bootstrap [--agentsmd] [--specs] [--docs] [--full] [--force]
```

## `/arey-doctor`

Checks whether Arey Pi is available and whether the current project is ready for subagent-backed workflows.

It reports:

- Arey Pi package version;
- current project path;
- whether packaged rules are present;
- whether packaged templates are present;
- whether packaged agents are present;
- whether `pi-subagents` appears to be installed;
- whether project-local Arey Pi agents exist in `.pi/agents/arey-pi/`;
- whether root `AGENTS.md` exists;
- whether `.pi/settings.json` exists;
- how many Arey Pi prompts and skills are discovered;
- missing project-local agent files;
- recommended next step.

Usage:

```txt
/arey-doctor
```

Use this after installing Arey Pi,
after running `/arey-bootstrap`,
or when subagent workflows are not behaving as expected.

## `/arey-bootstrap`

Installs Arey Pi's packaged subagent definitions into the current project and performs a safe starter scaffold.

With no flags, `/arey-bootstrap` runs the full bootstrap path:

```txt
--agentsmd --specs --docs
```

Default agent target:

```txt
.pi/agents/arey-pi/
```

By default, existing project-local agent files and scaffold files are not overwritten.
Starter scaffold files are copied from the packaged `templates/` directory.
Selective flags are available when you only want one part of the scaffold.

Usage:

```txt
/arey-bootstrap
```

This creates or installs, where missing:

```txt
.pi/agents/arey-pi/
AGENTS.md
specs/README.md
specs/features/README.md
specs/features/example.feature
specs/database/README.md
specs/database/schema.dbml
specs/architecture/README.md
specs/decisions/README.md
specs/decisions/0001-record-architecture-decision.md
specs/glossary.md
docs/README.md
docs/project-readiness-report.md
```

Options:

```txt
/arey-bootstrap --agentsmd
```

Also creates a starter root `AGENTS.md` when one does not already exist.

```txt
/arey-bootstrap --specs
```

Creates starter Arey Pi spec structure when files do not already exist:

```txt
specs/README.md
specs/features/README.md
specs/features/example.feature
specs/database/README.md
specs/database/schema.dbml
specs/architecture/README.md
specs/decisions/README.md
specs/decisions/0001-record-architecture-decision.md
specs/glossary.md
```

```txt
/arey-bootstrap --docs
```

Creates starter project documentation structure when files do not already exist:

```txt
docs/README.md
docs/project-readiness-report.md
```

```txt
/arey-bootstrap --full
```

Explicitly runs the same combined bootstrap path as `/arey-bootstrap` with no flags:

```txt
--agentsmd --specs --docs
```

```txt
/arey-bootstrap --force
```

Overwrites existing project-local Arey Pi agent files and scaffold files selected by the other flags.
When used alone,
it applies to the default full bootstrap path.
For `AGENTS.md`,
Arey Pi remains conservative: it creates the starter file when missing but does not replace an existing root `AGENTS.md`.

Examples:

```txt
/arey-bootstrap --specs --docs
/arey-bootstrap --full
/arey-bootstrap --full --force
```

Use this command after installing Arey Pi and `pi-subagents` in a repository where you want the Arey Pi agents to be discoverable by `pi-subagents`.

## Runtime workflow harness

Arey Pi is designed to work without separate development slash commands.
The slash commands are for setup and diagnostics;
delivery work is handled by the always-on runtime harness.

On `before_agent_start`,
the extension injects hidden Arey Pi context that asks the parent agent to:

- infer whether the request is a feature,
  bugfix,
  sync,
  review,
  assessment,
  or mixed task;
- act as the parent Arey Pi orchestrator;
- use canonical specs and strict Red → Green → Refactor for behaviour changes;
- reproduce bugs with meaningful failing regression tests before production changes;
- check drift across specs,
  tests,
  code,
  DBML,
  ADRs,
  glossary,
  README files,
  docs,
  `AGENTS.md`,
  skills,
  prompts,
  rules,
  agents,
  commands,
  templates,
  and tooling instructions;
- delegate bounded work to Arey Pi subagents when available;
- use builtin `scout`,
  `context-builder`,
  `planner`,
  `reviewer`,
  and `oracle` agents when they fit discovery,
  planning,
  second-opinion,
  or fresh-review needs;
- keep one writer in the active worktree;
- report final evidence and residual risks clearly.

The injected harness guidance references these Arey Pi agents:

- `arey-pi.spec-author` for canonical specs;
- `arey-pi.tdd-implementer` for Red → Green → Refactor;
- `arey-pi.spec-syncer` for alignment;
- `arey-pi.engineering-reviewer` for fresh review;
- `arey-pi.project-evaluator` for readiness assessment.

## Guardrails

The extension listens for `tool_call` events and blocks write/edit operations targeting env files such as:

```txt
.env
.env.local
.env.production
```

This protection is intentionally narrow.
It prevents accidental secret or environment mutation while leaving normal repository files available for legitimate work.

## Prompt templates and skills

Arey Pi still ships focused prompt templates and skills for targeted use,
but they are optional.
The intended default is conversational work plus automatic runtime harness injection.
