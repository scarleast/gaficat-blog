# /plan

- work_id: WI-0015
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Implementation Strategy

Render the attribution line with a right-aligned inline grid track. A hidden full-attribution measure span defines the final width, while the visible typed span is left-aligned in the same grid cell.

## Affected Areas

- `src/pages/index.astro`
- `project/work/WI-0015/**`
- `project/work/work_index.md`

## Test Strategy

- Run `npm run build`.
- Browser MCP mock an attributed subtitle.
- Mid-typing, verify visible attribution starts at the same left edge as the final-width hidden measure track and cursor follows typed text.
- After typing, verify attribution track remains right-aligned.

## Rollback Strategy

Restore the attribution renderer to direct right-aligned text inside `.subtitle-author`.
