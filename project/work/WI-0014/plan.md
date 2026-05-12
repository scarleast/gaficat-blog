# /plan

- work_id: WI-0014
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Implementation Strategy

Change `#subtitle` from a fixed responsive width to an inline content-sized block with `width: fit-content` and the same responsive `max-width`. Keep centered parent alignment and right-align `.subtitle-author` inside the shrink-wrapped block.

## Affected Areas

- `src/pages/index.astro`
- `project/work/WI-0014/**`
- `project/work/work_index.md`

## Test Strategy

- Run `npm run build`.
- Browser MCP mock a short attributed sentence and verify the attribution right edge follows the shrink-wrapped subtitle block rather than a fixed 760px width.
- Browser MCP verify cursor remains inside typed content.

## Rollback Strategy

Restore `#subtitle` to `width: min(82vw, 760px)`.
