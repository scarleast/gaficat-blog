# /plan

- work_id: WI-0010
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Implementation Strategy

Update `fetchHitokotoSubtitle()` to call `formatSubtitle(data.hitokoto, data.from_who || data.from)`.

## Affected Areas

- `src/pages/index.astro`
- `project/work/WI-0010/**`
- `project/work/work_index.md`

## Test Strategy

- Run `npm run build`.
- Browser MCP check with a mocked Hitokoto response that has `from` but no `from_who`.
- Browser MCP check with a mocked Hitokoto response that has neither attribution field.

## Rollback Strategy

Restore Hitokoto attribution to `from_who` only.
