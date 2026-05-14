import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { AppType } from './types';
import auth from './routes/auth';
import repos from './routes/repos';
import sites from './routes/sites';
import posts from './routes/posts';
import media from './routes/media';
import builds from './routes/builds';

const app = new Hono<AppType>();

app.use('/api/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.get('/', (c) => c.json({ name: 'Gaficat CMS API', version: '0.1.0' }));

app.route('/api/auth', auth);
app.route('/api/repos', repos);
app.route('/api/sites', sites);
app.route('/api/sites/:siteId/posts', posts);
app.route('/api/sites/:siteId/media', media);
app.route('/api/sites/:siteId/builds', builds);

export default app;
