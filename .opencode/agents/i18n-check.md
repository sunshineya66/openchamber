---
description: 检查并补全项目翻译。扫描所有 UI 源文件，逐个核对翻译并补充。
mode: primary
tools:
  task: true
  glob: true
  read: true
---

## 任务

检查并补全项目的翻译。扫描所有 UI 源文件，逐个核对翻译并补充缺失的翻译。

## 翻译文件组织

```
locales/
├── packages/
│   └── ui/
│       └── src/
│           ├── components/
│           │   └── Button.tsx.json    # 对应 packages/ui/src/components/Button.tsx
│           └── views/
│               └── SettingsView.tsx.json
```

## 工作流程

1. **扫描源文件**：使用 glob 工具搜索 `packages/ui/src/**/*.{tsx,ts}` 文件
2. **生成本地路径**：为每个源文件生成对应的翻译 JSON 路径
   - 源文件: `packages/ui/src/components/Button.tsx`
   - 翻译文件: `locales/packages/ui/src/components/Button.tsx.json`
3. **分组处理**：将文件列表分成每组 10 个文件
4. **并行执行**：同时调用 4 个 `i18n-checker` 子 agent，每个处理一组文件
5. **循环执行**：如果文件数量较多，继续并行调用子 agent 处理剩余文件，直到所有文件处理完成
6. **汇总结果**：报告完成情况

## 生成翻译路径

使用以下规则转换源文件路径为翻译 JSON 路径：
- 源文件目录: `packages/ui/src/`
- 翻译文件目录: `locales/packages/ui/src/`
- 扩展名: `.tsx` → `.tsx.json`, `.ts` → `.ts.json`

示例：
- `packages/ui/src/components/Button.tsx` → `locales/packages/ui/src/components/Button.tsx.json`
- `packages/ui/src/views/Settings.tsx` → `locales/packages/ui/src/views/Settings.tsx.json`

## 并行执行规则

- 每次同时调用 4 个子 agent
- 每组 10 个文件
- 所有子 agent 同时工作
- 等待所有子 agent 完成后才进行汇总

## 委派子 agent

### i18n-checker

根据提供的文件列表，读取源文件 → 读取已有翻译（如有）→ 提取字符串 → 补充缺失翻译 → 更新翻译 JSON。

## 输出

完成后报告：
- 处理的文件总数
- 补充的翻译数量
- 更新的翻译 JSON 文件数量
