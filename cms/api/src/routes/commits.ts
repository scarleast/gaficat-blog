import { Hono } from 'hono';
import { AppType, SiteRow } from '../types';
import { authMiddleware } from '../middleware/auth';
import { getUserToken } from '../services/auth';
import * as github from '../services/github';

const commits = new Hono<AppType>();

commits.use('*', authMiddleware);

async function getVerifiedSite(c: { env: { DB: D1Database }; get: (key: 'userId') => number }, siteId: number) {
  const userId = c.get('userId');
  const site = await c.env.DB.prepare('SELECT * FROM sites WHERE id = ? AND user_id = ?').bind(siteId, userId).first<SiteRow>();
  return site;
}

// Get commit history for heatmap
commits.get('/', async (c) => {
  const siteId = Number(c.req.param('siteId'));
  const site = await getVerifiedSite(c, siteId);
  if (!site) return c.json({ error: 'Not found' }, 404);

  const token = await getUserToken(c.env.DB, c.get('userId'));
  if (!token) return c.json({ error: 'No token' }, 401);

  try {
    const since = new Date();
    since.setMonth(since.getMonth() - 6);
    const sinceStr = since.toISOString();

    const res = await fetch(
      `https://api.github.com/repos/${site.repo_full_name}/commits?since=${sinceStr}&per_page=100`,
      { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json', 'User-Agent': 'gaficat-cms' } }
    );
    if (!res.ok) return c.json({ commits: [] });

    const data = (await res.json()) as Array<{ commit: { author: { date: string } } }>;
    const counts: Record<string, number> = {};
    for (const item of data) {
      const date = item.commit.author.date.slice(0, 10);
      counts[date] = (counts[date] || 0) + 1;
    }

    return c.json({ commits: counts });
  } catch {
    return c.json({ commits: {} });
  }
});

export default commits;
