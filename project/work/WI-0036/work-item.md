# WI-0036: Add Legacy Feed And HTML URL Compatibility

- work_id: WI-0036
- title: Add Legacy Feed And HTML URL Compatibility
- type: compatibility
- stage: build
- owner: main-agent
- requester: human-owner
- created_at: 2026-05-13
- updated_at: 2026-05-13
- source_refs:
  - human-owner request: "sitemap 和 rss 兼容老的地址。"
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

WI-0035 hard-migrated canonical URLs from `.html` page URLs and `/atom.xml` to extensionless page URLs and `/rss.xml`. Legacy subscribers, search indexes, and inbound links can still request old addresses.

## Desired Outcome

Keep the new canonical URL shape while providing compatibility for legacy RSS and `.html` addresses.

## Current Stage

`/build`
