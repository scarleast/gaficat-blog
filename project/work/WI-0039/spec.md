# /spec

- work_id: WI-0039
- stage: ship
- status: closed
- owner: main-agent
- updated_at: 2026-05-13

## Goal

Cross-reference all articles on the live site (gaficat.com) against the local `source/_posts/` directory. Identify missing articles and create them with recovered content.

## Cross-Reference Method

1. Fetched all 9 archive pages from https://www.gaficat.com/archives/page/N/
2. Pages 1-3, 6-9 serve Hexo 5.1.1 content (CDN-cached): 70 articles visible
3. Pages 4-5 serve Halo 2.21.8 content (current): 32 articles listed
4. Compared all 88 local markdown files against live site articles by title and date

## Revised Findings (after deeper verification)

### Confirmed Missing — Now Resolved (2 articles)

| # | Title | Date | Source | Resolution |
|---|-------|------|--------|------------|
| 1 | **"天命"几何** | 2025-11-07 | Halo only | Recovered from live site, created markdown |
| 2 | **6年网安人自述：从大头兵到光杆司令？** | 2025-10-13 | Halo only | Recovered from tmp/ and live site, created markdown |

### Previously Suspected Missing — Confirmed Present

| # | Title | Date | Local File |
|---|-------|------|------------|
| 1 | **Value The Love！** | 2021-07-03 | `source/_posts/life/关于生活.md` (frontmatter title matches) |
| 2 | **Hello World** | 2019-11-15 | Excluded by user decision — Hexo scaffold default |

### Confirmed Present (confusing names verified)

- "关于本站" (live) = `source/_posts/关于这个博客.md` (local) — same article, frontmatter title is `关于本站`

## Non-goals

- Do not modify existing local articles
- Do not restructure the `source/_posts/` directory layout
- Do not address the Hexo/Halo archive page inconsistency

## Acceptance Criteria

1. ~~All 4 missing articles are present~~ — 2 articles migrated, 1 confirmed present, 1 excluded by user
2. `npm run build` passes after adding the new articles
3. Recovered content matches the live site version
