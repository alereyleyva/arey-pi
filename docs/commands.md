# Arey Pi Commands

Arey Pi ships a Pi extension that registers native slash commands.

The commands are designed for two modes of use:

- quick explicit workflows such as `/arey-feature` or `/arey-sync`;
- natural-language work where the parent agent acts as the Arey Pi tech lead and uses the same workflow expectations.

## Command overview

```txt
/arey-doctor
/arey-bootstrap [--agentsmd] [--specs] [--docs] [--full] [--force]
/arey-feature <feature request>
/arey-bugfix <bug description>
/arey-sync [scope]
/arey-review [scope]
/arey-assess [scope]
```

## `/arey-doctor`

Checks whether Arey Pi is available and whether the current project is ready for subagent-backed workflows.

It reports:

- Arey Pi package version;
- current project path;
- whether packaged rules are present;
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
specs/database/README.md
specs/architecture/README.md
specs/decisions/README.md
specs/glossary.md
docs/README.md
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
specs/database/README.md
specs/architecture/README.md
specs/decisions/README.md
specs/glossary.md
```

```txt
/arey-bootstrap --docs
```

Creates starter project documentation structure when files do not already exist:

```txt
docs/README.md
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

## `/arey-feature`

Starts the Arey Pi feature delivery workflow.

Usage:

```txt
/arey-feature <feature request>
```

Example:

```txt
/arey-feature Add password reset with expiring email links
```

The command sends a structured request to the parent agent to act as the Arey Pi tech lead.
The expected workflow is:

```txt
spec-author → tdd-implementer → spec-syncer → engineering-reviewer
```

The workflow should:

- confirm or update canonical specs;
- preserve TDD through Red → Green → Refactor;
- synchronise specs, docs, tests, code, DBML, ADRs, glossary, and architecture docs;
- run engineering review when risk warrants it;
- report validation evidence and residual risks.

## `/arey-bugfix`

Starts the Arey Pi regression-test-first bugfix workflow.

Usage:

```txt
/arey-bugfix <bug description>
```

Example:

```txt
/arey-bugfix Users can bypass email verification by refreshing the session
```

The workflow should:

- reproduce the bug with a failing regression test;
- implement the smallest high-quality fix;
- keep TDD evidence visible;
- update Gherkin, docs, DBML, ADRs, glossary, or architecture docs when affected;
- run validation and report residual risks.

## `/arey-sync`

Runs Arey Pi sync review for the current repository or a specific scope.

Usage:

```txt
/arey-sync
/arey-sync <scope>
```

Examples:

```txt
/arey-sync
/arey-sync authentication flow
/arey-sync current diff
```

The command asks the parent agent to verify alignment across:

- Gherkin specs;
- tests;
- code;
- DBML;
- ADRs;
- glossary;
- architecture docs;
- README files;
- `docs/`;
- `AGENTS.md`;
- skills, prompts, rules, agents, examples, templates;
- command and tooling instructions.

The final report should include both:

```txt
Specs updated
```

or:

```txt
Specs unaffected: <reason>
```

and:

```txt
Docs updated
```

or:

```txt
Docs unaffected: <reason>
```

## `/arey-review`

Runs an adversarial Arey Pi engineering review.

Usage:

```txt
/arey-review
/arey-review <scope>
```

Examples:

```txt
/arey-review
/arey-review current diff
/arey-review persistence layer
```

The review should examine:

- architecture and code quality;
- test quality;
- quality tooling and validation evidence;
- security and privacy;
- reliability and operability;
- maintainability;
- spec, ADR, DBML, glossary, and documentation sync concerns;
- generated-code or agent-authored-code slop.

Findings should be classified by severity.

## `/arey-assess`

Runs Arey Pi project readiness assessment.

Usage:

```txt
/arey-assess
/arey-assess <scope>
```

Examples:

```txt
/arey-assess
/arey-assess backend package only
```

The assessment is read-only by default.
It should score the repository against Arey Pi rules,
provide evidence with file paths,
identify blockers and quick wins,
and propose a prioritised improvement plan.

Use this when adopting Arey Pi in an existing repository or checking whether a project remains aligned.

## Busy agent behaviour

Workflow commands send a user message to the current Pi session.

If the agent is idle,
the workflow starts immediately.

If the agent is already working,
the workflow is queued as a follow-up message.

## Relationship to natural language

Commands are optional.

Users can also work naturally:

```txt
Implement magic links following Arey Pi.
```

The commands exist to make common workflows explicit,
repeatable,
and easier to discover.
