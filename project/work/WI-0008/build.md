# /build

- work_id: WI-0008
- stage: build
- status: completed
- owner: main-agent
- updated_at: 2026-05-12

## Preflight

- Current WI id: WI-0008
- Current stage: /build
- `/spec` accepted: yes
- `/plan` accepted: yes
- Owned paths: `src/pages/index.astro`, `project/work/WI-0008/**`, `project/work/work_index.md`
- Execution-plane touched: yes
- Unrelated dirty changes: none at start
- Subagent: none

## Changes

- `src/pages/index.astro`: replaced the static `data-typed-text` homepage subtitle with `data-typed-fallback`.
- `src/pages/index.astro`: made the typewriter initializer async so it resolves a random sentence before typing.
- `src/pages/index.astro`: added randomized provider order between Hitokoto (`https://v1.hitokoto.cn`) and Jinrishici browser SDK (`https://sdk.jinrishici.com/v2/browser/jinrishici.js`), with timeout handling and fallback to the old static sentence.
