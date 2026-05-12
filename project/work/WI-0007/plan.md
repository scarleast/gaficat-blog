# /plan

- work_id: WI-0007
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-12

## Implementation Strategy

Replace the dual light/dark Upyun image markup with one image using `/img/upyun_logo8.svg`. Remove CSS rules that hide/show theme-specific logo classes while preserving shared sizing and spacing.

## Affected Areas

- `src/components/common/Footer.astro`
- `src/assets/styles/global.css`
- `project/work/WI-0007/**`
- `project/work/work_index.md`

## Test Strategy

- Run `npm run build`.
- Verify markup/CSS no longer contains `upyun-logo-dark` / `upyun-logo-light` switching.

## Rollback Strategy

Restore the previous two-image footer markup and theme display CSS if owner wants theme-specific assets again.
