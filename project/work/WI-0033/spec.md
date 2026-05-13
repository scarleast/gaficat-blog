# /spec

- work_id: WI-0033
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-13

## Goal

Move Fluid Astro closer to turnkey use by shipping package-owned route modules and letting the Astro integration inject core blog routes.

## Scope

1. Add package-owned route modules for home, paginated home, post detail, archives, categories, tags, and links.
2. Update the integration to inject those route modules by default through Astro's `injectRoute` hook.
3. Add route injection options so a host can disable all injected routes or individual route groups.
4. Export/package route modules and document the route injection behavior.
5. Preserve current site build behavior.

## Non-goals

- Do not remove this repository's existing `src/pages/**` routes.
- Do not inject about/aboutme pages in this WI because current content selection is site-specific.
- Do not inject RSS/search-index routes in this WI because they may require host-specific SEO/search choices.
- Do not create or mutate host `src/content.config.ts`.
- Do not publish to npm.

## Source Of Truth

- Existing route implementations under `src/pages/**`.
- Astro `injectRoute` integration API from local `astro` package types.
- Current build output behavior.

## Acceptance Criteria

1. `themes/fluid-astro/routes/**` contains reusable route modules for the scoped core blog pages.
2. `fluidAstro()` injects route patterns and entrypoints for those modules by default.
3. `fluidAstro({ routes: false })` and per-route false options are supported.
4. `themes/fluid-astro/package.json` includes and exports route modules.
5. README documents injected routes and override options.
6. `npm run build`, integration smoke test, and package dry-run pass.

## Risks

- Injected routes could collide with host routes. Mitigation: keep this repository's current build as the regression check and document disabling route injection when host routes exist.
- Route modules still assume the `posts` content collection schema. Mitigation: document required host content collection.

## Open Questions

- none

## Exit Criteria

- scope is clear
- non-goals are clear
- acceptance criteria are testable
- no blocking open questions remain
