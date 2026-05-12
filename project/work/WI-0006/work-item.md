# WI-0006: Fluid Visual Parity Review And Repair

- work_id: WI-0006
- title: Fluid Visual Parity Review And Repair
- type: design
- stage: spec
- owner: main-agent
- requester: human-owner
- created_at: 2026-05-12
- updated_at: 2026-05-12
- source_refs:
  - `project/work/WI-0004/`
  - `project/work/WI-0005/`
  - https://www.gaficat.com/
  - https://fluid.ist/posts/hexo-translate-llm/
  - https://github.com/fluid-dev/hexo-theme-fluid
  - https://github.com/chengzhongxue/halo-theme-fluid
  - Local Astro route: http://localhost:4321/
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

WI-0004 claimed full Fluid visual parity but did not actually verify all scoped pages and left obvious post-detail regressions. The current Astro post bottom area is visually broken compared with the original Fluid theme, including oversized bordered prev/next cards, footer spacing/content issues, and a broken cloud-provider image.

## Desired Outcome

Review WI-0004 as not accepted for full parity, then repair the Astro implementation until the major Fluid visual surfaces match the original theme page-by-page, with screenshot evidence and build verification.

## Current Stage

`/spec`
