# WI-0029: Render About Pages From Markdown

- work_id: WI-0029
- title: Render About Pages From Markdown
- type: refactor
- stage: closed
- owner: main-agent
- requester: human-owner
- created_at: 2026-05-13
- updated_at: 2026-05-13
- source_refs:
  - human-owner request: about pages should keep component styling but render body content from Markdown
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

`/about` and `/aboutme` both render the same hardcoded `AboutContent.astro` content, making the body hard to maintain and preventing separate "about site" and "about me" Markdown sources.

## Desired Outcome

`/about` and `/aboutme` keep the existing styled profile/page shell while rendering their body content from Markdown files that can be edited independently.

## Current Stage

`closed`
