# WI-0035: Normalize Canonical URLs, Sitemap, And Feed

- work_id: WI-0035
- title: Normalize Canonical URLs, Sitemap, And Feed
- type: feature
- stage: ship
- owner: main-agent
- requester: human-owner
- created_at: 2026-05-13
- updated_at: 2026-05-13
- source_refs:
  - human-owner request: "硬迁移 按照业内正常的主流处理 sitemap rss."
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

The site currently mixes Hexo-style `.html` page URLs with Astro sitemap URLs that omit `.html`. RSS uses `.html` post links while sitemap and canonical route output do not fully align.

## Desired Outcome

Use mainstream static-site conventions: page URLs without `.html`, XML resources with `.xml`, and consistent links across rendered pages, RSS, sitemap, search index, and theme config.

## Current Stage

`/ship`
