# 13. Dispatch 合同 v0.1

本文档定义历史控制面到执行面的正式派工规则。

新工作默认通过 `project/work/<work-id>/agents.md` 记录 subagent 分工，通过 `state.md` 记录阶段推进；`DISPATCH-*` 保留为旧任务体系兼容对象。

目标是让本地 `main-agent` 与后台开发机之间，通过 Git 控制面完成稳定的异步交接，而不是靠口头同步。

## 1. 当前派工口径

新工作派工发生在 `/plan`，记录在：

- `project/work/<work-id>/agents.md`
- `project/work/<work-id>/plan.md`
- `project/work/<work-id>/state.md`

`main-agent` 可以把 `/build`、`/test`、`/review` 中的明确子任务分配给 subagent。

Subagent 只能消费 `main-agent` 分配的阶段工作，不能自行 claim work item、推进 `state.md` 或关闭工作。

## 2. 历史 `TASK-*` 派工兼容规则

下面规则只适用于仍在旧任务体系内流转的 `TASK-*` 记录。

### 2.1 核心原则

1. 可执行派工单元是 `task`，不是 `bug` 或 `feat`。
2. 只有进入 `ready` 的 task 才允许被后台 worker claim。
3. `main-agent` 是默认 dispatch authority。
4. claim、返工、回收、关闭都必须写回控制面。
5. worker 不得越过控制面直接自行挑 bug / feat 开发。

### 2.2 可派发条件

一个 task 至少满足下面条件，才可视为 dispatchable：

- `state = ready`
- `owner_role` 已明确
- `acceptance_criteria` 已存在
- `branch` / `execution_branch` 命名规则已明确
- 未被其他活跃 `run` 占用

### 2.3 标准派工流

1. `main-agent` 在控制面分支创建或更新 `task_record`
2. 将任务推进到 `ready`
3. 后台 worker 拉取最新控制面分支
4. 获取 `task-claim` 锁
5. 写回：
   - `assigned_run_id`
   - `assigned_machine`
   - `execution_branch`
   - `lease_expires_at`
   - `state = running`
6. push 控制面更新
7. worker 在执行面分支开始编码

### 2.4 review 与返工回流

- worker 完成后，应把控制面中的 task 推进到 `review_pending`
- reviewer / `main-agent` 若判定未通过，应把 task 改回：
  - `running`：需要继续返工
  - `blocked`：受外部条件阻塞
  - `failed`：本轮执行失败，需要重判
  - `drift_pending_ruling`：需要重新裁定
- 返工原因必须写入 `task_record` 或独立 `review_record`

### 2.5 worker 行为边界

- worker 默认只消费 `ready` task
- worker 不直接关闭 task 或 bug
- worker 不直接操作共享部署面，除非控制面明确分派到 `/ship` 阶段
- worker 发现新问题时，应回写 `bug_record` 或请求 `main-agent` 建档
