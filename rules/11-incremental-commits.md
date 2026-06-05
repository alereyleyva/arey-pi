# Incremental Commits

## Purpose

Work should be committed incrementally so the project history reflects coherent steps, not one large opaque dump.

All commits must use Conventional Commits.

## Core Rule

When a task spans multiple meaningful steps, commit after each coherent unit of work.

A coherent unit may be:

- specs added or updated;
- tests added or updated;
- implementation of a focused behavior;
- refactor after green tests;
- spec sync updates;
- architecture/ADR updates;
- framework policy or agent definition changes.

## Conventional Commits

Use Conventional Commits format:

```txt
<type>(optional-scope): <description>
```

Common types:

- `feat`: new behavior or capability;
- `fix`: bug fix;
- `test`: tests only;
- `docs`: specs, rules, architecture docs, ADRs, glossary;
- `refactor`: behavior-preserving code change;
- `chore`: package/config/maintenance;
- `ci`: CI or automation;
- `build`: build system or dependencies.

Examples:

```txt
docs(rules): define canonical spec policy
test(auth): add login regression scenario
feat(auth): implement successful login flow
docs(specs): sync login Gherkin scenarios
refactor(auth): simplify session creation
```

## Commit Hygiene

Each commit should be:

- focused;
- reviewable;
- buildable where practical;
- aligned with the TDD/spec workflow;
- free from unrelated cleanup.

## Agent Behavior

Agents should commit incrementally when asked to perform repository work and the current environment allows commits.

Before committing, agents should inspect the diff and avoid committing unrelated user changes.

If there are pre-existing uncommitted changes not made by the agent, stop and ask before mixing them into a commit.

## Suggested Commit Flow

For SDD/TDD work:

```txt
docs(specs): add or update Gherkin behavior
test(scope): add failing behavior/regression tests
feat/fix(scope): implement behavior
refactor(scope): improve implementation after green tests
docs(specs): synchronize canonical specs and decisions
```

For direct small work:

```txt
test(scope): cover direct change
fix/feat/refactor(scope): apply direct change
docs(specs): record spec sync if files changed
```
