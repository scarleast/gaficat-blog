# /plan

- work_id: WI-0028
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-13

## Implementation Strategy

Tune the existing post typography image wrapper spacing values. Move spacing responsibility from image bottom margin to wrapper bottom margin so captions stay tight to images while following content gets clear separation.

## Affected Areas

- control plane:
  - `project/work/WI-0028/**`
  - `project/work/work_index.md`
- execution plane:
  - `themes/fluid-astro/assets/styles/typography.css`

## Work Slices

| slice | owner | owned paths | output |
| --- | --- | --- | --- |
| caption rhythm CSS | main-agent | `themes/fluid-astro/assets/styles/typography.css` | tighter image-caption gap and larger post-caption gap |
| verification | main-agent | Browser MCP, build | measurements, screenshots, build result |

## Dependencies

- Running dev server at `http://127.0.0.1:4322/`.

## Test Strategy

- Browser MCP measure all `<center>` image blocks on `posts/4056508e.html`.
- Browser MCP regression measure centered image block on `posts/bac5f5bf.html`.
- Capture screenshot evidence after fix.
- `npm run build`.

## Rollback Strategy

Revert this WI commit.

## Exit Criteria

- implementation path is clear
- owned paths are assigned
- verification plan is clear
- no uncontrolled shared-file conflicts remain
