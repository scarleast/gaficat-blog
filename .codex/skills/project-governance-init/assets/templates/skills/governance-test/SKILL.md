---
name: governance-test
description: Use for the /test stage of a project work item. Records required commands, browser/manual checks, evidence, failures, and residual risk before review.
---

# Governance Test

<!-- SOURCE OF TRUTH: This file is the authoritative version. -->
<!-- Sync targets: .codex/skills/governance-test/SKILL.md -->
<!-- Claude Code entry: .claude/commands/test.md -->

This skill implements `project/governance/contracts/15_skills_execution_contract_v0_1.md`.

If this skill conflicts with `project/governance/contracts/`, the contract wins.

## Required Reads

1. `project/governance/contracts/15_skills_execution_contract_v0_1.md`
2. Current `project/work/<work-id>/plan.md`
3. Current `project/work/<work-id>/build.md`
4. Current `project/work/<work-id>/state.md`
5. `project/governance/templates/test-template.md`

## Procedure

1. Confirm `/build` is complete.
2. Run all checks listed in `plan.md`.
3. For Python changes, run `uv run ruff check .` and `uv run ty check .`.
4. For `apps/web/brand-site` changes, run `npm --prefix apps/web/brand-site run lint` and `npm --prefix apps/web/brand-site run typecheck`.
5. For UI/design parity tasks, produce side-by-side design vs implementation screenshot evidence.
6. Record command results, manual checks, failures, fixes, and residual risk in `test.md`.
7. Update `state.md` only when `/test` exit criteria are met.

## Exit Criteria

- Required commands passed or failures are explicitly justified.
- Required manual/browser checks are recorded.
- Evidence is linked.
- Residual risk is stated.
- Work is ready for `/review`.

## Borrowed Checklist

Use browser testing and debugging ideas from `project/governance/skills/references/borrowed-agent-skills-checklists.md` as advisory input only.
