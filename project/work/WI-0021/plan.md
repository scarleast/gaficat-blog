# /plan

- work_id: WI-0021
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Implementation Strategy

1. Create `source/_posts` by moving the current `src/content/posts` tree.
2. Point the Astro content collection loader at `source/_posts`.
3. Move current Fluid-specific layouts, components, and styles into `themes/fluid-astro`.
4. Add `themes/fluid-astro/_config.yml` using Fluid-compatible key groups for site, navbar, banner, index, post, footer, color, and dark mode.
5. Add a theme config loader that reads `_config.yml` via `js-yaml`.
6. Update route files to import theme layouts/components from `themes/fluid-astro`.
7. Update theme header/footer/layout/banner code to consume theme config values instead of hardcoded values where practical.
8. Update governance repository layout and AGENTS execution-plane docs for `source/**` and `themes/**`.

## Affected Areas

- `source/_posts/**`
- `src/content.config.ts`
- `src/pages/**`
- `themes/fluid-astro/**`
- `package.json`
- `package-lock.json`
- `AGENTS.md`
- `project/governance/repository_layout.md`
- `project/work/WI-0021/**`
- `project/work/work_index.md`

## Test Strategy

- Run `npm run build`.
- Verify post count/routes still build.
- Use `rg` to confirm route imports now point to `themes/fluid-astro`.
- Use `rg` to confirm no posts remain in `src/content/posts`.
- Optionally use Browser MCP for a smoke check on `/` and one post page if the dev server remains available.

## Rollback Strategy

Revert this WI commit to restore the prior `src/content/posts` and `src`-coupled theme structure.
