# /spec

- work_id: WI-0020
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Goal

Make governance delivery metadata consistent after the recent local commits.

## Scope

- `project/work/WI-0007/ship.md`
- `project/work/WI-0008/ship.md`
- `project/work/WI-0020/**`
- `project/work/work_index.md`

## Non-goals

- Do not modify execution-plane files.
- Do not rewrite git history for earlier commits.
- Do not configure a remote repository.

## Acceptance Criteria

1. WI-0007 records local commit `d988f6c`.
2. WI-0008 records local commit `f3bcf12`.
3. Push state reflects the current repository reality: no configured push destination.
4. Work index shows no active work after closure.
