---
name: governance-preflight
description: Use before any governance state change or execution-plane file edit in this repository. Verifies the current WI, stage, owned paths, and contract gates before work proceeds.
---

# Governance Preflight

<!-- SOURCE OF TRUTH: This file is the authoritative version. -->
<!-- Sync targets: .codex/skills/governance-preflight/SKILL.md -->
<!-- Claude Code entry: .claude/commands/preflight.md -->

This skill implements `project/governance/contracts/15_skills_execution_contract_v0_1.md`.

If this skill conflicts with `project/governance/contracts/`, the contract wins.

## Required Reads

1. `project/governance/contracts/15_skills_execution_contract_v0_1.md`
2. `project/governance/engineering_workflow.md`
3. `project/work/work_index.md`
4. `project/governance/repository_layout.md`
5. The current `project/work/<work-id>/state.md`, when a WI exists.

## Preflight Questions

Before modifying any execution-plane path, answer these in the work notes or chat:

1. What is the current WI id?
2. What is the current stage?
3. Is `/spec` accepted?
4. Is `/plan` accepted before `/build` starts?
5. What paths are owned by this work?
6. Does this touch execution-plane paths: `apps/**`, `packages/**`, `deploy/**`, `source/**`, `tools/**`, `async_spider.py`, or `async_pusher.py`?
7. Are there unrelated dirty worktree changes that must be preserved?

## Hard Stops

- If execution-plane files will be edited and no WI exists, stop and create the WI first.
- If `/spec` is not accepted, do not plan or build.
- If `/plan` is not accepted, do not build.
- If the requested edit is outside owned paths, update the plan before editing.
- If dirty user changes affect the same files, inspect and work with them; do not revert them.

## Output

Record the preflight result in the relevant WI file:

- intake/spec work: `spec.md`
- implementation work: `build.md`
- validation work: `test.md`
- review work: `review.md`
- closure work: `ship.md`
