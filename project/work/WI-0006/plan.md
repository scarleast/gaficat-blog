# /plan

- work_id: WI-0006
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Implementation Strategy

First capture current Astro and original Fluid screenshots at matching desktop viewport sizes. Review WI-0004 as a failed/incomplete parity delivery because its test evidence covers only homepage while scope covers all pages. Then repair the most visible structural mismatches, starting with post detail bottom/footer because the owner supplied a failing screenshot. Continue page-by-page until the main Fluid surfaces align.

## Affected Areas

- control plane:
  - `project/work/WI-0006/**`
  - `project/work/work_index.md`
- execution plane:
  - `src/assets/styles/global.css`
  - `src/assets/styles/typography.css`
  - `src/components/common/Footer.astro`
  - `src/components/common/Header.astro`
  - `src/components/post/Copyright.astro`
  - `src/components/post/PostNav.astro`
  - `src/components/post/TableOfContents.astro`
  - `src/layouts/BaseLayout.astro`
  - `src/layouts/PostLayout.astro`
  - `src/layouts/PageLayout.astro`
  - `src/pages/**`
  - `src/components/home/PostCard.astro`

## Work Slices

| slice | owner | owned paths | output |
| --- | --- | --- | --- |
| WI-0004 review | main-agent | `project/work/WI-0006/review-wi0004.md` | accept/reject assessment |
| evidence capture | main-agent | `project/work/WI-0006/evidence/**` | original/current screenshots |
| post detail repair | main-agent | `src/layouts/PostLayout.astro`, `src/components/post/**`, `src/components/common/Footer.astro`, `src/assets/styles/**` | corrected post bottom and footer |
| page parity repair | main-agent | `src/pages/**`, `src/components/home/PostCard.astro`, `src/layouts/PageLayout.astro`, `src/assets/styles/**` | corrected scoped pages |
| navbar theme toggle repair | main-agent | `src/components/common/Header.astro`, `src/layouts/BaseLayout.astro`, `src/assets/styles/global.css` | Fluid-style color toggle button and working light/dark theme switching |
| verification | main-agent | `project/work/WI-0006/test.md` | build and screenshot evidence |

## Dependencies

- Local dev server.
- Browser MCP for visual screenshots.
- Network access for original page screenshots/source lookup.

## Test Strategy

- Capture screenshots for original and Astro pages at matching viewport sizes.
- Use browser MCP geometry/style checks where screenshots expose ambiguous differences.
- Run `npm run build`.

## Rollback Strategy

Revert execution-plane edits made under WI-0006; keep review evidence to document why WI-0004 was insufficient.

## Exit Criteria

- implementation path is clear
- owned paths are assigned
- verification plan is clear
- no uncontrolled shared-file conflicts remain
