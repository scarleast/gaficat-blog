# WI-0044: CMS Frontend Modernization with shadcn UI

## Problem

CMS frontend was too simplistic and lacked key features:

1. Dashboard showed only site list — no activity visualization
2. UI was basic and not modern; site titles on `/sites` were not clickable (required clicking separate buttons)
3. Posts page had no tag/category filtering or grouping
4. Media library was premature (no object storage backend)
5. Builds page was overbuilt for GitHub Actions-only CI/CD
6. Editor was a raw textarea with no preview, toolbar, or structured frontmatter editing

## Scope

### Frontend (`cms/frontend/`)

- **UI Framework**: Adopt shadcn/ui component pattern (Radix UI + Tailwind CSS variables)
- **Layout**: Sidebar navigation replacing top navbar
- **Dashboard**: Add contribution heatmap + site grid cards
- **Sites page**: Make site titles clickable, modern card design
- **Posts page**: Add filter mode toggle (all/category/tag), category grouping, search
- **Editor**: Three view modes (source/split/preview), markdown toolbar, frontmatter form
- **Builds page**: Simplify to CI/CD status display only
- **Media**: Remove MediaPage entirely
- **Dark mode**: CSS class-based with localStorage persistence

### Backend (`cms/api/`)

- **Commits endpoint**: New `/api/sites/:siteId/commits` route for heatmap data

## Acceptance Criteria

1. Dashboard shows heatmap (6-month commit frequency) and site cards
2. Clicking site title on `/sites` navigates to posts page
3. Posts page supports 全部/分类/标签 filter modes with category grouping
4. Editor has source/split/preview modes, toolbar (bold/italic/heading/list/quote/code/link/image/table), and frontmatter form
5. Builds page shows CI/CD status only, states "构建由 GitHub Actions 管理"
6. Media library route removed
7. Dark mode toggle works (class-based, persisted in localStorage)
8. CMS frontend TypeScript build passes
9. Main blog Astro build passes (no regression)

## Changed Files

### New UI Components
- `cms/frontend/src/components/ui/button.tsx`
- `cms/frontend/src/components/ui/card.tsx`
- `cms/frontend/src/components/ui/badge.tsx`
- `cms/frontend/src/components/ui/input.tsx`
- `cms/frontend/src/components/ui/tabs.tsx`
- `cms/frontend/src/components/ui/separator.tsx`
- `cms/frontend/src/components/ui/scroll-area.tsx`
- `cms/frontend/src/components/ui/heatmap.tsx`
- `cms/frontend/src/components/ui/markdown-preview.tsx`

### Rebuilt Pages
- `cms/frontend/src/components/Layout.tsx` — sidebar layout + dark mode
- `cms/frontend/src/pages/DashboardPage.tsx` — heatmap + site cards
- `cms/frontend/src/pages/SitesPage.tsx` — clickable cards
- `cms/frontend/src/pages/PostsPage.tsx` — tag/category filtering
- `cms/frontend/src/pages/PostEditPage.tsx` — rich editor with toolbar + frontmatter form
- `cms/frontend/src/pages/BuildsPage.tsx` — CI/CD status only
- `cms/frontend/src/pages/SiteSettingsPage.tsx` — updated UI

### New API Route
- `cms/api/src/routes/commits.ts`
- `cms/api/src/index.ts` — register commits route

### Config
- `cms/frontend/tailwind.config.js` — darkMode: 'class', shadcn colors
- `cms/frontend/src/index.css` — prose styles, scrollbar, dark mode variables
- `cms/frontend/src/App.tsx` — removed MediaPage route

## Dependencies Added

### Frontend
- `marked` — markdown rendering for preview
- `js-yaml`, `@types/js-yaml` — YAML frontmatter parsing for form
- `@radix-ui/react-tabs` — tabs component
- `@radix-ui/react-separator` — separator component
- `@radix-ui/react-scroll-area` — scroll area component
- `@radix-ui/react-tooltip`, `@radix-ui/react-popover`, `@radix-ui/react-label`, `@radix-ui/react-toggle`, `@radix-ui/react-toggle-group`

### API
- `js-yaml` — YAML handling

## Verification

- CMS frontend TypeScript check: PASS
- CMS frontend Vite build: PASS (397KB JS, 24KB CSS)
- Main blog Astro build: PASS (159 pages)
- Browser verification via MCP: all pages render correctly with mock data
