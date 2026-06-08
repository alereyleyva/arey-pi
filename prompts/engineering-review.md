---
description: Run an adversarial Arey Pi engineering review
argument-hint: "[scope]"
---

Run an adversarial Arey Pi engineering review for:

$ARGUMENTS

Prefer fresh-context review and use `arey-pi.engineering-reviewer` when available.

Review:

- correctness and behavioural completeness;
- architecture and code quality;
- test quality, meaningful assertions, and test location;
- TDD evidence where behaviour changed;
- formatter/lint/static analysis/typecheck/test/coverage evidence;
- security, privacy, reliability, operability, and maintainability;
- generated-code risks;
- spec, ADR, DBML, glossary, README, docs, AGENTS.md, skills, prompts, rules, agents, commands, and tooling sync.

Do not modify files unless explicitly asked to fix findings.

Return:

```txt
Engineering review:
- Scope:
- Blocking findings:
- Major findings:
- Minor findings:
- Positive evidence:
- Missing validation:
- Sync concerns:
- Recommended next actions:
```
