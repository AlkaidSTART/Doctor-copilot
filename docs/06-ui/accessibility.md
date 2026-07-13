# Accessibility 无障碍与暗色模式

## 概述

医疗产品对可访问性有更高要求：医生可能在昏暗值班室使用，护士可能戴手套操作平板，患者可能对界面不够熟悉。Doctor Copilot 的目标是无障碍标准达到 **WCAG 2.1 AA**，关键医疗信息达到 **WCAG AAA** 对比度。

## 目标

- 所有用户都能独立完成任务
- 色盲用户能区分风险等级
- 键盘用户可以完整操作
- 低视力用户可以清晰阅读
- 对动画敏感用户可以选择减少动画

## 色彩对比度

### 最低标准

| 元素 | 正常文字 | 大文字（≥18px 或 ≥14px bold） |
|---|---|---|
| WCAG AA | 4.5:1 | 3:1 |
| WCAG AAA | 7:1 | 4.5:1 |

### 医疗场景强化

- 正文文字 `--color-text-primary` 与白色背景对比度 ≥ 16:1
- 风险标识文字与背景对比度 ≥ 4.5:1
- 图表数据不只依赖颜色，必须配合图标、文字、形状

### 色盲友好

风险等级不能仅依赖颜色：

| 等级 | 颜色 | 图标 | 文字 |
|---|---|---|---|
| P1 | 红色 | ⚠️ 感叹号 | "极高" |
| P2 | 橙色 | ▲ 上三角 | "高" |
| P3 | 琥珀色 | ● 圆点 | "中" |
| P4 | 蓝色 | ▽ 下三角 | "低" |
| 正常 | 绿色 | ✓ 对勾 | "正常" |

## 焦点管理

### 焦点可见

- 所有可交互元素必须有可见焦点环
- 焦点环：`2px solid --color-primary-500`，`offset: 2px`
- 焦点环不依赖 Hover 状态

### 焦点顺序

- 遵循 DOM 自然顺序
- Modal / Drawer 打开时焦点 trapping 在内部
- Modal / Drawer 关闭时焦点回到触发元素

### 焦点恢复

- 页面路由切换后焦点回到页面标题
- 动态内容加载后焦点移动到新增内容区域（可选）

## 键盘导航

### 全局快捷键

| 快捷键 | 功能 |
|---|---|
| `Tab` | 在可交互元素间正向移动 |
| `Shift + Tab` | 反向移动 |
| `Enter` / `Space` | 激活按钮、链接、展开折叠 |
| `Escape` | 关闭 Modal、Drawer、Dropdown、Toast |
| `Cmd/Ctrl + K` | 打开全局搜索 |
| `?` | 显示快捷键帮助 |

### 表格键盘操作

| 快捷键 | 功能 |
|---|---|
| `↑` / `↓` | 在行间移动 |
| `Space` | 选中当前行 |
| `Enter` | 打开当前行详情 |

### Sidebar 键盘操作

| 快捷键 | 功能 |
|---|---|
| `↑` / `↓` | 在导航项间移动 |
| `Enter` | 进入页面 |
| `Home` / `End` | 跳到第一个/最后一个导航项 |

## 屏幕阅读器支持

### ARIA 角色与属性

| 组件 | ARIA 要求 |
|---|---|
| Sidebar | `role="navigation"`，当前项 `aria-current="page"` |
| Header 搜索 | `role="search"`，输入框 `aria-label="全局搜索"` |
| Table | `role="table"`，表头 `scope="col"`，排序列 `aria-sort` |
| Modal | `role="dialog"`，`aria-modal="true"`，`aria-labelledby` |
| Drawer | `role="dialog"`，`aria-labelledby` |
| Tabs | `role="tablist"`、`role="tab"`、`role="tabpanel"` |
| Toast | `role="status"`（信息）或 `role="alert"`（错误/警告） |
| Badge | 数量变化时 `aria-live="polite"` 通知 |

### 隐藏与可见

- 装饰性图标使用 `aria-hidden="true"`
- 功能性图标必须有 `aria-label`
- 加载 Spinner 使用 `aria-label="加载中"`

### 动态内容

- 新消息、Toast 使用 `aria-live` 区域通知
- 错误信息关联到对应输入框：`aria-describedby`

## 暗色模式

### 触发方式

- 跟随系统 `prefers-color-scheme`
- 用户可手动切换，存储到 localStorage
- 切换时无闪烁，使用 CSS 变量即时响应

### 暗色 Token 映射

| 亮色 Token | 暗色 Token | 说明 |
|---|---|---|
| `--color-bg-page` `#F8FAFC` | `#0F172A` | 页面背景 |
| `--color-bg-card` `#FFFFFF` | `#1E293B` | 卡片背景 |
| `--color-bg-hover` `#F1F5F9` | `#334155` | 悬停背景 |
| `--color-text-primary` `#0F172A` | `#F8FAFC` | 主文字 |
| `--color-text-secondary` `#334155` | `#CBD5E1` | 次要文字 |
| `--color-text-tertiary` `#64748B` | `#94A3B8` | 辅助文字 |
| `--color-border-default` `#E2E8F0` | `#334155` | 默认边框 |
| `--color-border-divider` `#E2E8F0` | `#334155` | 分隔线 |

### 暗色模式色彩调整

- 主色饱和度降低 10%，避免刺眼
- 阴影改为深色背景上的高光轮廓
- 风险色保持可识别，背景色相应加深
- 图片/头像添加轻微暗化遮罩

### 暗色模式示例

```text
Light Mode:
┌─────────────────────────────┐
│ [白底卡片] 黑色文字          │
└─────────────────────────────┘

Dark Mode:
┌─────────────────────────────┐
│ [深蓝灰卡片] 白色文字        │
└─────────────────────────────┘
```

## 减少动画偏好

尊重 `prefers-reduced-motion`：

- 关闭非必要动画（淡入、滑入）
- 保留必要的即时反馈（按钮按下）
- 页面切换使用即时替换
- Toast 直接出现无滑入

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 表单可访问性

### Label 关联

- 每个输入框必须有 `<label>` 并通过 `for` 关联
- 图标按钮作为输入框后缀时必须有 `aria-label`

### 错误提示

- 错误信息使用 `aria-describedby` 关联输入框
- 错误状态使用 `aria-invalid="true"`

### 必填项

- 必填项在 Label 旁标注 `*`，并在表单顶部说明
- 使用 `aria-required="true"`

## 触控与手势

### 触控目标

- 所有可点击元素最小 `44px × 44px`
- 相邻触控目标间距 ≥ `8px`
- 表格行在移动端适当增高

### 手势

- 移动端抽屉支持下滑关闭
- 列表项支持左滑显示快捷操作（可选）
- 复杂手势必须提供替代操作方式

## 可访问性测试清单

### 开发自检

- [ ] 所有图片有 alt 文本或 aria-hidden
- [ ] 所有交互元素可通过键盘访问
- [ ] 焦点顺序合理且可见
- [ ] 表单 Label 与输入框正确关联
- [ ] 错误信息关联到对应输入框
- [ ] 颜色不是唯一信息传达方式
- [ ] 文字对比度符合 WCAG AA

### 工具测试

- [ ] 使用 axe DevTools 扫描页面
- [ ] 使用 Lighthouse Accessibility 评分 ≥ 90
- [ ] 使用屏幕阅读器（VoiceOver / NVDA）走查核心流程
- [ ] 使用键盘完成完整操作路径
- [ ] 使用色盲模拟器检查风险标识

### 核心流程走查

| 流程 | 键盘 | 屏幕阅读器 | 暗色模式 |
|---|---|---|---|
| 登录 | ✅ | ✅ | ✅ |
| Dashboard 查看风险患者 | ✅ | ✅ | ✅ |
| 患者详情切换 Tab | ✅ | ✅ | ✅ |
| 创建随访任务 | ✅ | ✅ | ✅ |
| 消息中心阅读回复 | ✅ | ✅ | ✅ |

## 参考标准

- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Inclusive Design Principles](https://inclusivedesignprinciples.org/)
