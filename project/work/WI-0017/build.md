# /build

- work_id: WI-0017
- stage: build
- status: completed
- owner: main-agent
- updated_at: 2026-05-12

## Preflight

- Current WI id: WI-0017
- Current stage: /build
- `/spec` accepted: yes
- `/plan` accepted: yes
- Owned paths: `src/pages/index.astro`, `project/work/WI-0017/**`, `project/work/work_index.md`
- Execution-plane touched: yes
- Unrelated dirty changes: none at start
- Subagent: none

## Changes

- Removed homepage subtitle author/source rendering CSS from `src/pages/index.astro`.
- Simplified subtitle renderer so it renders only escaped sentence text plus the existing cursor inside `#subtitle`.
- Removed attribution measuring and split-line rendering helpers.
- Changed Hitokoto and Jinrishici subtitle providers to ignore author/source fields and return sentence text only.
