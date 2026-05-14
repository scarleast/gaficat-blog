# /spec

- work_id: WI-0038
- stage: spec
- status: draft
- owner: main-agent
- updated_at: 2026-05-13

## Goal

构建一个 Git-based 静态博客 CMS 托管平台的 MVP。用户连接自己的 GitHub 仓库，通过 Web UI 编辑 Markdown 内容，平台 commit 变更到用户仓库并触发用户仓库的 GitHub Actions workflow 执行构建和部署。

## Scope

1. **用户认证** — GitHub OAuth 登录，获取用户 GitHub token
2. **站点管理** — 用户注册站点，配置：框架类型、内容目录、构建命令、产出目录、构建分支、frontmatter schema（用户自定义字段名、类型、是否必填）
3. **内容编辑** — Markdown 文件的 CRUD（列表、创建、编辑、删除），frontmatter 根据用户定义的 schema 动态生成表单，正文 Markdown 编辑器
4. **媒体管理** — 通过 GitHub API 上传图片/媒体到用户仓库指定目录
5. **构建触发** — 发布内容后调用 GitHub API `workflow_dispatch` 触发用户仓库的构建 workflow
6. **前端部署** — CMS 平台自身部署为静态 SPA（CF Pages）
7. **API 层** — CF Workers 提供 OAuth callback、GitHub API 代理、构建触发等后端能力
8. **用户数据** — CF D1 存储用户账号和站点配置（文章内容不存本地，全在用户 GitHub 仓库）
9. **国际化** — 前端 UI 至少支持中文（zh-CN）和英文（en）两种语言，支持运行时切换

## Non-goals

- 不做自动 SSG 框架识别（用户自行配置）
- 不做平台侧的构建执行（构建走用户 GitHub Actions）
- 不做部署目标管理（部署在用户 GitHub Actions workflow 中自行配置）
- 不做多用户协作 / 权限管理（MVP 只支持单人站点）
- 不做实时预览（MVP 阶段跳过）
- 不做付费 / 计费系统
- 不做独立的移动端应用

## Source Of Truth

- 本对话中的架构讨论（2026-05-13）
- 参考：Sveltia CMS（GitHub API 交互模式）
- 参考：JekyllPad（产品形态对标）

## Acceptance Criteria

1. 用户能通过 GitHub OAuth 登录平台
2. 用户能注册一个站点，填写仓库地址、内容目录、构建命令等配置
3. 用户能在 Web UI 中浏览站点下的文章列表
4. 用户能创建新文章（填写 frontmatter + 编辑 Markdown 正文）
5. 用户能编辑已有文章并保存（commit 到用户 GitHub 仓库）
6. 用户能上传图片到仓库指定目录，并在文章中引用
7. 用户点击"发布"后，平台触发用户仓库的 `workflow_dispatch`，并轮询 GitHub Actions 运行状态反馈给用户（成功/失败/进行中）
8. 平台前端部署在 CF Pages（cms.justmysec.com），API 部署在 CF Workers
9. gaficat_blog 仓库作为第一个验证站点能完整走通流程
10. MVP 运营成本为 $0（全在免费额度内）
11. 前端 UI 所有可见文本均支持中文和英文两种语言，用户可在设置中切换，切换后立即生效无需刷新

## Risks

- GitHub API rate limit — 缓解：使用用户 OAuth token（5000 req/hr），API 代理层做缓存
- CF Workers 免费额度不够 — 缓解：MVP 阶段用户量极小，10 万请求/天足够
- GitHub OAuth App 审核流程 — 缓解：MVP 阶段可以用 GitHub OAuth App 的 dev mode
- Sveltia CMS fork 改造难度 — 缓解：先评估改造量，必要时从零搭建轻量版

## Decisions

- **技术基础**：基于 Sveltia CMS fork 改造
- **部署域名**：cms.justmysec.com（CF Pages）
- **frontmatter schema**：用户自定义配置（字段名、类型、是否必填），平台不预设
- **构建状态反馈**：需要，轮询 GitHub Actions API 展示成功/失败/进行中状态
- **构建触发方式**：使用 `repository_dispatch` webhook，支持 **保存 ≠ 发布** 的工作流
  - 用户编辑内容 → 保存（commit 到 GitHub 仓库，不触发构建）
  - 用户点击「发布」按钮 → CMS 调用 `POST /repos/{owner}/{repo}/dispatches` 触发构建
  - 支持按 event_type 分流：`publish`（增量发布）、`rebuild-all`（全量重建）
  - 用户仓库的 workflow 需配置 `on: repository_dispatch` + `workflow_dispatch` 接收触发
  - 对比 `push + paths` 过滤：repository_dispatch 由用户控制发布节奏，而非每次 commit 自动上线，更适合 CMS 场景

## Exit Criteria

- scope is clear
- non-goals are clear
- acceptance criteria are testable
- no blocking open questions remain
