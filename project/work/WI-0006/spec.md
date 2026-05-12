# /spec

- work_id: WI-0006
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Goal

Perform a rigorous 1:1 visual parity review of the Astro Fluid restoration against the original Fluid site/theme, repair the current obvious regressions, and stop only after the compared pages no longer have material visual differences.

## Scope

1. Review WI-0004 against its own acceptance criteria and record whether it was effective.
2. Compare and repair these primary surfaces:
   - home page first viewport and post list
   - post detail banner/content/TOC/bottom area/footer
   - archives page
   - categories page
   - tags page
   - links page
   - about page
3. Fix the current post bottom mismatch shown by the owner: copyright block, prev/next navigation, footer content/spacing, and broken cloud-provider image.
4. Preserve the WI-0005 banner/board/TOC scroll fix unless direct evidence shows it conflicts with Fluid.
5. Use original Fluid theme source and live original pages as the visual source of truth.

## Non-goals

- Do not change authored article content except where template rendering is wrong.
- Do not introduce new design language beyond Fluid parity.
- Do not optimize performance, add features, or redesign search unless it blocks parity.

## Source Of Truth

- Human-owner screenshot and instructions in this task.
- Existing WI-0004 records and screenshots.
- Existing WI-0005 records and screenshots.
- Original Fluid/Halo site at `https://www.gaficat.com/`.
- Original Fluid sample post at `https://fluid.ist/posts/hexo-translate-llm/`.
- Fluid theme source repositories listed in `work-item.md`.

## Acceptance Criteria

1. WI-0004 review decision is explicit and evidence-backed.
2. For each scoped page, before/after screenshot evidence exists or a documented reason explains why a page cannot be compared.
3. `http://localhost:4321/posts/665dab17.html` bottom area matches Fluid structure: copyright note style, prev/next compact row, footer rows, and cloud-provider logo no longer broken.
4. Main visual discrepancies found during review are fixed, not merely documented.
5. `npm run build` passes.

## Risks

- Full pixel-perfect parity across all pages may expose many unrelated historical differences. Mitigation: work page-by-page and prioritize structural/visible mismatches first, recording any residual non-material diffs.
- Original live site and Fluid sample site may differ in content and theme version. Mitigation: use theme source for structural behavior and live site for this blog's brand/content.

## Open Questions

- none

## Exit Criteria

- scope is clear
- non-goals are clear
- acceptance criteria are testable
- no blocking open questions remain
