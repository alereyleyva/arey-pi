---
description: Find and fix Arey Pi spec, docs, tests, and implementation drift
argument-hint: "[scope]"
---

Run Arey Pi sync review for:

$ARGUMENTS

If no scope is provided, inspect the current repository or current diff.

Verify alignment across:

- canonical Gherkin specs;
- tests and production code;
- DBML/database schema specs;
- ADRs and architecture docs;
- glossary/business terminology;
- README files and `docs/`;
- AGENTS.md, skills, prompts, rules, agents, commands, templates, and tooling instructions.

Prefer using `arey-pi.spec-syncer` when available.

Classify drift as:

- blocking: must fix before completion;
- recommended: should fix soon but does not invalidate current work;
- unaffected: explicitly checked or not applicable.

Fix safe drift when intent is clear. Ask before changing canonical intent.

End with:

```txt
Sync report:
- Scope:
- Blocking drift:
- Recommended drift:
- Files changed:
- Validation:
- Specs updated/unaffected:
- Docs updated/unaffected:
- Residual risks:
```
