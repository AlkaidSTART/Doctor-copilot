# 项目概览

## 项目简介

Doctor Copilot 是面向院外连续医疗照护场景的 AI Care Platform，服务医生、护士、患者与管理员四类角色。

## 项目目标

- Vision：成为院外连续照护的临床协同基础设施
- Mission：通过 Care Plan + AI Follow-up + Risk Engine，提升照护连续性与质量

## 项目范围

### 核心功能
- 患者管理
- Care Plan（照护计划）
- Task（任务）
- Follow-up（随访）
- Timeline（时间线）
- Alert（告警）
- Doctor Brief（医生简报）
- AI Chat（AI 聊天）

### 管理功能
- 用户管理
- 权限管理
- 消息中心
- 系统设置
- AI 配置
- Prompt 管理
- 知识库管理

## 技术栈

### 前端
- Next.js
- React
- TypeScript
- shadcn/ui
- Tailwind CSS

### 后端
- Next.js Server Actions
- Supabase
- PostgreSQL + pgvector
- Vercel AI SDK

### 部署
- Vercel
- Supabase

## 项目结构

### 目录结构
```
docs/                     # 项目文档
app/                      # Next.js 应用
features/                 # 功能模块
components/               # 共享组件
lib/                      # 工具库
packages/                 # 共享包
```

### 功能模块
- patient：患者管理
- care-plan：照护计划
- task：任务管理
- timeline：时间线
- alert：告警管理
- ai-chat：AI 聊天
- auth：认证授权

## 项目流程

### 开发流程
1. 需求分析
2. 技术设计
3. 开发实现
4. 代码审查
5. 测试验证
6. 发布上线

### 文档流程
1. Discovery
2. PRD
3. User Flow
4. Information Architecture
5. MVP
6. TDD
7. UI
8. API
9. Database
10. AI
11. Roadmap

## 项目团队

### 角色定义
- 产品经理：需求分析、产品设计
- 前端开发：前端实现、UI 开发
- 后端开发：后端实现、API 开发
- 测试人员：测试验证、质量保证
- 运维人员：部署运维、监控告警

### 协作方式
- GitHub：代码托管、PR 审查
- Slack：团队沟通
- Figma：UI 设计
- Jira：任务管理

## 项目里程碑

### MVP 阶段（12 周）
- Sprint 1：SSO + RBAC
- Sprint 2：患者管理 + Care Plan
- Sprint 3：Task + Follow-up
- Sprint 4：Timeline + Alert + Brief
- Sprint 5：AI Chat + 知识库
- Sprint 6：Admin + 稳定性

### 后续阶段
- 功能增强
- 性能优化
- 第三方集成
- 移动端适配

## 项目资源

### 文档资源
- docs/：项目文档
- .harness/：开发流程与规范
- README.md：项目说明

### 工具资源
- Vercel：部署平台
- Supabase：后端服务
- GitHub：代码托管

### 学习资源
- Next.js 文档
- Supabase 文档
- React 文档
- TypeScript 文档