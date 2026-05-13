# /test

- work_id: WI-0033
- stage: test
- status: passed
- owner: main-agent
- updated_at: 2026-05-13

## Checks

- `node -e "import('./themes/fluid-astro/integration.mjs').then((m)=>{ const r=[]; m.default({routes:{post:false}}).hooks['astro:config:setup']({config:{root:new URL('file://' + process.cwd() + '/')},updateConfig(){},injectRoute(x){r.push(x)}}); console.log(r.length, r.some(x=>x.pattern==='/posts/[abbrlink].html'), r[0].pattern); })"` — passed.
- `npm run build` — passed.
- `npm pack --dry-run --cache /private/tmp/npm-cache-fluid-astro` from `themes/fluid-astro` — passed.

## Evidence

- Integration route smoke test printed `8 false /`, confirming nine default routes minus disabled `post`, with home route first.
- Astro built 152 static pages successfully.
- Package dry-run included route modules and reported 38 total files.

## Failures

- None.

## Residual Risk

- Host projects still need compatible content collections and static assets. Existing host routes may collide with injected routes unless disabled.
