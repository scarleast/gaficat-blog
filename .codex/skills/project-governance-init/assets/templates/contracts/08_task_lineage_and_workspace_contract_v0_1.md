# 08. 工作线与工作区合同 v0.1

本文档定义 work item 如何映射到 branch 与 worktree。

目标是让第三方审查者、`human-owner` 和 `main-agent` 可以仅通过 git 快速判断当前有哪些 work item 在推进、每条工作线推进到哪里、哪些变更属于同一条工作链。

## 1. 核心原则

1. branch 的首要作用是承载工作线的可观察性与可追溯性，不只是临时提交容器。
2. 一个活跃 work item 只能有一条主 branch。
3. 任务阶段变化不应导致阶段性 branch 泛滥。
4. 控制面状态写入与执行面代码交付应分开建模。
5. worktree 用于承载当前活跃执行上下文，不用于表达任务阶段。

## 2. 控制面与执行面

正式规则：

- `main` 是默认控制面分支
- `work/<work-id>-<slug>` 是默认执行面分支
- `project/` 下的治理台账、work item、历史 dispatch/run/task/bug/requirement 记录由控制面分支承载
- `apps/`、`packages/`、`deploy/` 等运行代码和交付物由执行面分支承载
- 治理记录可以直接提交到控制面分支，但不得夹带业务代码

## 3. 一 work item 一分支

正式规则：

- 一个 `work_id` 只能绑定一条当前主 branch
- 同一个 work item 进入不同阶段时，不应重新开阶段性 branch
- 同一个 work item 的代码、测试、review 修复和收口默认继续落在同一条执行面 branch 上
- 控制面记录不因执行面 branch 的存在而迁移

## 4. 何时才允许新开 branch

只有满足下面任一条件时，才应新建独立 branch：

- 已形成新的独立 `work_id`
- 新工作项拥有不同 owner role 或独立验收标准
- 新工作项不再属于原 work item 的 `/ship` 范围
- 新工作项需要独立追踪、独立 review 或独立关闭

## 5. 主分支合并规则

- `/review` 通过只表示工作线已经完成并具备 `/ship` 条件
- 在 work item 正式 `/ship` 之前，不应将执行面 work branch 提前并入主分支
- 控制面治理提交可以直接进入 `main`
- 主分支吸收执行面代码应视为 `/ship` 的一部分，而不是中途进度标记

## 6. branch 命名

推荐模式：

- `work/<work-id>-<slug>`
- `task/<task-id>-<slug>`（历史兼容）
- `bug/<task-id>-<slug>`
- `exploration/<task-id>-<slug>`
- `governance/<task-id>-<slug>`

状态应记录在 `project/work/<work-id>/state.md` 里，而不是编码到 branch 名里。

## 7. worktree 规则

- 一个活跃 coding run 只能绑定一个 worktree
- 一个活跃 worktree 同一时刻只能服务一个 coding run
- review-only 或只读检查不应长期复用活跃编码 worktree 作为共享上下文
- 控制面写入可通过独立轻量 checkout 或串行更新完成，但不得污染活跃编码 worktree
