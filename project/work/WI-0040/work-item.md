# WI-0040: Post Media Asset Integrity Check

- work_id: WI-0040
- title: Post Media Asset Integrity Check
- type: fix
- stage: spec
- owner: main-agent
- requester: human-owner
- created_at: 2026-05-13
- updated_at: 2026-05-13
- source_refs:
  - WI-0039 (content gap analysis revealed media gaps)
- current_state_ref: state.md
- artifacts:
  - spec.md
  - plan.md

## Problem

After recovering missing articles in WI-0039, the post media assets (images, audio, video) may have broken references. Posts migrated from Hexo and Halo may reference files that don't exist in the current repo. A systematic audit is needed.

## Desired Outcome

All media references in all post markdown files are verified against actual files in the repo. Missing assets are identified and reported.

## Current Stage

`/spec`
