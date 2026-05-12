# WI-0008: Randomize Home Banner Subtitle

## Summary

Replace the static home banner subtitle with a random sentence fetched from Hitokoto or Jinrishici on each page refresh.

## Acceptance Criteria

1. `http://localhost:4322/` home banner no longer always shows `踏上取经路比取得真经更重要。`.
2. Each page load randomly chooses Hitokoto or Jinrishici and renders the returned sentence in the existing typed subtitle area.
3. If both APIs fail or are blocked, the existing static sentence is used as fallback.
4. `npm run build` passes.
