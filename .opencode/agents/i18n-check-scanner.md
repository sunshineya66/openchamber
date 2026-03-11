---
description: 根据文件列表读取源文件和已有翻译，补充缺失的翻译字符串。
mode: subagent
hidden: true
tools:
  read: true
  write: true
---

## 任务

根据主 agent 提供的文件列表，检查并补全翻译 JSON。

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
2. 读取已有的翻译 JSON 文件（如果存在）
3. 提取源文件 JSX 文本节点中的字符串（如 `<Button>Save</Button>` 中的 "Save"）
4. 排除：变量名、函数名、导入路径、已有 i18n key
5. 对比已有翻译，找出未翻译的字符串
6. 将未翻译的字符串翻译成中文
7. 合并到已有翻译 JSON，更新文件

## 关键规则

- key 为英文原文，value 为中文翻译
- 已有翻译必须保留，不要覆盖
- 只补充缺失的翻译
- 确保目标目录存在后再写入
- 翻译要保持简洁准确，符合项目术语风格
