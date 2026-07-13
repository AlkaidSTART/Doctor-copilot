import type { RiskLevel } from "@/components/common/risk-badge"

export type MessageType = "patient" | "system" | "task" | "risk" | "ai"

export type ReadStatus = "all" | "unread" | "read"
export type TimeRange = "today" | "week" | "month"
export type RiskFilter = "all" | RiskLevel

export interface ThreadMessage {
  id: string
  role: "incoming" | "outgoing"
  content: string
  timestamp: Date
}

export interface AiSuggestionAction {
  id: string
  label: string
  variant?: "primary" | "secondary" | "ghost"
}

export interface AiSuggestion {
  id: string
  title: string
  description: string
  actions: AiSuggestionAction[]
}

export interface Message {
  id: string
  type: MessageType
  senderName: string
  senderAvatar?: string
  senderInitial: string
  summary: string
  content: string
  timestamp: Date
  isRead: boolean
  isPinned?: boolean
  patientName?: string
  taskName?: string
  riskLevel?: RiskLevel
  tags?: string[]
  thread?: ThreadMessage[]
  aiSuggestions?: AiSuggestion[]
}

export interface MessageFilters {
  type: MessageType | "all"
  status: ReadStatus
  timeRange: TimeRange
  riskLevel: RiskFilter
  search: string
}
