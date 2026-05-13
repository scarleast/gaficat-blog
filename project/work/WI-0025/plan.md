# /plan

- work_id: WI-0025
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-13

## Implementation Strategy

Rewrite `AudioPlayer.astro` as a self-contained themed audio card. Remove `data-plyr`/native controls for audio, render accessible custom controls, and initialize them with a small idempotent browser script.

## Affected Areas

- control plane:
  - `project/work/WI-0025/**`
  - `project/work/work_index.md`
- execution plane:
  - `themes/fluid-astro/components/media/AudioPlayer.astro`
  - `themes/fluid-astro/components/media/PlyrInit.astro`

## Work Slices

| slice | owner | owned paths | output |
| --- | --- | --- | --- |
| audio card implementation | main-agent | `themes/fluid-astro/components/media/AudioPlayer.astro`, `themes/fluid-astro/components/media/PlyrInit.astro` | custom themed player |
| verification | main-agent | browser MCP, build | visual/DOM/interaction checks |

## Dependencies

- Running dev server at `http://127.0.0.1:4322/`.

## Test Strategy

- Browser MCP inspect `posts/bac5f5bf.html` audio DOM and computed state.
- Browser MCP click play/progress controls enough to verify binding and no raw controls.
- `npm run build`.

## Rollback Strategy

Revert this WI commit.

## Exit Criteria

- implementation path is clear
- owned paths are assigned
- verification plan is clear
- no uncontrolled shared-file conflicts remain
