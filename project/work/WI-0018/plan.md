# /plan

- work_id: WI-0018
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Implementation Strategy

Add the same `style="margin-top: 0"` override used by `src/pages/index.astro` to the paginated home listing `#board` in `src/pages/page/[page].astro`.

## Affected Areas

- `src/pages/page/[page].astro`
- `project/work/WI-0018/**`
- `project/work/work_index.md`

## Test Strategy

- Run `npm run build`.
- Browser MCP compare `/` and `/page/2.html` at scroll position 0.
- Verify `/page/2.html` computed `#board` margin-top is `0px` and intrusion is `0px`.

## Rollback Strategy

Remove the inline `margin-top: 0` from `src/pages/page/[page].astro` if the global Fluid board overlap should apply to paginated listing pages again.
