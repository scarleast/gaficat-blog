# WI-0034: Add Hexo-Style Media Shortcodes

- work_id: WI-0034
- title: Add Hexo-Style Media Shortcodes
- type: feature
- stage: ship
- owner: main-agent
- requester: human-owner
- created_at: 2026-05-13
- updated_at: 2026-05-13
- source_refs:
  - human-owner request: "做吧 使用方案 B"
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

Media embeds currently require MDX imports such as `import Bilibili from '../../../themes/fluid-astro/components/media/Bilibili.astro';`, which is too technical for a Hexo-like authoring experience.

## Desired Outcome

Authors can insert common media embeds in Markdown/MDX using Hexo-style shortcodes without per-post component imports.

## Current Stage

`/ship`
