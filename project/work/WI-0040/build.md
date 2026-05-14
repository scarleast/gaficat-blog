# /build

- work_id: WI-0040
- stage: build
- status: passed
- owner: main-agent
- updated_at: 2026-05-14

## Changes

### Fix 1: sspai CDN → gaficat CDN（4 张图）

- File: `source/_posts/tutorial/甲醛熏得人头痛？我做了一个TVOC传感器.md`
- 4 处 `cdn.sspai.com` URL 替换为 `pic.gaficat.com/maker/` 用户提供的新地址
- 替换图已通过 HTTP 200 验证

### Fix 2: gaficat CDN 404 删除引用（1 张图）

- File: `source/_posts/life/迷惘的26岁.md`
- 删除 L17 `<img>` 标签（VZOO知行合一.png，CDN 404）

### Fix 3: URL 空格编码（3 处）

- `source/_posts/tutorial/如何用51单片机控制舵机加减速.md:40` — 空格 → `%20`
- `source/_posts/knowledge/教育产业化，穷人还有机会吗？.md:51` — 空格 → `%20`
- `source/_posts/tutorial/用telegram订阅twitter.md:66` — 空格 → `%20`

### Fix 4: {bug} 占位符删除（14 处）

- 11 个文件中的 14 处 `{bug}` 独占行全部删除

## Build Evidence

```
npm run build → 159 page(s) built in 1.37s — Complete!
```
