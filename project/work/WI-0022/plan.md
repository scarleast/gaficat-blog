# /plan

- work_id: WI-0022
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-13

## Implementation Strategy

Perform a structural cleanup without altering runtime behavior. Move root-level captured screenshots/snapshots into `project/work/WI-0022/root-artifacts/`, remove ignored local files and stale scratch directories, update `.gitignore` to prevent recurrence, and refresh governance layout/workflow documentation to match the current Astro + Hexo-style source + theme boundary.

## Affected Areas

- control plane:
  - `project/work/WI-0022/**`
  - `project/work/work_index.md`
  - `project/governance/repository_layout.md`
  - `project/governance/engineering_workflow.md`
- execution plane:
  - `.gitignore`
  - root-level artifact files moved into WI evidence

## Work Slices

| slice | owner | owned paths | output |
| --- | --- | --- | --- |
| governance setup | main-agent | `project/work/WI-0022/**`, `project/work/work_index.md` | WI records and active index |
| layout cleanup | main-agent | root artifacts, ignored scratch/local files, `.gitignore` | cleaner repository tree |
| docs alignment | main-agent | `project/governance/repository_layout.md`, `project/governance/engineering_workflow.md` | accurate layout contract |
| verification | main-agent | command/browser-free checks | build and layout evidence |

## Dependencies

- none

## Test Strategy

- `find . -maxdepth 2 ...` to inspect top-level structure after cleanup.
- `git status --short --ignored` to verify intentional tracked changes and ignored generated/local paths.
- `rg` checks to ensure moved root artifacts are only referenced as historical notes where acceptable.
- `npm run build` to verify no runtime behavior was broken.

## Rollback Strategy

Revert this WI commit, or move files from `project/work/WI-0022/root-artifacts/` back to the root if the artifact relocation is rejected.

## Exit Criteria

- implementation path is clear
- owned paths are assigned
- verification plan is clear
- no uncontrolled shared-file conflicts remain
