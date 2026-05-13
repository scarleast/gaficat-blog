# /test

- work_id: WI-0027
- stage: test
- status: completed
- tester: main-agent
- updated_at: 2026-05-13

## Commands

| command | result | notes |
| --- | --- | --- |
| `npm run build` | passed | Built 152 static pages, including `/posts/4056508e.html`, `/posts/bac5f5bf.html`, and `/posts/bb4e922e.html`. |

## Browser Checks

- Browser MCP loaded `http://127.0.0.1:4325/posts/4056508e.html`.
- Before fix, first legacy `<center>` image block measured image-to-caption gap at `25.59px`, caption-to-next-content gap at `0px`, and wrapper margins at `0px`.
- After fix, first legacy `<center>` image block measured image-centered delta at `0px`.
- After fix, image-to-caption gap measured `9.81px`.
- After fix, caption-to-next-content gap measured `34.18px`.
- After fix, wrapper computed margin is `24px 0 32px`.
- After fix, old caption underline border is removed.
- Screenshot evidence: `evidence/4056508e-caption-after.png`.
- Regression checked `http://127.0.0.1:4325/posts/bac5f5bf.html`: centered delta `0px`, image-to-caption gap `7.2px`, caption-to-next-content gap `32px`.

## Technical Debt

- `posts/bb4e922e.html` uses external `cdn.sspai.com` image URLs that fail to load in the current environment. Owner requested this be listed as technical debt and not handled in this WI.

## Failures

- none

## Residual Risk

- CSS uses `:has()` for legacy wrapper detection. Current target browsers support it; very old browsers will retain the previous inline centered layout.

## Exit Criteria

- required commands passed or failures are justified
- required manual/browser checks are recorded
- evidence is linked
