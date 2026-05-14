# /ship

- work_id: WI-0040
- stage: ship
- status: closed
- owner: main-agent
- updated_at: 2026-05-14

## Ship Summary

Post Media Asset Integrity Check — 全部 4 类媒体引用问题已修复。

## Changes Delivered

1. **Fix 1**: 甲醛TVOC文章 4 张 sspai CDN 图片替换为 gaficat CDN
2. **Fix 2**: 迷惘的26岁文章 1 张 404 图片引用删除
3. **Fix 3**: 3 个含未编码空格的 CDN URL 已编码
4. **Fix 4**: 11 篇文章中 14 处 {bug} 占位符已清除

## Files Changed (15 files)

- `source/_posts/tutorial/甲醛熏得人头痛？我做了一个TVOC传感器.md`
- `source/_posts/life/迷惘的26岁.md`
- `source/_posts/tutorial/如何用51单片机控制舵机加减速.md`
- `source/_posts/knowledge/教育产业化，穷人还有机会吗？.md`
- `source/_posts/tutorial/用telegram订阅twitter.md`
- `source/_posts/reading_notes/《向上生长》，小步快跑.md`
- `source/_posts/reading_notes/《向上生长》——2021-09-21.md`
- `source/_posts/life/关于生活.md`
- `source/_posts/life/祝我生日快乐.md`
- `source/_posts/life/工作快满三年时的那些惑.md`
- `source/_posts/life/今天阳光挺好，出去走走？.md`
- `source/_posts/life/特殊的十一.md`
- `source/_posts/life/当你老了，又成了谁的累赘.md`
- `source/_posts/life/转来转去还是在社会底层.md`
- `source/_posts/life/2019年11月最后一周的小日记.md`
- `source/_posts/music/music_theory/加菲猫的乐理学习笔记（四）——音的分组.md`

## Final Build

```
npm run build → 159 page(s) built in 1.37s — Complete!
```

## Closure

WI-0040 完成。所有文章媒体引用问题已修复，build 通过，无回归。
