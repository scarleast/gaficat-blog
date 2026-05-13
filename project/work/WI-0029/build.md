# /build

- work_id: WI-0029
- stage: build
- status: completed
- owner: main-agent
- branch: main
- updated_at: 2026-05-13

## Changes

- `src/content.config.ts`: added a `pages` collection loading Markdown/MDX from `source/_pages/**`.
- `source/_pages/aboutme.md`: added the separate "关于我" Markdown body.
- `themes/fluid-astro/components/page/AboutContent.astro`: refactored into a styled about shell that renders body content from its slot.
- `src/pages/about/index.astro`: renders existing `source/_posts/关于这个博客.md` through Astro content `render()`.
- `src/pages/aboutme/index.astro`: renders `source/_pages/aboutme.md` through Astro content `render()`.

## Implementation Notes

- Current WI id before execution-plane edit: WI-0029.
- `/about` locates the existing site-about post by stable `abbrlink: 62a44034`.
- `/aboutme` uses the new `pages/aboutme` content entry.
- The reusable component still owns avatar, intro, social links, and `.markdown-body` wrapper styling.

## Deviations From Plan

- none

## Blockers

- none

## Exit Criteria

- planned implementation is complete
- changed files are listed
- deviations are explained
- blockers are resolved or explicitly recorded
