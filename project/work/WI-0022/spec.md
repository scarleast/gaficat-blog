# /spec

- work_id: WI-0022
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-13

## Goal

Clean up the repository structure according to the project governance model so the tree clearly separates execution-plane source, control-plane governance, local scratch data, and evidence artifacts.

## Scope

1. Audit the current top-level and key subtree layout.
2. Move root-level visual/debug artifacts into WI evidence history instead of leaving them in the project root.
3. Remove ignored platform/local files such as `.DS_Store` and stale scratch clone state from the working directory.
4. Preserve authored content under `source/**`, theme code under `themes/**`, route/build code under `src/**`, static shipped assets under `public/**`, and governance state under `project/**`.
5. Update governance layout documentation to reflect the current git-backed repository and accepted directory boundaries.
6. Add repository hygiene ignores for recurring local artifact patterns that should not become source of truth.

## Non-goals

- Do not change visual behavior or page rendering.
- Do not migrate authored post content again.
- Do not delete governance history or WI evidence.
- Do not repackage the theme as an npm package in this WI.

## Source Of Truth

- `AGENTS.md`
- `project/governance/contracts/15_skills_execution_contract_v0_1.md`
- `project/governance/engineering_workflow.md`
- `project/governance/repository_layout.md`
- Current git tracked files and ignored files

## Acceptance Criteria

1. `git status --short` clearly shows only intentional cleanup changes.
2. Top-level tracked screenshot/snapshot artifacts are no longer in the repository root.
3. Ignored local files and scratch clone state are removed from the working tree.
4. Governance docs describe `source/**`, `themes/**`, `src/**`, `public/**`, `scripts/**`, `project/**`, runtime entries, generated output, and scratch/local paths accurately.
5. `npm run build` passes.
6. WI-0022 records changed files, checks, review decision, and ship state.

## Risks

- Risk: moving artifacts could break references in old WI records. Mitigation: keep moved root artifacts under WI-0022 and document the relocation.
- Risk: deleting `tmp/**` could remove user-provided scratch inputs. Mitigation: only remove ignored scratch tree after verifying relevant files were already consumed or tracked elsewhere.

## Open Questions

- none

## Exit Criteria

- scope is clear
- non-goals are clear
- acceptance criteria are testable
- no blocking open questions remain
