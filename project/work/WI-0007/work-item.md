# WI-0007: Fix Upyun Footer Logo Source

## Summary

Use `upyun_logo8.svg` as the footer Upyun logo in both light and dark modes.

## Background

The owner requested that the footer Upyun icon no longer switch between different assets by theme. Both light and dark modes should render the same SVG asset.

## Scope

- Footer Upyun image markup.
- Footer Upyun logo CSS display rules.
- Governance records and verification.

## Acceptance Criteria

1. Footer renders `/img/upyun_logo8.svg` in both light and dark modes.
2. No unused theme-specific Upyun logo switching remains in footer markup/CSS.
3. `npm run build` passes.
