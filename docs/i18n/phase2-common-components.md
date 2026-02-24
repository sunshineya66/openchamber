# i18n 改造计划 - 阶段二：通用 UI 组件国际化

## 1. 目标

将 `packages/ui/src/components/ui/` 目录下的通用基础 UI 组件中的硬编码文案替换为 i18n 翻译调用，实现组件的国际化支持。

## 2. 涉及范围

- 目录：`packages/ui/src/components/ui/`
- 主要组件类型：
  - 按钮组件（Button、IconButton）
  - 表单组件（Input、Textarea、Select、NumberInput）
  - 对话框组件（Dialog、Modal）
  - 下拉菜单组件（DropdownMenu）
  - 命令面板组件（Command/CommandPalette）
  - 通知组件（Toast）
  - 加载/空状态组件（Skeleton、Loading）
  - 特殊对话框（HelpDialog、AboutDialog、OpenCodeStatusDialog）

## 3. 具体任务清单

### 3.1 Dialog 组件文案

| 文案位置 | 英文原文 | 翻译 Key |
|---------|---------|----------|
| Dialog Close 按钮 | `Close` | `ui.dialog.close` |
| Dialog 默认标题/描述 | 由使用方传入 | 支持 i18n key 作为 props |

**修改文件**：`packages/ui/src/components/ui/dialog.tsx:92`

```tsx
// 修改前
<span className="sr-only">Close</span>

// 修改后
<span className="sr-only">{t('ui.dialog.close')}</span>
```

### 3.2 Toast 通知组件文案

| 文案位置 | 英文原文 | 翻译 Key |
|---------|---------|----------|
| Success toast 按钮 | `OK` | `ui.toast.ok` |
| Info toast 按钮 | `OK` | `ui.toast.ok` |
| Error toast 按钮 | `Copy` | `ui.toast.copy` |
| Warning toast 按钮 | `Copy` | `ui.toast.copy` |

**修改文件**：`packages/ui/src/components/ui/toast.ts:54,63,72,81`

```tsx
// 修改前
label: 'OK',
label: 'Copy',

// 修改后
label: t('ui.toast.ok'),
label: t('ui.toast.copy'),
```

### 3.3 Command 组件文案

| 文案位置 | 英文原文 | 翻译 Key |
|---------|---------|----------|
| CommandDialog 标题 | `Command Palette` | `ui.command.title` |
| CommandDialog 描述 | `Search for a command to run...` | `ui.command.description` |
| CommandInput placeholder | `Type a command or search...` | `ui.command.placeholder` |
| CommandEmpty 空结果 | `No results found.` | `ui.command.empty` |

**修改文件**：`packages/ui/src/components/ui/command.tsx:38-39,82,191`

```tsx
// 修改前
title = "Command Palette"
description = "Search for a command to run..."
placeholder="Type a command or search..."
<CommandEmpty>No results found.</CommandEmpty>

// 修改后
title = {t('ui.command.title')}
description = {t('ui.command.description')}
placeholder={t('ui.command.placeholder')}
<CommandEmpty>{t('ui.command.empty')}</CommandEmpty>
```

### 3.4 NumberInput 组件文案

| 文案位置 | 英文原文 | 翻译 Key |
|---------|---------|----------|
| 减少按钮 aria-label | `Decrease value` | `ui.numberInput.decrease` |
| 增加按钮 aria-label | `Increase value` | `ui.numberInput.increase` |

**修改文件**：`packages/ui/src/components/ui/number-input.tsx:214,241,268,302`

```tsx
// 修改前
aria-label="Decrease value"
aria-label="Increase value"

// 修改后
aria-label={t('ui.numberInput.decrease')}
aria-label={t('ui.numberInput.increase')}
```

### 3.5 GridLoader 组件文案

| 文案位置 | 英文原文 | 翻译 Key |
|---------|---------|----------|
| Loading aria-label | `Loading` | `ui.loading` |

**修改文件**：`packages/ui/src/components/ui/grid-loader.tsx:27`

```tsx
// 修改前
aria-label="Loading"

// 修改后
aria-label={t('ui.loading')}
```

### 3.6 CommandPalette 组件文案

| 文案位置 | 英文原文 | 翻译 Key |
|---------|---------|----------|
| CommandItem 菜单项 | 多个动态文案 | `ui.commandPalette.*` |
| CommandGroup heading | `Actions`, `Settings`, `Theme`, `Recent Sessions` | `ui.commandPalette.group.*` |

**修改文件**：`packages/ui/src/components/ui/CommandPalette.tsx`

主要菜单项翻译 key：
- `ui.commandPalette.openSessionList`
- `ui.commandPalette.newSession`
- `ui.commandPalette.newSessionWithWorktree`
- `ui.commandPalette.toggleRightSidebar`
- `ui.commandPalette.openRightSidebarGit`
- `ui.commandPalette.openRightSidebarFiles`
- `ui.commandPalette.toggleTerminal`
- `ui.commandPalette.openSettings`
- `ui.commandPalette.toggleTheme`
- `ui.commandPalette.openTimeline`

Group headings:
- `ui.commandPalette.group.actions`
- `ui.commandPalette.group.settings`
- `ui.commandPalette.group.theme`
- `ui.commandPalette.group.recentSessions`

### 3.7 HelpDialog 组件文案

| 文案位置 | 英文原文 | 翻译 Key |
|---------|---------|----------|
| Dialog 标题 | `Keyboard Shortcuts` | `ui.help.title` |
| Dialog 描述 | `Use these keyboard shortcuts to navigate OpenChamber efficiently` | `ui.help.description` |
| 分类名称 | `Navigation & Commands`, `Session Management`, `Panels`, `Interface` | `ui.help.category.*` |
| 快捷键描述 | 多个动态文案 | `ui.help.shortcut.*` |
| Pro Tips 标题 | `Pro Tips:` | `ui.help.proTips` |
| Pro Tips 内容 | 多个动态文案 | `ui.help.proTip.*` |

**修改文件**：`packages/ui/src/components/ui/HelpDialog.tsx`

### 3.8 AboutDialog 组件文案

| 文案位置 | 英文原文 | 翻译 Key |
|---------|---------|----------|
| 应用名称 | `OpenChamber` | `ui.about.name` |
| 版本号标签 | `Version {version}` | `ui.about.version` |
| 开源声明 | `A fan-made interface for OpenCode agent` | `ui.about.description` |
| Copy diagnostics 按钮 | `Copy diagnostics` | `ui.about.copyDiagnostics` |
| Diagnostics copied | `Diagnostics copied` | `ui.about.diagnosticsCopied` |
| Preparing diagnostics | `Preparing diagnostics...` | `ui.about.preparingDiagnostics` |
| 诊断说明 | `Includes OpenChamber state, OpenCode health, directories, and projects.` | `ui.about.diagnosticsInfo` |
| Made with love | `Made with love to comunity` | `ui.about.footer` |

**修改文件**：`packages/ui/src/components/ui/AboutDialog.tsx`

### 3.9 OpenCodeStatusDialog 组件文案

| 文案位置 | 英文原文 | 翻译 Key |
|---------|---------|----------|
| Dialog 标题 | `OpenCode Status` | `ui.openCodeStatus.title` |
| Dialog 描述 | `Diagnostic snapshot for support and debugging.` | `ui.openCodeStatus.description` |
| Copy 按钮 | `Copy` | `ui.openCodeStatus.copy` |
| 无数据提示 | `No data.` | `ui.openCodeStatus.noData` |
| Toast 成功消息 | `Copied` | `ui.openCodeStatus.copied` |
| Toast 描述 | `OpenCode status copied to clipboard.` | `ui.openCodeStatus.copiedDesc` |
| Toast 错误 | `Copy failed` | `ui.openCodeStatus.copyFailed` |

**修改文件**：`packages/ui/src/components/ui/OpenCodeStatusDialog.tsx`

### 3.10 UpdateDialog 组件文案

| 文案位置 | 英文原文 | 翻译 Key |
|---------|---------|----------|
| 更新标题 | `What's new` | `ui.update.title` |

**修改文件**：`packages/ui/src/components/ui/UpdateDialog.tsx`

### 3.11 Select 组件 placeholder 支持

Select 组件本身不包含硬编码文案，但使用方可能需要 placeholder 翻译。

**建议**：在使用 Select 的组件中通过 props 传入翻译后的 placeholder。

### 3.12 表单验证错误消息

表单验证错误消息通常在业务组件中实现，建议在 `locales/en.json` 和 `locales/zh-CN.json` 中添加通用验证消息：

```json
{
  "validation": {
    "required": "This field is required",
    "minLength": "Minimum {{min}} characters required",
    "maxLength": "Maximum {{max}} characters allowed",
    "pattern": "Invalid format",
    "email": "Please enter a valid email address",
    "url": "Please enter a valid URL"
  }
}
```

## 4. 翻译 Key 命名规范

### 4.1 命名空间前缀

通用 UI 组件使用 `ui.` 前缀，结构如下：

```
ui.
├── dialog.*          # 对话框相关
├── toast.*           # 通知组件
├── command.*         # 命令面板
├── commandPalette.*  # 命令面板功能
├── numberInput.*     # 数字输入框
├── loading.*         # 加载状态
├── help.*            # 帮助对话框
├── about.*           # 关于对话框
├── openCodeStatus.*  # OpenCode 状态对话框
├── update.*          # 更新对话框
└── validation.*      # 表单验证（通用）
```

### 4.2 命名规则

- 使用 **小写字母 + 驼峰** (camelCase)
- 使用 **点分隔** 表示层级
- 保持语义清晰的命名
- 避免缩写（除非是广泛认可的如 `btn`, `desc`）

### 4.3 示例

```json
{
  "ui": {
    "dialog": {
      "close": "Close",
      "confirm": "Confirm",
      "cancel": "Cancel"
    },
    "toast": {
      "ok": "OK",
      "copy": "Copy",
      "success": "Success",
      "error": "Error",
      "warning": "Warning"
    },
    "command": {
      "title": "Command Palette",
      "description": "Search for a command to run...",
      "placeholder": "Type a command or search...",
      "empty": "No results found."
    }
  }
}
```

## 5. 涉及的源文件列表

| 文件路径 | 组件名称 | 需要修改的文案 |
|---------|---------|---------------|
| `packages/ui/src/components/ui/button.tsx` | Button | 无（纯展示组件） |
| `packages/ui/src/components/ui/input.tsx` | Input | 无（纯展示组件） |
| `packages/ui/src/components/ui/textarea.tsx` | Textarea | 无（纯展示组件） |
| `packages/ui/src/components/ui/select.tsx` | Select | 无（纯展示组件） |
| `packages/ui/src/components/ui/dialog.tsx` | Dialog | Close 按钮文案 |
| `packages/ui/src/components/ui/dropdown-menu.tsx` | DropdownMenu | 无（纯展示组件） |
| `packages/ui/src/components/ui/toast.ts` | toast | OK、Copy 按钮文案 |
| `packages/ui/src/components/ui/command.tsx` | Command | 标题、描述、placeholder、空状态 |
| `packages/ui/src/components/ui/skeleton.tsx` | Skeleton | 无（纯展示组件） |
| `packages/ui/src/components/ui/number-input.tsx` | NumberInput | aria-label 文案 |
| `packages/ui/src/components/ui/grid-loader.tsx` | GridLoader | Loading aria-label |
| `packages/ui/src/components/ui/CommandPalette.tsx` | CommandPalette | 菜单项文案、group heading |
| `packages/ui/src/components/ui/HelpDialog.tsx` | HelpDialog | 全部文案 |
| `packages/ui/src/components/ui/AboutDialog.tsx` | AboutDialog | 全部文案 |
| `packages/ui/src/components/ui/OpenCodeStatusDialog.tsx` | OpenCodeStatusDialog | 全部文案 |
| `packages/ui/src/components/ui/UpdateDialog.tsx` | UpdateDialog | "What's new" 文案 |

## 6. 实施顺序建议

1. **优先级高**（用户最常看到）
   - Dialog close 按钮
   - Toast 按钮文案
   - Command/CommandPalette 文案

2. **优先级中**
   - HelpDialog
   - AboutDialog
   - OpenCodeStatusDialog

3. **优先级低**
   - NumberInput aria-label
   - GridLoader loading
   - UpdateDialog

## 7. 注意事项

### 7.1 组件修改原则

- 保持组件的 **无状态性**，翻译通过 props 传入或使用 hook 获取
- 避免在 UI 组件内部直接调用 `useTranslation`，应在使用方处理
- 对于纯展示组件（如 Button、Input），不需要额外 i18n 处理

### 7.2 兼容性考虑

- 确保 fallback 到英文原文（i18n 配置已处理）
- 考虑文本长度变化对布局的影响
- 特殊字符和复数处理使用 i18next 内置功能

### 7.3 测试要点

- 切换语言后所有 UI 组件正确显示翻译
- 长文本翻译不会导致布局溢出
- 无状态组件在不同语言下正常工作
