# WI-0042: Fix Mobile Responsive Layout Across All Pages

- work_id: WI-0042
- title: Fix Mobile Responsive Layout Across All Pages
- type: bug
- stage: build
- owner: main-agent
- requester: human-owner
- created_at: 2026-05-14
- updated_at: 2026-05-14
- source_refs:
  - https://www.gaficat.com/posts/e19723e0/ (mobile viewport)
- current_state_ref: state.md

## Problem

博客在移动端（375px 宽度）阅读体验极差，主要问题包括：
1. 导航栏汉堡菜单点击后无反应（collapse 未正确显示）
2. 文章页 #board 在移动端两侧没有内边距
3. 代码块和长表格溢出视口
4. 文章标签/分类在窄屏上挤在一起

## Desired Outcome

所有页面在 375px–768px 移动端视口下可正常阅读和操作，导航可用，内容不溢出。

## Current Stage

`/build`
