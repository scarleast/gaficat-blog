---
name: project-governance-flow
description: Use when working in this repository on requirement intake, planning, implementation coordination, testing, review, shipping, or any governance/status change. Enforces the project /spec -> /plan -> /build -> /test -> /review -> /ship lifecycle with main-agent orchestration and subagent evidence.
---

# Project Governance Flow

<!-- SOURCE OF TRUTH: This file is the authoritative version. -->
<!-- Sync targets: .codex/skills/project-governance-flow/SKILL.md -->
<!-- Claude Code entry: .claude/commands/governance.md (references this file) -->

This skill implements `project/governance/contracts/15_skills_execution_contract_v0_1.md`.

If this skill conflicts with `project/governance/contracts/`, the contract wins.

## Required Reads

Before changing governance state or execution code, read:

1. `project/governance/contracts/15_skills_execution_contract_v0_1.md`
2. `project/governance/engineering_workflow.md`
3. `project/work/work_index.md`
4. `project/governance/repository_layout.md`

## Stage Pipeline

All new work follows:

```text
/spec -> /plan -> /build -> /test -> /review -> /ship
```

Never skip a stage.

## Stage Runtime Skills

Use these project-local skills for stricter stage execution:

- `governance-preflight`: required before execution-plane edits or governance state changes.
- `governance-spec`: create or update `/spec`.
- `governance-plan`: create or update `/plan`.
- `governance-build`: execute `/build` inside owned paths.
- `governance-test`: record command, browser, manual, and evidence checks.
- `governance-review`: record findings and explicit decision.
- `governance-ship`: close accepted work and update indexes.

Canonical skill sources live under `project/governance/skills/**`.
Runtime copies or entrypoints live under `.codex/skills/**` and `.claude/commands/**`.
The canonical project contracts always win over runtime copies and borrowed checklists.

## Main-Agent Rules

- Owner talks only to main-agent.
- Main-agent owns `project/work/<work-id>/state.md`.
- Main-agent may coordinate subagents, but subagents do not advance state.
- Every stage transition must update `state.md`.
- Findings, tests, review decisions, and acceptance must be written to files, not only chat.
- **NO CODE WITHOUT WI**: Before modifying any execution-plane file (`apps/**`, `packages/**`, `deploy/**`, `source/**`, `tools/**`, entry scripts), a WI must exist in `project/work/` with at least `/spec` completed. Research, measurement, and analysis are allowed without a WI, but the moment you decide to change code, stop and create the WI first.

## Work Item Files

Use templates in `project/governance/templates/`.

Default structure:

```text
project/work/WI-XXXX/
  work-item.md
  state.md
  spec.md
  plan.md
  agents.md
  build.md
  test.md
  review.md
  ship.md
```

## Stage Gates

- `/spec` exits only when scope, non-goals, facts, and acceptance criteria are clear.
- `/plan` exits only when owned paths, implementation strategy, test plan, and rollback path are clear.
- `/build` exits only when implementation notes and changed files are recorded.
- `/test` exits only when required checks and evidence are recorded. **For UI/design parity tasks: side-by-side screenshot comparison (design vs implementation) is mandatory. Numeric style checks alone are insufficient.**
- `/review` exits only with an explicit decision.
- `/ship` exits only after indexes, facts, follow-ups are updated, AND `git commit` + `git push` are completed (per contract §4.4, these are automatic — no need to ask).

## Legacy Objects

`FEAT-*`, `TASK-*`, `RUN-*`, and `DISPATCH-*` are historical compatibility objects. Do not create them for new work unless the owner explicitly requests legacy compatibility.
