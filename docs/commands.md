# Arey Pi Commands

Arey Pi ships a Pi extension that registers native setup slash commands.
Development workflows are intentionally natural-language first:
when the package is installed,
the extension injects quiet harness guidance automatically on every agent turn.

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
When the package is installed,
the extension injects quiet harness context automatically before every agent turn.
Users can simply ask naturally:

```txt
Implementa password reset
Corrige este bug
Revisa el current diff
Evalúa este repo
```

The harness is not meant to add ceremony for the user.
It asks the agent to infer whether the request is a feature,
bugfix,
sync,
review,
assessment,
or mixed task,
then apply the corresponding Arey Pi posture.
The parent agent should act as orchestrator,
use specialist Arey Pi subagents when available,
and continue conversationally while reporting evidence naturally.

The injected harness guidance emphasises:

- `arey-pi.spec-author` for canonical specs;
- `arey-pi.tdd-implementer` for Red → Green → Refactor;
- `arey-pi.spec-syncer` for alignment;
- `arey-pi.engineering-reviewer` for fresh review;
- `arey-pi.project-evaluator` for readiness assessment;
- builtin scout/planner/reviewer/oracle-style agents for discovery, planning, and second opinions.

While Arey Pi is active,
Arey Pi applies simple tool-call guardrails:

- writes or edits to protected paths such as `.env`, `.git/`, and `node_modules/` are blocked.


## Prompt templates and skills

Arey Pi still ships focused prompt templates and skills for targeted use,
but they are optional.
The intended default is natural language plus automatic harness injection.
