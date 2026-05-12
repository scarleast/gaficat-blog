# /test

- work_id: WI-0006
- stage: test
- status: completed
- tester: main-agent
- updated_at: 2026-05-12

## Commands

| command | result | notes |
| --- | --- | --- |
| `npm run build` | pass | Built 151 pages successfully. Shiki warned that language `ejs` falls back to plaintext; build did not fail. |
| `npm run build` | pass | Re-run after clearing stale CSS variable references; built 151 pages successfully with the same non-fatal Shiki warning. |
| `npm run build` | pass | Re-run after restoring home/pagination banner wrappers; built 151 pages successfully with the same non-fatal Shiki warning. |
| `npm run build` | pass | Re-run after post bottom meta/license repair; built 151 pages successfully with the same non-fatal Shiki warning. |
| `npm run build` | pass | Re-run after CC watermark positioning fix; built 151 pages successfully with the same non-fatal Shiki warning. |
| `npm run build` | pass | Re-run after BY/NC/ND tooltip repair; built 151 pages successfully with the same non-fatal Shiki warning. |
| `npm run build` | pass | Re-run after removing overlapping CC watermark border; built 151 pages successfully with the same non-fatal Shiki warning. |
| `npm run build` | pass | Re-run after final browser-verified CC watermark size/opacity adjustment; built 151 pages successfully with the same non-fatal Shiki warning. |
| `npm run build` | pass | Re-run after restoring CC outer circle with smaller inner text; built 151 pages successfully with the same non-fatal Shiki warning. |
| `npm run build` | pass | Re-run after aligning license box typography/spacing with `halo-theme-fluid` source CSS; built 151 pages successfully with the same non-fatal Shiki warning. |
| `npm run build` | pass | Re-run after resizing CC watermark to fit fully inside the license box; built 151 pages successfully with the same non-fatal Shiki warning. |
| `npm run build` | pass | Re-run after footer credit/logo update; built 151 pages successfully with the same non-fatal Shiki warning. |
| `npm run build` | pass | Re-run after aligning the Upyun footer logo to the original `594x302` asset rendered at `20px` high; built 151 pages successfully with the same non-fatal Shiki warning. |
| `npm run build` | pass | Re-run after adding horizontal spacing around the footer Upyun logo; built 151 pages successfully with the same non-fatal Shiki warning. |
| `npm run build` | pass | Re-run after adding markdown image captions; built 151 pages successfully. Shiki also warned that `JSON`, `table`, and `ejs` languages fall back to plaintext. |
| `npm run build` | pass | Re-run after markdown prose spacing alignment; built 151 pages successfully with the same non-fatal Shiki warning. |
| `npm run build` | pass | Re-run after blockquote style alignment; built 151 pages successfully with the same non-fatal Shiki warning. |
| `npm run build` | pass | Re-run after markdown code/inline-code/heading-anchor/footnote/button style alignment; built 151 pages successfully with the same non-fatal Shiki warning. |
| `npm run build` | pass | Re-run after restoring GitHub Markdown table/list/kbd baseline rules used by Halo Fluid; built 151 pages successfully with the same non-fatal Shiki warning. |
| `npm run build` | pass | Re-run after changing block code to Hexo Fluid dark highlight styling; built 151 pages successfully with the same non-fatal Shiki warning. |
| `npm run build` | pass | Re-run after restoring top-level markdown ordered/unordered list markers; built 151 pages successfully with the same non-fatal Shiki warning. |
| `npm run build` | pass | Re-run after switching Shiki to `github-dark` and restoring token colors; built 151 pages successfully. Shiki still warns that `JSON`, `table`, and `ejs` fall back to plaintext where those exact language ids are used. |
| `npm run build` | pass | Re-run after adding the static local search index and fuzzy fallback; built 151 pages successfully with the same non-fatal Shiki warning. |
| `npm run build` | pass | Re-run after aligning the search modal/result visual style with Fluid and filtering MDX imports from search snippets; built 151 pages successfully with the same non-fatal Shiki warning. |
| `npm run build` | pass | Re-run after restoring about/links content and Fluid template styles; built 152 pages successfully because `/about.html` was added while `/aboutme.html` remains available. Shiki still warns that `ejs` falls back to plaintext. |
| `npm run build` | pass | Re-run after adding the navbar theme toggle; built 152 pages successfully. Shiki still warns that `ejs` falls back to plaintext. |
| `npm run build` | pass | Re-run after fixing light-mode meta/button color regressions; built 152 pages successfully. Shiki still warns that `ejs` falls back to plaintext. |
| `npm run build` | pass | Re-run after about contact icon and theme-specific Upyun footer logo repair; built 152 pages successfully. Shiki still warns that `ejs` falls back to plaintext. |
| `npm run build` | pass | Re-run after replacing the light-mode white-box Upyun PNG with the original-ratio transparent logo plus blue CSS filter; built 152 pages successfully. Shiki still warns that `ejs` falls back to plaintext. |
| `npm run build` | pass | Re-run after switching the light-mode footer trial to cropped `/img/upyun_logo8.svg`; built 152 pages successfully. Shiki still warns that `ejs` falls back to plaintext. |
| `npm run build` | pass | Re-run after removing footer `Powered by` text and unifying footer typography; built 152 pages successfully. Shiki still warns that `ejs` falls back to plaintext. |
| `npm run build` | pass | Re-run after restoring category icons in index post card meta rows; built 152 pages successfully. Shiki still warns that `ejs` falls back to plaintext. |
| `npm run build` | pass | Re-run after aligning global/body, nav, post-meta, and license typography with Halo Fluid source CSS; built 152 pages successfully. Shiki still warns that `ejs` falls back to plaintext. |
| `npm run build` | pass | Re-run after adding Shiki language aliases for legacy content fences; built 152 pages successfully with no Shiki fallback warnings. |
| `npm run build` | pass | Final cleanup verification before commit; built 152 pages successfully with no Shiki fallback warnings. |

## Manual Checks

- Browser MCP captured current local screenshots for home, archives, categories, tags, links, about, post top, and post bottom.
- Post bottom before repair: `project/work/WI-0006/evidence/astro-post-bottom-before.png`.
- Post bottom after repair pass 1: `project/work/WI-0006/evidence/astro-post-bottom-after-pass1.png`.
- Post bottom after footer logo repair: `project/work/WI-0006/evidence/astro-post-bottom-after-pass2.png`.
- Post bottom final current slice: `project/work/WI-0006/evidence/astro-post-bottom-after-final.png`.
- Footer logo check after repair: `/img/upyun_logo4.png` loads with `naturalWidth: 254` and is positioned inside the centered footer row.
- Footer logo final check: `/img/upyun_logo2.png` loads with `naturalWidth: 553` and renders as a horizontal `36.7x16` logo in the centered hosting row.
- Stale variable scan: no remaining references to `color-primary`, `color-accent`, `color-bg-card`, `color-bg-dark`, `color-border`, `color-text-dark`, `color-text-heading-dark`, or `color-text-secondary-dark` under `src/`.
- Home banner regression check: `#banner` height restored to `724px` at `1434x724` viewport; screenshot saved as `astro-home-banner-restored.png`.
- Post `/posts/e7dcef5f.html` bottom check: Browser MCP confirmed `.post-bottom-metas` text is `生活 #生活`, license text includes `BY NC ND`, and `.license-icon::after` content is `"CC"`.
- Post `/posts/e7dcef5f.html` license watermark check: Browser MCP confirmed the CC watermark box is fully inside `.license-box` (`909.4..1049.8` within license right edge `1075.4`) and the URL ends before the watermark (`879.4`).
- Post `/posts/e7dcef5f.html` license tooltip check: Browser MCP confirmed BY/NC/ND expose `data-tooltip` values; hovering BY changes tooltip pseudo-element opacity to `1`.
- Post `/posts/e7dcef5f.html` CC watermark overlap check: Browser MCP confirmed `.license-icon::after` border is `0px`, leaving only the large translucent `CC` text watermark.
- Post `/posts/e7dcef5f.html` final CC watermark screenshot check: Browser MCP hard reload and screenshot confirmed current `::after` has `borderTopWidth: 0px`, `borderRadius: 0px`, `fontSize: 104px`, and `opacity: 0.045`.
- Source CSS check: cloned `chengzhongxue/halo-theme-fluid` and verified license box rules from `templates/assets/css/main.css`.
- Original footer Upyun check: Browser MCP measured original logo `https://pic.gaficat.com/halo/又拍云_logo5.png` as natural `594x302`, rendered `39.3359x20px`.
- Astro footer Upyun check: Browser MCP measured local `/img/upyun_logo6.png` as natural `594x302`, rendered `39.3359x20px`, matching the original dimensions.
- Markdown image caption check: Browser MCP on `http://localhost:4322/posts/e7dcef5f.html` found 3 `.markdown-body figcaption.image-caption` nodes: `知乎老铁`, `B站喜欢一样音乐的人`, and `要谱子的伙伴`.
- Markdown spacing comparison: Browser MCP compared original `https://www.gaficat.com/archives/e7dcef5f` and Astro `http://localhost:4322/posts/e7dcef5f.html`; key computed values now match for `.markdown-body`, paragraph margins, list margins/indentation, H2 margins/padding/font-weight, image margins, and figcaption margins.
- Blockquote comparison: Browser MCP compared original and Astro blockquotes; Astro now matches original `border-left: 4px solid rgb(223, 226, 229)`, `padding: 0px 16px`, transparent background, secondary text color, and paragraph margin.
- Markdown code comparison: Browser MCP compared original `https://www.gaficat.com/archives/b0812c46` and Astro `http://localhost:4322/posts/b0812c46.html`; Astro now matches original code block key values: `pre` font size `13.6px`, `pre code` padding `13.6px`, background `rgb(243, 243, 243)`, `white-space: pre`, `word-wrap: normal`, `border-radius: 3px`, and inline code `13.6px` with `2.72px 5.44px` padding.
- Markdown heading anchor comparison: Browser MCP confirmed Astro H2 `::before` now matches original anchor offset with `display: block`, empty content, `margin-top: -80px`, `height: 80px`, and hidden visibility.
- Markdown table check: Browser MCP on `http://localhost:4322/posts/e20e9539.html` confirmed markdown tables are constrained to the markdown body width (`716.8px`), `display: block`, `overflow-x: auto`, with cell padding `6px 13px` and `1px solid rgb(67, 82, 102)` borders, matching the GitHub Markdown baseline plus Fluid color override pattern from Halo.
- Markdown source review: `/private/tmp/halo-theme-fluid/templates/post.html` loads `assets/libs/github-markdown/github-markdown.min.css` before Fluid `main.css`; Astro now carries the markdown baseline subset needed for tables, nested lists, checkboxes, `kbd`, and code rendering.
- Footnote/button coverage: Halo Fluid footnote and `.markdown-body .btn` rules were ported. Repository content search did not find an existing rendered footnote/button sample for browser comparison in current posts.
- Markdown code dark-mode visual review: Browser MCP compared Hexo Fluid `https://fluid.ist/posts/hexo-translate-llm/` code blocks and local `http://localhost:4322/posts/b1e6cb6b.html`; local block code now uses Fluid dark highlight values: `pre` background `rgb(48, 48, 48)`, padding `23.2px 16px`, `code` color `rgb(221, 221, 221)`, `13.6px` font size, `white-space: pre`, and `overflow-x: auto`.
- Regression check after dark code change: Browser MCP verified `http://localhost:4322/posts/b0812c46.html` long code blocks remain horizontally scrollable and `http://localhost:4322/posts/e20e9539.html` markdown tables still have `display: block`, `overflow-x: auto`, `6px 13px` cell padding, and `1px solid rgb(67, 82, 102)` borders.
- Markdown ordered list fix: Browser MCP on `http://localhost:4322/posts/b1e6cb6b.html` confirmed the list containing `备份相关重要文件。` now renders as an ordered list with `list-style-type: decimal`, `list-style-position: outside`, and `li display: list-item` instead of markerless indented paragraphs.
- Shiki syntax highlighting check: Browser MCP on `http://localhost:4322/posts/b0812c46.html` confirmed code blocks now render as `astro-code github-dark`, keep Fluid dark `pre` background `rgb(48, 48, 48)` and `23.2px 16px` padding, and expose multiple computed token colors (`#F97583`, `#E1E4E8`, `#9ECBFF`, `#B392F0`, `#FFAB70`, etc.) instead of one inherited color.
- Search fuzzy fallback check: Browser MCP on `http://localhost:4322/` opened SearchModal via `fluid:open-search`; query `jshnt` returned `解决安装全局npm包提示权限错误` (`/posts/b1e6cb6b.html`) through local ASCII fuzzy token matching, query `npm 权限` returned the same post first, and query `又拍云` returned `清空又拍云对象存储后如何再次同步？` first. This verifies search still works when Pagefind is unavailable in dev mode.
- Search modal visual comparison: Browser MCP measured the original `https://fluid.ist/` search modal and local `http://localhost:4322/`; local now matches the important Fluid structure and computed values: `800px` dialog, `28px auto` top margin, `#252d38` content background, `2px` radius, header height `69px`, title `24px/36px/700`, input `16px/24px` with underline, result title `12px 20px` padding with `3px solid #0d47a1` left border, and excerpt `0 20px` padding with `16px/24px` text.
- Search snippet cleanup check: Browser MCP query `大` confirmed local results no longer show MDX `import AudioPlayer...` in snippets after `search-index.json.ts` filters import/export statements from indexed text.
- About page content/style check: Browser MCP on `http://127.0.0.1:4322/about.html` confirmed nav points to `/about`, banner text is `关于`, avatar renders as `160x160` circular image overlapping the board, `about-name` is `scarleast` at `28px/700`, intro text matches the Markdown/source content, and headings follow `tmp/index.md` plus `tmp/关于这个博客.md`: `我的梦想是什么？`, `我的职业是什么？`, `我的爱好是什么？`, `维护本站的原因？`, `本站分享的内容`, `关于本站的故事`, `尾巴`.
- Links page content/style check: Browser MCP on `http://127.0.0.1:4322/links.html` confirmed the original friend link content `未上线的猫` and application instructions render, with Fluid card dimensions matching original: card `308.3px`, card body `278.3px`, circular avatar `48px`, title `16px/700`, intro `13.6px` with two-line clamp.
- Original navbar theme-toggle reference: Browser MCP on `https://fluid.ist/` confirmed the original nav exposes `Search` followed by `Color Toggle`, both as `javascript:;` links.
- Astro navbar theme-toggle check: Browser MCP on `http://127.0.0.1:4322/` confirmed nav order `首页 / 友链 / 关于 / Search / Color Toggle`, with `#search-btn a[href="javascript:;"][aria-label="Search"]` and `#color-toggle-btn a[href="javascript:;"][aria-label="Color Toggle"]`.
- Astro light-mode check: clicking `Color Toggle` changed `html.className` to `light`, `data-color-scheme` to `light`, persisted `localStorage.Fluid_Color_Scheme = "light"`, changed body background to `rgb(238, 238, 238)`, and changed `#board` background to `rgb(255, 255, 255)`.
- Astro dark-mode check: clicking again changed `html.className` to `dark`, `data-color-scheme` to `dark`, persisted `localStorage.Fluid_Color_Scheme = "dark"`, changed body background to `rgb(24, 28, 39)`, and changed `#board` background to `rgb(37, 45, 56)`.
- Astro theme persistence check: hard reload preserved `localStorage.Fluid_Color_Scheme = "dark"` and restored `html[data-color-scheme="dark"]`.
- Light-mode home meta regression check: Browser MCP on `http://127.0.0.1:4322/` confirmed the first four `.index-btm time` nodes render as `rgb(113, 128, 150)` on `rgb(255, 255, 255)` instead of disappearing as white text.
- Light-mode post page sweep: Browser MCP on `http://127.0.0.1:4322/posts/e7dcef5f.html` confirmed `#board` is white, markdown body text is `rgb(60, 72, 88)`, heading text is `rgb(26, 32, 44)`, bottom meta is `rgb(113, 128, 150)`, and license box background is `rgba(27, 31, 35, 0.05)`; the non-banner contrast sweep returned no failures.
- Light-mode index/page sweep: Browser MCP checked `/archives.html`, `/categories.html`, `/tags.html`, `/links.html`, `/about.html`, `/404.html`, and the search modal on `/`; visible non-banner text uses Fluid variable colors and no white-on-white regressions were found.
- Light-mode scroll-top check: after scrolling, `#scroll-top-btn` renders with `rgb(113, 128, 150)` text on `rgb(255, 255, 255)` background instead of hardcoded white.
- About page contact icon check: Browser MCP on `http://127.0.0.1:4322/aboutme` confirmed Zhihu/email anchors have empty visible text, contain SVG icons, render as `28x28` targets with `20px` / `21.6px` SVGs, and use visible secondary text color in light mode.
- About page contact hover check: Browser MCP hover on the Zhihu link confirmed the icon changes to `rgb(0, 102, 255)`, gains a light hover background, and moves up by `1px`.
- Footer Upyun original-site reference check: Browser MCP on `https://www.gaficat.com/archives/e7dcef5f` confirmed the original footer uses `https://pic.gaficat.com/halo/又拍云_logo5.png`, natural `594x302`, rendered at `39.34x20px`.
- Footer Upyun light-mode corrected check: Browser MCP confirmed light mode hides the dark logo instance, shows `/img/upyun_logo6.png` through `.upyun-logo-light`, renders it at `39.34x20px`, keeps `background-color: rgba(0, 0, 0, 0)`, and applies a blue CSS filter instead of using the previous `/img/upyun_logo2.png` white-box PNG.
- Footer Upyun dark-mode check: Browser MCP confirmed dark mode hides the filtered light logo instance, shows `/img/upyun_logo6.png` through `.upyun-logo-dark`, and renders the visible logo at `39.34x20px`, matching the original footer logo geometry.
- Footer Upyun logo8 trial check: Browser MCP confirmed light mode now shows `/img/upyun_logo8.svg`, with the SVG cropped to its real logo bounds, no CSS filter, transparent computed background, and rendered size `55.86x20px`.
- Footer typography check: Browser MCP on `http://127.0.0.1:4322/aboutme` confirmed the footer text no longer contains `Powered by`; the three footer rows and footer links all compute to `13.6px`, font weight `400`, color `rgb(113, 128, 150)`, and line-height `24.48px`.
- Index category icon check: Browser MCP on `http://127.0.0.1:4322/` confirmed the first three post cards have a category SVG before the category text, with `16x16` rendered icons, `rgb(113, 128, 150)` color, and flex center alignment; category text samples were `关于`, `生活`, and `教程 其他`.
- Halo Fluid source typography check: `/private/tmp/halo-theme-fluid/settings.yaml` defines `font_size: "16px"`, `font_family` empty, `letter_spacing: "0.02em"`, and `code_font_size: "85%"`; `/private/tmp/halo-theme-fluid/templates/assets/css/main.css` defines `.markdown-body { font-size: 1rem; line-height: 1.6; font-family: var(--font-family); }`, `.index-header { font-size: 1.5rem; font-weight: bold; line-height: 1.4; }`, and `.post-metas { font-size: .9rem; }`.
- Original home font reference check: Browser MCP on `https://www.gaficat.com/` measured body `16px/24px`, nav link `14px/21px/400` with `0.32px` letter spacing, index header `24px/33.6px/700`, excerpt `16px/22.4px`, and index post meta `14.4px/21.6px`.
- Astro home font parity check: Browser MCP on `http://127.0.0.1:4322/` now measures body `16px/24px`, nav link `14px/21px/400` with `0.32px` letter spacing, index header `24px/33.6px/700`, excerpt `16px/22.4px`, and index post meta `14.4px/21.6px`.
- Original post font reference check: Browser MCP on `https://www.gaficat.com/archives/e7dcef5f` measured banner title `32px/38.4px/500`, banner post meta `16px/24px`, markdown body `16px/25.6px`, markdown H2 `24px/30px/700`, paragraph `16px/25.6px`, and license box `14.4px/21.6px`.
- Astro post font parity check: Browser MCP on `http://127.0.0.1:4322/posts/e7dcef5f.html` now measures banner title `32px/38.4px/500`, banner post meta `16px/24px`, markdown body `16px/25.6px`, markdown H2 `24px/30px/700`, paragraph `16px/25.6px`, and license box `14.4px/21.6px`.
- Shiki language warning check: content search found `ejs` fences only in `src/content/posts/tutorial/给你的fliud主题加入一言吧！.mdx`, `JSON` in `src/content/posts/tutorial/auto-js短信通知转发器.md`, and `table` in `src/content/posts/tutorial/甲醛熏得人头痛？我做了一个TVOC传感器.md`. The latest `npm run build` completed with no `[Shiki] ... falling back to "plaintext"` warnings after adding `langAlias`.
- Shiki output check: generated `dist/posts/11640910.html` still contains `data-language="ejs"` blocks with tokenized spans, and `dist/posts/b0812c46.html` still contains a `data-language="JSON"` block with tokenized spans, confirming highlighting remains active rather than being disabled globally.

## Screenshots / Evidence

- `project/work/WI-0006/evidence/astro-home-current.png`
- `project/work/WI-0006/evidence/astro-archives-current.png`
- `project/work/WI-0006/evidence/astro-categories-current.png`
- `project/work/WI-0006/evidence/astro-tags-current.png`
- `project/work/WI-0006/evidence/astro-links-current.png`
- `project/work/WI-0006/evidence/astro-about-current.png`
- `project/work/WI-0006/evidence/astro-post-current-top.png`
- `project/work/WI-0006/evidence/astro-post-current-bottom.png`
- `project/work/WI-0006/evidence/astro-post-bottom-after-logo-final.png`
- `project/work/WI-0006/evidence/astro-home-after.png`
- `project/work/WI-0006/evidence/astro-home-banner-restored.png`
- `project/work/WI-0006/evidence/astro-links-after.png`
- `project/work/WI-0006/evidence/astro-categories-after.png`
- `project/work/WI-0006/evidence/astro-post-e7dcef5f-bottom-meta-license.png`
- `project/work/WI-0006/evidence/astro-post-e7dcef5f-license-cc-fixed.png`
- `project/work/WI-0006/evidence/astro-post-e7dcef5f-license-tooltip-by.png`
- `project/work/WI-0006/evidence/astro-post-e7dcef5f-license-cc-no-overlap.png`
- `project/work/WI-0006/evidence/astro-post-e7dcef5f-license-current-browser-final-cc.png`
- `project/work/WI-0006/evidence/original-footer-upyun-logo.png`
- `project/work/WI-0006/evidence/astro-footer-upyun-logo-aligned.png`
- `project/work/WI-0006/evidence/astro-markdown-image-caption.png`
- `project/work/WI-0006/evidence/astro-markdown-spacing-aligned.png`
- `project/work/WI-0006/evidence/astro-blockquote-aligned.png`
- `project/work/WI-0006/evidence/astro-markdown-code-aligned.png`
- `project/work/WI-0006/evidence/astro-markdown-table-aligned.png`
- `project/work/WI-0006/evidence/astro-markdown-code-table-review.png`
- `project/work/WI-0006/evidence/astro-markdown-code-dark-fluid-b1e6cb6b.png`
- `project/work/WI-0006/evidence/astro-markdown-ordered-list-fixed-b1e6cb6b.png`
- `project/work/WI-0006/evidence/astro-shiki-github-dark-highlighting.png`
- `project/work/WI-0006/evidence/astro-search-fuzzy-local-index.png`
- `project/work/WI-0006/evidence/astro-search-fluid-visual-aligned.png`
- `project/work/WI-0006/evidence/astro-about-fluid-content-aligned.png`
- `project/work/WI-0006/evidence/astro-links-fluid-content-aligned.png`
- `project/work/WI-0006/evidence/original-fluid-navbar-theme-toggle.png`
- `project/work/WI-0006/evidence/astro-navbar-theme-toggle-light.png`
- `project/work/WI-0006/evidence/astro-navbar-theme-toggle-dark.png`
- `project/work/WI-0006/evidence/astro-light-home-meta-fixed.png`
- `project/work/WI-0006/evidence/astro-about-icons-svg-light.png`
- `project/work/WI-0006/evidence/astro-about-icons-zhihu-hover-light.png`
- `project/work/WI-0006/evidence/astro-footer-upyun-light-logo.png`
- `project/work/WI-0006/evidence/astro-footer-upyun-dark-logo.png`
- `project/work/WI-0006/evidence/astro-footer-upyun-light-svg.png`
- `project/work/WI-0006/evidence/astro-footer-upyun-light-filtered-original-ratio.png`
- `project/work/WI-0006/evidence/astro-footer-upyun-light-logo8-svg.png`
- `project/work/WI-0006/evidence/astro-footer-no-powered-unified-font.png`
- `project/work/WI-0006/evidence/astro-index-category-icon-restored.png`
- `project/work/WI-0006/evidence/original-font-reference-home.png`
- `project/work/WI-0006/evidence/astro-font-parity-home.png`
- `project/work/WI-0006/evidence/original-font-reference-post.png`
- `project/work/WI-0006/evidence/astro-font-parity-post.png`
- `project/work/WI-0006/evidence/font-parity-side-by-side.html`
- `project/work/WI-0006/evidence/font-parity-side-by-side.png`

## Failures

- Full page-by-page original-vs-Astro parity is not yet complete; this test record remains in progress.

## Residual Risk

- More visual differences may remain outside the repaired post bottom/footer/parallax/variable slice.

## Exit Criteria

- required commands passed or failures are justified
- required manual/browser checks are recorded
- evidence is linked
