# Agents

- work_id: WI-0029
- updated_at: 2026-05-13

## Main Agent

- role: orchestration, implementation, validation, review, ship
- allowed stages: `/spec`, `/plan`, `/build`, `/test`, `/review`, `/ship`
- owned paths:
  - `project/work/WI-0029/**`
  - `project/work/work_index.md`
  - `src/content.config.ts`
  - `src/pages/about/index.astro`
  - `src/pages/aboutme/index.astro`
  - `themes/fluid-astro/components/page/AboutContent.astro`
  - `source/_pages/aboutme.md`
- expected evidence:
  - build result
  - browser checks for `/about` and `/aboutme`

## Subagents

- none
