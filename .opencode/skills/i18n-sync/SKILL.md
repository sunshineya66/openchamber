---
name: i18n-sync
description: 同步 OpenChamber 上游代码并生成翻译变更记录。必须在每次从上游拉取代码后使用此 skill，以便生成变更记录并指导翻译文件的更新。包含 i18n-sync.ts 同步脚本和 i18n-build.ts 构建脚本的执行。
license: MIT
compatibility: opencode
---

## 概述

这个 skill 用于从上游仓库（https://github.com/btriapitsyn/openchamber.git）同步代码变更，并生成详细的翻译变更记录。

## 使用场景

- 用户说"同步上游"、"拉取上游更新"、"update from upstream"
- 用户说"更新翻译"、"翻译变更"
- 用户运行了 `git pull` 或 `git merge upstream/main` 之后

## 上游仓库

- URL: https://github.com/btriapitsyn/openchamber.git
- Remote 名称: upstream

## 工作流程

### 1. 同步上游代码

如果上游 remote 尚未添加，先添加：

```bash
git remote add upstream https://github.com/btriapitsyn/openchamber.git
```

然后同步：

```bash
git fetch upstream
git merge upstream/main
# 或 git rebase upstream/main
```

### 2. 生成变更记录

运行同步脚本：

```bash
bun scripts/i18n-sync.ts
```

脚本位置：`scripts/i18n-sync.ts`

这会：
1. 对比上次同步的 commit
2. 生成变更记录文件到 `sync-logs/YYYY-MM-DD.json`

### 3. 查看变更记录

变更记录格式：

```json
{
  "syncDate": "2026-02-26",
  "upstreamCommit": "abc123",
  "changes": [
    {
      "file": "packages/ui/src/components/Button.tsx",
      "diff": "具体的 git diff 内容"
    }
  ]
}
```

### 4. 更新翻译文件

根据变更记录，修改对应的翻译 JSON 文件：

- 翻译文件位置：`locales/<源文件相对路径>.json`
- 例如：`locales/packages/ui/src/components/Button.tsx.json`

### 5. 构建项目

运行构建脚本：

```bash
bun scripts/i18n-build.ts
```

脚本位置：`scripts/i18n-build.ts`

## 脚本说明

### i18n-sync.ts

- 自动记录上游变更
- 生成同步记录到 `sync-logs/`
- 对比上次 commit 和当前 commit 的差异

### i18n-build.ts

- 扫描源码中的硬编码字符串
- 使用 AST 精确匹配 JSX 文本节点
- 用翻译 JSON 替换为对应语言的文本
- 源码不修改，替换结果输出到构建目录
