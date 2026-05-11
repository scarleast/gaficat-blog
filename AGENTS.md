# Project Agent Guide

This repository uses the project governance system in `project/governance/`.

## Project Shape

- Astro static blog with TypeScript, MDX, Tailwind, and content collections.
- Package manager: `npm` with `package-lock.json`.
- Primary verification command: `npm run build`.

## Governance Entry

Before changing governance state or execution-plane files, follow:

1. `project/governance/contracts/15_skills_execution_contract_v0_1.md`
2. `project/governance/skills/project-governance-flow/SKILL.md`
3. `project/work/work_index.md`
4. `project/governance/engineering_workflow.md`
5. `project/governance/repository_layout.md`

New work follows:

```text
/spec -> /plan -> /build -> /test -> /review -> /ship
```

Use work item files under `project/work/WI-XXXX/` to record scope, plan, changed files, checks, review decisions, and closure.

## Execution Plane

Execution-plane paths are the product files:

- `src/**`
- `public/**`
- `scripts/**`
- `astro.config.mjs`
- `src/content.config.ts`
- `tsconfig.json`
- `package.json`
- `package-lock.json`

Generated or dependency paths are not primary edit targets:

- `dist/**`
- `node_modules/**`
- `.astro/**`

## Control Plane

Control-plane paths are governance and agent runtime files:

- `project/governance/**`
- `project/work/**`
- `.codex/skills/**`
- `.claude/commands/**`
- `AGENTS.md`

Canonical governance skills live in `project/governance/skills/**`; runtime copies in `.codex/skills/**` are entrypoints.

## Checks

Run `npm run build` before finishing execution-plane changes unless the task is documentation-only or blocked by an environment issue. Record skipped checks and the reason in the work item.
