# Agent Instructions

This project uses Arey Pi.

## Delivery Rules

- Treat canonical specs as the source of truth.
- Use Gherkin for behaviour specs.
- Use DBML for database specs when the project has persistence.
- Follow TDD for production behaviour changes.
- Put tests in a dedicated test/spec directory outside production source trees unless a documented project or framework convention requires otherwise.
- Keep specs, tests, code, DBML, ADRs, glossary, architecture docs, README files, docs, AGENTS.md, commands, and tooling instructions synchronised.
- Capture significant technical decisions in high-quality ADRs.
- Run formatter, lint/static analysis, typecheck, tests, and relevant dynamic analysis where available.
- Use incremental Conventional Commits for meaningful steps.

## Project Commands

Document the project-specific commands here.
Agents should run the narrowest relevant validation first,
then the composed project check before completion.

```bash
# Install dependencies
<package-manager> install

# Format
<package-manager> run format

# Lint/static analysis
<package-manager> run lint

# Typecheck
<package-manager> run typecheck

# Test
<package-manager> run test

# Full validation
<package-manager> run check
```

## Specs and Documentation

Canonical specs should live under:

```txt
specs/features/
specs/database/
specs/architecture/
specs/decisions/
specs/glossary.md
```

Project-facing documentation should live under:

```txt
docs/
README.md
AGENTS.md
```

Every completed change should report:

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

## Test Layout

Keep tests outside production source directories by default.

Preferred examples:

```txt
src/domain/accounts/password-reset.ts
tests/domain/accounts/password-reset.test.ts
```

Avoid creating colocated tests such as:

```txt
src/domain/accounts/password-reset.test.ts
```

unless this repository documents that convention explicitly.

## Subagents

Project-local Arey Pi subagents live in:

```txt
.pi/agents/arey-pi/
```

Use them through pi-subagents when available.

Suggested roles:

- `arey-pi.tech-lead` for orchestration;
- `arey-pi.spec-author` for canonical specs;
- `arey-pi.tdd-implementer` for Red-Green-Refactor;
- `arey-pi.spec-syncer` for spec and documentation alignment;
- `arey-pi.engineering-reviewer` for adversarial quality review;
- `arey-pi.project-evaluator` for readiness assessment.

## Local Overrides

Add repository-specific technology,
architecture,
safety,
and validation instructions below.

Nested `AGENTS.md` files may override or extend these instructions for specific subtrees.
