# /plan

- work_id: WI-0037
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-13

## Implementation Strategy

Parameterize feed generation so the same utility can produce modern extensionless links or legacy `.html` links. Remove legacy custom pages from the default `@astrojs/sitemap` integration so `sitemap-0.xml` remains modern-only. Generate a separate static legacy sitemap file from the existing legacy redirect list during `astro:build:done`, next to the existing legacy HTML compatibility pages.

## Owned Paths

- `astro.config.mjs`
- `src/pages/rss.xml.ts`
- `src/pages/atom.xml.ts`
- `src/utils/rss.ts`
- `src/utils/legacy-sitemap-pages.mjs`
- `project/work/WI-0037/**`
- `project/work/work_index.md`

## Verification

- `npm run build`
- File checks for `dist/rss.xml`, `dist/atom.xml`, modern sitemap, legacy sitemap, and legacy HTML pages.
- Grep checks for extensionless links in modern outputs and `.html` links in legacy outputs.

## Rollback

- Revert WI-0037 changes to return to WI-0036 behavior where sitemap included both URL sets and feeds were identical.

## Exit Criteria

- Paths are owned, implementation is bounded, verification is concrete.

