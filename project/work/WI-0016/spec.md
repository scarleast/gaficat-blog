# /spec

- work_id: WI-0016
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Goal

Replace the hidden-measure attribution typing implementation with a stable track-width implementation that avoids duplicate visible author text and left-sliding animation.

## Scope

- `src/pages/index.astro`
- `project/work/WI-0016/**`
- `project/work/work_index.md`

## Non-goals

- Do not change random subtitle providers.
- Do not change attribution fields or formatting.
- Do not change banner background, scroll arrow, or post list layout.

## Acceptance Criteria

1. The visible author/source text appears only once.
2. The author/source track is right-aligned within the subtitle block.
3. The visible text in that track is left-aligned and grows left-to-right.
4. `npm run build` passes.
