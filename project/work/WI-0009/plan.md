# /plan

- work_id: WI-0009
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Implementation Strategy

Add a small formatter in the homepage subtitle script. Return `sentence\n——author` from Hitokoto when `from_who` exists and from Jinrishici when `data.origin.author` exists.

## Affected Areas

- `src/pages/index.astro`
- `project/work/WI-0009/**`
- `project/work/work_index.md`

## Test Strategy

- Run `npm run build`.
- Browser MCP check homepage subtitle can render a newline author attribution when provider returns one.

## Rollback Strategy

Restore provider functions to return sentence-only strings.
