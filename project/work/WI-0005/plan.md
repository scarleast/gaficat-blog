# /plan

- work_id: WI-0005
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Implementation Strategy

Use the original Hexo Fluid and Halo Fluid sources to confirm the layout/parallax model. Then adjust the Astro post page so the board lives in the normal document flow with a negative top margin over a fixed-height banner, while the banner parallax transform lags only while the banner is visible. Remove any Astro-only TOC hiding behavior that conflicts with Fluid's normal right-sidebar placement, and scope post-specific fixes to avoid disturbing other pages.

## Affected Areas

- control plane:
  - `project/work/WI-0005/**`
  - `project/work/work_index.md`
- execution plane:
  - `src/layouts/PostLayout.astro`
  - `src/assets/styles/global.css`

## Work Slices

| slice | owner | owned paths | output |
| --- | --- | --- | --- |
| theme-source comparison | main-agent | none | implementation notes |
| post layout fix | main-agent | `src/layouts/PostLayout.astro`, `src/assets/styles/global.css` | corrected scroll layering |
| verification | main-agent | `project/work/WI-0005/test.md` | browser screenshots/measurements and build result |

## Dependencies

- Local dev server for browser verification.
- Network access may be required to inspect GitHub theme source if not inferable from current code and live page.

## Test Strategy

- Use browser MCP at `http://localhost:4321/posts/665dab17.html` to inspect top/early/further scroll states and save screenshots as evidence.
- Run `npm run build`.

## Rollback Strategy

Revert changes in `src/layouts/PostLayout.astro` and `src/assets/styles/global.css`; remove or close WI-0005 records if the work is abandoned.

## Exit Criteria

- implementation path is clear
- owned paths are assigned
- verification plan is clear
- no uncontrolled shared-file conflicts remain
