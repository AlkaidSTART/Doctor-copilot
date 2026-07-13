# 开发环境文档

## 环境概述

开发环境使用本地 Next.js 开发服务器和本地 Supabase 实例。

## 环境要求

### 操作系统
- macOS 12+
- Linux (Ubuntu 20.04+)
- Windows (WSL2)

### 工具版本
- Node.js 20+
- pnpm 8+
- Supabase CLI 1.100+

## 环境配置

### 安装依赖
```bash
pnpm install
```

### 配置环境变量
```bash
cp .env.example .env.local
```

### 启动本地 Supabase
```bash
supabase start
```

### 启动开发服务器
```bash
pnpm dev
```

## 环境变量

### 必需变量
- NEXT_PUBLIC_SUPABASE_URL：Supabase URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY：Supabase 匿名密钥
- SUPABASE_SERVICE_ROLE_KEY：Supabase 服务角色密钥

### 可选变量
- NEXT_PUBLIC_APP_URL：应用 URL
- NEXT_PUBLIC_GOOGLE_ANALYTICS_ID：Google Analytics ID

## 开发工具

### 代码编辑器
- VS Code
- 推荐插件：
  - ESLint
  - Prettier
  - TypeScript
  - Tailwind CSS

### 调试工具
- Chrome DevTools
- React DevTools
- Next.js Debugger

### 数据库工具
- Supabase Studio（本地）
- pgAdmin
- DBeaver

## 开发流程

### 分支管理
- 从 develop 创建功能分支
- 在功能分支开发
- 创建 PR 到 develop
- 代码审查通过后合并

### 提交规范
- 使用 Conventional Commits
- 提交信息清晰
- 关联 Issue/PR

### 代码审查
- 创建 PR
- 至少 1 人审查通过
- CI/CD 构建成功

## 测试流程

### 单元测试
```bash
pnpm test
```

### 集成测试
```bash
pnpm test:integration
```

### E2E 测试
```bash
pnpm test:e2e
```

## 代码检查

### ESLint
```bash
pnpm lint
```

### TypeScript
```bash
pnpm tsc --noEmit
```

### Prettier
```bash
pnpm format
```

## 常见问题

### 数据库连接失败
- 检查 Supabase 是否启动
- 检查环境变量配置
- 检查网络连接

### 依赖安装失败
- 检查 Node.js 版本
- 检查 pnpm 版本
- 清除缓存重新安装

### 开发服务器启动失败
- 检查端口是否被占用
- 检查代码错误
- 检查依赖安装