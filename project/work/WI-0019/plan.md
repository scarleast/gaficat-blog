# /plan

- work_id: WI-0019
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Implementation Strategy

Replace the empty iconfont `<i>` nodes in `PostNav.astro` with inline SVG chevron icons. Style them in `global.css` at `1.5rem` to match the original iconfont visual size and preserve left/right spacing.

## Affected Areas

- `src/components/post/PostNav.astro`
- `src/assets/styles/global.css`
- `project/work/WI-0019/**`
- `project/work/work_index.md`

## Test Strategy

- Run `npm run build`.
- Browser MCP inspect `/posts/b0812c46.html` near the footer and verify two `.post-nav-icon` SVGs render with non-zero dimensions.
- Compare original and local bottom navigation DOM/visual behavior.

## Rollback Strategy

Restore the previous iconfont `<i>` nodes and CSS selectors if the project later imports the exact original Fluid iconfont.
