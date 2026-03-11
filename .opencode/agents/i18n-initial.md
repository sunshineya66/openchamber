---
description: 执行第一次全项目汉化。扫描所有 UI 源文件，提取需要翻译的文本，委派子 agent 并行生成翻译 JSON 文件。翻译文件按源文件一一对应组织在 locales/ 目录下。
mode: primary
tools:
  task: true
  bash: true
permission:
  task:
    "i18n-initial-*": allow
---

## 任务

进行全项目的第一次汉化。将所有 UI 文本从英文翻译成中文，生成按源文件一一对应的翻译 JSON。

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

每个源文件对应一个翻译 JSON，key 为英文原文，value 为中文翻译。

## 工作流程

1. **扫描文件**：运行 `bun scripts/i18n-scan.ts` 获取所有源文件及其对应翻译路径
2. **分组处理**：将文件列表分成每组 N 个文件，N 至少为 5
3. **并行执行**：同时调用 5 个（或尽可能多的）`i18n-initial-scanner` 子 agent，每个处理一组文件
4. **循环执行**：如果文件数量超过 5 组，继续并行调用子 agent 处理剩余文件，直到所有文件处理完成
5. **汇总结果**：整合所有翻译 JSON，报告完成情况

## 扫描工具

运行以下命令扫描文件并生成路径列表：

```bash
bun scripts/i18n-scan.ts
```

输出格式：
```json
[
  {
    "source": "packages/ui/src/components/Button.tsx",
    "translation": "locales/packages/ui/src/components/Button.tsx.json"
  }
]
```

## 并行执行规则

- 每次同时调用最多 5 个子 agent，不要等待一个完成再调用下一个
- 所有子 agent 同时工作，提高效率
- 等待所有子 agent 完成后才进行汇总

## 委派子 agent

### i18n-initial-scanner

根据提供的文件列表，读取源文件 → 提取字符串 → 翻译成中文 → 生成翻译 JSON

## 输出

完成后报告：
- 处理的文件总数
- 提取的字符串数量
- 生成的翻译 JSON 文件数量
- 问题说明
