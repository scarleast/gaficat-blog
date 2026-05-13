# /test

- work_id: WI-0035
- stage: test
- status: passed
- owner: main-agent
- updated_at: 2026-05-13

## Checks

- `npm run build` passed.
- `test -f dist/posts/e4dcbcaf/index.html && test ! -f dist/posts/e4dcbcaf.html && test -f dist/rss.xml && test ! -f dist/atom.xml` passed.
- `rg -n "https://www\\.gaficat\\.com/(posts|page|categories|tags|archives|links|about|aboutme)[^\\s\\\"<>]*\\.html|href=\\\"/(posts|page|categories|tags|archives|links|about|aboutme)[^\\\"]*\\.html|/atom\\.xml" dist -S` returned no matches.
- `rg -n "https://www\\.gaficat\\.com/(posts|page|categories|tags|archives|links|about|aboutme)[^\\s\\)\\]\\\"']*\\.html|https://www\\.gaficat\\.com/atom\\.xml|/atom\\.xml" source src themes public astro.config.mjs -S` returned no matches.

## Evidence

- Build output shows post pages generated under `dist/posts/<abbrlink>/index.html`.
- `dist/rss.xml`, `dist/sitemap-index.xml`, and `dist/sitemap-0.xml` exist.
- `dist/rss.xml`, `dist/sitemap-0.xml`, and `dist/search-index.json` all use `/posts/<abbrlink>` without `.html`.
- `dist/index.html` contains RSS autodiscovery for `/rss.xml`.
- `dist/robots.txt` still points to `https://www.gaficat.com/sitemap-index.xml`.

## Failures

- Initial RSS output appended trailing slashes while sitemap used no trailing slash. Fixed by setting `trailingSlash: false` in the RSS route.

## Residual Risk

- Hard migration intentionally breaks old `.html` inbound URLs unless hosting adds redirects outside this WI.
