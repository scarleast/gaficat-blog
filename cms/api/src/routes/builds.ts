import { Hono } from 'hono';
import { AppType, SiteRow } from '../types';
import { authMiddleware } from '../middleware/auth';
import { getUserToken } from '../services/auth';
import * as github from '../services/github';

const builds = new Hono<AppType>();

builds.use('*', authMiddleware);

async function getVerifiedSite(c: { env: { DB: D1Database }; get: (key: 'userId') => number }, siteId: number) {
  const userId = c.get('userId');
  const site = await c.env.DB.prepare('SELECT * FROM sites WHERE id = ? AND user_id = ?').bind(siteId, userId).first<SiteRow>();
  if (!site) return null;
  return site;
}

// Trigger a build
builds.post('/trigger', async (c) => {
  const siteId = Number(c.req.param('siteId'));
  const site = await getVerifiedSite(c, siteId);
  if (!site) return c.json({ error: 'Not found' }, 404);

  const token = await getUserToken(c.env.DB, c.get('userId'));
  if (!token) return c.json({ error: 'No token' }, 401);

  try {
    await github.triggerDispatch(token, site.repo_full_name, 'cms-deploy');
    const result = await c.env.DB.prepare(
      'INSERT INTO builds (site_id, status) VALUES (?, ?)'
    ).bind(siteId, 'pending').run();

    return c.json({
      build: {
        id: result.meta.last_row_id,
        site_id: siteId,
        status: 'pending',
        created_at: new Date().toISOString(),
      },
    });
  } catch (e) {
    return c.json({ error: (e as Error).message }, 400);
  }
});

// List builds
builds.get('/', async (c) => {
  const siteId = Number(c.req.param('siteId'));
  const site = await getVerifiedSite(c, siteId);
  if (!site) return c.json({ error: 'Not found' }, 404);

  const token = await getUserToken(c.env.DB, c.get('userId'));
  if (!token) return c.json({ error: 'No token' }, 401);

  // Sync with GitHub Actions
  try {
    const runs = await github.listWorkflowRuns(token, site.repo_full_name);
    for (const run of runs.slice(0, 5)) {
      await c.env.DB.prepare(
        'UPDATE builds SET run_id = ?, status = ?, conclusion = ?, updated_at = datetime(\'now\') WHERE site_id = ? AND run_id = ?'
      ).bind(run.id, run.status, run.conclusion, siteId, run.id).run();
    }
  } catch {
    // Continue even if GitHub sync fails
  }

  const results = await c.env.DB.prepare(
    'SELECT * FROM builds WHERE site_id = ? ORDER BY created_at DESC LIMIT 20'
  ).bind(siteId).all();
  return c.json({ builds: results.results });
});

export default builds;
