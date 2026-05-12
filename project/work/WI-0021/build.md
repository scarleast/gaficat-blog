# /build

- work_id: WI-0021
- stage: build
- status: completed
- owner: main-agent
- updated_at: 2026-05-12

## Preflight

- Current WI id: WI-0021
- Current stage: /build
- `/spec` accepted: yes
- `/plan` accepted: yes
- Owned paths: see `plan.md`
- Execution-plane touched: yes
- Unrelated dirty changes: none at start
- Subagent: none

## Changes

- Moved Markdown/MDX post source from `src/content/posts/**` to Hexo-style `source/_posts/**`.
- Updated `src/content.config.ts` to load posts from `source/_posts`.
- Moved Fluid layouts, components, and styles into `themes/fluid-astro/**`.
- Updated route files under `src/pages/**` to import theme layouts/components from `themes/fluid-astro`.
- Added `themes/fluid-astro/_config.yml` with Fluid-compatible key groups for site, navbar, banner, index, post, footer, dark mode, and color.
- Added `themes/fluid-astro/config.mjs` to load the theme config and expose banner/mask helpers.
- Updated header, footer, base layout, page layout, post layout, index page, and paginated index page to consume core theme config values.
- Updated MDX media component imports in `source/_posts/**` to point at theme media components.
- Added `source/README.md` and `themes/fluid-astro/README.md` to document the content/theme boundary.
- Added direct `js-yaml` dependency for theme config loading.
- Updated governance repository layout and `AGENTS.md` to include `source/**` and `themes/**` as execution-plane paths.
