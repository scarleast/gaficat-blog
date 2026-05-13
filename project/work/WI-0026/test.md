# /test

- work_id: WI-0026
- stage: test
- status: completed
- tester: main-agent
- updated_at: 2026-05-13

## Commands

| command | result | notes |
| --- | --- | --- |
| `npm run build` | passed | Built 152 static pages, including `/posts/bac5f5bf.html`. |

## Browser Checks

- Browser MCP loaded `http://127.0.0.1:4323/posts/bac5f5bf.html`.
- Before fix, target legacy image block measured image-to-caption gap at `25.59px`, caption-to-next-paragraph gap at `0px`, and the image was visually left-anchored by inline `zoom`.
- After fix, target image centered with `imageCenteredDeltaPx: 0`.
- After fix, target image-to-caption gap measured `7.2px`.
- After fix, target caption-to-next-paragraph gap measured `32px`.
- After fix, target wrapper computed margin is `24px 0 32px`.
- Captured screenshot evidence: `evidence/post-image-caption-after.png`.

## Failures

- none

## Residual Risk

- CSS uses `:has()` for legacy inline image wrapper detection. Current target browsers support it; very old browsers would fall back to existing inline `text-align:center` behavior.

## Exit Criteria

- required commands passed or failures are justified
- required manual/browser checks are recorded
- evidence is linked
