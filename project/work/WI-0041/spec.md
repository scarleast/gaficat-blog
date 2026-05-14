# /spec

- work_id: WI-0041
- stage: spec
- status: closed
- owner: main-agent
- updated_at: 2026-05-14

## Goal

Set up a GitHub Actions workflow that builds the Astro static blog and deploys `dist/` to Cloudflare Pages via Wrangler CLI, triggered on every push to `main`.

## Scope

1. Add GitHub remote `origin` → `git@github.com:scarleast/gaficat-blog.git`
2. Create `.github/workflows/deploy.yml` — single production deployment job
3. Workflow: checkout → Node 22 → npm ci → npm run build → wrangler pages deploy
4. Auth via GitHub secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`

## Non-goals

- No preview deployments for PRs
- No wrangler.toml config file
- No custom domain configuration in workflow
- No caching optimizations beyond default actions/setup-node cache
- No staging environment

## Acceptance Criteria

1. Push to `main` triggers the workflow
2. Workflow checks out code, installs deps, builds, deploys to CF Pages
3. Deployed site accessible at `gaficat-blog.pages.dev` (or `www.gaficat.com` after custom domain config)
4. No secrets committed to repository
5. `npm run build` remains single source of truth for build step

## Exit Criteria

- scope clear, non-goals clear, acceptance criteria testable
