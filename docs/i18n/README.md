# OpenChamber i18n 改造计划

本目录包含 OpenChamber 项目国际化 (i18n) 改造的完整分阶段指南。

## 项目现状

- 项目类型：Monorepo (packages/ui, packages/web, packages/desktop, packages/vscode)
- 现有 i18n 实现：**无**（完全从零开始）
- 硬编码英文文本：**6000+** 处

## 阶段总览

| 阶段 | 内容 | 预估难度 |
|------|------|----------|
| [阶段一：基础设施](./phase1-infrastructure.md) | i18n 库选型、locales 目录、i18n 初始化配置、语言切换组件 | ⭐⭐ |
| [阶段二：通用 UI 组件](./phase2-common-components.md) | Button、Input、Dialog、Toast 等基础组件文案 | ⭐⭐ |
| [阶段三：设置页面](./phase3-settings.md) | Settings 所有子页面的导航和配置项文案 | ⭐⭐⭐ |
| [阶段四：核心功能模块](./phase4-core-features.md) | Providers、Agents、Commands、MCP、Git、Voice 等 | ⭐⭐⭐⭐ |
| [阶段五：聊天界面](./phase5-chat-ui.md) | 聊天空状态、消息操作、Agent 选择器等 | ⭐⭐⭐ |
| [阶段六：运行时](./phase6-runtimes.md) | Tauri 桌面端菜单、VSCode 扩展命令、Web 服务器错误 | ⭐⭐⭐⭐⭐ |
| [阶段七：优化扩展](./phase7-optimization.md) | 第三方库错误处理、更多语言支持、完整性检查 | ⭐⭐ |

## 推荐执行顺序

```
阶段一 → 阶段二 → 阶段三 → 阶段四 → 阶段五 → 阶段六 → 阶段七
```

**阶段一是必做项**，因为它为所有后续阶段提供了基础设施。

## 翻译 Key 命名规范

各阶段文档中已定义详细的 key 前缀，遵循以下原则：

- 使用点号分隔层级：`settings.nav.appearance`
- 按功能模块分组：`features.providers.*`, `chat.message.*`
- 运行时特有前缀：`runtime.desktop.*`, `runtime.vscode.*`

## 资源

- i18next: https://www.i18next.com/
- react-i18next: https://react.i18next.com/
- 项目文档: [../README.md](../README.md)
