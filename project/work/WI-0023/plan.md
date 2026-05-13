# /plan

- work_id: WI-0023
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-13

## Implementation Strategy

Remove TypeScript-only syntax from the browser-executed header script so Vite/Astro emits valid JavaScript. Keep the existing color toggle behavior intact.

## Affected Areas

- control plane:
  - `project/work/WI-0023/**`
  - `project/work/work_index.md`
- execution plane:
  - `themes/fluid-astro/components/common/Header.astro`

## Work Slices

| slice | owner | owned paths | output |
| --- | --- | --- | --- |
| header script fix | main-agent | `themes/fluid-astro/components/common/Header.astro` | valid browser JavaScript |
| verification | main-agent | browser MCP, build command | toggle evidence and build result |

## Dependencies

- Running dev server at `http://127.0.0.1:4322/`.

## Test Strategy

- Browser MCP click/evaluate check on `#color-toggle-btn`.
- Browser console check.
- `npm run build`.

## Rollback Strategy

Revert the WI commit or restore the prior Header.astro line if an unexpected regression appears.

## Exit Criteria

- implementation path is clear
- owned paths are assigned
- verification plan is clear
- no uncontrolled shared-file conflicts remain
