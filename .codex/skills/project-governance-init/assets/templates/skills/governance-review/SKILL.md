---
name: governance-review
description: Use for the /review stage of a project work item. Produces findings, open questions, and an explicit accept / changes_required / blocked / reject decision.
---

# Governance Review

<!-- SOURCE OF TRUTH: This file is the authoritative version. -->
<!-- Sync targets: .codex/skills/governance-review/SKILL.md -->
<!-- Claude Code entry: .claude/commands/review.md -->

This skill implements `project/governance/contracts/15_skills_execution_contract_v0_1.md`.

If this skill conflicts with `project/governance/contracts/`, the contract wins.

## Required Reads

1. `project/governance/contracts/15_skills_execution_contract_v0_1.md`
2. Current `project/work/<work-id>/spec.md`
3. Current `project/work/<work-id>/plan.md`
4. Current `project/work/<work-id>/build.md`
5. Current `project/work/<work-id>/test.md`
6. Current `project/work/<work-id>/state.md`
7. `project/governance/templates/review-template.md`

## Procedure

1. Confirm `/test` evidence exists.
2. Review against acceptance criteria, owned paths, test evidence, and project contracts.
3. Prioritize bugs, regressions, missing tests, security issues, and contract violations.
4. Record findings in `review.md`; findings must not exist only in chat.
5. Set explicit decision: `accept`, `changes_required`, `blocked`, or `reject`.
6. If changes are required, name the target return stage.
7. Update `state.md` only after the review decision is recorded.

## Exit Criteria

- Decision is explicit.
- Findings are actionable or explicitly `none`.
- Required rework has a target stage.
- Work is either ready for `/ship` or returned to an earlier stage.

## Borrowed Checklist

Use code review and security-hardening ideas from `project/governance/skills/references/borrowed-agent-skills-checklists.md` as advisory input only.
