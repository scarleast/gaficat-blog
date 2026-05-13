# /plan

- work_id: WI-0035
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-13

## Implementation Strategy

Set Astro build output to directory-style canonical URLs and remove hard-coded `.html` suffixes from generated internal URL helpers and templates. Keep XML endpoints as files. Update both host `src/pages/**` and theme route/template copies so packaged theme defaults match the host app. Verify by building and grepping generated output.

## Affected Areas

- control plane:
  - `project/work/WI-0035/**`
  - `project/work/work_index.md`
- execution plane:
  - `astro.config.mjs`
  - `src/pages/**`
  - `themes/fluid-astro/**`
  - `src/pages/atom.xml.ts`
  - `src/pages/search-index.json.ts`

## Work Slices

| slice | owner | owned paths | output |
| --- | --- | --- | --- |
| route output | main-agent | `astro.config.mjs`, `themes/fluid-astro/integration.mjs` | extensionless HTML canonical output |
| internal URLs | main-agent | `src/pages/**`, `themes/fluid-astro/{routes,layouts,components}/**`, `themes/fluid-astro/_config.yml`, `themes/fluid-astro/config.mjs` | extensionless generated links |
| feed/search/sitemap verification | main-agent | `src/pages/atom.xml.ts`, `src/pages/search-index.json.ts`, generated `dist/**` read-only checks | RSS/search/sitemap consistency |
| governance | main-agent | `project/work/WI-0035/**`, `project/work/work_index.md` | evidence and closure |

## Dependencies

- Astro `build.format` behavior.
- `@astrojs/rss` and `@astrojs/sitemap`.

## Test Strategy

- `npm run build`
- Check generated file layout for post directory output.
- Grep `dist` for internal `.html` links.
- Inspect `dist/atom.xml`, `dist/sitemap-index.xml`, `dist/sitemap-0.xml`, and `dist/search-index.json`.

## Rollback Strategy

- Revert WI-0035 changes to restore `.html` URL generation.

## Exit Criteria

- implementation path is clear
- owned paths are assigned
- verification plan is clear
- no uncontrolled shared-file conflicts remain
