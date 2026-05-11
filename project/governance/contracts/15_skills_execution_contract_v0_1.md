# 15. Skills 执行合同 v0.1

本文档定义 skills-style 流程如何接入本仓库治理。

## 1. 单一事实源

`project/governance/contracts/` 是唯一正式治理合同源。

Skills 只允许作为合同的执行手册，不允许定义新的状态机、对象类型或关闭规则。

若 skill 指令与本目录合同冲突，以本目录合同为准。

## 2. 正式阶段模型

所有新工作默认按下面流水线推进：

```text
/spec -> /plan -> /build -> /test -> /review -> /ship
```

阶段含义：

- `/spec`：定义目标、边界、非目标、事实源和验收标准。
- `/plan`：拆解实现策略、owner、写入范围、依赖、验证计划和回滚路径。
- `/build`：按 plan 实现，记录实际改动、偏离、阻塞和协作结果。
- `/test`：运行自动化检查、浏览器检查、截图或人工验证，产出证据。
- `/review`：独立审查交付物，记录 findings、decision 和返工要求。
- `/ship`：合并、发布或归档，更新索引和最终事实源。

## 3. 主 agent 编排模型

Owner 只与 `main-agent` 对话。

`main-agent` 负责：

- intake 和阶段判断
- 维护 `project/work/<work-id>/state.md`
- 写入和推进控制面
- 调度 subagent
- 汇总 evidence
- 判断阶段是否可推进
- 最终 `/ship`

Subagent 负责：

- 在被分配的阶段和路径范围内执行工作
- 产出证据或建议
- 不直接推进 `state.md`
- 不直接关闭 work item
- 不直接改写未分配路径

## 4. 阶段推进规则

任何阶段推进都必须满足：

1. 当前阶段 evidence 已写入对应文件。
2. `main-agent` 已确认 exit criteria 满足。
3. `state.md` 已更新。
4. 如需返工，必须明确回退到哪个阶段。

禁止：

- 跳过 `/spec` 直接 `/build`
- 跳过 `/plan` 直接派发实现
- 没有 `/test` 证据就进入 `/review`
- 没有 `/review` decision 就 `/ship`
- 只在聊天里完成验收或关闭

## 4.1 设计还原类任务的视觉验证规则

当 WI 涉及 UI/设计还原时，`/test` 阶段**必须**产出并排截图对比（side-by-side screenshot comparison）作为验收证据。仅靠 `getComputedStyle` 数值对比不足以通过 `/test`。

具体要求：

1. 用 Pencil MCP 导出设计稿对应节点的截图。
2. 用浏览器 MCP 在同一视口宽度下截取实现页面对应区域的截图。
3. 将两张截图并排放置，逐项标注差异（可以用图片标注或文字列表）。
4. 所有标注的差异必须归零（实现 = 设计）才能声明 passed。

**数值测量是定位问题的手段，不是验收标准。** API 返回的 `gap: 12` 和浏览器 `marginBottom: 12px` 数值一致不代表视觉一致——最终判断依据是截图对比。

## 4.2 代码改动强制先建 WI

**Pre-flight Check（强制前置检查）：** 在使用 Edit 或 Write 工具修改任何执行面文件之前，main-agent 必须显式回答以下问题：

> 当前 WI 编号是什么？

如果无法回答（即 `project/work/` 下不存在对应 WI），**必须立刻停止，先建 WI，再继续。** 不允许以"改动太小"、"Owner 说得很直接"为由跳过此检查。

**任何涉及执行面文件修改的任务（需求实现、bug 修复、设计还原、配置变更等），在改动执行面代码之前，必须先完成以下步骤：**

1. 在 `project/work/` 下创建 WI 目录和 `work-item.md`。
2. 至少完成 `/spec` 阶段，写出明确的 AC。
3. 更新 `project/work/work_index.md`，将 WI 加入 Active Work 表。

**调查与研究不算代码改动。** 以下活动允许在没有 WI 的情况下进行：
- 用浏览器/Pencil MCP 测量和对比设计稿
- 用 DevTools 检查 computed styles
- 阅读、搜索、分析代码
- 回答关于代码行为的问题

**但一旦决定修改任何执行面文件（`apps/**`, `packages/**`, `deploy/**`, `source/**`, `tools/**`, 入口脚本），必须立即停下来创建 WI，走完整六步流水线。**

违反此规则时，main-agent 必须：
- 立即停止代码修改
- 补建 WI 并追溯记录已完成的工作
- 在 `/review` 阶段标注"build 先于治理执行"

## 4.3 设计稿铁律（Design-as-Law）

**Pencil 设计稿（`.pen` 文件）是前端实现的唯一视觉规格书。** 实现必须严格忠实还原设计稿中的每一个细节——布局、文字内容、颜色、间距、组件结构，不得偏离、美化、简化或"自由发挥"。

具体规则：

1. **设计稿写了什么，就实现什么。** 文字内容、字号、颜色、间距、布局结构必须与设计稿节点属性完全一致。不得因为"觉得更好看"、"觉得更合理"而自行修改。
2. **设计稿没写的东西，才可以自行决定。** 当设计稿某个区域为空白、缺失或未定义时，实现者可以根据上下文自行补全，但必须在 `/build` 阶段记录偏离说明。
3. **Owner 明确允许自由发挥时，才可以自由发挥。** 仅当 Owner 在指令中明确说"可以自由发挥"或等价表述时，实现者才有权偏离设计稿。
4. **先看设计，再动手写代码。** 在 `/build` 阶段开始任何实现之前，必须先通过 Pencil MCP 截图或读取目标设计节点的完整属性，确认要实现的内容。禁止凭记忆或猜测实现。
5. **只做明确要求的改动。** 当 Owner 指定删除/修改某个设计节点时，只操作该节点及其直接依赖。不得连带修改、删除或新增任何未被明确提及的元素。

**违反此规则视为严重的合同违约，等同于无视规格书自行施工。**

## 4.4 Ship 阶段的 Commit + Push 自动化

当 Owner 给出完整任务且 main-agent 执行六步流水线时，`/ship` 阶段**默认包含**以下操作，无需额外确认：

1. `git add` 暂存所有相关改动
2. `git commit` 提交到当前分支
3. `git push` 推送到远端

**理由**：Owner 授权 main-agent 完成完整任务时，commit 和 push 是 ship 的固有动作。在 `/review` decision 为 accept 后，停下来询问「需要我 commit 吗？」「需要我 push 吗？」属于流程割裂，不必要。

**需要确认的例外操作**（仅在以下场景停下询问）：

- `git push --force` / `git push -f`
- `git reset` / `git rebase`
- 跨分支操作（merge、cherry-pick）
- 部署命令（`wrangler pages deploy` 等）

**main-agent 不得以内置 git 安全规则为由在 ship 阶段中断流程。** 内置规则保护的是「未经授权的 commit/push」，而 Owner 交付完整任务 + review accept 构成了明确授权。

## 5. Skills 与阶段的关系

项目可定义下列 skills 或等价命令来执行阶段：

- `governance-spec`
- `governance-plan`
- `governance-build`
- `governance-test`
- `governance-review`
- `governance-ship`

这些 skills 必须读取本合同，并以 `project/work/<work-id>/` 下的阶段文件作为输入/输出。

## 6. 旧对象兼容

历史 `FEAT-*`、`TASK-*`、`RUN-*`、`DISPATCH-*` 记录只作为历史兼容对象保留。

自本合同生效后，新工作默认使用：

```text
project/work/<work-id>/
  work-item.md
  state.md
  spec.md
  plan.md
  agents.md
  build.md
  test.md
  review.md
  ship.md
```

旧对象不再作为新工作的主要事实源，除非 human-owner 明确要求兼容旧流程。
