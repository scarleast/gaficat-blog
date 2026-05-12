# /build

- work_id: WI-0013
- stage: build
- status: completed
- owner: main-agent
- updated_at: 2026-05-12

## Preflight

- Current WI id: WI-0013
- Current stage: /build
- `/spec` accepted: yes
- `/plan` accepted: yes
- Owned paths: `src/pages/index.astro`, `src/assets/styles/global.css`, `project/work/WI-0013/**`, `project/work/work_index.md`
- Execution-plane touched: yes
- Unrelated dirty changes: none at start
- Subagent: none

## Changes

- Replaced the homepage banner's bare SVG down arrow with a stable `.scroll-down-icon` wrapper.
- Updated shared scroll arrow CSS so the icon container owns positioning, color, z-index, and `scroll-down` animation.
- Kept the inner SVG static so it remains visible and is not affected by animation-specific layout.

## Deviations

- None.
