import { Hono } from 'hono';
import { AppType } from '../types';
import { authMiddleware } from '../middleware/auth';
import { getUserToken } from '../services/auth';

const repos = new Hono<AppType>();

repos.use('*', authMiddleware);

// List user's GitHub repos
repos.get('/', async (c) => {
  const userId = c.get('userId');
  const token = await getUserToken(c.env.DB, userId);
  if (!token) return c.json({ error: 'No GitHub token' }, 400);

  const res = await fetch('https://api.github.com/user/repos?sort=updated&per_page=100&type=all', {
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Agent': 'gaficat-cms',
    },
  });

  if (!res.ok) {
    const text = await res.text();
    return c.json({ error: `GitHub API error: ${text.slice(0, 200)}` }, 502);
  }

  const data = await res.json<Array<{
    full_name: string;
    name: string;
    private: boolean;
    default_branch: string;
    description: string | null;
    html_url: string;
  }>>();

  return c.json({
    repos: data.map((r) => ({
      full_name: r.full_name,
      name: r.name,
      private: r.private,
      default_branch: r.default_branch,
      description: r.description,
      html_url: r.html_url,
    })),
  });
});

export default repos;
