# /spec

- work_id: WI-0040
- stage: plan
- status: closed
- owner: main-agent
- updated_at: 2026-05-13

## Goal

Audit all post markdown files for media references (images, audio, video) and verify CDN accessibility. Identify all broken or missing media assets.

## Audit Results

### Media Landscape

- **All media is hosted externally on CDN** — no local media files in the repo
- CDN domains: `pic.gaficat.com` (images/video), `music.gaficat.com` (audio)
- Total unique CDN media URLs: **154**
- Total media references across all posts: **156**
- Posts containing media: **44 of 90**

### Reference Patterns Found

| Pattern | Count | Files |
|---------|-------|-------|
| Markdown images `![alt](url)` | 78 | 30 |
| HTML `<img src>` | 70 | 18 |
| Hexo `{% audio %}` shortcode | 11 | 2 |
| Hexo `{% video %}` shortcode | 1 | 1 |
| `{bug}` placeholder | 14 | 11 |

### CDN Accessibility Check

| Status | Count | Details |
|--------|-------|---------|
| HTTP 200 (gaficat CDN) | 150 | pic.gaficat.com / music.gaficat.com |
| HTTP 200 (语雀 CDN) | 1 | cdn.nlark.com — accessible |
| HTTP 404 (gaficat CDN) | 1 | 文件不存在 |
| Connection failed (sspai CDN) | 4 | cdn.sspai.com — 全部超时/不可达 |
| Unencoded spaces in URL | 3 | CDN 返回 200 但渲染器可能无法处理 |
| Tutorial placeholder URLs | 2 | sample.com — 教程示例，非真实图片 |

**防盗链检查**: gaficat.com CDN 无 Referer 防盗链，localhost 和外部 Referer 均返回 200。

### Issues Found

#### 1. sspai CDN 完全不可用（4 张图片，Connection failed）

| File | Line | URL |
|------|------|-----|
| `tutorial/甲醛熏得人头痛？我做了一个TVOC传感器.md` | 18 | `https://cdn.sspai.com/2019/08/21/6a0f6d2790cb7bfd617e67b6d947488d.jpeg` |
| `tutorial/甲醛熏得人头痛？我做了一个TVOC传感器.md` | 23 | `https://cdn.sspai.com/2019/08/21/501741da7c379a4b703bd5468dbb677f.jpeg` |
| `tutorial/甲醛熏得人头痛？我做了一个TVOC传感器.md` | 32 | `https://cdn.sspai.com/2019/08/21/b16b887ed41f3a88e65630f7917ffa66.png` |
| `tutorial/甲醛熏得人头痛？我做了一个TVOC传感器.md` | 52 | `https://cdn.sspai.com/2019/08/21/6672cc6481ecc8facb866359926afe48.png` |

> 历史记录：WI-0027 已标记为技术债务，当时未处理。

#### 2. gaficat CDN 404（1 张图片）

| File | Line | URL |
|------|------|-----|
| `life/迷惘的26岁.md` | 17 | `https://pic.gaficat.com/生活想法/VZOO知行合一.png` |

#### 3. URL 含未编码空格（3 处）

| File | Line | URL |
|------|------|-----|
| `tutorial/如何用51单片机控制舵机加加速.md` | 40 | `https://pic.gaficat.com/default/ 减速电机.jpg` |
| `knowledge/教育产业化，穷人还有机会吗？.md` | 51 | `https://pic.gaficat.com/default/ 有电危险的喵.jpeg` |
| `tutorial/用telegram订阅twitter.md` | 66 | `https://pic.gaficat.com/default/IFTTT-THEN THAT.png` |

#### 4. `{bug}` 占位符（14 处，分布在 11 篇文章）

疑似从 Hexo 迁移时未正确处理的视频/音频嵌入标记：

- `reading_notes/《向上生长》，小步快跑.md` — 1 处
- `reading_notes/《向上生长》——2021-09-21.md` — 1 处
- `life/关于生活.md` — 1 处
- `life/祝我生日快乐.md` — 1 处
- `life/工作快满三年时的那些惑.md` — 2 处
- `life/今天阳光挺好，出去走走？.md` — 1 处
- `life/特殊的十一.md` — 3 处
- `life/当你老了，又成了谁的累赘.md` — 1 处
- `life/转来转去还是在社会底层.md` — 1 处
- `life/2019年11月最后一周的小日记.md` — 1 处
- `music/music_theory/加菲猫的乐理学习笔记（四）——音的分组.md` — 1 处

### No Local Media Files

- Zero relative-path media references found in any post
- All 154 unique media URLs point to CDN (`pic.gaficat.com` or `music.gaficat.com`)
- No media files exist in the repository itself

## Scope

1. Fix 1 broken CDN 404 link
2. Fix 3 URLs with unencoded spaces
3. Assess `{bug}` placeholders — determine intended content

## Non-goals

- Do not migrate CDN media to local storage
- Do not restructure media URLs
- Do not modify posts without media issues

## Exit Criteria

- All issues catalogued and categorized
- Severity assessed
