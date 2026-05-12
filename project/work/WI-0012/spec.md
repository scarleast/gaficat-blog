# /spec

- work_id: WI-0012
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Goal

Restore natural typewriter cursor behavior on the homepage banner after adding a fixed-width subtitle container for right-aligned attribution.

## Scope

- `src/pages/index.astro`
- `project/work/WI-0012/**`
- `project/work/work_index.md`

## Non-goals

- Do not change random subtitle providers.
- Do not change the existing attribution fields or format.
- Do not modify post page typed title behavior.

## Acceptance Criteria

1. Homepage cursor is no longer a sibling after the fixed-width `#subtitle` container.
2. Sentence-only subtitles show the cursor immediately after the typed sentence text.
3. Attributed subtitles show the cursor after the typed attribution text.
4. The author/source line remains right-aligned.
5. `npm run build` passes.
