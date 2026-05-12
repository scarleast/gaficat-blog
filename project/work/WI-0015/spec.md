# /spec

- work_id: WI-0015
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Goal

Improve the visual behavior of homepage banner subtitle attribution typing so the second line types from left to right while preserving final right alignment.

## Scope

- `src/pages/index.astro`
- `project/work/WI-0015/**`
- `project/work/work_index.md`

## Non-goals

- Do not change subtitle providers or text formatting.
- Do not change banner background, scroll arrow, or post list layout.
- Do not change post page title typing.

## Acceptance Criteria

1. Attribution has a stable final-width typing track.
2. Visible attribution text starts at the left edge of that track and grows rightward.
3. The track itself remains right-aligned in the subtitle block.
4. `npm run build` passes.
