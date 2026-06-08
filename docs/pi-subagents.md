# Using pi-subagents with Arey Pi

Arey Pi is designed to work well with `pi-subagents`.

`pi-subagents` gives the parent Pi session focused child agents for scouting,
planning,
implementation,
review,
and advisory second opinions.
Arey Pi adds an opinionated delivery framework around specs,
TDD,
quality,
and synchronisation.

## Install

Install both packages in the project:

```bash
pi install -l npm:arey-pi
pi install -l npm:pi-subagents
```

Optional:

```bash
pi install -l npm:pi-intercom
```

`pi-intercom` is useful when background child agents may need to ask the parent for a blocking decision instead of guessing.
It is not required for normal use.

Reload Pi after installation:

```txt
/reload
```

Then check setup:

```txt
/arey-doctor
/subagents-doctor
```

## Bootstrap

Run:

```txt
/arey-bootstrap
```

This installs Arey Pi's project-local subagent definitions into:

```txt
.pi/agents/arey-pi/
```

The runtime names include the package prefix:

```txt
arey-pi.tech-lead
arey-pi.spec-author
arey-pi.tdd-implementer
arey-pi.spec-syncer
arey-pi.engineering-reviewer
arey-pi.project-evaluator
```

## Parent Owns Orchestration

The parent Pi session should own orchestration.

Child agents should receive concrete,
bounded tasks.
They should not create their own subagent workflows unless explicitly launched with the `subagent` tool for a bounded fanout task.

Good parent request:

```txt
Implement password reset.
Use specialist subagents where useful.
```

Good child handoff:

```txt
Use arey-pi.tdd-implementer to implement the accepted password-reset scenarios.
Write tests under tests/,
not beside production files.
Report Red-Green-Refactor evidence and validation commands.
```

Poor child handoff:

```txt
Figure out everything and use more subagents if needed.
```

## Recommended Arey Pi Orchestration

For meaningful feature work:

```txt
clarify → spec-author → tdd-implementer → fresh reviewers → sync/fix → finalise
```

For risky decisions:

```txt
oracle → parent decision → worker or Arey Pi implementer
```

For hard codebase discovery:

```txt
scout/context-builder → planner → Arey Pi implementation workflow
```

For review loops:

```txt
worker → fresh reviewers → parent synthesis → single fix worker
```

Keep one writer in the active worktree at a time.
Use parallel agents for read-only scouting,
planning,
and review.

## Context Choices

Use fresh context for independent review:

```txt
fresh reviewers for correctness,
tests,
and simplicity
```

Fresh reviewers are less likely to inherit the parent agent's assumptions.

Use forked context for decision review where conversation history matters:

```txt
oracle reviewing current plan and assumptions
```

Forked context is useful when the child should understand prior reasoning,
but it is not a substitute for a focused task prompt.

## Builtin Agents and Arey Pi Agents

Use builtin `pi-subagents` agents for generic support:

- `scout` for local codebase reconnaissance;
- `context-builder` for implementation handoff context;
- `planner` for implementation plans;
- `worker` for generic approved implementation;
- `reviewer` for generic review and small fixes;
- `oracle` for second opinions and decision challenges;
- `researcher` for external evidence when web access is available.

Use Arey Pi agents for framework-specific delivery:

- `arey-pi.spec-author` for Gherkin,
  DBML,
  ADR,
  and glossary impact;
- `arey-pi.tdd-implementer` for strict Red-Green-Refactor;
- `arey-pi.spec-syncer` for spec and documentation sync;
- `arey-pi.engineering-reviewer` for Arey Pi quality review;
- `arey-pi.project-evaluator` for readiness audits.

## Prompting Pattern

A strong subagent task should include:

- goal;
- relevant files,
  diffs,
  specs,
  plans,
  or decisions;
- success criteria;
- hard constraints;
- validation expectations;
- expected output format;
- stop rules.

Example:

```txt
Review the current diff as arey-pi.engineering-reviewer.
Focus on correctness,
test quality and location,
simplicity,
security,
and documentation sync.
Do not modify files.
Return blocking findings first with file references.
```

## Async and Background Work

Use background subagents for long-running implementation,
large reviews,
or broad audits.

If the parent has no useful independent work while a background child runs,
end the turn and wait for completion rather than polling repeatedly.

Use status checks when needed:

```txt
Show active async runs.
```

or:

```txt
/subagents-doctor
```

## Model Overrides

Builtin `pi-subagents` agents inherit the current Pi default model.
For normal tweaks,
prefer `subagents.agentOverrides` in settings rather than copying builtin agents.

Project-local example:

```json
{
  "subagents": {
    "agentOverrides": {
      "reviewer": {
        "thinking": "high",
        "fallbackModels": ["openai/gpt-5-mini"]
      }
    }
  }
}
```

Use `.pi/settings.json` for project overrides.
Use `~/.pi/agent/settings.json` for user-wide overrides.

## Recommended Natural Language Requests

```txt
Ask oracle to challenge this plan before we edit.
```

```txt
Use scout to map the auth flow,
then ask me the clarification questions that matter.
```

```txt
Run parallel reviewers on this diff:
one for correctness,
one for tests,
and one for unnecessary complexity.
```

```txt
Have a worker implement this approved plan,
then run fresh reviewers and apply only fixes worth doing now.
```

```txt
Run a review loop on this change with a max of 3 rounds.
```

## Arey Pi Completion Rule

Subagents can contribute evidence,
but the parent session finalises.

The final response should still include:

```txt
- Specs:
- Tests/TDD, including test location:
- Validation:
- Spec sync:
- Documentation sync:
- Quality review:
- Residual risks:
```
