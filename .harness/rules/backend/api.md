# API 设计规则

## 设计原则

### RESTful 风格
- 使用 HTTP 方法表示操作：GET、POST、PUT、DELETE
- 使用资源路径表示实体：/api/patients、/api/care-plans
- 使用复数名词表示资源集合
- 使用连字符分隔单词

### 无状态设计
- 每个请求包含完整的认证信息
- 服务端不保存客户端状态
- 使用 JWT token 或 Session Cookie 认证

### 统一响应格式
- 成功响应：`{ data: ..., meta: ... }`
- 错误响应：`{ code: ..., message: ..., request_id: ... }`
- 使用统一的 HTTP 状态码

## 认证与授权

### 认证方式
- 使用 Bearer Token 认证：`Authorization: Bearer <token>`
- 使用 Session Cookie（Next.js App Router）
- 使用 Supabase Auth 进行身份验证

### 授权方式
- 使用 RBAC（基于角色的访问控制）
- 使用 RLS（行级安全性）控制数据访问
- 使用权限声明（Permission Claims）

### 权限粒度
- 资源级别权限（读取、写入、删除）
- 行级别权限（基于 org_id、role_claim）
- 操作级别权限（特定操作的权限）

## 请求规范

### 参数传递
- 查询参数：用于过滤、排序、分页
- 路径参数：用于资源标识（如 /api/patients/{id}）
- 请求体：用于创建和更新资源

### 参数验证
- 使用 Zod Schema 进行参数验证
- 验证失败返回 400 Bad Request
- 提供详细的错误信息

### 分页规范
- 使用 Cursor 分页
- 返回 next_cursor 和 has_more
- 支持排序参数

### 过滤规范
- 使用 query 参数进行过滤
- 支持多个过滤条件
- 支持日期范围过滤

## 响应规范

### 状态码
- 200 OK：成功获取资源
- 201 Created：成功创建资源
- 204 No Content：成功删除资源
- 400 Bad Request：请求参数错误
- 401 Unauthorized：未认证
- 403 Forbidden：无权限
- 404 Not Found：资源不存在
- 500 Internal Server Error：服务器错误

### 响应格式
- 使用 JSON 格式
- 设置正确的 Content-Type 头
- 支持 CORS

### 错误处理
- 统一错误码规范
- 提供请求 ID 便于追踪
- 区分业务错误和系统错误

## 版本控制

### 版本策略
- 使用 URL 路径版本：/api/v1/patients
- 使用 Accept Header 版本：Accept: application/vnd.doctor-copilot.v1+json
- 向后兼容原则

### 变更管理
- 新增字段不影响现有客户端
- 废弃字段标记并提供迁移指南
- 删除字段需提前通知并提供过渡期

## API 文档

### 文档工具
- 使用 OpenAPI 规范
- 使用 Swagger UI 或 Redoc 展示文档
- 自动生成 API 文档

### 文档内容
- 接口描述
- 请求参数
- 响应示例
- 错误码说明
- 认证方式

## 性能优化

### 缓存策略
- 使用 HTTP 缓存头
- 使用 Redis 缓存热点数据
- 支持缓存失效机制

### 请求优化
- 合并相关请求
- 使用批量接口
- 避免 N+1 查询

### 限流策略
- 使用 Rate Limiting
- 设置合理的请求频率限制
- 提供限流提示

## 安全规范

### 输入验证
- 防止 SQL 注入
- 防止 XSS 攻击
- 防止 CSRF 攻击

### 输出过滤
- 移除敏感信息
- 数据脱敏处理
- 防止数据泄露

### 传输安全
- 使用 HTTPS
- 设置安全的 CORS 策略
- 使用安全的 Cookie 属性