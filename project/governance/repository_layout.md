# Repository Layout

This document defines repository-local boundaries for governance.

## Project Type

Astro static blog and content site with Hexo-style authored content and a reusable Fluid Astro theme boundary.

## Top-Level Layout

- `src/**`: Astro route, content collection, and utility code.
- `source/**`: Hexo-style authored content source.
- `themes/**`: reusable theme packages and theme-owned layouts, components, assets, and config.
- `public/**`: static files copied to the final site.
- `scripts/**`: repository maintenance and migration scripts.
- `project/**`: governance contracts, workflow records, and WI evidence.
- `.codex/**` and `.claude/**`: local agent runtime entrypoints and settings.

## Execution Plane

Files that change the shipped site, content, assets, scripts, or build behavior:

- `src/pages/**`: routes and page templates.
- `themes/**`: reusable theme layouts, components, styles, and theme configuration.
- `source/**`: Hexo-style authored content source, including `source/_posts/**`.
- `src/utils/**`: site utilities.
- `src/content.config.ts`: Astro content collection configuration.
- `public/**`: static files copied to the final site.
- `scripts/**`: project maintenance and migration scripts.
- `astro.config.mjs`: Astro integration and build config.
- `tsconfig.json`: TypeScript config.
- `package.json` and `package-lock.json`: dependencies and scripts.

Reserved execution-plane directories may be introduced later if needed:

- `src/components/**`: non-theme reusable Astro components.
- `src/layouts/**`: non-theme layouts.
- `src/assets/**`: non-theme source styles and local assets.
- `src/content/**`: non-Hexo content collections. Blog posts belong in `source/_posts/**`.

## Control Plane

Files that define process, governance, and agent runtime behavior:

- `project/governance/**`
- `project/work/**`
- `.codex/skills/**`
- `.claude/commands/**`
- `AGENTS.md`

## Generated And Local State

These paths are generated, dependency, or tool state. Do not use them as source-of-truth inputs unless a task explicitly targets generated output:

- `dist/**`
- `node_modules/**`
- `.astro/**`
- `tmp/**`
- `.DS_Store`
- root-level visual/debug captures such as `*.png` and `*-snapshot.txt`

## Git State

This directory is a git repository. Verification should use `git status`, `git diff`, required checks, and work item records.

## Artifact Placement

- UI parity and debugging screenshots should live under the relevant `project/work/WI-XXXX/evidence/**` directory.
- Historical root-level captures that predate this cleanup may be moved into the relevant WI record rather than left at repository root.
- Generated build output belongs in `dist/**` and must not be edited directly.
