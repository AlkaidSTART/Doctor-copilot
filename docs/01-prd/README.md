# 01 PRD 总览

## 背景
本目录定义 Doctor Copilot 的功能性产品需求，作为设计、研发、测试与验收基线。

## 为什么
将需求拆分为模块化 PRD，可支持多团队并行交付与独立验收。

## 目标
- 覆盖登录到管理后台的核心业务链路。
- 形成可追踪的验收与依赖关系。

## 非目标
- 不提供 API 字段级最终定义（见 [07-api](../07-api/README.md)）。
- 不提供数据库 DDL（见 [08-database](../08-database/README.md)）。

## 范围
共 20 个 PRD 子文档，覆盖 MVP 与关键治理能力。

## 流程图（Mermaid）
```mermaid
flowchart LR
  A[登录] --> B[首页]
  B --> C[患者管理]
  C --> D[Care Plan/Task/Follow-up]
  D --> E[Timeline/Alert/Brief]
  E --> F[AI Chat/Notification]
  F --> G[Admin/权限/设置]
```

## ASCII 图
```text
Auth -> Workbench -> Patient Ops -> AI Assist -> Governance
```

## PRD 列表
| 编号 | 文档 |
|---|---|
| 01 | [登录](./01-login.md) |
| 02 | [首页](./02-dashboard.md) |
| 03 | [患者管理](./03-patient-management.md) |
| 04 | [Care Plan](./04-care-plan.md) |
| 05 | [Task](./05-task.md) |
| 06 | [Follow-up](./06-follow-up.md) |
| 07 | [Timeline](./07-timeline.md) |
| 08 | [Alert](./08-alert.md) |
| 09 | [Doctor Brief](./09-doctor-brief.md) |
| 10 | [AI Chat](./10-ai-chat.md) |
| 11 | [Notification](./11-notification.md) |
| 12 | [Admin](./12-admin.md) |
| 13 | [权限](./13-permission.md) |
| 14 | [消息中心](./14-message-center.md) |
| 15 | [设置](./15-settings.md) |
| 16 | [AI 配置](./16-ai-config.md) |
| 17 | [Prompt 管理](./17-prompt-management.md) |
| 18 | [Knowledge Base](./18-knowledge-base.md) |
| 19 | [异常处理](./19-exception-handling.md) |
| 20 | [验收标准](./20-acceptance-criteria.md) |

## 示例
开发 Task 模块时，需同时参考 [05-task.md](./05-task.md)、[13-permission.md](./13-permission.md)、[20-acceptance-criteria.md](./20-acceptance-criteria.md)。

## 风险
| 风险 | 缓解 |
|---|---|
| 模块边界重叠 | 在各 PRD 增加“上游/下游依赖” |

## Future Work
- 引入 PRD 版本号与变更记录规范。

