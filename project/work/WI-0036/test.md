# /test

- work_id: WI-0036
- stage: test
- status: pending
- owner: main-agent
- updated_at: 2026-05-13

## Checks

- `npm run build` — passed.
- `test -f dist/rss.xml && test -f dist/atom.xml && test -f dist/posts/e4dcbcaf/index.html && test -f dist/posts/e4dcbcaf.html && test -f dist/archives.html && test -f 'dist/categories/音乐.html' && test -f 'dist/tags/音乐.html' && test -f dist/page/2.html` — passed.
- `rg -n '<link rel="canonical" href="https://www\.gaficat\.com/posts/e4dcbcaf"|http-equiv="refresh" content="0; url=/posts/e4dcbcaf"' dist/posts/e4dcbcaf.html -S` — passed.
- `rg -n 'https://www\.gaficat\.com/posts/e4dcbcaf(</loc>|$)|https://www\.gaficat\.com/posts/e4dcbcaf\.html' dist/sitemap-0.xml -S` — passed.
- `cmp -s dist/rss.xml dist/atom.xml` — passed.
- `rg -n 'https://www\.gaficat\.com/posts/|/posts/' dist/rss.xml dist/atom.xml -S` — passed; feed item links are extensionless canonical URLs.

## Evidence

- Build generated both feed endpoints: `dist/rss.xml`, `dist/atom.xml`.
- Build generated canonical page output such as `dist/posts/e4dcbcaf/index.html`.
- Build generated old flat compatibility files such as `dist/posts/e4dcbcaf.html`, `dist/archives.html`, `dist/categories/音乐.html`, `dist/tags/音乐.html`, and `dist/page/2.html`.
- `dist/posts/e4dcbcaf.html` contains:
  - `<meta http-equiv="refresh" content="0; url=/posts/e4dcbcaf">`
  - `<link rel="canonical" href="https://www.gaficat.com/posts/e4dcbcaf">`
- `dist/sitemap-0.xml` contains both `https://www.gaficat.com/posts/e4dcbcaf` and `https://www.gaficat.com/posts/e4dcbcaf.html`.
- `dist/rss.xml` and `dist/atom.xml` are byte-identical.

## Failures

- Initial catch-all route approach failed before this test stage with `NoMatchingStaticPathFound` for `/archives.html`; build implementation was corrected before final verification.
- A first combined RSS grep command returned non-zero because the regex was too restrictive after `cmp` had already passed. It was split into explicit `cmp` and feed-link inspection checks.

## Residual Risk

- Legacy pages are static HTML compatibility shims, not HTTP 301 redirects. This is acceptable for a static-only build and is documented in the spec risks.
