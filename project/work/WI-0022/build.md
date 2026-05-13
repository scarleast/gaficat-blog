# /build

- work_id: WI-0022
- stage: build
- status: completed
- owner: main-agent
- branch: main
- updated_at: 2026-05-13

## Changes

- `.gitignore`: added root-level visual/debug capture ignore rules.
- `AGENTS.md`: documented that `tmp/**` and root-level capture files are local state, not source of truth.
- `project/governance/repository_layout.md`: updated the top-level layout, execution-plane boundaries, generated/local state, git state, and artifact placement rules.
- `project/governance/engineering_workflow.md`: updated content rules from old `src/content/posts/**` to `source/_posts/**`, documented theme ownership, and routed screenshots to WI evidence.
- `article-snapshot.txt`, `article.png`, `footer.png`, `hero-section.png`, `homepage-snapshot.txt`, `homepage-viewport.png`, `homepage.png`, `post-cards.png`: moved from repository root to `project/work/WI-0022/root-artifacts/**`.
- ignored local files: removed `.DS_Store` files and stale `tmp/**` scratch content from the working tree.
- empty directories: removed local empty `src/assets` and `src/content` directories; they are now documented as reserved future directories rather than present source directories.
- `project/work/WI-0022/**` and `project/work/work_index.md`: created and advanced the cleanup work item.

## Implementation Notes

- Current WI id before execution-plane changes: WI-0022.
- The cleanup preserves all shipped source boundaries: routes and utilities stay in `src/**`, authored posts stay in `source/_posts/**`, theme code stays in `themes/fluid-astro/**`, and static shipped assets stay in `public/**`.
- Root visual captures were preserved as WI history rather than deleted.
- Historical references inside older WI records were not rewritten because they describe facts from those WIs at the time.

## Deviations From Plan

- none

## Blockers

- none

## Exit Criteria

- planned implementation is complete
- changed files are listed
- deviations are explained
- blockers are resolved or explicitly recorded
