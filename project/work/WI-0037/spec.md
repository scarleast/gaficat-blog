# /spec

- work_id: WI-0037
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-13

## Goal

Provide two explicit feed/sitemap tracks:

1. Modern outputs that use extensionless canonical URLs and current standard endpoint names.
2. Legacy compatibility outputs that preserve old `.html` URLs for existing subscribers, crawlers, and external references.

## Scope

- Keep `/rss.xml` as the modern feed with extensionless post links.
- Make `/atom.xml` the legacy compatibility feed with old `.html` post links.
- Keep the modern sitemap output free of legacy `.html` URLs.
- Add a separate legacy sitemap endpoint that contains old `.html` URLs.
- Keep legacy `.html` compatibility pages generated for browser/user compatibility.

## Non-goals

- Do not revert canonical page URLs to `.html`.
- Do not remove legacy compatibility pages.
- Do not introduce server-side redirects.
- Do not change authored Markdown content.

## Acceptance Criteria

- `npm run build` passes.
- `dist/rss.xml` exists and contains extensionless post links.
- `dist/atom.xml` exists and contains `.html` post links for legacy compatibility.
- Modern sitemap `dist/sitemap-0.xml` contains canonical extensionless URLs and does not contain legacy `.html` post/category/tag/page URLs.
- A separate legacy sitemap file exists and contains legacy `.html` URLs.
- Legacy static pages such as `dist/posts/e4dcbcaf.html` still exist and canonicalize to extensionless URLs.

## Risks

- `/atom.xml` is named atom but may remain RSS-format compatibility unless a true Atom serializer is introduced later.
- Search engines should generally discover the modern sitemap by default; the legacy sitemap is retained for compatibility/manual submission.

## Exit Criteria

- Scope, non-goals, acceptance criteria, and known risks are explicit.

