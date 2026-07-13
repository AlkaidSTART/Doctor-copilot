# 错误处理规则

## 错误分类

### 业务错误
- 业务规则验证失败
- 用户输入错误
- 资源不存在
- 权限不足

### 系统错误
- 数据库错误
- 网络错误
- 第三方服务错误
- 配置错误

### 认证错误
- 未认证
- 认证过期
- Token 无效

## 错误处理原则

### 分层处理
- UI 层：展示错误信息
- API 层：处理 HTTP 错误
- 服务层：处理业务错误
- 数据层：处理数据库错误

### 统一格式
- 所有错误返回统一格式
- 包含错误码和错误消息
- 包含请求 ID 便于追踪

### 优雅降级
- 错误发生时提供替代方案
- 避免系统崩溃
- 保证用户体验

### 错误隔离
- 单个错误不影响其他功能
- 使用错误边界
- 使用熔断机制

## 错误处理流程

### 错误捕获
- 使用 try-catch 捕获同步错误
- 使用 .catch() 捕获异步错误
- 使用错误边界捕获 React 错误

### 错误转换
- 将底层错误转换为业务错误
- 添加错误上下文
- 使用统一错误格式

### 错误记录
- 记录错误详情
- 包含请求上下文（request_id、user_id）
- 使用结构化日志

### 错误返回
- 返回统一错误格式
- 返回适当的 HTTP 状态码
- 返回详细的错误信息

## 错误格式规范

### 错误响应格式
```json
{
  "code": "ERROR_CODE",
  "message": "错误描述",
  "request_id": "xxx",
  "details": {}
}
```

### 错误码规范
- 使用大写字母和下划线
- 错误码唯一
- 错误码有意义

### HTTP 状态码
- 400：请求参数错误
- 401：未认证
- 403：无权限
- 404：资源不存在
- 500：服务器错误

## 错误处理实现

### Server Actions 错误处理
```typescript
'use server'

export async function createPatient(data: PatientData) {
  try {
    // 验证参数
    const validated = patientSchema.parse(data)
    
    // 业务逻辑
    const patient = await supabase.from('patients').insert(validated).select()
    
    return { success: true, data: patient }
  } catch (error) {
    // 记录错误
    logger.error(error, { request_id: reqId })
    
    // 返回错误
    return { success: false, error: formatError(error) }
  }
}
```

### API 错误处理
```typescript
export async function GET(request: Request) {
  try {
    const patients = await supabase.from('patients').select()
    return NextResponse.json({ data: patients })
  } catch (error) {
    logger.error(error)
    return NextResponse.json(
      { code: 'INTERNAL_ERROR', message: '服务器错误' },
      { status: 500 }
    )
  }
}
```

### UI 错误处理
```tsx
function PatientList() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['patients'],
    queryFn: fetchPatients
  })

  if (error) {
    return <ErrorFallback error={error} />
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return <PatientTable data={data} />
}
```

## 错误日志规范

### 日志级别
- debug：调试信息
- info：一般信息
- warn：警告信息
- error：错误信息

### 日志格式
- 使用结构化日志
- 包含时间戳
- 包含日志级别
- 包含请求上下文

### 日志内容
- 错误类型
- 错误消息
- 错误堆栈
- 请求信息

## 错误监控与告警

### 监控工具
- 使用 Application Insights
- 使用 Sentry
- 使用 Logtail

### 告警规则
- 错误率超过阈值
- 特定错误码出现
- 错误持续时间过长

### 告警通知
- 发送到团队频道
- 发送邮件通知
- 创建问题工单

## 错误处理最佳实践

### 避免的做法
- 不要忽略错误
- 不要隐藏错误
- 不要返回不明确的错误
- 不要泄露敏感信息

### 推荐的做法
- 及时处理错误
- 提供有用的错误信息
- 记录详细的错误日志
- 提供错误恢复建议

### 测试错误场景
- 测试边界条件
- 测试异常输入
- 测试网络超时
- 测试服务不可用