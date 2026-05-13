# WI-0028: Tighten Post Caption Rhythm

- work_id: WI-0028
- title: Tighten Post Caption Rhythm
- type: bugfix
- stage: closed
- owner: main-agent
- requester: human-owner
- created_at: 2026-05-13
- updated_at: 2026-05-13
- source_refs:
  - human-owner report: `posts/4056508e.html` still visually has captions too far from images and too close to following paragraphs
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

The reported issue was caused by browser cache showing stale CSS after WI-0027. Browser MCP measurements on the live dev server showed the intended WI-0027 spacing was already applied.

## Desired Outcome

No product change required. WI-0027 remains the accepted fix.

## Current Stage

`closed`
