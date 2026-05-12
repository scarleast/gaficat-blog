# Agents

- work_id: WI-0005
- owner: main-agent
- updated_at: 2026-05-12

## Main Agent

- owns:
  - control plane
  - stage transitions
  - owner-facing summaries
  - final decisions
  - `src/layouts/PostLayout.astro`
  - `src/assets/styles/global.css`

## Subagents

| agent | role | owned paths | allowed stage | notes |
| --- | --- | --- | --- | --- |
| none | n/a | n/a | n/a | no subagents assigned |

## Rules

- owner talks only to main-agent
- subagents do not update `state.md`
- subagents do not close the work item
- subagents do not edit paths outside their assigned ownership
