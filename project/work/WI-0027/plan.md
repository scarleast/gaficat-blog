# /plan

- work_id: WI-0027
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-13

## Implementation Strategy

Extend the post typography CSS from WI-0026 to cover legacy top-level `<center>` wrappers that contain direct images. Share the same spacing rules as existing centered image wrappers and avoid content edits.

## Affected Areas

- control plane:
  - `project/work/WI-0027/**`
  - `project/work/work_index.md`
- execution plane:
  - `themes/fluid-astro/assets/styles/typography.css`

## Work Slices

| slice | owner | owned paths | output |
| --- | --- | --- | --- |
| legacy center CSS | main-agent | `themes/fluid-astro/assets/styles/typography.css` | shared centered image/caption rhythm for `<center>` blocks |
| verification | main-agent | Browser MCP, build | spacing measurements and screenshot evidence |

## Dependencies

- Running dev server on an available localhost port.

## Test Strategy

- Browser MCP inspect `posts/4056508e.html` before/after target legacy `<center>` image block spacing.
- Browser MCP regression-check `posts/bac5f5bf.html` image block spacing from WI-0026.
- Record `posts/bb4e922e.html` external image failure as debt.
- `npm run build`.

## Rollback Strategy

Revert this WI commit.

## Exit Criteria

- implementation path is clear
- owned paths are assigned
- verification plan is clear
- no uncontrolled shared-file conflicts remain
