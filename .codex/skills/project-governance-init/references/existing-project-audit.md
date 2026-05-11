# Existing Project Audit

Use this procedure before applying governance to an existing project.

## Discover

Read only. Prefer fast file discovery commands.

Look for:

- root guidance: `AGENTS.md`, `CLAUDE.md`, `.cursor/`, `.github/copilot-instructions.md`
- package files: `pyproject.toml`, `package.json`, `go.mod`, `Cargo.toml`
- lockfiles and workspace files
- CI: `.github/workflows/**`, GitLab CI, Makefiles
- docs: `docs/**`, `README.md`, ADR folders
- app directories: `apps/**`, `packages/**`, `src/**`, `services/**`, `deploy/**`
- tests and quality tools
- existing issue/task/project records

## Recommend

Produce a recommendation before editing:

- project type
- detected stack
- existing process to preserve
- recommended governance mode
- proposed control-plane path
- proposed execution-plane boundaries
- required checks
- runtime entrypoints to generate
- files to create
- files to modify
- risks and conflicts

## Confirm

Ask for explicit confirmation before applying.

Do not proceed on ambiguous approval when changes would modify existing root guidance, CI, release files, or task records.

## Apply

When confirmed:

- create new governance files
- append or patch root guidance conservatively
- preserve existing task and ADR systems
- avoid business code changes
- avoid CI changes unless explicitly approved

## Verify

After applying:

- list generated files
- verify runtime entrypoints point to canonical skills
- run only safe checks that do not require new dependencies unless approved
- show git diff summary
- record any manual follow-up
