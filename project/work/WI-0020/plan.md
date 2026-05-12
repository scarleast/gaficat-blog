# /plan

- work_id: WI-0020
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Implementation Strategy

Update stale ship delivery fields for WI-0007 and WI-0008 using `git log` evidence. Record this governance cleanup as WI-0020 and close it in the index.

## Affected Areas

- `project/work/WI-0007/ship.md`
- `project/work/WI-0008/ship.md`
- `project/work/WI-0020/**`
- `project/work/work_index.md`

## Test Strategy

- Run `git status --short`.
- Search governance records for stale delivery `pending` values.
- Attempt `git push` as the ship push check; record expected no-remote failure.

## Rollback Strategy

Revert the cleanup commit if the recorded commit metadata needs a different convention.
