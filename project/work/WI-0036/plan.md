# /plan

- work_id: WI-0036
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-13

## Implementation Strategy

Extract RSS generation into a shared utility so `/rss.xml` and `/atom.xml` return identical feed content. Add a static legacy compatibility route that enumerates posts, pages, categories, tags, and pagination as `.html` URLs and renders a minimal compatibility document with canonical and refresh metadata. Configure the sitemap integration with `customPages` to include legacy `.html` URLs in addition to canonical generated pages.

## Affected Areas

- control plane:
  - `project/work/WI-0036/**`
  - `project/work/work_index.md`
- execution plane:
  - `astro.config.mjs`
  - `src/pages/rss.xml.ts`
  - `src/pages/atom.xml.ts`
  - `src/pages/[...legacy].astro`
  - `src/utils/**`

## Work Slices

| slice | owner | owned paths | output |
| --- | --- | --- | --- |
| feed compatibility | main-agent | `src/pages/rss.xml.ts`, `src/pages/atom.xml.ts`, `src/utils/rss.ts` | `/rss.xml` and `/atom.xml` |
| legacy page compatibility | main-agent | `src/pages/[...legacy].astro`, `src/utils/legacy-urls.ts` | static `.html` compatibility pages |
| sitemap compatibility | main-agent | `astro.config.mjs`, `src/utils/legacy-urls.ts` | legacy URLs included in sitemap |
| governance | main-agent | `project/work/WI-0036/**`, `project/work/work_index.md` | evidence and closure |

## Dependencies

- Astro static route generation.
- `@astrojs/rss` and `@astrojs/sitemap`.

## Test Strategy

- `npm run build`
- Check expected legacy and canonical files exist.
- Grep sitemap, RSS, and rendered navigation for canonical/legacy expectations.

## Rollback Strategy

- Revert WI-0036 changes to return to WI-0035 hard-migration state.

## Exit Criteria

- implementation path is clear
- owned paths are assigned
- verification plan is clear
- no uncontrolled shared-file conflicts remain
