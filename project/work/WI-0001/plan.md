# /plan

- work_id: WI-0001
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-11

## Implementation Strategy

Use the bundled governance initialization templates, then add project-specific workflow and repository layout guidance for this Astro blog.

## Affected Areas

- control plane:
  - `project/governance/**`
  - `project/work/**`
  - `.codex/skills/**`
  - `.claude/commands/**`
  - `AGENTS.md`
- execution plane:
  - none

## Work Slices

| slice | owner | owned paths | output |
| --- | --- | --- | --- |
| install templates | main-agent | `project/governance/**`, `.codex/skills/**`, `.claude/commands/**` | governance contracts, templates, skills, runtime commands |
| project guidance | main-agent | `AGENTS.md`, `project/governance/repository_layout.md`, `project/governance/engineering_workflow.md` | project-specific boundaries and checks |
| adoption record | main-agent | `project/work/WI-0001/**`, `project/work/work_index.md` | initial work item evidence |

## Dependencies

- Existing `project-governance-init` skill and templates.

## Test Strategy

- List generated files.
- Check required governance files exist.
- Run `npm run build` to ensure governance-only changes did not disturb the Astro build.

## Rollback Strategy

Remove the new control-plane files and runtime entrypoints created for this work item.

## Exit Criteria

- implementation path is clear
- owned paths are assigned
- verification plan is clear
- no uncontrolled shared-file conflicts remain
