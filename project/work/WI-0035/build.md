# /build

- work_id: WI-0035
- stage: build
- status: completed
- owner: main-agent
- updated_at: 2026-05-13

## Preflight

- current WI: WI-0035
- current stage: build
- `/spec` accepted: yes
- `/plan` accepted before build: yes
- owned paths: `astro.config.mjs`, `src/pages/**`, `themes/fluid-astro/**`, `project/work/WI-0035/**`, `project/work/work_index.md`
- touches execution-plane paths: yes
- unrelated dirty changes: none at start
- subagents: none
- runtime entrypoints changed: no

## Changed Files

- `astro.config.mjs`
- `src/pages/rss.xml.ts`
- `src/pages/search-index.json.ts`
- `src/pages/{index,page,archives,categories,tags}/**`
- `themes/fluid-astro/**`
- selected Markdown posts under `source/_posts/**` that contained absolute old self-links
- `project/work/WI-0035/**`
- `project/work/work_index.md`

## Implementation Notes

- Changed Astro `build.format` from `file` to `directory`, producing `dist/posts/<abbrlink>/index.html` and extensionless canonical page URLs.
- Renamed the generated feed route from `atom.xml` to `rss.xml` because the feed content is RSS 2.0.
- Set RSS item links to `/posts/<abbrlink>` and disabled RSS trailing slash normalization so feed URLs match sitemap and internal links.
- Removed `.html` from generated internal links across host routes and Fluid Astro theme route/component copies.
- Updated Fluid Astro route injection defaults and route table docs to extensionless patterns.
- Added RSS autodiscovery `<link rel="alternate" type="application/rss+xml" href="/rss.xml">`.
- Migrated absolute old self-links in authored Markdown content from `https://www.gaficat.com/posts/*.html` and `/atom.xml` to extensionless `/posts/*` and `/rss.xml`.

## Deviations

- `404.html` remains a file because static hosts conventionally require that name.
- XML files remain explicit `.xml` as planned.

## Blockers

- None.
