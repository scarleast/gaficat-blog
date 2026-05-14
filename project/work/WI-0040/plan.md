# /plan

- work_id: WI-0040
- stage: build
- status: completed
- owner: main-agent
- updated_at: 2026-05-14

## Issue Triage

| # | Issue | Owner | Status |
|---|-------|-------|--------|
| 1 | sspai CDN 不可用（4 张图） | main-agent | Done |
| 2 | gaficat CDN 404（1 张图） | main-agent | Done |
| 3 | URL 含未编码空格（3 处） | main-agent | Done |
| 4 | {bug} 占位符（14 处） | main-agent | Done |

## Fix 1: sspai CDN 替换为 gaficat CDN (completed)

- File: `source/_posts/tutorial/甲醛熏得人头痛？我做了一个TVOC传感器.md`
- cdn.sspai.com 不可达（DNS 解析至私有 IP），用户提供 4 张替代图托管于 pic.gaficat.com/maker/
- 替换映射：
  - L18 斜照: sspai → `甲醛传感器斜面照.jpeg`
  - L23 正面照: sspai → `甲醛传感器正面照.jpeg`
  - L32 某宝TVOC传感器: sspai → `淘宝甲醛传感器商品列表.png`
  - L52 各国TVOC标准: sspai → `各国TVOC标准.png`
- `npm run build` passed (159 pages, 1.36s)

## Fix 2: gaficat CDN 404 删除引用 (completed)

- File: `source/_posts/life/迷惘的26岁.md`
- `VZOO知行合一.png` 在 CDN 上 404，用户选择删除引用
- 已删除 L17 `<img>` 标签
- `npm run build` passed (159 pages, 1.37s)

## Fix 3: Unencoded spaces in URLs (completed)

- `source/_posts/tutorial/如何用51单片机控制舵机加减速.md:40` — 空格 → `%20`
- `source/_posts/knowledge/教育产业化，穷人还有机会吗？.md:51` — 空格 → `%20`
- `source/_posts/tutorial/用telegram订阅twitter.md:66` — 空格 → `%20`
- `npm run build` passed (159 pages, 1.36s)

## Fix 4: {bug} 占位符删除 (completed)

- 11 篇文章中的 14 处 `{bug}` 独占行已全部删除
- 用户选择直接删除占位符，不恢复原始嵌入内容
- `npm run build` passed (159 pages, 1.37s)
