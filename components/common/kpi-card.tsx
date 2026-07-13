"use client"

import * as React from "react"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

export interface KpiCardProps {
  label: string
  value: string | number
  delta?: string
  trend?: "up" | "down" | "neutral"
  onClick?: () => void
  className?: string
}

export function KpiCard({
  label,
  value,
  delta,
  trend = "neutral",
  onClick,
  className,
}: KpiCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus

  const trendColor =
    trend === "up"
      ? "text-[var(--color-success-700)]"
      : trend === "down"
      ? "text-[var(--color-error-700)]"
      : "text-[var(--color-text-tertiary)]"

  return (
    <Card
      className={cn(
        "cursor-default border-[var(--color-border-default)] bg-[var(--color-bg-card)] transition-shadow",
        onClick && "cursor-pointer hover:shadow-[var(--shadow-md)]",
        className
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
    >
      <CardContent className="flex flex-col gap-2 p-4">
        <span className="text-[length:var(--text-sm)] font-medium text-[var(--color-text-tertiary)]">
          {label}
        </span>
        <div className="flex items-end justify-between gap-2">
          <span className="text-[length:var(--text-3xl)] font-bold leading-none text-[var(--color-text-primary)] font-[family-name:var(--font-mono)]">
            {value}
          </span>
          {delta && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-[length:var(--text-sm)] font-medium",
                trendColor
              )}
            >
              <TrendIcon className="size-4" aria-hidden="true" />
              {delta}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
