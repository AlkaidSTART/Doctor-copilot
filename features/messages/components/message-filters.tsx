"use client"

import * as React from "react"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { MessageFilters as Filters, MessageType, ReadStatus, TimeRange, RiskFilter } from "@/features/messages/types"
import type { RiskLevel } from "@/components/common/risk-badge"

const TYPE_OPTIONS: { value: MessageType | "all"; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "patient", label: "患者" },
  { value: "system", label: "系统" },
  { value: "task", label: "任务" },
  { value: "risk", label: "风险" },
  { value: "ai", label: "AI" },
]

const STATUS_OPTIONS: { value: ReadStatus; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "unread", label: "未读" },
  { value: "read", label: "已读" },
]

const TIME_OPTIONS: { value: TimeRange; label: string }[] = [
  { value: "today", label: "今天" },
  { value: "week", label: "最近 7 天" },
  { value: "month", label: "最近 30 天" },
]

const RISK_OPTIONS: { value: RiskFilter; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "p1", label: "P1 极高" },
  { value: "p2", label: "P2 高" },
  { value: "p3", label: "P3 中" },
  { value: "p4", label: "P4 低" },
  { value: "normal", label: "正常" },
  { value: "unknown", label: "未知" },
]

interface MessageFiltersProps {
  filters: Filters
  onChange: (filters: Filters) => void
  resultCount: number
  className?: string
}

export function MessageFilters({ filters, onChange, resultCount, className }: MessageFiltersProps) {
  const update = React.useCallback(
    <K extends keyof Filters>(key: K, value: Filters[K]) => {
      onChange({ ...filters, [key]: value })
    },
    [filters, onChange]
  )

  return (
    <div className={cn("flex flex-col gap-3 border-b border-[var(--color-border-divider)] bg-[var(--color-bg-card)] p-3", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <Select value={filters.type} onValueChange={(value) => update("type", value as Filters["type"])}>
          <SelectTrigger className="w-auto min-w-[96px]">
            <SelectValue placeholder="消息类型" />
          </SelectTrigger>
          <SelectContent>
            {TYPE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.status} onValueChange={(value) => update("status", value as ReadStatus)}>
          <SelectTrigger className="w-auto min-w-[80px]">
            <SelectValue placeholder="阅读状态" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.timeRange} onValueChange={(value) => update("timeRange", value as TimeRange)}>
          <SelectTrigger className="w-auto min-w-[104px]">
            <SelectValue placeholder="时间范围" />
          </SelectTrigger>
          <SelectContent>
            {TIME_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.riskLevel} onValueChange={(value) => update("riskLevel", value as RiskFilter)}>
          <SelectTrigger className="w-auto min-w-[88px]">
            <SelectValue placeholder="风险等级" />
          </SelectTrigger>
          <SelectContent>
            {RISK_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative flex-1 basis-40">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
          <Input
            type="search"
            placeholder="搜索患者、消息内容..."
            value={filters.search}
            onChange={(event) => update("search", event.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="text-[length:var(--text-xs)] text-[var(--color-text-tertiary)]">
        共 {resultCount} 条消息
      </div>
    </div>
  )
}
