"use client"

import * as React from "react"
import { Activity, ClipboardList, FileText, TrendingUp } from "lucide-react"

import type { CarePlan, Indicator } from "@/features/patient/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "@/components/common/empty-state"

interface CarePlanTabProps {
  carePlan: CarePlan
  indicators: Indicator[]
  loading?: boolean
  error?: Error | null
  onRetry?: () => void
  onViewFullPlan: () => void
  onRecordIndicator: (indicatorId: string) => void
}

function getStatusBadge(status: CarePlan["status"]) {
  switch (status) {
    case "in-progress":
      return { label: "进行中", variant: "default" as const }
    case "completed":
      return { label: "已完成", variant: "secondary" as const }
    case "paused":
      return { label: "已暂停", variant: "outline" as const }
    default:
      return { label: "未知", variant: "secondary" as const }
  }
}

function MiniBarChart({ data }: { data: number[] }) {
  const max = Math.max(...data, 1)
  const min = Math.min(...data, 0)
  const range = max - min || 1

  return (
    <div className="flex items-end gap-1">
      {data.map((value, index) => {
        const heightPercent = ((value - min) / range) * 100
        return (
          <div
            key={index}
            className="w-2 rounded-t bg-[var(--color-primary-500)] opacity-80"
            style={{ height: `${Math.max(heightPercent, 8)}%` }}
            aria-hidden="true"
          />
        )
      })}
    </div>
  )
}

export function CarePlanTab({
  carePlan,
  indicators,
  loading = false,
  error = null,
  onRetry,
  onViewFullPlan,
  onRecordIndicator,
}: CarePlanTabProps) {
  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="flex flex-col gap-3">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-28" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col gap-3">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardContent className="flex flex-col gap-3">
            <Skeleton className="h-5 w-32" />
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-10 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <EmptyState
        icon={Activity}
        title="加载失败"
        description="无法获取照护计划，请重试"
        action={onRetry ? { label: "重新加载", onClick: onRetry } : undefined}
      />
    )
  }

  if (!carePlan.id) {
    return (
      <EmptyState
        icon={ClipboardList}
        title="暂无照护计划"
        description="为该患者创建首个照护计划，跟踪健康目标"
        action={{ label: "创建照护计划", onClick: () => {} }}
      />
    )
  }

  const status = getStatusBadge(carePlan.status)

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="flex items-center gap-2">
                <ClipboardList
                  className="size-5 text-[var(--color-primary-600)]"
                  aria-hidden="true"
                />
                当前计划
              </CardTitle>
              <Badge variant={status.variant}>{status.label}</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <h3 className="text-[length:var(--text-lg)] font-semibold text-[var(--color-text-primary)]">
              {carePlan.name}
            </h3>
            <p className="text-[length:var(--text-sm)] text-[var(--color-text-secondary)]">
              <span className="font-medium">目标：</span>
              {carePlan.goal}
            </p>
            <p className="text-[length:var(--text-sm)] text-[var(--color-text-tertiary)]">
              <span className="font-medium">周期：</span>
              {carePlan.period}
            </p>
            <p className="text-[length:var(--text-sm)] text-[var(--color-text-tertiary)]">
              <span className="font-medium">负责人：</span>
              {carePlan.owner}
            </p>
            <div className="pt-1">
              <Button variant="outline" size="sm" onClick={onViewFullPlan}>
                <FileText data-icon="inline-start" />
                查看完整计划
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp
                className="size-5 text-[var(--color-primary-600)]"
                aria-hidden="true"
              />
              关键指标趋势
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {indicators.map((indicator) => (
              <div
                key={indicator.id}
                className="flex items-center justify-between gap-4 rounded-lg border border-[var(--color-border-default)] p-3"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[length:var(--text-sm)] font-medium text-[var(--color-text-primary)]">
                    {indicator.name}
                  </span>
                  <span className="text-[length:var(--text-2xl)] font-semibold text-[var(--color-text-primary)]">
                    {indicator.current}
                    <span className="ml-1 text-[length:var(--text-sm)] font-normal text-[var(--color-text-tertiary)]">
                      {indicator.unit}
                    </span>
                  </span>
                  <span className="text-[length:var(--text-xs)] text-[var(--color-text-tertiary)]">
                    目标 {indicator.goal}
                  </span>
                </div>
                <MiniBarChart data={indicator.trend} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>指标目标列表</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {indicators.map((indicator) => (
            <div
              key={`goal-${indicator.id}`}
              className="flex flex-col gap-3 rounded-lg border border-[var(--color-border-default)] p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                <span className="min-w-[4rem] text-[length:var(--text-sm)] font-medium text-[var(--color-text-primary)]">
                  {indicator.name}
                </span>
                <span className="text-[length:var(--text-sm)] text-[var(--color-text-tertiary)]">
                  目标 {indicator.goal}
                </span>
                <span className="text-[length:var(--text-sm)] text-[var(--color-text-secondary)]">
                  当前 {indicator.current} {indicator.unit}
                </span>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onRecordIndicator(indicator.id)}
              >
                记录
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
