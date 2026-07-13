"use client"

import * as React from "react"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export interface SidebarItemProps {
  icon: LucideIcon
  label: string
  href: string
  active?: boolean
  badge?: number
  collapsed?: boolean
  onClick?: () => void
}

export function SidebarItem({
  icon: Icon,
  label,
  href,
  active = false,
  badge,
  collapsed = false,
  onClick,
}: SidebarItemProps) {
  const className = cn(
    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-card)]",
    active
      ? "bg-[var(--color-bg-selected)] text-[var(--color-primary-700)]"
      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-primary)]",
    collapsed && "justify-center px-2"
  )

  const inner = (
    <>
      <Icon className="size-5 shrink-0" aria-hidden="true" />
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{label}</span>
          {typeof badge === "number" && badge > 0 && (
            <Badge
              variant="secondary"
              className="h-5 min-w-5 justify-center px-1.5 text-xs"
              aria-label={`${label} ${badge} 条未读`}
            >
              {badge > 99 ? "99+" : badge}
            </Badge>
          )}
        </>
      )}
      {collapsed && typeof badge === "number" && badge > 0 && (
        <span className="sr-only">{badge} 条未读</span>
      )}
    </>
  )

  const isPlaceholder = href === "#"

  const linkProps = {
    "aria-current": active ? ("page" as const) : undefined,
    onClick,
    className,
  }

  const content = isPlaceholder ? (
    <a href="#" {...linkProps}>
      {inner}
    </a>
  ) : (
    <Link href={href} scroll={false} {...linkProps}>
      {inner}
    </Link>
  )

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger render={content} />
        <TooltipContent side="right" sideOffset={8}>
          <span>{label}</span>
          {typeof badge === "number" && badge > 0 && (
            <span className="ml-1 text-[var(--color-text-tertiary)]">({badge})</span>
          )}
        </TooltipContent>
      </Tooltip>
    )
  }

  return content
}
