# Business Value

## 背景
平台需同时满足临床价值、运营效率与合规治理价值。

## 为什么
没有可量化商业价值，MVP 难以获得持续投入。

## 目标
明确价值链路与可衡量收益。

## 非目标
- 不做收入预测模型。

## 范围
机构内临床效率、患者依从性、质量与风险控制。

## 流程图（Mermaid）
```mermaid
flowchart LR
  A[流程数字化] --> B[执行效率提升]
  B --> C[依从性提升]
  C --> D[风险事件减少]
  D --> E[质量与成本改进]
```

## ASCII 图
```text
Efficiency + Adherence + Safety => Better Outcomes
```

## 表格
| 价值维度 | 指标示例 |
|---|---|
| 临床 | 高风险响应时长 |
| 运营 | 护士单日处理任务数 |
| 患者 | 任务完成率、复诊率 |
| 合规 | 审计覆盖率、权限违规率 |

## 相关文档
| 文档 | 链接 |
|---|---|
| Discovery 总览 | [README.md](./README.md) |
| Success Metrics | [success-metrics.md](./success-metrics.md) |
| Roadmap | [../10-roadmap/README.md](../10-roadmap/README.md) |

## 示例
部署后 3 个月，平均告警响应时间从 8 小时下降到 2 小时。

## 风险
| 风险 | 缓解 |
|---|---|
| 指标归因困难 | 建立 A/B 阶段对照基线 |

## Future Work
- 增加按病种 ROI 仪表盘。
