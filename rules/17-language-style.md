# Language Style

## Purpose

Pi Framework projects should communicate in the language style expected by their users, customers, and maintainers.

For this framework, the default written English standard is UK English.

## Core Rule

Use UK English for all project-facing writing unless the project explicitly defines a different language standard.

This applies to:

- Gherkin specs;
- documentation;
- ADRs;
- glossary entries;
- README files;
- AGENTS.md and AI harness instructions;
- skills and prompts;
- user-facing messages;
- error messages;
- comments intended to explain durable behaviour;
- agent summaries and reports.

## UK English Expectations

Prefer UK spellings and phrasing, for example:

- behaviour, not behaviour;
- colour, not colour;
- organise, not organise;
- analyse, not analyse;
- centre, not centre;
- licence as a noun in British usage, license as a verb;
- modelling, not modelling.

Agents should be consistent within a project and should not mix US and UK spelling casually.

## Exceptions

Do not rewrite language when it would break or distort:

- code identifiers;
- public APIs;
- package names;
- external protocol names;
- quoted material;
- third-party documentation references;
- generated code where spelling is dictated by tooling;
- established domain terms used by the customer.

If an existing codebase uses US spelling in identifiers or APIs, preserve compatibility. Prefer UK English in prose around it.

## Gherkin and Product Text

Gherkin specs should use UK English unless the product or domain requires a different spelling.

Because specs are customer-facing durable knowledge, agents should treat language consistency as part of spec quality.

## Agent Behaviour

Agents should write final answers, reports, docs, specs, and project instructions in UK English by default.

When editing existing prose, agents should avoid large spelling-only rewrites unless requested. For touched text, prefer UK English and flag widespread inconsistency as a follow-up.

## Acceptance Rule

Project-facing prose is not fully polished if it mixes UK and US English without a reason.

For important specs, docs, prompts, and harness instructions, language style consistency is part of quality review.
