import type { RiskLevel } from "@/components/common/risk-badge"

export interface RiskPatient {
  id: string
  name: string
  age: number
  diagnosis: string
  level: RiskLevel
  description: string
  updatedAt: Date
}

export interface TimelineEvent {
  id: string
  type: "metric" | "feedback" | "care" | "risk"
  description: string
  time: Date
}

export interface TodoTask {
  id: string
  title: string
  patientId: string
  patientName: string
  dueTime: Date
  priority: RiskLevel
}

export interface BriefEvent {
  id: string
  type: "metric" | "feedback" | "risk"
  patientId: string
  patientName: string
  summary: string
  time: Date
}

export interface KpiData {
  label: string
  value: string | number
  delta?: string
  trend?: "up" | "down" | "neutral"
  href?: string
  alert?: "error" | "warning"
}
