import { Hono } from 'hono';
import { AppType } from '../types';
import { githubOAuth } from '../services/auth';
import { authMiddleware } from '../middleware/auth';

const auth = new Hono<AppType>();

// GitHub OAuth redirect
auth.get('/github', (c) => {
  const params = new URLSearchParams({
    client_id: c.env.GITHUB_CLIENT_ID,
    redirect_uri: `${new URL(c.req.url).origin}/api/auth/github/callback`,
    scope: 'repo,read:org',
  });
  return c.redirect(`https://github.com/login/oauth/authorize?${params}`);
});

// GitHub OAuth callback
auth.get('/github/callback', async (c) => {
  const code = c.req.query('code');
  if (!code) return c.json({ error: 'Missing code' }, 400);

  try {
    const { token, user } = await githubOAuth(code, c.env);
    // Redirect to frontend with token
    return c.redirect(`/?token=${token}`);
  } catch (e) {
    return c.json({ error: (e as Error).message }, 400);
  }
});

// Get current user
auth.get('/me', authMiddleware, async (c) => {
  const user = c.get('user');
  return c.json({ user });
});

export default auth;
