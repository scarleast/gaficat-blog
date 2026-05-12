# Fluid Astro Theme

This directory contains the reusable Astro implementation of the Fluid visual
theme used by this site.

- `_config.yml` keeps a Hexo Fluid-style configuration shape.
- `config.mjs` loads `_config.yml` for Astro layouts and components.
- `layouts/`, `components/`, and `assets/styles/` are the theme surface.

The site keeps route generation in `src/pages/**` and Markdown authoring in
`source/_posts/**`; Astro compiles both into the static output.
