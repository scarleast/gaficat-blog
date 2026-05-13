# /ship

- work_id: WI-0022
- stage: ship
- status: completed
- owner: main-agent
- updated_at: 2026-05-13
- final_decision: shipped

## Summary

- Shipped a governance-aligned repository layout cleanup.
- Root visual/debug artifacts now live under `project/work/WI-0022/root-artifacts/**`.
- Governance docs now match the current Astro + Hexo-style source + Fluid theme boundary.
- Local scratch and generated files are ignored and no longer treated as source of truth.

## Evidence

- spec: spec.md
- plan: plan.md
- build: build.md
- test: test.md
- review: review.md

## Delivery

- branch: main
- commit: included in this ship commit
- deploy: not deployed
- push: failed; no configured push destination / no git remote is configured

## Follow-ups

- none

## Closure Checklist

- [x] state.md updated
- [x] work_index.md updated
- [x] facts/baselines updated
- [x] follow-ups recorded as separate work items
