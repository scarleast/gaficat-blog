# WI-0004 Plan: Visual Parity Implementation

## Strategy

Implement changes in dependency order — foundation first, then components, then pages.

## Implementation Order

### Phase 1: Foundation (CSS + Fonts)
1. **global.css** — Replace color system with Fluid dark-mode-only variables, switch font to PingFang SC, adjust body styles
2. **BaseLayout.astro** — Remove Google Fonts CDN, set dark mode as default, remove light mode script

### Phase 2: Layout Components
3. **Header.astro** — Reduce nav items to 首页/友链/关于, adjust text color to #d0d0d0, add glass effect on scroll
4. **Footer.astro** — Match original 3-row layout (Halo·Fluid credit, 又拍云, ICP/公安备案), remove card bg
5. **ThemeToggle.astro** — Remove theme toggle entirely

### Phase 3: Pages
6. **index.astro** — Full-viewport banner with bg image + parallax, slogan, remove wave divider and hitokoto, numbered pagination
7. **PostCard.astro** — Simplify to text-only list with thin borders, match padding/spacing
8. **PostLayout.astro** — Add banner with title, adjust content card styling
9. **PageLayout.astro** — Match page layout with banner

### Phase 4: Cleanup
10. Remove unused CSS variables for light mode
11. Ensure `npm run build` passes

## Rollback

All changes are CSS/template-only. Revert via git if needed.
