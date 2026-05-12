# WI-0004 Spec: Visual Parity with Fluid Theme

## Visual Diff Analysis

Based on side-by-side screenshot comparison of https://www.gaficat.com/ (original Fluid theme) vs http://localhost:4321/ (current Astro implementation).

### Screenshot References

- `project/work/original-home-full.png` — Original homepage (full page)
- `project/work/original-home-viewport.png` — Original homepage (viewport)
- `project/work/original-post-full.png` — Original post page
- `project/work/original-links-full.png` — Original links page
- `project/work/original-about-full.png` — Original about page
- `project/work/original-archives-full.png` — Original archives page
- `project/work/astro-home-full.png` — Astro homepage (full page)
- `project/work/astro-home-viewport.png` — Astro homepage (viewport)
- `project/work/astro-post-full.png` — Astro post page
- `project/work/astro-links-full.png` — Astro links page
- `project/work/astro-about-full.png` — Astro about page
- `project/work/astro-archives-full.png` — Astro archives page

### Extracted Original CSS Variables (Dark Mode)

```
--body-bg-color: #181c27
--text-color: #c4c6c9
--sec-text-color: #a7a9ad
--navbar-bg-color: #1f3144
--navbar-text-color: #d0d0d0
--board-bg-color: #252d38
--line-color: #435266
--link-hover-color: #30a9de
--post-text-color: #c4c6c9
--post-heading-color: #c4c6c9
--post-link-color: #1589e9
--subtitle-color: #fff
--fold-title-color: #c4c6c9
--fold-border-color: #435266
--scrollbar-color: #687582
--scrollbar-hover-color: #252d38
--button-bg-color: transparent
--button-hover-bg-color: #46647e
--highlight-bg-color: #303030
--inlinecode-bg-color: rgba(99,110,123,0.4)
--letter-spacing: 0.02em
--font-size: 16px
```

---

## Identified Differences

### DIFF-1: Color Mode / Theme
- **Original**: Dark mode only (no light/dark toggle). `--color-mode: "dark"`. Body bg `#181c27`.
- **Astro**: Has both light and dark mode with toggle. Default is light mode (`#f5f5f5` bg).
- **Fix**: Make dark mode the default, remove the theme toggle, remove light mode CSS variables.

### DIFF-2: Banner / Hero Section
- **Original**: Full viewport height (`100vh`) banner with background image (`https://pic.gaficat.com/halo/banner.png`), parallax scrolling effect. Contains slogan: "明年此日青云去，却笑人间举子忙。" in white text centered. No wave divider.
- **Astro**: Shorter banner (~400px), gradient background (no image), title "加菲猫的创客工坊" + subtitle "今天有什么好的想法呢？" + hitokoto quote, wave SVG divider at bottom.
- **Fix**: Replace with full-viewport banner using the banner.png background image, parallax effect, centered slogan. Remove wave divider. Remove hitokoto API call.

### DIFF-3: Navigation Items
- **Original**: 首页, 友链, 关于 (3 items) + search icon + color toggle icon
- **Astro**: 首页, 归档, 分类, 标签, 关于, 友链 (6 items) + search + theme toggle
- **Fix**: Reduce nav to match: 首页, 友链, 关于. Keep search. Replace theme toggle with color toggle that doesn't switch modes.

### DIFF-4: Navbar Styling
- **Original**: Fixed top, transparent over banner, transitions to opaque `rgba(31,49,68,0.7)` on scroll (glass effect with backdrop blur). Text color `#d0d0d0`. Font: PingFang SC, 14px. Height: 64px.
- **Astro**: Fixed top, transparent over banner, transitions to `var(--color-bg-nav)` on scroll. Text color white. Font: Noto Sans SC. Height: 64px (h-16).
- **Fix**: Change to PingFang SC font, adjust text color to `#d0d0d0`, add glass effect on scroll with backdrop blur.

### DIFF-5: Post Card Layout
- **Original**: Simple text list. Each post is a `<div class="index-info">` with: h2 title link, excerpt paragraph link, then meta row (date icon+text, category icon+link, tag icon+link). No card bg, no shadow, no border-radius. Separated by thin bottom border `#435266`. Padding: `8px 15px`.
- **Astro**: Card-style layout in a max-w-3xl container with `divide-y` separators. Each card has SVG icons, larger padding (py-6).
- **Fix**: Simplify to text-only list. Use thin border separators. Match padding and spacing. Replace SVG icons with iconfont-style icons or remove them.

### DIFF-6: Post Card Meta
- **Original**: Meta row format: `[calendar-icon] 2025-11-07 [folder-icon] 生活 [tag-icon] #生活`. Icons are iconfont.
- **Astro**: Same meta structure but with SVG icons and slightly different styling.
- **Fix**: Match icon style (use simple Unicode or CSS icons matching iconfont appearance).

### DIFF-7: Pagination
- **Original**: Numbered pagination: `1  2  …  4  >` with page number buttons and next arrow. Styled as inline elements with hover effect.
- **Astro**: Text "第 1 页 / 共 9 页" with single "下一页 →" button.
- **Fix**: Replace with numbered pagination matching original style.

### DIFF-8: Footer
- **Original**: Three sections:
  1. "Powered by Halo · Fluid" (credit links)
  2. "本站由 [又拍云logo] 提供对象存储服务"
  3. "陕ICP备18017214号-1" + police icon + "陕公网安备61019002003129号"
  All centered, no background color (transparent over dark body).
- **Astro**: Different layout with copyright, 又拍云, Astro credit, ICP info. Has border-top and card bg.
- **Fix**: Match original footer layout. Change "Powered by Astro" to "Powered by Halo · Fluid" (or similar credit). Add police beian icon. Remove card bg and border.

### DIFF-9: Typography / Font
- **Original**: `font-family: "PingFang SC"`, a system font native to macOS/iOS. `font-size: 16px`. `letter-spacing: 0.02em`. `line-height: 1.5`.
- **Astro**: `font-family: "Noto Sans SC"`, a Google Font loaded via CDN. Different line-height (1.8).
- **Fix**: Switch to PingFang SC as primary font. Remove Google Fonts CDN import for Noto Sans SC. Adjust line-height and letter-spacing.

### DIFF-10: Post Detail Page Banner
- **Original**: Full viewport banner with post title overlay at bottom.
- **Astro**: No banner on post pages. Uses standard PageLayout with card bg.
- **Fix**: Add banner to post detail pages matching original style.

### DIFF-11: Post Detail Content Area
- **Original**: Article content in a container with `board-bg-color: #252d38`. No visible card border or shadow. Sidebar with TOC on the right.
- **Astro**: White card with border on light mode, dark card with border on dark mode. Has rounded corners and border.
- **Fix**: Remove border-radius, use matching bg color, simplify card styling.

### DIFF-12: Page Layout (Links, About)
- **Original**: These pages have a banner at top (same as home but shorter or different). Content below in a simple container.
- **Astro**: Uses PageLayout with a rounded card in a max-width container.
- **Fix**: Match original page layout with banner and simple content container.

### DIFF-13: Links Page
- **Original**: Grid of friend link cards with avatar, name, description.
- **Astro**: Simple markdown content rendering (no special card layout for links).
- **Fix**: Need to check original structure more carefully and match the card grid layout.

---

## Changed Files (Planned)

### Execution Plane Files
- `src/assets/styles/global.css` — Color variables, fonts, base styles
- `src/assets/styles/typography.css` — Typography adjustments
- `src/layouts/BaseLayout.astro` — Font loading, dark mode default
- `src/layouts/PostLayout.astro` — Post page banner and content styling
- `src/layouts/PageLayout.astro` — Page banner and content styling
- `src/components/common/Header.astro` — Nav items, styling, scroll behavior
- `src/components/common/Footer.astro` — Footer layout and content
- `src/components/common/ThemeToggle.astro` — Remove or repurpose
- `src/components/home/PostCard.astro` — Simplify to text list
- `src/pages/index.astro` — Banner, post list, pagination
- `src/pages/links/index.astro` — Links page layout
- `src/components/post/TableOfContents.astro` — Sidebar TOC styling

## Acceptance Criteria

1. Side-by-side screenshots at 1440px viewport show no visually discernible difference
2. `npm run build` passes without errors
3. Dark mode is the default and only active mode
4. Banner uses background image with parallax
5. Navigation has exactly: 首页, 友链, 关于
6. Post list is simple text with thin borders (no card shadows)
7. Footer matches original layout with Halo/Fluid credit
8. All CSS variables from original Fluid theme are used
9. PingFang SC is the primary font (not Noto Sans SC)
