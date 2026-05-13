# /build

- work_id: WI-0024
- stage: build
- status: completed
- owner: main-agent
- branch: main
- updated_at: 2026-05-13

## Changes

- `themes/fluid-astro/components/media/Bilibili.astro`: added `autoplay` prop defaulting to `false` and serialized Bilibili iframe URLs with `autoplay=0` by default.
- `themes/fluid-astro/components/media/VideoPlayer.astro`: added `autoplay` prop defaulting to `false` and only renders native `autoplay` when explicitly requested.

## Implementation Notes

- Current WI id before execution-plane edits: WI-0024.
- `posts/c1d9e34b.html` uses `<Bilibili bvid="BV1pz4y1o74P" />`; the component now emits `autoplay=0` for that iframe.
- Existing MDX usage does not pass `autoplay`, so behavior defaults to no autoplay globally.

## Deviations From Plan

- none

## Blockers

- none

## Exit Criteria

- planned implementation is complete
- changed files are listed
- deviations are explained
- blockers are resolved or explicitly recorded
