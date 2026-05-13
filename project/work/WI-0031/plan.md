# /plan

- work_id: WI-0031
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-13

## Implementation Strategy

Add package metadata and exports to the theme directory, then make `config.mjs` resolve config in this order: explicit runtime override, host-local `themes/fluid-astro/_config.yml`, package default `_config.yml`. Keep existing local imports valid. Update the README with concrete integration examples and limitations.

## Affected Areas

- control plane:
  - `project/work/WI-0031/**`
  - `project/work/work_index.md`
- execution plane:
  - `themes/fluid-astro/package.json`
  - `themes/fluid-astro/config.mjs`
  - `themes/fluid-astro/README.md`

## Work Slices

| slice | owner | owned paths | output |
| --- | --- | --- | --- |
| package metadata | main-agent | `themes/fluid-astro/package.json` | publishable package manifest |
| config portability | main-agent | `themes/fluid-astro/config.mjs` | package-aware config resolution and helper API |
| docs | main-agent | `themes/fluid-astro/README.md` | package usage and limitations |
| verification/governance | main-agent | `project/work/WI-0031/**`, `project/work/work_index.md` | evidence and closure |

## Dependencies

- Existing `js-yaml`, `astro`, `plyr`, and theme component structure.

## Test Strategy

- `npm run build`
- `node -e "import('./themes/fluid-astro/config.mjs').then(...)"` smoke test for config loading.
- `npm pack --dry-run` inside `themes/fluid-astro` to verify publish file list.

## Rollback Strategy

- Revert WI-0031 changes if package metadata or config resolution breaks the current site build.

## Exit Criteria

- implementation path is clear
- owned paths are assigned
- verification plan is clear
- no uncontrolled shared-file conflicts remain
