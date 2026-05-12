# WI-0016: Stabilize Subtitle Attribution Typing

## Summary

Fix homepage subtitle attribution typing so the author is not duplicated and the visible text grows left-to-right.

## Acceptance Criteria

1. Author/source is rendered exactly once.
2. Author/source line remains right-aligned after typing.
3. During typing, author/source text grows left-to-right without sliding left.
4. `npm run build` passes.
