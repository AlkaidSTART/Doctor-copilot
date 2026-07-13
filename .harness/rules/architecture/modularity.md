# 模块化规则

## 模块化原则

### 单一职责
- 每个模块只负责一个功能域
- 避免模块过度膨胀
- 模块代码不超过 500 行

### 高内聚低耦合
- 相关功能聚集在一起
- 模块间接口简洁
- 降低模块间依赖

### 可复用性
- 通用功能提取为独立模块
- 模块设计支持复用
- 使用共享类型和工具函数

### 可测试性
- 模块代码可独立测试
- 使用依赖注入
- 避免静态依赖

## 模块结构

### Monorepo 结构
```
apps/
  web/                    # Next.js Web 应用
    app/                  # App Router
    features/             # 功能模块
    lib/                  # 工具库
    components/           # 共享组件

packages/
  ui/                     # UI 组件库
  config/                 # 配置共享
  types/                  # 类型定义
  utils/                  # 工具函数
```

### Feature 模块结构
```
features/
  patient/
    components/           # UI 组件
    actions/              # Server Actions
    queries/              # 数据查询
    schemas/              # 数据验证
    types/                # 类型定义
    hooks/                # 自定义 hooks
    index.ts              # 模块导出
```

### 模块导出
- 使用 index.ts 统一导出
- 导出公共 API
- 隐藏内部实现

## 模块依赖

### 依赖规则
- 模块间依赖单向流动
- 避免循环依赖
- 使用共享类型和工具函数

### 依赖关系
```
UI Layer -> Feature Layer -> Service Layer -> Data Layer
```

### 共享模块
- packages/ui：UI 组件
- packages/types：类型定义
- packages/config：配置
- packages/utils：工具函数

## 模块开发流程

### 模块创建
- 创建模块目录结构
- 定义模块 API
- 实现模块功能
- 编写模块测试

### 模块集成
- 在主应用中引入模块
- 配置模块路由
- 注册模块组件
- 测试模块集成

### 模块发布
- 更新模块版本
- 更新模块文档
- 发布模块到 npm（如需要）

## 模块测试

### 测试策略
- 单元测试：测试模块内部逻辑
- 集成测试：测试模块间交互
- E2E 测试：测试端到端流程

### 测试工具
- Jest：单元测试
- React Testing Library：组件测试
- Cypress：E2E 测试

### 测试覆盖率
- 单元测试覆盖率：80%+
- 集成测试覆盖率：60%+
- E2E 测试覆盖核心流程

## 模块文档

### 文档内容
- 模块功能说明
- 模块 API 文档
- 模块使用示例
- 模块依赖说明

### 文档方式
- README.md：模块说明
- JSDoc：代码注释
- Storybook：组件文档

## 模块版本控制

### 版本策略
- 使用 Semantic Versioning
- 主版本号：破坏性变更
- 次版本号：新功能
- 修订版本号：Bug 修复

### 版本管理
- 使用 npm version 管理版本
- 记录版本变更日志
- 维护版本兼容性

## 模块优化

### 性能优化
- 懒加载模块
- 代码分割
- 缓存模块

### 代码优化
- 重构模块代码
- 移除冗余代码
- 优化模块结构

### 依赖优化
- 减少模块依赖
- 使用轻量级依赖
- 移除未使用的依赖