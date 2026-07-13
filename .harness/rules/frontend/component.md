# 组件开发规则

## 组件分类

### 原子组件
- 最小粒度的 UI 元素（Button、Input、Icon）
- 无业务逻辑
- 可复用性最高

### 分子组件
- 由多个原子组件组合而成（Form、Card、Modal）
- 包含简单交互逻辑
- 可复用性较高

### 组织组件
- 由多个分子组件组合而成（Dashboard、PatientList）
- 包含业务逻辑
- 可复用性较低

### 页面组件
- 页面级组件（LoginPage、DashboardPage）
- 包含路由逻辑
- 不可复用

## 组件设计原则

### 单一职责
- 每个组件只负责一个功能
- 避免组件过度膨胀
- 组件代码不超过 200 行

### 可复用性
- 原子组件和分子组件必须可复用
- 使用 props 传递配置和回调
- 避免硬编码业务逻辑

### 可组合性
- 组件设计支持组合使用
- 使用 children props 传递内容
- 支持插槽机制

### 可维护性
- 组件命名清晰（PascalCase）
- 文件结构组织合理
- 注释清晰说明组件用途

## 组件开发规范

### 文件结构
```
components/
  Button/
    Button.tsx
    Button.test.tsx
    Button.stories.tsx (如适用)
```

### Props 设计
- 使用 TypeScript 定义 props 类型
- 区分必需 props 和可选 props
- 提供默认值
- 使用 PropTypes 进行运行时验证（如需要）

### 样式管理
- 使用 Tailwind CSS 进行样式开发
- 组件样式使用 className
- 复杂样式可提取为 CSS Modules
- 避免使用 !important

### 状态管理
- 组件内部状态使用 useState/useReducer
- 共享状态通过 props 或 Context 传递
- 避免在组件中直接修改 props

### 事件处理
- 事件处理函数使用 useCallback 优化
- 避免在渲染中创建新函数
- 事件命名使用 handle 前缀（如 handleClick）

## 组件测试

### 测试覆盖
- 原子组件：渲染测试、交互测试
- 分子组件：组合测试、逻辑测试
- 组织组件：集成测试
- 页面组件：E2E 测试

### 测试工具
- 使用 Jest + React Testing Library
- 使用 Storybook 进行视觉测试
- 使用 Cypress 进行 E2E 测试

## 组件文档

### 文档内容
- 组件用途说明
- Props 类型和说明
- 使用示例
- 注意事项

### 文档方式
- 使用 Storybook 自动生成文档
- 或在组件文件中添加 JSDoc 注释