# WI-0002: Add Repository Hygiene Baseline

- work_id: WI-0002
- title: Add repository hygiene baseline
- type: ops
- stage: closed
- owner: main-agent
- requester: human-owner
- created_at: 2026-05-11
- updated_at: 2026-05-11
- source_refs:
  - follow-up from WI-0001
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

The project has generated and dependency directories such as `node_modules/`, `dist/`, and `.astro/`, but no repository-level ignore rules or git repository baseline.

## Desired Outcome

The project has a `.gitignore` that excludes generated/local state and a local git repository initialized for future diff-based governance.

## Current Stage

`closed`
