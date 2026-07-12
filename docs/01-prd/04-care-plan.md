# PRD-04 Care Plan

## 背景
Care Plan 定义患者阶段性目标与执行策略。

## 为什么
没有标准化计划就无法形成可追踪闭环。

## 目标
支持计划创建、版本化、发布与调整。

## 非目标
- 不自动生成医疗处方。

## 范围
目标、频率、任务模板、生效周期。

## 流程图（Mermaid）
```mermaid
flowchart LR
  A[创建计划] --> B[医生审核]
  B --> C[发布生效]
  C --> D[任务执行]
  D --> E[反馈调整]
```

## ASCII 图
```text
Draft -> Review -> Active -> Execute -> Revise
```

## 表格
| 维度 | 规则 |
|---|---|
| 状态 | draft/active/archived |
| 版本 | 递增，不覆盖历史 |
| 变更 | 必填变更原因 |

## 相关文档
| 文档 | 链接 |
|---|---|
| PRD 总览 | [README.md](./README.md) |
| Task | [05-task.md](./05-task.md) |
| Database | [../08-database/README.md](../08-database/README.md) |

## 示例
医生将“每日血压记录”频率从 1 次调整为 2 次并生成新版本计划。

## 风险
| 风险 | 缓解 |
|---|---|
| 计划频繁变更导致混乱 | 版本锁定 + 生效时间 |

## Future Work
- 引入病种计划模板市场。
