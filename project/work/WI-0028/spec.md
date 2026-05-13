# /spec

- work_id: WI-0028
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-13

## Goal

Make post image/caption rhythm visibly correct across common post image structures.

## Scope

1. Reduce image-to-caption gap further for Markdown figures, centered div wrappers, and legacy center wrappers.
2. Increase wrapper bottom spacing so text below captions no longer feels attached.
3. Verify against `posts/4056508e.html` using Browser MCP measurements and screenshot.
4. Regression-check `posts/bac5f5bf.html`.

## Non-goals

- Do not migrate broken external image URLs.
- Do not edit article content.
- Do not redesign the article layout.

## Source Of Truth

- human-owner visual review
- `themes/fluid-astro/assets/styles/typography.css`
- Browser MCP measurements on `posts/4056508e.html`

## Acceptance Criteria

1. Image-to-caption gap on `posts/4056508e.html` is approximately `4px` or less.
2. Caption-to-following-content gap on `posts/4056508e.html` is approximately `48px` or more.
3. Images remain centered.
4. `posts/bac5f5bf.html` remains centered and has the same corrected rhythm.
5. `npm run build` passes.

## Risks

- Too much bottom spacing may make isolated images feel detached from surrounding prose; target only post image wrappers.

## Open Questions

- none

## Exit Criteria

- scope is clear
- non-goals are clear
- acceptance criteria are testable
- no blocking open questions remain
