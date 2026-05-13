# /build

- work_id: WI-0026
- stage: build
- status: completed
- owner: main-agent
- branch: main
- updated_at: 2026-05-13

## Changes

- `themes/fluid-astro/assets/styles/typography.css`: adjusted article image and caption spacing for Markdown `figure` blocks.
- `themes/fluid-astro/assets/styles/typography.css`: added scoped normalization for legacy top-level centered inline HTML image blocks used by older posts.

## Implementation Notes

- Current WI id before execution-plane edit: WI-0026.
- Legacy centered image wrappers now get `margin: 1.5rem 0 2rem`.
- Legacy wrapper images are forced to block layout with `margin: 0 auto 0.45rem`, `max-width: 90%`, and `zoom: normal !important` so inline `zoom` does not break visual centering.
- Legacy `<br>` separators between image and caption are hidden.
- Legacy caption divs receive matching caption color, opacity, font size, line height, and zero padding.

## Deviations From Plan

- none

## Blockers

- none

## Exit Criteria

- planned implementation is complete
- changed files are listed
- deviations are explained
- blockers are resolved or explicitly recorded
