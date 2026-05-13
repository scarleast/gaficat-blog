# /spec

- work_id: WI-0029
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-13

## Goal

Separate the two about pages into distinct Markdown-backed content sources while preserving the existing styled page presentation.

## Scope

1. `/about` should render "关于本站" body content from `source/_posts/关于这个博客.md`.
2. `/aboutme` should render "关于我" body content from a dedicated Markdown source.
3. Keep reusable about page styling in an Astro component.
4. Avoid duplicating long body text in Astro component code.
5. Preserve existing avatar, intro, and social link presentation.

## Non-goals

- Do not redesign the about page.
- Do not change post routes or remove the existing `关于本站` post.
- Do not migrate all static pages to Markdown in this WI.

## Source Of Truth

- `source/_posts/关于这个博客.md`
- `themes/fluid-astro/components/page/AboutContent.astro`
- `src/pages/about/index.astro`
- `src/pages/aboutme/index.astro`

## Acceptance Criteria

1. `/about` renders the "关于本站" Markdown body and not the hardcoded combined about text.
2. `/aboutme` renders a separate "关于我" Markdown body.
3. Both pages retain the avatar/profile/social visual shell.
4. Body content is supplied through Markdown rendering, not hardcoded in `AboutContent.astro`.
5. `npm run build` passes.

## Risks

- The existing content collection only loads `source/_posts/**`; adding a page Markdown outside that path requires extending content config.

## Open Questions

- none

## Exit Criteria

- scope is clear
- non-goals are clear
- acceptance criteria are testable
- no blocking open questions remain
