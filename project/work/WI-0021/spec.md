# /spec

- work_id: WI-0021
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Goal

Keep the project behavior close to Hexo: contributors write Markdown in a conventional content directory, Astro compiles the static site, and the Fluid implementation becomes a reusable theme layer with Fluid-style configuration.

## Scope

- Move post Markdown/MDX source from `src/content/posts` to `source/_posts`.
- Update Astro content collection loader to read `source/_posts`.
- Move Fluid layouts/components/styles from `src` to `themes/fluid-astro`.
- Add `themes/fluid-astro/_config.yml` and a theme config loader.
- Update pages and theme files to consume theme config for core site/theme values.
- Update governance layout docs to include `source/**` and `themes/**` as execution-plane paths.

## Non-goals

- Do not publish the theme as an npm package in this WI.
- Do not implement full Hexo plugin compatibility.
- Do not migrate every Fluid config key to runtime behavior in one pass.
- Do not change existing public URLs.

## Facts

- Existing posts already use Hexo-style frontmatter fields such as `abbrlink`, `tags`, `categories`, `toc`, and `math`.
- Current Astro content loader reads `src/content/posts`.
- Current Fluid implementation is coupled to `src/layouts`, `src/components`, and `src/assets/styles`.
- Original Fluid theme uses `_config.yml` as its primary theme configuration model.

## Acceptance Criteria

1. `source/_posts` contains the Markdown/MDX post source.
2. `src/content.config.ts` loads posts from `source/_posts`.
3. `themes/fluid-astro` contains layouts, components, styles, `_config.yml`, and config loader.
4. Site route files import layouts/components from `themes/fluid-astro`.
5. Core values for site title, nav, banner image, footer, dark mode, and theme-color come from the theme config.
6. Generated routes for existing posts remain `/posts/<abbrlink>.html`.
7. `npm run build` passes.
