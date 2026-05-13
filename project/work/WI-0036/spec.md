# /spec

- work_id: WI-0036
- stage: spec
- status: accepted
- owner: main-agent
- updated_at: 2026-05-13

## Goal

Provide compatibility for old feed and `.html` page addresses after the canonical URL migration.

## Scope

1. Restore `/atom.xml` as a legacy feed endpoint that serves the same RSS content as `/rss.xml`.
2. Generate legacy static `.html` compatibility pages for old page/post/category/tag/pagination URLs.
3. Ensure legacy pages point search engines/users to the new canonical URL.
4. Include legacy `.html` URLs in sitemap compatibility output while keeping canonical URLs present.
5. Keep rendered site navigation, RSS primary links, search index, and Open Graph canonical URLs on the new extensionless format.

## Non-goals

- Do not revert canonical URLs to `.html`.
- Do not change old authored external links unrelated to this compatibility layer.
- Do not edit generated `dist/**` directly.
- Do not introduce server-only redirects; this is a static build.

## Acceptance Criteria

1. `npm run build` passes.
2. Both `dist/rss.xml` and `dist/atom.xml` exist.
3. Legacy URLs such as `dist/posts/e4dcbcaf.html`, `dist/archives.html`, `dist/categories/音乐.html`, `dist/tags/音乐.html`, and `dist/page/2.html` exist.
4. Legacy compatibility pages contain a canonical link to the extensionless URL.
5. `dist/sitemap-0.xml` includes both canonical `/posts/e4dcbcaf` and legacy `/posts/e4dcbcaf.html`.
6. Primary rendered navigation and RSS item links remain extensionless.

## Risks

- Sitemap now intentionally contains duplicate legacy/canonical URLs. This is accepted for compatibility.
- Static compatibility pages are not HTTP 301 redirects. They use canonical/meta refresh/client redirect semantics.

## Open Questions

- None.

## Exit Criteria

- scope is clear
- non-goals are clear
- acceptance criteria are testable
- no blocking open questions remain
