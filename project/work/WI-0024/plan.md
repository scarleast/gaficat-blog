# /plan

- work_id: WI-0024
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-13

## Implementation Strategy

Extend media components conservatively: add an `autoplay` prop defaulting to `false`, serialize Bilibili `autoplay` as `0` unless opted in, and only render the native video `autoplay` attribute when requested.

## Affected Areas

- control plane:
  - `project/work/WI-0024/**`
  - `project/work/work_index.md`
- execution plane:
  - `themes/fluid-astro/components/media/Bilibili.astro`
  - `themes/fluid-astro/components/media/VideoPlayer.astro`

## Work Slices

| slice | owner | owned paths | output |
| --- | --- | --- | --- |
| media defaults | main-agent | `themes/fluid-astro/components/media/*.astro` | default no-autoplay behavior |
| verification | main-agent | browser MCP, build | iframe URL and build evidence |

## Dependencies

- Running dev server at `http://127.0.0.1:4322/`.

## Test Strategy

- Browser MCP inspect Bilibili iframe `src` on `posts/c1d9e34b.html`.
- Browser MCP inspect local `VideoPlayer` page for absent native `autoplay` attribute.
- `npm run build`.

## Rollback Strategy

Revert this WI commit.

## Exit Criteria

- implementation path is clear
- owned paths are assigned
- verification plan is clear
- no uncontrolled shared-file conflicts remain
