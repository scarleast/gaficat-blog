# 04. Task 生命周期合同 v0.1

本文档定义历史 `Task` 对象的生命周期。

新工作应优先使用 [15. Skills 执行合同](./15_skills_execution_contract_v0_1.md) 的 `Work Item` 阶段模型；本合同保留为历史兼容层。

## 1. 合同目标

- 让历史 `Task` 记录仍可读、可追踪、可关闭
- 明确旧状态与新 skills 阶段的映射
- 避免历史 task 记录与新 work item 流程冲突

## 2. 历史状态集合

历史 `Task` 仍保留：

- `draft`
- `ready`
- `running`
- `review_pending`
- `accepted`
- `closed`
- `cancelled`
- `blocked`
- `failed`
- `drift_pending_ruling`
- `needs_split`

## 3. 兼容映射

历史 `Task` 状态与新阶段的兼容映射：

| 历史 Task 状态 | 新阶段语义 |
| --- | --- |
| `draft` | `/spec` |
| `ready` | `/plan` completion |
| `running` | `/build` |
| `review_pending` | `/test` completion, awaiting `/review` |
| `accepted` | `/review` accepted |
| `closed` | `/ship` |

## 4. 旧流程边界

- 新任务不应再优先使用本合同的状态机。
- 旧 task 记录只用于历史索引、回溯和兼容。
- 新的事实源应写入 `project/work/<work-id>/`.
