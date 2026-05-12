# /spec

- work_id: WI-0013
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Goal

Restore a visible, animated down arrow on the homepage banner.

## Scope

- `src/pages/index.astro`
- `src/assets/styles/global.css`
- `project/work/WI-0013/**`
- `project/work/work_index.md`

## Non-goals

- Do not change random subtitle behavior.
- Do not change banner background or post list layout.
- Do not change post page banner behavior unless shared scroll-arrow CSS requires compatibility.

## Acceptance Criteria

1. Homepage banner has a visible arrow at the bottom center.
2. Arrow uses the existing `scroll-down` blink/move animation.
3. Clicking the arrow scrolls to the content board.
4. `npm run build` passes.
