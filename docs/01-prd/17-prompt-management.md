# PRD-17 Prompt 管理

## 背景
Prompt 是 AI 能力一致性的核心资产。

## 为什么
无版本化管理会导致输出不可控。

## 目标
支持 Prompt 版本、灰度发布、回滚与审计。

## 非目标
- 不提供通用低代码工作流编排。

## 范围
Prompt 模板、变量、策略标签管理。

## 流程图（Mermaid）
```mermaid
flowchart LR
  A[编辑 Prompt] --> B[测试]
  B --> C[发布版本]
  C --> D[灰度验证]
  D --> E[全量或回滚]
```

## ASCII 图
```text
Draft -> Test -> Publish -> Canary -> Rollout/Rollback
```

## 表格
| 字段 | 说明 |
|---|---|
| prompt_key | 唯一标识 |
| version | 语义版本 |
| status | draft/active/deprecated |

## 相关文档
| 文档 | 链接 |
|---|---|
| PRD 总览 | [README.md](./README.md) |
| AI 配置 | [16-ai-config.md](./16-ai-config.md) |
| AI 设计 | [../09-ai/README.md](../09-ai/README.md) |

## 示例
“doctor_brief_v1.3”灰度 10% 后采纳率提升，升级为默认版本。

## 风险
| 风险 | 缓解 |
|---|---|
| 变量注入错误 | 发布前模板静态校验 |

## Future Work
- 增加自动 Prompt A/B 测试。
