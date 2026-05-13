# WI-0030: Drive Fluid Astro Metadata From Theme Config

- work_id: WI-0030
- title: Drive Fluid Astro Metadata From Theme Config
- type: feature
- stage: ship
- owner: main-agent
- requester: human-owner
- created_at: 2026-05-13
- updated_at: 2026-05-13
- source_refs:
  - human-owner request: "完全解耦 astro 的硬编码，全部从 themes/fluid-astro/_config.yml 读"
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

Several Astro routes and Fluid Astro components still contain configurable site, author, profile, SEO, feed, and friend-link metadata directly in `.astro` or `.ts` files. This weakens the theme boundary and makes `_config.yml` an incomplete source of truth.

## Desired Outcome

Configurable metadata used by Astro routes and Fluid Astro components is read from `themes/fluid-astro/_config.yml` through the existing theme config loader instead of being hardcoded in page/component code.

## Current Stage

`/ship`
