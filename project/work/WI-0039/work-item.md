# WI-0039: Content Gap Analysis — Live Site vs Local Repo

- work_id: WI-0039
- title: Content Gap Analysis — Live Site vs Local Repo
- type: fix
- stage: ship
- owner: main-agent
- requester: human-owner
- created_at: 2026-05-13
- updated_at: 2026-05-13
- source_refs:
  - Live site: https://www.gaficat.com/archives/
  - Local repo: source/_posts/
- current_state_ref: state.md
- artifacts:
  - spec.md
  - plan.md
  - build.md
  - test.md
  - review.md
  - ship.md

## Problem

The local repo may be missing articles that exist on the live site (gaficat.com). The live site has a mixed archive: Hexo 5.1.1 pages (CDN-cached, 90 articles total) and Halo 2.21.8 pages (current CMS, 32 articles). A cross-reference is needed to identify gaps.

## Desired Outcome

All articles visible on the live site are present in the local repo as Markdown files with correct frontmatter and content. Missing articles are identified and their content recovered or recreated.

## Current Stage

`/ship`
