# /test

- work_id: WI-0007
- stage: test
- status: completed
- tester: main-agent
- updated_at: 2026-05-12

## Commands

| command | result | notes |
| --- | --- | --- |
| `npm run build` | pass | Built 152 pages successfully after fixing the footer Upyun logo source. |

## Manual Checks

- Source scan confirms no remaining `upyun-logo-dark`, `upyun-logo-light`, or `/img/upyun_logo6.png` references in footer markup/CSS.
- Browser MCP on `http://127.0.0.1:4322/` confirmed light mode footer has exactly one `.upyun-logo`, source `/img/upyun_logo8.svg`, rendered `55.86x20`.
- Browser MCP after toggling dark mode confirmed dark mode footer also has exactly one `.upyun-logo`, source `/img/upyun_logo8.svg`, rendered `55.86x20`.

## Failures

- none

## Residual Risk

- The same blue SVG is now intentionally used in dark mode per owner request.
