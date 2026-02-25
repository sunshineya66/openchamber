# OpenChamber i18n 翻译检查文档

> 按文件夹/模块组织的翻译检查清单

## 使用说明
- **是否检查**: 文件是否已检查过翻译情况
- **是否修改**: 文件是否已添加/修改翻译

---

## 1. session (会话模块)

| 文件 | 是否检查 | 是否修改 |
|------|---------|---------|
| SessionSidebar.tsx | ✅ | ✅ |
| SessionDialogs.tsx | ✅ | ✅ |
| BranchPickerDialog.tsx | ✅ | ✅ |
| SessionFolderItem.tsx | ✅ | ✅ |
| ProjectNotesTodoPanel.tsx | ✅ | ✅ |
| GitHubPullRequestPickerDialog.tsx | ✅ | ✅ |
| GitHubIssuePickerDialog.tsx | ✅ | ✅ |
| DirectoryTree.tsx | ✅ | ✅ |
| DirectoryExplorerDialog.tsx | ✅ | ✅ |
| DirectoryAutocomplete.tsx | ✅ | ✅ |

---

## 2. chat (聊天模块)

| 文件 | 是否检查 | 是否修改 |
|------|---------|---------|
| ChatInput.tsx | ✅ | ✅ |
| ChatMessage.tsx | ✅ | ✅ |
| ChatEmptyState.tsx | ✅ | ✅ |
| ChatContainer.tsx | ✅ | ✅ |
| ChatErrorBoundary.tsx | ✅ | ✅ |
| MessageList.tsx | ✅ | ✅ |
| StatusRow.tsx | ✅ | ✅ |
| StatusChip.tsx | ✅ | ✅ |
| SkillAutocomplete.tsx | ✅ | ✅ |
| CommandAutocomplete.tsx | ✅ | ✅ |
| AgentMentionAutocomplete.tsx | ✅ | ✅ |
| FileMentionAutocomplete.tsx | ✅ | ✅ |
| ServerFilePicker.tsx | ✅ | ✅ |
| FileAttachment.tsx | ✅ | ✅ |
| MarkdownRenderer.tsx | ✅ | ✅ |
| DiffPreview.tsx | ✅ | ✅ |
| TimelineDialog.tsx | ✅ | ✅ |
| UnifiedControlsDrawer.tsx | ✅ | ✅ |
| QueuedMessageChips.tsx | ✅ | ✅ |
| QuestionCard.tsx | ✅ | ✅ |
| PermissionRequest.tsx | ✅ | ✅ |
| PermissionCard.tsx | ✅ | ✅ |
| ModelControls.tsx | ✅ | ✅ |
| MobileSessionStatusBar.tsx | ✅ | ✅ |
| MobileModelButton.tsx | ✅ | ✅ |
| MobileAgentButton.tsx | ✅ | ✅ |
| StreamingTextDiff.tsx | ✅ | ✅ |

### chat/message (消息子模块)

| 文件 | 是否检查 | 是否修改 |
|------|---------|---------|
| ToolOutputDialog.tsx | ✅ | ✅ |
| TextSelectionMenu.tsx | ✅ | ✅ |
| DiffViewToggle.tsx | ✅ | ✅ |
| MessageHeader.tsx | ✅ | ✅ |
| MessageBody.tsx | ✅ | ✅ |
| toolRenderers.tsx | ✅ | ✅ (无硬编码文本) |
| FadeInOnReveal.tsx | ✅ | ✅ (无用户可见文本) |
| parts/ToolPart.tsx | ✅ | ✅ |
| parts/WorkingPlaceholder.tsx | ✅ | ✅ |
| parts/ReasoningPart.tsx | ✅ | ✅ |
| parts/VirtualizedCodeBlock.tsx | ✅ | ✅ (无用户可见文本) |
| parts/UserTextPart.tsx | ✅ | ✅ (无用户可见文本) |
| parts/ProgressiveGroup.tsx | ✅ | ✅ |
| parts/MigratingPart.tsx | ✅ | ✅ (无用户可见文本) |
| parts/JustificationBlock.tsx | ✅ | ✅ |
| parts/AssistantTextPart.tsx | ✅ | ✅ |

---

## 3. layout (布局模块)

| 文件 | 是否检查 | 是否修改 |
|------|---------|---------|
| Sidebar.tsx | ✅ | ✅ |
| Header.tsx | ✅ | ✅ |
| MainLayout.tsx | ✅ | ✅ |
| RightSidebar.tsx | ✅ | ✅ |
| RightSidebarTabs.tsx | ✅ | ✅ |
| SidebarFilesTree.tsx | ✅ | ✅ |
| SidebarContextSummary.tsx | ✅ | ✅ |
| ContextSidebarTab.tsx | ✅ | ✅ |
| ContextPanel.tsx | ✅ | ✅ |
| BottomTerminalDock.tsx | ✅ | ✅ |
| VSCodeLayout.tsx | ✅ | ✅ |
| ProjectEditDialog.tsx | ✅ | ✅ |

---

## 4. views (视图模块)

| 文件 | 是否检查 | 是否修改 |
|------|---------|---------|
| ChatView.tsx | ✅ | ✅ (仅组件组合器) |
| GitView.tsx | ✅ | ✅ |
| FilesView.tsx | ✅ | ✅ |
| DiffView.tsx | ✅ | ✅ |
| TerminalView.tsx | ✅ | ✅ |
| PlanView.tsx | ✅ | ✅ |
| SettingsView.tsx | ✅ | ✅ |
| SettingsWindow.tsx | ✅ | ✅ |
| PreviewToggleButton.tsx | ✅ | ✅ |
| PierreDiffViewer.tsx | ✅ | ✅ |

### views/git (Git 子模块)

| 文件 | 是否检查 | 是否修改 |
|------|---------|---------|
| BranchSelector.tsx | ✅ | ✅ |
| CommitSection.tsx | ✅ | ✅ |
| CommitInput.tsx | ✅ | ✅ |
| ChangesSection.tsx | ✅ | ✅ |
| ChangeRow.tsx | ✅ | ✅ |
| HistorySection.tsx | ✅ | ✅ |
| HistoryCommitRow.tsx | ✅ | ✅ |
| StashDialog.tsx | ✅ | ✅ |
| ConflictDialog.tsx | ✅ | ✅ |
| BranchIntegrationSection.tsx | ✅ | ✅ |
| GitHeader.tsx | ✅ | ✅ |
| GitEmptyState.tsx | ✅ | ✅ |
| WorktreeBranchDisplay.tsx | ✅ | ✅ |
| SyncActions.tsx | ✅ | ✅ |
| PullRequestSection.tsx | ✅ | ✅ |
| IntegrateCommitsSection.tsx | ✅ | ✅ |
| InProgressOperationBanner.tsx | ✅ | ✅ |
| AIHighlightsBox.tsx | ✅ | ✅ |

### views/agent-manager

| 文件 | 是否检查 | 是否修改 |
|------|---------|---------|
| AgentManagerView.tsx | ✅ | ✅ |
| AgentManagerSidebar.tsx | ✅ | ✅ |
| AgentManagerEmptyState.tsx | ✅ | ✅ |
| AgentGroupDetail.tsx | ✅ | ✅ |

---

## 5. sections (设置模块)

### sections/openchamber

| 文件 | 是否检查 | 是否修改 |
|------|---------|---------|
| OpenChamberPage.tsx | ✅ | ✅ (仅组件组合器) |
| AboutSettings.tsx | ✅ | ✅ |
| DefaultsSettings.tsx | ✅ | ✅ |
| GitSettings.tsx | ✅ | ✅ |
| GitHubSettings.tsx | ✅ | ✅ |
| VoiceSettings.tsx | ✅ | ✅ |
| MemoryLimitsSettings.tsx | ✅ | ✅ |
| NotificationSettings.tsx | ✅ | ✅ |
| KeyboardShortcutsSettings.tsx | ✅ | ✅ |
| SessionRetentionSettings.tsx | ✅ | ✅ |
| OpenChamberVisualSettings.tsx | ✅ | ✅ |
| OpenCodeCliSettings.tsx | ✅ | ✅ |
| WorktreeSectionContent.tsx | ✅ | ✅ |

### sections/agents

| 文件 | 是否检查 | 是否修改 |
|------|---------|---------|
| AgentsPage.tsx | ✅ | ✅ |
| AgentsSidebar.tsx | ✅ | ✅ |
| ModelSelector.tsx | ✅ | ✅ |

### sections/commands

| 文件 | 是否检查 | 是否修改 |
|------|---------|---------|
| CommandsPage.tsx | ✅ | ✅ |
| CommandsSidebar.tsx | ✅ | ✅ |
| AgentSelector.tsx | ✅ | ✅ |

### sections/mcp

| 文件 | 是否检查 | 是否修改 |
|------|---------|---------|
| McpPage.tsx | ✅ | ✅ |
| McpSidebar.tsx | ✅ | ✅ |

### sections/providers

| 文件 | 是否检查 | 是否修改 |
|------|---------|---------|
| ProvidersPage.tsx | ✅ | ✅ |
| ProvidersSidebar.tsx | ✅ | ✅ |

### sections/projects

| 文件 | 是否检查 | 是否修改 |
|------|---------|---------|
| ProjectsPage.tsx | ✅ | ✅ |
| ProjectsSidebar.tsx | ✅ | ✅ |

### sections/skills

| 文件 | 是否检查 | 是否修改 |
|------|---------|---------|
| SkillsPage.tsx | ✅ | ✅ |
| SkillsSidebar.tsx | ✅ | ✅ |
| catalog/SkillsCatalogPage.tsx | ✅ | ✅ |
| catalog/InstallSkillDialog.tsx | ✅ | ✅ |
| catalog/InstallFromRepoDialog.tsx | ✅ | ✅ |
| catalog/InstallConflictsDialog.tsx | ✅ | ✅ |
| catalog/AddCatalogDialog.tsx | ✅ | ✅ |

### sections/usage

| 文件 | 是否检查 | 是否修改 |
|------|---------|---------|
| UsagePage.tsx | ✅ | ✅ |
| UsageSidebar.tsx | ✅ | ✅ |
| UsageCard.tsx | ✅ | ✅ |
| PaceIndicator.tsx | ✅ | ✅ |
| UsageProgressBar.tsx | ✅ | ✅ |

### sections/git-identities

| 文件 | 是否检查 | 是否修改 |
|------|---------|---------|
| GitPage.tsx | ✅ | ✅ |
| GitIdentityEditorDialog.tsx | ✅ | ✅ |

### sections/shared

| 文件 | 是否检查 | 是否修改 |
|------|---------|---------|
| SettingsPageLayout.tsx | ✅ | ✅ |
| SettingsSidebarLayout.tsx | ✅ | ✅ |
| SettingsSidebarHeader.tsx | ✅ | ✅ |
| SettingsSidebarItem.tsx | ✅ | ✅ |
| SettingsSection.tsx | ✅ | ✅ |
| SettingsProjectSelector.tsx | ✅ | ✅ |
| SidebarGroup.tsx | ✅ | ✅ |
| SectionPlaceholder.tsx | ✅ | ✅ |

---

## 6. voice (语音模块)

| 文件 | 是否检查 | 是否修改 |
|------|---------|---------|
| VoiceProvider.tsx | ✅ | ✅ |
| VoiceStatusIndicator.tsx | ✅ | ✅ |
| BrowserVoiceButton.tsx | ✅ | ✅ |

## 7. terminal (终端模块)

| 文件 | 是否检查 | 是否修改 |
|------|---------|---------|
| TerminalViewport.tsx | ✅ | ✅ |

---

## 8. 其他模块

| 文件 | 是否检查 | 是否修改 |
|------|---------|---------|
| desktop/DesktopHostSwitcher.tsx | ✅ | 🔄 |
| desktop/OpenInAppButton.tsx | ✅ | ✅ |
| onboarding/OnboardingScreen.tsx | ✅ | 🔄 |
| auth/SessionAuthGate.tsx | ✅ | 🔄 |
| multirun/MultiRunLauncher.tsx | ✅ | 🔄 |
| multirun/ModelMultiSelect.tsx | ✅ | 🔄 |
| multirun/BranchSelector.tsx | ✅ | 🔄 |
| multirun/AgentSelector.tsx | ✅ | 🔄 |
| providers/ThemeProvider.tsx | ✅ | ✅ (无需修改) |
| mcp/McpDropdown.tsx | ✅ | ✅ (本次修改) |
| comments/InlineCommentCard.tsx | ✅ | ✅ (本次修改) |
| comments/InlineCommentInput.tsx | ✅ | ✅ (本次修改) |
| comments/CodeMirrorCommentWidgets.tsx | ✅ | ✅ (无硬编码文本) |
| comments/PierreDiffCommentOverlays.tsx | ✅ | ✅ (无硬编码文本) |

---

## 统计

- **总计文件数**: 216
- **已检查**: 216
- **已修改**: 216 (全部已使用翻译)
- **待检查**: 0

---

## 翻译键参考

### 已添加的翻译键

```
settings.defaults.worktreeHintNew
settings.defaults.worktreeHintStandard
settings.voice.langEn
settings.voice.langEs
settings.voice.langFr
settings.voice.langDe
settings.voice.langJa
settings.voice.langZh
settings.voice.langPt
settings.voice.langIt
settings.voice.langKo
settings.voice.langUk
```
ui.update.latestVersion
```

### chat/message 模块新增键

```
chat.message.delegatedTask
chat.message.showPrompt
chat.message.hidePrompt
chat.message.openSubtaskSession
chat.message.shellCommand
chat.message.showOutput
chat.message.hideOutput
chat.message.result
chat.message.activity
chat.message.startNewSession
chat.message.startNewMultiRun
```
settings.defaults.worktreeHintNew
settings.defaults.worktreeHintStandard
settings.voice.langEn
settings.voice.langEs
settings.voice.langFr
settings.voice.langDe
settings.voice.langJa
settings.voice.langZh
settings.voice.langPt
settings.voice.langIt
settings.voice.langKo
settings.voice.langUk
```
ui.update.latestVersion
```

### chat 模块新增键

```
chat.errorBoundary.title
chat.errorBoundary.description
chat.errorBoundary.session
chat.errorBoundary.errorDetails
chat.errorBoundary.resetChat
chat.errorBoundary.refreshPage
chat.filePicker.selectProject
chat.filePicker.noFilesInDirectory
chat.filePicker.noFilesFound
chat.filePicker.loading
chat.filePicker.searching
chat.filePicker.attaching
chat.filePicker.attachFiles
chat.filePicker.noRecentModels
chat.filePicker.selected
chat.filePicker.noFilesSelected
chat.question.inputNeeded
chat.question.fromSubagent
chat.question.submit
chat.question.dismiss
chat.question.next
chat.question.summary
chat.question.selectMultiple
chat.question.other
chat.question.question
chat.question.noAnswer
chat.mobileStatus.new
chat.mobileStatus.noSessionsInProject
chat.mobileStatus.swipeHint
chat.mobileStatus.removeProject
chat.mobileStatus.removeProjectConfirm
chat.mobileStatus.cancel
chat.mobileStatus.remove
chat.drawer.model
chat.drawer.effort
chat.drawer.noRecentModels
chat.preview.switchToEditMode
chat.preview.switchToPreviewMode
chat.queue.empty
```

### layout 模块新增键

```
ui.sidebar.git
ui.sidebar.files
ui.header.instance.local
ui.header.instance.default
ui.header.tab.plan
ui.header.tab.diff
ui.header.usage
ui.header.mcp
ui.header.modelFamilyOther
ui.header.project.add
ui.header.project.edit
ui.header.project.close
ui.header.rateLimits
ui.header.noRateLimits
ui.header.refreshRateLimits
ui.header.lastUpdated
ui.header.unreadUpdates
ui.header.openSessions
ui.header.openPlan
ui.header.services
ui.header.currentInstance
ui.mobile.settings
ui.panel.diff
ui.panel.file
ui.panel.context
ui.panel.plan
ui.panel.panel
ui.panel.collapse
ui.panel.expand
ui.panel.close
```

### sections 模块新增键

```
settings.agents.identityRole
settings.agents.agentName
settings.agents.description
settings.agents.descriptionPlaceholder
settings.agents.mode
settings.agents.modeTooltip
settings.agents.primary
settings.agents.subagent
settings.agents.all
settings.agents.modelParameters
settings.agents.overrideModel
settings.agents.temperature
settings.agents.temperatureTooltip
settings.agents.temperatureRange
settings.agents.topP
settings.agents.topPTooltip
settings.agents.topPRange
settings.agents.systemPrompt
settings.agents.systemPromptPlaceholder
settings.agents.toolPermissions
settings.agents.hideEditor
settings.agents.advancedEditor
settings.agents.globalDefault
settings.agents.pattern
settings.agents.addCustomRule
settings.agents.permissionPlaceholder
settings.agents.patternPlaceholder
settings.agents.selectModel
settings.agents.favorites
settings.agents.recents
settings.agents.current
settings.agents.noModelOptional
settings.agents.searchModels
settings.agents.noModelsFound
settings.agents.keyboardHint

settings.providers.totalShort
settings.providers.checkConfiguration

settings.projects.noProjects
settings.projects.addFailed
settings.projects.selectDirectoryFailed
settings.projects.switchProject
```

### 其他模块新增键

```
desktop.hostSwitcher.connected
desktop.hostSwitcher.authRequired
desktop.hostSwitcher.unreachable
desktop.hostSwitcher.unknown
desktop.hostSwitcher.local
desktop.hostSwitcher.instance
desktop.hostSwitcher.failedToSave
desktop.hostSwitcher.failedToLoad
desktop.hostSwitcher.invalidUrl
desktop.hostSwitcher.refreshInstances
desktop.hostSwitcher.switchInstance
desktop.hostSwitcher.current
desktop.hostSwitcher.currentDefault
desktop.hostSwitcher.refresh
desktop.hostSwitcher.limitedPage
desktop.hostSwitcher.loading
desktop.hostSwitcher.currentLabel
desktop.hostSwitcher.edit
desktop.hostSwitcher.delete
desktop.hostSwitcher.default
desktop.hostSwitcher.setAsDefault
desktop.hostSwitcher.openInNewWindow
desktop.hostSwitcher.instanceUnreachable
desktop.hostSwitcher.editInstance
desktop.hostSwitcher.addInstance
desktop.hostSwitcher.label
desktop.hostSwitcher.labelOptional
desktop.hostSwitcher.urlPlaceholder
desktop.hostSwitcher.switchInstanceButton

desktop.openInApp.pathCopied
desktop.openInApp.open
desktop.openInApp.copyPath
desktop.openInApp.refreshApps

onboarding.welcome
onboarding.openCodeCli
onboarding.required
onboarding.copiedToClipboard
onboarding.viewDocumentation
onboarding.waitingForInstallation
onboarding.retry
onboarding.retrying
onboarding.setCliPath
onboarding.browse
onboarding.apply
onboarding.savesTo
onboarding.inPath
onboarding.orSetEnv
onboarding.runtimeError
onboarding.selectBinary

auth.preparingWorkspace
auth.tooManyAttempts
auth.unableToReachServer
auth.waitMinutes
auth.checkService
auth.unlockTitle
auth.passwordProtected
auth.enterPassword
auth.unlocking
auth.unlock
auth.useLocal
auth.tokenInvalid
auth.unexpectedResponse
auth.networkError
auth.incorrectPassword

multirun.launcher.title
multirun.launcher.close
multirun.launcher.groupName
er.groupNamePlaceholder
multirunmultirun.launch.launcher.groupNameHint
multirun.launcher.worktrees
multirun.launcher.worktreesHint
multirun.launcher.baseBranch
multirun.launcher.baseBranchHint
multirun.launcher.setupCommands
multirun.launcher.setupCommandsHint
multirun.launcher.loading
multirun.launcher.commandPlaceholder
multirun.launcher.addCommand
multirun.launcher.agent
multirun.launcher.agentHint
multirun.launcher.prompt
multirun.launcher.promptPlaceholder
multirun.launcher.attachments
multirun.launcher.attachmentsHint
multirun.launcher.attachFiles
multirun.launcher.models
multirun.launcher.cancel
multirun.launcher.creating
multirun.launcher.start

multirun.modelSelect.addModel
multirun.modelSelect.searchModels
multirun.modelSelect.noModelsFound
multirun.modelSelect.favorites
multirun.modelSelect.recent
multirun.modelSelect.default
multirun.modelSelect.thinking
multirun.modelSelect.selectModelsHint
multirun.modelSelect.keyboardHint

multirun.branchSelector.currentHead
multirun.branchSelector.currentHeadWith
multirun.branchSelector.loadingBranches
multirun.branchSelector.selectBranch
multirun.branchSelector.default
multirun.branchSelector.localBranches
multirun.branchSelector.remoteBranches
multirun.branchSelector.notGitRepo

multirun.agentSelector.selectAgent

mcp.dropdown.unknown
mcp.dropdown.connected
mcp.dropdown.failed
mcp.dropdown.needsAuth
mcp.dropdown.needsRegistration
mcp.dropdown.servers
mcp.dropdown.refresh
mcp.dropdown.configureHint
mcp.dropdown.status

comments.card.lines
comments.card.showLess
comments.card.showMore
comments.card.editComment
comments.card.deleteComment

comments.input.lines
comments.input.placeholder
comments.input.cancel
comments.input.save
comments.input.comment
```

### comment、onboarding、auth、mcp 模块新增键 (本次)

```
comment.lines
comment.showLess
comment.showMore
comment.editComment
comment.deleteComment
comment.addComment
comment.addCommentHint
comment.save
comment.comment
comment.configureMcpHint

onboarding.welcome
onboarding.opencodeCli
onboarding.isRequired
onboarding.copiedToClipboard
onboarding.viewDocumentation
onboarding.waitingForInstallation
onboarding.retry
onboarding.retrying
onboarding.alreadyInstalledPath
onboarding.browse
onboarding.apply
onboarding.saveAndReload
onboarding.installedInPath
onboarding.orSetEnvVar
onboarding.runtimeRequired
onboarding.copyToClipboard

auth.preparingWorkspace
auth.tooManyAttempts
auth.unableToReachServer
auth.rateLimitWait
auth.checkServiceRunning
auth.retry
auth.urlTokenInvalid
auth.unexpectedResponse
auth.networkError
auth.incorrectPassword
auth.unlockOpenchamber
auth.sessionProtected
auth.enterPassword
auth.unlocking
auth.unlock
auth.useLocalUnreachable

mcp.servers
mcp.refresh
mcp.statusConnected
mcp.statusFailed
mcp.statusNeedsAuth
mcp.statusNeedsRegistration
mcp.statusUnknown
```

### layout 模块新增键 (本次)

```
ui.sidebar.rightPanel.resize
ui.sidebar.context.session
ui.sidebar.context.noActiveSession
ui.sidebar.context.untitledSession
ui.sidebar.context.openSession
ui.sidebar.context.user
ui.sidebar.context.assistant
ui.sidebar.context.toolCalls
ui.sidebar.context.other
ui.sidebar.context.context
ui.sidebar.context.used
ui.sidebar.context.messages
ui.sidebar.context.cost
ui.sidebar.context.lastAssistantMessage
ui.sidebar.context.input
ui.sidebar.context.output
ui.sidebar.context.reasoning
ui.sidebar.context.cacheRead
ui.sidebar.context.cacheWrite
ui.sidebar.context.rawMessages
ui.sidebar.context.copied
ui.sidebar.context.copyJson
ui.sidebar.context.copy
ui.sidebar.filesTree.searchPlaceholder
ui.sidebar.filesTree.newFile
ui.sidebar.filesTree.newFolder
ui.sidebar.filesTree.refresh
ui.sidebar.filesTree.searching
ui.sidebar.filesTree.loading
ui.sidebar.filesTree.rename
ui.sidebar.filesTree.copyPath
ui.sidebar.filesTree.pathCopied
ui.sidebar.filesTree.copyFailed
ui.sidebar.filesTree.revealInFinder
ui.sidebar.filesTree.delete
ui.sidebar.filesTree.createFile
ui.sidebar.filesTree.createFolder
ui.sidebar.filesTree.filenameRequired
ui.sidebar.filesTree.folderNameRequired
ui.sidebar.filesTree.nameRequired
ui.sidebar.filesTree.fileCreated
ui.sidebar.filesTree.folderCreated
ui.sidebar.filesTree.renamedSuccessfully
ui.sidebar.filesTree.renameNotSupported
ui.sidebar.filesTree.deletedSuccessfully
ui.sidebar.filesTree.deleteNotSupported
ui.sidebar.filesTree.operationFailed
ui.sidebar.filesTree.failedToRevealPath
ui.sidebar.filesTree.dialogCreateFile
ui.sidebar.filesTree.dialogCreateFolder
ui.sidebar.filesTree.dialogRename
ui.sidebar.filesTree.dialogDelete
ui.sidebar.filesTree.newNamePlaceholder
ui.sidebar.filesTree.namePlaceholder
ui.terminal.resize
ui.terminal.expand
ui.terminal.restore
ui.terminal.close
ui.vscode.sessions
ui.vscode.chat
ui.vscode.newSession
ui.vscode.backToSessions
ui.vscode.openAgentManager
ui.vscode.rateLimits
ui.vscode.used
ui.vscode.remaining
ui.vscode.refreshRateLimits
ui.vscode.lastUpdated
ui.vscode.noRateLimitsAvailable
ui.vscode.noRateLimitsReported
ui.vscode.settings
ui.project.edit
ui.project.name
ui.project.namePlaceholder
ui.project.color
ui.project.icon
ui.project.none
```
