# /build

- work_id: WI-0012
- stage: build
- status: completed
- owner: main-agent
- updated_at: 2026-05-12

## Preflight

- Current WI id: WI-0012
- Current stage: /build
- `/spec` accepted: yes
- `/plan` accepted: yes
- Owned paths: `src/pages/index.astro`, `project/work/WI-0012/**`, `project/work/work_index.md`
- Execution-plane touched: yes
- Unrelated dirty changes: none at start
- Subagent: none

## Changes

- Removed the homepage banner cursor sibling after `#subtitle`.
- Updated `renderSubtitle()` to append the cursor inside the rendered subtitle string.
- Cursor now appears after sentence text for sentence-only subtitles and inside `.subtitle-author` for attributed subtitles.

## Deviations

- None.
