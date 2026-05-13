# /plan

- work_id: WI-0033
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-13

## Implementation Strategy

Copy/adapt the current repository's generic blog routes into `themes/fluid-astro/routes/**`, switching imports to package-relative theme paths. Add a route map to `integration.mjs` and call `injectRoute()` for enabled route groups. Update package exports/files and README. Verify the existing site still builds and the package dry-run includes route modules.

## Affected Areas

- control plane:
  - `project/work/WI-0033/**`
  - `project/work/work_index.md`
- execution plane:
  - `themes/fluid-astro/integration.mjs`
  - `themes/fluid-astro/package.json`
  - `themes/fluid-astro/README.md`
  - `themes/fluid-astro/routes/**`

## Work Slices

| slice | owner | owned paths | output |
| --- | --- | --- | --- |
| route modules | main-agent | `themes/fluid-astro/routes/**` | package-owned Astro route entrypoints |
| route injection | main-agent | `themes/fluid-astro/integration.mjs` | configurable injected routes |
| package/docs | main-agent | `themes/fluid-astro/package.json`, `themes/fluid-astro/README.md` | route exports and usage docs |
| verification/governance | main-agent | `project/work/WI-0033/**`, `project/work/work_index.md` | evidence and closure |

## Dependencies

- Astro `injectRoute` hook.
- Host `posts` content collection with current schema fields.

## Test Strategy

- `node -e` integration smoke test verifying route hook exists and disabled route config can be constructed.
- `npm run build`
- `npm pack --dry-run --cache /private/tmp/npm-cache-fluid-astro`

## Rollback Strategy

- Revert WI-0033 changes if route injection or package route modules break current build or package dry-run.

## Exit Criteria

- implementation path is clear
- owned paths are assigned
- verification plan is clear
- no uncontrolled shared-file conflicts remain
