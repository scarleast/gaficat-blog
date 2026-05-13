# /plan

- work_id: WI-0026
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-13

## Implementation Strategy

Normalize image figure rhythm in article typography CSS. Keep Markdown `figure` handling and add scoped support for legacy inline image/caption wrappers in `.markdown-body`, overriding overly loose inline spacing without changing article content.

## Affected Areas

- control plane:
  - `project/work/WI-0026/**`
  - `project/work/work_index.md`
- execution plane:
  - `themes/fluid-astro/assets/styles/typography.css`

## Work Slices

| slice | owner | owned paths | output |
| --- | --- | --- | --- |
| image/caption CSS | main-agent | `themes/fluid-astro/assets/styles/typography.css` | centered image blocks and corrected caption rhythm |
| verification | main-agent | Browser MCP, build | screenshot and DOM/style checks |

## Dependencies

- Running dev server at `http://127.0.0.1:4322/`.

## Test Strategy

- Browser MCP inspect `posts/bac5f5bf.html` highlighted image block before/after styles.
- Capture screenshot evidence of the corrected image/caption block.
- `npm run build`.

## Rollback Strategy

Revert this WI commit.

## Exit Criteria

- implementation path is clear
- owned paths are assigned
- verification plan is clear
- no uncontrolled shared-file conflicts remain
