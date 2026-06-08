# Subagent Architecture

Arey Pi uses subagents to turn Arey Pi rules into repeatable delivery workflows.

Subagents are not independent product owners.
They are specialised engineering roles with bounded responsibilities, explicit handoffs, and shared commitment to canonical specs, TDD, quality, and rebuildability.

## Core Principles

### Specs remain canonical

Subagents must treat canonical specs as the source of truth.

When specs, tests, and implementation disagree, agents must not silently choose the current code.
They must resolve the conflict through the Arey Pi conflict-resolution rule.

### One owner per responsibility

Each agent owns a narrow delivery concern.

Agents may advise outside their area, but should avoid silently taking over another agent's core responsibility.
Clear ownership keeps handoffs auditable and reduces duplicated work.

### Quality is not delegated away

Specialised reviewers improve quality, but every implementation-capable agent remains responsible for high-quality work.

No agent may use later review as an excuse for weak specs, shallow tests, poor design, or missing validation.

### Handoffs must be evidence-backed

Agent handoffs should include:

- changed or relevant files;
- specs affected or explicitly unaffected;
- tests added or relied on;
- validation commands run;
- architectural decisions made or explicitly not warranted;
- residual risks and open questions.

### Stop rather than invent

When requirements, specs, ADRs, DBML, tests, or project instructions conflict, agents should stop and surface the conflict.

They must not invent policy, overwrite canonical decisions, or create low-value documentation to hide uncertainty.

## MVP Agent Set

The initial Arey Pi delivery topology is:

```txt
tech-lead
├── spec-author
├── tdd-implementer
├── spec-syncer
├── engineering-reviewer
└── project-evaluator
```

`project-evaluator` already exists and is read-only by default.
The remaining agents provide the core delivery workflow.

## Agent Responsibilities

### `tech-lead`

The orchestration agent.

Owns:

- selecting the correct change mode;
- decomposing work into spec, test, implementation, sync, and review phases;
- deciding which subagents to involve;
- preserving scope;
- resolving or escalating conflicts;
- ensuring final evidence satisfies Definition of Done.

Does not own:

- writing all implementation by default;
- bypassing TDD;
- accepting weak tests because a deadline is short;
- changing canonical decisions without explicit traceability.

### `spec-author`

The canonical-spec agent.

Owns:

- Gherkin behaviour specs;
- DBML database specs when persistence changes;
- ADR creation or updates when significant decisions are made;
- glossary and domain language updates;
- semantic line breaks and UK English in Arey Pi-facing prose;
- identifying when specs are unaffected.

Does not own:

- production implementation;
- test runner configuration;
- pretending implementation details are behaviour specs;
- creating low-value ADRs just to satisfy process.

### `tdd-implementer`

The Red-Green-Refactor agent.

Owns:

- translating accepted specs into failing tests;
- implementing the smallest high-quality production change;
- refactoring after tests pass;
- running relevant validation;
- keeping commits incremental and Conventional;
- reporting TDD evidence.

Does not own:

- changing behaviour without spec impact analysis;
- writing production code before tests for behaviour changes;
- accepting shallow generated tests;
- ignoring missing quality tooling.

### `spec-syncer`

The consistency agent.

Owns:

- comparing specs, tests, DBML, ADRs, glossary, architecture docs, and code;
- finding drift;
- producing compact sync reports;
- distinguishing `Specs updated` from `Specs unaffected: <reason>`;
- flagging unresolved canonical-source conflicts.

Does not own:

- inventing product intent;
- silently updating specs to match accidental implementation;
- resolving ADR conflicts without explicit relationship or user decision.

### `engineering-reviewer`

The adversarial quality agent.

Owns:

- architecture and code quality review;
- test quality review;
- quality tooling review;
- security, privacy, performance, operability, and maintainability concerns;
- identifying generated-code slop;
- challenging overengineering and underengineering.

Does not own:

- broad rewrites without approval;
- lowering the quality bar to fit existing code;
- approving work where validation evidence is missing without clearly marking the risk.

### `project-evaluator`

The readiness audit agent.

Owns:

- read-only assessment against Arey Pi rules;
- scoring and prioritised improvement plans;
- identifying Arey Pi gaps before bootstrap or adoption work.

Does not own:

- changing files unless explicitly invoked for bootstrap work;
- treating AI Harness, ADRs, DBML, or language style as optional when Arey Pi applies.

## Default Workflow

For meaningful feature or bug-fix work, use this sequence:

```txt
1. tech-lead classifies change mode and scope
2. spec-author writes or confirms canonical specs
3. tdd-implementer performs Red → Green → Refactor
4. spec-syncer verifies specs/tests/code and documentation alignment
5. engineering-reviewer performs adversarial review
6. tech-lead finalises evidence, risks, and commits
```

Small direct changes may skip specialised agents only when the tech lead can explicitly justify that specs, tests, architecture, DBML, ADRs, and documentation are unaffected.

## Handoff Contracts

### Spec handoff

`spec-author` to `tdd-implementer`:

```txt
Spec handoff:
- Behaviour specs:
- DBML impact:
- ADR/architecture impact:
- Glossary impact:
- Acceptance criteria:
- Open questions:
```

### Implementation handoff

`tdd-implementer` to `spec-syncer` or `engineering-reviewer`:

```txt
Implementation handoff:
- Changed files:
- Tests added/updated:
- Red-Green-Refactor evidence:
- Validation commands:
- Spec impact:
- ADR/DBML/glossary impact:
- Documentation impact:
- Residual risks:
```

### Sync handoff

`spec-syncer` to `tech-lead`:

```txt
Spec sync:
- Gherkin:
- Tests:
- Architecture/ADR:
- Database/DBML:
- Glossary:
- Documentation:
- Status:
```

### Review handoff

`engineering-reviewer` to `tech-lead`:

```txt
Engineering review:
- Blocking findings:
- Non-blocking findings:
- Test quality:
- Tooling/validation:
- Architecture/code quality:
- Security/privacy/operability:
- Recommended follow-up:
```

## Conflict Handling

Agents must escalate conflicts when:

- Gherkin and implementation disagree;
- DBML and migrations/ORM/SQL disagree;
- accepted ADRs overlap without an explicit relationship;
- tests encode behaviour not present in canonical specs;
- project instructions conflict with Arey Pi rules;
- quality tooling is missing but required for the project risk;
- user requests would bypass TDD or canonical specs.

Escalation should include evidence and a recommended path, but must not silently choose a source of truth when Arey Pi requires clarification.

## Subagent Selection Heuristics

Use `spec-author` when:

- behaviour changes;
- database schema or persistence contracts change;
- durable technical decisions are made;
- domain language changes;
- specs are missing or ambiguous.

Use `tdd-implementer` when:

- production behaviour must be changed;
- a bug needs a regression test;
- implementation should proceed from accepted specs.

Use `spec-syncer` when:

- work is near completion;
- implementation touched behaviour, persistence, architecture, domain language, usage, commands, tooling, or agent workflow;
- there is suspected drift;
- final report needs sync evidence.

Use `engineering-reviewer` when:

- code, tests, or architecture changed materially;
- generated or agent-authored code needs scrutiny;
- security, privacy, performance, or operability risks exist;
- quality tooling or test quality is uncertain.

Use `project-evaluator` when:

- adopting Arey Pi in an existing repository;
- checking readiness;
- planning bootstrap work;
- auditing Arey Pi compliance without editing files.

## Finalisation Standard

The orchestrating agent may finalise only when:

- Definition of Done evidence is present;
- spec sync is complete or explicitly unaffected;
- documentation sync is complete or explicitly unaffected;
- TDD evidence exists for behaviour changes;
- quality tooling has run or blockers are documented;
- high-impact decisions have ADRs or explicit no-ADR rationale;
- residual risks are visible;
- commits are coherent and Conventional when changes span meaningful steps.
