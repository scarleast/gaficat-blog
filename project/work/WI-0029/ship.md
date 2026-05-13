# /ship

- work_id: WI-0029
- stage: ship
- status: completed
- owner: main-agent
- updated_at: 2026-05-13
- final_decision: shipped

## Summary

Shipped Markdown-backed about pages. `/about` now renders the existing `关于本站` Markdown post body, `/aboutme` renders a dedicated `source/_pages/aboutme.md`, and the shared visual shell remains encapsulated in `AboutContent.astro`.

## Evidence

- spec: spec.md
- plan: plan.md
- build: build.md
- test: test.md
- review: review.md
- command: `npm run build` passed
- browser checks: `/about.html`, `/aboutme.html`

## Delivery

- branch: main
- commit: local commit created during `/ship`
- deploy: not deployed
- push: not pushed; no git remote is configured in this repository

## Follow-ups

- none

## Closure Checklist

- [x] state.md updated
- [x] work_index.md updated
- [x] facts/baselines updated
- [x] follow-ups recorded as separate work items
