# WI-0033: Inject Fluid Astro Blog Routes

- work_id: WI-0033
- title: Inject Fluid Astro Blog Routes
- type: feature
- stage: ship
- owner: main-agent
- requester: human-owner
- created_at: 2026-05-13
- updated_at: 2026-05-13
- source_refs:
  - human-owner request: "继续"
  - prior WI-0032: minimal integration entrypoint
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

Fluid Astro now has an integration entrypoint, but it still does not provide route injection. A host project must manually copy or write the core blog routes before the theme can feel close to turnkey.

## Desired Outcome

The Fluid Astro integration can inject core blog route modules from the theme package while keeping route injection configurable and preserving this repository's current build.

## Current Stage

`/ship`
