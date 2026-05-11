Execute the project governance flow for the current task.

Read and follow these files in order:

1. `project/governance/contracts/15_skills_execution_contract_v0_1.md` — authoritative execution contract
2. `project/governance/skills/project-governance-flow/SKILL.md` — canonical stage pipeline skill
3. `project/work/work_index.md` — current work status
4. `project/governance/engineering_workflow.md` — repository workflow rules, if present
5. `project/governance/agents/main-agent.md` — main-agent role definition and subagent dispatch rules

Apply the six-stage pipeline:

```text
/spec -> /plan -> /build -> /test -> /review -> /ship
```

Agent runtime layout: see `project/governance/skills/references/agent-runtime-layout.md`

Record findings, test evidence, review decisions, and closure in work item files, not only chat.
