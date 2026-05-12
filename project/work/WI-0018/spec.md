# /spec

- work_id: WI-0018
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Goal

Remove the unintended initial banner intrusion on paginated home listing pages such as `/page/2.html`.

## Scope

- `src/pages/page/[page].astro`
- `project/work/WI-0018/**`
- `project/work/work_index.md`

## Non-goals

- Do not change post page board overlap/parallax behavior.
- Do not change homepage `/` layout or random subtitle behavior.
- Do not change pagination data or post card rendering.

## Facts

- Browser MCP measured `/` at scroll top with `#board` margin-top `0px` and board/banner intrusion `0px`.
- Browser MCP measured `/page/2.html` at scroll top with `#board` margin-top `-32px` and board/banner intrusion `32px`.
- The paginated template currently omits the homepage inline `style="margin-top: 0"` on `#board`.

## Acceptance Criteria

1. `/page/2.html` board top aligns with the banner bottom at scroll position 0.
2. `/page/2.html` computed `#board` margin-top is `0px`.
3. Homepage `/` remains at computed `#board` margin-top `0px`.
4. `npm run build` passes.
