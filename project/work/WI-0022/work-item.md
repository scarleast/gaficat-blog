# WI-0022: Clean Repository Layout

- work_id: WI-0022
- title: Clean Repository Layout
- type: governance
- stage: spec
- owner: main-agent
- requester: human-owner
- created_at: 2026-05-13
- updated_at: 2026-05-13
- source_refs:
  - human-owner request: "当前项目的目录结构非常混乱，参照工程治理要求，整理一下"
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

The repository root and source tree contain tracked visual/debug artifacts, ignored platform files, stale temporary inputs, and governance documentation that no longer matches the current git-backed Astro project layout.

## Desired Outcome

The repository has a cleaner governance-aligned structure: source code, authored content, theme code, static assets, scripts, governance records, and local/generated artifacts each have clear homes.

## Current Stage

`/spec`
