# Quality Tooling

## Purpose

Code quality includes style, formatting, static analysis, and dynamic validation.

Arey AI requires projects to define and use quality tooling as part of the normal validation and Definition of Done. Tooling is not optional polish; it is part of engineering quality.

## Core Rule

Every project must have explicit quality tooling for its language and stack.

At minimum, a project should define:

- a formatter;
- a linter or static analyser;
- type checking where the language supports it;
- relevant dynamic analysis or runtime validation where practical;
- commands that agents can run consistently.

If this tooling is missing, agents must not silently proceed as if validation is complete. They must propose appropriate tooling and ask the user which option to install or configure.

## Non-Negotiable Requirement

Formatting and analysis are part of the validation phase and Definition of Done.

A change is not complete until the relevant quality commands have been run successfully, or a blocker has been explicitly reported.

## Tool Selection

Tooling should match the project language, ecosystem, and existing conventions.

Preferred examples:

- **TypeScript/JavaScript:** Biome by default when no project standard exists; otherwise follow existing ESLint/Prettier/TypeScript configuration.
- **Python:** Ruff for linting and import/style checks; Black when the project standard uses it or when formatting is not covered by Ruff configuration.
- **Rust:** `cargo fmt`, `cargo clippy`.
- **Go:** `gofmt`, `go vet`, relevant linters when configured.
- **Java/Kotlin:** project formatter/linter plus build tool checks.

These are defaults, not universal mandates. Existing project standards win unless they conflict with Arey AI's quality guarantees.

## Missing Tooling

When a project lacks quality tooling, agents must:

1. Identify the language and stack.
2. Inspect existing package/build configuration.
3. Propose a minimal quality toolchain.
4. Ask the user before installing dependencies or changing project tooling.
5. Persist the chosen commands in project scripts/docs/config.
6. Use the tooling as part of validation going forward.

Agents should not introduce major tooling churn without approval.

## Validation Commands

Projects should expose stable commands where possible, for example:

```txt
format
lint
typecheck
test
check
```

The exact command names can vary by ecosystem, but agents should be able to discover and run the standard validation path.

A good `check` command should usually compose formatting checks, lint/static analysis, type checking, and tests.

## Formatting

Formatting should be automated and deterministic.

Agents should not hand-format large code changes when a formatter exists. They should run the formatter or formatting check according to project convention.

Formatting-only changes should be isolated from behaviour changes unless explicitly approved.

## Static Analysis

Static analysis should catch issues such as:

- type errors;
- unused code;
- unreachable code;
- unsafe patterns;
- style violations;
- import/order problems;
- likely bugs;
- security-sensitive patterns where tooling supports it.

Agents must treat static analysis failures as validation failures unless explicitly classified as unrelated pre-existing issues.

## Dynamic Analysis

Where practical, projects should include dynamic validation appropriate to their risk profile, such as:

- test suites;
- mutation testing;
- property-based tests;
- runtime assertions in test environments;
- integration checks;
- security scanners;
- performance checks for performance-sensitive code.

Dynamic analysis should be selected based on risk, not added blindly.

## Existing Failures

If formatting, linting, type checking, or dynamic analysis already fails before the agent's change, the agent must:

- record the baseline failure;
- avoid making it worse;
- fix it if within scope;
- otherwise report it as pre-existing residual risk.

Do not claim validation success when quality tooling fails.

## Agent Behaviour

Before changing code, agents should inspect available tooling.

Before completion, agents should run relevant commands and report:

- formatter/check command;
- lint/static analysis command;
- typecheck command where applicable;
- test command;
- dynamic analysis command where applicable;
- failures, skips, and residual risks.

## Acceptance Rule

A code change is not done until style and analysis tooling have either passed or been explicitly blocked with evidence.

If a project has no such tooling, adding or selecting it becomes part of the engineering work and must be discussed with the user.
