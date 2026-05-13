# /plan

- work_id: WI-0032
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-13

## Implementation Strategy

Create `integration.mjs` in the theme package. It will return a valid Astro integration object, set `process.env.FLUID_ASTRO_CONFIG` when a config path is provided, and call `updateConfig` to add Vite aliases for `@gaficat/fluid-astro` and a configurable short alias. Then export the entrypoint from package metadata and document usage.

## Affected Areas

- control plane:
  - `project/work/WI-0032/**`
  - `project/work/work_index.md`
- execution plane:
  - `themes/fluid-astro/integration.mjs`
  - `themes/fluid-astro/package.json`
  - `themes/fluid-astro/README.md`

## Work Slices

| slice | owner | owned paths | output |
| --- | --- | --- | --- |
| integration entrypoint | main-agent | `themes/fluid-astro/integration.mjs` | Astro integration factory |
| package exports | main-agent | `themes/fluid-astro/package.json` | exported integration entrypoint |
| docs | main-agent | `themes/fluid-astro/README.md` | integration usage and limits |
| verification/governance | main-agent | `project/work/WI-0032/**`, `project/work/work_index.md` | evidence and closure |

## Dependencies

- Astro integration API.
- Existing `config.mjs` `FLUID_ASTRO_CONFIG` support.

## Test Strategy

- `node -e "import('./themes/fluid-astro/integration.mjs').then(...)"` smoke test.
- `npm run build`.
- `npm pack --dry-run --cache /private/tmp/npm-cache-fluid-astro` from `themes/fluid-astro`.

## Rollback Strategy

- Revert WI-0032 changes if the integration entrypoint breaks package dry-run or site build.

## Exit Criteria

- implementation path is clear
- owned paths are assigned
- verification plan is clear
- no uncontrolled shared-file conflicts remain
