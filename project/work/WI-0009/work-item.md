# WI-0009: Preserve Random Subtitle Author

## Summary

When the home banner random sentence API returns an author, render it as a second line in the subtitle.

## Acceptance Criteria

1. Hitokoto author data is rendered when present.
2. Jinrishici author data is rendered when present.
3. Format is `sentence\n——author`.
4. `npm run build` passes.
