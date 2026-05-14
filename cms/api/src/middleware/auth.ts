import { Context, Next } from 'hono';
import { AppType } from '../types';

export async function authMiddleware(c: Context<AppType>, next: Next) {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const token = authHeader.substring(7);
  try {
    const parts = token.split('.');
    if (parts.length !== 3) throw new Error('Invalid token');

    // Simple JWT-like verification using Web Crypto
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(c.env.JWT_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const headerPayload = token.substring(0, token.lastIndexOf('.'));
    const signature = Uint8Array.from(atob(parts[2]), (c) => c.charCodeAt(0));

    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      signature,
      encoder.encode(headerPayload)
    );

    if (!valid) throw new Error('Invalid signature');

    const payload = JSON.parse(atob(parts[1]));
    if (payload.exp && payload.exp < Date.now() / 1000) {
      return c.json({ error: 'Token expired' }, 401);
    }

    const user = await c.env.DB.prepare('SELECT id, github_id, username, avatar_url FROM users WHERE id = ?')
      .bind(payload.sub)
      .first<{ id: number; github_id: number; username: string; avatar_url: string | null }>();

    if (!user) return c.json({ error: 'User not found' }, 401);

    c.set('userId', user.id as number);
    c.set('user', user as { id: number; github_id: number; username: string; avatar_url: string | null });
    await next();
  } catch {
    return c.json({ error: 'Invalid token' }, 401);
  }
}
