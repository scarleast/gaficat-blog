# WI-0021: Introduce Hexo-Style Content And Fluid Astro Theme Boundary

## Summary

Restore a Hexo-like authoring model while keeping Astro as the static compiler, and separate the current Fluid visual implementation into a reusable Astro theme boundary.

## Acceptance Criteria

1. Markdown posts are authored from a Hexo-style `source/_posts` directory.
2. Astro content collections compile posts from that authoring directory.
3. Current Fluid layout/components/styles live under `themes/fluid-astro`.
4. Site pages reuse the theme boundary instead of local `src/layouts` and `src/components` theme files.
5. A Fluid-style `_config.yml` exists under the theme and is used by core layout/header/footer/banner code.
6. `npm run build` passes.
