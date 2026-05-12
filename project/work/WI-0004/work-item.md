# WI-0004: Visual Parity with Fluid Theme

## Summary

Restore the Astro blog's visual appearance to 1:1 parity with the original Hexo Fluid theme site at https://www.gaficat.com/.

## Background

The blog is being migrated from Hexo (with Halo + Fluid theme) to Astro. The current Astro implementation diverges significantly from the original Fluid theme in layout, colors, typography, and component structure. All pages must visually match the original.

## Scope

### Pages in scope
- Home page (index) with banner, post list, pagination
- Post detail page (article layout with sidebar TOC)
- Links page
- About page
- Archives page
- Categories page
- Tags page

### Elements in scope
1. **Color scheme / dark mode** — Original is dark-mode-only (`--color-mode: "dark"`). Body bg `#181c27`, text `#c4c6c9`, nav `#1f3144`, card `#252d38`
2. **Banner/Hero** — Full viewport height with background image (`banner.png`), parallax effect, centered slogan text
3. **Navbar** — Fixed top, transparent over banner, opaque on scroll. Nav items: 首页, 友链, 关于 (3 items + search + color toggle). Font: PingFang SC, 14px
4. **Post list** — Simple text list (no card shadows/borders). Each post: title (h2 link), excerpt text, date, category, tags. Separated by thin borders
5. **Post detail page** — Banner with title overlay, article content with card bg, sidebar TOC
6. **Footer** — Halo + Fluid credit links, 又拍云 logo, ICP/公安备案
7. **Pagination** — Numbered page buttons with arrow navigation
8. **Typography** — PingFang SC font family (not Noto Sans SC)
9. **Icons** — Iconfont icons (calendar, folder, tag, arrow) instead of SVG icons
10. **Scroll behavior** — Banner parallax effect

### Elements out of scope (new features to keep)
- Search modal (not in original but acceptable addition)
- Reading progress bar (not in original but acceptable addition)
- Scroll-to-top button (not in original but acceptable addition)

## Acceptance Criteria

1. Side-by-side screenshot comparison shows no visually discernible difference at 1440px viewport width for all pages
2. `npm run build` passes without errors
3. Dark mode is the default and only mode (remove light mode toggle)
4. Banner uses the same background image with parallax
5. Navigation matches: 首页, 友链, 关于
6. Post list is a simple text list with thin separators (no card shadows)
7. Footer matches original layout exactly
8. All original CSS variables from Fluid theme are preserved
