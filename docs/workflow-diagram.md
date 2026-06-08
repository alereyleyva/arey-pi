# Arey Pi Workflow Diagram

This diagram shows the intended Arey Pi delivery workflow.

The parent Pi session owns orchestration.
Specialist subagents contribute bounded evidence,
but the parent decides when to continue,
ask the user,
repair,
or finalise.

```mermaid
graph TD
  A["User request"] --> B["Parent acts as Arey Pi tech lead"]
  B --> C{"Classify change mode"}

  C -->|"Assessment"| EVAL["Project evaluator"]
  EVAL --> EVALREPORT["Readiness report and improvement plan"]

  C -->|"Bootstrap"| BOOT["arey-bootstrap"]
  BOOT --> HARNESS["AGENTS.md, specs, docs, templates, project agents"]
  HARNESS --> DOCTOR["arey-doctor and subagents-doctor"]

  C -->|"Direct change"| DIRECT{"Specs, tests, docs unaffected?"}
  DIRECT -->|"No or unclear"| SPEC
  DIRECT -->|"Yes, justified"| IMPL

  C -->|"Feature, bugfix, rebuild, risky change"| CONTEXT{"Enough context?"}
  CONTEXT -->|"No"| RECON["Scout, context-builder, or planner"]
  RECON --> SPEC["Spec author"]
  CONTEXT -->|"Yes"| SPEC

  SPEC --> SPECCHECK{"Canonical intent clear?"}
  SPECCHECK -->|"No"| ASK["Ask user or resolve conflict"]
  ASK --> SPEC
  SPECCHECK -->|"Yes"| IMPL["TDD implementer"]

  IMPL --> RED["Red: failing behaviour or regression test"]
  RED --> GREEN["Green: minimal high-quality implementation"]
  GREEN --> REFACTOR["Refactor while tests stay green"]
  REFACTOR --> VALIDATE["Run validation and quality tooling"]

  VALIDATE --> SYNC["Spec syncer"]
  SYNC --> SYNCCHECK{"Specs and docs aligned?"}
  SYNCCHECK -->|"No"| REPAIR["Repair sync gaps"]
  REPAIR --> VALIDATE
  SYNCCHECK -->|"Yes"| REVIEWGATE{"Risk warrants review?"}

  REVIEWGATE -->|"Yes"| REVIEW["Fresh reviewers or engineering reviewer"]
  REVIEW --> FINDINGS{"Blocking findings?"}
  FINDINGS -->|"Yes"| FIX["Single writer applies accepted fixes"]
  FIX --> VALIDATE
  FINDINGS -->|"No"| DONE

  REVIEWGATE -->|"No"| DONE["Parent finalises"]

  DONE --> REPORT["Done summary with specs, TDD, validation, sync, quality, commits, and risks"]

  ORACLE["Oracle second opinion"] -.-> B
```

## Safety Rules

- The parent session owns orchestration.
- Use fresh reviewers for independent adversarial review.
- Use `oracle` when the decision itself is risky.
- Use `scout`,
  `context-builder`,
  or `planner` before large changes when context is weak.
- Keep one writer in the active worktree at a time.
- Parallel subagents are best for read-only review,
  planning,
  scouting,
  and audits.
- Chains are best for repeatable sequential workflows where one step's output feeds the next.

## Required Completion Evidence

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
