# Agents

- work_id: WI-0003
- owner: main-agent
- updated_at: 2026-05-11

## Main Agent

- owns:
  - control plane
  - stage transitions
  - owner-facing summaries
  - final decisions

## Subagents

| agent | role | owned paths | allowed stage | notes |
| --- | --- | --- | --- | --- |
| none | none | none | none | Main-agent handled this small governance sync directly. |

## Rules

- owner talks only to main-agent
- subagents do not update `state.md`
- subagents do not close the work item
- subagents do not edit paths outside their assigned ownership
