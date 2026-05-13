# /spec

- work_id: WI-0027
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-13

## Goal

Fix the common post-page image caption spacing bug exposed by `posts/4056508e.html`.

## Scope

1. Normalize legacy `<center><img ...><br><div>caption</div></center>` image/caption blocks in post content.
2. Preserve the Markdown `figure` and `div style="text-align:center"` behavior from WI-0026.
3. Keep images centered and responsive.
4. Keep image-to-caption spacing tight and caption-to-following-content spacing clear.
5. Record `posts/bb4e922e.html` external image failure as technical debt but do not repair those URLs here.

## Non-goals

- Do not migrate or download external images.
- Do not change article Markdown content.
- Do not redesign post page layout.
- Do not alter media players.

## Source Of Truth

- `source/_posts/tutorial/Nginx多个域名配置URL转发.md`
- `themes/fluid-astro/assets/styles/typography.css`
- Browser inspection of `posts/4056508e.html`

## Acceptance Criteria

1. On `posts/4056508e.html`, legacy `<center>` image blocks have centered images.
2. Captions in those blocks sit close to images.
3. Following paragraphs/content have visible spacing after captions.
4. WI-0026 target page `posts/bac5f5bf.html` still has corrected `div style="text-align:center"` spacing.
5. `posts/bb4e922e.html` external image failure is documented as technical debt and not treated as fixed.
6. `npm run build` passes.

## Risks

- Many historical posts use slightly different legacy HTML, so selectors must be scoped without overfitting to one page.

## Open Questions

- none

## Exit Criteria

- scope is clear
- non-goals are clear
- acceptance criteria are testable
- no blocking open questions remain
