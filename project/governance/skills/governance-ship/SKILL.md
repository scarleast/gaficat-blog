---
name: governance-ship
description: Use for the /ship stage of a project work item. Closes or ships accepted work, updates indexes and evidence, and performs commit/push when applicable.
---

# Governance Ship

<!-- SOURCE OF TRUTH: This file is the authoritative version. -->
<!-- Sync targets: .codex/skills/governance-ship/SKILL.md -->
<!-- Claude Code entry: .claude/commands/ship.md -->

This skill implements `project/governance/contracts/15_skills_execution_contract_v0_1.md`.

If this skill conflicts with `project/governance/contracts/`, the contract wins.

## Required Reads

1. `project/governance/contracts/15_skills_execution_contract_v0_1.md`
2. Current `project/work/<work-id>/review.md`
3. Current `project/work/<work-id>/state.md`
4. `project/work/work_index.md`
5. `project/governance/templates/ship-template.md`

## Procedure

1. Confirm `/review` decision is `accept`.
2. Write final summary and evidence links in `ship.md`.
3. Update `state.md` to closed/shipped.
4. Update `project/work/work_index.md`.
5. Update any affected facts or baselines.
6. Record follow-ups as separate work items or explicit notes.
7. Commit and push according to contract §4.4 when this is a full shipped work item. Ask before force push, rebase, cross-branch operations, or deployment.

## Exit Criteria

- Work item is closed or explicitly closed without ship.
- Indexes are updated.
- Final evidence links are complete.
- Follow-ups are recorded.
- Delivery state, commit, and deployment status are recorded.

## Borrowed Checklist

Use shipping and launch ideas from `project/governance/skills/references/borrowed-agent-skills-checklists.md` as advisory input only.
