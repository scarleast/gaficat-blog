# /spec

- work_id: WI-0017
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Goal

Remove author/source display from the homepage banner random subtitle and return to sentence-only rendering.

## Scope

- `src/pages/index.astro`
- `project/work/WI-0017/**`
- `project/work/work_index.md`

## Non-goals

- Do not remove random subtitle providers.
- Do not change banner image, scroll arrow, or post list layout.
- Do not change post page title typing.

## Acceptance Criteria

1. Provider functions return only sentence text.
2. Typed renderer no longer handles or renders author/source lines.
3. No `.subtitle-author*` markup appears in the homepage subtitle.
4. `npm run build` passes.
