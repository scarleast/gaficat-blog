# /build

- work_id: WI-0037
- stage: build
- status: pending
- owner: main-agent
- updated_at: 2026-05-13

## Preflight

- current WI: WI-0037
- current stage: build
- `/spec` accepted: yes
- `/plan` accepted before build: yes
- owned paths: `astro.config.mjs`, `src/pages/rss.xml.ts`, `src/pages/atom.xml.ts`, `src/utils/rss.ts`, `src/utils/legacy-sitemap-pages.mjs`, `project/work/WI-0037/**`, `project/work/work_index.md`
- touches execution-plane paths: yes
- unrelated dirty changes: none
- subagents: none
- runtime entrypoints changed: no

## Changed Files

- `astro.config.mjs`
- `src/pages/atom.xml.ts`
- `src/utils/rss.ts`
- `src/utils/legacy-sitemap-pages.mjs`
- `project/work/WI-0037/**`
- `project/work/work_index.md`

## Implementation Notes

- `src/utils/rss.ts` now accepts a URL mode. Modern mode emits extensionless post URLs; legacy mode emits old `.html` post URLs.
- `/rss.xml` remains modern by default.
- `/atom.xml` now calls the shared RSS utility in legacy URL mode.
- The default `@astrojs/sitemap` integration no longer receives legacy `customPages`, so `sitemap-0.xml` is modern-only.
- The build hook now writes a separate `dist/sitemap-legacy.xml` from the legacy redirect list, alongside existing static `.html` compatibility pages.

## Deviations

- None.

## Blockers

- None.
