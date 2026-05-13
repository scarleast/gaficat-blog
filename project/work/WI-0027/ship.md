# /ship

- work_id: WI-0027
- stage: ship
- status: completed
- owner: main-agent
- updated_at: 2026-05-13
- final_decision: shipped

## Summary

Shipped the common post image/caption spacing fix for legacy `<center>` image wrappers. The `4056508e` post now has centered images, tighter image-to-caption spacing, and clear spacing after captions, while the prior `div style="text-align:center"` fix remains intact.

## Evidence

- spec: spec.md
- plan: plan.md
- build: build.md
- test: test.md
- review: review.md
- browser screenshot: `evidence/4056508e-caption-after.png`
- command: `npm run build` passed

## Delivery

- branch: main
- commit: local commit created during `/ship`
- deploy: not deployed
- push: not pushed; no git remote is configured in this repository

## Follow-ups

- Technical debt: `posts/bb4e922e.html` uses external `cdn.sspai.com` image URLs that fail to load in the current environment. Owner requested this be listed but not handled in this WI.

## Closure Checklist

- [x] state.md updated
- [x] work_index.md updated
- [x] facts/baselines updated
- [x] follow-ups recorded as separate work items
