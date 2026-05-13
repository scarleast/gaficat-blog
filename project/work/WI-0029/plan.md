# /plan

- work_id: WI-0029
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-13

## Implementation Strategy

Add a `pages` content collection for `source/_pages/**`. Move "about me" body Markdown into `source/_pages/aboutme.md`. Keep "about site" sourced from the existing post `source/_posts/关于这个博客.md`. Refactor `AboutContent.astro` into a styled shell that accepts rendered Markdown via slot.

## Affected Areas

- control plane:
  - `project/work/WI-0029/**`
  - `project/work/work_index.md`
- execution plane:
  - `src/content.config.ts`
  - `src/pages/about/index.astro`
  - `src/pages/aboutme/index.astro`
  - `themes/fluid-astro/components/page/AboutContent.astro`
  - `source/_pages/aboutme.md`

## Work Slices

| slice | owner | owned paths | output |
| --- | --- | --- | --- |
| content collection | main-agent | `src/content.config.ts`, `source/_pages/aboutme.md` | Markdown source for `/aboutme` |
| route rendering | main-agent | `src/pages/about/index.astro`, `src/pages/aboutme/index.astro` | rendered Markdown passed into shell |
| styled shell | main-agent | `themes/fluid-astro/components/page/AboutContent.astro` | reusable profile/page wrapper |
| verification | main-agent | browser MCP, build | rendered content checks |

## Dependencies

- Astro content collections and `render()`.

## Test Strategy

- `npm run build`.
- Browser MCP check `/about` includes "本站分享的内容" and "关于本站的故事".
- Browser MCP check `/aboutme` includes "我的梦想是什么？", "我的职业是什么？", and "我的爱好是什么？".
- Confirm both pages retain `.about-avatar`, `.about-info`, and `.markdown-body`.

## Rollback Strategy

Revert this WI commit.

## Exit Criteria

- implementation path is clear
- owned paths are assigned
- verification plan is clear
- no uncontrolled shared-file conflicts remain
