# Phase 5: Chat UI 国际化

## 目标

完成聊天界面的所有文案多语言支持，使 OpenChamber 能够支持全球用户。

## 具体任务清单

### 1. ChatEmptyState - 聊天空状态

**文件**: `packages/ui/src/components/chat/ChatEmptyState.tsx`

需要翻译的短语 (lines 11-28):

```
phrases = [
    "Fix the failing tests",
    "Refactor this to be more readable",
    "Add form validation",
    "Optimize this function",
    "Write tests for this",
    "Explain how this works",
    "Add a new feature",
    "Help me debug this",
    "Review my code",
    "Simplify this logic",
    "Add error handling",
    "Create a new component",
    "Update the documentation",
    "Find the bug here",
    "Improve performance",
    "Add type definitions",
]
```

### 2. 消息输入框 Placeholder

**文件**: `packages/ui/src/components/chat/ChatInput.tsx`

| 行号 | 英文文案 | 用途 |
|------|---------|------|
| 2205 | `"Enter shell command..."` | Shell 输入模式占位符 |
| 2206 | `"@ for files/agents; / for commands; ! for shell"` | 正常输入模式占位符 |
| 2207 | `"Select or create a session to start chatting"` | 新会话时占位符 |

### 3. 工具栏按钮文案

**文件**: `packages/ui/src/components/chat/ChatInput.tsx`

| 行号 | 英文文案 | 用途 |
|------|---------|------|
| 1845 | `aria-label="Send message"` | 发送按钮 |
| 1869 | `aria-label="Queue message"` | 队列消息按钮 |
| 1884 | `aria-label="Stop generating"` | 停止生成按钮 |
| 1934-1935 | `"Add attachment"` | 添加附件按钮 |
| 1970-1971 | `"Model and agent settings"` | 模型和 Agent 设置按钮 |
| 1994-1995 | `"Commands"` | 命令按钮 |
| 2113-2114 | `"Attach files"` | 移动端附件按钮 |
| 2297 | `"Toggle focus mode"` | 专注模式切换 |

### 4. 消息操作按钮

**文件**: `packages/ui/src/components/chat/message/MessageBody.tsx`

| 行号 | 英文文案 | 用途 |
|------|---------|------|
| 220-221 | `'Copied'` / `'Copy output'` | 复制输出按钮 |
| 436 | `"Revert to this message"` | 回滚消息按钮 |
| 478 | `"Copy message text"` | 复制消息按钮 |
| 495 | `"Copy message"` | 复制消息 Tooltip |
| 1141 | `"Copy message text"` | 移动端复制按钮 |
| 1163 | `"Copy answer"` | 复制答案 Tooltip |
| 1208 | `'Stop speaking'` / `'Read aloud'` | TTS 播放按钮 |

**文件**: `packages/ui/src/components/chat/message/TextSelectionMenu.tsx`

| 行号 | 英文文案 | 用途 |
|------|---------|------|
| 302 | `"Copy"` | 复制选中文本 |
| 343 | `"Add to current chat"` | 添加到当前会话 |
| 361 | `"Create new session with selection"` | 创建新会话 |

### 5. Agent 切换器文案

**文件**: `packages/ui/src/components/chat/ModelControls.tsx`

| 行号 | 英文文案 | 用途 |
|------|---------|------|
| 1492 | `"Select model"` | 选择模型标题 |
| 1501 | `"Search providers or models"` | 搜索模型占位符 |
| 1509 | `"Clear search"` | 清除搜索按钮 |
| 1720-1721 | `"Unfavorite"` / `"Add to favorites"` | 收藏按钮 |
| 1766 | `"Thinking"` | 思考中状态 |
| 1814 | `"Select agent"` | 选择 Agent 标题 |
| 2010 | label | Agent 标签 |
| 2083-2084 | `"Unfavorite"` / `"Add to favorites"` | 收藏按钮 |
| 2237 | `"Search models"` | 搜索模型占位符 |
| 2388 | `"No agent selected."` | 未选择 Agent 提示 |
| 2640 | `"Search agents"` | 搜索 Agent 占位符 |

**文件**: `packages/ui/src/components/chat/message/MessageHeader.tsx`

| 行号 | 英文文案 | 用途 |
|------|---------|------|
| 58 | `"You"` / `"Assistant"` | 消息头部用户/助手标签 |

### 6. 模型选择器文案

**文件**: `packages/ui/src/components/chat/ModelControls.tsx`

与 Agent 切换器共享上述模型相关文案。

### 7. 会话标题和描述

**文件**: `packages/ui/src/components/chat/MobileSessionStatusBar.tsx`

| 行号 | 英文文案 | 用途 |
|------|---------|------|
| 352 | `"Sub-session: ${getSessionTitle(child)}"` | 子会话标题 |

### 8. 状态文案 (打字中、正在思考等)

**文件**: `packages/ui/src/components/chat/message/parts/ReasoningPart.tsx`

| 行号 | 英文文案 | 用途 |
|------|---------|------|
| 20 | `"Thinking"` | 思考状态标签 |

**文件**: `packages/ui/src/components/chat/message/parts/WorkingPlaceholder.tsx`

| 行号 | 英文文案 | 用途 |
|------|---------|------|
| 155 | `"Retrying${countdownLabel}${attemptLabel}..."` | 重试状态文本 |

### 9. 错误消息

**文件**: `packages/ui/src/components/chat/ChatInput.tsx`

| 行号 | 英文文案 | 用途 |
|------|---------|------|
| 654 | `"Attachments are too large to send. Please try reducing the number or size of images."` | 附件过大错误 |
| 664 | `"Failed to send attachments. Try fewer files or smaller images."` | 附件发送失败 |
| 672 | `"Message failed to send. Attachments restored."` | 消息发送失败 |

**文件**: `packages/ui/src/components/chat/message/parts/ToolPart.tsx`

| 行号 | 英文文案 | 用途 |
|------|---------|------|
| 875, 906 | `"Error:"` | 工具错误标题 |
| 1096 | `"Error:"` | 工具错误标题 |

**文件**: `packages/ui/src/components/chat/message/ToolOutputDialog.tsx`

| 行号 | 英文文案 | 用途 |
|------|---------|------|
| 621 | `"Missing Mermaid source URL."` | Mermaid 错误 |
| 645 | `"Invalid local file path for Mermaid preview."` | Mermaid 错误 |
| 649 | `"Failed to read diagram file (${response.status})"` | Mermaid 错误 |
| 655 | `"Unsupported Mermaid URL protocol."` | Mermaid 错误 |
| 660 | `"Failed to load diagram (${response.status})"` | Mermaid 错误 |
| 676 | `"Unable to load Mermaid diagram."` | Mermaid 加载失败 |
| 834 | `"Loading diagram..."` | 加载中状态 |
| 840-841 | `"Unable to render Mermaid diagram."` | Mermaid 渲染失败 |
| 854 | `"Retry"` | 重试按钮 |

**文件**: `packages/ui/src/components/chat/ServerFilePicker.tsx`

| 行号 | 英文文案 | 用途 |
|------|---------|------|
| 117 | `"Failed to load directory contents"` | 加载目录失败 |

**文件**: `packages/ui/src/components/chat/TimelineDialog.tsx`

| 行号 | 英文文案 | 用途 |
|------|---------|------|
| 98 | `"Search messages..."` | 搜索消息占位符 |

**文件**: `packages/ui/src/components/chat/QuestionCard.tsx`

| 行号 | 英文文案 | 用途 |
|------|---------|------|
| 372 | `"Your answer"` | 问题答案占位符 |

**文件**: `packages/ui/src/components/chat/QueuedMessageChips.tsx`

| 行号 | 英文文案 | 用途 |
|------|---------|------|
| 36 | `"Click to edit"` | 编辑排队消息 |
| 51 | `"Remove from queue"` | 移除排队消息 |

**文件**: `packages/ui/src/components/chat/FileAttachment.tsx`

| 行号 | 英文文案 | 用途 |
|------|---------|------|
| 116 | `"Attach files"` | 添加附件 |
| 179 | `"Remove image"` | 移除图片 |
| 190 | `"Server file"` / `"Local file"` | 服务器/本地文件 |
| 209 | `"Remove file"` | 移除文件 |
| 448 | `"Open ${filename}"` | 打开文件 |
| 449 | `"Open diagram ${filename}"` | 打开图表 |

**文件**: `packages/ui/src/components/chat/MarkdownRenderer.tsx`

| 行号 | 英文文案 | 用途 |
|------|---------|------|
| 301 | `"Copy table"` | 复制表格 |
| 362 | `"Download table"` | 下载表格 |
| 520 | `"Copy"` | 复制代码 |

**文件**: `packages/ui/src/components/chat/UnifiedControlsDrawer.tsx`

| 行号 | 英文文案 | 用途 |
|------|---------|------|
| 160 | `"Controls"` | 控制面板标题 |
| 208 | `"More models"` | 更多模型 |
| 245 | `"More effort options"` | 更多努力选项 |

**文件**: `packages/ui/src/components/chat/DiffViewToggle.tsx`

| 行号 | 英文文案 | 用途 |
|------|---------|------|
| 30 | `"Switch to unified view"` / `"Switch to side-by-side view"` | 差异视图切换 |

## 翻译 Key 前缀建议

| 前缀 | 覆盖范围 |
|------|---------|
| `chat.empty.` | 空状态短语 |
| `chat.input.placeholder.` | 输入框占位符 |
| `chat.input.toolbar.` | 工具栏按钮 |
| `chat.message.copy.` | 复制操作 |
| `chat.message.edit.` | 编辑操作 |
| `chat.message.delete.` | 删除操作 |
| `chat.message.quote.` | 引用操作 |
| `chat.message.revert.` | 回滚操作 |
| `chat.agent.select.` | Agent 选择 |
| `chat.agent.search.` | Agent 搜索 |
| `chat.agent.current.` | 当前 Agent |
| `chat.model.select.` | 模型选择 |
| `chat.model.search.` | 模型搜索 |
| `chat.model.thinking.` | 思考状态 |
| `chat.status.typing.` | 打字状态 |
| `chat.status.working.` |工作中状态 |
| `chat.status.retrying.` | 重试状态 |
| `chat.error.connection.` | 连接错误 |
| `chat.error.timeout.` | 超时错误 |
| `chat.error.upload.` | 上传错误 |
| `chat.error.tool.` | 工具执行错误 |
| `chat.session.subSession.` | 子会话 |

### 详细 Key 示例

```json
{
  "chat.input.placeholder.newSession": "Select or create a session to start chatting",
  "chat.input.placeholder.shell": "Enter shell command...",
  "chat.input.placeholder.normal": "@ for files/agents; / for commands; ! for shell",
  "chat.input.toolbar.send": "Send message",
  "chat.input.toolbar.queue": "Queue message",
  "chat.input.toolbar.stop": "Stop generating",
  "chat.input.toolbar.attach": "Attach files",
  "chat.input.toolbar.settings": "Model and agent settings",
  "chat.input.toolbar.commands": "Commands",
  "chat.message.copy.text": "Copy message text",
  "chat.message.copy.answer": "Copy answer",
  "chat.message.copy.output": "Copy output",
  "chat.message.copy.copied": "Copied",
  "chat.message.edit": "Edit",
  "chat.message.delete": "Delete",
  "chat.message.revert": "Revert to this message",
  "chat.agent.select": "Select agent",
  "chat.agent.search": "Search agents",
  "chat.agent.current": "Current Agent",
  "chat.agent.none": "No agent selected.",
  "chat.model.select": "Select model",
  "chat.model.search": "Search models",
  "chat.model.thinking": "Thinking",
  "chat.status.typing": "typing...",
  "chat.status.working": "working...",
  "chat.status.retrying": "Retrying...",
  "chat.error.connection": "Connection failed",
  "chat.error.timeout": "Request timed out",
  "chat.error.attachmentsTooLarge": "Attachments are too large to send",
  "chat.error.sendFailed": "Message failed to send",
  "chat.error.toolError": "Error:"
}
```

## 需要修改的文件详细列表

### 核心聊天组件

| 文件路径 | 需要修改的内容 |
|---------|---------------|
| `packages/ui/src/components/chat/ChatEmptyState.tsx` | phrases 数组国际化 |
| `packages/ui/src/components/chat/ChatInput.tsx` | placeholder, aria-label, toast 消息 |
| `packages/ui/src/components/chat/ChatMessage.tsx` | 消息头部文案 |
| `packages/ui/src/components/chat/ChatContainer.tsx` | 滚动按钮文案 |

### 消息组件

| 文件路径 | 需要修改的内容 |
|---------|---------------|
| `packages/ui/src/components/chat/message/MessageHeader.tsx` | "You", "Assistant" 标签 |
| `packages/ui/src/components/chat/message/MessageBody.tsx` | 复制、编辑按钮文案和 Tooltip |
| `packages/ui/src/components/chat/message/TextSelectionMenu.tsx` | 文本选择菜单操作文案 |
| `packages/ui/src/components/chat/message/parts/ReasoningPart.tsx` | "Thinking" 状态 |
| `packages/ui/src/components/chat/message/parts/WorkingPlaceholder.tsx` | 重试状态文案 |
| `packages/ui/src/components/chat/message/parts/ToolPart.tsx` | 工具错误消息 |
| `packages/ui/src/components/chat/message/ToolOutputDialog.tsx` | Mermaid 错误/加载状态 |
| `packages/ui/src/components/chat/message/DiffViewToggle.tsx` | 差异视图切换提示 |

### 模型/Agent 选择器

| 文件路径 | 需要修改的内容 |
|---------|---------------|
| `packages/ui/src/components/chat/ModelControls.tsx` | 模型/Agent 选择器所有文案 |
| `packages/ui/src/components/chat/MobileModelButton.tsx` | 移动端模型按钮文案 |
| `packages/ui/src/components/chat/MobileAgentButton.tsx` | 移动端 Agent 按钮文案 |
| `packages/ui/src/components/chat/UnifiedControlsDrawer.tsx` | 控制面板标题和按钮文案 |

### 文件和附件

| 文件路径 | 需要修改的内容 |
|---------|---------------|
| `packages/ui/src/components/chat/FileAttachment.tsx` | 附件操作按钮文案 |
| `packages/ui/src/components/chat/ServerFilePicker.tsx` | 文件选择器文案和错误消息 |
| `packages/ui/src/components/chat/FileMentionAutocomplete.tsx` | 文件提及自动完成 |

### 其他组件

| 文件路径 | 需要修改的内容 |
|---------|---------------|
| `packages/ui/src/components/chat/StatusRow.tsx` | 状态栏文案 |
| `packages/ui/src/components/chat/StatusChip.tsx` | 状态标签文案 |
| `packages/ui/src/components/chat/TimelineDialog.tsx` | 时间线搜索占位符 |
| `packages/ui/src/components/chat/QuestionCard.tsx` | 问题卡片答案占位符 |
| `packages/ui/src/components/chat/QueuedMessageChips.tsx` | 排队消息操作文案 |
| `packages/ui/src/components/chat/MobileSessionStatusBar.tsx` | 移动端会话状态栏 |
| `packages/ui/src/components/chat/MarkdownRenderer.tsx` | Markdown 操作按钮 |

## 实施建议

1. **创建翻译文件结构**: 在 `packages/ui/src/i18n/` 目录下创建 `locales/` 文件夹，包含 `en.json`, `zh-CN.json` 等语言文件

2. **使用 React Context**: 创建 I18nContext 提供翻译函数，避免 prop drilling

3. **分批实施**: 建议按以下顺序实施
   - 第一批: ChatInput 和 ChatEmptyState (用户最常看到)
   - 第二批: 消息操作按钮和 Tooltip
   - 第三批: 模型/Agent 选择器
   - 第四批: 错误消息和状态文案

4. **回退机制**: 确保未翻译的语言显示英文原文

5. **测试覆盖**: 为每种语言创建 E2E 测试用例
