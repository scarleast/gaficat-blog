# 10. Bug 生命周期合同 v0.1

本文档定义 `Bug` 的正式生命周期。

目标是把 review、验证或运行过程中发现的问题，从"聊天里提一下"变成可追踪、可分派、可关闭的正式治理对象。

## 1. 核心原则

1. 正式缺陷必须以 `bug_id` 留痕，不能只停留在 review 评论里。
2. `bug` 可以属于当前 work item 的 `/ship` 范围，也可以升级为独立 work item。
3. bug 的状态应反映事实证据，而不是主观印象。
4. bug 被标记为已修复，不等于已被独立验证。
5. bug 关闭前必须能回答影响范围、修复路径和验证结果。
6. bug 是问题记录，不直接等于可执行派工单。

## 2. bug 的来源

正式 bug 可以由下面来源建立：

- `review_record`
- `verification_record`
- runtime / smoke / integration 结果
- `human-owner` 或 `main-agent` 的正式升级判断

## 3. 正式状态集合

常规状态：

- `open`
- `triaged`
- `in_progress`
- `fixed_pending_validation`
- `verified`
- `closed`
- `cancelled`

异常状态：

- `blocked`
- `duplicate`
- `won_t_fix`

## 4. bug 基本流

推荐主路径：

`open -> triaged -> in_progress -> fixed_pending_validation -> verified -> closed`

## 5. 与 work item 的关系

- 若 bug 仍属于当前 work item 的 `/ship` 范围，可留在当前 work branch 内继续处理
- 若 bug 已形成独立目标、独立验收或独立 owner，应升级为独立 work item
- subagent 默认不直接消费 bug，而是消费由 `main-agent` 在 `/plan` 中分派的阶段工作

## 6. 建议字段

正式 bug 记录建议补充：

- `triage_decision`
- `promoted_work_id`
- `dispatchable`

默认规则：

- `dispatchable` 默认应为 `no`
- 只有当 bug 已被收敛进某个正式 work item 后，执行面才应开始处理
