# WI-0023: Restore Navbar Theme Toggle

- work_id: WI-0023
- title: Restore Navbar Theme Toggle
- type: bug
- stage: spec
- owner: main-agent
- requester: human-owner
- created_at: 2026-05-13
- updated_at: 2026-05-13
- source_refs:
  - human-owner report: "深色浅色主题切换按钮失效了"
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

The navbar dark/light color toggle is visible but does not switch the active color scheme. Browser console shows a JavaScript syntax error in the header client script.

## Desired Outcome

The navbar color toggle switches between dark and light modes, updates persisted storage, and has no blocking client-side syntax error.

## Current Stage

`/spec`
