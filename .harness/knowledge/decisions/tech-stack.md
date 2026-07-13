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
- **Next.js API/Server Actions**：后端逻辑处理
- **Supabase**：数据库、认证、存储、实时功能
- **PostgreSQL + pgvector**：关系型数据库 + 向量检索

### AI 能力
- **Vercel AI SDK**：AI 应用开发工具
- **LLM Router**：多模型路由
- **RAG**：检索增强生成

### 部署平台
- **Vercel**：前端部署
- **Supabase**：后端服务

## 技术栈决策理由

### Next.js
- 全栈能力，支持前后端一体化开发
- App Router 提供更好的路由体验
- Server Components 提升性能
- Server Actions 简化后端逻辑

### Supabase
- 提供完整的后端服务
- PostgreSQL 支持复杂查询
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

### 中期（稳定期）
- 优化性能
- 增加测试覆盖
- 完善文档

### 长期（扩展期）
- 引入事件总线
- 增加按病种的垂直 feature package
- 扩展第三方集成