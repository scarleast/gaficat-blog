# /test

- work_id: WI-0018
- stage: test
- status: completed
- tester: main-agent
- updated_at: 2026-05-12

## Commands

| command | result | notes |
| --- | --- | --- |
| `npm run build` | passed | Astro built 152 static pages successfully. |

## Browser Checks

- Before fix, Browser MCP measured `/page/2.html`: computed `#board` margin-top `-32px`, board/banner intrusion `32px`.
- After fix, Browser MCP measured `/`: computed `#board` margin-top `0px`, board/banner intrusion `0px`.
- After fix, Browser MCP measured `/page/2.html`: computed `#board` margin-top `0px`, board/banner intrusion `0px`.
- Screenshot evidence: `home-board-reference.png`, `home-page2-board-after.png`.

## Failures

- None.

## Residual Risk

- This intentionally changes only paginated home listing pages. Other layouts still use the global Fluid board overlap where already implemented.
