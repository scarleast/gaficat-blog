# /spec

- work_id: WI-0010
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Goal

Make the homepage random subtitle attribution visibly work more consistently by preserving Hitokoto source attribution when author data is absent.

## Scope

- `src/pages/index.astro`
- `project/work/WI-0010/**`
- `project/work/work_index.md`

## Non-goals

- Do not change banner layout or typography.
- Do not change provider selection randomness.
- Do not add extra metadata beyond a single second-line attribution.

## Acceptance Criteria

1. Hitokoto attribution is `from_who || from`.
2. Jinrishici attribution remains `data.origin.author`.
3. Missing attribution still renders sentence-only.
4. `npm run build` passes.
