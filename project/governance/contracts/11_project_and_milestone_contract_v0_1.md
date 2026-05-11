# 11. Project 与 Milestone 合同 v0.1

本文档定义 `Project` 与 `Milestone` 的正式口径。

目标是让治理系统在 work item 之上，还能知道当前服务的是哪个项目、哪个阶段、默认仓库边界是什么，以及项目级规则在哪里声明。

## 1. 核心原则

1. work item 不应脱离 project 与 milestone 独立漂浮。
2. 项目级默认值应显式声明，不能依赖口头共识。
3. milestone 是阶段性交付边界，不是模糊标签。
4. 仓库结构、默认分支、worktree 根目录等项目级约束，应由 project 层声明。

## 2. `Project` 的最小字段

每个 project 至少应定义：

- `project_id`
- `name`
- `repositories`
- `default_branch`
- `control_plane_branch`
- `worktree_root`
- `frontend_roots`
- `backend_roots`
- `shared_package_roots`
- `deploy_roots`
- `material_roots`
- `control_plane_roots`
- `source_roots`
- `test_roots`
- `doc_roots`
- `default_commands`

说明：

- `repositories` 用于声明受当前治理面治理的仓库集合
- `control_plane_branch` 用于声明治理控制面的默认分支，默认与 `default_branch` 相同
- `control_plane_roots` 用于声明允许直接提交控制面治理记录的目录集合
- `frontend_roots` / `backend_roots` / `shared_package_roots` / `deploy_roots` / `material_roots` 用于冻结项目的代码、部署与材料目录边界
- `source_roots` / `test_roots` / `doc_roots` 用于让调度器与审查者知道在哪些目录寻找实现、测试和文档

## 3. `Milestone` 的最小字段

每个 milestone 至少应定义：

- `milestone_id`
- `project_id`
- `title`
- `goal`
- `in_scope`
- `out_of_scope`
- `acceptance_bar`
- `work_item_ids`
- `status`

推荐状态：

- `draft`
- `active`
- `reviewing`
- `completed`
- `cancelled`

## 4. project 的职责

project 层负责冻结：

- 仓库边界
- 默认主分支名
- worktree 根目录策略
- 控制面分支与控制面目录边界
- 默认 build / test / lint / run 命令
- 文档、源代码、测试目录映射
- 前端、后端、共享包、部署、材料目录映射

这些内容不应散落在单个 work item 记录里。

## 5. 与 work item 的关系

- 每个正式 work item 默认应隶属于一个 project
- 每个正式 work item 在正常情况下应映射到一个当前 milestone
- 若 work item 暂时不属于任何 milestone，应明确标注原因

历史 `task_ids` 字段只用于旧 `TASK-*` 兼容记录；新记录应使用 `work_item_ids`。
