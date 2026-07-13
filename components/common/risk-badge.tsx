"use client"

import * as React from "react"
import {
  AlertTriangle,
  ArrowUp,
  Circle,
  ArrowDown,
  Check,
  HelpCircle,
} from "lucide-react"

import { cn } from "@/lib/utils"

export type RiskLevel = "p1" | "p2" | "p3" | "p4" | "normal" | "unknown"

export interface RiskBadgeProps {
  level: RiskLevel
  showIcon?: boolean
  showLabel?: boolean
  size?: "sm" | "md"
  className?: string
}

interface RiskConfig {
  label: string
  icon: React.ElementType
  colorClass: string
  bgClass: string
}

const riskConfig: Record<RiskLevel, RiskConfig> = {
  p1: {
    label: "极高",
    icon: AlertTriangle,
    colorClass: "text-[var(--color-risk-p1)]",
    bgClass: "bg-[var(--color-risk-p1-bg)]",
  },
  p2: {
    label: "高",
    icon: ArrowUp,
    bgClass: "bg-[var(--color-risk-p2-bg)]",
    colorClass: "text-[var(--color-risk-p2)]",
  },
  p3: {
    label: "中",
    icon: Circle,
    bgClass: "bg-[var(--color-risk-p3-bg)]",
    colorClass: "text-[var(--color-risk-p3)]",
  },
  p4: {
    label: "低",
    icon: ArrowDown,
    bgClass: "bg-[var(--color-risk-p4-bg)]",
    colorClass: "text-[var(--color-risk-p4)]",
  },
  normal: {
    label: "正常",
    icon: Check,
    bgClass: "bg-[var(--color-risk-normal-bg)]",
    colorClass: "text-[var(--color-risk-normal)]",
  },
  unknown: {
    label: "未知",
    icon: HelpCircle,
    bgClass: "bg-[var(--color-neutral-100)]",
    colorClass: "text-[var(--color-risk-unknown)]",
  },
}

export function RiskBadge({
  level,
  showIcon = true,
  showLabel = true,
  size = "md",
  className,
}: RiskBadgeProps) {
  const config = riskConfig[level]
  const Icon = config.icon

  return (
    <span
      className={cn(
        "inline-flex w-fit items-center justify-center gap-1 rounded-full border border-transparent font-medium whitespace-nowrap",
        config.bgClass,
        config.colorClass,
        size === "sm" ? "px-2 py-0.5 text-[length:var(--text-xs)]" : "px-2.5 py-1 text-[length:var(--text-sm)]",
        className
      )}
      aria-label={`风险等级：${config.label}`}
    >
      {showIcon && <Icon className="size-3.5 shrink-0" aria-hidden="true" />}
      {showLabel && <span>{config.label}</span>}
    </span>
  )
}
