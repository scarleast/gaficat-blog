# /spec

- work_id: WI-0025
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-13

## Goal

Improve audio player rendering on Fluid article pages, especially `posts/bac5f5bf.html`.

## Scope

1. Replace the native audio controls UI in `AudioPlayer.astro` with a custom Fluid-style audio card.
2. Keep playback user-initiated and `preload="metadata"`.
3. Support play/pause, progress seeking, current/duration time display, mute toggle, and download.
4. Ensure multiple audio players do not play simultaneously.
5. Preserve light/dark mode compatibility using existing theme variables.

## Non-goals

- Do not change article Markdown content.
- Do not redesign Bilibili or video players in this WI.
- Do not add new dependencies.

## Source Of Truth

- `themes/fluid-astro/components/media/AudioPlayer.astro`
- `source/_posts/music/music_theory/大调和小调，你还可以这样理解.mdx`
- Existing Fluid theme color variables in `themes/fluid-astro/assets/styles/global.css`

## Acceptance Criteria

1. `posts/bac5f5bf.html` audio players render as full-width themed cards instead of raw native controls.
2. Each audio card has a title, play/pause button, progress control, current/duration display, mute button, and download affordance.
3. Audio elements have no `controls` attribute and do not autoplay.
4. Playing one audio pauses other audio players on the page.
5. `npm run build` passes.

## Risks

- Browser media metadata loading can be delayed by remote audio host behavior; controls must tolerate unknown duration.

## Open Questions

- none

## Exit Criteria

- scope is clear
- non-goals are clear
- acceptance criteria are testable
- no blocking open questions remain
