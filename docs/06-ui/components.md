# Components 组件规范

## 概述

本文档定义 Doctor Copilot 通用组件的样式、状态与使用场景。所有组件基于 [shadcn/ui](https://ui.shadcn.com) 进行医疗场景定制，统一使用 Design Tokens，不硬编码样式。

组件规范的目标：

- 减少重复实现，提升开发效率
- 确保相同组件在不同页面表现一致
- 覆盖医疗场景常见状态（风险等级、待办状态、禁用/只读等）

## 组件状态通则

每个交互组件必须定义以下状态，并在实现中完整覆盖：

| 状态 | 说明 | 视觉表现 |
|---|---|---|
| `default` | 默认态 | 标准样式 |
| `hover` | 鼠标悬停 | 背景变深、阴影提升、指针变化 |
| `active` / `pressed` | 按下 | 背景进一步加深、轻微下沉 |
| `focus` | 键盘焦点 | 主色 2px outline 或 ring，不依赖颜色 alone |
| `disabled` | 禁用 | 透明度 0.5 或灰化，无交互反馈 |
| `loading` | 加载中 | Spinner 替代图标/文字，禁用点击 |
| `error` | 错误 | 红色边框/文字，配合错误提示 |
| `empty` | 空数据 | 见 [patterns.md](./patterns.md) 空状态规范 |

> Focus 状态必须可见，且不能仅通过颜色变化表达，以满足无障碍要求。

## Button 按钮

### 变体

| 变体 | 用途 | 背景 | 文字 | 边框 |
|---|---|---|---|---|
| `primary` | 主要操作（保存、创建、确认） | `--color-primary-600` | `--color-text-inverse` | 无 |
| `secondary` | 次要操作（取消、返回） | `--color-neutral-0` | `--color-text-secondary` | `--color-border-default` |
| `ghost` | 低强调操作（编辑、更多） | 透明 | `--color-text-secondary` | 无 |
| `danger` | 破坏性操作（删除、移除） | `--color-error-500` | `--color-text-inverse` | 无 |
| `link` | 文本链接 | 透明 | `--color-text-link` | 无 |

### 尺寸

| 尺寸 | Padding | 字号 | 圆角 | 用途 |
|---|---|---|---|---|
| `sm` | `6px 12px` | `--text-sm` | `--radius-sm` | 表格内操作、紧凑场景 |
| `md` | `8px 16px` | `--text-base` | `--radius-md` | 默认尺寸 |
| `lg` | `10px 20px` | `--text-base` | `--radius-md` | 页面主操作 |
| `icon` | `8px` | - | `--radius-md` | 仅图标按钮 |

### 状态示例

```text
[  保存  ]  ← Primary Default
[  保存  ]  ← Primary Hover（背景变为 primary-700）
[  保存  ]  ← Primary Loading（左侧 Spinner + "保存中..."）
[  保存  ]  ← Primary Disabled（透明度 0.5）
```

### 使用原则

- 同一页面最多 1 个 Primary 按钮
- 危险操作使用 `danger` 变体，并配合二次确认
- 图标按钮必须配合 Tooltip 说明功能
- Loading 状态保持按钮宽度不变，避免布局抖动

## Card 卡片

### 基础样式

- 背景：`--color-bg-card`
- 圆角：`--radius-lg`（12px）
- 内边距：默认 `16px`，宽松 `20px`
- 边框：`1px solid --color-border-default`
- 阴影：`--shadow-sm`
- Hover：`--shadow-md`（仅可点击卡片）

### 卡片变体

| 变体 | 说明 |
|---|---|
| `default` | 标准卡片 |
| `interactive` | 可点击卡片，Hover 提升阴影 |
| `selected` | 选中态，边框变为主色 |
| `risk-p1` ~ `risk-p4` | 风险卡片，左侧 4px 色条 |

### 卡片结构

```text
┌─────────────────────────────┐
│ [Icon] 卡片标题        [⋯]  │  ← Header
│ 辅助说明文字                  │
├─────────────────────────────┤
│                             │
│       卡片内容               │
│                             │
├─────────────────────────────┤
│ [查看详情]                   │  ← Footer（可选）
└─────────────────────────────┘
```

### Header 规范

- 标题：`--text-lg`，`--font-semibold`
- 图标：`20px`，与标题同色
- 操作按钮：右上角，使用 `ghost` 变体

## Badge 徽章

用于展示状态、数量、风险等级。

### 类型

| 类型 | 背景 | 文字 | 用途 |
|---|---|---|---|
| `default` | `--color-neutral-100` | `--color-neutral-700` | 默认标签 |
| `primary` | `--color-primary-100` | `--color-primary-700` | 主色强调 |
| `success` | `--color-success-100` | `--color-success-700` | 完成/正常 |
| `warning` | `--color-warning-100` | `--color-warning-700` | 警告/待处理 |
| `error` | `--color-error-100` | `--color-error-700` | 错误/P1 |
| `risk-p1` ~ `risk-p4` | 对应风险背景 | 对应风险深色 | 医疗风险等级 |

### 尺寸

| 尺寸 | Padding | 字号 | 圆角 |
|---|---|---|---|
| `sm` | `2px 8px` | `--text-xs` | `--radius-full` |
| `md` | `4px 10px` | `--text-sm` | `--radius-full` |

## Tag 标签

与 Badge 不同，Tag 通常用于过滤、分类，可关闭。

- 背景：`--color-neutral-100`
- 文字：`--color-text-secondary`
- 圆角：`--radius-full`
- 关闭图标：`14px`，Hover 变红

## Input 输入框

### 基础样式

- 高度：`40px`（`sm: 32px`，`lg: 48px`）
- Padding：`8px 12px`
- 背景：`--color-bg-card`
- 边框：`1px solid --color-border-default`
- 圆角：`--radius-md`
- 字号：`--text-base`

### 状态

| 状态 | 边框 | 背景 | 说明 |
|---|---|---|---|
| `default` | `--color-border-default` | `--color-bg-card` | 默认 |
| `hover` | `--color-border-hover` | `--color-bg-card` | 悬停 |
| `focus` | `--color-border-focus` | `--color-bg-card` | 聚焦，2px ring |
| `error` | `--color-border-error` | `--color-error-100` | 校验失败 |
| `disabled` | `--color-border-default` | `--color-neutral-100` | 禁用 |
| `readonly` | 无边框或虚线 | `--color-neutral-50` | 只读 |

### 输入框组合

| 元素 | 位置 | 说明 |
|---|---|---|
| Label | 上方 | `--text-sm`，`--font-medium`，间距 8px |
| Hint | Label 右侧 | `--text-xs`，`--color-text-tertiary` |
| Prefix | 输入框内左侧 | 图标或单位 |
| Suffix | 输入框内右侧 | 图标、清空按钮、单位 |
| Error Text | 输入框下方 | `--text-xs`，`--color-error-700` |

## Select / Dropdown

- 触发器样式与 Input 一致
- 下拉面板：`--shadow-lg`，`--radius-lg`
- 选项 Hover：`--color-bg-hover`
- 选中项：`--color-bg-selected`
- 分组标题：`--text-xs`，`--color-text-tertiary`，全大写

## Checkbox / Radio / Switch

### Checkbox

- 尺寸：`16px`（默认）/ `20px`（大）
- 选中：主色填充 + 白色勾选
-  indeterminate：主色填充 + 白色横线
- 错误：边框红色

### Radio

- 尺寸：`16px`
- 选中：主色外环 + 主色内点
- 用于互斥选项

### Switch

- 尺寸：`40px × 24px`
- 关闭：`--color-neutral-300`
- 开启：`--color-primary-500`
- 圆角：`--radius-full`
- 切换动画：`200ms`

## Table 表格

### 基础样式

- 表头：`--color-neutral-50` 背景，`--text-sm`，`--font-semibold`
- 行高：`48px`
- 行分隔：`1px solid --color-border-divider`
- 行 Hover：`--color-bg-hover`
- 选中行：`--color-bg-selected`

### 状态行

| 状态 | 背景 | 左侧标识 |
|---|---|---|
| 默认 | 透明 | 无 |
| Hover | `--color-bg-hover` | 无 |
| 选中 | `--color-bg-selected` | 无 |
| P1 风险 | `--color-risk-p1-bg` | 4px 红色竖条 |
| P2 风险 | `--color-risk-p2-bg` | 4px 橙色竖条 |
| P3 风险 | `--color-risk-p3-bg` | 4px 琥珀色竖条 |

### 空表格

见 [patterns.md](./patterns.md) 空状态规范。

### 移动端表格

- 优先转为卡片列表
- 每行卡片展示关键字段，详情放入抽屉
- 如必须保留表格，使用横向滚动，并固定首列

## List 列表

### 基础样式

- 项间距：`0`（用分隔线）或 `8px`（卡片式）
- 项 Padding：`12px 16px`
- 行 Hover：`--color-bg-hover`

### 列表项结构

```text
┌─────────────────────────────────────┐
│ [Avatar] 主要标题            [Badge]│
│ 辅助描述                    [操作]  │
└─────────────────────────────────────┘
```

## Avatar 头像

| 尺寸 | 用途 |
|---|---|
| `xs` 24px | 列表、紧凑场景 |
| `sm` 32px | 表格、评论 |
| `md` 40px | 用户菜单、卡片 |
| `lg` 48px | 个人资料页 |
| `xl` 64px | 个人中心 |

- 默认使用姓名首字母 + 主色背景
- 有图片时显示图片，失败 fallback 到首字母
- 在线状态：`8px` 小圆点，绿色在线、灰色离线

## Tooltip

- 触发：Hover / Focus
- 背景：`--color-neutral-900`
- 文字：`--color-text-inverse`
- 圆角：`--radius-md`
- Padding：`6px 10px`
- 字号：`--text-xs`
- 最大宽度：`240px`
- 箭头：8px 小三角

## Dropdown Menu

- 触发：点击
- 面板：`--shadow-lg`，`--radius-lg`
- 项 Padding：`8px 12px`
- 项 Hover：`--color-bg-hover`
- 危险项 Hover：`--color-error-100`，文字 `--color-error-700`
- 分隔线：`1px solid --color-border-divider`

## Modal / Dialog

### 尺寸

| 尺寸 | 宽度 | 用途 |
|---|---|---|
| `sm` | 400px | 确认删除、简单表单 |
| `md` | 560px | 标准表单、详情展示 |
| `lg` | 720px | 复杂表单、批量操作 |
| `xl` | 900px | 大屏数据选择 |

### 结构

```text
┌──────────────────────────────────┐
│ 标题                    [×]      │
├──────────────────────────────────┤
│                                  │
│           内容区                  │
│                                  │
├──────────────────────────────────┤
│ [取消]              [确认]       │
└──────────────────────────────────┘
```

- 标题：`--text-xl`，`--font-semibold`
- 遮罩：`--color-bg-overlay`
- 进入动画：从上方淡入 300ms
- 关闭：点击遮罩、按 ESC、点击关闭按钮

## Drawer 抽屉

### 位置与尺寸

| 位置 | 桌面端 | 平板端 | 移动端 |
|---|---|---|---|
| 右侧 | `480px` | `400px` | 全屏 Bottom Sheet |
| 左侧 | `280px`（仅移动端 Sidebar） | - | - |

### 结构

```text
┌─────────────────────────────────┐
│ [←] 患者详情           [⋯] [×]  │
├─────────────────────────────────┤
│                                 │
│           内容区                 │
│                                 │
├─────────────────────────────────┤
│ [取消]             [查看完整页]  │
└─────────────────────────────────┘
```

- 复杂详情使用抽屉，完整编辑使用独立页面
- 移动端抽屉从底部滑出，占满屏幕，顶部有拖动条

## Tabs 标签页

### 基础样式

- 容器底边：`1px solid --color-border-divider`
- 未选中：`--color-text-tertiary`
- 选中：`--color-text-primary`，底部 2px 主色指示线
- 字号：`--text-sm`（默认）/ `--text-base`（大）

### 变体

| 变体 | 说明 |
|---|---|
| `line` | 底线指示，默认 |
| `pill` | 胶囊形状，用于筛选切换 |
| `card` | 卡片式，用于页面内大模块切换 |

## Accordion 折叠面板

- 标题行高：`48px`
- 展开/折叠图标在右侧
- 展开时内容区淡入 200ms
- 用于 FAQ、设置分组、详情渐进展开

## Toast / Notification

### 位置

- 桌面端：右上角，距边缘 `24px`
- 移动端：顶部居中，宽度 `calc(100% - 32px)`

### 类型

| 类型 | 图标 | 颜色 | 用途 |
|---|---|---|---|
| `success` | ✅ | `--color-success-500` | 操作成功 |
| `warning` | ⚠️ | `--color-warning-500` | 需要关注 |
| `error` | ❌ | `--color-error-500` | 操作失败 |
| `info` | ℹ️ | `--color-info-500` | 普通通知 |

### 结构

```text
┌─────────────────────────────────┐
│ [Icon] 标题                [×]  │
│        描述文字                  │
│        [查看详情]                │
└─────────────────────────────────┘
```

- 默认自动关闭：`5000ms`
- 错误类通知可设为不自动关闭
- 最多同时显示 3 个，新 Toast 从顶部推入

## Skeleton 骨架屏

- 使用 `--color-neutral-100` 背景 + `--color-neutral-200` 动画 shimmer
- 圆角：`--radius-md`
- 用于卡片、列表、表格的初始加载
- 不用于空状态或错误状态

## 组件实现建议

| 组件 | shadcn/ui 基础 | 定制点 |
|---|---|---|
| Button | `button` | 增加 `danger`、`link` 变体，医疗场景尺寸 |
| Card | `card` | 增加风险变体与选中态 |
| Badge | `badge` | 增加风险等级类型 |
| Input | `input` | 统一高度、错误态样式 |
| Table | `table` | 增加风险行样式 |
| Drawer | `sheet` | 移动端适配为 Bottom Sheet |
| Dialog | `dialog` | 统一尺寸与动画 |
| Tabs | `tabs` | 统一选中指示线 |
| Toast | `sonner` / `toast` | 统一位置与类型 |
