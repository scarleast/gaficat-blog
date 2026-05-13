# /spec

- work_id: WI-0026
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-13

## Goal

Fix article image alignment and caption rhythm on post pages, especially the highlighted image block in `posts/bac5f5bf.html`.

## Scope

1. Ensure standalone post images are visually centered within the article body.
2. Ensure legacy inline-HTML image blocks such as `<div style="text-align:center"><img ...><br/><div ...>caption</div></div>` use coherent figure spacing.
3. Reduce the distance between image and caption.
4. Increase the distance between caption and the following paragraph.
5. Preserve existing image shadows, rounded corners, and responsive behavior.

## Non-goals

- Do not rewrite article content unless CSS cannot safely normalize the existing HTML.
- Do not redesign the post article board or global layout.
- Do not change media player styling.

## Source Of Truth

- human-owner screenshot
- `source/_posts/music/music_theory/大调和小调，你还可以这样理解.mdx`
- `themes/fluid-astro/assets/styles/typography.css`
- `themes/fluid-astro/layouts/PostLayout.astro`

## Acceptance Criteria

1. The highlighted `C大调排列方式` image block is centered within the article content column.
2. The caption is visually close to the image rather than floating far below it.
3. The following paragraph has clear vertical separation from the caption.
4. Existing Markdown-generated `figure > figcaption.image-caption` blocks keep sensible spacing.
5. `npm run build` passes.

## Risks

- Legacy inline styles may override CSS unless selectors are scoped and specific enough.

## Open Questions

- none

## Exit Criteria

- scope is clear
- non-goals are clear
- acceptance criteria are testable
- no blocking open questions remain
