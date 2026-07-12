# Doctor Journey

## 背景
医生在有限时间内需要完成风险判断与计划调整。

## 为什么
医生流程效率决定平台临床价值上限。

## 目标
定义医生的日常决策闭环：Brief -> 判断 -> 调整 -> 复盘。

## 非目标
- 不涵盖科研统计报表流程。

## 范围
医生在 Dashboard、Patient、Care Plan、Brief、Alert 的操作。

## 流程图（Mermaid）
```mermaid
flowchart LR
  A[查看 Doctor Brief] --> B[查看高风险患者]
  B --> C[检查 Timeline]
  C --> D[调整 Care Plan]
  D --> E[下发 Follow-up]
```

## ASCII 图
```text
Brief -> Risk List -> Timeline -> Plan Update -> Follow-up
```

## 表格
| 节点 | 决策问题 |
|---|---|
| Brief | 谁最需要优先干预 |
| Timeline | 风险变化是否持续 |
| Care Plan | 是否调整目标/频率 |

## 相关文档
| 文档 | 链接 |
|---|---|
| Discovery 总览 | [README.md](./README.md) |
| PRD Doctor Brief | [../01-prd/09-doctor-brief.md](../01-prd/09-doctor-brief.md) |
| UI | [../06-ui/README.md](../06-ui/README.md) |

## 示例
医生在晨会前 10 分钟完成 30 位患者风险排序并下发 5 条重点随访任务。

## 风险
| 风险 | 缓解 |
|---|---|
| 信息过载 | 默认摘要 + 可展开详情 |

## Future Work
- 增加科室多医生协作与交接班视图。
