# WI-0024: Disable Default Media Autoplay

- work_id: WI-0024
- title: Disable Default Media Autoplay
- type: bug
- stage: spec
- owner: main-agent
- requester: human-owner
- created_at: 2026-05-13
- updated_at: 2026-05-13
- source_refs:
  - human-owner report: `http://127.0.0.1:4322/posts/c1d9e34b.html` plays video automatically near the bottom
- current_state_ref: state.md
- artifacts:
  - spec.md
  - plan.md
  - agents.md
  - build.md
  - test.md
  - review.md
  - ship.md

## Problem

Embedded media can begin playback when a post is scrolled to the media area. The Fluid Astro theme should default embedded media to user-initiated playback.

## Desired Outcome

Article media embeds do not autoplay by default, including Bilibili iframe embeds and local Plyr video embeds.

## Current Stage

`/spec`
