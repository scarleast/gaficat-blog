# 09. 任务记录合同 v0.1

本文档定义历史控制面分支上的正式任务记录最小结构。

新工作默认使用 `project/work/<work-id>/`。本合同保留为旧 `TASK-*` 记录的兼容规则。

目标是让第三方审查者、`human-owner` 和 `main-agent` 在不阅读完整 diff 的情况下，也能快速判断任务目标、当前状态、已完成项、剩余项和阻塞点。

## 1. 核心原则

1. 任务记录是正式治理对象，不是随手备注。
2. 任务记录服务于可观察性，不服务于叙事性长文。
3. 当前状态、当前 owner、验证摘要和阻塞项必须一眼可见。
4. 任务记录应与控制面状态同步更新，而不是在 merge 后补写。

## 2. 默认位置

默认路径：

- `project/planning/tasks/<task-id>.md`

该记录默认存在于控制面分支，用于被 `main-agent`、后台 worker 和 reviewer 共同消费。

如果项目后续定义了其他 `task_record_root`，可以在项目合同中覆盖，但必须保持一任务一记录、路径稳定、可预测。

## 3. 最小字段

- `task_id`
- `title`
- `task_kind`
- `state`
- `owner_role`
- `branch`
- `source_type`
- `source_id`
- `assigned_run_id`
- `assigned_machine`
- `execution_branch`
- `lease_expires_at`
- `acceptance_criteria`
- `completed`
- `remaining`
- `verification_summary`
- `blockers`

建议字段：

- `related_bugs`
- `depends_on`
- `artifacts`
- `review_ref`
- `handoff_to`
- `rework_count`
- `last_updated_at`
