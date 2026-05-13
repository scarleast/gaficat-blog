# /ship

- work_id: WI-0026
- stage: ship
- status: completed
- owner: main-agent
- updated_at: 2026-05-13
- final_decision: shipped

## Summary

Shipped article image/caption rhythm fixes. Post typography now centers standalone image blocks more reliably, tightens image-to-caption spacing, and restores clear separation between captions and following paragraphs, including legacy inline HTML image wrappers.

## Evidence

- spec: spec.md
- plan: plan.md
- build: build.md
- test: test.md
- review: review.md
- browser screenshot: `evidence/post-image-caption-after.png`
- command: `npm run build` passed

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
