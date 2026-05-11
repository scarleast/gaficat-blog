# 07. 锁合同 v0.1

本文档定义资源锁规则。

目标是防止多 agent / 多任务在 branch、worktree、runtime 或共享台账上相互污染，并让冲突处理具备正式口径。

## 1. 核心原则

1. 共享资源冲突不能靠口头约定解决。
2. 锁是正式治理对象，不是实现细节。
3. 一个任务持有的锁必须可追溯到 owner task 和 owner run。
4. 锁冲突要么等待、要么串行、要么隔离，不允许碰运气并行。
5. 对共享 runtime 和部署面，证据归属优先于执行速度。

## 2. 正式锁类型

### `branch`

- 范围：仓库级
- 互斥级别：`exclusive`

### `worktree`

- 范围：仓库级
- 互斥级别：`exclusive`

### `planning-doc`

- 范围：仓库级
- 互斥级别：`serialized`

### `control-plane-write`

- 范围：仓库级
- 互斥级别：`serialized`

### `task-claim`

- 范围：task 级
- 互斥级别：`exclusive`

### `review-queue`

- 范围：task 级
- 互斥级别：`serialized`

### `agent-run`

- 范围：run 级
- 互斥级别：`exclusive`

### `shared-runtime`

- 范围：环境级
- 互斥级别：`serialized`

### `deploy-surface`

- 范围：环境级
- 互斥级别：`exclusive`

## 3. 冲突处理

- 优先等待或串行
- 无法串行时应隔离出独立环境或独立 task
- 不允许多个活跃任务同时无约束修改同一共享面
- 控制面写入默认经由 `control-plane-write`
- worker 抢占任务前必须先获取 `task-claim`
- review 回流或 closure 前，相关 task 的 `review-queue` 不得并发写入
