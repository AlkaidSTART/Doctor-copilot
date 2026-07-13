# Design Tokens

## 概述

Design Tokens 是 Doctor Copilot 视觉设计的基础原子。所有组件、页面、交互模式都必须引用这些 Token，确保跨角色、跨设备的一致性。

技术实现：通过 Tailwind CSS 4 的 `@theme inline` 与 CSS 变量注入。Token 命名遵循语义化（如 `risk-high`）而非具体色值，便于后续主题切换。

## 色彩系统

### 主色板（Primary）

主色采用**蓝绿色（Teal）**，兼具医疗专业感与生命力，比纯蓝更温暖，比纯绿更稳重。

| Token | Hex | 用途 |
|---|---|---|
| `--color-primary-50` | `#F0FDFA` | 极浅背景、悬停状态 |
| `--color-primary-100` | `#CCFBF1` | 选中背景、标签浅色 |
| `--color-primary-200` | `#99F6E4` | 焦点环、高亮 |
| `--color-primary-500` | `#14B8A6` | 主按钮、链接、强调 |
| `--color-primary-600` | `#0D9488` | 主按钮 Hover、主要图标 |
| `--color-primary-700` | `#0F766E` | 主按钮 Active、文字强调 |
| `--color-primary-900` | `#134E4A` | 标题、深色模式主色文字 |

### 中性色板（Neutral）

用于背景、边框、分隔线与次要文字。

| Token | Hex | 用途 |
|---|---|---|
| `--color-neutral-0` | `#FFFFFF` | 卡片背景、浮层 |
| `--color-neutral-50` | `#F8FAFC` | 页面背景、表格斑马纹 |
| `--color-neutral-100` | `#F1F5F9` | 悬停背景、输入框背景 |
| `--color-neutral-200` | `#E2E8F0` | 边框、分隔线 |
| `--color-neutral-300` | `#CBD5E1` | 禁用边框、次级分隔 |
| `--color-neutral-500` | `#64748B` | 次要文字、图标 |
| `--color-neutral-700` | `#334155` | 正文文字 |
| `--color-neutral-900` | `#0F172A` | 标题、强对比文字 |

### 语义色板（Semantic）

用于状态反馈与医疗风险标识。

| Token | Hex | 用途 |
|---|---|---|
| `--color-success-100` | `#DCFCE7` | 成功状态背景 |
| `--color-success-500` | `#22C55E` | 成功图标、完成标记 |
| `--color-success-700` | `#15803D` | 成功文字 |
| `--color-warning-100` | `#FEF3C7` | 警告背景 |
| `--color-warning-500` | `#F59E0B` | 警告图标 |
| `--color-warning-700` | `#B45309` | 警告文字 |
| `--color-error-100` | `#FEE2E2` | 错误/高风险背景 |
| `--color-error-500` | `#EF4444` | 错误图标、P1 风险标识 |
| `--color-error-700` | `#B91C1C` | 错误文字 |
| `--color-info-100` | `#DBEAFE` | 信息提示背景 |
| `--color-info-500` | `#3B82F6` | 信息图标 |
| `--color-info-700` | `#1D4ED8` | 信息文字 |

### 医疗风险色阶（Risk Scale）

风险色必须与语义色区分，用于患者风险等级标识。

| 等级 | Token | Hex | 用途 |
|---|---|---|---|
| P1 极高 | `--color-risk-p1` | `#DC2626` | 需立即处理，红色 |
| P2 高 | `--color-risk-p2` | `#EA580C` | 需优先关注，橙色 |
| P3 中 | `--color-risk-p3` | `#D97706` | 需常规跟进，琥珀色 |
| P4 低 | `--color-risk-p4` | `#2563EB` | 观察即可，蓝色 |
| 正常 | `--color-risk-normal` | `#16A34A` | 指标正常，绿色 |
| 未知 | `--color-risk-unknown` | `#64748B` | 暂无数据，灰色 |

风险色配套背景 Token：

| Token | Hex | 用途 |
|---|---|---|
| `--color-risk-p1-bg` | `#FEF2F2` | P1 风险卡片/行背景 |
| `--color-risk-p2-bg` | `#FFF7ED` | P2 风险卡片/行背景 |
| `--color-risk-p3-bg` | `#FFFBEB` | P3 风险卡片/行背景 |
| `--color-risk-p4-bg` | `#EFF6FF` | P4 风险卡片/行背景 |
| `--color-risk-normal-bg` | `#F0FDF4` | 正常状态背景 |

### 文字色板（Text）

| Token | Hex | 对比度（白底） | 用途 |
|---|---|---|---|
| `--color-text-primary` | `#0F172A` | 16.1:1 | 标题、主文字 |
| `--color-text-secondary` | `#334155` | 10.4:1 | 正文、标签值 |
| `--color-text-tertiary` | `#64748B` | 5.6:1 | 辅助说明、占位符 |
| `--color-text-disabled` | `#94A3B8` | 3.2:1 | 禁用文字 |
| `--color-text-inverse` | `#FFFFFF` | - | 深色背景上的文字 |
| `--color-text-link` | `#0D9488` | - | 链接文字 |
| `--color-text-link-hover` | `#0F766E` | - | 链接 Hover |

> 所有主要文字颜色在白色背景上均满足 WCAG AA（4.5:1）以上标准。

### 背景色板（Background）

| Token | Hex | 用途 |
|---|---|---|
| `--color-bg-page` | `#F8FAFC` | 页面底层背景 |
| `--color-bg-card` | `#FFFFFF` | 卡片、面板、浮层 |
| `--color-bg-elevated` | `#FFFFFF` | 模态框、抽屉、下拉菜单 |
| `--color-bg-hover` | `#F1F5F9` | 列表行悬停 |
| `--color-bg-selected` | `#CCFBF1` | 选中状态 |
| `--color-bg-overlay` | `rgba(15, 23, 42, 0.48)` | 模态遮罩 |

### 边框色板（Border）

| Token | Hex | 用途 |
|---|---|---|
| `--color-border-default` | `#E2E8F0` | 卡片、输入框默认边框 |
| `--color-border-hover` | `#CBD5E1` | 悬停边框 |
| `--color-border-focus` | `#14B8A6` | 焦点边框（主色） |
| `--color-border-error` | `#EF4444` | 错误边框 |
| `--color-border-divider` | `#E2E8F0` | 内部分隔线 |

## 字体系统

### 字体栈

```css
--font-sans: "Inter", "PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", sans-serif;
--font-mono: "JetBrains Mono", "SF Mono", "Menlo", "Consolas", monospace;
```

> 项目当前使用 Geist Sans / Geist Mono，可与 Inter / JetBrains Mono 并列作为首选。中文场景必须保留系统字体回退。

### 字号阶梯（Type Scale）

| Token | Size | Line Height | Letter Spacing | 用途 |
|---|---|---|---|---|
| `--text-xs` | 12px | 16px | 0 | 标签、时间戳、徽章文字 |
| `--text-sm` | 13px | 18px | 0 | 辅助文字、表格内容 |
| `--text-base` | 14px | 20px | 0 | 正文、按钮、输入框 |
| `--text-lg` | 16px | 24px | -0.01em | 小标题、卡片标题 |
| `--text-xl` | 18px | 28px | -0.01em | 页面二级标题 |
| `--text-2xl` | 20px | 28px | -0.02em | 页面主标题 |
| `--text-3xl` | 24px | 32px | -0.02em | 数据大屏 KPI |
| `--text-4xl` | 30px | 36px | -0.02em | 特大数值展示 |

### 字重

| Token | Weight | 用途 |
|---|---|---|
| `--font-normal` | 400 | 正文 |
| `--font-medium` | 500 | 按钮、标签、 emphasized 文字 |
| `--font-semibold` | 600 | 卡片标题、表格头、导航选中 |
| `--font-bold` | 700 | 页面标题、KPI 数值 |

### 数字与等宽字体

金额、指标、ID、时间等数据优先使用 `--font-mono`，便于对齐与快速扫描。

## 间距系统

基础单位为 **4px**，所有间距必须是 4 的倍数。

| Token | Value | 用途 |
|---|---|---|
| `--space-0` | 0 | 无间距 |
| `--space-1` | 4px | 图标与文字间距、紧凑内联 |
| `--space-2` | 8px | 表单标签间距、小按钮内边距 |
| `--space-3` | 12px | 卡片内边距（紧凑）、列表项间距 |
| `--space-4` | 16px | 卡片默认内边距、表单字段间距 |
| `--space-5` | 20px | 卡片组间距、Section 内边距 |
| `--space-6` | 24px | 页面水平内边距（桌面） |
| `--space-8` | 32px | 大模块间距 |
| `--space-10` | 40px | 页面 Section 间距 |
| `--space-12` | 48px | 大区块分隔 |
| `--space-16` | 64px | 页面顶部间距 |

### 常见组件间距约定

| 组件 | Padding | Gap |
|---|---|---|
| Card | 16px (default) / 20px (loose) | - |
| Button | 8px 16px (default) / 6px 12px (sm) | - |
| Input | 8px 12px | - |
| List Item | 12px 16px | - |
| Form Field | - | 8px（标签到输入） |
| Page Section | - | 24px |

## 圆角系统

| Token | Value | 用途 |
|---|---|---|
| `--radius-sm` | 6px | 小按钮、标签、输入框 |
| `--radius-md` | 8px | 默认按钮、卡片、小面板 |
| `--radius-lg` | 12px | 大卡片、模态框、抽屉 |
| `--radius-xl` | 16px | 大浮层、Popover |
| `--radius-full` | 9999px | 胶囊按钮、头像、Badge |

## 阴影系统

阴影用于表达层级，避免过度使用导致界面脏。

| Token | Value | 用途 |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(15, 23, 42, 0.05)` | 卡片默认、小按钮 |
| `--shadow-md` | `0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 2px 4px -2px rgba(15, 23, 42, 0.05)` | 悬停浮起、下拉菜单 |
| `--shadow-lg` | `0 10px 15px -3px rgba(15, 23, 42, 0.05), 0 4px 6px -4px rgba(15, 23, 42, 0.05)` | 抽屉、模态框 |
| `--shadow-xl` | `0 20px 25px -5px rgba(15, 23, 42, 0.05), 0 8px 10px -6px rgba(15, 23, 42, 0.05)` | 大型浮层、Toast |

## 断点系统

支持全端覆盖的响应式策略。

| Token | Width | 设备定位 |
|---|---|---|
| `--breakpoint-sm` | 640px | 大屏手机横屏 |
| `--breakpoint-md` | 768px | 平板竖屏 |
| `--breakpoint-lg` | 1024px | 平板横屏 / 小笔记本 |
| `--breakpoint-xl` | 1280px | 桌面显示器 |
| `--breakpoint-2xl` | 1536px | 大屏桌面 |

### 响应式策略

| 场景 | 默认 | `md` (768px+) | `lg` (1024px+) | `xl` (1280px+) |
|---|---|---|---|---|
| Sidebar | 隐藏，汉堡菜单 | 固定 64px 图标栏 | 固定 240px 展开栏 | 固定 240px 展开栏 |
| 页面 Padding | 16px | 24px | 24px | 32px |
| Dashboard Grid | 1 列 | 2 列 | 3 列 | 4 列 |
| 表格 | 卡片化列表 | 简化表格 | 完整表格 | 完整表格 |
| 抽屉 | 全屏 Bottom Sheet | 右侧 400px | 右侧 480px | 右侧 560px |

## 动画与过渡

| Token | Value | 用途 |
|---|---|---|
| `--duration-fast` | 150ms | 按钮 Hover、颜色变化 |
| `--duration-base` | 200ms | 下拉展开、小状态切换 |
| `--duration-slow` | 300ms | 抽屉、模态框进入退出 |
| `--ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | 默认缓动 |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | 退出动画 |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | 进入动画 |

## Token 使用规范

1. **禁止硬编码色值**：所有颜色必须使用 `--color-*` Token。
2. **语义优先**：优先使用 `--color-text-primary` 而非 `--color-neutral-900`。
3. **医疗风险专用**：风险标识必须使用 `--color-risk-*` 系列，不得与语义色混用。
4. **间距 4 的倍数**：不允许出现 5px、7px 等不符合基站的数值。
5. **响应式 Mobile First**：默认样式写移动端，`md`/`lg` 逐步增强。
