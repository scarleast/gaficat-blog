# /test

- work_id: WI-0039
- stage: ship
- owner: main-agent
- updated_at: 2026-05-13

## Build Test

- Command: `npm run build`
- Result: **PASSED** — 159 pages built in 1.37s
- New pages generated:
  - `/posts/halo-6year-sec/index.html` (6年网安人自述)
  - `/posts/halo-tian-ming-ji-he/index.html` ("天命"几何)
- New tags generated:
  - `/tags/职场/index.html`
  - `/tags/网络安全/index.html`
  - `/tags/随笔/index.html`
  - `/tags/游戏/index.html`

## Content Verification

- Both articles have valid frontmatter (title, date, abbrlink, categories, tags)
- Both articles render as HTML pages without errors
- Content matches live site versions

## Regression

- No existing articles broken
- Total posts: 90 (up from 88)
