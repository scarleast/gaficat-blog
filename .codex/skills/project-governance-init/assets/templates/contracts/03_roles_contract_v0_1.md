# 03. 角色合同 v0.1

本文档定义正式角色集合、职责边界和状态推进权。

## 1. 核心原则

1. 角色权威优先于模型或工具偏好。
2. 新工作由 `main-agent` 独占控制面阶段推进权。
3. Subagent 只能在被分配的阶段和路径范围内执行。
4. 重要状态推进必须有证据。
5. `/ship` 和 `closed` 由 `main-agent` 控制。
6. `drift_pending_ruling` 由 `architect-role` 裁定。
7. 实现者自检不能替代独立验证。

## 2. 正式角色

系统外角色：

- `human-owner`

系统内角色：

- `main-agent`
- `product-role`
- `spec-role`
- `architect-role`
- `implementation-role`
- `qa-role`
- `closure-role`
- `uiux-role`

## 3. 角色定义

### `human-owner`

负责：

- 定义项目目标和优先级
- 批准重大方向变更
- 对无法自动裁定的业务冲突做最终决策

不可以：

- 绕过 `main-agent` 或正式证据链直接关闭 work item

### `main-agent`

负责：

- 拆分 work item 与分配角色
- 管理 `project/work/<work-id>/state.md`
- 汇总 review 结论与 gate 结果
- 推进 `/spec -> /plan -> /build -> /test -> /review -> /ship`

可推进阶段：

- `/spec`
- `/plan`
- `/build`
- `/test`
- `/review`
- `/ship`
- `closed`

### `product-role`

负责：

- 澄清用户目标、目标场景和非目标
- 撰写和维护 PRD（存放于 `project/product/PRD-XXX-<board>.md`）
- 定义产品验收边界和优先级分级

### `spec-role`

负责：

- 冻结任务合同、验收边界和文档口径

### `architect-role`

负责：

- 冻结架构边界、默认值、技术路径与 drift 裁定

### `implementation-role`

负责：

- 在既定合同内交付代码、测试与实现验证

### `qa-role`

负责：

- 独立验证行为、验收和回归风险

### `closure-role`

负责：

- 补运行证据、收口证据、交付态验证与最终闭环

### `uiux-role`

负责：

- 冻结信息结构、交互路径、界面一致性与视觉方案

## 4. 角色边界

- `main-agent` 不应长期自己兼任所有编码实现
- `implementation-role` 的自检不能替代 `qa-role`
- `architect-role` 不应绕过 `spec` 直接改变任务目标
- `closure-role` 不应凭聊天印象宣布任务关闭

## 5. exploration 的 role 口径

`exploration` 没有专属独立角色，但应根据探索主题选择 owner：

- 业务与范围不确定性：`product-role`（产出可为 `prd`）
- 技术路径与架构不确定性：`architect-role`
- 实验实现、样机与技术验证：`implementation-role`

是否转入正式后续任务，由 `main-agent` 基于证据判断。
