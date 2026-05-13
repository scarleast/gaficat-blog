# /spec

- work_id: WI-0032
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-13

## Goal

Add a minimal Astro integration entrypoint for Fluid Astro so host projects can configure the theme through `astro.config.mjs` instead of only by direct component imports and environment variables.

## Scope

1. Add a package export for `@gaficat/fluid-astro/integration`.
2. Implement an Astro integration factory that accepts a config path and injects `FLUID_ASTRO_CONFIG` during Astro config setup.
3. Provide Vite aliases for the package root and optional short alias to improve installed-package/local-package usage.
4. Document integration usage and clarify what remains host-owned.
5. Preserve current site build behavior.

## Non-goals

- Do not auto-generate all blog routes in this WI.
- Do not migrate this repository's existing `src/pages/**` to package imports.
- Do not copy static assets or mutate host files automatically.
- Do not publish to npm.
- Do not change visual behavior.

## Source Of Truth

- Current `themes/fluid-astro` package surface from WI-0031.
- Astro integration shape: object with `name` and `hooks`.
- Current site build behavior.

## Acceptance Criteria

1. `themes/fluid-astro/integration.mjs` exports a default integration factory.
2. `themes/fluid-astro/package.json` exports `./integration` and includes it in packaged files.
3. The integration can be imported and invoked in a Node smoke test.
4. README shows `integrations: [fluidAstro({ config: './fluid.config.yml' })]` usage and explains limits.
5. `npm run build` passes.
6. `npm pack --dry-run` includes the integration entrypoint.

## Risks

- A minimal integration can be mistaken for fully turnkey route generation. Mitigation: docs explicitly call out current host-owned responsibilities and next step.
- Environment mutation must happen early enough. Mitigation: use `astro:config:setup`, where integrations can update config and environment before module rendering.

## Open Questions

- none

## Exit Criteria

- scope is clear
- non-goals are clear
- acceptance criteria are testable
- no blocking open questions remain
