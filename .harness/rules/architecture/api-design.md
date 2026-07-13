# API 设计规范

## 设计原则

### RESTful 风格
- 使用 HTTP 方法表示操作语义
- 使用名词表示资源
- 使用复数表示资源集合
- 使用连字符分隔单词

### 无状态性
- 每个请求包含完整的上下文信息
- 服务器不保存客户端状态
- 使用 Token 或 Cookie 进行认证

### 统一接口
- 统一的请求格式
- 统一的响应格式
- 统一的错误处理

### 分层设计
- API 网关层
- 业务逻辑层
- 数据访问层

## URL 设计

### 资源命名
- 使用名词（patients、care-plans）
- 使用复数形式
- 使用小写字母
- 使用连字符分隔

### 路径结构
```
/api/{resource}           # 资源集合
/api/{resource}/{id}      # 单个资源
/api/{resource}/{id}/{sub-resource}  # 子资源
```

### 查询参数
- 用于过滤、排序、分页
- 使用 camelCase
- 使用合理的默认值

## HTTP 方法

### GET
- 获取资源列表或单个资源
- 幂等操作
- 不修改服务器状态

### POST
- 创建新资源
- 非幂等操作
- 返回 201 Created

### PUT
- 更新完整资源
- 幂等操作
- 替换整个资源

### PATCH
- 更新部分资源
- 幂等操作
- 只更新指定字段

### DELETE
- 删除资源
- 幂等操作
- 返回 204 No Content

## 请求格式

### Content-Type
- application/json
- application/x-www-form-urlencoded
- multipart/form-data（文件上传）

### 请求体
- JSON 格式
- 使用 camelCase
- 包含必要字段

### 参数验证
- 使用 Zod Schema 验证
- 返回详细的错误信息
- 验证失败返回 400 Bad Request

## 响应格式

### 成功响应
```json
{
  "data": {},
  "meta": {
    "total": 100,
    "page": 1,
    "per_page": 10
  }
}
```

### 错误响应
```json
{
  "code": "ERROR_CODE",
  "message": "错误描述",
  "request_id": "xxx"
}
```

### HTTP 状态码
- 2xx：成功
- 3xx：重定向
- 4xx：客户端错误
- 5xx：服务器错误

## 认证授权

### 认证方式
- Bearer Token：`Authorization: Bearer <token>`
- Session Cookie（Next.js）
- API Key

### 授权方式
- RBAC：基于角色的访问控制
- ABAC：基于属性的访问控制
- RLS：行级安全性

### 权限检查
- 在 Server Actions 中进行权限检查
- 使用中间件进行全局认证
- 返回 401/403 状态码

## 分页设计

### 分页方式
- Cursor 分页（推荐）
- Offset 分页

### 响应格式
```json
{
  "data": [],
  "meta": {
    "next_cursor": "xxx",
    "has_more": true
  }
}
```

## 错误处理

### 错误分类
- 业务错误：4xx
- 系统错误：5xx
- 认证错误：401/403

### 错误码规范
- 使用有意义的错误码
- 错误码唯一
- 错误码与 HTTP 状态码对应

### 错误日志
- 记录错误详情
- 包含请求上下文
- 使用结构化日志

## 版本控制

### 版本策略
- URL 版本：/api/v1/
- Header 版本：Accept: application/vnd.xxx.v1+json
- 向后兼容

### 变更管理
- 新增字段不影响现有客户端
- 废弃字段标记
- 删除字段需提前通知

## API 文档

### 文档工具
- OpenAPI 规范
- Swagger UI
- Redoc

### 文档内容
- 接口描述
- 请求参数
- 响应示例
- 错误码说明

## 性能优化

### 缓存策略
- HTTP 缓存头
- Redis 缓存
- CDN 缓存

### 请求优化
- 批量请求
- GraphQL
- 避免 N+1 查询

### 限流策略
- Rate Limiting
- 请求频率限制