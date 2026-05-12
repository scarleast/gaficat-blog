# WI-0012: Keep Home Typewriter Cursor With Text

## Summary

Fix the homepage banner typewriter cursor so it follows the typed subtitle text instead of staying at the right edge of the subtitle container.

## Acceptance Criteria

1. Cursor is rendered inside the typed subtitle content.
2. Cursor follows sentence text before the author/source line is reached.
3. Cursor follows the author/source line when typing attribution.
4. Author/source line remains right-aligned.
5. `npm run build` passes.
