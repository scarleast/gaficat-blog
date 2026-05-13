# /build

- work_id: WI-0036
- stage: build
- status: pending
- owner: main-agent
- updated_at: 2026-05-13

## Preflight

- current WI: WI-0036
- current stage: build
- `/spec` accepted: yes
- `/plan` accepted before build: yes
- owned paths: `astro.config.mjs`, `src/pages/**`, `src/utils/**`, `project/work/WI-0036/**`, `project/work/work_index.md`
- touches execution-plane paths: yes
- unrelated dirty changes: none at start
- subagents: none
- runtime entrypoints changed: no

## Changed Files

- `astro.config.mjs`
- `src/pages/rss.xml.ts`
- `src/pages/atom.xml.ts`
- `src/utils/rss.ts`
- `src/utils/legacy-sitemap-pages.mjs`
- `project/work/WI-0036/**`
- `project/work/work_index.md`

## Implementation Notes

- Extracted RSS generation into `src/utils/rss.ts`; `/rss.xml` and legacy `/atom.xml` now share the same feed response.
- Added `src/pages/atom.xml.ts` as the old feed endpoint while keeping RSS item links on extensionless canonical post URLs.
- Added legacy sitemap URL generation from Hexo-style Markdown frontmatter, including posts, pages, pagination, categories, and tags.
- Added an Astro `astro:build:done` integration that writes static `.html` compatibility pages into the generated output. Each compatibility page contains `noindex,follow`, a canonical link to the extensionless URL, and a zero-delay meta refresh.
- Removed the dynamic catch-all legacy route attempted during build because it was not compatible with Astro directory output for flat `.html` files.

## Deviations

- Planned `src/pages/[...legacy].astro` static route was replaced by a build hook in `astro.config.mjs`. The catch-all route made Astro attempt paths like `/archives.html/index.html` and failed static path generation; the build hook produces the required flat files such as `dist/archives.html` and `dist/posts/e4dcbcaf.html`.

## Blockers

- None.
