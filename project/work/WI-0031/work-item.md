# WI-0031: Package Fluid Astro Theme

- work_id: WI-0031
- title: Package Fluid Astro Theme
- type: feature
- stage: ship
- owner: main-agent
- requester: human-owner
- created_at: 2026-05-13
- updated_at: 2026-05-13
- source_refs:
  - human-owner request: "开 WI，主题包化"
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

`themes/fluid-astro` is currently a reusable in-repository theme directory, but it is not package-ready. It lacks npm package metadata, stable exports, package-relative config loading, and publishing/installation documentation.

## Desired Outcome

`themes/fluid-astro` can be treated as a standalone Astro theme package surface while the current site continues to build from the local theme directory.

## Current Stage

`/ship`
