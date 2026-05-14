# WI-0038: Static Blog CMS Hosting Platform MVP

- work_id: WI-0038
- title: Static Blog CMS Hosting Platform MVP
- type: feature
- stage: spec
- owner: main-agent
- requester: human-owner
- created_at: 2026-05-13
- updated_at: 2026-05-13
- source_refs:
  - Conversation: CMS hosting platform architecture discussion (2026-05-13)
- current_state_ref: state.md
- artifacts:
  - spec.md
  - plan.md
  - agents.md
  - build.md
  - test.md
  - review.md
  - ship.md

## Problem

静态博客用户（Astro/Hexo/Hugo/Jekyll 等）在文章编辑、构建、部署环节面临繁琐的流程。不同框架、不同主题、不同部署目标的组合导致用户需要自行处理大量环境配置和 CI/CD 工作。目前没有一款轻量的托管 CMS 能让用户专注于内容创作，同时保留对框架、构建、部署的完全控制权。

## Desired Outcome

构建一个零运维成本的 Git-based CMS 托管平台 MVP，用户通过 Web UI 管理 Markdown 内容，平台将变更 commit 到用户自己的 GitHub 仓库并触发用户自己的 GitHub Actions 进行构建和部署。平台不碰构建、不碰部署、不存储用户内容，只做编辑和编排。

## Current Stage

`/spec`
