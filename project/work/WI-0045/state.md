# WI-0045: CMS UX Polish, Branding & CI/CD Control

- **stage**: review
- **owner**: implementation-role
- **status**: review-pass

## Scope

延续 WI-0044 的 CMS 前端现代化工作，聚焦 UI 细节修复、品牌重塑和 CI/CD 触发策略调整。

## Changes

### Backend (cms/api)

| file | change |
|---|---|
| `src/routes/posts.ts` | 文章列表按日期降序排序（batch blob + frontmatter 解析） |
| `src/routes/builds.ts` | 构建列表改为直接返回 GitHub Actions workflow runs |
| `src/services/github.ts` | 新增 `getBlob()`、`listWorkflowRuns()` 及 `WorkflowRun` 类型 |

### Frontend (cms/frontend)

| file | change |
|---|---|
| `src/pages/LoginPage.tsx` | 登录页重写为 AnyoneCMS landing page（hero + features + footer） |
| `src/pages/BuildsPage.tsx` | 构建页展示 GitHub Actions 状态（workflow name、branch、relative time） |
| `src/pages/PostsPage.tsx` | 文章卡片增加日历/分类/标签图标 |
| `src/pages/PostEditPage.tsx` | Notion 风格属性面板改为每行一个 KV；顶部栏改用 CSS class 实现毛玻璃效果 |
| `src/components/Layout.tsx` | 侧边栏品牌改为 AnyoneCMS（渐变 A logo） |
| `src/components/ui/heatmap.tsx` | 纵坐标标签从单字改为"周X"格式；7 行对齐而非连续堆叠 |
| `src/components/VditorEditor.tsx` | 新增 vditor 富文本编辑器组件 |
| `src/index.css` | 新增 notion-props / notion-topbar 等 CSS 样式 |
| `src/i18n/locales/zh-CN.json` | 品牌更名为 AnyoneCMS，新增 landing 页文案 |
| `src/i18n/locales/en.json` | 同上英文版 |
| `src/types/index.ts` | Build 类型扩展（name, branch, html_url） |

### CI/CD (.github/workflows)

| file | change |
|---|---|
| `deploy.yml` | 触发条件从 `push` 改为 `repository_dispatch` (cms-deploy) + `workflow_dispatch` |

## Checks

- Vite dev server 实时验证通过
- Browser MCP 验证：亮/暗色模式、桌面/移动端均正常
- Heatmap 纵坐标对齐已通过截图验证
