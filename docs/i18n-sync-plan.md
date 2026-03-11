# i18n 同步方案

## 背景

本项目 fork 自上游 OpenCode 项目。上游项目未进行 i18n，每次从上游更新代码时，传统的单一翻译文件（如 `en.json`）难以精确处理变更，容易产生冲突。

本方案通过文件级别的翻译组织，实现精细化的翻译管理。

## 核心思路

1. **翻译文件按源文件一一对应** - 每个源文件对应一个翻译 JSON
2. **构建时替换** - 不修改源码，通过构建工具将硬编码字符串替换为翻译文本
3. **同步记录** - 自动记录上游变更，精准定位需要更新的翻译

## 目录结构

```
locales/
├── packages/
│   └── ui/
│       └── src/
│           ├── components/
│           │   ├── Button.tsx.json
│           │   ├── ChatView.tsx.json
│           │   └── ...
│           ├── views/
│           │   └── SettingsView.tsx.json
│           └── ...
```

翻译 JSON 示例：
```json
{
  "Save": "保存",
  "Cancel": "取消",
  "Confirm": "确认"
}
```

## 脚本说明

### 1. 同步脚本 `scripts/i18n-sync.ts`

**功能：**
- 自动拉取上游代码（git fetch + merge/rebase）
- 对比上次同步的 commit，生成变更记录

**命令：**
```bash
bun scripts/i18n-sync.ts
```

**输出：**
同步记录文件保存至 `sync-logs/YYYY-MM-DD.json`：
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

### 2. 构建脚本 `scripts/i18n-build.ts`

**功能：**
- 扫描源码中的硬编码字符串
- 使用 AST 精确匹配（只处理 JSX 文本节点）
- 用翻译 JSON 替换为对应语言的文本
- 源码不修改，替换结果输出到 `dist/` 或指定目录

**命令：**
```bash
bun scripts/i18n-build.ts
```

**匹配规则：**
- 只替换 JSX 文本节点中的字符串（如 `<Button>Save</Button>`）
- 排除代码中的字符串（变量名、函数名、导入路径等）
- 支持 `.tsx`, `.ts`, `.jsx`, `.js` 文件

## 工作流程

```
1. 同步上游
   bun scripts/i18n-sync.ts
   
   → 自动拉取上游代码
   → 生成变更记录文件

2. 更新翻译
   查看 sync-logs/ 下的变更记录
   → 定位修改的文件
   → 手动修改对应的翻译 JSON

3. 构建项目
   bun scripts/i18n-build.ts
   
   → 替换硬编码字符串为翻译文本
   → 生成最终构建产物
```

## 上游同步配置

### 添加上游 remote

```bash
# 添加上游仓库
git remote add upstream https://github.com/btriapitsyn/openchamber.git

# 查看 remotes
git remote -v
```

### 同步命令

```bash
# 获取上游最新
git fetch upstream

# 合并到当前分支
git merge upstream/main

# 或者使用 rebase
git rebase upstream/main
```

## 注意事项

1. 翻译 key 使用源语言原文（如 "Save"），便于对照
2. 构建替换使用 AST 解析，避免误替换代码中的字符串
3. 同步记录文件可作为变更追踪的历史记录
4. 翻译文件放在项目根目录 `locales/`，避免与上游代码冲突
