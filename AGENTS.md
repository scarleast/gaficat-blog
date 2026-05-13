# Project Agent Guide

This repository uses the project governance system in `project/governance/`.

## Project Shape

- Astro static blog with TypeScript, MDX, Tailwind, and content collections.
- Package manager: `npm` with `package-lock.json`.
- Primary verification command: `npm run build`.

## Session Bootstrap Rule

**main-agent 必须在首次回答前加载治理上下文。** 无论用户的问题是否涉及代码变更，main-agent 的第一条回复都必须基于项目自身的治理体系，而非 Claude Code 的通用能力描述。具体要求：

1. 会话开始时，先读取本文件（`AGENTS.md`）和 `project/work/work_index.md`，掌握当前项目状态和已有工作项。
2. 当被问及"你能做什么""流程是什么"等问题时，回答的内容必须是项目治理体系定义的角色（main-agent → product / spec / architect / implementation / QA / UI/UX / closure）和六阶段管道（`/spec → /plan → /build → /test → /review → /ship`），而非 Claude Code 的内置 agent 类型（general-purpose / Explore / Plan 等）。
3. 禁止在未读取治理文件的情况下给出脱离项目上下文的通用回答。项目治理是约束 main-agent 行为的合约，不是可选项。

> **教训记录**：曾发生过 main-agent 被问及角色和流程时，跳过治理文件直接给出 Claude Code 通用描述的情况。这违反了"治理先行"原则，误导了 owner 对项目流程的理解。

## Governance Entry

Before changing governance state or execution-plane files, follow:

1. `project/governance/contracts/15_skills_execution_contract_v0_1.md`
2. `project/governance/skills/project-governance-flow/SKILL.md`
3. `project/work/work_index.md`
4. `project/governance/engineering_workflow.md`
5. `project/governance/repository_layout.md`

New work follows:

```text
/spec -> /plan -> /build -> /test -> /review -> /ship
```

Use work item files under `project/work/WI-XXXX/` to record scope, plan, changed files, checks, review decisions, and closure.

## Execution Plane

Execution-plane paths are the product files:

- `src/**`
- `source/**`
- `themes/**`
- `public/**`
- `scripts/**`
- `astro.config.mjs`
- `src/content.config.ts`
- `tsconfig.json`
- `package.json`
- `package-lock.json`

Generated or dependency paths are not primary edit targets:

- `dist/**`
- `node_modules/**`
- `.astro/**`

Local scratch and visual/debug captures are not source of truth:

- `tmp/**`
- root-level `*.png`
- root-level `*-snapshot.txt`

## Control Plane

Control-plane paths are governance and agent runtime files:

- `project/governance/**`
- `project/work/**`
- `.codex/skills/**`
- `.claude/commands/**`
- `AGENTS.md`

Canonical governance skills live in `project/governance/skills/**`; runtime copies in `.codex/skills/**` are entrypoints.

## Checks

Run `npm run build` before finishing execution-plane changes unless the task is documentation-only or blocked by an environment issue. Record skipped checks and the reason in the work item.
