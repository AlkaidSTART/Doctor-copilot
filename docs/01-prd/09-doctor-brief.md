# PRD-09 Doctor Brief

## 背景

Doctor Brief 为医生提供可操作的每日摘要。

## 为什么

医生时间稀缺，需要高信噪比信息输入。

## 目标

生成患者优先级、关键变化与建议动作。

## 非目标

- 不输出不可追溯的黑盒结论。

## 范围

基于 Timeline、Alert、Care Plan 的摘要生成。

## 流程图（Mermaid）

```mermaid
flowchart LR
  A[事件聚合] --> B[AI 摘要]
  B --> C[医生确认]
  C --> D[执行动作]
```

## ASCII 图

```text
Events -> Brief -> Doctor Decision -> Plan/Task Update
```

## 表格

| 输出块           | 内容           |
| ---------------- | -------------- |
| Top Risks        | 需优先处理患者 |
| Trend            | 关键指标变化   |
| Suggested Action | 建议操作项     |

## 相关文档
| 文档 | 链接 |
|---|---|
| PRD 总览 | [README.md](./README.md) |
| AI Chat | [10-ai-chat.md](./10-ai-chat.md) |
| AI 设计 | [../09-ai/README.md](../09-ai/README.md) |

## 示例

Brief 显示“患者 A 风险上升，建议 24h 内增加随访频率”。

## 风险

| 风险         | 缓解                   |
| ------------ | ---------------------- |
| 建议不可执行 | 强制输出可操作动作模板 |

## Future Work

- 支持跨患者分组 Brief。
