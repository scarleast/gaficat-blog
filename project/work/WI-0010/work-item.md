# WI-0010: Make Home Subtitle Attribution Visible

## Summary

Improve homepage random subtitle attribution so Hitokoto responses without `from_who` can still show a second-line source attribution from `from`.

## Acceptance Criteria

1. Hitokoto uses `from_who` first, then falls back to `from`.
2. Jinrishici continues to use `data.origin.author`.
3. Format remains `sentence\n——attribution`.
4. `npm run build` passes.
