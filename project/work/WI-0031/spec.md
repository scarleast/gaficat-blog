# /spec

- work_id: WI-0031
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-13

## Goal

Package `themes/fluid-astro` into a standalone, publishable Astro theme surface without breaking the current repository's local-theme usage.

## Scope

1. Add theme package metadata and export map under `themes/fluid-astro`.
2. Make theme config loading package-aware instead of hardcoding only `process.cwd()/themes/fluid-astro/_config.yml`.
3. Provide a programmatic API for consumers to point the theme at a custom config file when installed elsewhere.
4. Document install/publish usage, exported files, required peer dependencies, host integration points, and current limits.
5. Keep current site imports and `npm run build` working.

## Non-goals

- Do not publish to npm in this WI.
- Do not convert the theme into a full Astro integration with automatic route generation.
- Do not move host routes from `src/pages/**` into the theme package.
- Do not change visual design or content behavior.
- Do not edit generated `dist/**`.

## Source Of Truth

- Existing theme directory: `themes/fluid-astro/**`
- Current site behavior and build output.
- Astro package conventions for local component/layout exports.

## Acceptance Criteria

1. `themes/fluid-astro/package.json` exists with package name, version, files, peer dependencies, and an export map for config, layouts, components, assets/styles, and default config.
2. `themes/fluid-astro/config.mjs` can load config from either the current repo default path or a consumer-specified config path.
3. Current site still imports the theme locally and builds successfully.
4. `themes/fluid-astro/README.md` explains local package usage, npm-style usage, config placement, required host routes/content collections, and known limitations.
5. No package-only generated artifacts are committed.

## Risks

- Astro components import `../../config.mjs` internally, so consumers can use components but config customization must happen before render-time imports are evaluated. Mitigation: support `FLUID_ASTRO_CONFIG` and document the config path contract.
- Full theme portability still depends on host route/content setup. Mitigation: document as a theme package surface, not a turnkey integration.

## Open Questions

- none

## Exit Criteria

- scope is clear
- non-goals are clear
- acceptance criteria are testable
- no blocking open questions remain
