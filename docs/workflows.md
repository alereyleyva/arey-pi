# Arey Pi Workflows

Arey Pi workflows can be started with slash commands or natural language.

The slash commands make the intended process explicit.
Natural language should still follow the same rules when the user asks to work following Arey Pi.

## Feature Workflow

Command:

```txt
/arey-feature <feature request>
```

Expected flow:

```txt
tech-lead → spec-author → tdd-implementer → spec-syncer → engineering-reviewer
```

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

Command:

```txt
/arey-bugfix <bug description>
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

Command:

```txt
/arey-sync [scope]
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

Command:

```txt
/arey-review [scope]
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

Command:

```txt
/arey-assess [scope]
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
