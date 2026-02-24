# Phase 7: Optimization & Extension

## 目标

完善 i18n 体系并支持更多语言，实现生产级别的国际化体验。

## 具体任务清单

### 1. 第三方库错误消息处理

第三方库的英文错误消息需要统一处理：

- **Axios/HTTP 错误**：创建错误消息映射层，将网络错误、超时、4xx/5xx 状态码转换为本地化消息
- **Git 操作错误**：处理 `simple-git` 返回的错误，映射为用户友好的本地化提示
- **MCP 工具错误**：MCP 服务器返回的错误需要统一捕获并翻译

```typescript
// 示例：创建 i18n 错误映射模块
// packages/ui/src/lib/i18n/errorMessages.ts
export const createErrorMessageMapper = (t: TranslateFunction) => ({
  network: {
    timeout: () => t('error.network.timeout'),
    offline: () => t('error.network.offline'),
   ECONNREFUSED: () => t('error.network.connectionRefused'),
  },
  git: {
    notARepository: () => t('error.git.notARepository'),
    mergeConflict: () => t('error.git.mergeConflict'),
    authenticationFailed: () => t('error.git.authFailed'),
  },
  mcp: {
    serverNotFound: () => t('error.mcp.serverNotFound'),
    toolNotFound: (tool: string) => t('error.mcp.toolNotFound', { tool }),
  },
});
```

### 2. 添加更多语言支持

扩展支持的语言列表：

| 语言 | 代码 | 优先级 |
|------|------|--------|
| 简体中文 | zh-CN | 默认 |
| 繁体中文 | zh-TW | 高 |
| 日文 | ja | 高 |
| 英文 | en | 默认 |

建议实现方式：
- 在 `locales/` 目录按语言代码组织翻译文件
- 使用语言代码命名空间：`zh-CN.json`, `zh-TW.json`, `ja.json`
- 繁体中文可考虑与简体中文共享基础翻译，差异部分覆盖

### 3. 翻译完整性检查脚本

创建自动化检查工具：

```typescript
// scripts/check-translations.ts
interface TranslationStats {
  totalKeys: number;
  translatedKeys: number;
  missingKeys: Record<string, string[]>;
  percentage: number;
}

function checkTranslationCompleteness(
  baseLocale: string,
  targetLocale: string
): TranslationStats
```

功能需求：
- 对比基准语言（en/zh-CN）与目标语言的 key 覆盖率
- 生成缺失 key 列表报告
- 支持 CI 集成，失败阈值可配置

### 4. 翻译复数形式处理

使用 `Intl.PluralRules` 处理复数：

```typescript
// 在翻译函数中支持复数
const t = (key: string, params?: Record<string, any>, count?: number) => {
  if (count !== undefined) {
    const pluralKey = `${key}.${new Intl.PluralRules(locale).select(count)}`;
    return translations[pluralKey] || key;
  }
  return translations[key] || key;
};

// 使用示例
t('item.count', { count: 5 }, 5)
// zh-CN: 5 个项目
// en: 5 items
// ja: 5 個のアイテム
```

常见需要复数的场景：
- 文件数量统计
- 已选择 N 项
- N 个错误

### 5. 日期、时间、数字格式化

使用 `Intl` API 实现本地化格式化：

```typescript
// packages/ui/src/lib/i18n/formatters.ts
export const createFormatters = (locale: string) => ({
  date: new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
  time: new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
  }),
  number: new Intl.NumberFormat(locale),
  relativeTime: new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }),
});
```

使用场景：
- 文件修改时间显示
- 会话时间戳
- 配额使用量数字
- 相对时间（"3分钟前"）

### 6. RTL 语言支持准备

为未来阿拉伯语、希伯来语等 RTL 语言预留支持：

```typescript
// packages/ui/src/lib/i18n/direction.ts
const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'];

export function isRTL(locale: string): boolean {
  return RTL_LANGUAGES.some(lang => locale.startsWith(lang));
}

export function getDirection(locale: string): 'ltr' | 'rtl' {
  return isRTL(locale) ? 'rtl' : 'ltr';
}
```

CSS 变量支持：
```css
:root {
  --layout-direction: ltr;
  --layout-inline-start: left;
  --layout-inline-end: right;
}

[dir="rtl"] {
  --layout-direction: rtl;
  --layout-inline-start: right;
  --layout-inline-end: left;
}
```

### 7. 浏览器/系统语言自动检测优化

改进语言检测逻辑：

```typescript
// packages/ui/src/lib/i18n/detection.ts
export function detectUserLanguage(): string {
  // 1. 检查本地存储的用户偏好
  const stored = localStorage.getItem('user-language');
  if (stored && SUPPORTED_LOCALES.includes(stored)) {
    return stored;
  }

  // 2. 检查浏览器语言
  const browserLang = navigator.language;
  if (SUPPORTED_LOCALES.includes(browserLang)) {
    return browserLang;
  }

  // 3. 检查浏览器语言前缀 (zh-TW -> zh)
  const langPrefix = browserLang.split('-')[0];
  const matchedLocale = SUPPORTED_LOCALES.find(l => 
    l.startsWith(langPrefix)
  );
  if (matchedLocale) {
    return matchedLocale;
  }

  // 4. 回退到默认语言
  return DEFAULT_LOCALE;
}
```

支持的语言列表：
```typescript
// packages/ui/src/lib/i18n/config.ts
export const SUPPORTED_LOCALES = ['en', 'zh-CN', 'zh-TW', 'ja'] as const;
export type SupportedLocale = typeof SUPPORTED_LOCALES[number];
export const DEFAULT_LOCALE: SupportedLocale = 'zh-CN';
```

### 8. 语言切换动画和过渡效果

添加流畅的语言切换体验：

```typescript
// 语言切换时的过渡组件
function LanguageTransition({ 
  children, 
  locale 
}: { 
  children: React.ReactNode; 
  locale: string;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={locale}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

注意事项：
- 切换时保持页面状态
- 避免闪烁，使用 suspense 或骨架屏
- 支持键盘快捷键切换语言

### 9. 性能优化：翻译文件按需加载

实现翻译文件懒加载：

```typescript
// packages/ui/src/lib/i18n/loader.ts
const translationCache = new Map<string, TranslationData>();

export async function loadTranslations(locale: SupportedLocale) {
  if (translationCache.has(locale)) {
    return translationCache.get(locale)!;
  }

  const translations = await import(`../locales/${locale}.json`);
  translationCache.set(locale, translations.default);
  return translations.default;
}
```

优化策略：
- 初始只加载默认语言
- 其他语言在用户切换时加载
- 使用 `React.lazy` 配合 `Suspense`
- 考虑 Service Worker 缓存

## 可选的增强功能

### 1. 翻译编辑器 UI

在设置页面添加翻译管理功能：
- 查看所有翻译 key 和当前语言的值
- 一键复制缺失的 key 到翻译文件
- 预览其他语言的效果

### 2. 众包翻译支持

- 导出翻译文件为标准格式（PO/XLIFF）
- 导入翻译结果
- 集成翻译服务 API（可选）

### 3. 翻译记忆

- 基于 TM（Translation Memory）的智能提示
- 相似 key 自动建议已有翻译

### 4. 变量类型检查

- 翻译字符串中的变量类型校验
- 运行时警告缺失变量

## 测试要点

### 单元测试
- 翻译函数边界条件（null, undefined, 空字符串）
- 复数形式正确选择
- 格式化函数输出验证

### E2E 测试
- 语言切换后页面所有可见文本已翻译
- 日期/数字格式符合目标语言习惯
- 语言偏好持久化（刷新后保持）

### 视觉回归测试
- 不同语言下的 UI 布局适应性
- RTL 模式下的布局镜像
- 长文本截断和换行处理

### 兼容性测试
- 各种浏览器语言组合
- 系统语言与应用语言不一致的场景
- 特殊字符（ emoji、 RTL 文字）显示

## 维护建议

### 1. 翻译工作流

```
1. 开发新功能 → 添加新 key（使用占位符）
2. 定期导出待翻译 key
3. 翻译完成后导入
4. 运行完整性检查
5. Code Review 确认
```

### 2. Key 命名规范

采用层级命名，保持一致性：

```
// 格式：{页面}.{组件}.{具体含义}
common.button.confirm
common.button.cancel
common.error.network

settings.tabs.general
settings.tabs.appearance
settings.tabs.language

chat.input.placeholder
chat.message.copy
chat.message.edit
```

### 3. 版本管理

- 翻译文件与代码版本对应
- 删除未使用的 key（定期清理）
- 重大版本更新时做翻译审计

### 4. 监控与反馈

- 收集用户语言使用分布数据
- 监控翻译缺失报错
- 收集用户对翻译质量的反馈
