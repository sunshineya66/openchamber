# i18n 改造计划 - 阶段一：基础设施搭建

## 1. 目标

为整个 OpenChamber 项目搭建 i18n 国际化基础架构，使得 UI 能够支持多语言切换，并为后续的翻译工作提供可扩展的基础设施。

## 2. 前提条件

### 推荐技术栈

- **i18next** (^24.0.0) - 核心 i18n 框架
- **react-i18next** (^15.0.0) - React 集成
- **i18next-browser-languagedetector** (^8.0.0) - 浏览器语言自动检测
- **i18next-http-backend** (^3.0.0) - 动态加载翻译文件（可选，生产环境推荐）

### 安装命令

```bash
cd packages/ui
npm install i18next react-i18next i18next-browser-languagedetector
# 或使用 bun
bun add i18next react-i18next i18next-browser-languagedetector
```

## 3. 具体任务清单

### 3.1 安装依赖

执行上述安装命令，将包添加到 `packages/ui/package.json` 的 dependencies 中。

### 3.2 创建 locales 目录结构

```
packages/ui/src/locales/
├── en.json          # 英文翻译
├── zh-CN.json       # 中文翻译
└── index.ts          # 导出配置（可选）
```

**技术要点**：
- 目录位置：`packages/ui/src/locales/`
- 翻译文件使用 JSON 格式
- 文件名遵循 BCP 47 语言标签规范

### 3.3 创建 en.json 基础翻译文件模板

```json
{
  "common": {
    "save": "Save",
    "cancel": "Cancel",
    "confirm": "Confirm",
    "delete": "Delete",
    "edit": "Edit",
    "close": "Close",
    "loading": "Loading...",
    "error": "Error",
    "success": "Success",
    "warning": "Warning"
  },
  "nav": {
    "chat": "Chat",
    "files": "Files",
    "settings": "Settings",
    "terminal": "Terminal"
  },
  "settings": {
    "title": "Settings",
    "general": "General",
    "appearance": "Appearance",
    "language": "Language",
    "languageDescription": "Select your preferred language",
    "about": "About"
  },
  "chat": {
    "placeholder": "Ask anything...",
    "send": "Send",
    "newChat": "New Chat",
    "history": "History"
  }
}
```

**常见 UI 词汇分类建议**：
- `common` - 通用按钮/状态
- `nav` - 导航栏
- `settings` - 设置页面
- `chat` - 聊天界面
- `errors` - 错误消息
- `terminal` - 终端

### 3.4 创建 zh-CN.json 中文翻译文件模板

```json
{
  "common": {
    "save": "保存",
    "cancel": "取消",
    "confirm": "确认",
    "delete": "删除",
    "edit": "编辑",
    "close": "关闭",
    "loading": "加载中...",
    "error": "错误",
    "success": "成功",
    "warning": "警告"
  },
  "nav": {
    "chat": "对话",
    "files": "文件",
    "settings": "设置",
    "terminal": "终端"
  },
  "settings": {
    "title": "设置",
    "general": "通用",
    "appearance": "外观",
    "language": "语言",
    "languageDescription": "选择您偏好的语言",
    "about": "关于"
  },
  "chat": {
    "placeholder": "请输入您的问题...",
    "send": "发送",
    "newChat": "新建对话",
    "history": "历史记录"
  }
}
```

### 3.5 创建 i18n 初始化配置文件

创建文件：`packages/ui/src/i18n.ts`

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import zhCN from './locales/zh-CN.json';

export const defaultNS = 'common';
export const supportedLanguages = ['en', 'zh-CN'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

export const languageOptions: { value: SupportedLanguage; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'zh-CN', label: '简体中文' },
];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { [defaultNS]: en },
      'zh-CN': { [defaultNS]: zhCN },
    },
    fallbackLng: 'en',
    defaultNS,
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    
    interpolation: {
      escapeValue: false,
    },
    
    react: {
      useSuspense: true,
    },
  });

export default i18n;
```

**技术要点**：
- 使用 `i18next-browser-languagedetector` 自动检测用户语言
- 语言偏好存储在 localStorage (`i18nextLng` key)
- `fallbackLng` 设置为 'en' 作为后备语言
- `interpolation.escapeValue: false` 防止 React 组件被转义
- 启用 Suspense 支持 React 的异步加载机制

### 3.6 在应用入口点初始化 i18n

修改文件：`packages/ui/src/main.tsx`

在文件顶部添加 i18n 导入：

```typescript
import './i18n';
```

**放置位置**：在其他 imports 之后，StrictMode 之前

```typescript
// ... existing imports
import './i18n';
import App from './App.tsx';
// ... rest of the code
```

### 3.7 创建语言切换组件或在 Settings 中添加语言选项

#### 方案 A：创建独立 LanguageSelector 组件

创建文件：`packages/ui/src/components/ui/LanguageSelector.tsx`

```typescript
import { useTranslation } from 'react-i18next';
import { languageOptions, type SupportedLanguage } from '@/i18n';

interface LanguageSelectorProps {
  className?: string;
}

export function LanguageSelector({ className }: LanguageSelectorProps) {
  const { i18n } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = event.target.value as SupportedLanguage;
    i18n.changeLanguage(newLang);
  };

  return (
    <select
      value={i18n.language}
      onChange={handleChange}
      className={className}
    >
      {languageOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
```

#### 方案 B：在 SettingsView 中添加语言设置

在 `packages/ui/src/components/views/SettingsView.tsx` 中添加语言设置页面：

1. 在 pageOrder 数组中添加 `'language'` 
2. 创建 `packages/ui/src/components/sections/language/LanguageSidebar.tsx`
3. 创建 `packages/ui/src/components/sections/language/LanguagePage.tsx`

**推荐实现**：在 "OpenChamber" 页面（AboutSettings 附近）添加语言下拉选择器，便于用户快速切换。

### 3.8 配置 Suspense 和 Fallback 机制

i18n.ts 已配置 `react.useSuspense: true`，需要在组件中使用 Suspense 包装：

在 `packages/ui/src/main.tsx` 中：

```typescript
import { Suspense } from 'react';

// 在 render 中包装
<Suspense fallback={<LoadingFallback />}>
  <ThemeSystemProvider>
    {/* ... */}
  </ThemeSystemProvider>
</Suspense>
```

创建简单的 LoadingFallback：

```typescript
// packages/ui/src/components/ui/LoadingFallback.tsx
export function LoadingFallback() {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh' 
    }}>
      Loading...
    </div>
  );
}
```

## 4. 需要修改的文件列表

| 文件路径 | 操作 | 描述 |
|---------|------|------|
| `packages/ui/package.json` | 修改 | 添加 i18next 依赖 |
| `packages/ui/src/locales/en.json` | 新建 | 英文翻译文件 |
| `packages/ui/src/locales/zh-CN.json` | 新建 | 中文翻译文件 |
| `packages/ui/src/i18n.ts` | 新建 | i18n 初始化配置 |
| `packages/ui/src/main.tsx` | 修改 | 导入 i18n，添加 Suspense |
| `packages/ui/src/components/ui/LanguageSelector.tsx` | 新建 | 语言切换组件（可选） |
| `packages/ui/src/components/sections/language/*` | 新建 | 语言设置页面（可选） |

## 5. 注意事项

### 5.1 命名空间设计

- **默认命名空间 (common)**：放置高频使用的翻译（按钮、导航等）
- **按功能拆分**：后续可创建独立命名空间，如 `settings`, `chat`, `errors`
- **命名空间配置**：

```typescript
// 使用命名空间
const { t } = useTranslation('settings');
// 或同时使用多个命名空间
const { t } = useTranslation(['settings', 'common']);
```

### 5.2 翻译 Key 规范

- 使用 **嵌套结构** 而非扁平 key（如 `settings.language` 而非 `settingsLanguage`）
- 使用 **小写字母 + 驼峰** 或 **下划线分隔**
- 保持语义清晰的命名

**推荐**：
```json
{
  "settings": {
    "appearance": {
      "theme": "Theme",
      "language": "Language"
    }
  }
}
```

**不推荐**：
```json
{
  "settingsAppearanceTheme": "Theme",
  "settingsAppearanceLanguage": "Language"
}
```

### 5.3 避免硬编码

- **禁止在组件中直接写死显示文本**，必须使用 `t('key')` 函数
- **占位符处理**：

```typescript
// 简单替换
t('chat.messageCount', { count: 5 })

// 复数处理
t('common.items', { count: itemCount })
```

### 5.4 其他最佳实践

1. **组件内联翻译**：小型文本可直接在组件内使用 `useTranslation`
2. **Context 封装**：复杂页面可创建 TranslationProvider 封装
3. **翻译加载策略**：生产环境建议使用 `i18next-http-backend` 动态加载
4. **类型安全**：可配合 `i18next-ts` 或自行定义类型声明增强类型检查
5. **开发体验**：考虑添加 `i18next-editor` 工具支持可视化翻译管理

### 5.5 后续阶段预告

- **阶段二**：核心 UI 组件翻译（导航、侧边栏、对话界面）
- **阶段三**：设置页面全面翻译
- **阶段四**：错误消息、通知、提示文案翻译
- **阶段五**：工具链完善（翻译管理、自动化流程）
