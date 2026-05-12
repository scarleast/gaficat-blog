# WI-0005: Restore Fluid Post Scroll Layering

- work_id: WI-0005
- title: Restore Fluid Post Scroll Layering
- type: design
- stage: spec
- owner: main-agent
- requester: human-owner
- created_at: 2026-05-12
- updated_at: 2026-05-12
- source_refs:
  - https://fluid.ist/posts/hexo-translate-llm/
  - https://github.com/fluid-dev/hexo-theme-fluid
  - https://github.com/chengzhongxue/halo-theme-fluid
  - Owner-provided screenshots Image #1, Image #2, Image #3
  - Local Astro route: http://localhost:4321/posts/665dab17.html
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

The Astro post page does not reproduce Hexo Fluid's article scroll layering. In Fluid, the board initially overlaps the banner slightly, appears to move into the banner faster during early scroll because the banner parallax lags behind the document scroll, then settles into normal document scrolling. The right TOC sidebar stays visually normal and does not overlap into the banner.

## Desired Outcome

The local Astro post page at `/posts/665dab17.html` matches the observed Fluid behavior for the post board, banner parallax, and right TOC visibility/positioning.

## Current Stage

`/spec`
