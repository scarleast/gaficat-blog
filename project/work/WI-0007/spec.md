# /spec

- work_id: WI-0007
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Goal

Fix the footer Upyun icon so both light and dark modes use the same `upyun_logo8.svg` asset.

## Scope

- `src/components/common/Footer.astro`
- `src/assets/styles/global.css`
- `project/work/WI-0007/**`
- `project/work/work_index.md`

## Non-goals

- Do not change footer text, ICP rows, or other layout.
- Do not introduce a new logo asset.

## Source Of Truth

- Owner instruction: "页脚 upyun的 icon 浅色深色都固定为 upyun_logo8.svg"

## Acceptance Criteria

1. Footer markup references `/img/upyun_logo8.svg` for Upyun.
2. Theme-specific Upyun logo switching is removed.
3. `npm run build` passes.

## Risks

- The single SVG may have lower contrast in one theme. This is accepted by owner instruction.

## Open Questions

- none
