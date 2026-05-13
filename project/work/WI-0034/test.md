# /test

- work_id: WI-0034
- stage: test
- status: passed
- owner: main-agent
- updated_at: 2026-05-13

## Checks

- `npm run build` passed.
- `rg -n "\\{% (bilibili|audio|video)|aid=%E2%80%9C|src=“|title=“" dist/posts dist/page dist/categories dist/tags -S` returned no matches.
- `rg -n "bilibili-wrapper|player\\.bilibili\\.com|data-audio-player|video-player-wrapper|data-plyr" dist/posts/c1d9e34b.html dist/posts/e4dcbcaf.html dist/posts/bac5f5bf.html dist/posts/11640910.html -S` found expected generated media markup.
- `rg -n "^import .*Bilibili|^import .*AudioPlayer|^import .*VideoPlayer|<Bilibili|<AudioPlayer|<VideoPlayer" source/_posts -S` returned no matches.

## Evidence

- Build generated 152 static pages successfully.
- `dist/posts/e4dcbcaf.html` contains Bilibili `aid=12970201` and audio player wrappers for migrated audio examples.
- `dist/posts/bac5f5bf.html` contains audio player wrappers for migrated music theory examples.
- `dist/posts/11640910.html` contains video player markup with `data-plyr`.
- `dist/posts/c1d9e34b.html` contains Bilibili iframe markup for positional `bvid` shortcode.

## Failures

- Initial build passed but left URL-based audio/video shortcodes rendered literally after GFM autolink/smartypants. Fixed by adding rehype fallback conversion and reran checks.

## Residual Risk

- Shortcode grammar is intentionally narrow; unsupported shortcode shapes are left unchanged.
