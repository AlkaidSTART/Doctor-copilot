# PRD-07 Timeline

## 背景
Timeline 提供患者纵向健康事件视图。

## 为什么
医生需要快速理解“发生了什么、何时发生、影响如何”。

## 目标
统一展示任务、观测、告警、AI 摘要与人工备注。

## 非目标
- 不承担原始日志存储。

## 范围
事件聚合、排序、过滤、锚点跳转。

## 流程图（Mermaid）
```mermaid
flowchart LR
  A[多源事件] --> B[标准化]
  B --> C[排序聚合]
  C --> D[Timeline 展示]
```

## ASCII 图
```text
[T-3] Task Done
[T-2] BP High Alert
[T-1] Nurse Call Note
[T]   Doctor Plan Update
```

## 表格
| 事件类型 | 来源 |
|---|---|
| observation | 患者回填 |
| task | 任务系统 |
| alert | 风险引擎 |
| summary | AI 摘要 |

## 相关文档
| 文档 | 链接 |
|---|---|
| PRD 总览 | [README.md](./README.md) |
| Alert | [08-alert.md](./08-alert.md) |
| Database | [../08-database/README.md](../08-database/README.md) |

## 示例
医生在 Timeline 上按“异常事件”过滤后，仅查看风险相关节点。

## 风险
| 风险 | 缓解 |
|---|---|
| 时间线噪声过高 | 默认聚合与分层展开 |

## Future Work
- 支持跨患者队列时间线视图。
