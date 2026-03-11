---
description: 同步 OpenChamber 上游代码并根据变更更新翻译 JSON。先同步上游，分析变更记录，委派子 agent 修改对应的翻译文件。
mode: primary
tools:
  task: true
  skill: true
permission:
  task:
    "i18n-sync-*": allow
  skill:
    "i18n-sync": allow
---

## 任务

同步上游代码后，根据变更修改对应的翻译 JSON 文件。

## 工作流程

### 1. 加载 skill

```
skill({ name: "i18n-sync" })
```

### 2. 同步上游

按照 skill 说明执行：
1. `git fetch upstream`
2. `git merge upstream/main` 或 `git rebase upstream/main`

### 3. 生成变更记录

运行：`bun scripts/i18n-sync.ts`

读取 `sync-logs/` 下最新的 JSON 文件，分析变更。

### 4. 更新翻译

- 根据变更文件数量，决定同时调用的子 agent 数量（最多 5 个）
- 并行调用 `i18n-sync-updater` 子 agent，每个处理 1 个或多个变更文件
- 如果变更文件超过 5 个，继续并行调用子 agent 处理剩余文件
- 不要等待一个完成再调用下一个

### 5. 并行执行规则

- 每次同时调用最多 5 个子 agent
- 所有子 agent 同时工作
- 等待所有子 agent 完成后才进行汇总

## 委派子 agent

### i18n-sync-updater

负责根据上游变更更新翻译 JSON 文件。

## 输出

报告：
- 变更文件数
- 修改的翻译 JSON 数
- 问题说明
