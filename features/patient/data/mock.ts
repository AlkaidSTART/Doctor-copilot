import type {
  Patient,
  TimelineEvent,
  CarePlan,
  Indicator,
  Task,
  ChatMessage,
} from "@/features/patient/types"

export const mockPatient: Patient = {
  id: "p1",
  name: "张三",
  gender: "男",
  age: 68,
  phone: "13812348888",
  diagnosis: ["高血压", "2型糖尿病", "高脂血症", "冠心病"],
  riskLevel: "p2",
  lastUpdated: "2024-07-12T09:30:00+08:00",
  avatarUrl: undefined,
}

export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: "e1",
    type: "alert",
    date: "2024-07-12",
    time: "09:30",
    title: "血压异常 Alert",
    description: "收缩压 160mmHg，需立即关注",
    detail:
      "患者今日 09:30 自测血压为 160/100 mmHg，高于目标值 140/90 mmHg。建议复核用药依从性，并考虑今日内电话随访。",
  },
  {
    id: "e2",
    type: "observation",
    date: "2024-07-12",
    time: "08:15",
    title: "患者上传空腹血糖",
    description: "血糖 7.2mmol/L，在正常范围",
    detail:
      "空腹血糖 7.2 mmol/L，目标范围 4.4-7.0 mmol/L。略高于目标上限，建议继续关注饮食控制。",
  },
  {
    id: "e3",
    type: "task",
    date: "2024-07-11",
    time: "20:00",
    title: "服药提醒已发送",
    description: "患者已确认",
    detail: "系统于 20:00 发送服药提醒，患者于 20:05 标记已服用。",
  },
  {
    id: "e4",
    type: "message",
    date: "2024-07-11",
    time: "16:45",
    title: "患者家属留言",
    description: "最近老人夜间偶有胸闷，是否需要调整用药？",
    detail:
      "家属反馈患者近 3 日夜间平卧时有胸闷，坐起后缓解。建议关注心功能，必要时安排心电图检查。",
  },
  {
    id: "e5",
    type: "ai-insight",
    date: "2024-07-11",
    time: "10:20",
    title: "AI 风险洞察",
    description: "未来 7 天血压失控风险较高",
    detail:
      "综合近 7 天血压、服药依从性及饮食记录，模型预测未来 7 天血压超标概率为 72%，建议加强随访。",
  },
]

export const mockCarePlan: CarePlan = {
  id: "cp1",
  name: "高血压综合管理计划",
  goal: "BP < 140/90 mmHg，空腹血糖 < 7.0 mmol/L",
  period: "2024.07 - 2024.12",
  status: "in-progress",
  owner: "李医生",
}

export const mockIndicators: Indicator[] = [
  {
    id: "i1",
    name: "血压",
    unit: "mmHg",
    goal: "< 140/90",
    current: "160/100",
    trend: [138, 142, 145, 148, 152, 158, 160],
  },
  {
    id: "i2",
    name: "血糖",
    unit: "mmol/L",
    goal: "4.4 - 7.0",
    current: "7.2",
    trend: [6.8, 7.0, 6.9, 7.1, 7.3, 7.2, 7.2],
  },
]

export const mockTasks: Task[] = [
  {
    id: "t1",
    title: "完成张三随访",
    type: "电话随访",
    assignee: "李护士",
    status: "pending",
    dueTime: "今天 09:30",
  },
  {
    id: "t2",
    title: "复查心电图",
    type: "检查预约",
    assignee: "王医生",
    status: "in-progress",
    dueTime: "今天 14:00",
  },
  {
    id: "t3",
    title: "调整降压方案",
    type: "医嘱",
    assignee: "李医生",
    status: "completed",
    dueTime: "昨天 18:00",
  },
  {
    id: "t4",
    title: "上传本周饮食记录",
    type: "患者任务",
    assignee: "患者本人",
    status: "overdue",
    dueTime: "昨天 12:00",
  },
]

export const mockMessages: ChatMessage[] = [
  {
    id: "m1",
    role: "ai",
    content: "你好，张三最近 3 天血压偏高，建议关注。",
    timestamp: "2024-07-12 09:31",
  },
  {
    id: "m2",
    role: "user",
    content: "收到，原因可能是什么？",
    timestamp: "2024-07-12 09:32",
  },
  {
    id: "m3",
    role: "ai",
    content:
      "可能与近期钠盐摄入增加、服药依从性下降有关。建议今日内电话随访，确认用药情况并提醒低盐饮食。",
    timestamp: "2024-07-12 09:33",
  },
]

export const quickQuestions = [
  "查看血压趋势",
  "查看用药记录",
  "生成随访建议",
  "评估当前风险",
]
