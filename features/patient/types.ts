export type Gender = "男" | "女" | "其他"

export type RiskLevel = "p1" | "p2" | "p3" | "p4" | "normal"

export interface Patient {
  id: string
  name: string
  gender: Gender
  age: number
  phone: string
  diagnosis: string[]
  riskLevel: RiskLevel
  lastUpdated: string
  avatarUrl?: string
}

export type TimelineEventType =
  | "alert"
  | "observation"
  | "task"
  | "message"
  | "ai-insight"

export interface TimelineEvent {
  id: string
  type: TimelineEventType
  date: string
  time: string
  title: string
  description: string
  detail?: string
}

export type CarePlanStatus = "in-progress" | "completed" | "paused"

export interface CarePlan {
  id: string
  name: string
  goal: string
  period: string
  status: CarePlanStatus
  owner: string
}

export interface Indicator {
  id: string
  name: string
  unit: string
  goal: string
  current: string
  trend: number[]
}

export type TaskStatus = "pending" | "in-progress" | "completed" | "overdue"

export interface Task {
  id: string
  title: string
  type: string
  assignee: string
  status: TaskStatus
  dueTime: string
}

export type ChatRole = "user" | "ai"

export interface ChatMessage {
  id: string
  role: ChatRole
  content: string
  timestamp: string
}

export type TabValue = "timeline" | "care-plan" | "tasks" | "ai-chat"
