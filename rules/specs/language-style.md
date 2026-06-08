# Language Style

## Purpose

Arey AI projects should communicate in the language style expected by their users, customers, and maintainers.

For Arey AI, the default written English standard is UK English.

## Core Rule

Use UK English for all project-facing writing unless the project explicitly defines a different language standard.

This applies to:

- Gherkin specs;
- DBML notes and database spec prose;
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

## Semantic Line Breaks

Specs must always use semantic line breaks.

This applies especially to:

- Gherkin feature files;
- DBML notes and documentation comments;
- ADRs;
- architecture docs;
- glossary entries;
- Markdown specs and project rules.

Use one sentence, clause, or coherent idea per line where practical.
Break lines at semantic boundaries rather than arbitrary wrapping widths.

Semantic line breaks improve:

- git diffs;
- code review;
- agent edits;
- proofreading;
- localisation;
- focused updates to canonical specs.

Do not reflow entire documents just for formatting unless requested.
When editing specs or docs, preserve or improve semantic line breaks in the touched sections.

## UK English Expectations

Prefer UK spellings and phrasing.
For example, use:

- behaviour, not the US spelling `behavior`;
- colour, not the US spelling `color`;
- organise, not the US spelling `organize`;
- analyse, not the US spelling `analyze`;
- centre, not the US spelling `center`;
- licence as a noun in British usage, and license as a verb;
- modelling, not the US spelling `modeling`.

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

If an existing codebase uses US spelling in identifiers or APIs, preserve compatibility.
Prefer UK English in prose around it.

## Gherkin and Product Text

Gherkin specs should use UK English unless the product or domain requires a different spelling.

Because specs are customer-facing durable knowledge, agents should treat language consistency and semantic line breaks as part of spec quality.

## Agent Behaviour

Agents should write final answers, reports, docs, specs, and project instructions in UK English by default.

When editing existing prose, agents should avoid large spelling-only rewrites unless requested.
For touched text, prefer UK English, preserve semantic line breaks, and flag widespread inconsistency as a follow-up.

## Acceptance Rule

Project-facing prose is not fully polished if it mixes UK and US English without a reason.

Specs are not style-compliant if they do not use semantic line breaks.

For important specs, docs, prompts, and harness instructions, language style consistency and semantic line breaks are part of quality review.
