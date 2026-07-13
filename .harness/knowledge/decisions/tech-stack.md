# 技术栈决策

## 决策背景

Doctor Copilot 是面向院外连续医疗照护场景的 AI Care Platform，需要支撑医生、护士、患者与管理员四类角色的协同工作。

## 技术栈选择

### 前端框架
- **Next.js**：全栈框架，支持 Server Components、App Router、Server Actions
- **React**：支持并发特性
- **TypeScript**：类型安全

### UI 组件库
- **shadcn/ui**：基于 Tailwind CSS 的组件库
- **Tailwind CSS**：原子化 CSS 框架
- **Lucide React**：图标库

### 后端服务
- **NestJS**：主后端服务，处理复杂业务逻辑、认证授权、数据管理
- **Next.js API/Server Actions**：轻度后端，处理 SSR、静态生成、边缘计算逻辑
- **Prisma ORM**：数据库访问层，连接 PostgreSQL
- **Supabase**：托管 PostgreSQL 数据库、认证、存储、实时功能
- **PostgreSQL + pgvector**：关系型数据库 + 向量检索

### AI 能力
- **Vercel AI SDK**：AI 应用开发工具
- **LLM Router**：多模型路由
- **RAG**：检索增强生成

### 部署平台
- **Vercel**：前端部署（Next.js）
- **Supabase**：数据库托管
- **Render / AWS EC2**：NestJS 后端部署

## 技术栈决策理由

### NestJS
- 模块化架构，便于组织大型后端代码
- 依赖注入，提高代码可测试性
- 完整的中间件和拦截器支持
- TypeScript 原生支持，类型安全
- 强大的 CLI 工具，快速生成代码

### Next.js（轻度后端）
- 处理 SSR/SSG 渲染
- 边缘计算逻辑
- API 代理到 NestJS
- Server Actions 处理轻量级前端交互

### Prisma ORM
- 类型安全的数据库访问
- 直观的数据模型定义
- 强大的迁移工具
- 自动生成类型定义

### Supabase
- 提供托管 PostgreSQL 服务
- pgvector 支持向量检索
- Realtime 支持实时更新
- Auth 支持多种认证方式

### shadcn/ui
- 基于 Tailwind CSS
- 组件质量高
- 易于定制
- 支持 TypeScript

### Vercel AI SDK
- 简化 AI 应用开发
- 支持流式响应
- 支持多模型
- 与 Next.js 无缝集成

## 技术栈演进计划

### 短期（MVP）
- 使用当前技术栈完成 MVP
- 重点关注核心功能实现
- NestJS 作为主后端，Next.js 作为轻度后端

### 中期（稳定期）
- 优化性能
- 增加测试覆盖
- 完善文档
- 引入消息队列处理异步任务

### 长期（扩展期）
- 引入事件总线
- 增加按病种的垂直 feature package
- 扩展第三方集成
- 微服务架构演进

## 架构分层

### 前端层
- Next.js：页面渲染、路由、状态管理
- Server Actions：轻量级后端交互
- API Routes：代理到 NestJS

### 后端层
- NestJS：业务逻辑、认证授权、API 管理
- Prisma ORM：数据库访问
- Supabase Auth：认证服务

### 数据层
- PostgreSQL：关系型数据存储
- pgvector：向量检索
- Supabase Storage：文件存储

### AI 层
- Vercel AI SDK：AI 应用开发
- LLM Router：多模型路由
- RAG：检索增强生成
