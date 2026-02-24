# 阶段六：桌面/VSCode 运行时国际化

## 目标

完成桌面端（Tauri）和 VSCode 扩展的文案多语言支持，使运行时 UI 能够根据用户语言偏好显示对应语言的文本。

## 具体任务清单

### 1. Tauri 桌面端（packages/desktop/src-tauri/src/main.rs）

#### 1.1 菜单项文案

| 菜单位置 | 英文原文 | 翻译 Key |
|---------|---------|---------|
| 应用菜单 > About | `About {pkg_info.name}` | runtime.desktop.menu.about |
| 应用菜单 > Check for Updates | `Check for Updates` | runtime.desktop.menu.checkForUpdates |
| 应用菜单 > Settings | `Settings` | runtime.desktop.menu.settings |
| 应用菜单 > Command Palette | `Command Palette` | runtime.desktop.menu.commandPalette |
| 文件菜单 > New Window | `New Window` | runtime.desktop.menu.newWindow |
| 文件菜单 > New Session | `New Session` | runtime.desktop.menu.newSession |
| 文件菜单 > New Worktree | `New Worktree` | runtime.desktop.menu.newWorktree |
| 文件菜单 > Add Workspace | `Add Workspace` | runtime.desktop.menu.addWorkspace |
| 编辑菜单 > Copy | `Copy` | runtime.desktop.menu.copy |
| 视图菜单 > Git | `Git` | runtime.desktop.menu.viewGit |
| 视图菜单 > Diff | `Diff` | runtime.desktop.menu.viewDiff |
| 视图菜单 > Files | `Files` | runtime.desktop.menu.viewFiles |
| 视图菜单 > Terminal | `Terminal` | runtime.desktop.menu.viewTerminal |
| 视图菜单 > Theme > Light Theme | `Light Theme` | runtime.desktop.menu.themeLight |
| 视图菜单 > Theme > Dark Theme | `Dark Theme` | runtime.desktop.menu.themeDark |
| 视图菜单 > Theme > System Theme | `System Theme` | runtime.desktop.menu.themeSystem |
| 视图菜单 > Toggle Session Sidebar | `Toggle Session Sidebar` | runtime.desktop.menu.toggleSidebar |
| 视图菜单 > Toggle Memory Debug | `Toggle Memory Debug` | runtime.desktop.menu.toggleMemoryDebug |
| 帮助菜单 > Keyboard Shortcuts | `Keyboard Shortcuts` | runtime.desktop.menu.keyboardShortcuts |
| 帮助菜单 > Show Diagnostics | `Show Diagnostics` | runtime.desktop.menu.showDiagnostics |
| 帮助菜单 > Report a Bug | `Report a Bug` | runtime.desktop.menu.reportBug |
| 帮助菜单 > Request a Feature | `Request a Feature` | runtime.desktop.menu.requestFeature |
| 帮助菜单 > Join Discord | `Join Discord` | runtime.desktop.menu.joinDiscord |
| 帮助菜单 > Clear Cache | `Clear Cache` | runtime.desktop.menu.clearCache |
| Window 菜单 | `Window` | runtime.desktop.menu.window |
| Help 菜单 | `Help` | runtime.desktop.menu.help |
| File 菜单 | `File` | runtime.desktop.menu.file |
| Edit 菜单 | `Edit` | runtime.desktop.menu.edit |
| View 菜单 | `View` | runtime.desktop.menu.view |
| Theme 子菜单 | `Theme` | runtime.desktop.menu.theme |

#### 1.2 系统通知消息

| 场景 | 英文原文 | 翻译 Key |
|-----|---------|---------|
| 默认通知标题 | `OpenChamber` | runtime.desktop.notification.defaultTitle |
| 启动成功通知 | (无固定文案，从配置读取) | runtime.desktop.notification.startup |
| 更新检查通知 | (无固定文案) | runtime.desktop.notification.update |

#### 1.3 托盘菜单

托盘功能当前代码中未实现，文档记录以供未来参考：
- 托盘菜单项需要添加多语言支持
- 托盘提示文本（tooltip）

#### 1.4 错误消息

| 场景 | 英文原文 | 翻译 Key |
|-----|---------|---------|
| 清除缓存失败 | `Failed to clear browsing data for some windows: {failures}` | runtime.desktop.error.clearCache |
| 平台不支持 | `desktop_clear_cache is only supported on macOS` | runtime.desktop.error.platformNotSupported |
| 路径为空 | `Path is required` | runtime.desktop.error.pathRequired |

### 2. VSCode 扩展（packages/vscode/）

#### 2.1 package.json 中的 Command 名称

| Command ID | 英文 Title | 翻译 Key |
|------------|-----------|---------|
| openchamber.openSidebar | `Open Sidebar` | runtime.vscode.command.openSidebar |
| openchamber.focusChat | `Focus Chat` | runtime.vscode.command.focusChat |
| openchamber.restartApi | `Restart API Connection` | runtime.vscode.command.restartApi |
| openchamber.showOpenCodeStatus | `Show OpenCode Status` | runtime.vscode.command.showOpenCodeStatus |
| openchamber.openAgentManager | `Open Agent Manager` | runtime.vscode.command.openAgentManager |
| openchamber.openActiveSessionInEditor | `Open Active Session in Editor` | runtime.vscode.command.openActiveSessionInEditor |
| openchamber.openNewSessionInEditor | `Open New Session in Editor` | runtime.vscode.command.openNewSessionInEditor |
| openchamber.openCurrentOrNewSessionInEditor | `Open Session in Editor` | runtime.vscode.command.openSessionInEditor |
| openchamber.addToContext | `Add to Context` | runtime.vscode.command.addToContext |
| openchamber.explain | `Explain` | runtime.vscode.command.explain |
| openchamber.improveCode | `Improve Code` | runtime.vscode.command.improveCode |
| openchamber.newSession | `New Session` | runtime.vscode.command.newSession |
| openchamber.showSettings | `Settings` | runtime.vscode.command.showSettings |

#### 2.2 Views 和 Containers

| Element | 英文原文 | 翻译 Key |
|---------|---------|---------|
| Activity Bar 标题 | `OpenChamber` | runtime.vscode.view.activityBarTitle |
| Chat View 名称 | `Chat` | runtime.vscode.view.chatViewName |

#### 2.3 菜单项文案

| 菜单位置 | 场景 | 翻译 Key |
|---------|------|---------|
| Editor Context Menu | OpenChamber 子菜单 | runtime.vscode.menu.editorContext |
| Editor Title Menu | 新建会话按钮 | runtime.vscode.menu.editorTitle |
| View Title Menu | 会话管理按钮 | runtime.vscode.menu.viewTitle |

#### 2.4 Webview 文案（packages/vscode/webview/main.tsx）

| 场景 | 英文原文 | 翻译 Key |
|-----|---------|---------|
| 初始加载状态 | `Starting OpenCode API…` | runtime.vscode.webview.starting |
| 加载数据进度 | `Loading data (${providersText}, ${agentsText})…` | runtime.vscode.webview.loadingData |
| 数据加载完成 - Providers | `✓ Providers` | runtime.vscode.webview.providersLoaded |
| 数据加载中 - Providers | `… Providers` | runtime.vscode.webview.providersLoading |
| 数据加载完成 - Agents | `✓ Agents` | runtime.vscode.webview.agentsLoaded |
| 数据加载中 - Agents | `… Agents` | runtime.vscode.webview.agentsLoading |
| OpenCode 已连接但初始数据加载失败 | `OpenCode connected, but initial data load failed.` | runtime.vscode.webview.dataLoadFailed |
| 连接错误 | `Connection error` | runtime.vscode.webview.connectionError |
| 断开连接 | `Disconnected` | runtime.vscode.webview.disconnected |

#### 2.5 状态栏文案

当前代码中未实现 VSCode 状态栏项，未来实现时需添加：
- `runtime.vscode.statusBar.connected`
- `runtime.vscode.statusBar.connecting`
- `runtime.vscode.statusBar.error`

#### 2.6 错误消息（packages/vscode/src/extension.ts）

| 场景 | 英文原文 | 翻译 Key |
|-----|---------|---------|
| 打开侧边栏失败 | `OpenChamber: Failed to open sidebar - ${e}` | runtime.vscode.error.openSidebar |
| 无活动会话 | `OpenChamber: No active session` | runtime.vscode.error.noActiveSession |
| API 重启成功 | `OpenChamber: API connection restarted` | runtime.vscode.error.apiRestartSuccess |
| API 重启失败 | `OpenChamber: Failed to restart API - ${e}` | runtime.vscode.error.apiRestartFailed |
| 无活动编辑器 | `OpenChamber [Add to Context]: No active editor` | runtime.vscode.error.noActiveEditor |
| 未选择文本 | `OpenChamber [Add to Context]: No text selected` | runtime.vscode.error.noTextSelected |
| Explain - 无活动编辑器 | `OpenChamber [Explain]: No active editor` | runtime.vscode.error.explainNoEditor |
| Improve Code - 无活动编辑器 | `OpenChamber [Improve Code]: No active editor` | runtime.vscode.error.improveNoEditor |
| Improve Code - 未选择文本 | `OpenChamber [Improve Code]: No text selected` | runtime.vscode.error.improveNoSelection |

### 3. Web 服务器错误消息

Web 服务器的错误消息在 `packages/web/server/` 中定义，主要包括：

| 文件 | 错误类型 | 翻译 Key 前缀 |
|-----|---------|--------------|
| lib/tts-service.js | TTS 相关错误 | runtime.web.tts.* |
| lib/skills-catalog/install.js | Skills 安装错误 | runtime.web.skills.install.* |
| lib/package-manager.js | 包管理错误 | runtime.web.package.* |
| lib/opencode/skills.js | Skills 配置错误 | runtime.web.config.skills.* |
| lib/opencode/providers.js | Provider 配置错误 | runtime.web.config.providers.* |
| lib/opencode/mcp.js | MCP 配置错误 | runtime.web.config.mcp.* |
| lib/opencode/auth.js | 认证配置错误 | runtime.web.config.auth.* |
| lib/opencode/commands.js | Commands 配置错误 | runtime.web.config.commands.* |
| lib/opencode/agents.js | Agents 配置错误 | runtime.web.config.agents.* |
| lib/git/service.js | Git 操作错误 | runtime.web.git.* |
| lib/github/auth.js | GitHub 认证错误 | runtime.web.github.auth.* |
| index.js | 服务器启动/运行错误 | runtime.web.server.* |

## 翻译 Key 前缀规范

| 运行时 | Key 前缀 |
|-------|---------|
| Tauri 桌面端 | `runtime.desktop.` |
| VSCode 扩展 | `runtime.vscode.` |
| Web 服务器 | `runtime.web.` |

子层级划分：
- `runtime.desktop.menu.*` - 菜单项
- `runtime.desktop.notification.*` - 系统通知
- `runtime.desktop.error.*` - 错误消息
- `runtime.vscode.command.*` - Command titles
- `runtime.vscode.view.*` - View/Container 标题
- `runtime.vscode.menu.*` - 菜单项
- `runtime.vscode.webview.*` - Webview 文案
- `runtime.vscode.statusBar.*` - 状态栏文案
- `runtime.vscode.error.*` - 错误消息
- `runtime.web.*` - Web 服务器错误

## 需要修改的文件详细列表

### 核心文件

1. **packages/desktop/src-tauri/src/main.rs**
   - 替换所有硬编码的菜单项字符串
   - 添加翻译 key 获取逻辑

2. **packages/vscode/package.json**
   - Command titles
   - View/Container titles

3. **packages/vscode/src/extension.ts**
   - 所有 `showInformationMessage`、`showErrorMessage`、`showWarningMessage` 调用

4. **packages/vscode/webview/main.tsx**
   - 加载状态文本
   - 错误状态文本

### 需要新增的文件

1. **packages/desktop/src-tauri/src/i18n.rs** (新增)
   - 桌面端翻译 key 定义和获取函数

2. **packages/vscode/src/i18n.ts** (新增)
   - VSCode 扩展翻译 key 定义

3. **locales/desktop/en.json** (在 i18n 根目录)
   - 桌面端英文翻译

4. **locales/vscode/en.json** (在 i18n 根目录)
   - VSCode 英文翻译

## 运行时特殊考虑

### 1. Tauri 桌面端

**挑战**：
- Tauri 使用 Rust 后端，菜单项在编译时定义
- 无法像 Web 端那样动态加载翻译

**解决方案**：
- 在 `main.rs` 中定义翻译 key 常量
- 通过 Tauri 命令 (`invoke`) 从前端获取翻译后的字符串
- 菜单构建时调用前端 API 获取对应语言的菜单文本

**实现步骤**：
1. 在 Rust 中定义所有菜单项的 key
2. 在前端 (packages/ui) 创建翻译获取 API
3. 桌面端启动时加载翻译
4. 动态构建菜单时调用翻译 API

### 2. VSCode 扩展

**挑战**：
- VSCode 命令标题在 `package.json` 中静态定义
- VSCode Marketplace 对国际化支持有限

**解决方案**：
- **方案 A（推荐）**：使用 VSCode 内置的 i18n 机制
  - 在扩展根目录创建 `package.nls.json` 文件
  - 在 `package.json` 中使用 `%key%` 语法引用翻译字符串
  - 示例：`"title": "%openchamber.sidebar%"`

- **方案 B**：动态注册命令
  - 在 `extension.ts` 中使用 `registerCommand` 动态注册
  - 可在运行时获取翻译后的标题

**VSCode i18n 文件结构**：
```
packages/vscode/
├── package.json
├── package.nls.json          # 默认英文
├── package.nls.zh-cn.json    # 简体中文
└── ...
```

**Webview 翻译**：
- Webview 使用 React UI，可以复用现有 i18n 系统
- 需要在 webview 启动时注入当前语言设置

### 3. Web 服务器

**挑战**：
- 错误消息在 Node.js/Express 后端生成
- 需要支持多语言错误响应

**解决方案**：
- 创建错误消息翻译模块
- 根据请求头或配置确定语言
- 返回对应语言的错误消息

### 4. 翻译加载策略

**桌面端**：
```
1. 应用启动
2. 读取用户语言设置
3. 加载对应语言包
4. 构建菜单时使用翻译后的字符串
```

**VSCode 扩展**：
```
1. 扩展激活
2. VSCode 自动加载 package.nls.*.json
3. Command title 由 VSCode 自动处理
4. Webview 通过 postMessage 获取语言设置
```

## 实现优先级

1. **高优先级**：
   - VSCode `package.json` 命令标题（使用 package.nls 机制）
   - VSCode extension.ts 中的用户可见消息
   - Tauri 菜单项（核心菜单）

2. **中优先级**：
   - Tauri 系统通知
   - Webview 加载状态文案
   - Web 服务器核心错误消息

3. **低优先级**：
   - 托盘菜单（未来功能）
   - 状态栏文案（未来功能）
   - 边缘情况错误消息

## 验收标准

- [ ] Tauri 桌面端主菜单所有项支持多语言
- [ ] VSCode 支持多语言
- [ ] VSCode extension.ts 所有 command title 中所有用户消息支持多语言
- [ ] Webview 加载状态文案支持多语言
- [ ] Web 服务器核心错误消息支持多语言
- [ ] 语言切换后运行时无需重启即可生效（桌面端）
