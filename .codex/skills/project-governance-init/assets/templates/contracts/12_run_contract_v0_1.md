# 12. Run 合同 v0.1

本文档定义历史 `Run` 的正式口径。

新工作默认在 `project/work/<work-id>/agents.md` 和阶段 evidence 中记录 subagent 执行结果；`RUN-*` 保留为旧任务体系兼容对象。

目标是把多 agent / 多机器上的一次具体执行，从聊天上下文中剥离出来，变成可被 claim、追踪、超时回收和交接的正式对象。

## 1. 核心原则

1. `run` 是历史体系里的一次具体执行租约，不等于 `task`。
2. 一个活跃 `run` 同一时刻只服务一个历史 `task`。
3. 一个历史 `task` 可以串行经历多个 `run`，例如首次实现、返工、收口回归。
4. `run` 的活跃性必须依赖心跳和租约，而不是聊天印象。
5. 失联 `run` 必须能被回收，避免任务永久悬挂。

## 2. 最小字段

每个正式 `run` 至少应定义：

- `run_id`
- `task_id`
- `role`
- `machine_id`
- `workspace_ref`
- `branch`
- `status`
- `claimed_at`
- `heartbeat_at`
- `lease_expires_at`

建议字段：

- `handoff_to`
- `evidence_refs`
- `notes`

## 3. 正式状态集合

- `claiming`
- `active`
- `waiting_review`
- `waiting_rework`
- `blocked`
- `stale`
- `closed`
- `cancelled`

## 4. 状态定义

### `claiming`

worker 正在尝试接管任务，但 claim 尚未完成。

### `active`

run 已成功拿到任务租约，正在实现或执行当前职责。

### `waiting_review`

run 已完成本轮主要产出，等待 reviewer 或 `main-agent` 继续推进。

### `waiting_rework`

run 对应任务收到返工结论，等待再次进入活跃执行。

### `blocked`

run 因外部依赖、环境或锁冲突无法继续。

### `stale`

run 超过租约未续约，应视为失联或需回收。

### `closed`

run 生命周期已完成并正常结束。

### `cancelled`

run 被正式中止，不再继续。

## 5. 心跳与租约

- 活跃 `run` 必须周期性刷新 `heartbeat_at`
- `lease_expires_at` 超时后，`main-agent` 可将该 `run` 标记为 `stale`
- `stale` 的 `run` 不得继续被视为任务 owner
- 任务重新派发前，应先完成原 `run` 的回收记录

## 6. 与 task 的历史关系

- `task_record` 应记录当前 `assigned_run_id`
- 一个 task 同一时刻只能有一个当前活跃 owner run
- 若任务进入 review 或返工，不应新建并行 owner run 与之竞争
