import { Hono } from 'hono';
import { AppType, SiteRow } from '../types';
import { authMiddleware } from '../middleware/auth';
import { getUserToken } from '../services/auth';
import * as github from '../services/github';

const posts = new Hono<AppType>();

posts.use('*', authMiddleware);

// Helper to get site + verify ownership
async function getVerifiedSite(c: { env: { DB: D1Database }; get: (key: 'userId') => number }, siteId: number) {
  const userId = c.get('userId');
  const site = await c.env.DB.prepare('SELECT * FROM sites WHERE id = ? AND user_id = ?').bind(siteId, userId).first<SiteRow>();
  if (!site) return null;
  return site;
}

// List posts
posts.get('/', async (c) => {
  const siteId = Number(c.req.param('siteId'));
  const site = await getVerifiedSite(c, siteId);
  if (!site) return c.json({ error: 'Not found' }, 404);

  const token = await getUserToken(c.env.DB, c.get('userId'));
  if (!token) return c.json({ error: 'No token' }, 401);

  try {
    const files = await github.listFiles(token, site.repo_full_name, site.content_dir, site.branch);
    const posts = files
      .filter((f) => f.name.endsWith('.md') || f.name.endsWith('.mdx'))
      .map((f) => ({ name: f.name, path: f.path, sha: f.sha, size: f.size, frontmatter: {}, content: '' }));
    return c.json({ posts });
  } catch (e) {
    return c.json({ posts: [], error: (e as Error).message });
  }
});

// Get post
posts.get('/:path{.+}', async (c) => {
  const siteId = Number(c.req.param('siteId'));
  const path = c.req.param('path');
  const site = await getVerifiedSite(c, siteId);
  if (!site) return c.json({ error: 'Not found' }, 404);

  const token = await getUserToken(c.env.DB, c.get('userId'));
  if (!token) return c.json({ error: 'No token' }, 401);

  try {
    const fullPath = `${site.content_dir}/${path}`;
    const file = await github.getFile(token, site.repo_full_name, fullPath, site.branch);
    return c.json({ post: { name: path.split('/').pop(), path, sha: file.sha, content: file.content } });
  } catch (e) {
    return c.json({ error: (e as Error).message }, 400);
  }
});

// Save post (create or update)
posts.put('/:path{.+}', async (c) => {
  const siteId = Number(c.req.param('siteId'));
  const path = c.req.param('path');
  const site = await getVerifiedSite(c, siteId);
  if (!site) return c.json({ error: 'Not found' }, 404);

  const token = await getUserToken(c.env.DB, c.get('userId'));
  if (!token) return c.json({ error: 'No token' }, 401);

  const body = await c.req.json<{ content: string; sha?: string }>();
  try {
    const fullPath = `${site.content_dir}/${path}`;
    console.log('[DEBUG] putFile:', site.repo_full_name, fullPath, 'branch:', site.branch, 'sha:', body.sha?.slice(0, 8));
    const result = await github.putFile(token, site.repo_full_name, fullPath, body.content, site.branch, body.sha);
    return c.json({ post: { name: path.split('/').pop(), path, sha: result.content.sha, content: body.content } });
  } catch (e) {
    return c.json({ error: (e as Error).message }, 400);
  }
});

// Delete post
posts.delete('/:path{.+}', async (c) => {
  const siteId = Number(c.req.param('siteId'));
  const path = c.req.param('path');
  const site = await getVerifiedSite(c, siteId);
  if (!site) return c.json({ error: 'Not found' }, 404);

  const token = await getUserToken(c.env.DB, c.get('userId'));
  if (!token) return c.json({ error: 'No token' }, 401);

  const body = await c.req.json<{ sha: string }>();
  try {
    const fullPath = `${site.content_dir}/${path}`;
    await github.deleteFile(token, site.repo_full_name, fullPath, site.branch, body.sha);
    return c.json({ success: true });
  } catch (e) {
    return c.json({ error: (e as Error).message }, 400);
  }
});

export default posts;
