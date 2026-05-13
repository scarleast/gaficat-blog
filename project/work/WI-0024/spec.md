# /spec

- work_id: WI-0024
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-13

## Goal

Ensure article media does not autoplay by default.

## Scope

1. Update Bilibili embeds to explicitly request no autoplay.
2. Update local video embeds to expose an `autoplay` prop that defaults to false.
3. Verify `posts/c1d9e34b.html` renders its Bilibili iframe with autoplay disabled.
4. Verify the site still builds.

## Non-goals

- Do not remove media embeds.
- Do not redesign media player styling.
- Do not change article content.

## Source Of Truth

- `source/_posts/knowledge/今天想聊聊灰犀牛.mdx`
- `themes/fluid-astro/components/media/Bilibili.astro`
- `themes/fluid-astro/components/media/VideoPlayer.astro`

## Acceptance Criteria

1. Bilibili iframe URLs include `autoplay=0` by default.
2. Local `<video>` elements do not render `autoplay` unless explicitly requested.
3. `http://127.0.0.1:4322/posts/c1d9e34b.html` bottom iframe has `autoplay=0`.
4. `npm run build` passes.

## Risks

- Bilibili player behavior is ultimately controlled by Bilibili, but passing `autoplay=0` is the expected embed-level control.

## Open Questions

- none

## Exit Criteria

- scope is clear
- non-goals are clear
- acceptance criteria are testable
- no blocking open questions remain
