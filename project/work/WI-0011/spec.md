# /spec

- work_id: WI-0011
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Goal

Adjust homepage random subtitle rendering so the author/source attribution line is right-aligned.

## Scope

- `src/pages/index.astro`
- `project/work/WI-0011/**`
- `project/work/work_index.md`

## Non-goals

- Do not change random providers or attribution fields.
- Do not change banner background, nav, or post list layout.

## Acceptance Criteria

1. Text before `\n` renders as the main subtitle line.
2. Text after `\n` renders inside a right-aligned author/source line.
3. Sentence-only subtitles render without extra markup artifacts.
4. `npm run build` passes.
