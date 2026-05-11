# /spec

- work_id: WI-0002
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-11

## Goal

Add a minimal repository hygiene baseline for generated files, local tool state, dependencies, and future git-based review.

## Scope

1. Create a root `.gitignore` for this Astro/npm project.
2. Initialize a local git repository if none exists.
3. Verify ignored paths are not staged by default.
4. Record evidence in the work item.

## Non-goals

- Do not add CI.
- Do not add new dependencies.
- Do not change application code or content.
- Do not create a remote repository or push to any remote.
- Do not delete existing generated directories.

## Source Of Truth

- `project/governance/repository_layout.md`
- `project/governance/engineering_workflow.md`
- User follow-up: "继续"

## Acceptance Criteria

1. `.gitignore` exists and ignores `node_modules/`, `dist/`, `.astro/`, and common local environment files.
2. The project has a local `.git/` repository.
3. `git status --short --ignored` shows generated/dependency paths ignored rather than tracked.
4. `npm run build` still passes.

## Risks

- Initializing git changes local repository state but not source files.
- Existing generated files remain on disk; they are only ignored for version control.

## Open Questions

- none

## Exit Criteria

- scope is clear
- non-goals are clear
- acceptance criteria are testable
- no blocking open questions remain
