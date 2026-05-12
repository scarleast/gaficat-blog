# /test

- work_id: WI-0005
- stage: test
- status: passed
- tester: main-agent
- updated_at: 2026-05-12

## Commands

| command | result | notes |
| --- | --- | --- |
| `npm run build` | pass | Built 151 pages successfully. Shiki warned that language `ejs` falls back to plaintext; this is pre-existing content highlighting behavior and did not fail the build. |

## Manual Checks

- Browser MCP checked `http://localhost:4321/posts/665dab17.html` at viewport `2048x1152`.
- Geometry at scroll `0`: board top `475`, header bottom `507`, overlap `-32px`, banner translate `0`, TOC opacity `1`.
- Geometry at scroll `260`: board top `215`, header bottom `247`, overlap `-32px`, banner translate `52px`, side column padding `52px`, TOC opacity `1`.
- Geometry at scroll `700`: board top `-225`, header bottom `-193`, overlap `-32px`, banner translate capped at `64px`, side column padding `64px`, TOC opacity `1`.
- This matches the Fluid mechanism: visible banner area moves down during early scroll, then caps; side columns are offset in parallel so TOC does not invade the banner.

## Screenshots / Evidence

- `project/work/WI-0005/evidence/post-top.png`
- `project/work/WI-0005/evidence/post-early-scroll.png`
- `project/work/WI-0005/evidence/post-stabilized-scroll.png`

## Failures

- Initial DevTools page connection closed while taking screenshots; reopened the local dev server/page and completed the stabilized-scroll screenshot.

## Residual Risk

- The original reference screenshots are from `fluid.ist` with a different banner image and article content, so final parity is behavior-based rather than pixel-identical content matching.

## Exit Criteria

- required commands passed or failures are justified
- required manual/browser checks are recorded
- evidence is linked
