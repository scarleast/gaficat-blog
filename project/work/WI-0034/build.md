# /build

- work_id: WI-0034
- stage: build
- status: completed
- owner: main-agent
- updated_at: 2026-05-13

## Changed Files

- `src/utils/remark-media-shortcodes.ts`
- `src/utils/rehype-media-shortcodes.ts`
- `astro.config.mjs`
- `themes/fluid-astro/assets/styles/global.css`
- `themes/fluid-astro/components/home/PostCard.astro`
- migrated media posts under `source/_posts/**` from `.mdx` to `.md`
- `project/work/WI-0034/**`
- `project/work/work_index.md`

## Implementation Notes

- Added Hexo-style media shortcode parsing/rendering for `bilibili`, `audio`, and `video`.
- Wired remark conversion for normal block shortcodes and rehype fallback conversion for shortcodes affected by Astro/GFM autolink and smartypants.
- Reused the same renderer from remark and rehype paths so media HTML remains consistent.
- Added global media shortcode CSS matching the existing Bilibili/audio/video component classes and `PlyrInit` hooks.
- Migrated existing posts away from MDX media imports and JSX media components.
- Updated homepage/list excerpt cleanup so raw media shortcodes do not leak into previews.

## Deviations

- Plan originally expected a remark-only implementation. Build added a rehype fallback because URL arguments were converted to links and smart quotes before final output, leaving raw shortcodes in generated post HTML.

## Blockers

- None.
