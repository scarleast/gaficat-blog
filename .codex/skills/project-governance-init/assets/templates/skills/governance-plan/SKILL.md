---
name: governance-plan
description: Use to create or update the /plan stage for a project work item. Freezes implementation strategy, owned paths, verification, rollback, and agent responsibilities.
---

# Governance Plan

<!-- SOURCE OF TRUTH: This file is the authoritative version. -->
<!-- Sync targets: .codex/skills/governance-plan/SKILL.md -->
<!-- Claude Code entry: .claude/commands/plan.md -->

This skill implements `project/governance/contracts/15_skills_execution_contract_v0_1.md`.

If this skill conflicts with `project/governance/contracts/`, the contract wins.

## Required Reads

1. `project/governance/contracts/15_skills_execution_contract_v0_1.md`
2. `project/governance/engineering_workflow.md`
3. `project/governance/repository_layout.md`
4. `project/governance/templates/plan-template.md`
5. `project/governance/templates/agents-template.md`
6. Current `project/work/<work-id>/spec.md`
7. Current `project/work/<work-id>/state.md`

## Procedure

1. Confirm `/spec` is accepted.
2. Identify control-plane and execution-plane affected areas separately.
3. Assign owned paths for main-agent and any subagents.
4. Define implementation strategy and rollback path.
5. Define required automated checks and manual evidence.
6. Write `plan.md` and `agents.md`.
7. Update `state.md` only after `/plan` exit criteria are met.

## Exit Criteria

- Implementation path is clear.
- Owned paths are explicit.
- Verification plan is clear.
- Rollback path is recorded.
- Shared-file risks are identified.
- No uncontrolled cross-plane boundary violations remain.

## Borrowed Checklist

Use planning and task-breakdown ideas from `project/governance/skills/references/borrowed-agent-skills-checklists.md` as advisory input only.
