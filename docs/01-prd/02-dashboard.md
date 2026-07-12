# PRD-02 首页（Dashboard）

## 背景
首页是医生/护士每日进入系统后的主工作台。

## 为什么
首页的信息编排直接影响响应效率。

## 目标
展示待办任务、风险患者、关键指标与快捷入口。

## 非目标
- 不在首页承载所有详情编辑。

## 范围
角色化卡片、筛选、跳转与刷新机制。

## 流程图（Mermaid）
```mermaid
flowchart LR
  A[加载角色] --> B[加载待办]
  B --> C[加载风险列表]
  C --> D[渲染工作台]
```

## ASCII 图
```text
+---------------- Dashboard ---------------+
| KPI | Risk Queue | To-do | Quick Actions |
+------------------------------------------+
```

## 表格
| 区块 | 数据源 |
|---|---|
| 风险队列 | Alert + Risk Engine |
| 待办 | Task |
| 医生摘要 | Doctor Brief |

## 相关文档
| 文档 | 链接 |
|---|---|
| PRD 总览 | [README.md](./README.md) |
| Doctor Brief | [09-doctor-brief.md](./09-doctor-brief.md) |
| UI | [../06-ui/README.md](../06-ui/README.md) |

## 示例
医生点击“高风险患者”卡片后进入对应患者 Timeline 页面。

## 风险
| 风险 | 缓解 |
|---|---|
| 首页加载慢 | 分块并行请求 + 骨架屏 |

## Future Work
- 增加个性化卡片编排。
