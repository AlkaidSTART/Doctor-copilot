"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { KpiCard } from "@/components/common/kpi-card"
import { Skeleton } from "@/components/ui/skeleton"
import type { KpiData } from "../lib/types"

interface KpiSectionProps {
  kpis: KpiData[]
  loading?: boolean
}

export function KpiSection({ kpis, loading }: KpiSectionProps) {
  const router = useRouter()

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-card)] p-4"
          >
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-16" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {kpis.map((kpi) => {
        const href = kpi.href
        return (
          <KpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            delta={kpi.delta}
            trend={kpi.trend}
            onClick={href ? () => router.push(href) : undefined}
            className={cn(
              kpi.alert === "error" && "border-[var(--color-error-500)]",
              kpi.alert === "warning" && "border-[var(--color-warning-500)]"
            )}
          />
        )
      })}
    </div>
  )
}
