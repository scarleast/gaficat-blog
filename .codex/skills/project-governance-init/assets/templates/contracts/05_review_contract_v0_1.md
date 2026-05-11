# 05. Review 合同 v0.1

本文档定义正式 `/review` 规则。

目标是把"谁来审、审什么、最少留下什么记录、审完之后 work item 该怎么走"冻结成稳定口径，避免用聊天评论代替正式审查。

## 1. 核心原则

1. review 是正式治理对象，不是零散评论。
2. review 结论必须可追溯到具体 task、具体 branch 和具体交付物。
3. `/ship` 之前必须存在正式 `/review` 记录。
4. review 发现问题时，不能只口头说"回去改"，必须留下正式结论。
5. review 不等于实现者自检，独立验证与裁定仍应按角色边界执行。

## 2. review 的目标

正式 review 至少应回答下面问题：

- 当前交付是否满足 work item 合同
- 当前交付是否存在明显缺陷、回归或遗漏
- 是否触发独立验证、架构裁定或 bug 建档
- 当前 work item 应进入 `/ship`、回到 `/build`，还是进入异常路径

## 3. 谁可以产出 review

- `main-agent`
- `qa-role`
- `architect-role`
- `spec-role`
- `human-owner`

## 4. review 记录最小字段

每条正式 `review_record` 至少应包含：

- `work_id`
- `reviewer_role`
- `scope`
- `decision`
- `findings`
- `required_followups`
- `created_at`

建议字段：

- `related_artifacts`
- `related_bugs`
- `rationale`

## 5. decision 枚举

当前正式 decision 至少包括：

- `accept`
- `changes_required`
- `blocked`
- `reject`

## 6. review 对任务状态的影响

- `accept` 可支持进入 `/ship`
- `changes_required` 通常回到 `/build`
- `blocked` 通常进入 `blocked`
- 若发现正式缺陷，应建立或更新 `bug_record`
