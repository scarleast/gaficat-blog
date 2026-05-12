# /plan

- work_id: WI-0017
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Implementation Strategy

Remove author-specific CSS and JS helpers from `src/pages/index.astro`. Change Hitokoto and Jinrishici provider functions to return only trimmed sentence strings. Keep the cursor rendered inside `#subtitle` so it follows sentence text.

## Affected Areas

- `src/pages/index.astro`
- `project/work/WI-0017/**`
- `project/work/work_index.md`

## Test Strategy

- Run `npm run build`.
- Browser MCP mock provider responses with author/source fields and verify only sentence text renders.
- Verify no `.subtitle-author` elements exist.

## Rollback Strategy

Restore WI-0016 implementation if author display is requested again.
