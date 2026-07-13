"use client"

import { CheckCheck, Trash2, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface BulkActionBarProps {
  selectedCount: number
  onMarkRead: () => void
  onDelete: () => void
  onClear: () => void
  className?: string
}

export function BulkActionBar({ selectedCount, onMarkRead, onDelete, onClear, className }: BulkActionBarProps) {
  return (
    <div
      className={cn(
        "sticky top-0 z-10 flex items-center justify-between border-b border-[var(--color-border-divider)] bg-[var(--color-bg-card)] px-3 py-2.5 shadow-sm",
        className
      )}
    >
      <span className="text-[length:var(--text-sm)] text-[var(--color-text-secondary)]">
        已选择 <strong className="text-[var(--color-text-primary)]">{selectedCount}</strong> 项
      </span>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" onClick={onMarkRead}>
          <CheckCheck className="size-4" />
          <span className="ml-1 hidden sm:inline">批量已读</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={onDelete}>
          <Trash2 className="size-4" />
          <span className="ml-1 hidden sm:inline">批量删除</span>
        </Button>
        <Button variant="ghost" size="icon-sm" onClick={onClear} aria-label="清空选择">
          <X className="size-4" />
        </Button>
      </div>
    </div>
  )
}
