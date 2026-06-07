# Agent Workflows

## Purpose

This policy defines how agents should collaborate without corrupting the worktree, bypassing specs, or hiding decisions.

## Core Roles

The framework may define agents such as:

- spec author;
- test designer;
- TDD implementer;
- spec syncer;
- acceptance reviewer;
- rebuild planner;
- tech lead/orchestrator.

Roles should be focused. A role should not silently take over responsibilities that belong to another role when doing so weakens review or traceability.

## Worktree Safety

Only one agent should write to a worktree at a time unless writers are isolated in separate worktrees.

Review, research, planning, and validation can run in parallel. Normal implementation should remain single-writer.

## Role Boundaries

- Spec authors write or refine canonical specs; they do not implement production code unless explicitly assigned.
- Test designers derive tests from specs and risk; they do not weaken specs to fit code.
- TDD implementers write tests and implementation through Red → Green → Refactor.
- Spec syncers compare the final diff against canonical sources and update specs/docs when needed.
- Reviewers validate alignment between specs, tests, code, and policies.
- Tech leads choose change mode, scope, sequencing, and conflict escalation.

## Review Behaviour

Reviewers should be adversarial but practical.

They should focus on:

- spec drift;
- missing or weak tests;
- TDD violations;
- behaviour/spec mismatches;
- rebuildability gaps;
- architecture memory gaps;
- unnecessary scope expansion.

## Completion Handoffs

Implementation agents must report:

- changed files;
- tests added/updated;
- Red/Green evidence;
- validation commands;
- spec sync status;
- decisions made;
- residual risks.

## Escalation

Agents must stop or ask for clarification when:

- user intent conflicts with canonical specs;
- product behaviour is ambiguous;
- tests and specs disagree;
- architecture decisions are required but not approved;
- a direct change grows into SDD-level scope.
