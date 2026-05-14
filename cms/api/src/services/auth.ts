import { Env, UserRow } from '../types';

async function createToken(userId: number, secret: string): Promise<string> {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    sub: userId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 3600,
  }));

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(`${header}.${payload}`)
  );

  const sig = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  return `${header}.${payload}.${sig}`;
}

export async function githubOAuth(code: string, env: Env): Promise<{ token: string; user: UserRow }> {
  // Exchange code for access token
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'User-Agent': 'gaficat-cms' },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });
  const tokenText = await tokenRes.text();
  console.log('[DEBUG] GitHub token response status:', tokenRes.status, 'body:', tokenText.slice(0, 300));
  let tokenData: { access_token?: string; error?: string; error_description?: string };
  try {
    tokenData = JSON.parse(tokenText);
  } catch {
    throw new Error(`GitHub token exchange returned non-JSON (${tokenRes.status}): ${tokenText.slice(0, 200)}`);
  }
  if (!tokenData.access_token) throw new Error(`GitHub OAuth failed: ${tokenData.error || 'no access_token'} — ${tokenData.error_description || tokenText.slice(0, 200)}`);

  // Get user info
  const userRes = await fetch('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${tokenData.access_token}`, 'User-Agent': 'gaficat-cms' },
  });
  const userText = await userRes.text();
  console.log('[DEBUG] GitHub user response status:', userRes.status, 'body:', userText.slice(0, 300));
  let ghUser: { id: number; login: string; avatar_url: string };
  try {
    ghUser = JSON.parse(userText);
  } catch {
    throw new Error(`GitHub user API returned non-JSON (${userRes.status}): ${userText.slice(0, 200)}`);
  }
  if (!ghUser.id) throw new Error(`GitHub user API error: ${userText.slice(0, 200)}`);

  // Upsert user
  const existing = await env.DB.prepare('SELECT * FROM users WHERE github_id = ?')
    .bind(ghUser.id)
    .first<UserRow>();

  let user: UserRow;
  if (existing) {
    await env.DB.prepare('UPDATE users SET username = ?, avatar_url = ?, access_token = ?, updated_at = datetime(\'now\') WHERE github_id = ?')
      .bind(ghUser.login, ghUser.avatar_url, tokenData.access_token, ghUser.id)
      .run();
    user = { ...existing, username: ghUser.login, avatar_url: ghUser.avatar_url, access_token: tokenData.access_token };
  } else {
    const result = await env.DB.prepare(
      'INSERT INTO users (github_id, username, avatar_url, access_token) VALUES (?, ?, ?, ?)'
    ).bind(ghUser.id, ghUser.login, ghUser.avatar_url, tokenData.access_token).run();
    user = {
      id: result.meta.last_row_id as number,
      github_id: ghUser.id,
      username: ghUser.login,
      avatar_url: ghUser.avatar_url,
      access_token: tokenData.access_token,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }

  const token = await createToken(user.id, env.JWT_SECRET);
  return { token, user };
}

export async function getUserToken(db: D1Database, userId: number): Promise<string | null> {
  const user = await db.prepare('SELECT access_token FROM users WHERE id = ?').bind(userId).first<{ access_token: string }>();
  return user?.access_token || null;
}
