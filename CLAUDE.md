# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Governance — Read This First

This project enforces a governance system. Before any work, read `AGENTS.md` (imported below) and `project/work/work_index.md`.

All changes to execution-plane files (`src/**`, `public/**`, `scripts/**`, configs) must follow the six-stage pipeline with evidence recorded in `project/work/WI-XXXX/`:

```text
/spec → /plan → /build → /test → /review → /ship
```

When asked about roles or workflow, answer with the project governance definitions — not Claude Code's built-in agent types.

@AGENTS.md

## Build & Dev Commands

```bash
npm run dev       # Dev server at localhost:4321
npm run build     # Production build (primary verification)
npm run preview   # Preview production build
```

No separate lint or test commands are configured. `npm run build` is the gate check.

## Architecture

Astro 6 static blog with TypeScript, MDX, Tailwind CSS v4, and KaTeX math rendering. All content in Chinese.

### Content Collections

Posts live in `src/content/posts/` as MD/MDX files. Schema defined in `src/content.config.ts`:

- `title`, `date`, `abbrlink` (short URL slug) — required
- `categories` — supports single string, flat array, or nested arrays for hierarchy (e.g., `"音乐/乐理"`)
- `tags` — string array
- `math` — enables KaTeX rendering
- `toc` — show table of contents
- `sticky` — priority ordering for pinned posts
- `excerpt` — custom description override

### Layouts

- `BaseLayout.astro` — shell with header, footer, theme toggle
- `PostLayout.astro` — blog post with sidebar (toc, recent posts)
- `PageLayout.astro` — static pages (about, links, archives)

### Styling

- `src/assets/styles/global.css` — main styles with Tailwind v4 `@theme` directive
- `src/assets/styles/typography.css` — article prose styles
- CSS variables mirror the Fluid theme color system with light/dark overrides.
- Fonts: PingFang SC (body), JetBrains Mono / SFMono stack (code)

### Key Utilities

- `src/utils/categories.ts` — normalizes category formats (string/array/nested)
- `src/utils/date.ts` — date formatting
- `src/utils/excerpt.ts` — content excerpt generation
- Reading time calculated for Chinese text (~400 chars/min)

## Project Governance Roles

| Role | Responsibility |
|---|---|
| main-agent | Coordinator — splits work items, assigns roles, advances stages |
| product-role | User goals, scenarios, PRD, acceptance boundaries |
| spec-role | Freeze task contracts, acceptance criteria |
| architect-role | Architecture boundaries, tech path, drift rulings |
| implementation-role | Code delivery within contract bounds |
| qa-role | Independent verification and regression checks |
| uiux-role | Information structure, interaction paths, visual consistency |
| closure-role | Runtime evidence, final closure verification |

## Control vs Execution Plane

- **Execution plane** (product code): `src/**`, `public/**`, `scripts/**`, `astro.config.mjs`, `src/content.config.ts`, `tsconfig.json`, `package.json`
- **Control plane** (governance): `project/governance/**`, `project/work/**`, `.claude/agents/**`, `.claude/commands/**`, `AGENTS.md`

Changes to the control plane follow the same governance pipeline. Governance contracts in `project/governance/contracts/` are the authoritative source.
