import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import { fluidThemeConfig } from '../../themes/fluid-astro/config.mjs';

function markdownFiles(dir) {
  if (!existsSync(dir)) return [];

  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return markdownFiles(path);
    if (entry.isFile() && /\.(md|mdx)$/.test(entry.name)) return [path];
    return [];
  });
}

function frontmatter(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  return yaml.load(match[1]) || {};
}

function normalizeCategories(cat) {
  if (typeof cat === 'string') return [cat];
  if (Array.isArray(cat) && cat.length > 0) {
    if (Array.isArray(cat[0])) return cat.map((chain) => chain.join('/'));
    return cat;
  }
  return [];
}

export function getLegacySitemapUrls(site) {
  const base = site.endsWith('/') ? site.slice(0, -1) : site;
  return getLegacyRedirects().map(({ legacyPath }) => `${base}${encodeURI(legacyPath)}`);
}

export function getLegacyRedirects() {
  const files = markdownFiles(join(process.cwd(), 'source'));
  const posts = files.map(frontmatter).filter((data) => data.abbrlink);
  const categories = new Set();
  const tags = new Set();

  posts.forEach((post) => {
    normalizeCategories(post.categories).forEach((category) => categories.add(category));
    (post.tags || []).forEach((tag) => tags.add(tag));
  });

  const totalPages = Math.ceil(posts.length / fluidThemeConfig.index.per_page);
  const redirects = [
    { legacyPath: '/archives.html', canonicalPath: '/archives' },
    { legacyPath: '/categories.html', canonicalPath: '/categories' },
    { legacyPath: '/tags.html', canonicalPath: '/tags' },
    { legacyPath: '/links.html', canonicalPath: '/links' },
    { legacyPath: '/about.html', canonicalPath: '/about' },
    { legacyPath: '/aboutme.html', canonicalPath: '/aboutme' },
    ...Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => {
      const page = index + 2;
      return { legacyPath: `/page/${page}.html`, canonicalPath: `/page/${page}` };
    }),
    ...posts.map((post) => ({
      legacyPath: `/posts/${post.abbrlink}.html`,
      canonicalPath: `/posts/${post.abbrlink}`,
    })),
    ...[...categories].map((category) => ({
      legacyPath: `/categories/${category}.html`,
      canonicalPath: `/categories/${category}`,
    })),
    ...[...tags].map((tag) => ({
      legacyPath: `/tags/${tag}.html`,
      canonicalPath: `/tags/${tag}`,
    })),
  ];

  return redirects;
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function legacyRedirectHtml(site, canonicalPath) {
  const siteBase = site.endsWith('/') ? site.slice(0, -1) : site;
  const canonicalUrl = `${siteBase}${encodeURI(canonicalPath)}`;
  const escapedCanonicalPath = escapeHtml(canonicalPath);

  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="robots" content="noindex,follow">
    <meta http-equiv="refresh" content="0; url=${escapedCanonicalPath}">
    <link rel="canonical" href="${canonicalUrl}">
    <title>Redirecting...</title>
  </head>
  <body>
    <p><a href="${escapedCanonicalPath}">Redirecting...</a></p>
  </body>
</html>
`;
}

export function writeLegacyRedirects(outDir, site) {
  const redirects = getLegacyRedirects();

  redirects.forEach(({ legacyPath, canonicalPath }) => {
    const filePath = join(fileURLToPath(outDir), decodeURI(legacyPath.slice(1)));
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, legacyRedirectHtml(site, canonicalPath));
  });

  return redirects.length;
}
