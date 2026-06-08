# Arey Pi Workflows

See `docs/workflow-diagram.md` for a visual overview of the framework workflow.

Arey Pi development workflows are natural-language first.
When the user asks to work following Arey Pi,
the extension injects quiet harness guidance automatically before the agent turn.

## Feature Workflow

Example request:

```txt
Implementa password reset siguiendo Arey Pi
```

Expected flow:

```txt
parent tech lead → arey-pi.spec-author → arey-pi.tdd-implementer → arey-pi.spec-syncer → fresh reviewers → parent finalisation
```

For broad or risky changes,
use builtin `scout`,
`context-builder`,
or `planner` before the Arey Pi delivery flow.

Use this for new behaviour or meaningful behaviour changes.

The workflow should:

1. clarify scope and change mode;
2. confirm or author canonical Gherkin specs;
3. add a failing test in a dedicated test directory;
4. implement the smallest high-quality production change;
5. refactor while tests remain green;
6. synchronise specs and documentation;
7. review engineering quality when risk warrants it;
8. report evidence and residual risks.

## Bugfix Workflow

Example request:

```txt
Corrige el bug de verificación de email con Arey Pi
```

Use this when behaviour is wrong.

Expected flow:

```txt
reproduce with failing regression test → fix → validate → sync → review
```

Bug fixes require a regression test.
The regression test should fail for the bug before the fix,
and it should live outside production source directories by default.

## Sync Workflow

Example request:

```txt
Sincroniza specs y docs con Arey Pi para el current diff
```

Use this before completing non-trivial work or when drift is suspected.

The sync check covers:

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
- skills,
  prompts,
  rules,
  agents,
  commands,
  tooling instructions,
  examples,
  and templates.

The final result should include both spec and documentation status:

```txt
Specs updated
Docs updated
```

or justified unaffected statuses.

## Review Workflow

Example request:

```txt
Revisa el current diff contra Arey Pi
```

Use this for adversarial engineering review.

Review should cover:

- architecture and code quality;
- test quality and test location;
- tooling and validation evidence;
- security and privacy;
- reliability and operability;
- maintainability;
- generated-code quality;
- spec,
  ADR,
  DBML,
  glossary,
  and documentation sync concerns.

Findings should be classified by severity.

## Assessment Workflow

Example request:

```txt
Evalúa este repo contra Arey Pi
```

Use this to assess project readiness.

The assessment is read-only by default.
It should produce scores,
evidence,
blockers,
quick wins,
and a prioritised improvement plan.

## Bootstrap Workflow

Command:

```txt
/arey-bootstrap
```

With no flags,
bootstrap installs project-local Arey Pi agents and creates starter harness files where missing.

Use selective flags only when needed:

```txt
/arey-bootstrap --agentsmd
/arey-bootstrap --specs
/arey-bootstrap --docs
/arey-bootstrap --force
```

## Subagent Orchestration Pattern

Keep orchestration in the parent Pi session.
Child agents should receive bounded tasks and should not launch their own subagent workflows unless explicitly assigned a bounded fanout job.

Use fresh-context reviewers for independent review.
Use `oracle` when a decision needs a second opinion before implementation.
Use one writer in the active worktree at a time.

For long-running work,
background subagents are appropriate.
If the parent has no useful independent work,
end the turn and wait for completion rather than polling repeatedly.

See `docs/pi-subagents.md` for detailed guidance.

## Natural Language Workflow

Users do not need to memorise commands.

This should work:

```txt
Implement password reset following Arey Pi.
```

The parent agent should act as tech lead,
select the appropriate workflow,
and use specialist subagents when available.

## Evidence Standard

Every non-trivial workflow should finish with:

```txt
Done summary:
- Behaviour/spec impact:
- Tests/TDD, including test location:
- Validation:
- Quality tooling:
- Spec sync:
- Documentation sync:
- Architecture/code quality:
- Architecture/ADR/glossary:
- Database/DBML:
- Commits:
- Residual risks:
```
