# /build

- work_id: WI-0009
- stage: build
- status: completed
- owner: main-agent
- updated_at: 2026-05-12

## Preflight

- Current WI id: WI-0009
- Current stage: /build
- `/spec` accepted: yes
- `/plan` accepted: yes
- Owned paths: `src/pages/index.astro`, `project/work/WI-0009/**`, `project/work/work_index.md`
- Execution-plane touched: yes
- Unrelated dirty changes: none at start
- Subagent: none

## Changes

- Added `formatSubtitle(sentence, author)` in `src/pages/index.astro`.
- Updated Hitokoto subtitle loading to render `from_who` as the author line when present.
- Updated Jinrishici subtitle loading to render `data.origin.author` as the author line when present.
- Preserved existing fallback, provider order randomization, timeout handling, and newline-to-`<br>` typing behavior.

## Deviations

- None.
