# /build

- work_id: WI-0005
- stage: build
- status: completed
- owner: main-agent
- branch: n/a
- updated_at: 2026-05-12

## Changes

- `src/assets/styles/global.css`: changed `.banner` height from viewport-fixed `100vh` to Fluid-compatible `100%`, so post/page banner height is controlled by `.header-inner`.
- `src/layouts/PostLayout.astro`: removed inline `height: 100%` from the post banner, replaced local parallax logic with Fluid's `scrollY / 5` formula capped at `96 + board margin-top`, and synchronized `.side-col` `padding-top` with the banner offset.
- `src/layouts/PostLayout.astro`: removed the Astro-only TOC opacity reveal behavior so the right TOC remains visible like Fluid instead of fading in only after the banner exits.

## Implementation Notes

- Source comparison used `https://fluid.ist/css/main.css`, `https://fluid.ist/js/events.js`, and the Hexo Fluid `layout/post.ejs` template. Fluid's original parallax code moves `#banner[parallax="true"]` and applies the same offset as top padding to `.side-col`.
- The maximum parallax offset is `96 + margin-top`; with the default board margin of `-32px`, the cap is `64px`.

## Deviations From Plan

- none

## Blockers

- none

## Exit Criteria

- planned implementation is complete
- changed files are listed
- deviations are explained
- blockers are resolved or explicitly recorded
