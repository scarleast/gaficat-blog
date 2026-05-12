# /plan

- work_id: WI-0011
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Implementation Strategy

Add a typed subtitle renderer that splits escaped text at the first newline and wraps the attribution line in a block element with right alignment.

## Affected Areas

- `src/pages/index.astro`
- `project/work/WI-0011/**`
- `project/work/work_index.md`

## Test Strategy

- Run `npm run build`.
- Browser MCP check with mocked attributed subtitle; verify author line text and computed `text-align: right`.
- Browser MCP check with sentence-only subtitle; verify no author line is rendered.

## Rollback Strategy

Restore newline replacement to the previous `<br>` rendering.
