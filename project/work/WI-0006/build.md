# /build

- work_id: WI-0006
- stage: build
- status: completed
- owner: main-agent
- branch: n/a
- updated_at: 2026-05-12

## Changes

- `project/work/WI-0006/plan.md`: expanded WI-0006 owned paths to include `src/components/common/Header.astro` and `src/layouts/BaseLayout.astro` for the navbar theme-toggle repair slice.
- `project/work/WI-0006/review-wi0004.md`: reviewed WI-0004 and recorded `changes_required`.
- `src/components/post/Copyright.astro`: replaced the Tailwind bordered copyright card with Fluid-style `.license-box` markup.
- `src/components/post/PostNav.astro`: replaced the oversized bordered grid cards with Fluid-style `.post-prevnext` markup.
- `src/components/common/Footer.astro`: changed footer credit back to Halo/Fluid, added police beian icon, and scoped hosting row/logo classes.
- `src/assets/styles/global.css`: added Fluid license-box styles, fixed post-prevnext icon spacing, fixed footer logo/beian image layout, and replaced invalid `--color-text` / `--color-accent` variable references with existing Fluid variables.
- `src/layouts/PostLayout.astro`: passed post title/date into the Fluid license box.
- `src/pages/index.astro`, `src/pages/page/[page].astro`, `src/layouts/PageLayout.astro`: unified parallax behavior to Fluid's `scrollY / 5` formula with `96 + board margin-top` cap.
- `src/pages/categories/[...slug].astro`, `src/pages/tags/[tag].astro`: replaced invalid accent variable references.
- `src/components/common/SearchModal.astro`, `src/components/common/ReadingProgress.astro`, `src/components/common/ScrollTop.astro`, `src/components/post/TableOfContents.astro`, `src/components/post/PostMeta.astro`, `src/components/post/ArticleHeader.astro`, `src/components/media/AudioPlayer.astro`, `src/components/media/VideoPlayer.astro`, `src/pages/404.astro`: removed remaining references to pre-Fluid light/dark variable names so component styling resolves against the current Fluid variable set.
- `src/pages/index.astro`, `src/pages/page/[page].astro`: restored the missing `.header-inner` height wrapper around home/pagination banners after `.banner` was corrected to Fluid's `height: 100%`.
- `src/layouts/PostLayout.astro`: added Fluid-style bottom category/tag metadata rendered from post frontmatter before the license box.
- `src/components/post/Copyright.astro`: replaced unavailable CC iconfont glyphs with visible BY/NC/ND license badges.
- `src/assets/styles/global.css`: added bottom post meta styling and license badge / large translucent CC background fallback.
- `src/assets/styles/global.css`: adjusted the CC watermark to render as a complete right-side circle inside the license box and constrained the license URL width so it does not cross the watermark.
- `src/components/post/Copyright.astro`, `src/assets/styles/global.css`: added BY/NC/ND hover/focus tooltips for the license badges.
- `src/assets/styles/global.css`: removed the drawn border circle around the CC watermark to prevent the text and outer ring from overlapping.
- `src/assets/styles/global.css`: reduced the CC watermark size and opacity after browser screenshot verification so it reads as a background mark rather than a foreground icon.
- `src/assets/styles/global.css`: restored the CC watermark outer circle and reduced the inner CC font size so the letters no longer collide with the ring.
- `/private/tmp/halo-theme-fluid/templates/assets/css/main.css`: used as source reference for license box typography and spacing.
- `src/components/post/Copyright.astro`: changed license date formatting to zero-padded `YYYY年MM月DD日`, matching the original site output.
- `src/assets/styles/global.css`: restored the license box typography/spacing rules to the Halo Fluid source values and reduced BY/NC/ND fallback badge dimensions to sit closer to the original iconfont size.
- `src/assets/styles/global.css`: resized and repositioned the CC watermark to fit fully inside the license box while keeping the outer circle visible.
- `src/components/common/Footer.astro`: changed the footer credit from `Powered by Halo · Fluid` to `Powered by Astro · Fluid`.
- `src/components/common/Footer.astro`: switched the Upyun footer logo from PNG to the transparent SVG asset `/img/upyun_logo8.svg`.
- `src/components/common/Footer.astro`, `src/assets/styles/global.css`: aligned the footer Upyun logo to the original site by using `/img/upyun_logo6.png`, rendering it at `20px` high, and removing lazy loading so the footer size is stable.
- `src/assets/styles/global.css`: added `0.2rem` horizontal breathing room around the footer Upyun logo.
- `src/utils/rehype-image-captions.ts`: added a rehype transform that converts markdown image-only paragraphs into `<figure>` elements with `figcaption.image-caption` from image alt text.
- `astro.config.mjs`: registered the image caption rehype plugin after existing math rendering.
- `src/assets/styles/typography.css`: added Fluid-style image caption typography.
- `src/assets/styles/typography.css`: aligned markdown prose spacing with the original site: paragraph/list bottom margins, list indentation, H1/H2 border/padding, heading spacing, and heading weight.
- `src/assets/styles/typography.css`: aligned blockquote rendering with the original site, including transparent background, `4px` light gray left border, and `0 1em` padding.
- `src/assets/styles/typography.css`: aligned markdown code rendering with original Fluid/Halo computed styles: heading anchor offset, inline code padding/radius/font size, code block `pre code` background/padding/overflow/white-space, mermaid centering, footnote styles, and markdown `.btn` styles.
- `src/assets/styles/typography.css`: restored the subset of GitHub Markdown baseline rules that Halo Fluid loads before `main.css`, including nested list markers, form/kbd normalization, and table display/overflow/borders/cell padding; Fluid color overrides remain on top.
- `src/assets/styles/typography.css`: adjusted block code rendering toward original Hexo Fluid dark-mode highlight blocks (`#303030` background, `1.45rem 1rem` `pre` padding, `#ddd` code text) after visual review of `posts/b1e6cb6b.html`.
- `src/assets/styles/typography.css`: explicitly restored top-level markdown list markers (`ul: disc`, `ol: decimal`) after `posts/b1e6cb6b.html` showed ordered-list items rendering as markerless indented paragraphs.
- `astro.config.mjs`, `src/assets/styles/typography.css`: switched Shiki from `github-light` to `github-dark`, disabled Shiki line wrapping, and removed the token color override so fenced code blocks regain syntax highlighting on the Fluid dark code background.
- `src/assets/styles/global.css`: changed `--code-font-size` from `0.875rem` to `0.85rem`, matching the original site's `13.6px` code text size at the default `16px` root.
- `src/pages/search-index.json.ts`: added a static search index generated from the Astro content collection, including title, URL, date, tags, normalized categories, excerpt, and a bounded plain-text body field for local fallback search.
- `src/components/common/SearchModal.astro`: kept Pagefind as the primary search engine when available, added local fuzzy fallback/augmentation for Chinese terms, multi-term queries, and ASCII typo/subsequence matches, escaped fallback result HTML, and made the modal work in dev mode when `/pagefind/pagefind.js` is unavailable.
- `src/components/common/Header.astro`: changed the nav search click handler to dispatch `fluid:open-search` so SearchModal owns opening, focus, and index preloading consistently.
- `src/components/common/SearchModal.astro`: rebuilt the search modal markup/styles toward the original Fluid search modal: `800px` dialog, dark `#252d38` content panel, centered `24px` title header, Material-style keyword underline input, close button, and list-group results with a `3px` blue left border on each title plus plain excerpt paragraphs.
- `src/pages/search-index.json.ts`: filtered MDX `import`/`export` statements out of the indexed body and excerpt text so component imports no longer appear in search snippets.
- `src/components/page/AboutContent.astro`: added Fluid/Halo-style about page content using the Markdown sources in `tmp/index.md` and `tmp/关于这个博客.md` as content reference, including avatar, name, intro, contact icons, personal sections, and blog story/tail sections.
- `src/pages/about/index.astro`, `src/pages/aboutme/index.astro`: render the shared about content under both `/about.html` and legacy `/aboutme.html`, with `/about` matching the original site navigation path.
- `src/components/common/Header.astro`: changed the nav `关于` link from `/aboutme` to `/about`.
- `src/pages/links/index.astro`: replaced placeholder Upyun link content with the original site's friend link entry `未上线的猫` and the original friend-link application instructions.
- `src/assets/styles/global.css`: restored Fluid source styles for `.about-avatar`, `.about-info`, `.about-name`, `.about-icons`, `.links .card`, `.card-body`, `.card-content`, `.link-avatar`, `.link-title`, `.link-intro`, and added missing Bootstrap-equivalent `.col-md-6` / `.col-lg-4` grid rules needed by the original links template.
- `src/layouts/BaseLayout.astro`: added Fluid-compatible `data-color-scheme` initialization, default dark state, `theme-color`, and an early inline script that applies the persisted `Fluid_Color_Scheme` / legacy `theme` value before page content renders.
- `src/components/common/Header.astro`: added the Fluid-style `#color-toggle-btn` nav item after search, implemented the light/dark toggle with persisted localStorage state, kept `Search` and `Color Toggle` as `javascript:;` nav links like the original theme, and guarded header event binding against repeated Astro swaps.
- `src/assets/styles/global.css`: added Halo Fluid default light-mode variable overrides, scheme-specific navbar glass colors, icon sizing for navbar SVG-only buttons, and light-mode license-box background.
- `src/assets/styles/global.css`: fixed shallow light-mode regression where the global `.post-meta { color: #fff; }` made homepage/index dates disappear on white cards; white post-meta text is now scoped to `.banner-text .post-meta`.
- `src/components/common/ScrollTop.astro`: changed the scroll-top icon from hardcoded white to Fluid secondary text color so it remains visible on the light-mode white button background.
- `src/pages/404.astro`: changed the return-home button from hardcoded white text to Fluid variable text/hover colors so it remains visible in light mode where button background is transparent.
- `src/components/page/AboutContent.astro`: replaced the about page Zhihu and email text glyphs with inline SVG icons so the contact row reads as actual icons instead of plain characters.
- `src/assets/styles/global.css`: tightened about icon sizing, hover/focus behavior, and removed the duplicate generic hover color rule that overrode the Zhihu-specific blue hover state.
- `src/components/common/Footer.astro`, `src/assets/styles/global.css`: added theme-specific Upyun footer logos, using the white original-sized logo in dark mode and a blue/light logo in light mode while keeping the link accessible name on the anchor.
- `src/components/common/Footer.astro`, `src/assets/styles/global.css`: corrected the light-mode Upyun footer logo to reuse the original-ratio transparent `/img/upyun_logo6.png` at `20px` high with a blue CSS filter, eliminating the white-box PNG background while matching the original site's `39.34x20` footer logo geometry.
- `public/img/upyun_logo8.svg`, `src/components/common/Footer.astro`, `src/assets/styles/global.css`: switched the light-mode Upyun footer trial to `/img/upyun_logo8.svg`, cropped the SVG viewBox to its real logo bounds, and removed the previous blue CSS filter so the official blue vector renders directly.
- `src/components/common/Footer.astro`, `src/assets/styles/global.css`: removed the literal `Powered by` footer text, kept `Astro · Fluid`, and centralized footer font size, weight, color, line-height, and link styling under `.footer-inner` instead of mixed inline styles.
- `src/components/home/PostCard.astro`, `src/assets/styles/global.css`: restored the missing folder/category icon before category chains in index/category/tag post card meta rows and moved the inline flex alignment to `.post-meta-taxonomy`.
- `src/assets/styles/global.css`: aligned non-markdown global typography with Halo Fluid by changing body line-height from `1.6` to `1.5`, removing the Astro-only `.post-meta { font-size: 1rem; }` override, and reducing active nav link weight from `500` to Fluid's normal `400`.
- `src/components/common/Header.astro`: removed inline nav-link `letter-spacing: 0.02em` so nav items inherit the root `0.32px` letter spacing used by Halo Fluid instead of recalculating against the `14px` nav font.
- `project/work/WI-0006/evidence/font-parity-side-by-side.html`: added a local side-by-side visual comparison page for this font parity slice.
- `astro.config.mjs`: added Shiki `langAlias` entries for `ejs -> html`, `JSON -> json`, and `table -> plaintext` so legacy content language labels no longer fall back with build warnings while preserving existing Markdown fences.

## Implementation Notes

- WI-0004 is treated as partial/incomplete parity work, not a valid full-site parity ship.
- The owner-provided post bottom failure was prioritized first because it showed active structural mismatch.
- Fluid source references used for this slice: `https://fluid.ist/css/main.css`, `https://fluid.ist/js/events.js`, and `https://fluid.ist/posts/hexo-translate-llm/`.
- Markdown rendering review used `/private/tmp/halo-theme-fluid/templates/assets/css/main.css` and Browser MCP comparisons between `https://www.gaficat.com/archives/b0812c46` and `http://localhost:4322/posts/b0812c46.html`.
- Navbar theme-toggle repair used `/private/tmp/halo-theme-fluid/templates/modules/header/navigation.html`, `/private/tmp/halo-theme-fluid/templates/assets/js/color-schema.js`, and `/private/tmp/halo-theme-fluid/settings.yaml` as source references.
- Preflight for this slice: current WI is `WI-0006`; current stage is `/build`; `/spec` and `/plan` are accepted; touched execution-plane paths are now listed in the accepted plan; existing unrelated dirty changes are preserved; no subagent was used.
- Light-mode regression sweep focused on visible non-banner surfaces (`#board`, footer, search modal, scroll-top, 404 action) because Fluid intentionally keeps navbar/banner text white over image or dark glass backgrounds.
- About/footer light-mode follow-up preflight: current WI is `WI-0006`; current stage is `/build`; `/spec` and `/plan` are accepted; owned paths include `src/components/common/Footer.astro`, `src/components/page/AboutContent.astro`, and `src/assets/styles/global.css`; no subagent was used.
- Font parity follow-up preflight: current WI is `WI-0006`; current stage is `/build`; `/spec` and `/plan` are accepted; owned paths include `src/assets/styles/global.css`, `src/components/common/Header.astro`, and `project/work/WI-0006/**`; the edit touches execution-plane style/header paths already listed in the accepted plan; unrelated dirty changes are preserved; no subagent was used.
- Shiki warning follow-up preflight: current WI is `WI-0006`; current stage is `/build`; `/spec` and `/plan` are accepted; `astro.config.mjs` is an execution-plane path covered by the governance entry for build configuration changes; existing content fences were preserved; no subagent was used.

## Deviations From Plan

- Full page-by-page parity repair is still in progress. This build record captures incremental repair slices rather than final completion.
- `src/components/common/Header.astro` and `src/layouts/BaseLayout.astro` were added to the plan during `/build` because the owner expanded the parity scope to include the navbar theme switcher.

## Blockers

- none

## Exit Criteria

- planned implementation is complete
- changed files are listed
- deviations are explained
- blockers are resolved or explicitly recorded
