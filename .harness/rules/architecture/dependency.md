# 依赖管理规则

## 依赖类型

### 核心依赖
- Next.js
- React
- TypeScript
- Supabase
- Vercel AI SDK

### UI 依赖
- shadcn/ui
- Tailwind CSS
- Lucide React

### 工具依赖
- Zod（数据验证）
- React Query（状态管理）
- Prisma（如需要）

## 依赖版本策略

### 锁定版本
- 使用 package-lock.json 或 pnpm-lock.yaml 锁定版本
- 避免使用 ^ 或 ~ 前缀
- 使用固定版本号

### 更新策略
- 定期更新依赖版本
- 使用 Dependabot 自动更新
- 更新前进行兼容性测试

### 版本兼容性
- 确保依赖版本兼容
- 检查 peer dependencies
- 测试版本升级影响

## 依赖引入规范

### 必要性检查
- 评估是否真的需要引入依赖
- 优先使用内置功能
- 考虑维护成本

### 安全评估
- 检查依赖安全性
- 使用 npm audit 或 snyk
- 避免使用存在安全漏洞的依赖

### 许可证检查
- 检查依赖许可证
- 确保许可证兼容
- 避免使用 GPL 等强许可证依赖

## 依赖管理工具

### 包管理器
- 使用 pnpm 作为包管理器
- 使用 pnpm workspace 管理 monorepo
- 使用 pnpm install 安装依赖

### 依赖分析
- 使用 pnpm ls 查看依赖树
- 使用 pnpm why 分析依赖原因
- 使用 pnpm dedupe 去重依赖

## 依赖安全

### 安全扫描
- 使用 npm audit 扫描安全漏洞
- 使用 snyk 进行深度安全分析
- 使用 Dependabot 自动修复

### 漏洞修复
- 及时修复严重安全漏洞
- 评估漏洞影响范围
- 测试修复效果

### 安全最佳实践
- 使用 npm audit 作为 CI 检查
- 设置安全告警
- 定期进行安全审查

## 依赖文档

### 依赖说明
- 在 README 中说明核心依赖
- 在文档中说明依赖用途
- 在代码中说明依赖使用原因

### 版本记录
- 记录依赖版本变更
- 记录版本变更原因
- 记录版本变更影响

## 依赖清理

### 定期清理
- 移除未使用的依赖
- 使用 pnpm prune 清理
- 使用 depcheck 检测未使用依赖

### 依赖瘦身
- 移除不必要的依赖
- 使用 tree-shaking
- 使用 bundle analyzer 分析