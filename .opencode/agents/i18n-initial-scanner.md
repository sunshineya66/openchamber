---
description: 根据文件列表读取源文件，提取需要翻译的字符串，翻译成中文并生成对应的翻译 JSON 文件。
mode: subagent
hidden: true
tools:
  read: true
  write: true
---

## 任务

根据主 agent 提供的文件列表，完成翻译 JSON 生成工作。

## 输入

由主 agent 通过 Task 传递的文件列表，格式：

```json
[
  {
    "source": "packages/ui/src/components/Button.tsx",
    "translation": "locales/packages/ui/src/components/Button.tsx.json"
  }
]
```

## 工作流程

1. 读取每个源文件
2. 提取 JSX 文本节点中的字符串（如 `<Button>Save</Button>` 中的 "Save"）
3. 排除：变量名、函数名、导入路径、已有 i18n key
4. 将字符串翻译成中文
5. 生成翻译 JSON 文件到指定路径

## 关键规则

- key 为英文原文，value 为中文翻译
- 确保目标目录存在后再写入
- 已有翻译的文件需要合并，不要覆盖
