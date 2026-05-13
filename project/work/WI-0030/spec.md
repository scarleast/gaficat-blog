# /spec

- work_id: WI-0030
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-13

## Goal

Make `themes/fluid-astro/_config.yml` the source of truth for configurable Fluid Astro site metadata currently hardcoded in Astro routes and theme components.

## Scope

1. Add missing configuration fields to `themes/fluid-astro/_config.yml` for author/profile/social/contact, SEO defaults, feed title, about/aboutme metadata, links metadata, and post copyright fallback values.
2. Extend `themes/fluid-astro/config.mjs` defaults and exported `fluidThemeConfig` shape for the new fields.
3. Replace hardcoded configurable values in Astro routes and Fluid Astro components with reads from `fluidThemeConfig`.
4. Preserve existing rendered behavior unless the value is intentionally moved into config with the same current value.

## Non-goals

- Do not redesign pages or change layout/CSS.
- Do not migrate authored Markdown content into `_config.yml`.
- Do not edit generated `dist/**`.
- Do not turn every literal UI label into config if it is structural UI copy rather than site/profile metadata.

## Source Of Truth

- `themes/fluid-astro/_config.yml`
- Existing rendered behavior before this WI for current default values.
- Project governance contract: `project/governance/contracts/15_skills_execution_contract_v0_1.md`

## Acceptance Criteria

1. `OpenGraph.astro`, post copyright fallback, RSS/Atom feed title, about/aboutme page metadata, about profile shell data, and links page profile/application metadata do not hardcode current site/person/contact values in Astro/TypeScript files.
2. Those values are available from `fluidThemeConfig`, backed by `themes/fluid-astro/_config.yml` and safe defaults in `config.mjs`.
3. Existing visible values remain equivalent to the current site unless edited through `_config.yml`.
4. `npm run build` passes.

## Risks

- Config shape drift could break pages if nested fields are missing. Mitigation: keep defensive defaults in `config.mjs`.
- Over-configuring structural copy may make templates noisy. Mitigation: centralize metadata and site-owned values, not generic UI labels.

## Open Questions

- none

## Exit Criteria

- scope is clear
- non-goals are clear
- acceptance criteria are testable
- no blocking open questions remain
