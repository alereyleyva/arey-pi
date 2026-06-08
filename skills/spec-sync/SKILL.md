---
name: spec-sync
description: Find and repair drift between Arey Pi specs, tests, code, DBML, ADRs, glossary, docs, prompts, skills, agents, and tooling instructions. Use before finalising non-trivial work or when drift is suspected.
---

# Spec Sync

Use this skill to verify and restore alignment across Arey Pi project artefacts.

The goal is not to make documentation match broken implementation. The goal is to preserve canonical intent and keep executable truth, production code, and docs aligned.

## Required Reading

Read these files when available:

- `rules/specs/spec-sync.md`
- `rules/workflow/documentation-sync.md`
- `rules/specs/canonical-specs.md`
- `rules/specs/database-specs.md`
- `rules/architecture/adrs.md`
- `rules/architecture/architecture-memory.md`
- `rules/core/definition-of-done.md`
- current diff and changed files

## Inspect

Check affected areas for drift across:

- Gherkin specs under `specs/features/`;
- tests and production code;
- DBML/database schema specs;
- ADRs and architecture docs;
- glossary terms;
- README files and `docs/`;
- `AGENTS.md` and harness instructions;
- skills, prompts, rules, agents, commands, templates, examples, and package metadata;
- validation scripts and quality tooling instructions.

## Classify Findings

- **Blocking**: intent, tests, code, or docs conflict in a way that invalidates completion.
- **Recommended**: useful improvement but not completion-blocking.
- **Unaffected**: inspected or clearly not applicable.

## Repair Rules

- Fix safe mechanical drift when the intended behaviour is clear.
- Ask for a decision before changing canonical intent.
- Do not update specs merely to excuse defective implementation.
- Preserve terminology consistency with the glossary.
- Keep updates focused and incremental.

## Output

Return:

```txt
Spec sync report:
- Scope:
- Files inspected:
- Blocking drift:
- Recommended drift:
- Files changed:
- Validation commands and results:
- Specs updated/unaffected:
- Docs updated/unaffected:
- ADR/DBML/glossary impact:
- Residual risks:
```
