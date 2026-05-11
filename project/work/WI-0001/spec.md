# /spec

- work_id: WI-0001
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-11

## Goal

Introduce a repository-local engineering governance system for the existing Astro blog project.

## Scope

1. Install standard governance contracts, templates, and project-local skills.
2. Add Codex and Claude runtime entrypoints.
3. Add root agent guidance for project-specific boundaries and checks.
4. Record the governance adoption as the first work item.

## Non-goals

- Do not change Astro app behavior.
- Do not edit blog posts or site content.
- Do not add CI, tests, lint tools, or new dependencies.
- Do not initialize git unless requested separately.

## Source Of Truth

- `project-governance-init` skill.
- User confirmation on 2026-05-11.

## Acceptance Criteria

1. Governance contracts, templates, skills, and work index exist under `project/`.
2. Runtime entrypoints exist under `.codex/skills/` and `.claude/commands/`.
3. `AGENTS.md` explains the governance entry, execution plane, control plane, and checks.
4. No execution-plane files are changed.

## Risks

- The project is not a git repository, so verification cannot use `git diff`.
- Existing generated directories such as `dist/` and dependency directories such as `node_modules/` may need separate repository hygiene work.

## Open Questions

- none

## Exit Criteria

- scope is clear
- non-goals are clear
- acceptance criteria are testable
- no blocking open questions remain
