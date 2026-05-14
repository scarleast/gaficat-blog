import { Hono } from 'hono';
import { AppType, SiteRow } from '../types';
import { authMiddleware } from '../middleware/auth';
import { getUserToken } from '../services/auth';
import * as github from '../services/github';

const media = new Hono<AppType>();

media.use('*', authMiddleware);

async function getVerifiedSite(c: { env: { DB: D1Database }; get: (key: 'userId') => number }, siteId: number) {
  const userId = c.get('userId');
  const site = await c.env.DB.prepare('SELECT * FROM sites WHERE id = ? AND user_id = ?').bind(siteId, userId).first<SiteRow>();
  if (!site) return null;
  return site;
}

// List media files
media.get('/', async (c) => {
  const siteId = Number(c.req.param('siteId'));
  const site = await getVerifiedSite(c, siteId);
  if (!site) return c.json({ error: 'Not found' }, 404);

  const token = await getUserToken(c.env.DB, c.get('userId'));
  if (!token) return c.json({ error: 'No token' }, 401);

  try {
    const files = await github.listFiles(token, site.repo_full_name, site.media_dir, site.branch);
    const mediaFiles = files
      .filter((f) => /\.(jpg|jpeg|png|gif|webp|svg|mp4|webm|mp3|pdf|zip)$/i.test(f.name))
      .map((f) => ({
        name: f.name,
        path: f.path,
        sha: f.sha,
        size: f.size,
        url: f.download_url,
      }));
    return c.json({ files: mediaFiles });
  } catch (e) {
    return c.json({ files: [], error: (e as Error).message });
  }
});

// Upload media file
media.post('/upload', async (c) => {
  const siteId = Number(c.req.param('siteId'));
  const site = await getVerifiedSite(c, siteId);
  if (!site) return c.json({ error: 'Not found' }, 404);

  const token = await getUserToken(c.env.DB, c.get('userId'));
  if (!token) return c.json({ error: 'No token' }, 401);

  const body = await c.req.json<{ filename: string; content: string }>();
  if (!body.filename || !body.content) {
    return c.json({ error: 'Missing filename or content' }, 400);
  }

  try {
    const path = `${site.media_dir}/${body.filename}`;
    const result = await github.putFile(token, site.repo_full_name, path, body.content, site.branch);
    return c.json({
      file: {
        name: body.filename,
        path,
        sha: result.content.sha,
      },
    });
  } catch (e) {
    return c.json({ error: (e as Error).message }, 400);
  }
});

// Delete media file
media.delete('/:path{.+}', async (c) => {
  const siteId = Number(c.req.param('siteId'));
  const path = c.req.param('path');
  const site = await getVerifiedSite(c, siteId);
  if (!site) return c.json({ error: 'Not found' }, 404);

  const token = await getUserToken(c.env.DB, c.get('userId'));
  if (!token) return c.json({ error: 'No token' }, 401);

  const body = await c.req.json<{ sha: string }>();
  try {
    await github.deleteFile(token, site.repo_full_name, path, site.branch, body.sha);
    return c.json({ success: true });
  } catch (e) {
    return c.json({ error: (e as Error).message }, 400);
  }
});

export default media;
