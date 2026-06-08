# Agent Instructions

This project uses Arey Pi.

## Delivery rules

- Treat canonical specs as the source of truth.
- Use Gherkin for behaviour specs.
- Use DBML for database specs when the project has persistence.
- Follow TDD for production behaviour changes.
- Keep specs, tests, code, DBML, ADRs, glossary, architecture docs, README files, docs, AGENTS.md, commands, and tooling instructions synchronised.
- Capture significant technical decisions in high-quality ADRs.
- Run formatter, lint/static analysis, typecheck, tests, and relevant dynamic analysis where available.
- Use incremental Conventional Commits for meaningful steps.

## Subagents

Project-local Arey Pi subagents live in:

```txt
.pi/agents/arey-pi/
```

Use them through pi-subagents when available.
