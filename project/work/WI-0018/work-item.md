# WI-0018: Align Paginated Home Board With Homepage

## Summary

Make paginated home listing pages use the same first-screen board/banner boundary as `/`.

## Acceptance Criteria

1. `/page/2.html` board top aligns with the banner bottom at scroll position 0.
2. `/page/2.html` does not inherit the global `#board` negative margin used by other page layouts.
3. Homepage `/` remains unchanged.
4. `npm run build` passes.
