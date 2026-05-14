# /build — WI-0042

- work_id: WI-0042
- stage: build
- status: complete
- updated_at: 2026-05-14

## Changed Files

- `themes/fluid-astro/assets/styles/global.css` — Board mobile margin, mobile responsive fixes section
- `themes/fluid-astro/assets/styles/typography.css` — Code block max-width

## Implementation Notes

### Board margin on mobile (`global.css`)
- Added `@media (max-width: 767px)` rule for `#board`: `margin: 0 0.5rem`, `border-radius: 0.375rem`, `padding: 2rem 0`
- Added `@media (max-width: 424px)` rule for `#board`: `margin: 0 0.375rem`, `padding: 1.5rem 0`
- Result: board card has breathing room from screen edges on mobile, rounded corners visible

### Post content padding (`global.css`)
- Reduced `.post-content` mobile padding from `2rem` to `1.5rem` at 767px breakpoint
- Kept `1rem` at 424px breakpoint
- Combined with board margin, total edge-to-content distance is comfortable

### Code block overflow (`typography.css`)
- Added `max-width: 100%` to `.markdown-body pre` to prevent horizontal overflow

### Mobile responsive section (new in `global.css`)
- `body { overflow-x: hidden }` — prevent any horizontal scroll on mobile
- All images forced `max-width: 100%` on mobile
- Headings scaled down: h1 → 1.5em, h2 → 1.25em, h3 → 1.1em
- Post title (outside markdown): `1.75rem` on mobile
- License box meta items stack vertically on mobile
- Post prev/next nav stacks vertically on mobile
- Footer gets horizontal padding on mobile
- Archive posts allow wrapping date/title
- Category items get more touch-friendly padding
- Links page cards go full width on mobile
- Extra-small screen (424px) adjustments: smaller font sizes, tighter pagination

## Deviations

- None. All changes are CSS-only, no template or JS changes.
