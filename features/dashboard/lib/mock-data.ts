import type { RiskPatient, TimelineEvent, TodoTask, BriefEvent, KpiData } from "./types"

const todayAt = (hour: number, minute: number) => {
  const date = new Date()
  date.setHours(hour, minute, 0, 0)
  return date
}

const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60 * 1000)
const hoursAgo = (hours: number) => new Date(Date.now() - hours * 60 * 60 * 1000)

export const kpis: KpiData[] = [
  { label: "在管患者", value: 128, delta: "+5", trend: "up", href: "/patients" },
  { label: "今日任务", value: 12, delta: "-3", trend: "down", href: "/tasks" },
  { label: "P1 风险", value: 2, delta: "+1", trend: "up", href: "/patients?risk=p1", alert: "error" },
  { label: "待回复", value: 6, delta: "+2", trend: "up", href: "/messages" },
]

export const riskPatients: RiskPatient[] = [
  {
    id: "p-001",
    name: "张三",
    age: 68,
    diagnosis: "高血压",
    level: "p1",
    description: "血压 160/100",
    updatedAt: minutesAgo(2),
  },
  {
    id: "p-002",
    name: "李四",
    age: 55,
    diagnosis: "2 型糖尿病",
    level: "p2",
    description: "血糖 11.2",
    updatedAt: minutesAgo(15),
  },
  {
    id: "p-003",
    name: "王五",
    age: 72,
    diagnosis: "冠心病",
    level: "p3",
    description: "用药依从低",
    updatedAt: hoursAgo(1),
  },
  {
    id: "p-004",
    name: "赵六",
    age: 60,
    diagnosis: "心衰",
    level: "p4",
    description: "体重下降 2kg",
    updatedAt: hoursAgo(3),
  },
]

export const timelineEvents: Record<string, TimelineEvent[]> = {
  "p-001": [
    { id: "e-1", type: "metric", description: "血压 160/100，高于目标值", time: minutesAgo(2) },
    { id: "e-2", type: "feedback", description: "患者报告头晕、乏力", time: hoursAgo(2) },
    { id: "e-3", type: "care", description: "调整降压药剂量", time: hoursAgo(5) },
  ],
  "p-002": [
    { id: "e-4", type: "metric", description: "空腹血糖 11.2 mmol/L", time: minutesAgo(15) },
    { id: "e-5", type: "feedback", description: "新增 2 条饮食反馈", time: hoursAgo(3) },
    { id: "e-6", type: "care", description: "建议复查糖化血红蛋白", time: hoursAgo(6) },
  ],
  "p-003": [
    { id: "e-7", type: "risk", description: "用药依从率下降至 60%", time: hoursAgo(1) },
    { id: "e-8", type: "feedback", description: "患者反馈服药后胃部不适", time: hoursAgo(4) },
    { id: "e-9", type: "care", description: "药师介入评估用药方案", time: hoursAgo(8) },
  ],
  "p-004": [
    { id: "e-10", type: "metric", description: "体重较上周下降 2kg", time: hoursAgo(3) },
    { id: "e-11", type: "feedback", description: "下肢水肿减轻", time: hoursAgo(7) },
    { id: "e-12", type: "care", description: "随访计划已更新", time: hoursAgo(12) },
  ],
}

export const todoTasks: TodoTask[] = [
  {
    id: "t-001",
    title: "完成张三随访",
    patientId: "p-001",
    patientName: "张三",
    dueTime: todayAt(9, 30),
    priority: "p1",
  },
  {
    id: "t-002",
    title: "提醒李四上传指标",
    patientId: "p-002",
    patientName: "李四",
    dueTime: todayAt(10, 0),
    priority: "p2",
  },
  {
    id: "t-003",
    title: "审核王五反馈",
    patientId: "p-003",
    patientName: "王五",
    dueTime: todayAt(11, 0),
    priority: "p3",
  },
  {
    id: "t-004",
    title: "更新赵六护理计划",
    patientId: "p-004",
    patientName: "赵六",
    dueTime: todayAt(14, 0),
    priority: "p4",
  },
  {
    id: "t-005",
    title: "随访周琴血压记录",
    patientId: "p-005",
    patientName: "周琴",
    dueTime: todayAt(9, 0),
    priority: "p2",
  },
  {
    id: "t-006",
    title: "确认吴刚用药清单",
    patientId: "p-006",
    patientName: "吴刚",
    dueTime: todayAt(10, 30),
    priority: "p3",
  },
  {
    id: "t-007",
    title: "回复郑华血糖咨询",
    patientId: "p-007",
    patientName: "郑华",
    dueTime: todayAt(11, 30),
    priority: "p1",
  },
  {
    id: "t-008",
    title: "安排孙丽复查",
    patientId: "p-008",
    patientName: "孙丽",
    dueTime: todayAt(13, 0),
    priority: "p4",
  },
  {
    id: "t-009",
    title: "审核钱七检查报告",
    patientId: "p-009",
    patientName: "钱七",
    dueTime: todayAt(13, 30),
    priority: "p3",
  },
  {
    id: "t-010",
    title: "提醒冯八上传饮食",
    patientId: "p-010",
    patientName: "冯八",
    dueTime: todayAt(15, 0),
    priority: "p4",
  },
  {
    id: "t-011",
    title: "处理陈九异常心率",
    patientId: "p-011",
    patientName: "陈九",
    dueTime: todayAt(15, 30),
    priority: "p2",
  },
  {
    id: "t-012",
    title: "完成刘十出院随访",
    patientId: "p-012",
    patientName: "刘十",
    dueTime: todayAt(16, 0),
    priority: "p3",
  },
]

export const briefEvents: BriefEvent[] = [
  {
    id: "b-001",
    type: "metric",
    patientId: "p-001",
    patientName: "张三",
    summary: "BP 160/100",
    time: hoursAgo(2),
  },
  {
    id: "b-002",
    type: "feedback",
    patientId: "p-002",
    patientName: "李四",
    summary: "新增 2 条反馈",
    time: hoursAgo(5),
  },
  {
    id: "b-003",
    type: "risk",
    patientId: "p-003",
    patientName: "王五",
    summary: "用药依从率下降",
    time: hoursAgo(12),
  },
]
