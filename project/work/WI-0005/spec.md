# /spec

- work_id: WI-0005
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Goal

Restore the Hexo Fluid article page scroll interaction on the Astro post page: board/banner overlap should evolve like the original Fluid page, while the TOC sidebar remains normal and does not visually invade the banner.

## Scope

1. Match the article board's initial overlap with the banner near the top of the post page.
2. Reproduce the early-scroll parallax relationship where the banner moves slower than the document, making the board appear to intrude further into the banner.
3. Preserve the stabilized state after sufficient scroll where board and page scroll together normally.
4. Keep the TOC sidebar positioned below the banner/board region and visible normally after the article content reaches it.
5. Verify the local route `http://localhost:4321/posts/665dab17.html` with browser screenshots/measurements.

## Non-goals

- Do not redesign the article typography, navbar, color palette, or post content.
- Do not change authored Markdown/MDX content.
- Do not change homepage/archive page behavior unless a shared CSS fix preserves existing Fluid-compatible behavior.

## Source Of Truth

- Owner-provided screenshots of the original Fluid behavior.
- Original page URL: `https://fluid.ist/posts/hexo-translate-llm/`.
- Original Hexo Fluid theme: `https://github.com/fluid-dev/hexo-theme-fluid`.
- Halo Fluid adaptation: `https://github.com/chengzhongxue/halo-theme-fluid`.
- Current local Astro page: `http://localhost:4321/posts/665dab17.html`.
- Project governance contracts under `project/governance/`.

## Acceptance Criteria

1. At top position, the article board overlaps the banner only slightly, comparable to Image #1.
2. During early downward scroll, the board visually overlaps more of the banner than at the top, comparable to Image #2.
3. After further scroll, overlap growth stabilizes and normal document scrolling continues, comparable to Image #3.
4. The right TOC does not appear over the banner and remains aligned with the article area once visible.
5. `npm run build` passes.

## Risks

- The original Hexo Fluid effect combines DOM layout and JavaScript parallax; a CSS-only approximation may miss the stabilized phase. Mitigation: inspect theme sources and browser geometry, then adjust both layout and scroll script if needed.
- Shared `#board` CSS may affect index/list pages. Mitigation: scope post-specific behavior with a post-page class when necessary.

## Open Questions

- none

## Exit Criteria

- scope is clear
- non-goals are clear
- acceptance criteria are testable
- no blocking open questions remain
