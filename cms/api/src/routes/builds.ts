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

// List builds — fetch directly from GitHub Actions
builds.get('/', async (c) => {
  const siteId = Number(c.req.param('siteId'));
  const site = await getVerifiedSite(c, siteId);
  if (!site) return c.json({ error: 'Not found' }, 404);

  const token = await getUserToken(c.env.DB, c.get('userId'));
  if (!token) return c.json({ error: 'No token' }, 401);

  try {
    const runs = await github.listWorkflowRuns(token, site.repo_full_name);
    // Map GitHub status/conclusion to a simpler build status
    const builds = runs.map((run) => ({
      id: run.id,
      run_id: run.id,
      name: run.name,
      branch: run.head_branch,
      status: run.conclusion === 'success' ? 'success'
        : run.conclusion === 'failure' ? 'failure'
        : run.conclusion === 'cancelled' ? 'cancelled'
        : run.status === 'in_progress' ? 'in_progress'
        : run.status === 'queued' ? 'pending'
        : run.status === 'waiting' ? 'pending'
        : run.status || 'unknown',
      triggered_at: run.created_at,
      completed_at: run.updated_at,
      html_url: run.html_url,
    }));
    return c.json({ builds });
  } catch (e) {
    return c.json({ builds: [], error: (e as Error).message });
  }
});

export default builds;
