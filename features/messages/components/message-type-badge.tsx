"use client"

import { User, Bell, ClipboardList, AlertTriangle, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"
import type { MessageType } from "@/features/messages/types"

interface TypeConfig {
  label: string
  icon: React.ElementType
  className: string
}

const typeConfig: Record<MessageType, TypeConfig> = {
  patient: {
    label: "患者",
    icon: User,
    className: "bg-[var(--color-info-100)] text-[var(--color-info-700)]",
  },
  system: {
    label: "系统",
    icon: Bell,
    className: "bg-[var(--color-success-100)] text-[var(--color-success-700)]",
  },
  task: {
    label: "任务",
    icon: ClipboardList,
    className: "bg-[var(--color-warning-100)] text-[var(--color-warning-700)]",
  },
  risk: {
    label: "风险",
    icon: AlertTriangle,
    className: "bg-[var(--color-error-100)] text-[var(--color-error-700)]",
  },
  ai: {
    label: "AI",
    icon: Sparkles,
    className: "bg-[var(--color-primary-100)] text-[var(--color-primary-700)]",
  },
}

interface MessageTypeBadgeProps {
  type: MessageType
  className?: string
}

export function MessageTypeBadge({ type, className }: MessageTypeBadgeProps) {
  const config = typeConfig[type]
  const Icon = config.icon

  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-[length:var(--text-xs)] font-medium whitespace-nowrap",
        config.className,
        className
      )}
    >
      <Icon className="size-3" aria-hidden="true" />
      {config.label}
    </span>
  )
}
