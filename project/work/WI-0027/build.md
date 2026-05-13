# /build

- work_id: WI-0027
- stage: build
- status: completed
- owner: main-agent
- branch: main
- updated_at: 2026-05-13

## Changes

- `themes/fluid-astro/assets/styles/typography.css`: added scoped post typography rules for legacy top-level `<center>` image wrappers.

## Implementation Notes

- Current WI id before execution-plane edit: WI-0027.
- `<center>` wrappers containing a direct image now get the same block rhythm as other centered image wrappers: `margin: 1.5rem 0 2rem`.
- Direct `<center> > img` elements are block-centered with `max-width: 90%`, `height: auto`, and a small bottom margin.
- `<center> > br` separators are hidden.
- `<center> > img + br + div` captions now use consistent caption typography, no padding, and no old border underline.
- Unlike WI-0026's `div style="text-align:center"` normalization, this change does not override inline `zoom` on `<center>` images, preserving historical intended sizing.

## Deviations From Plan

- none

## Blockers

- none

## Exit Criteria

- planned implementation is complete
- changed files are listed
- deviations are explained
- blockers are resolved or explicitly recorded
