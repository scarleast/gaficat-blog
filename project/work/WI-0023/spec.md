# /spec

- work_id: WI-0023
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-13

## Goal

Restore the Fluid navbar dark/light theme toggle behavior.

## Scope

1. Fix the client-side script error that prevents header JavaScript from running.
2. Verify clicking the navbar color toggle changes `html[data-color-scheme]`, `html` classes, and localStorage.
3. Verify there is no console syntax error from the header script.

## Non-goals

- Do not redesign the navbar.
- Do not change Fluid color values.
- Do not change unrelated search, scroll, or mobile menu behavior unless required by the same header script fix.

## Source Of Truth

- Browser MCP reproduction on `http://127.0.0.1:4322/`
- `themes/fluid-astro/components/common/Header.astro`

## Acceptance Criteria

1. Clicking `#color-toggle-btn` changes from dark to light and back to dark without page reload.
2. `localStorage.Fluid_Color_Scheme` and `localStorage.theme` are updated to the selected scheme.
3. Browser console no longer reports `Uncaught SyntaxError: Unexpected token ':'` from the header script.
4. `npm run build` passes.

## Risks

- Risk: fixing the syntax error can re-enable other header handlers; verify search/mobile initialization remains syntactically valid.

## Open Questions

- none

## Exit Criteria

- scope is clear
- non-goals are clear
- acceptance criteria are testable
- no blocking open questions remain
