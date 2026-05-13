# /spec

- work_id: WI-0034
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-13

## Goal

Support Hexo-style media shortcodes in authored Markdown/MDX so authors do not need to import Astro components inside posts.

## Scope

1. Add a Markdown pipeline plugin that converts media shortcodes into equivalent HTML for Bilibili, audio, and video embeds.
2. Support simple positional and named-argument forms:
   - `{% bilibili BV1pz4y1o74P %}`
   - `{% bilibili bvid="BV1pz4y1o74P" %}`
   - `{% bilibili aid="12970201" %}`
   - `{% audio src="https://..." title="..." author="..." %}`
   - `{% video src="https://..." title="..." poster="..." %}`
3. Wire the plugin into Astro markdown processing for both `.md` and `.mdx` content.
4. Migrate existing media MDX posts away from explicit component imports and JSX media tags.
5. Preserve current media rendering and no-autoplay behavior.

## Non-goals

- Do not build arbitrary component shortcodes in this WI.
- Do not remove MDX support globally.
- Do not redesign media player UI.
- Do not change authored non-media content.
- Do not edit generated `dist/**`.

## Source Of Truth

- Existing media component markup and behavior under `themes/fluid-astro/components/media/**`.
- Existing authored media posts under `source/_posts/**`.
- Hexo-like authoring goal from the human-owner.

## Acceptance Criteria

1. Authored content can use the specified shortcodes without importing media components.
2. Existing posts that used `Bilibili`, `AudioPlayer`, or `VideoPlayer` no longer contain those import lines or JSX tags.
3. `npm run build` passes.
4. Generated pages still contain expected Bilibili iframes, custom audio player wrappers, and video player markup.
5. Shortcode parsing safely escapes user-provided values.

## Risks

- Recreating Astro component markup in a plugin can drift from component templates. Mitigation: keep generated HTML scoped to stable classes/data attributes already used by CSS and `PlyrInit`.
- Shortcode parsing can be brittle. Mitigation: support a small documented grammar and leave unsupported input unchanged.

## Open Questions

- none

## Exit Criteria

- scope is clear
- non-goals are clear
- acceptance criteria are testable
- no blocking open questions remain
