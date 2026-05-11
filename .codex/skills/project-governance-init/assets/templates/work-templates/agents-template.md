# Agents

- work_id: WI-XXXX
- owner: main-agent
- updated_at: YYYY-MM-DD

## Main Agent

- owns:
  - control plane
  - stage transitions
  - owner-facing summaries
  - final decisions

## Subagents

| agent | role | owned paths | allowed stage | notes |
| --- | --- | --- | --- | --- |
| <agent> | <role> | <paths> | <stage> | <notes> |

## Rules

- owner talks only to main-agent
- subagents do not update `state.md`
- subagents do not close the work item
- subagents do not edit paths outside their assigned ownership
