# PRD-11 Notification

## 背景
通知系统负责将任务、告警、消息及时触达责任人。

## 为什么
无可靠通知将导致流程断裂。

## 目标
提供站内通知、分级策略、已读追踪与重试。

## 非目标
- 不集成第三方短信网关（MVP）。

## 范围
站内通知中心与事件触发器。

## 流程图（Mermaid）
```mermaid
flowchart LR
  A[事件] --> B[通知策略]
  B --> C[生成通知]
  C --> D[用户处理]
```

## ASCII 图
```text
Event -> Policy -> Inbox -> Acknowledge
```

## 表格
| 事件 | 接收方 |
|---|---|
| 任务超时 | 护士 |
| P1 告警 | 医生 + 值班组 |
| 配置变更 | 管理员 |

## 相关文档
| 文档 | 链接 |
|---|---|
| PRD 总览 | [README.md](./README.md) |
| 消息中心 | [14-message-center.md](./14-message-center.md) |
| API | [../07-api/README.md](../07-api/README.md) |

## 示例
P1 告警触发后，医生在 5 分钟内收到站内红色高优先消息。

## 风险
| 风险 | 缓解 |
|---|---|
| 通知风暴 | 去重、合并、限频 |

## Future Work
- 扩展短信/邮件/IM 渠道适配器。
