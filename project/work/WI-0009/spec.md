# /spec

- work_id: WI-0009
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Goal

Preserve author attribution for the random homepage banner subtitle when the selected API returns author information.

## Scope

- `src/pages/index.astro`
- `project/work/WI-0009/**`
- `project/work/work_index.md`

## Non-goals

- Do not change provider selection or fallback behavior.
- Do not add source/title attribution unless it is author data.

## Acceptance Criteria

1. Author attribution uses `——author` on a second line.
2. No author line is rendered when author data is missing.
3. `npm run build` passes.
