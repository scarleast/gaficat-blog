# /plan

- work_id: WI-0002
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-11

## Implementation Strategy

Create a conservative root `.gitignore` for npm/Astro output and editor/local state, then initialize git locally. Do not stage, commit, push, or remove files until status has been inspected.

## Affected Areas

- control plane:
  - `project/work/WI-0002/**`
  - `project/work/work_index.md`
- execution plane:
  - `.gitignore`
- repository state:
  - `.git/**`

## Work Slices

| slice | owner | owned paths | output |
| --- | --- | --- | --- |
| ignore rules | main-agent | `.gitignore` | generated/local paths ignored |
| git baseline | main-agent | `.git/**` | local repository initialized |
| evidence | main-agent | `project/work/WI-0002/**`, `project/work/work_index.md` | status and build evidence |

## Dependencies

- none

## Test Strategy

- `git status --short --ignored`
- `npm run build`

## Rollback Strategy

Remove `.gitignore` and `.git/` if the owner decides not to keep a local repository.

## Exit Criteria

- implementation path is clear
- owned paths are assigned
- verification plan is clear
- no uncontrolled shared-file conflicts remain
