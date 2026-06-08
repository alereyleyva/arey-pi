# Adopting Arey Pi

This guide explains how to introduce Arey Pi into an existing repository.

Arey Pi adoption should be incremental.
Do not rewrite a project just to satisfy the framework.
Start by making project intent,
validation,
and agent instructions discoverable.

## Recommended Adoption Path

### 1. Install the package

Install Arey Pi in the project:

```bash
pi install -l npm:arey-pi
```

For subagent-backed workflows,
install `pi-subagents` too:

```bash
pi install -l npm:pi-subagents
```

Optionally install `pi-intercom` when background subagents may need to ask the parent for blocking decisions:

```bash
pi install -l npm:pi-intercom
```

Reload Pi after installation:

```txt
/reload
```

### 2. Run doctor

Check what Pi can discover:

```txt
/arey-doctor
/subagents-doctor
```

Use these before and after bootstrap.

### 3. Bootstrap safely

Run:

```txt
/arey-bootstrap
```

With no flags,
this creates a safe starter harness where files do not already exist:

```txt
.pi/agents/arey-pi/
AGENTS.md
specs/
docs/
```

It does not overwrite existing files unless `--force` is used.

### 4. Fill project-specific commands

Edit `AGENTS.md` and replace command placeholders with real project commands.

At minimum,
agents should be able to discover:

- dependency installation;
- formatter;
- lint/static analysis;
- typecheck;
- tests;
- full validation command;
- database validation or migration checks when applicable.

### 5. Assess readiness

Ask naturally:

```txt
Evalúa este repo
```

You can also use the focused prompt template if desired:

```txt
/assess-project
```

Treat the report as a prioritised improvement plan,
not as a reason to stop work.

### 6. Adopt specs incrementally

Start with high-value behaviour:

- risky workflows;
- customer-visible behaviour;
- bug-prone areas;
- persistence boundaries;
- permissions and security-sensitive logic;
- APIs and CLI contracts.

Use Gherkin for behaviour specs.
Use DBML for database specs when the project has persistence.

### 7. Keep tests outside source trees

Prefer dedicated test roots:

```txt
tests/
test/
__tests__/
spec/
```

Mirror production module structure inside the test root where useful.

Example:

```txt
src/domain/accounts/password-reset.ts
tests/domain/accounts/password-reset.test.ts
```

Do not colocate new tests inside `src/` unless the project or framework requires it.

## Adoption Modes

### Light adoption

Use this for small projects or early evaluation.

- Install Arey Pi.
- Run `/arey-bootstrap`.
- Fill `AGENTS.md` commands.
- Add specs only for new or risky changes.

### Standard adoption

Use this for active product repositories.

- Complete light adoption.
- Add Gherkin specs for core behaviours.
- Add DBML if persistence exists.
- Add ADRs for significant decisions.
- Require natural Arey Pi sync review before completing non-trivial work.

### Strict adoption

Use this for high-risk or agent-heavy projects.

- Complete standard adoption.
- Require TDD evidence for every production behaviour change.
- Require separate test directories.
- Require readiness assessment follow-ups.
- Use engineering review for significant changes.
- Consider coverage and mutation testing for critical behaviour.

## Subagent Adoption Notes

See `docs/pi-subagents.md` for deeper guidance.

In short:

- keep orchestration in the parent Pi session;
- use Arey Pi agents for framework-specific delivery;
- use builtin `scout`,
  `planner`,
  `worker`,
  `reviewer`,
  `oracle`,
  `context-builder`,
  and `researcher` for generic support;
- prefer fresh reviewers for independent review;
- use `oracle` when the decision itself is risky;
- keep one writer in the active worktree at a time;
- use `.pi/settings.json` `subagents.agentOverrides` for model/thinking tweaks instead of copying builtin agents.

## What Not To Do

Do not:

- create low-value ADRs for trivial choices;
- generate broad specs that nobody will maintain;
- move all tests or docs in a single unrelated change;
- accept shallow generated tests as proof of quality;
- overwrite existing project conventions without review;
- treat bootstrap as a substitute for project-specific instructions.

## Completion Standard

After adoption work,
run setup diagnostics and ask for a natural readiness assessment:

```txt
/arey-doctor
Evalúa este repo
```

A good first adoption result is not perfection.
It is a repository where humans and agents can discover how to work safely,
validate changes,
and keep specs,
docs,
tests,
and code aligned.
