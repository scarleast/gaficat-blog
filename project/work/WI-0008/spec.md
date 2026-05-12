# /spec

- work_id: WI-0008
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Goal

Make the home first-viewport banner subtitle random on every refresh, using Hitokoto and Jinrishici as content sources.

## Scope

- `src/pages/index.astro`
- `project/work/WI-0008/**`
- `project/work/work_index.md`

## Non-goals

- Do not change post/page banners.
- Do not change homepage layout, parallax, footer, or post list.

## Source Of Truth

- Owner instruction.
- Hitokoto browser API: `https://developer.hitokoto.cn/sentence/demo.html`
- Jinrishici browser SDK: `https://www.jinrishici.com/doc/#instance-right`
- Original live homepage behavior checked on `https://www.gaficat.com/`.

## Acceptance Criteria

1. Home subtitle fetches a random sentence on page load.
2. Provider choice is randomized between Hitokoto and Jinrishici.
3. Existing typed effect still renders the subtitle.
4. Failure fallback uses `踏上取经路比取得真经更重要。`.
5. `npm run build` passes.
