# /plan

- work_id: WI-0016
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Implementation Strategy

Remove the hidden DOM measure layer. Before typing starts, measure the final attribution width in pixels using a temporary hidden element with the same typography. Render a single visible author track with inline `width: <measured px>` and left-aligned typed text.

## Affected Areas

- `src/pages/index.astro`
- `project/work/WI-0016/**`
- `project/work/work_index.md`

## Test Strategy

- Run `npm run build`.
- Browser MCP mock attributed subtitle and verify only one author text node/typed span is visible.
- Browser MCP inspect a synthetic partial author state: author track has fixed measured width, typed text starts at the track left edge, and track is right-aligned.

## Rollback Strategy

Restore WI-0015 hidden-measure implementation if needed.
