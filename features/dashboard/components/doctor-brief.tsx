"use client"

import * as React from "react"
import Link from "next/link"
import { Activity, MessageSquare, AlertTriangle, Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { EmptyState } from "@/components/common/empty-state"
import type { BriefEvent } from "../lib/types"
import { formatRelativeTime } from "../lib/format"

interface DoctorBriefProps {
  events: BriefEvent[]
  loading?: boolean
}

const eventConfig: Record<
  BriefEvent["type"],
  { icon: React.ElementType; label: string; className: string }
> = {
  metric: {
    icon: Activity,
    label: "指标",
    className: "bg-[var(--color-info-100)] text-[var(--color-info-700)]",
  },
  feedback: {
    icon: MessageSquare,
    label: "反馈",
    className: "bg-[var(--color-primary-100)] text-[var(--color-primary-700)]",
  },
  risk: {
    icon: AlertTriangle,
    label: "风险",
    className: "bg-[var(--color-error-100)] text-[var(--color-error-700)]",
  },
}

export function DoctorBrief({ events, loading }: DoctorBriefProps) {
  return (
    <Card className="h-full border-[var(--color-border-default)] bg-[var(--color-bg-card)]">
      <CardHeader>
        <CardTitle className="text-[length:var(--text-lg)] font-semibold text-[var(--color-text-primary)]">
          Doctor Brief
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg border border-[var(--color-border-default)] p-3"
              >
                <div className="size-8 rounded-full bg-[var(--color-neutral-200)]" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-2/3 rounded bg-[var(--color-neutral-200)]" />
                  <div className="h-3 w-1/3 rounded bg-[var(--color-neutral-200)]" />
                </div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <EmptyState icon={Clock} title="过去 24 小时无关键变化" description="患者状态平稳，无新增风险或反馈" />
        ) : (
          <ul className="space-y-0 divide-y divide-[var(--color-border-divider)]">
            {events.map((event) => {
              const config = eventConfig[event.type]
              const Icon = config.icon
              return (
                <li key={event.id}>
                  <Link
                    href={`/patients/${event.patientId}`}
                    className={cn(
                      "flex items-start gap-3 rounded-lg p-3 transition-colors",
                      "hover:bg-[var(--color-bg-hover)] focus-visible:bg-[var(--color-bg-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
                    )}
                  >
                    <div
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-full",
                        config.className
                      )}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="text-[length:var(--text-sm)] text-[var(--color-text-primary)]">
                        <span className="font-medium">{event.patientName}</span>
                        <span className="mx-1 text-[var(--color-text-tertiary)]">·</span>
                        {event.summary}
                      </span>
                      <span className="text-[length:var(--text-xs)] text-[var(--color-text-tertiary)]">
                        {formatRelativeTime(event.time)}
                      </span>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
