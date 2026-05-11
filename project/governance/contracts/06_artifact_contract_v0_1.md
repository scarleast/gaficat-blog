# 06. 交付物合同 v0.1

本文档定义正式交付物口径。

工作阶段决定"至少要交什么"，生命周期决定"什么时候应该交齐"。

## 1. 核心原则

1. 没有正式交付物，就没有"完成"。
2. 不同 `task_kind` 的交付要求不同，不能一刀切。
3. `/test` evidence 是所有实现工作的基线交付物。
4. review 发现问题时，`bug_record` 不是可选项。
5. 出现可复用经验时，`knowledge_record` 不应无限期拖延。

## 2. 正式 artifacts

- `code`
- `tests`
- `docs`
- `task_record`
- `review_record`
- `verification_record`
- `decision_record`
- `design_record`
- `finding_record`
- `bug_record`
- `knowledge_record`
- `prd`
- `work_item`
- `state_record`
- `spec_record`
- `plan_record`
- `build_record`
- `test_record`
- `ship_record`

## 3. 最低定义

### `code`

正式源代码、配置、schema 或脚本改动。

### `tests`

自动化测试、回归测试或人工 walkthrough 记录。

### `docs`

对读者、操作者或审查者有效的正式文档更新。

### `task_record`

位于控制面分支上的正式任务记录，用于表达当前状态、指派关系、已完成项、剩余项和阻塞项。

### `review_record`

正式审查记录，用于表达 reviewer、范围、decision、findings 和后续动作。

### `verification_record`

至少说明：

- 执行了什么
- 在什么环境执行
- 结果如何
- 未执行项和原因

### `decision_record`

用于记录范围冻结、裁定或正式 acceptance 结论。

### `design_record`

用于记录架构决策、trade-off 与边界说明。

### `finding_record`

用于记录调研发现、选项比较与建议结论。

### `bug_record`

至少包含问题现象、影响范围、当前状态与修复路径。

### `knowledge_record`

用于沉淀可复用经验、踩坑和稳定模式。

### `prd`

产品需求文档，存放于 `project/product/PRD-XXX-<board>.md`，由 `product-role` 主导撰写和维护。

最低包含：
- 产品定位、目标用户、核心价值
- 页面清单与功能需求（P0/P1/P2 分级）
- API 清单（路径、参数、响应结构）
- 认证、i18n 等关键产品决策
- 验收标准
- 明确不做（Out of Scope）

命名与版本规范见 `project/product/README.md`。

### `work_item`

位于 `project/work/<work-id>/work-item.md`，描述工作目标、类型、owner 和事实源。

### `state_record`

位于 `project/work/<work-id>/state.md`，是新工作当前阶段的权威状态源。

### 阶段记录

- `spec_record`: `project/work/<work-id>/spec.md`
- `plan_record`: `project/work/<work-id>/plan.md`
- `build_record`: `project/work/<work-id>/build.md`
- `test_record`: `project/work/<work-id>/test.md`
- `ship_record`: `project/work/<work-id>/ship.md`

## 4. 阶段与最低交付关系

- `/spec`：`work_item`、`state_record`、`spec_record`
- `/plan`：`plan_record`、`agents.md`
- `/build`：`build_record`、实际交付物
- `/test`：`test_record`、验证证据
- `/review`：`review_record`
- `/ship`：`ship_record`、索引更新、最终事实源更新

## 5. 历史 task_kind 与最低交付关系

- `spec`：`docs`、`decision_record`、`verification_record`
- `architecture`：`docs`、`design_record`、`verification_record`
- `implementation`：`code`、`tests`、`verification_record`
- `bugfix`：`code`、`tests`、`bug_record`、`verification_record`
- `exploration`：`finding_record`、`verification_record`（产品探索可产出 `prd`，存放于 `project/product/`）
- `product-role` 在 `exploration` 中产出 `prd` 时，`prd` 即为 `finding_record` 的正式形态
- `governance`：`docs`、`decision_record`、`verification_record`
