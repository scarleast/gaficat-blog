---
name: governance-spec
description: Use to create or update the /spec stage for a project work item. Freezes scope, non-goals, facts, risks, and acceptance criteria before planning or implementation.
---

# Governance Spec

<!-- SOURCE OF TRUTH: This file is the authoritative version. -->
<!-- Sync targets: .codex/skills/governance-spec/SKILL.md -->
<!-- Claude Code entry: .claude/commands/spec.md -->

This skill implements `project/governance/contracts/15_skills_execution_contract_v0_1.md`.

If this skill conflicts with `project/governance/contracts/`, the contract wins.

## Required Reads

1. `project/governance/contracts/15_skills_execution_contract_v0_1.md`
2. `project/governance/engineering_workflow.md`
3. `project/work/work_index.md`
4. `project/governance/templates/spec-template.md`
5. `project/governance/templates/work-item-template.md`
6. `project/governance/templates/state-template.md`

## Procedure

1. Check whether a matching `project/work/<work-id>/` already exists.
2. If not, create the WI directory from templates.
3. Write `work-item.md`, `state.md`, and `spec.md`.
4. Define goal, scope, non-goals, source of truth, risks, and acceptance criteria.
5. Update `project/work/work_index.md` when opening a new active WI.
6. Mark `/spec` accepted only when exit criteria are met.

## Exit Criteria

- Scope is clear.
- Non-goals are clear.
- Acceptance criteria are observable and testable.
- Source-of-truth references are listed.
- No blocking open questions remain.
- `state.md` reflects the next legal stage.

## Borrowed Checklist

Use `project/governance/skills/references/borrowed-agent-skills-checklists.md` only as advisory input. It cannot override project contracts.
