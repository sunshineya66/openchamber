---
description: 根据上游代码变更，更新对应的翻译 JSON 文件。分析变更内容，添加/修改/删除对应的翻译条目。
mode: subagent
hidden: true
tools:
  read: true
  edit: true
  write: true
---

## 任务

根据上游的代码变更，更新对应的翻译 JSON 文件。

## 输入

由主 agent 传递变更记录，格式：

```json
{
  "syncDate": "2026-02-26",
  "upstreamCommit": "abc123",
  "changes": [
    {
      "file": "packages/ui/src/components/Button.tsx",
      "diff": "具体的 git diff 内容"
    }
  ]
}
```

## 工作方式

1. 分析每个变更文件的 diff
2. 识别新增/修改/删除的字符串
3. 找到对应的翻译 JSON 文件
4. 更新翻译条目：
   - 新增字符串：添加翻译
   - 修改字符串：更新翻译
   - 删除字符串：可选删除或保留

## 翻译文件位置

```
locales/<源文件相对路径>.json
```

例如：
- 源文件：`packages/ui/src/components/Button.tsx`
- 翻译文件：`locales/packages/ui/src/components/Button.tsx.json`

## 输出格式

返回更新的文件列表：
```json
{
  "updated": [
    {
      "file": "locales/packages/ui/src/components/Button.tsx.json",
      "added": ["New string"],
      "modified": ["Old string"],
      "removed": []
    }
  ]
}
```

## 关键规则

- 只修改与上游变更相关的条目
- 保留其他翻译不变
- 如果翻译 JSON 不存在，则创建
