# 前端性能规则

## 加载性能

### 首屏加载
- 使用 Next.js App Router 的 Server Components
- 代码分割，按需加载组件
- 优化静态资源（图片、字体、CSS）

### 图片优化
- 使用 Next.js Image 组件
- 设置适当的图片尺寸
- 使用 WebP/AVIF 格式
- 懒加载非首屏图片

### 字体优化
- 使用 font-display: swap
- 预加载关键字体
- 移除未使用的字体

### 资源压缩
- 启用 gzip/brotli 压缩
- 压缩 CSS 和 JS 文件
- 移除未使用的代码（Tree Shaking）

## 运行时性能

### 渲染优化
- 使用 React.memo 避免不必要的重渲染
- 使用 useMemo/useCallback 优化计算和回调
- 避免在渲染函数中进行复杂计算

### 列表优化
- 虚拟滚动处理大数据列表
- 使用 React Window 或类似库
- 避免渲染不可见的列表项

### 状态更新优化
- 批量更新状态
- 使用 functional setState
- 避免嵌套状态更新

### 内存优化
- 及时清理事件监听器
- 释放不再使用的资源
- 避免内存泄漏

## 网络性能

### 请求优化
- 使用 HTTP/2 或 HTTP/3
- 合并请求，减少请求次数
- 使用 GraphQL 或批量 API

### 缓存策略
- 使用 HTTP 缓存头
- 使用 Service Worker 缓存
- 使用 React Query/SWR 缓存数据

### 预加载
- 使用 prefetch 预加载页面
- 使用 preload 预加载关键资源
- 使用 DNS 预解析

## 性能监控

### 核心指标
- LCP（最大内容绘制）
- FID（首次输入延迟）
- CLS（累积布局偏移）

### 监控工具
- 使用 Next.js Analytics
- 使用 Google Lighthouse
- 使用 Chrome DevTools Performance

### 性能预算
- 设定性能指标目标
- 在 CI/CD 中加入性能检查
- 定期进行性能审计

## 性能优化流程

### 识别瓶颈
- 使用性能监控工具
- 分析用户反馈
- 检查错误日志

### 分析问题
- 使用 Chrome DevTools 分析
- 识别慢渲染组件
- 分析网络请求

### 实施优化
- 根据优先级实施优化
- 验证优化效果
- 更新性能文档

### 持续监控
- 设置性能告警
- 定期检查性能指标
- 持续优化改进