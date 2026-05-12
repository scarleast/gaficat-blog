# Repository Layout

This document defines repository-local boundaries for governance.

## Project Type

Astro static blog and content site.

## Execution Plane

Files that change the shipped site, content, assets, scripts, or build behavior:

- `src/pages/**`: routes and page templates.
- `themes/**`: reusable theme layouts, components, styles, and theme configuration.
- `source/**`: Hexo-style authored content source, including `source/_posts/**`.
- `src/components/**`: reusable Astro components that are not owned by a theme.
- `src/layouts/**`: page and post layouts that are not owned by a theme.
- `src/assets/**`: source styles and local assets that are not owned by a theme.
- `src/utils/**`: site utilities.
- `src/content/**`: blog posts and content collections.
- `public/**`: static files copied to the final site.
- `scripts/**`: project maintenance and migration scripts.
- `astro.config.mjs`: Astro integration and build config.
- `src/content.config.ts`: content schema/config.
- `tsconfig.json`: TypeScript config.
- `package.json` and `package-lock.json`: dependencies and scripts.

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

## External State

This directory is currently not a git repository. Until git is initialized or the project is moved under version control, verification relies on file listings, command output, and work item records rather than `git diff`.
