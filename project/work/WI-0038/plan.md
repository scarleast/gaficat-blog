# /plan

- work_id: WI-0038
- stage: plan
- status: approved
- owner: main-agent
- updated_at: 2026-05-14

## Architecture

CMS 平台作为独立子项目 `cms/` 存放在本仓库中，与博客主体解耦。

### 技术栈

| 层 | 选型 | 理由 |
| --- | --- | --- |
| 前端 | React 18 + Vite + TypeScript | SPA，CF Pages 部署，生态丰富 |
| UI 框架 | Tailwind CSS + shadcn/ui | 轻量可定制 |
| i18n | react-i18next | 成熟的 React i18n 方案 |
| Markdown 编辑 | CodeMirror 6 (lezer) | 可扩展的代码编辑器 |
| API | Cloudflare Workers (Hono) | 轻量路由，CF 原生 |
| 数据库 | Cloudflare D1 (SQLite) | CF 原生，免费额度足够 |
| 认证 | GitHub OAuth (web flow) | 用户已有 GitHub 账号 |
| 部署 | CF Pages (前端) + CF Workers (API) | $0 成本 |

### 目录结构

```text
cms/
  frontend/            # React SPA (Vite)
    src/
      components/      # UI 组件
      pages/           # 页面路由
      i18n/            # 国际化资源 (zh-CN, en)
      hooks/           # 自定义 hooks
      lib/             # 工具函数
      types/           # TypeScript 类型
    public/
    index.html
    vite.config.ts
    tailwind.config.ts
    package.json
  api/                 # CF Workers (Hono)
    src/
      routes/          # 路由处理
      middleware/       # 中间件 (auth, cors)
      services/        # 业务逻辑
      db/              # D1 schema & queries
      types/           # TypeScript 类型
    wrangler.toml
    package.json
  schema.sql           # D1 建表语句
  README.md
```

### 数据库 Schema

```sql
-- 用户表
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  github_id INTEGER NOT NULL UNIQUE,
  username TEXT NOT NULL,
  avatar_url TEXT,
  access_token TEXT NOT NULL,  -- encrypted
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 站点表
CREATE TABLE sites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  name TEXT NOT NULL,
  repo_full_name TEXT NOT NULL,  -- owner/repo
  branch TEXT NOT NULL DEFAULT 'main',
  content_dir TEXT NOT NULL DEFAULT 'src/content/posts',
  media_dir TEXT NOT NULL DEFAULT 'src/assets/media',
  framework TEXT NOT NULL DEFAULT 'astro',
  build_command TEXT NOT NULL DEFAULT 'npm run build',
  output_dir TEXT NOT NULL DEFAULT 'dist',
  frontmatter_schema TEXT NOT NULL DEFAULT '[]',  -- JSON
  locale TEXT NOT NULL DEFAULT 'zh-CN',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 构建记录
CREATE TABLE builds (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  site_id INTEGER NOT NULL REFERENCES sites(id),
  run_id INTEGER,  -- GitHub Actions run ID
  status TEXT NOT NULL DEFAULT 'pending',  -- pending, in_progress, success, failure
  triggered_at TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT
);
```

### API 路由

```
POST   /api/auth/github          — GitHub OAuth callback
GET    /api/auth/me              — 当前用户信息
DELETE /api/auth/logout           — 登出

GET    /api/sites                 — 列出用户站点
POST   /api/sites                 — 创建站点
GET    /api/sites/:id             — 站点详情
PUT    /api/sites/:id             — 更新站点配置
DELETE /api/sites/:id             — 删除站点

GET    /api/sites/:id/posts       — 文章列表 (从 GitHub 读取)
GET    /api/sites/:id/posts/:path — 文章详情
PUT    /api/sites/:id/posts/:path — 创建/更新文章
DELETE /api/sites/:id/posts/:path — 删除文章

POST   /api/sites/:id/media      — 上传媒体文件
GET    /api/sites/:id/media      — 列出媒体文件

POST   /api/sites/:id/build      — 触发构建 (repository_dispatch)
GET    /api/sites/:id/builds     — 构建历史
GET    /api/sites/:id/builds/:bid — 构建状态
```

### 前端页面

| 页面 | 路由 | 说明 |
| --- | --- | --- |
| 登录 | /login | GitHub OAuth 入口 |
| 仪表盘 | / | 站点列表概览 |
| 站点设置 | /sites/:id/settings | 框架、目录、schema 配置 |
| 文章列表 | /sites/:id/posts | 文章 CRUD 列表 |
| 文章编辑 | /sites/:id/posts/edit?path=xxx | Markdown + frontmatter 编辑器 |
| 媒体库 | /sites/:id/media | 图片上传和管理 |
| 构建历史 | /sites/:id/builds | 构建触发和状态查看 |
| 设置 | /settings | 用户偏好 (语言切换等) |

### i18n 方案

- 使用 react-i18next + i18next
- 翻译文件: `frontend/src/i18n/locales/zh-CN.json` 和 `frontend/src/i18n/locales/en.json`
- 默认语言: zh-CN，根据浏览器语言自动检测
- 用户可在 /settings 页面手动切换，存入 localStorage
- 所有 UI 文本通过 `t('key')` 引用，不硬编码

### 认证流程

1. 用户点击 "GitHub 登录" → 跳转 GitHub OAuth authorize URL
2. GitHub 回调 → CF Workers `/api/auth/github` 接收 code
3. Workers 用 code 换取 access_token → 存入 D1 → 创建 session (JWT)
4. 前端存储 JWT → 后续请求携带 Authorization header
5. API 中间件验证 JWT → 注入 user context

### GitHub API 交互

所有 GitHub API 调用通过 CF Workers 代理，使用用户的 OAuth token:
- `GET /repos/:owner/:repo/contents/:path` — 读取文件
- `PUT /repos/:owner/:repo/contents/:path` — 创建/更新文件
- `DELETE /repos/:owner/:repo/contents/:path` — 删除文件
- `POST /repos/:owner/:repo/dispatches` — 触发构建
- `GET /repos/:owner/:repo/actions/runs` — 查询构建状态

## Implementation Order

### Phase 1: 骨架搭建
1. 初始化 `cms/frontend/` (Vite + React + TS + Tailwind)
2. 初始化 `cms/api/` (Hono + CF Workers)
3. 实现 i18n 基础设施
4. 实现路由和布局组件
5. 创建 D1 schema.sql

### Phase 2: 认证系统
6. GitHub OAuth App 配置
7. Workers: /api/auth/* 路由
8. 前端: 登录页 + auth hooks

### Phase 3: 站点管理
9. Workers: /api/sites/* CRUD
10. 前端: 站点列表 + 创建/设置页

### Phase 4: 内容编辑
11. Workers: /api/sites/:id/posts/* (GitHub API 代理)
12. 前端: 文章列表页
13. 前端: 文章编辑器 (CodeMirror + frontmatter 表单)

### Phase 5: 媒体 + 构建
14. Workers: /api/sites/:id/media (上传到 GitHub)
15. 前端: 媒体库页面
16. Workers: /api/sites/:id/build (触发 + 状态轮询)
17. 前端: 构建历史页

### Phase 6: 集成 & 部署
18. 端到端流程验证
19. CF Pages + Workers 部署配置
20. wrangler.toml + deploy scripts

## Rollback

- CMS 独立于博客主体，不影响现有站点
- 部署失败只需回滚 CF Pages/Workers 版本
- D1 数据库通过 CF Dashboard 备份

## Owned Paths

- `cms/**` — 全部 CMS 代码 (新建)
- `project/work/WI-0038/**` — 治理文件

## Checks

- `cd cms/frontend && npm run build` — 前端构建通过
- `cd cms/api && npm run build` — Workers 构建通过
- 本地 dev server 启动正常
- 所有 i18n key 完整覆盖 zh-CN 和 en
