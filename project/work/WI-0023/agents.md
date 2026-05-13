# Agents

- work_id: WI-0023
- owner: main-agent
- updated_at: 2026-05-13

## Main Agent

- owns:
  - control plane
  - stage transitions
  - header script fix
  - verification
  - owner-facing summaries

## Subagents

| agent | role | owned paths | allowed stage | notes |
| --- | --- | --- | --- | --- |
| none | — | — | — | main-agent only |

## Rules

- owner talks only to main-agent
- subagents do not update `state.md`
- subagents do not close the work item
- subagents do not edit paths outside their assigned ownership
