# 14. 主分支控制面合同 v0.1

本文档定义 `main` 作为治理控制面的正式口径。

目标是允许仓库在不提前合并业务代码的前提下，依然通过 `main` 持续同步 bug、task、dispatch、run 和 review 状态。

## 1. 核心原则

1. `main` 是默认控制面分支。
2. 控制面提交与业务代码提交必须分离。
3. 控制面记录是全局权威状态源。
4. 未完成的执行面代码不得借治理提交之名进入 `main`。
5. 任何机器都应先读取控制面，再决定是否执行。

## 2. 允许直接进入 `main` 的内容

默认允许：

- `project/governance/**`
- `project/planning/**`
- `project/requirements/**`
- `project/bugs/**`
- `project/knowledge/**`
- `project/work/**`
- `project/runs/**`
- `project/locks/**`
- `project/dispatch/**`

这些提交的性质应是：

- 建档
- 索引更新
- 状态推进
- review / verification / dispatch / lock / run 记录

## 3. 禁止直接进入 `main` 的内容

默认禁止：

- `apps/**`
- `packages/**`
- `deploy/**`
- `tests/**` 中与未合并代码强绑定的实现验证代码

上面这些内容应通过 work branch 完成，并在 `/ship` 收口时并回。

## 4. 与执行面 branch 的关系

- 控制面 branch 负责表达全局最新治理状态
- 执行面 branch 负责表达某个 task 的代码、测试和局部交付物
- 控制面可以先于执行面持续更新
- 执行面代码不可反向覆盖控制面事实记录

## 5. 异常处理

- 若控制面记录与执行面现状冲突，应以最新正式记录为准并触发裁定
- 若某 worker 长时间未回写控制面，应按 `run` 合同走 stale 回收流程
