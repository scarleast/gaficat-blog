# /plan

- work_id: WI-0041
- stage: build
- status: in_progress
- owner: main-agent
- updated_at: 2026-05-14

## Strategy

Single new execution-plane file + one git remote operation. Minimal footprint.

## Changes

### Execution Plane

| Action | File |
|--------|------|
| Create | `.github/workflows/deploy.yml` |
| Git op | `git remote add origin git@github.com:scarleast/gaficat-blog.git` |

### Control Plane

| Action | File |
|--------|------|
| Create | `project/work/WI-0041/*` (governance artifacts) |
| Update | `project/work/work_index.md` |

## Workflow Design

- Trigger: push to main only
- Steps: checkout → setup Node 22 LTS → npm ci → npm run build → wrangler pages deploy dist
- Auth: CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID from GitHub secrets
- Project name: `gaficat-blog` (auto-created on first deploy)
- No wrangler.toml needed

## Rollback

Delete `.github/workflows/deploy.yml`, remove remote. No other files affected.
