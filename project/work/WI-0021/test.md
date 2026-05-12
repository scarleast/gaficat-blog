# /test

- work_id: WI-0021
- stage: test
- status: completed
- tester: main-agent
- updated_at: 2026-05-12

## Commands

| command | result | notes |
| --- | --- | --- |
| `npm run build` | passed | Astro built 152 static pages from `source/_posts`. |
| `find source/_posts -type f \( -name '*.md' -o -name '*.mdx' \) | wc -l` | passed | 88 Markdown/MDX content files under Hexo-style source directory. |
| `find src/content -maxdepth 3 -type f -print` | passed | No post files remain under `src/content`. |
| `rg -n "themes/fluid-astro" src/pages source/_posts themes/fluid-astro/README.md` | passed | Route files and MDX component imports point at the theme boundary. |

## Browser Checks

- Restarted local dev server on `http://127.0.0.1:4322/` after content directory migration.
- Browser MCP smoke checked `/`: title and brand came from theme config, banner image rendered from config, index post links rendered.
- Browser MCP smoke checked `/posts/b0812c46.html`: post page rendered, `#board` existed, banner image rendered from config, and post navigation icons remained present.

## Failures

- Initial build failed because MDX files still imported media components using old `src/content/posts` relative paths; fixed by pointing them at `themes/fluid-astro/components/media`.
- Initial build failed because the theme config loader used `import.meta.url` after Vite bundling; fixed by resolving `_config.yml` from `process.cwd()`.

## Residual Risk

- This WI establishes a reusable theme boundary but does not yet publish `themes/fluid-astro` as an npm package.
- Only the core Fluid config values are wired into runtime behavior in this pass; additional upstream Fluid config keys can be mapped in follow-up WIs.
