# 02. 任务类型合同 v0.1

本文档定义历史 `Task` 的正式场景类型。

新工作默认使用 `project/work/<work-id>/`，由 `/spec -> /plan -> /build -> /test -> /review -> /ship` 阶段表达工作推进。本合同保留为旧 `TASK-*` 记录的兼容规则。

目标是把"任务属于什么场景"和"任务当前处于什么阶段"分开建模。生命周期回答阶段问题，任务类型回答场景问题。

## 1. 设计原则

1. 一个任务只能有一个主 `task_kind`。
2. 一个任务若同时包含需求澄清、架构裁定和代码交付，默认应拆成多个任务。
3. `task_kind` 决定必需 artifacts、审查输入和 closure 口径。
4. 生命周期状态对所有任务类型共用，不为某一类任务定制状态名。

## 2. 正式任务类型

### `spec`

用途：
- 冻结目标、范围、场景、非目标与验收口径

典型 owner roles：
- `product-role`
- `spec-role`

最低交付：
- `docs`
- `decision_record`
- `verification_record`

### `architecture`

用途：
- 冻结模块边界、技术路径、默认值与关键 trade-off

典型 owner role：
- `architect-role`

最低交付：
- `docs`
- `design_record`
- `verification_record`

### `implementation`

用途：
- 在既定合同内交付正式代码变更与本地验证

典型 owner role：
- `implementation-role`

最低交付：
- `code`
- `tests`
- `verification_record`

补充说明：
- 若变更影响正式接口、默认值或操作方式，应补 `docs`

### `bugfix`

用途：
- 修复已确认缺陷，并留下缺陷链路与回归验证证据

典型 owner roles：
- `implementation-role`
- `qa-role`
- `closure-role`

最低交付：
- `code`
- `tests`
- `bug_record`
- `verification_record`

### `exploration`

用途：
- 通过试验、验证、spike、样机或对比调研降低不确定性

典型 owner roles：
- `product-role`
- `architect-role`
- `implementation-role`

最低交付：
- `finding_record`
- `verification_record`

说明：
- `exploration` 不是为了给工作定性，而是为了让实验性工作也走正式流程
- 它可以后续转入 `spec`、`architecture`、`implementation` 或 `bugfix`
- 它也可以在证据足够后直接终止

### `governance`

用途：
- 修改治理规则、流程、字段、目录合同或角色边界

典型 owner roles：
- `main-agent`
- `spec-role`
- `architect-role`

最低交付：
- `docs`
- `decision_record`
- `verification_record`

## 3. 禁止的反模式

- 用 `implementation` 承载需求讨论、架构裁定和代码交付的一锅炖任务
- 为了偷懒把所有前置问题都塞成 `bugfix`
- 把探索性试验放在实现任务里，但不单独留证据
