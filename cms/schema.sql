-- CMS D1 Schema
-- Cloudflare D1 (SQLite) init script

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  github_id INTEGER NOT NULL UNIQUE,
  username TEXT NOT NULL,
  avatar_url TEXT,
  access_token TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  name TEXT NOT NULL,
  repo_full_name TEXT NOT NULL,
  branch TEXT NOT NULL DEFAULT 'main',
  content_dir TEXT NOT NULL DEFAULT 'src/content/posts',
  media_dir TEXT NOT NULL DEFAULT 'src/assets/media',
  framework TEXT NOT NULL DEFAULT 'astro',
  build_command TEXT NOT NULL DEFAULT 'npm run build',
  output_dir TEXT NOT NULL DEFAULT 'dist',
  frontmatter_schema TEXT NOT NULL DEFAULT '[]',
  locale TEXT NOT NULL DEFAULT 'zh-CN',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS builds (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  site_id INTEGER NOT NULL REFERENCES sites(id),
  run_id INTEGER,
  status TEXT NOT NULL DEFAULT 'pending',
  triggered_at TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_sites_user_id ON sites(user_id);
CREATE INDEX IF NOT EXISTS idx_builds_site_id ON builds(site_id);
