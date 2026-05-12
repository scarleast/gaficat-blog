# /spec

- work_id: WI-0019
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Goal

Restore visible arrows in the post bottom previous/next navigation for `http://127.0.0.1:4322/posts/b0812c46.html`.

## Scope

- `src/components/post/PostNav.astro`
- `src/assets/styles/global.css`
- `project/work/WI-0019/**`
- `project/work/work_index.md`

## Non-goals

- Do not change previous/next post ordering.
- Do not change post footer copyright/license blocks.
- Do not introduce a remote iconfont dependency.

## Facts

- Original site DOM uses empty `<i class="iconfont icon-arrowleft/right">` nodes with iconfont `::before` glyphs.
- Browser MCP measured original icon nodes around `24px` wide/high with `::before` content.
- Local Astro page has the same empty `<i>` nodes, but computed width/height are `0` and `::before` content is `none`.

## Acceptance Criteria

1. Previous link contains a visible left arrow before the title.
2. Next link contains a visible right arrow after the title.
3. Browser MCP confirms both arrow elements have non-zero rendered width/height.
4. `npm run build` passes.
