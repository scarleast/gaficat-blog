# Agents

- work_id: WI-0025
- owner: main-agent
- updated_at: 2026-05-13

## Main Agent

- owns:
  - control plane
  - stage transitions
  - audio player implementation
  - verification

## Subagents

| agent | role | owned paths | allowed stage | notes |
| --- | --- | --- | --- | --- |
| none | — | — | — | main-agent only |

## Rules

- owner talks only to main-agent
- subagents do not update `state.md`
- subagents do not close the work item
- subagents do not edit paths outside their assigned ownership
