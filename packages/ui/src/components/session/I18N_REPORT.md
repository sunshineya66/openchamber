# Session 模块 i18n 检查报告

## 已完成工作

### 翻译文件更新 ✅
- `packages/ui/src/locales/en.json` - 添加了完整的翻译 key
- `packages/ui/src/locales/zh-CN.json` - 添加了完整的中文翻译

### 组件翻译支持添加 ✅
所有需要翻译的组件都已添加 `useTranslation` hook:

1. **SessionDialogs.tsx** ✅ - 已翻译大部分字符串
2. **SessionFolderItem.tsx** ✅ - 已完成翻译
3. **ProjectNotesTodoPanel.tsx** ✅ - 已完成翻译
4. **GitHubPullRequestPickerDialog.tsx** ✅ - 已添加 hook，需要应用翻译
5. **GitHubIssuePickerDialog.tsx** ✅ - 已添加 hook，需要应用翻译
6. **DirectoryTree.tsx** ✅ - 已添加 hook，需要应用翻译
7. **DirectoryExplorerDialog.tsx** ✅ - 已添加 hook，已翻译部分字符串
8. **DirectoryAutocomplete.tsx** ✅ - 已添加 hook，需要应用翻译
9. **BranchPickerDialog.tsx** ✅ - 已完成（使用 features.git.*）

## 翻译 key 格式

所有翻译 key 使用点号分隔:

```
session.delete.*
session.worktree.*
session.deleteDialog.*
session.folder.*
session.notes.*

github.picker.*
github.pr.*
github.issue.*

directory.tree.*
directory.explorer.*
directory.autocomplete.*
```

## 已翻译的字符串

### DirectoryExplorerDialog.tsx
- "Add project directory" → `directory.explorer.title`
- "Choose a folder to add as a project." → `directory.explorer.description`
- "Show hidden" → `directory.explorer.showHidden`
- "Enter path or select from tree..." → `directory.explorer.pathPlaceholder`
- "Cancel" → `directory.explorer.cancel`
- "Add Project" → `directory.explorer.addProject`
- "Adding..." → `directory.explorer.adding`

## 待完成工作

1. 在 GitHubPullRequestPickerDialog.tsx 中应用翻译 key
2. 在 GitHubIssuePickerDialog.tsx 中应用翻译 key
3. 在 DirectoryTree.tsx 中应用翻译 key
4. 在 DirectoryAutocomplete.tsx 中应用翻译 key

## 使用方式

```typescript
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return <div>{t('session.folder.name')}</div>;
};
```
