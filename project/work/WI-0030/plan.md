# /plan

- work_id: WI-0030
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-13

## Implementation Strategy

Audit the known hardcoded metadata points, add corresponding fields to `_config.yml` and `config.mjs`, then update each consumer to import and read `fluidThemeConfig`. Keep current values as config values and preserve existing markup and layout.

## Affected Areas

- control plane:
  - `project/work/WI-0030/**`
  - `project/work/work_index.md`
- execution plane:
  - `themes/fluid-astro/_config.yml`
  - `themes/fluid-astro/config.mjs`
  - `themes/fluid-astro/components/page/AboutContent.astro`
  - `themes/fluid-astro/components/seo/OpenGraph.astro`
  - `themes/fluid-astro/components/post/Copyright.astro`
  - `src/pages/atom.xml.ts`
  - `src/pages/about/index.astro`
  - `src/pages/aboutme/index.astro`
  - `src/pages/links/index.astro`

## Work Slices

| slice | owner | owned paths | output |
| --- | --- | --- | --- |
| config schema/defaults | main-agent | `themes/fluid-astro/_config.yml`, `themes/fluid-astro/config.mjs` | new config fields and defaults |
| consumers | main-agent | listed Astro/TS consumers | hardcoded metadata replaced with config reads |
| verification/governance | main-agent | `project/work/WI-0030/**`, `project/work/work_index.md` | build evidence and closure |

## Dependencies

- Existing `js-yaml` config loader in `themes/fluid-astro/config.mjs`.

## Test Strategy

- Run `npm run build`.
- Search for the moved literal values in `src/**` and `themes/fluid-astro/**` excluding `_config.yml` and `config.mjs` fallback defaults.

## Rollback Strategy

- Revert WI-0030 changes if config-driven metadata causes build or runtime regressions.

## Exit Criteria

- implementation path is clear
- owned paths are assigned
- verification plan is clear
- no uncontrolled shared-file conflicts remain
