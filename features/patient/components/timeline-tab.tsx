"use client"

import * as React from "react"
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  MessageCircle,
  Sparkles,
} from "lucide-react"

import { cn } from "@/lib/utils"
import type { TimelineEvent, TimelineEventType } from "@/features/patient/types"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "@/components/common/empty-state"

interface TimelineTabProps {
  events: TimelineEvent[]
  loading?: boolean
  error?: Error | null
  onRetry?: () => void
}

interface EventConfig {
  icon: React.ElementType
  label: string
  colorClass: string
  bgClass: string
  ringClass: string
}

const eventConfig: Record<TimelineEventType, EventConfig> = {
  alert: {
    icon: AlertTriangle,
    label: "预警",
    colorClass: "text-[var(--color-error-700)]",
    bgClass: "bg-[var(--color-error-100)]",
    ringClass: "ring-[var(--color-error-500)]",
  },
  observation: {
    icon: Activity,
    label: "观察",
    colorClass: "text-[var(--color-info-700)]",
    bgClass: "bg-[var(--color-info-100)]",
    ringClass: "ring-[var(--color-info-500)]",
  },
  task: {
    icon: CheckCircle,
    label: "任务",
    colorClass: "text-[var(--color-success-700)]",
    bgClass: "bg-[var(--color-success-100)]",
    ringClass: "ring-[var(--color-success-500)]",
  },
  message: {
    icon: MessageCircle,
    label: "消息",
    colorClass: "text-[var(--color-neutral-700)]",
    bgClass: "bg-[var(--color-neutral-100)]",
    ringClass: "ring-[var(--color-neutral-500)]",
  },
  "ai-insight": {
    icon: Sparkles,
    label: "AI 洞察",
    colorClass: "text-[var(--color-primary-700)]",
    bgClass: "bg-[var(--color-primary-100)]",
    ringClass: "ring-[var(--color-primary-500)]",
  },
}

function groupEventsByDate(events: TimelineEvent[]): Record<string, TimelineEvent[]> {
  return events.reduce((groups, event) => {
    const date = event.date
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(event)
    return groups
  }, {} as Record<string, TimelineEvent[]>)
}

function formatDateLabel(dateString: string): string {
  const today = new Date()
  const date = new Date(dateString)
  const isToday =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()

  if (isToday) return "今天"
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
}

export function TimelineTab({
  events,
  loading = false,
  error = null,
  onRetry,
}: TimelineTabProps) {
  const [expandedId, setExpandedId] = React.useState<string | null>(null)

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        {Array.from({ length: 3 }).map((_, groupIndex) => (
          <div key={groupIndex} className="flex flex-col gap-3">
            <Skeleton className="h-5 w-24" />
            {Array.from({ length: 2 }).map((_, eventIndex) => (
              <div key={eventIndex} className="flex gap-3">
                <Skeleton className="size-8 rounded-full" />
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <EmptyState
        icon={Activity}
        title="加载失败"
        description="无法获取患者时间轴，请重试"
        action={onRetry ? { label: "重新加载", onClick: onRetry } : undefined}
      />
    )
  }

  if (events.length === 0) {
    return (
      <EmptyState
        icon={MessageCircle}
        title="暂无事件"
        description="点击创建随访，记录患者最新动态"
        action={{ label: "创建随访", onClick: () => {} }}
      />
    )
  }

  const grouped = groupEventsByDate(events)
  const sortedDates = Object.keys(grouped).sort((a, b) => (a > b ? -1 : 1))

  return (
    <div className="flex flex-col gap-6">
      {sortedDates.map((date) => (
        <div key={date} className="flex flex-col gap-3">
          <h3 className="text-[length:var(--text-sm)] font-semibold text-[var(--color-text-secondary)]">
            {formatDateLabel(date)}
          </h3>

          <div className="relative flex flex-col gap-4 pl-3">
            <div className="absolute top-2 bottom-2 left-[1.1875rem] w-px bg-[var(--color-border-divider)]" />

            {grouped[date].map((event) => {
              const config = eventConfig[event.type]
              const Icon = config.icon
              const isExpanded = expandedId === event.id

              return (
                <button
                  key={event.id}
                  type="button"
                  onClick={() =>
                    setExpandedId((current) =>
                      current === event.id ? null : event.id
                    )
                  }
                  className="relative flex items-start gap-3 text-left"
                  aria-expanded={isExpanded}
                >
                  <span
                    className={cn(
                      "relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full ring-2 ring-background",
                      config.bgClass
                    )}
                  >
                    <Icon
                      className={cn("size-3.5", config.colorClass)}
                      aria-hidden="true"
                    />
                  </span>

                  <div className="flex flex-1 flex-col gap-1 pb-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[length:var(--text-sm)] font-medium text-[var(--color-text-primary)]">
                        {event.time}
                      </span>
                      <span className="text-[length:var(--text-sm)] text-[var(--color-text-primary)]">
                        {event.title}
                      </span>
                      <span
                        className={cn(
                          "rounded-full px-1.5 py-0.5 text-[length:var(--text-xs)] font-medium",
                          config.bgClass,
                          config.colorClass
                        )}
                      >
                        {config.label}
                      </span>
                    </div>

                    <p className="text-[length:var(--text-sm)] text-[var(--color-text-tertiary)]">
                      {event.description}
                    </p>

                    {isExpanded && event.detail && (
                      <Card className="mt-2 border-[var(--color-border-default)] bg-[var(--color-neutral-50)] shadow-none">
                        <CardContent className="py-3">
                          <p className="text-[length:var(--text-sm)] text-[var(--color-text-secondary)]">
                            {event.detail}
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
