# WI-0032: Add Fluid Astro Integration Entrypoint

- work_id: WI-0032
- title: Add Fluid Astro Integration Entrypoint
- type: feature
- stage: ship
- owner: main-agent
- requester: human-owner
- created_at: 2026-05-13
- updated_at: 2026-05-13
- source_refs:
  - human-owner request: "能建一个 wi 处理吗"
  - prior discussion: make Fluid Astro closer to a turnkey Astro integration
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

`@gaficat/fluid-astro` is package-ready as a theme surface, but it has no Astro integration entrypoint. Consumers still have to wire config path setup and package aliasing manually before importing theme modules.

## Desired Outcome

The theme package exposes a minimal Astro integration entrypoint that can be added to `astro.config.mjs` and prepares config resolution plus useful package aliases while preserving the current site's local-theme build.

## Current Stage

`/ship`
