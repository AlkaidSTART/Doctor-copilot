import type {
  AdminUser,
  AdminRole,
  PermissionNode,
  AdminPrompt,
  KnowledgeDoc,
  AuditLog,
} from "./types"

export const mockUsers: AdminUser[] = [
  {
    id: "u1",
    name: "张三",
    email: "zhangsan@hospital.com",
    role: "医生",
    department: "心内科",
    status: "active",
    lastLoginAt: "2026-07-13T09:30:00",
    phone: "13800138001",
  },
  {
    id: "u2",
    name: "李四",
    email: "lisi@hospital.com",
    role: "护士",
    department: "心内科",
    status: "active",
    lastLoginAt: "2026-07-13T08:15:00",
    phone: "13800138002",
  },
  {
    id: "u3",
    name: "王五",
    email: "wangwu@hospital.com",
    role: "管理员",
    department: "信息科",
    status: "active",
    lastLoginAt: "2026-07-12T18:20:00",
    phone: "13800138003",
  },
  {
    id: "u4",
    name: "赵六",
    email: "zhaoliu@hospital.com",
    role: "患者",
    department: "-",
    status: "pending",
    lastLoginAt: "2026-07-10T11:00:00",
  },
  {
    id: "u5",
    name: "陈七",
    email: "chenqi@hospital.com",
    role: "医生",
    department: "呼吸科",
    status: "inactive",
    lastLoginAt: "2026-07-01T14:30:00",
    phone: "13800138005",
  },
  {
    id: "u6",
    name: "刘八",
    email: "liuba@hospital.com",
    role: "护士",
    department: "呼吸科",
    status: "active",
    lastLoginAt: "2026-07-13T07:45:00",
    phone: "13800138006",
  },
  {
    id: "u7",
    name: "周九",
    email: "zhoujiu@hospital.com",
    role: "医生",
    department: "消化科",
    status: "active",
    lastLoginAt: "2026-07-11T16:00:00",
  },
  {
    id: "u8",
    name: "吴十",
    email: "wushi@hospital.com",
    role: "患者",
    department: "-",
    status: "inactive",
    lastLoginAt: "2026-06-28T09:10:00",
  },
]

export const mockRoles: AdminRole[] = [
  {
    id: "r1",
    name: "医生",
    description: "可查看患者、创建随访计划、使用 AI 助手",
    userCount: 3,
    createdAt: "2026-01-10T10:00:00",
  },
  {
    id: "r2",
    name: "护士",
    description: "可执行任务、查看患者基础信息",
    userCount: 2,
    createdAt: "2026-01-10T10:00:00",
  },
  {
    id: "r3",
    name: "管理员",
    description: "系统管理、用户与权限配置",
    userCount: 1,
    createdAt: "2026-01-05T09:00:00",
  },
  {
    id: "r4",
    name: "患者",
    description: "查看个人健康数据、接收随访提醒",
    userCount: 2,
    createdAt: "2026-02-20T11:00:00",
  },
  {
    id: "r5",
    name: "实习生",
    description: "只读权限，不能操作数据",
    userCount: 0,
    createdAt: "2026-05-15T14:00:00",
  },
]

export const mockPermissions: PermissionNode[] = [
  {
    id: "p-patient",
    name: "患者管理",
    children: [
      { id: "p-patient-view", name: "查看患者" },
      { id: "p-patient-edit", name: "编辑患者" },
      { id: "p-patient-delete", name: "删除患者" },
    ],
  },
  {
    id: "p-task",
    name: "任务管理",
    children: [
      { id: "p-task-view", name: "查看任务" },
      { id: "p-task-edit", name: "编辑任务" },
      { id: "p-task-delete", name: "删除任务" },
    ],
  },
  {
    id: "p-ai",
    name: "AI 助手",
    children: [
      { id: "p-ai-chat", name: "使用 AI 对话" },
      { id: "p-ai-prompt", name: "管理 Prompt" },
    ],
  },
  {
    id: "p-system",
    name: "系统配置",
    children: [
      { id: "p-system-user", name: "用户管理" },
      { id: "p-system-role", name: "角色管理" },
      { id: "p-system-audit", name: "查看审计日志" },
    ],
  },
]

export const mockPrompts: AdminPrompt[] = [
  {
    id: "pr1",
    name: "随访摘要生成",
    scenario: "随访记录",
    version: "v1.2",
    status: "published",
    updatedAt: "2026-07-10T10:00:00",
    content:
      "你是一位资深医生助手。请根据以下随访记录生成简洁的摘要：\n\n{{record}}\n\n要求：\n1. 列出关键指标变化\n2. 给出下一步建议",
  },
  {
    id: "pr2",
    name: "风险分层评估",
    scenario: "风险评估",
    version: "v0.9",
    status: "draft",
    updatedAt: "2026-07-08T16:30:00",
    content:
      "请根据患者 {{patient_name}} 的病史与检查报告，评估其心血管风险等级。\n\n病史：{{history}}\n检查报告：{{report}}",
  },
  {
    id: "pr3",
    name: "用药建议",
    scenario: "临床决策支持",
    version: "v2.0",
    status: "published",
    updatedAt: "2026-07-05T09:15:00",
    content:
      "基于患者当前用药 {{medications}} 和过敏史 {{allergies}}，请给出用药相互作用提示。",
  },
]

export const mockKnowledgeDocs: KnowledgeDoc[] = [
  {
    id: "k1",
    name: "高血压诊疗指南 2025.pdf",
    type: "PDF",
    chunkCount: 128,
    status: "parsed",
    updatedAt: "2026-07-12T10:00:00",
  },
  {
    id: "k2",
    name: "心内科随访问题库.xlsx",
    type: "Excel",
    chunkCount: 56,
    status: "parsed",
    updatedAt: "2026-07-11T14:30:00",
  },
  {
    id: "k3",
    name: "药品说明书汇总.docx",
    type: "Word",
    chunkCount: 0,
    status: "parsing",
    updatedAt: "2026-07-13T09:00:00",
  },
  {
    id: "k4",
    name: " Diabetes 管理 FAQ.md",
    type: "Markdown",
    chunkCount: 0,
    status: "failed",
    updatedAt: "2026-07-09T11:20:00",
  },
]

export const mockAuditLogs: AuditLog[] = [
  {
    id: "a1",
    time: "2026-07-13T09:30:00",
    user: "张三",
    operation: "登录",
    object: "系统",
    ip: "192.168.1.10",
    result: "success",
  },
  {
    id: "a2",
    time: "2026-07-13T09:25:00",
    user: "王五",
    operation: "禁用用户",
    object: "陈七",
    ip: "192.168.1.20",
    result: "success",
  },
  {
    id: "a3",
    time: "2026-07-13T09:10:00",
    user: "李四",
    operation: "更新随访任务",
    object: "Task #1024",
    ip: "192.168.1.12",
    result: "failure",
  },
  {
    id: "a4",
    time: "2026-07-13T08:55:00",
    user: "王五",
    operation: "修改角色权限",
    object: "医生",
    ip: "192.168.1.20",
    result: "success",
  },
  {
    id: "a5",
    time: "2026-07-13T08:40:00",
    user: "张三",
    operation: "导出报告",
    object: "随访报告",
    ip: "192.168.1.10",
    result: "success",
  },
  {
    id: "a6",
    time: "2026-07-12T18:20:00",
    user: "王五",
    operation: "删除知识库文档",
    object: "旧版指南.pdf",
    ip: "192.168.1.20",
    result: "success",
  },
]
