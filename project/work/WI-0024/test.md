# /test

- work_id: WI-0024
- stage: test
- status: completed
- tester: main-agent
- updated_at: 2026-05-13

## Commands

| command | result | notes |
| --- | --- | --- |
| `npm run build` | pass | Astro built 152 pages. |
| `git diff --check` | pass | No whitespace errors. |

## Browser Checks

- Browser MCP on `http://127.0.0.1:4322/posts/c1d9e34b.html` scrolled to bottom and confirmed `.bilibili-iframe` exists with `src="//player.bilibili.com/player.html?bvid=BV1pz4y1o74P&page=1&high_quality=1&danmaku=0&autoplay=0"`.
- Browser MCP on `http://127.0.0.1:4322/posts/11640910.html` confirmed native `<video>` has no `autoplay` attribute, `video.autoplay === false`, and `video.paused === true`.

## Failures

- none

## Residual Risk

- Bilibili iframe playback is ultimately controlled by Bilibili, but the embed now passes the expected `autoplay=0` parameter by default.

## Exit Criteria

- required commands passed or failures are justified
- required manual/browser checks are recorded
- evidence is linked
