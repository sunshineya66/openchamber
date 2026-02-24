# 阶段四：核心功能模块国际化

## 目标

完成核心业务功能模块的文案多语言支持，包括 Providers、Agents、Commands、MCP、Git、Voice 和 Skills 等模块的用户界面文本。

## 翻译 key 前缀规范

| 模块 | key 前缀 | 说明 |
|------|----------|------|
| Providers | `features.providers.` | 提供商相关功能 |
| Agents | `features.agents.` | 代理配置相关 |
| Commands | `features.commands.` | 命令配置相关 |
| MCP | `features.mcp.` | MCP 服务器相关 |
| Git | `features.git.` | Git 功能相关 |
| Voice | `features.voice.` | 语音功能相关 |
| Skills | `features.skills.` | 技能相关 |

---

## 1. Providers 提供商页面

### 文案清单

| 原文 | key 建议 |
|------|----------|
| No providers detected | `features.providers.noProvidersDetected` |
| Check your OpenCode configuration | `features.providers.checkConfiguration` |
| Connect Provider | `features.providers.connectProvider` |
| Select Provider | `features.providers.selectProvider` |
| Loading... | `features.providers.loading` |
| All providers connected. | `features.providers.allConnected` |
| Unable to load provider list | `features.providers.loadError` |
| Failed to load provider authentication methods | `features.providers.loadAuthMethodsError` |
| Provider | `features.providers.provider` |
| Search | `features.providers.search` |
| Add API Key | `features.providers.addApiKey` |
| Save Key | `features.providers.saveKey` |
| Saving... | `features.providers.saving` |
| Connect | `features.providers.connect` |
| Complete | `features.providers.complete` |
| Copy Code | `features.providers.copyCode` |
| Copy | `features.providers.copy` |
| Open | `features.providers.open` |
| Paste authorization code | `features.providers.pasteAuthCode` |
| Provider disconnected | `features.providers.disconnected` |
| Failed to disconnect provider | `features.providers.disconnectError` |
| Failed to save API key | `features.providers.saveApiKeyError` |
| Failed to start OAuth flow | `features.providers.oauthStartError` |
| Failed to complete OAuth flow | `features.providers.oauthCompleteError` |
| Failed to copy OAuth link | `features.providers.copyOAuthLinkError` |

### 需要修改的文件

```
packages/ui/src/components/sections/providers/ProvidersPage.tsx
packages/ui/src/components/sections/openchamber/GitHubSettings.tsx (部分)
```

---

## 2. Agents 代理页面

### 文案清单

| 原文 | key 建议 |
|------|----------|
| Select an agent from the sidebar | `features.agents.selectFromSidebar` |
| or create a new one | `features.agents.createNew` |
| New Agent | `features.agents.newAgent` |
| Configure a new assistant persona | `features.agents.configureNew` |
| Edit agent settings | `features.agents.editSettings` |
| Agent name is required | `features.agents.nameRequired` |
| An agent with this name already exists | `features.agents.nameExists` |
| Agent created successfully | `features.agents.createdSuccess` |
| Agent updated successfully | `features.agents.updatedSuccess` |
| Failed to create agent | `features.agents.createError` |
| Failed to update agent | `features.agents.updateError` |
| An error occurred while saving | `features.agents.saveError` |
| Delete Agent | `features.agents.deleteAgent` |
| Reset Agent | `features.agents.resetAgent` |

### 需要修改的文件

```
packages/ui/src/components/sections/agents/AgentsPage.tsx
packages/ui/src/components/sections/agents/AgentsSidebar.tsx
```

---

## 3. Commands 命令页面

### 文案清单

| 原文 | key 建议 |
|------|----------|
| Select a command from the sidebar | `features.commands.selectFromSidebar` |
| or create a new one | `features.commands.createNew` |
| New Command | `features.commands.newCommand` |
| Configure a new slash command | `features.commands.configureNew` |
| Edit command settings | `features.commands.editSettings` |
| Command name is required | `features.commands.nameRequired` |
| Command template is required | `features.commands.templateRequired` |
| A command with this name already exists | `features.commands.nameExists` |
| Command created successfully | `features.commands.createdSuccess` |
| Command updated successfully | `features.commands.updatedSuccess` |
| Failed to create command | `features.commands.createError` |
| Failed to update command | `features.commands.updateError` |
| An error occurred while saving | `features.commands.saveError` |

### 需要修改的文件

```
packages/ui/src/components/sections/commands/CommandsPage.tsx
packages/ui/src/components/sections/commands/CommandsSidebar.tsx
```

---

## 4. MCP 页面

### 文案清单

| 原文 | key 建议 |
|------|----------|
| No MCP servers configured | `features.mcp.noServersConfigured` |
| Add MCP server | `features.mcp.addServer` |
| Select an MCP server from the sidebar | `features.mcp.selectFromSidebar` |
| Configure a new MCP server | `features.mcp.configureNew` |
| Local · stdio | `features.mcp.localStdio` |
| Remote · SSE transport | `features.mcp.remoteSse` |
| Name is required | `features.mcp.nameRequired` |
| A server with this name already exists | `features.mcp.nameExists` |
| Command cannot be empty for a local server | `features.mcp.commandRequired` |
| URL cannot be empty for a remote server | `features.mcp.urlRequired` |
| MCP server created. OpenCode reloading… | `features.mcp.createdSuccess` |
| Saved. OpenCode reloading… | `features.mcp.savedSuccess` |
| Failed to save | `features.mcp.saveError` |
| Disconnected | `features.mcp.disconnected` |
| Failed to disconnect | `features.mcp.disconnectError` |
| An error occurred | `features.mcp.genericError` |
| Create | `features.mcp.create` |
| Save Changes | `features.mcp.saveChanges` |
| Saving... | `features.mcp.saving` |
| Delete | `features.mcp.delete` |
| Deleting… | `features.mcp.deleting` |

### 需要修改的文件

```
packages/ui/src/components/sections/mcp/McpPage.tsx
packages/ui/src/components/sections/mcp/McpSidebar.tsx
```

---

## 5. Git 功能

### 文案清单

| 原文 | key 建议 |
|------|----------|
| Branch name | `features.git.branchName` |
| Fetch | `features.git.fetch` |
| Pull | `features.git.pull` |
| Push | `features.git.push` |
| Commit | `features.git.commit` |
| Branch | `features.git.branch` |
| Merge | `features.git.merge` |
| Rebase | `features.git.rebase` |
| Loading... | `features.git.loading` |
| Loading conflict details... | `features.git.loadingConflictDetails` |
| Loading description... | `features.git.loadingDescription` |
| Loading files... | `features.git.loadingFiles` |
| Search branches... | `features.git.searchBranches` |
| Processing... | `features.git.processing` |
| Working… | `features.git.working` |
| Deleting… | `features.git.deleting` |
| Delete worktree | `features.git.deleteWorktree` |
| Remove | `features.git.remove` |
| Remove others | `features.git.removeOthers` |

### 需要修改的文件

```
packages/ui/src/components/views/git/CommitSection.tsx
packages/ui/src/components/views/git/HistorySection.tsx
packages/ui/src/components/views/git/BranchSelector.tsx
packages/ui/src/components/views/git/BranchIntegrationSection.tsx
packages/ui/src/components/views/git/StashDialog.tsx
packages/ui/src/components/views/git/ConflictDialog.tsx
packages/ui/src/components/views/git/InProgressOperationBanner.tsx
packages/ui/src/components/session/SessionDialogs.tsx
packages/ui/src/components/session/BranchPickerDialog.tsx
```

---

## 6. Voice 语音设置

### 文案清单

| 原文 | key 建议 |
|------|----------|
| Start Voice | `features.voice.startVoice` |
| Listening | `features.voice.listening` |
| Processing | `features.voice.processing` |
| AI Speaking | `features.voice.speaking` |
| Voice Error | `features.voice.error` |
| Start Voice (Continuous mode on) | `features.voice.startContinuousOn` |
| Continuous mode on | `features.voice.continuousOn` |
| Continuous mode off | `features.voice.continuousOff` |
| Preview failed | `features.voice.previewFailed` |

### 需要修改的文件

```
packages/ui/src/components/voice/VoiceStatusIndicator.tsx
packages/ui/src/components/voice/BrowserVoiceButton.tsx
packages/ui/src/components/sections/openchamber/VoiceSettings.tsx
```

---

## 7. Skills 技能目录

### 7.1 Skills 页面

| 原文 | key 建议 |
|------|----------|
| Saving... | `features.skills.saving` |
| Saving not supported | `features.skills.savingNotSupported` |
| Create Skill | `features.skills.createSkill` |
| Save Changes | `features.skills.saveChanges` |
| Failed to create skill | `features.skills.createError` |
| Failed to update skill | `features.skills.updateError` |
| Failed to load file content | `features.skills.loadFileError` |
| Failed to create file | `features.skills.createFileError` |
| Failed to update file | `features.skills.updateFileError` |
| Failed to delete file | `features.skills.deleteFileError` |
| Delete Supporting File | `features.skills.deleteFileTitle` |
| Are you sure you want to delete | `features.skills.deleteFileConfirm` |
| Cancel | `features.skills.cancel` |
| Delete | `features.skills.delete` |
| Edit Supporting File | `features.skills.editFile` |
| Add Supporting File | `features.skills.addFile` |
| Modify the file content | `features.skills.modifyFileContent` |
| Create a new file in the skill directory | `features.skills.createFileDescription` |
| Loading file content... | `features.skills.loadingFileContent` |
| File Path | `features.skills.filePath` |
| Content | `features.skills.content` |
| Relative path within the skill directory | `features.skills.relativePathHelp` |
| File content... | `features.skills.fileContentPlaceholder` |

### 7.2 Skills Sidebar

| 原文 | key 建议 |
|------|----------|
| Failed to delete skill | `features.skills.deleteSkillError` |
| Failed to load skill details for duplication | `features.skills.loadForDuplicationError` |
| Failed to load skill details | `features.skills.loadDetailsError` |
| Failed to remove old skill after rename | `features.skills.removeOldSkillError` |
| Failed to rename skill | `features.skills.renameError` |

### 7.3 Skills Catalog

| 原文 | key 建议 |
|------|----------|
| Skills Catalog | `features.skills.catalogTitle` |
| Search skills... | `features.skills.catalogSearch` |
| skill(s) found | `features.skills.found` |
| No skills found | `features.skills.noSkillsFound` |
| Try a different search or refresh the catalog | `features.skills.tryDifferentSearch` |
| Loading skills... | `features.skills.catalogLoading` |
| Load More Skills | `features.skills.loadMore` |
| installed | `features.skills.installed` |
| not installable | `features.skills.notInstallable` |
| No description provided | `features.skills.noDescription` |
| by | `features.skills.by` |
| Install skill | `features.skills.installSkill` |
| Skills already exist | `features.skills.skillsAlreadyExist` |
| Some selected skills are already installed in this scope | `features.skills.alreadyInstalledDescription` |
| Add skills catalog | `features.skills.addCatalog` |
| Found | `features.skills.found` |
| skill(s) found | `features.skills.foundPlural` |
| Scan result | `features.skills.scanResult` |
| Catalog error | `features.skills.catalogError` |
| Skill installed successfully | `features.skills.installSuccess` |
| Failed to install skill | `features.skills.installError` |
| Failed to scan repository | `features.skills.scanError` |
| No skills found in this repository | `features.skills.noSkillsInRepo` |

### 需要修改的文件

```
packages/ui/src/components/sections/skills/SkillsPage.tsx
packages/ui/src/components/sections/skills/SkillsSidebar.tsx
packages/ui/src/components/sections/skills/catalog/SkillsCatalogPage.tsx
packages/ui/src/components/sections/skills/catalog/InstallSkillDialog.tsx
packages/ui/src/components/sections/skills/catalog/InstallConflictsDialog.tsx
packages/ui/src/components/sections/skills/catalog/AddCatalogDialog.tsx
packages/ui/src/components/sections/skills/catalog/InstallFromRepoDialog.tsx
```

---

## 实现建议

### 步骤 1：更新翻译文件结构

在 `packages/ui/src/lib/i18n/locales/` 目录下新增对应语言文件，在现有 `en.json` 中添加新的 key。

### 步骤 2：创建翻译 Hook

在 `packages/ui/src/lib/i18n/` 中创建 `useFeatureTranslations.ts` hook，用于访问功能模块翻译：

```typescript
export const useFeatureTranslations = () => {
  const t = useTranslations('features');
  
  return {
    providers: {
      noProvidersDetected: t('providers.noProvidersDetected'),
      // ...
    },
    agents: {
      nameRequired: t('agents.nameRequired'),
      // ...
    },
    // ...
  };
};
```

### 步骤 3：逐模块替换

按照以下顺序逐模块替换硬编码文案：
1. Providers（使用频率高，复杂度中等）
2. Agents（复杂度高）
3. Commands（复杂度中等）
4. MCP（复杂度中等）
5. Skills（复杂度高）
6. Voice（复杂度低）
7. Git（复杂度中等）

### 步骤 4：验证

替换完成后，运行以下命令验证：
```bash
bun run type-check
bun run lint
```

---

## 相关文件位置汇总

| 模块 | 主要组件文件 |
|------|-------------|
| Providers | `packages/ui/src/components/sections/providers/ProvidersPage.tsx` |
| Agents | `packages/ui/src/components/sections/agents/AgentsPage.tsx`, `AgentsSidebar.tsx` |
| Commands | `packages/ui/src/components/sections/commands/CommandsPage.tsx`, `CommandsSidebar.tsx` |
| MCP | `packages/ui/src/components/sections/mcp/McpPage.tsx`, `McpSidebar.tsx` |
| Skills | `packages/ui/src/components/sections/skills/SkillsPage.tsx`, `SkillsSidebar.tsx`, `catalog/*` |
| Voice | `packages/ui/src/components/voice/VoiceStatusIndicator.tsx`, `BrowserVoiceButton.tsx` |
| Git | `packages/ui/src/components/views/git/*.tsx` |

---

## 注意事项

1. **保持一致性**：相同含义的文案使用相同的 key（如 "Loading..." 在多个模块中出现）
2. **上下文信息**：某些错误信息需要包含动态参数，考虑使用 ICU 消息格式
3. **测试覆盖**：建议为新增的翻译 key 编写测试用例，确保覆盖
4. **渐进式迁移**：可以分批次提交，每次迁移一个模块，便于 code review
