# /build

- work_id: WI-0002
- stage: build
- status: completed
- owner: main-agent
- updated_at: 2026-05-11

## Changed Files

- `.gitignore`
- `.git/**`
- `project/work/WI-0002/**`
- `project/work/work_index.md`

## Implementation Notes

- Added root `.gitignore` for dependencies, Astro/build output, environment files, logs, OS/editor state, and temporary local work.
- Initialized a local git repository with `git init`.
- Kept generated and dependency directories on disk; they are ignored rather than deleted.

## Deviations

- none
