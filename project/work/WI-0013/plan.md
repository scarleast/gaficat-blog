# /plan

- work_id: WI-0013
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Implementation Strategy

Wrap the homepage arrow SVG in a stable `.scroll-down-icon` element and move animation styling to the icon container. Keep SVG drawing static so it remains visible and independent from subtitle typed markup.

## Affected Areas

- `src/pages/index.astro`
- `src/assets/styles/global.css`
- `project/work/WI-0013/**`
- `project/work/work_index.md`

## Test Strategy

- Run `npm run build`.
- Browser MCP verify `.scroll-down-bar` and `.scroll-down-icon` are visible, animated, centered, and clickable.
- Browser MCP click arrow and verify page scrolls downward.

## Rollback Strategy

Restore the previous bare SVG arrow markup and CSS.
