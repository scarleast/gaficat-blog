# /plan

- work_id: WI-0003
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-11

## Implementation Strategy

Update the canonical contract and project governance flow skill with explicit subagent runtime rules, then mirror the relevant canonical skills into `.codex/skills/**`. Keep this as a control-plane-only governance sync.

## Affected Areas

- control plane:
  - `project/governance/contracts/15_skills_execution_contract_v0_1.md`
  - `project/governance/skills/project-governance-flow/SKILL.md`
  - `project/governance/skills/governance-preflight/SKILL.md`
  - `.codex/skills/project-governance-flow/SKILL.md`
  - `.codex/skills/governance-preflight/SKILL.md`
  - `project/work/work_index.md`
  - `project/work/WI-0003/**`
- execution plane:
  - none

## Work Slices

| slice | owner | owned paths | output |
| --- | --- | --- | --- |
| governance sync | main-agent | listed control-plane paths | updated contract, skills, runtime copies, work records |

## Dependencies

- none

## Test Strategy

- Verify expected subagent/runtime language exists in canonical and runtime files with `rg`.
- Skip `npm run build` because there are no execution-plane changes.

## Rollback Strategy

- Revert WI-0003 control-plane edits if the synced governance wording is rejected.

## Exit Criteria

- implementation path is clear
- owned paths are assigned
- verification plan is clear
- no uncontrolled shared-file conflicts remain
