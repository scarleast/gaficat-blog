# /build

- work_id: WI-0016
- stage: build
- status: completed
- owner: main-agent
- updated_at: 2026-05-12

## Preflight

- Current WI id: WI-0016
- Current stage: /build
- `/spec` accepted: yes
- `/plan` accepted: yes
- Owned paths: `src/pages/index.astro`, `project/work/WI-0016/**`, `project/work/work_index.md`
- Execution-plane touched: yes
- Unrelated dirty changes: none at start
- Subagent: none

## Changes

- Removed the hidden `.subtitle-author-measure` rendering path that could visibly duplicate author text.
- Added `measureAuthorTrackWidth()` to measure the final author/source width before typing starts.
- Rendered one visible `.subtitle-author-typed` inside a fixed-width `.subtitle-author-track`, allowing left-to-right growth without sliding.

## Deviations

- None.
