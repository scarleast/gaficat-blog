import { Hono } from 'hono';
import { AppType, SiteRow } from '../types';
import { authMiddleware } from '../middleware/auth';

const sites = new Hono<AppType>();

sites.use('*', authMiddleware);

// List sites
sites.get('/', async (c) => {
  const userId = c.get('userId');
  const results = await c.env.DB.prepare('SELECT * FROM sites WHERE user_id = ? ORDER BY created_at DESC').bind(userId).all<SiteRow>();
  return c.json({ sites: results.results });
});

// Create site
sites.post('/', async (c) => {
  const userId = c.get('userId');
  const body = await c.req.json();
  const result = await c.env.DB.prepare(
    `INSERT INTO sites (user_id, name, repo_full_name, branch, content_dir, media_dir, framework, build_command, output_dir)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    userId, body.name, body.repo_full_name, body.branch || 'main',
    body.content_dir || 'src/content/posts', body.media_dir || 'src/assets/media',
    body.framework || 'astro', body.build_command || 'npm run build', body.output_dir || 'dist'
  ).run();

  const site = await c.env.DB.prepare('SELECT * FROM sites WHERE id = ?').bind(result.meta.last_row_id).first<SiteRow>();
  return c.json({ site });
});

// Get site
sites.get('/:id', async (c) => {
  const userId = c.get('userId');
  const id = Number(c.req.param('id'));
  const site = await c.env.DB.prepare('SELECT * FROM sites WHERE id = ? AND user_id = ?').bind(id, userId).first<SiteRow>();
  if (!site) return c.json({ error: 'Not found' }, 404);
  return c.json({ site });
});

// Update site
sites.put('/:id', async (c) => {
  const userId = c.get('userId');
  const id = Number(c.req.param('id'));
  const body = await c.req.json();

  await c.env.DB.prepare(
    `UPDATE sites SET name = ?, repo_full_name = ?, branch = ?, content_dir = ?, media_dir = ?,
     framework = ?, build_command = ?, output_dir = ?, updated_at = datetime('now')
     WHERE id = ? AND user_id = ?`
  ).bind(
    body.name, body.repo_full_name, body.branch, body.content_dir, body.media_dir,
    body.framework, body.build_command, body.output_dir, id, userId
  ).run();

  const site = await c.env.DB.prepare('SELECT * FROM sites WHERE id = ?').bind(id).first<SiteRow>();
  return c.json({ site });
});

// Delete site
sites.delete('/:id', async (c) => {
  const userId = c.get('userId');
  const id = Number(c.req.param('id'));
  await c.env.DB.prepare('DELETE FROM sites WHERE id = ? AND user_id = ?').bind(id, userId).run();
  return c.json({ success: true });
});

export default sites;
