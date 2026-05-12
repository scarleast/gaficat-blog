# /plan

- work_id: WI-0008
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Implementation Strategy

Update the homepage typed subtitle script so it resolves a random sentence before starting the typewriter animation. Use `fetch("https://v1.hitokoto.cn")` for Hitokoto and dynamically load `https://sdk.jinrishici.com/v2/browser/jinrishici.js` for Jinrishici. Preserve the existing static sentence as the fallback `data-typed-fallback`.

## Affected Areas

- `src/pages/index.astro`
- `project/work/WI-0008/**`
- `project/work/work_index.md`

## Test Strategy

- Run `npm run build`.
- Use Browser MCP on local home page to verify the subtitle text is populated by the async loader.
- Inspect source for both API URLs and fallback behavior.

## Rollback Strategy

Restore the prior static `data-typed-text` and synchronous typewriter script.
