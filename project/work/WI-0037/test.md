# /test

- work_id: WI-0037
- stage: test
- status: pending
- owner: main-agent
- updated_at: 2026-05-13

## Checks

- `npm run build` — passed.
- `test -f dist/rss.xml && test -f dist/atom.xml && test -f dist/sitemap-0.xml && test -f dist/sitemap-legacy.xml && test -f dist/posts/e4dcbcaf.html` — passed.
- `rg -n 'https://www\.gaficat\.com/posts/e7dcef5f</link>|https://www\.gaficat\.com/posts/e7dcef5f</guid>' dist/rss.xml -S` — passed.
- `rg -n 'https://www\.gaficat\.com/posts/e7dcef5f\.html</link>|https://www\.gaficat\.com/posts/e7dcef5f\.html</guid>' dist/atom.xml -S` — passed.
- `rg -n 'posts/e4dcbcaf\.html|categories/%E9%9F%B3%E4%B9%90\.html|page/2\.html' dist/sitemap-legacy.xml -S` — passed.
- `rg -n '\.html</loc>' dist/sitemap-0.xml -S` — no matches, expected.
- `rg -n '\.html</link>|\.html</guid>' dist/rss.xml -S` — no matches, expected.
- `rg -n '<meta http-equiv="refresh" content="0; url=/posts/e4dcbcaf">|<link rel="canonical" href="https://www.gaficat.com/posts/e4dcbcaf">' dist/posts/e4dcbcaf.html -S` — passed.

## Evidence

- Modern feed: `dist/rss.xml` links to `https://www.gaficat.com/posts/e7dcef5f`.
- Legacy feed: `dist/atom.xml` links to `https://www.gaficat.com/posts/e7dcef5f.html`.
- Modern sitemap index points to `https://www.gaficat.com/sitemap-0.xml`.
- Modern sitemap `dist/sitemap-0.xml` has no `.html</loc>` matches.
- Legacy sitemap `dist/sitemap-legacy.xml` contains legacy page/post/category examples.
- Legacy page `dist/posts/e4dcbcaf.html` still redirects/canonicalizes to `/posts/e4dcbcaf`.

## Failures

- None.

## Residual Risk

- `/atom.xml` is still RSS XML content by serializer format, but serves the legacy feed URL track requested by the owner. A true Atom serializer can be a future enhancement if needed.
