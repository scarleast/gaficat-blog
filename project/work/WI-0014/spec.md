# /spec

- work_id: WI-0014
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Goal

Improve homepage banner subtitle attribution alignment so the second line visually follows the first line's text block instead of the fixed 760px container.

## Scope

- `src/pages/index.astro`
- `project/work/WI-0014/**`
- `project/work/work_index.md`

## Non-goals

- Do not change random subtitle providers or attribution fields.
- Do not change banner background, navbar, or post list layout.
- Do not change post page title typing.

## Acceptance Criteria

1. The subtitle container shrink-wraps content while respecting the existing responsive max width.
2. The attribution line is right-aligned within the content-sized subtitle block.
3. The typewriter cursor remains inside the typed content.
4. `npm run build` passes.
