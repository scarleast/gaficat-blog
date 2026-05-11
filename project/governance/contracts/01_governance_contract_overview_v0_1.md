# 01. 治理合同总览 v0.1

本文档冻结当前仓库的治理基线。

当前治理内核已从历史 `FEAT/TASK/RUN/DISPATCH` 组合，收敛为 skills-style work item 流程：

```text
/spec -> /plan -> /build -> /test -> /review -> /ship
```

目标是让 owner 只与 `main-agent` 对话，由 `main-agent` 协调 subagent，并用阶段文件和证据控制工作推进。

## 1. 核心目标

仓库治理需要围绕下面这些对象协调软件交付工作：

- 仓库
- 分支
- worktree
- 基于 agent 的执行单元
- review 与 bug 工作流
- 验证证据与收口证据

治理层的目的，是让日常执行不依赖聊天记忆，也不依赖临时口头判断。

## 2. 核心原则

1. 状态来自证据，不来自对话记忆。
2. `project/governance/contracts/` 是唯一正式合同源。
3. `project/work/<work-id>/state.md` 是新工作当前阶段事实源。
4. Owner 只与 `main-agent` 对话。
5. Subagent 只执行分派范围，不直接推进阶段。
6. 实现、测试、review 和 ship 默认分权。
7. 合同漂移必须单独裁定，不能混入普通实现修复。

## 3. 当前已冻结的治理内核

### 3.1 任务类型合同

回答：
- 任务属于哪种场景
- 需求、架构、实现、bugfix、探索是否应拆成不同任务
- 不同场景最少要交什么

见 [02. 任务类型合同 v0.1](./02_task_kind_contract_v0_1.md)。

### 3.2 角色合同

回答：
- 当前任务应该由谁接手
- 谁能把状态推进到哪里
- 角色冲突时谁拥有裁定权

见 [03. 角色合同 v0.1](./03_roles_contract_v0_1.md)。

### 3.3 任务生命周期合同

回答：
- 历史 `Task` 状态如何兼容新 work item 阶段
- 旧 task 记录如何回溯
- 为什么新工作默认不再使用旧 task 状态机

见 [04. 任务生命周期合同 v0.1](./04_task_lifecycle_contract_v0_1.md)。

### 3.4 Review 合同

回答：
- 谁来审
- 最小 review 记录是什么
- review 结论如何影响状态推进

见 [05. Review 合同 v0.1](./05_review_contract_v0_1.md)。

### 3.5 交付物合同

回答：
- 正式 artifacts 有哪些
- 不同任务类型最少应交什么
- 哪些条件会触发 `bug_record` 或 `knowledge_record`

见 [06. 交付物合同 v0.1](./06_artifact_contract_v0_1.md)。

### 3.6 锁合同

回答：
- 系统里有哪些正式锁类型
- 每种锁的互斥级别是什么
- 锁冲突发生时如何处理

见 [07. 锁合同 v0.1](./07_lock_contract_v0_1.md)。

### 3.7 工作线与工作区合同

回答：
- 一个 task 如何映射到 branch
- 什么时候允许新开 branch
- 什么时候才能并入主分支
- worktree 如何承载活跃执行上下文

见 [08. 工作线与工作区合同 v0.1](./08_task_lineage_and_workspace_contract_v0_1.md)。

### 3.8 任务记录合同

回答：
- 控制面分支上的正式任务记录应放在哪里
- 最小字段和更新时机是什么
- 如何让 owner 不看完整 diff 也能判断进展

见 [09. 任务记录合同 v0.1](./09_task_record_contract_v0_1.md)。

### 3.9 Bug 生命周期合同

回答：
- 正式 bug 从哪里来
- bug 会经历哪些状态
- bug 何时留在原 task 内，何时升级为独立 task

见 [10. Bug 生命周期合同 v0.1](./10_bug_lifecycle_contract_v0_1.md)。

### 3.10 Project 与 Milestone 合同

回答：
- task 隶属于哪个 project / milestone
- 项目级默认分支、worktree 根目录和目录结构在哪里声明
- milestone 的阶段边界和验收边界是什么

见 [11. Project 与 Milestone 合同 v0.1](./11_project_and_milestone_contract_v0_1.md)。

### 3.11 Run 合同

回答：
- 一次具体 agent 执行如何被定义、心跳和回收
- run 与 task、机器、branch 的绑定关系

见 [12. Run 合同 v0.1](./12_run_contract_v0_1.md)。

### 3.12 Dispatch 合同

回答：
- 后台 worker 应消费什么对象
- task 如何被 claim、返工和回流

见 [13. Dispatch 合同 v0.1](./13_dispatch_contract_v0_1.md)。

### 3.13 主分支控制面合同

回答：
- `main` 何时可以直接接收治理提交
- 控制面与执行面如何分离

见 [14. 主分支控制面合同 v0.1](./14_main_control_plane_contract_v0_1.md)。

### 3.14 Skills 执行合同

回答：
- `/spec -> /plan -> /build -> /test -> /review -> /ship` 如何推进
- `main-agent` 如何协调 subagent
- skills 与正式合同如何避免冲突
- 新 work item 应如何落盘

见 [15. Skills 执行合同 v0.1](./15_skills_execution_contract_v0_1.md)。

## 4. 当前工作建模口径

当前正式口径是：

- `Work Item` 是新工作的事实源
- `stage` 表达 `/spec` 到 `/ship` 的推进阶段
- 阶段 evidence 写入 `project/work/<work-id>/`
- 旧 `Task` 是历史兼容对象

因此：
- 需求讨论不应直接跳到 `/build`
- 架构裁定应写入 `/plan`
- 测试证据应写入 `/test`
- review 结论应写入 `/review`
- ship/closure 应写入 `/ship`

推荐拆分方式：

1. `/spec` 冻结目标与验收
2. `/plan` 冻结技术路径、owner 和写入范围
3. `/build` 交付代码、设计或治理改动
4. `/test` 产出验证证据
5. `/review` 独立审查
6. `/ship` 合并、发布或归档
