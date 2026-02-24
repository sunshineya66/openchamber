# i18n 改造计划 - 阶段三：设置页面（Settings）国际化

## 1. 目标

完成 Settings 页面所有文案的多语言支持，包括左侧导航菜单、各个设置子页面的标题、描述、按钮、提示等全部文本内容。

## 2. 涉及范围

- `packages/ui/src/components/views/SettingsView.tsx` - 设置主页面
- `packages/ui/src/lib/settings/metadata.ts` - 设置页面元数据（标题、描述）
- `packages/ui/src/components/sections/openchamber/` - OpenChamber 内置设置页面
- `packages/ui/src/components/sections/projects/` - 项目设置
- `packages/ui/src/components/sections/providers/` - 模型提供商设置
- `packages/ui/src/components/sections/usage/` - 使用统计
- `packages/ui/src/components/sections/agents/` - Agent 设置
- `packages/ui/src/components/sections/commands/` - 命令设置
- `packages/ui/src/components/sections/mcp/` - MCP 设置
- `packages/ui/src/components/sections/skills/` - 技能设置
- `packages/ui/src/components/sections/git-identities/` - Git 身份设置
- `packages/ui/src/components/sections/shared/` - 共享设置组件

## 3. 具体任务清单

### 3.1 左侧导航菜单项翻译

| 页面 Slug | 当前英文 | 翻译 Key 建议 |
|-----------|----------|---------------|
| `home` | Settings | `settings.nav.home` |
| `projects` | Projects | `settings.nav.projects` |
| `appearance` | Appearance | `settings.nav.appearance` |
| `chat` | Chat | `settings.nav.chat` |
| `notifications` | Notifications | `settings.nav.notifications` |
| `sessions` | Sessions | `settings.nav.sessions` |
| `shortcuts` | Shortcuts | `settings.nav.shortcuts` |
| `git` | Git | `settings.nav.git` |
| `agents` | Agents | `settings.nav.agents` |
| `commands` | Commands | `settings.nav.commands` |
| `mcp` | MCP | `settings.nav.mcp` |
| `providers` | Providers | `settings.nav.providers` |
| `usage` | Usage | `settings.nav.usage` |
| `skills.installed` | Skills | `settings.nav.skillsInstalled` |
| `skills.catalog` | Skills Catalog | `settings.nav.skillsCatalog` |
| `voice` | Voice | `settings.nav.voice` |

**附加导航项**：
- "Reload OpenCode" → `settings.nav.reloadOpencode`
- "Jump to common pages" (首页描述) → `settings.home.jumpTo`

### 3.2 Settings 首页快速入口卡片

位置：`SettingsView.tsx` 的 `SettingsHome` 组件

| 入口 | 标题 | 描述 | 翻译 Key |
|------|------|------|----------|
| Providers | Providers | Connect models + credentials | `settings.home.providers.title` / `settings.home.providers.description` |
| Agents | Agents | Prompts, tools, permissions | `settings.home.agents.title` / `settings.home.agents.description` |
| Skills Catalog | Skills Catalog | Install skills from catalogs | `settings.home.skillsCatalog.title` / `settings.home.skillsCatalog.description` |
| MCP | MCP | Configure MCP servers + connections | `settings.home.mcp.title` / `settings.home.mcp.description` |
| Usage | Usage | Quota + spend visibility | `settings.home.usage.title` / `settings.home.usage.description` |

### 3.3 Appearance 设置（外观）

文件：`packages/ui/src/components/sections/openchamber/OpenChamberVisualSettings.tsx`

**Color Mode 部分**：
- "Color Mode" → `settings.appearance.colorMode`
- "Light Theme" → `settings.appearance.lightTheme`
- "Dark Theme" → `settings.appearance.darkTheme`
- "Select theme" → `settings.appearance.selectTheme`
- "Reload themes" → `settings.appearance.reloadThemes`
- Tooltip: "Import custom themes from ~/.config/openchamber/themes/" → `settings.appearance.themeImportHint`

**UI Scaling & Layout 部分**：
- "Interface Font Size" → `settings.appearance.interfaceFontSize`
- "Terminal Font Size" → `settings.appearance.terminalFontSize`
- "Spacing Density" → `settings.appearance.spacingDensity`
- "Corner Radius" → `settings.appearance.cornerRadius`
- "Input Bar Offset" → `settings.appearance.inputBarOffset`
- Tooltip: "Raise input bar to avoid OS-level screen obstructions like home bars." → `settings.appearance.inputBarOffsetHint`
- "Reset" → `common.reset`

### 3.4 Chat 设置（对话行为）

文件：`OpenChamberVisualSettings.tsx` 的 toolOutput, diffLayout 等设置

- "Default Tool Output" → `settings.chat.defaultToolOutput`
- "Collapsed" → `settings.chat.toolExpansion.collapsed`
- "Summary" → `settings.chat.toolExpansion.summary`
- "Detailed" → `settings.chat.toolExpansion.detailed`
- "Diff Layout" → `settings.chat.diffLayout`
- "Dynamic" → `settings.chat.diffLayout.dynamic`
- "Always inline" → `settings.chat.diffLayout.inline`
- "Always side-by-side" → `settings.chat.diffLayout.sideBySide`
- "Diff View Mode" → `settings.chat.diffViewMode`
- "Single file" → `settings.chat.diffViewMode.single`
- "All files" → `settings.chat.diffViewMode.all`
- "Show Mobile Status Bar" → `settings.chat.mobileStatusBar`
- "Show Dotfiles" → `settings.chat.showDotfiles`
- "Queue Messages by Default" → `settings.chat.queueMessages`
- Tooltip: "When enabled, Enter queues messages. Use {mod}+Enter to send." → `settings.chat.queueMessagesHint`
- "Persist Draft Messages" → `settings.chat.persistDraft`
- "Show Reasoning Traces" → `settings.chat.reasoningTraces`
- "Show Justification Activity" → `settings.chat.justificationActivity`
- "Terminal Quick Keys" → `settings.chat.terminalQuickKeys`
- Tooltip: "Show Esc, Ctrl, Arrows in terminal view" → `settings.chat.terminalQuickKeysHint`

### 3.5 Notifications 设置（通知）

文件：`packages/ui/src/components/sections/openchamber/NotificationSettings.tsx`

**Notification Delivery**：
- "Notification Delivery" → `settings.notifications.delivery`
- "Enable Notifications" → `settings.notifications.enable`
- "Notify While App is Focused" → `settings.notifications.whileFocused`
- Browser hint: "Your browser may ask for permission the first time." → `settings.notifications.browserHint`
- "Notification permission denied. Enable it in your browser settings." → `settings.notifications.permissionDenied`
- "Permission granted, but notifications are disabled." → `settings.notifications.permissionGrantedDisabled`
- "VS Code runtime handles notifications separately natively." → `settings.notifications.vscodeHint`

**Notification Events**：
- "Notification Events" → `settings.notifications.events`
- "Agent Completion" → `settings.notifications.agentCompletion`
- "Subagent Completion" → `settings.notifications.subagentCompletion`
- "Agent Errors" → `settings.notifications.agentErrors`
- "Agent Questions" → `settings.notifications.agentQuestions`

**Notification Templates**：
- "Notification Templates" → `settings.notifications.templates`
- "Variables:" → `settings.notifications.variables`
- "Title" → `settings.notifications.title`
- "Message" → `settings.notifications.message`

**AI Summarization**：
- "AI Summarization" → `settings.notifications.summarization`
- "Summarize Last Message" → `settings.notifications.summarizeLastMessage`
- "Threshold" → `settings.notifications.threshold`
- "Messages longer than this will be summarized" → `settings.notifications.thresholdHint`
- "Length" → `settings.notifications.length`
- "Target character length of the summary" → `settings.notifications.lengthHint`
- "Max Length" → `settings.notifications.maxLength`
- "Truncate {last_message} to this length" → `settings.notifications.maxLengthHint`

**Background Push Notifications**：
- "Background Push Notifications" → `settings.notifications.push`
- "Enable push notifications" → `settings.notifications.pushEnable`
- "Push not supported. Desktop Chrome/Edge and Android support push. iOS requires an installed PWA." → `settings.notifications.pushNotSupported`
- "Receive alerts via your operating system background service" → `settings.notifications.pushDescription`

### 3.6 Sessions 设置（会话）

文件：`packages/ui/src/components/sections/openchamber/SessionRetentionSettings.tsx`

- "Session Retention" → `settings.sessions.retention`
- Tooltip: "Automatically delete inactive sessions based on their last activity. Keeps recent 5 sessions." → `settings.sessions.retentionHint`
- "Enable Auto-Cleanup" → `settings.sessions.autoCleanup`
- "Retention Period" → `settings.sessions.retentionPeriod`
- "days" → `settings.sessions.days`
- "Manual Cleanup" → `settings.sessions.manualCleanup`
- "Run cleanup now" → `settings.sessions.runCleanup`
- "Cleaning up..." → `settings.sessions.cleaningUp`
- "Eligible for deletion right now:" → `settings.sessions.eligibleForDeletion`
- "No sessions eligible for deletion" → `settings.sessions.noEligible`

**Defaults Settings**：
文件：`packages/ui/src/components/sections/openchamber/DefaultsSettings.tsx`
- "Defaults" → `settings.sessions.defaults`
- "Default Agent" → `settings.sessions.defaultAgent`
- "Default Model" → `settings.sessions.defaultModel`

### 3.7 Shortcuts 设置（快捷键）

文件：`packages/ui/src/components/sections/openchamber/KeyboardShortcutsSettings.tsx`

- "Keyboard Shortcuts" → `settings.shortcuts.title`
- "Reset All" → `settings.shortcuts.resetAll`
- Tooltip: "Capture a new key combo, save it, and bindings will update immediately." → `settings.shortcuts.hint`
- "Press keys..." → `settings.shortcuts.pressKeys`
- "Save" → `common.save`
- "Reset" → `common.reset`
- "Capture a shortcut first." → `settings.shortcuts.captureFirst`
- "This combo is already used by another shortcut. Overwrite and clear that other mapping?" → `settings.shortcuts.conflictWarning`
- "Overwrite" → `common.overwrite`
- "Cancel" → `common.cancel`
- "This shortcut can conflict with browser defaults. It is still saved." → `settings.shortcuts.browserConflictWarning`

### 3.8 Git 设置

文件：`packages/ui/src/components/sections/openchamber/GitSettings.tsx` 和 `GitPage.tsx`

**GitSettings 部分**：
- "Git" → `settings.git.title`
- "Commit Message Model" → `settings.git.commitMessageModel`
- "Worktree Settings" → `settings.git.worktreeSettings`

**GitPage (Identities)**：
- "Identities" → `settings.git.identities`
- "New" → `common.new`
- "No identities configured" → `settings.git.noIdentities`
- "Create one to manage Git author settings per project" → `settings.git.noIdentitiesHint`
- "Found in ~/.git-credentials" → `settings.git.foundInCredentials`
- "Import" → `common.import`
- "default" → `settings.git.default`
- "system" → `settings.git.system`
- "ssh" / "token" (auth type) → `settings.git.authType.ssh` / `settings.git.authType.token`
- "Unset default" → `settings.git.unsetDefault`
- "Set as default" → `settings.git.setAsDefault`
- "Delete Profile" → `settings.git.deleteProfile`
- "Are you sure you want to delete \"{name}\"?" → `settings.git.deleteConfirm`

**GitHub Settings**：
文件：`packages/ui/src/components/sections/openchamber/GitHubSettings.tsx`
- "GitHub" → `settings.github.title`
- "Connect GitHub Account" → `settings.github.connect`
- "Disconnect" → `common.disconnect`

### 3.9 Agents 设置

文件：`packages/ui/src/components/sections/agents/`

- "Agents" → `settings.agents.title`
- Sidebar: 各个 agent 名称（动态）
- "Prompts, tools, permissions" → `settings.agents.description`
- Agent 配置页面的各项文案

### 3.10 Commands 设置

文件：`packages/ui/src/components/sections/commands/`

- "Commands" → `settings.commands.title`
- Sidebar: 命令列表
- "Slash, macros, automation" → `settings.commands.description`

### 3.11 MCP 设置

文件：`packages/ui/src/components/sections/mcp/`

- "MCP" → `settings.mcp.title`
- "Configure MCP servers + connections" → `settings.mcp.description`

### 3.12 Providers 设置

文件：`packages/ui/src/components/sections/providers/`

- "Providers" → `settings.providers.title`
- "Connect models + credentials" → `settings.providers.description`
- Sidebar: 提供商列表

### 3.13 Usage 使用统计

文件：`packages/ui/src/components/sections/usage/`

- "Select a provider to view usage details." → `settings.usage.selectProvider`
- "{provider} Usage" → `settings.usage.providerUsage`
- "Last updated:" → `settings.usage.lastUpdated`
- "Refreshing usage..." → `settings.usage.refreshing`
- "Show in Header Menu" → `settings.usage.showInHeader`
- Tooltip: "When enabled, this provider's usage will be visible in the quick access dropdown menu in the app header." → `settings.usage.showInHeaderHint`
- "No usage data available yet." → `settings.usage.noData`
- "Failed to refresh usage data" → `settings.usage.refreshFailed`
- "Provider not configured" → `settings.usage.notConfigured`
- "Add credentials in the Providers tab to enable usage tracking." → `settings.usage.addCredentialsHint`
- "Model Quotas" → `settings.usage.modelQuotas`
- "Other Models" → `settings.usage.otherModels`
- "No quota windows reported" → `settings.usage.noQuota`
- "This provider does not currently report any rate limits or usage quotas." → `settings.usage.noQuotaHint`

### 3.14 Skills 技能设置

文件：`packages/ui/src/components/sections/skills/`

- "Skills" → `settings.skills.title`
- "Install skills from catalogs" → `settings.skills.description`
- "Skills Catalog" → `settings.skills.catalog`
- 安装对话框、目录管理等文案

### 3.15 Voice 语音设置

文件：`packages/ui/src/components/sections/openchamber/VoiceSettings.tsx`

- "Voice Setup" → `settings.voice.setup`
- "Enable Voice Mode" → `settings.voice.enableMode`
- "Provider" → `settings.voice.provider`
- "Browser" → `settings.voice.providerBrowser`
- "OpenAI" → `settings.voice.providerOpenai`
- "Say" → `settings.voice.providerSay`
- Tooltip about providers → `settings.voice.providerHint`
- "API Key" → `settings.voice.apiKey`
- "Using key from configuration" → `settings.voice.usingConfigKey`
- "OpenAI TTS requires an API key" → `settings.voice.ttsRequiresKey`
- "Provide your OpenAI key" → `settings.voice.provideKey`
- "Voice" → `settings.voice.voice`
- "Auto" → `settings.voice.voiceAuto`
- "Speech Rate" → `settings.voice.speechRate`
- "Speech Pitch" → `settings.voice.speechPitch`
- "Speech Volume" → `settings.voice.speechVolume`
- "Language" → `settings.voice.language`
- "Playback & Summarization" → `settings.voice.playback`
- "Message Read Aloud Button" → `settings.voice.messageButton`
- "Summarize Before Playback" → `settings.voice.summarizeBefore`
- "Summarize Voice Mode Responses" → `settings.voice.summarizeVoice`
- "Summarization Threshold" → `settings.voice.summarizeThreshold`
- "Summary Max Length" → `settings.voice.summaryMaxLength`
- "Press Shift + Click on the mic button to toggle continuous mode" → `settings.voice.continuousModeHint`

### 3.16 Projects 设置

文件：`packages/ui/src/components/sections/projects/`

- "Projects" → `settings.projects.title`
- "Total {count}" → `settings.projects.total`
- "Add project" → `settings.projects.add`
- 动态项目名称

### 3.17 其他页面通用文案

- "Not available" → `settings.notAvailable`
- "This settings page is not available in this runtime." → `settings.notAvailableHint`
- "Back to Settings" → `settings.backToSettings`
- "Close settings" → `settings.close`
- "Open section list" → `settings.openSectionList`

## 4. 翻译 Key 前缀建议

采用嵌套结构，按功能模块分组：

```json
{
  "settings": {
    "nav": {
      "home": "Settings",
      "projects": "Projects",
      "appearance": "Appearance",
      "chat": "Chat",
      "notifications": "Notifications",
      "sessions": "Sessions",
      "shortcuts": "Shortcuts",
      "git": "Git",
      "agents": "Agents",
      "commands": "Commands",
      "mcp": "MCP",
      "providers": "Providers",
      "usage": "Usage",
      "skillsInstalled": "Skills",
      "skillsCatalog": "Skills Catalog",
      "voice": "Voice",
      "reloadOpencode": "Reload OpenCode"
    },
    "home": {
      "jumpTo": "Jump to common pages.",
      "providers": {
        "title": "Providers",
        "description": "Connect models + credentials"
      },
      "agents": {
        "title": "Agents",
        "description": "Prompts, tools, permissions"
      },
      "skillsCatalog": {
        "title": "Skills Catalog",
        "description": "Install skills from catalogs"
      },
      "mcp": {
        "title": "MCP",
        "description": "Configure MCP servers + connections"
      },
      "usage": {
        "title": "Usage",
        "description": "Quota + spend visibility"
      }
    },
    "appearance": {
      "colorMode": "Color Mode",
      "lightTheme": "Light Theme",
      "darkTheme": "Dark Theme",
      "selectTheme": "Select theme",
      "reloadThemes": "Reload themes",
      "themeImportHint": "Import custom themes from ~/.config/openchamber/themes/",
      "interfaceFontSize": "Interface Font Size",
      "terminalFontSize": "Terminal Font Size",
      "spacingDensity": "Spacing Density",
      "cornerRadius": "Corner Radius",
      "inputBarOffset": "Input Bar Offset",
      "inputBarOffsetHint": "Raise input bar to avoid OS-level screen obstructions like home bars."
    },
    "chat": {
      "defaultToolOutput": "Default Tool Output",
      "toolExpansion": {
        "collapsed": "Collapsed",
        "summary": "Summary",
        "detailed": "Detailed"
      },
      "diffLayout": {
        "title": "Diff Layout",
        "dynamic": "Dynamic",
        "inline": "Always inline",
        "sideBySide": "Always side-by-side"
      },
      "diffViewMode": {
        "title": "Diff View Mode",
        "single": "Single file",
        "all": "All files"
      },
      "mobileStatusBar": "Show Mobile Status Bar",
      "showDotfiles": "Show Dotfiles",
      "queueMessages": "Queue Messages by Default",
      "queueMessagesHint": "When enabled, Enter queues messages. Use {mod}+Enter to send.",
      "persistDraft": "Persist Draft Messages",
      "reasoningTraces": "Show Reasoning Traces",
      "justificationActivity": "Show Justification Activity",
      "terminalQuickKeys": "Terminal Quick Keys",
      "terminalQuickKeysHint": "Show Esc, Ctrl, Arrows in terminal view"
    },
    "notifications": {
      "delivery": "Notification Delivery",
      "enable": "Enable Notifications",
      "whileFocused": "Notify While App is Focused",
      "browserHint": "Your browser may ask for permission the first time.",
      "permissionDenied": "Notification permission denied. Enable it in your browser settings.",
      "permissionGrantedDisabled": "Permission granted, but notifications are disabled.",
      "vscodeHint": "VS Code runtime handles notifications separately natively.",
      "events": "Notification Events",
      "agentCompletion": "Agent Completion",
      "subagentCompletion": "Subagent Completion",
      "agentErrors": "Agent Errors",
      "agentQuestions": "Agent Questions",
      "templates": "Notification Templates",
      "variables": "Variables:",
      "title": "Title",
      "message": "Message",
      "summarization": "AI Summarization",
      "summarizeLastMessage": "Summarize Last Message",
      "threshold": "Threshold",
      "thresholdHint": "Messages longer than this will be summarized",
      "length": "Length",
      "lengthHint": "Target character length of the summary",
      "maxLength": "Max Length",
      "maxLengthHint": "Truncate {last_message} to this length",
      "push": "Background Push Notifications",
      "pushEnable": "Enable push notifications",
      "pushNotSupported": "Push not supported. Desktop Chrome/Edge and Android support push. iOS requires an installed PWA.",
      "pushDescription": "Receive alerts via your operating system background service"
    },
    "sessions": {
      "retention": "Session Retention",
      "retentionHint": "Automatically delete inactive sessions based on their last activity. Keeps recent 5 sessions.",
      "autoCleanup": "Enable Auto-Cleanup",
      "retentionPeriod": "Retention Period",
      "days": "days",
      "manualCleanup": "Manual Cleanup",
      "runCleanup": "Run cleanup now",
      "cleaningUp": "Cleaning up...",
      "eligibleForDeletion": "Eligible for deletion right now:",
      "noEligible": "No sessions eligible for deletion",
      "defaults": "Defaults",
      "defaultAgent": "Default Agent",
      "defaultModel": "Default Model"
    },
    "shortcuts": {
      "title": "Keyboard Shortcuts",
      "resetAll": "Reset All",
      "hint": "Capture a new key combo, save it, and bindings will update immediately.",
      "pressKeys": "Press keys...",
      "captureFirst": "Capture a shortcut first.",
      "conflictWarning": "This combo is already used by another shortcut. Overwrite and clear that other mapping?",
      "browserConflictWarning": "This shortcut can conflict with browser defaults. It is still saved."
    },
    "git": {
      "title": "Git",
      "identities": "Identities",
      "noIdentities": "No identities configured",
      "noIdentitiesHint": "Create one to manage Git author settings per project",
      "foundInCredentials": "Found in ~/.git-credentials",
      "default": "default",
      "system": "system",
      "authType": {
        "ssh": "ssh",
        "token": "token"
      },
      "unsetDefault": "Unset default",
      "setAsDefault": "Set as default",
      "deleteProfile": "Delete Profile",
      "deleteConfirm": "Are you sure you want to delete \"{name}\"?",
      "commitMessageModel": "Commit Message Model",
      "worktreeSettings": "Worktree Settings"
    },
    "github": {
      "title": "GitHub",
      "connect": "Connect GitHub Account",
      "disconnect": "Disconnect"
    },
    "agents": {
      "title": "Agents",
      "description": "Prompts, tools, permissions"
    },
    "commands": {
      "title": "Commands",
      "description": "Slash, macros, automation"
    },
    "mcp": {
      "title": "MCP",
      "description": "Configure MCP servers + connections"
    },
    "providers": {
      "title": "Providers",
      "description": "Connect models + credentials"
    },
    "usage": {
      "selectProvider": "Select a provider to view usage details.",
      "providerUsage": "{provider} Usage",
      "lastUpdated": "Last updated:",
      "refreshing": "Refreshing usage...",
      "showInHeader": "Show in Header Menu",
      "showInHeaderHint": "When enabled, this provider's usage will be visible in the quick access dropdown menu in the app header.",
      "noData": "No usage data available yet.",
      "refreshFailed": "Failed to refresh usage data",
      "notConfigured": "Provider not configured",
      "addCredentialsHint": "Add credentials in the Providers tab to enable usage tracking.",
      "modelQuotas": "Model Quotas",
      "otherModels": "Other Models",
      "noQuota": "No quota windows reported",
      "noQuotaHint": "This provider does not currently report any rate limits or usage quotas."
    },
    "skills": {
      "title": "Skills",
      "description": "Install skills from catalogs",
      "catalog": "Skills Catalog"
    },
    "voice": {
      "setup": "Voice Setup",
      "enableMode": "Enable Voice Mode",
      "provider": "Provider",
      "providerBrowser": "Browser",
      "providerOpenai": "OpenAI",
      "providerSay": "Say",
      "providerHint": "Browser: Free, offline, limited mobile support. / OpenAI: High quality, mobile ready, needs API key. / Say: macOS native. Fast, free, offline.",
      "apiKey": "API Key",
      "usingConfigKey": "Using key from configuration",
      "ttsRequiresKey": "OpenAI TTS requires an API key",
      "provideKey": "Provide your OpenAI key",
      "voice": "Voice",
      "voiceAuto": "Auto",
      "speechRate": "Speech Rate",
      "speechPitch": "Speech Pitch",
      "speechVolume": "Speech Volume",
      "language": "Language",
      "playback": "Playback & Summarization",
      "messageButton": "Message Read Aloud Button",
      "summarizeBefore": "Summarize Before Playback",
      "summarizeVoice": "Summarize Voice Mode Responses",
      "summarizeThreshold": "Summarization Threshold",
      "summaryMaxLength": "Summary Max Length",
      "continuousModeHint": "Press Shift + Click on the mic button to toggle continuous mode"
    },
    "projects": {
      "title": "Projects",
      "total": "Total {count}",
      "add": "Add project"
    },
    "notAvailable": "Not available",
    "notAvailableHint": "This settings page is not available in this runtime.",
    "backToSettings": "Back to Settings",
    "close": "Close settings",
    "openSectionList": "Open section list"
  },
  "common": {
    "save": "Save",
    "cancel": "Cancel",
    "confirm": "Confirm",
    "delete": "Delete",
    "edit": "Edit",
    "close": "Close",
    "reset": "Reset",
    "new": "New",
    "import": "Import",
    "overwrite": "Overwrite",
    "loading": "Loading...",
    "error": "Error",
    "success": "Success"
  }
}
```

## 5. 需要修改的文件详细列表

### 5.1 核心设置页面

| 文件路径 | 修改类型 | 翻译范围 |
|---------|---------|----------|
| `packages/ui/src/lib/settings/metadata.ts` | 修改 | 所有页面的 `title` 字段改为翻译 key |
| `packages/ui/src/components/views/SettingsView.tsx` | 修改 | 导航菜单项、快速入口、按钮文案 |

### 5.2 OpenChamber 内置设置

| 文件路径 | 修改类型 | 翻译范围 |
|---------|---------|----------|
| `packages/ui/src/components/sections/openchamber/OpenChamberVisualSettings.tsx` | 修改 | Appearance 和 Chat 全部文案 |
| `packages/ui/src/components/sections/openchamber/NotificationSettings.tsx` | 修改 | Notifications 全部文案 |
| `packages/ui/src/components/sections/openchamber/SessionRetentionSettings.tsx` | 修改 | Sessions 保留设置文案 |
| `packages/ui/src/components/sections/openchamber/DefaultsSettings.tsx` | 修改 | 默认模型/Agent 设置文案 |
| `packages/ui/src/components/sections/openchamber/KeyboardShortcutsSettings.tsx` | 修改 | 快捷键设置全部文案 |
| `packages/ui/src/components/sections/openchamber/GitSettings.tsx` | 修改 | Git 设置文案 |
| `packages/ui/src/components/sections/openchamber/GitHubSettings.tsx` | 修改 | GitHub 设置文案 |
| `packages/ui/src/components/sections/openchamber/VoiceSettings.tsx` | 修改 | Voice 语音设置全部文案 |
| `packages/ui/src/components/sections/openchamber/OpenChamberPage.tsx` | 修改 | Section 路由和标题 |
| `packages/ui/src/components/sections/openchamber/MemoryLimitsSettings.tsx` | 修改 | 内存限制设置文案 |
| `packages/ui/src/components/sections/openchamber/AboutSettings.tsx` | 修改 | 关于页面文案 |

### 5.3 独立设置模块

| 文件路径 | 修改类型 | 翻译范围 |
|---------|---------|----------|
| `packages/ui/src/components/sections/projects/ProjectsSidebar.tsx` | 修改 | 项目侧边栏文案 |
| `packages/ui/src/components/sections/projects/ProjectsPage.tsx` | 修改 | 项目页面文案 |
| `packages/ui/src/components/sections/providers/ProvidersSidebar.tsx` | 修改 | 提供商侧边栏文案 |
| `packages/ui/src/components/sections/providers/ProvidersPage.tsx` | 修改 | 提供商页面文案 |
| `packages/ui/src/components/sections/usage/UsageSidebar.tsx` | 修改 | 使用统计侧边栏文案 |
| `packages/ui/src/components/sections/usage/UsagePage.tsx` | 修改 | 使用统计页面文案 |
| `packages/ui/src/components/sections/agents/AgentsSidebar.tsx` | 修改 | Agent 侧边栏文案 |
| `packages/ui/src/components/sections/agents/AgentsPage.tsx` | 修改 | Agent 页面文案 |
| `packages/ui/src/components/sections/commands/CommandsSidebar.tsx` | 修改 | 命令侧边栏文案 |
| `packages/ui/src/components/sections/commands/CommandsPage.tsx` | 修改 | 命令页面文案 |
| `packages/ui/src/components/sections/mcp/McpSidebar.tsx` | 修改 | MCP 侧边栏文案 |
| `packages/ui/src/components/sections/mcp/McpPage.tsx` | 修改 | MCP 页面文案 |
| `packages/ui/src/components/sections/skills/SkillsSidebar.tsx` | 修改 | 技能侧边栏文案 |
| `packages/ui/src/components/sections/skills/SkillsPage.tsx` | 修改 | 技能页面文案 |
| `packages/ui/src/components/sections/skills/catalog/*.tsx` | 修改 | 技能目录相关文案 |
| `packages/ui/src/components/sections/git-identities/GitPage.tsx` | 修改 | Git 身份页面文案 |
| `packages/ui/src/components/sections/git-identities/GitIdentityEditorDialog.tsx` | 修改 | Git 身份编辑对话框文案 |

### 5.4 共享组件

| 文件路径 | 修改类型 | 翻译范围 |
|---------|---------|----------|
| `packages/ui/src/components/sections/shared/SettingsSidebarLayout.tsx` | 修改 | 侧边栏布局文案 |
| `packages/ui/src/components/sections/shared/SettingsSidebarItem.tsx` | 修改 | 侧边栏项文案 |
| `packages/ui/src/components/sections/shared/SettingsSidebarHeader.tsx` | 修改 | 侧边栏头部文案 |
| `packages/ui/src/components/sections/shared/SettingsSection.tsx` | 修改 | 设置区块文案 |

### 5.5 翻译文件

| 文件路径 | 修改类型 | 翻译范围 |
|---------|---------|----------|
| `packages/ui/src/locales/en.json` | 修改 | 添加 Settings 相关翻译 |
| `packages/ui/src/locales/zh-CN.json` | 修改 | 添加 Settings 中文翻译 |

## 6. 实现建议

### 6.1 分阶段实施

建议按以下顺序实施：
1. **第一阶段**：metadata.ts + SettingsView.tsx 导航
2. **第二阶段**：OpenChamberVisualSettings（Appearance + Chat）
3. **第三阶段**：Notifications + Sessions + Shortcuts
4. **第四阶段**：Git + GitHub + Voice
5. **第五阶段**：Projects + Providers + Usage
6. **第六阶段**：Agents + Commands + MCP + Skills

### 6.2 技术要点

1. **动态内容处理**：
   - 项目名称、Agent 名称等动态内容保持不变
   - 只翻译静态描述文本

2. **插值参数**：
   - 使用 i18next 插值语法：`{{provider}} Usage`、`Total {{count}}`
   - 保留 `{mod}` 等快捷键占位符

3. **复数处理**：
   - "1 session" vs "2 sessions" 使用复数语法

4. **组件内 vs 外部翻译**：
   - 简单文案：直接在组件内使用 `useTranslation`
   - 复杂文案：考虑创建 SettingsTranslationProvider

### 6.3 测试要点

- 语言切换后所有设置页面文案更新
- 快捷键描述正确显示
- 动态内容（项目名、Agent名）不受影响
- 各运行时（Web/Desktop/VSCode）显示正确
