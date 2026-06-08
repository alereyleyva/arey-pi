# Arey Pi Templates

Arey Pi ships starter templates used by `/arey-bootstrap`.

Templates are intentionally useful but generic.
They should be edited after bootstrap to reflect the real project.

## Template List

```txt
templates/AGENTS.md
templates/adr.md
templates/feature.feature
templates/database.dbml
templates/glossary.md
templates/project-readiness-report.md
templates/specs-readme.md
templates/features-readme.md
templates/database-readme.md
templates/architecture-readme.md
templates/decisions-readme.md
templates/docs-readme.md
```

## Bootstrap Targets

`/arey-bootstrap` maps templates to project files:

```txt
templates/AGENTS.md                         → AGENTS.md
templates/specs-readme.md                   → specs/README.md
templates/features-readme.md                → specs/features/README.md
templates/feature.feature                   → specs/features/example.feature
templates/database-readme.md                → specs/database/README.md
templates/database.dbml                     → specs/database/schema.dbml
templates/architecture-readme.md            → specs/architecture/README.md
templates/decisions-readme.md               → specs/decisions/README.md
templates/adr.md                            → specs/decisions/0001-record-architecture-decision.md
templates/glossary.md                       → specs/glossary.md
templates/docs-readme.md                    → docs/README.md
templates/project-readiness-report.md       → docs/project-readiness-report.md
```

Existing files are not overwritten unless `--force` is used.

## `AGENTS.md`

The `AGENTS.md` template provides project-level AI harness instructions.

After bootstrap,
replace placeholders with real project commands:

- dependency installation;
- formatting;
- lint/static analysis;
- typecheck;
- tests;
- full validation;
- database validation when applicable.

Add local architecture,
safety,
and operational constraints.

Use nested `AGENTS.md` files for subtrees that need local instructions.

## `feature.feature`

The Gherkin template includes:

- tags;
- a feature description;
- actor/outcome framing;
- a rule section;
- background context;
- happy path;
- scenario outline for validation or boundary cases;
- regression scenario.

Delete sections that are not useful for the real behaviour.
Do not keep placeholder scenarios as fake coverage.

## `database.dbml`

The DBML template demonstrates:

- project metadata;
- enum modelling;
- primary keys;
- unique constraints;
- indexes;
- foreign-key relationships;
- JSON payload notes;
- table notes.

Replace the example schema with the canonical project schema.
Do not leave example tables in a real project unless they are clearly marked as placeholders and not used as canonical truth.

## `adr.md`

The ADR template is decision-focused.

Use it for significant technical decisions,
not routine implementation details.

A good ADR should include:

- status;
- date;
- context;
- decision drivers;
- options considered;
- the chosen decision;
- consequences;
- validation;
- supersession and relationship metadata;
- revisit conditions.

## `glossary.md`

The glossary template is for durable domain language.

Add terms when names or meanings matter to behaviour,
specs,
architecture,
or user-facing concepts.

Do not use it as a dumping ground for obvious technical vocabulary.

## `project-readiness-report.md`

The readiness report template captures Arey Pi assessment output.

Use it when you want a persistent audit snapshot under `docs/`.
For routine checks,
`/arey-assess` can report directly in the session.

## Template Maintenance

When templates change,
update:

- `docs/templates.md`;
- `docs/commands.md` if bootstrap behaviour changes;
- `README.md` if user-facing package behaviour changes;
- extension tests if scaffold targets change.
