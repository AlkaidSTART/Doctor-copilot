# 前端状态管理规则

## 状态分层

### 服务端状态
- 使用 Next.js Server Components 获取服务端数据
- 使用 React Query / SWR 管理服务端状态缓存
- Server Actions 作为写操作入口

### 客户端状态
- 使用 React useState/useReducer 管理组件局部状态
- 使用 Context API 管理全局客户端状态（如主题、UI 配置）
- 避免将服务端状态放入客户端状态管理

### URL 状态
- 使用 URL search params 管理列表筛选、分页状态
- 使用路由参数管理页面级状态（如患者 ID）

## 状态管理原则

### 单一数据源
- 每个状态只在一个地方定义
- 通过 props 或 Context 传递状态
- 避免状态重复

### 不可变性
- 使用不可变数据结构
- 使用 Immer 或展开运算符更新状态
- 避免直接修改状态

### 状态最小化
- 只保留必要的状态
- 派生状态通过计算属性获取
- 避免过度状态化

## 状态管理模式

### 组件内部状态
- 适用于单个组件的临时状态
- 使用 useState/useReducer
- 状态不影响其他组件

### 页面级状态
- 适用于页面内多个组件共享的状态
- 使用 Context 或 React Query
- 状态在页面卸载时清理

### 全局状态
- 适用于跨页面共享的状态
- 使用 Context API
- 状态持久化（如用户信息）

## 异步状态管理

### 加载状态
- 使用 React Query 的 isLoading/isFetching
- 提供加载指示器
- 避免重复请求

### 错误状态
- 使用 React Query 的 error 状态
- 提供错误提示和重试机制
- 区分网络错误和业务错误

### 缓存策略
- 使用 React Query 的缓存配置
- 设置合理的过期时间
- 支持手动刷新

## 性能优化

### 避免不必要的重渲染
- 使用 useMemo/useCallback
- 使用 React.memo 包装组件
- 避免在渲染函数中创建新对象

### 状态更新优化
- 批量更新状态
- 使用 functional setState
- 避免嵌套状态更新

### 懒加载
- 使用 React.lazy 动态加载组件
- 使用 Suspense 处理加载状态
- 代码分割优化首屏加载