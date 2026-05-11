---
name: governance-build
description: Use for the /build stage of a project work item. Ensures implementation stays inside the accepted plan and records changed files, deviations, and blockers.
---

# Governance Build

<!-- SOURCE OF TRUTH: This file is the authoritative version. -->
<!-- Sync targets: .codex/skills/governance-build/SKILL.md -->
<!-- Claude Code entry: .claude/commands/build.md -->

This skill implements `project/governance/contracts/15_skills_execution_contract_v0_1.md`.

If this skill conflicts with `project/governance/contracts/`, the contract wins.

## Required Reads

1. `project/governance/contracts/15_skills_execution_contract_v0_1.md`
2. `project/governance/skills/governance-preflight/SKILL.md`
3. Current `project/work/<work-id>/spec.md`
4. Current `project/work/<work-id>/plan.md`
5. Current `project/work/<work-id>/agents.md`
6. Current `project/work/<work-id>/state.md`

## Procedure

1. Run governance preflight.
2. Confirm `/spec` and `/plan` are accepted.
3. Edit only planned and owned paths.
4. Preserve unrelated dirty user changes.
5. Record actual changed files and implementation notes in `build.md`.
6. Record any deviation from plan before leaving `/build`.
7. Update `state.md` only when `/build` exit criteria are met.

## Exit Criteria

- Planned implementation is complete.
- Changed files are listed.
- Deviations are explained.
- Blockers are resolved or explicitly recorded.
- Work is ready for `/test`.

## Borrowed Checklist

Use incremental implementation ideas from `project/governance/skills/references/borrowed-agent-skills-checklists.md` as advisory input only.
