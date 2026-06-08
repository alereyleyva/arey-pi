# Database Specs

## Purpose

Projects with a database must persist their data model as a canonical spec.

Arey AI uses DBML as the default canonical format for database structure because it is readable, diffable, tool-friendly, and independent of a specific ORM or migration tool.

## Core Rule

If a project has a database, it must have a DBML spec that is kept precisely synchronised with the real database model.

The DBML spec is not optional documentation. It is a canonical source of truth for the intended database schema and must be maintained with the same care as Gherkin behaviour specs, tests, ADRs, and architecture docs.

## Default Location

The default location is:

```txt
specs/database/schema.dbml
```

Large systems may split DBML by bounded context or database, for example:

```txt
specs/database/main.dbml
specs/database/analytics.dbml
specs/database/billing.dbml
```

If multiple files are used, the project must document how they relate to deployed databases, schemas, services, or bounded contexts.

## What Belongs in DBML

DBML should describe the durable intended database structure, including:

- tables;
- columns;
- data types;
- nullability;
- primary keys;
- foreign keys;
- unique constraints;
- indexes when behaviourally or operationally relevant;
- enums or constrained values where applicable;
- join tables;
- relationship cardinality;
- important column notes;
- table ownership or bounded context notes where useful.

## What Does Not Belong in DBML

Avoid encoding incidental implementation details that are not part of the durable data model, such as:

- temporary migration mechanics;
- one-off backfill scripts;
- ORM-only helper fields that do not exist in storage;
- environment-specific physical tuning unless it is a durable constraint;
- generated naming noise that does not clarify the model.

## Synchronisation Rule

Every database-affecting change must update DBML in the same change set.

This includes changes to:

- migrations;
- ORM models;
- schema definitions;
- SQL DDL;
- persistence code that implies a schema change;
- indexes or constraints;
- relationship cardinality;
- enum values;
- data ownership boundaries;
- soft-delete, audit, tenancy, or versioning fields;
- database-specific behaviour that affects product or operational guarantees.

If a change touches persistence code but does not alter the schema, agents must explicitly state that the DBML spec is unaffected and why.

## Precision Requirement

DBML must be synchronised to the millimetre.

Agents must not leave approximate, stale, partial, or aspirational database specs. The DBML should match the intended schema represented by migrations and deployed database contracts.

If the current database, migrations, ORM models, and DBML disagree, agents must report the drift and ask for clarification unless the intended source of truth is explicit.

## Relationship to Migrations

Migrations are executable change history. DBML is the canonical current model.

Both matter:

- migrations explain how the database changes over time;
- DBML explains what the database is intended to look like now.

A migration-only schema change is not complete without DBML synchronisation.

## Relationship to Gherkin

Gherkin describes observable behaviour. DBML describes persistent data structure.

When a behaviour change introduces or changes persisted concepts, agents should update both:

- Gherkin for the behaviour;
- DBML for the data model;
- glossary for domain terminology;
- ADR/architecture docs for non-trivial data decisions.

## Validation

When tooling exists, agents should validate DBML using the project's chosen DBML tooling or generated diagrams/checks.

When DBML validation tooling is absent, agents should still review the DBML manually and recommend adding tooling if database work is significant.

Possible validation includes:

- DBML parser/check command;
- diagram generation;
- comparison against ORM schema;
- comparison against migration output;
- database introspection in safe environments;
- review by a database-aware agent or human.

## Agent Behaviour

Before completing database-related work, agents must inspect relevant DBML specs when they exist.

If database code exists but DBML specs are missing, agents must surface the gap and propose adding DBML. For database-affecting work, adding the initial DBML spec should be treated as part of making the project Arey AI-aligned unless the user explicitly defers it.

Agents must not silently make schema changes without DBML synchronisation.

## Acceptance Rule

A database-affecting change is not done until:

- DBML exists for the affected database;
- DBML reflects the intended schema precisely;
- migrations/schema/ORM/database code and DBML agree;
- relevant Gherkin, glossary, ADRs, and architecture docs are updated when the data model change affects behaviour or durable design;
- DBML validation has run or limitations are reported.
