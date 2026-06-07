# Project Readiness

## Purpose

Project Readiness evaluates whether a repository is aligned with Pi Framework.

It is a meta-assessment across the framework rules. AI Harness, Language Style, Database Specs, and ADR quality are evaluated as first-class concerns alongside specs, TDD, test quality, quality tooling, architecture, spec sync, rebuildability, and process.

## Core Rule

Projects should be periodically evaluated against Pi Framework rules.

Assessment is read-only by default. Findings should produce evidence, scores, risks, and a prioritised improvement plan before any changes are made.

## Assessment Areas

Evaluate the project across these framework areas.

### Canonical Specs

Check whether:

- `specs/features/` exists where applicable;
- Gherkin specs describe meaningful observable behaviour;
- specs avoid incidental implementation details;
- important domains, APIs, CLIs, errors, permissions, and edge cases are covered;
- glossary, architecture docs, and ADRs exist when project complexity requires them.

### Gherkin Authoring

Check whether:

- scenarios are readable and domain-focused;
- scenarios are testable;
- `Feature`, `Rule`, `Scenario`, and `Scenario Outline` are used clearly;
- specs avoid duplicative or low-value scenarios;
- scenarios can be traced to tests where practical.

### Tests and TDD

Check whether:

- there is a clear test suite;
- tests are easy to run;
- tests can be traced to specs or requirements where practical;
- bug fixes have regression tests;
- test structure supports TDD;
- tests are meaningful rather than shallow generated assertions.

### Test Quality

Check whether:

- coverage is available or intentionally absent;
- mutation testing is configured for critical code or proposed as an improvement;
- tests assert behaviour rather than implementation mechanics;
- edge cases and failure paths are covered for important behaviour;
- surviving mutants or weak assertions are triaged when evidence exists.

### Quality Tooling

Check whether the project defines:

- formatter;
- linter/static analyser;
- type checking where applicable;
- test command;
- composed check/validation command;
- relevant dynamic analysis for project risk.

If tooling is absent, assessment must recommend options and mark the project as not fully aligned.

### Engineering Quality

Check whether:

- architecture is understandable;
- boundaries and responsibilities are clear;
- code follows consistent patterns;
- complexity is justified;
- the implementation reflects senior engineering standards;
- generated or agent-authored code has been reviewed for quality.

### Spec Sync

Check whether:

- specs, tests, and code appear aligned;
- behaviour changes have corresponding Gherkin updates or no-impact reasoning;
- database changes have precise DBML updates or no-impact reasoning;
- architecture/ADR/glossary updates exist when durable knowledge changed;
- Definition of Done expectations are documented.

### Database Specs

Evaluate Database Specs as a normal framework rule when the project uses persistent storage.

Check whether:

- DBML exists in `specs/database/` or another documented canonical location;
- DBML reflects tables, columns, types, keys, relationships, constraints, indexes, and relevant notes;
- migrations, ORM models, SQL DDL, and DBML agree;
- database-related changes update DBML in the same change set;
- DBML validation tooling exists or its absence is reported.

### Rebuildability

Check whether:

- important behaviour can be reconstructed from specs and tests;
- durable decisions are outside code;
- modules are not understandable only by reading implementation;
- architecture and domain knowledge are persisted.

### Architecture Memory and ADRs

Check whether:

- architecture docs exist when needed;
- ADRs capture meaningful non-trivial decisions rather than irrelevant process noise;
- ADRs explain context, options, tradeoffs, consequences, impact, and revisit conditions;
- low-value ADRs are avoided;
- glossary captures domain language;
- integrations, boundaries, ownership, and constraints are documented.

### Incremental Commits

Check whether:

- Conventional Commits are used;
- commits are incremental and coherent;
- unrelated changes are not mixed together;
- history supports review and rollback.

### AI Harness

Evaluate AI Harness as a normal framework rule.

Check whether:

- root `AGENTS.md` exists and is useful;
- nested `AGENTS.md` files exist for subtrees that need local technology, domain, command, or safety instructions;
- Pi Framework installation/reference is discoverable;
- project-local skills, prompts, and subagents exist where useful;
- technology-specific guidance is available;
- validation/setup commands are discoverable;
- safety rails for agents are documented.

Missing AI harness setup is a framework alignment gap because it prevents agents from applying the other rules consistently.

### Language Style

Evaluate Language Style as a normal framework rule.

Check whether:

- project-facing prose uses UK English by default;
- specs always use semantic line breaks;
- touched docs preserve or improve semantic line breaks;
- specs, docs, prompts, skills, reports, and harness instructions are consistent;
- US spellings are avoided unless required by identifiers, APIs, quoted material, tooling, or customer terminology;
- widespread inconsistency is captured as a follow-up rather than silently expanded.

## Scoring

Use a 0-5 score for each rule area:

| Score | Meaning |
| --- | --- |
| 0 | Missing |
| 1 | Poor |
| 2 | Partial |
| 3 | Adequate |
| 4 | Strong |
| 5 | Excellent |

Avoid false precision. Scores are meant to prioritise improvement, not gamify compliance.

## Required Report

A readiness report should include:

```txt
Project Readiness Report
- Overall readiness:
- Rule scores:
- Blockers:
- Quick wins:
- Recommended plan:
```

For each rule area, include:

```txt
- Score:
- Evidence:
- Findings:
- Recommendations:
```

## Assessment Modes

### Audit Mode

Read-only. Produce findings and recommendations. Do not modify project files.

### Bootstrap Mode

After audit and user approval, implement selected improvements such as:

- adding or updating `AGENTS.md`;
- adding missing validation scripts;
- adding spec skeletons;
- adding framework prompts or skills;
- documenting quality tooling;
- creating ADR/glossary structure.

Bootstrap Mode must still follow Pi Framework policies, including TDD where applicable, quality tooling, DoD, and incremental Conventional Commits.

## Acceptance Rule

A project is not fully ready for Pi Framework until its relevant framework rules score adequate or better for its risk and complexity.

AI Harness readiness is one of those rules, not a separate external assessment.
