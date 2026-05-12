# /plan

- work_id: WI-0012
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Implementation Strategy

Remove the homepage banner cursor sibling and render the cursor span from the subtitle rendering helper. Place the cursor after sentence text when no newline exists and inside `.subtitle-author` when attribution is being typed.

## Affected Areas

- `src/pages/index.astro`
- `project/work/WI-0012/**`
- `project/work/work_index.md`

## Test Strategy

- Run `npm run build`.
- Browser MCP check sentence-only mock: cursor is inside `#subtitle`, no external sibling cursor exists, and cursor is close to the text instead of the subtitle container right edge.
- Browser MCP check attributed mock: cursor is inside `.subtitle-author`, author line remains `text-align: right`.

## Rollback Strategy

Restore the previous external cursor sibling and render helper output.
