# /spec

- work_id: WI-0003
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-11

## Goal

Sync the updated subagent and runtime-entry governance from the project-governance-init reference into this repository.

## Scope

1. Update canonical project governance to make subagent authority and runtime sync rules explicit.
2. Sync Codex runtime skill copies after canonical edits.
3. Record the governance-only work item and close it.

## Non-goals

- No execution-plane changes.
- No dependency, build config, content, or UI changes.
- No new agent runtime beyond the existing Codex and Claude entrypoints.

## Source Of Truth

- `.codex/skills/project-governance-init/references/agent-runtime-layout.md`
- `project/governance/contracts/15_skills_execution_contract_v0_1.md`
- `project/governance/skills/project-governance-flow/SKILL.md`

## Acceptance Criteria

1. Canonical governance states that subagents consume only main-agent assigned work and cannot claim work, advance state, close work items, or edit unassigned paths.
2. Canonical governance states that runtime entrypoints are thin pointers/copies and must be synced after canonical skill changes.
3. Runtime Codex skill copies reflect the canonical skill updates.
4. `project/work/work_index.md` records WI-0003 as closed.

## Risks

- Risk: runtime copies diverge from canonical files. Mitigation: compare source-of-truth headers and relevant synced content.

## Open Questions

- none

## Exit Criteria

- scope is clear
- non-goals are clear
- acceptance criteria are testable
- no blocking open questions remain
