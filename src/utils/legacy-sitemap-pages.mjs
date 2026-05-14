import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

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

function getLegacyPaths() {
  const files = markdownFiles(join(process.cwd(), 'source'));
  const posts = files.map(frontmatter).filter((data) => data.abbrlink);
  const categories = new Set();
  const tags = new Set();

  posts.forEach((post) => {
    normalizeCategories(post.categories).forEach((category) => categories.add(category));
    (post.tags || []).forEach((tag) => tags.add(tag));
  });

  return [
    '/archives.html',
    '/categories.html',
    '/tags.html',
    '/links.html',
    '/about.html',
    '/aboutme.html',
    ...posts.map((post) => `/posts/${post.abbrlink}.html`),
    ...[...categories].map((category) => `/categories/${category}.html`),
    ...[...tags].map((tag) => `/tags/${tag}.html`),
  ];
}

export function writeLegacySitemap(outDir, site) {
  const base = site.endsWith('/') ? site.slice(0, -1) : site;
  const paths = getLegacyPaths();
  const urls = paths.map((legacyPath) => `${base}${encodeURI(legacyPath)}`);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>
`;
  const filePath = join(fileURLToPath(outDir), 'sitemap-legacy.xml');
  writeFileSync(filePath, xml);
  return urls.length;
}
