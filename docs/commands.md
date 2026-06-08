# Arey Pi Commands

Arey Pi ships a Pi extension that registers native setup slash commands.
Development workflows are intentionally natural-language first:
the extension detects Arey Pi requests and injects quiet harness guidance automatically.

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
When used alone, it applies to the default full bootstrap path.
It also creates a starter `AGENTS.md` when one does not already exist.

Examples:

```txt
/arey-bootstrap --specs --docs
/arey-bootstrap --full
/arey-bootstrap --full --force
```

Use this command after installing Arey Pi and `pi-subagents` in a repository where you want the Arey Pi agents to be discoverable by `pi-subagents`.

## Natural-language development workflows

Arey Pi is designed to work without development slash commands.
When the user explicitly opts into Arey Pi in normal language,
for example:

```txt
Implementa password reset siguiendo Arey Pi
Corrige este bug con Arey Pi
Revisa el current diff contra Arey Pi
Evalúa este repo contra Arey Pi
```

The extension starts a quiet harness workflow automatically before the agent turn.
The harness is not meant to add ceremony for the user.
It injects sequencing guidance,
persists lightweight session state,
and gives the TUI an optional checklist widget when available.
The agent should continue conversationally and report evidence naturally.

While a workflow is active,
Arey Pi applies tool-call guardrails:

- writes or edits to protected paths such as `.env`, `.git/`, and `node_modules/` are blocked;
- feature workflows warn when production files are edited before specs and Red-test phases are complete;
- bugfix workflows warn when production files are edited before reproduction and regression Red-test phases are complete.

The production-edit guardrails warn instead of blocking because real repositories vary,
but they make missing evidence visible at the exact moment the harness observes risky edits.

## Prompt templates and skills

Arey Pi still ships focused prompt templates and skills for targeted use,
but they are optional.
The intended default is natural language plus automatic harness injection.
