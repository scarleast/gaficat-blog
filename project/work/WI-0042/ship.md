# /ship — WI-0042

- work_id: WI-0042
- stage: ship
- status: complete
- updated_at: 2026-05-14

## Closure Notes

Fixed mobile responsive layout across all blog pages:
- Board card (#board) now has horizontal margins on mobile (0.5rem at 767px, 0.375rem at 424px)
- Reduced board vertical padding on mobile (2rem → 1.5rem progressively)
- All content images forced max-width: 100% on mobile
- Code blocks have max-width: 100% to prevent overflow
- Headings scaled down for mobile readability
- License box, prev/next nav, footer all have mobile-specific layouts
- body overflow-x: hidden prevents any horizontal scroll on mobile

## Changed Files

- `themes/fluid-astro/assets/styles/global.css`
- `themes/fluid-astro/assets/styles/typography.css`

## Follow-ups

None.
