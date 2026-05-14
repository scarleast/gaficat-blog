# Build Evidence — WI-0038

## Scope

Build a full Git-based CMS hosting platform MVP with React frontend (i18n zh-CN + en) and Hono/CF Workers API.

## Files Created

### Frontend (`cms/frontend/`)
- `package.json` — React 18, Vite 6, react-i18next, react-router-dom, Tailwind CSS v3
- `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`, `postcss.config.js`
- `index.html`, `src/main.tsx`, `src/index.css`
- `src/i18n/index.ts` — i18next with LanguageDetector + localStorage
- `src/i18n/locales/zh-CN.json` — ~90 Chinese translation keys
- `src/i18n/locales/en.json` — ~90 English translation keys
- `src/types/index.ts` — User, Site, Post, MediaFile, Build interfaces
- `src/lib/api.ts` — ApiClient with token management, auto 401 redirect
- `src/lib/utils.ts` — cn(), formatDate(), frontmatter helpers
- `src/hooks/useAuth.tsx` — AuthProvider context
- `src/App.tsx` — Route definitions
- `src/components/Layout.tsx` — Responsive header with i18n switcher, mobile menu
- `src/pages/LoginPage.tsx` — GitHub OAuth
- `src/pages/DashboardPage.tsx` — Site overview cards
- `src/pages/SitesPage.tsx` — Site CRUD
- `src/pages/SiteSettingsPage.tsx` — Site config editor
- `src/pages/PostsPage.tsx` — Post list with search
- `src/pages/PostEditPage.tsx` — Frontmatter + markdown editor, Ctrl+S
- `src/pages/MediaPage.tsx` — Upload, preview, copy URL, delete
- `src/pages/BuildsPage.tsx` — Trigger builds, status badges
- `src/pages/SettingsPage.tsx` — Language switcher

### API (`cms/api/`)
- `package.json` — Hono, @cloudflare/workers-types
- `tsconfig.json`, `wrangler.toml`
- `src/types/index.ts` — Env, AppType, UserRow, SiteRow, BuildRow
- `src/middleware/auth.ts` — JWT HMAC-SHA256 via Web Crypto
- `src/services/auth.ts` — GitHub OAuth flow, JWT creation, user upsert
- `src/services/github.ts` — Full GitHub Contents API wrapper
- `src/routes/auth.ts` — OAuth redirect/callback/me
- `src/routes/sites.ts` — CRUD with ownership verification
- `src/routes/posts.ts` — GitHub API proxy for .md/.mdx files
- `src/routes/media.ts` — Upload/list/delete media files
- `src/routes/builds.ts` — Trigger + list builds
- `src/index.ts` — Hono app mounting all routes

### Schema
- `cms/schema.sql` — D1 tables: users, sites, builds

## Build Verification

- Frontend: `tsc --noEmit` pass, `vite build` pass (257 kB gzipped 80 kB)
- API: `tsc --noEmit` pass, `wrangler deploy --dry-run` pass
- Main blog: `astro build` pass (159 pages, 1.22s)

## Acceptance Criteria Status

| # | Criterion | Status |
|---|-----------|--------|
| 1 | GitHub OAuth login | Done (auth.ts) |
| 2 | Site CRUD | Done (sites.ts) |
| 3 | Post list from GitHub | Done (posts.ts) |
| 4 | Post read/write | Done (posts.ts) |
| 5 | Frontmatter editor | Done (PostEditPage.tsx) |
| 6 | Media upload | Done (media.ts, MediaPage.tsx) |
| 7 | Build trigger | Done (builds.ts) |
| 8 | i18n zh-CN + en | Done (react-i18next, full translations) |
| 9 | Responsive UI | Done (Layout.tsx, Tailwind responsive) |
| 10 | D1 schema | Done (schema.sql) |
| 11 | Runtime language switching | Done (SettingsPage.tsx, Layout.tsx) |
