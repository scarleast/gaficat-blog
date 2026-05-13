# WI-0027: Fix Legacy Post Caption Spacing

- work_id: WI-0027
- title: Fix Legacy Post Caption Spacing
- type: bugfix
- stage: closed
- owner: main-agent
- requester: human-owner
- created_at: 2026-05-13
- updated_at: 2026-05-13
- source_refs:
  - human-owner report: `http://127.0.0.1:4322/posts/4056508e.html` image caption spacing
  - technical debt note: `posts/bb4e922e.html` uses unavailable `cdn.sspai.com` image URLs; do not fix in this WI
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

Legacy post image blocks using `<center><img ...><br><div>caption</div></center>` are not covered by the current post image/caption rhythm CSS, so captions remain too far from images and too close to surrounding text on post pages.

## Desired Outcome

All common post image/caption structures, including Markdown figures, `div style="text-align:center"` wrappers, and legacy `<center>` wrappers, share consistent centered image layout and caption spacing.

## Current Stage

`closed`
