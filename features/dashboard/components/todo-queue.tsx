"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, Loader2, InboxIcon } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardAction, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { EmptyState } from "@/components/common/empty-state"
import type { RiskLevel } from "@/components/common/risk-badge"
import type { TodoTask } from "../lib/types"
import { formatTime } from "../lib/format"

interface TodoQueueProps {
  tasks: TodoTask[]
  loading?: boolean
  lastUpdated?: Date
  onComplete?: (task: TodoTask) => void
}

const priorityClass: Record<RiskLevel, string> = {
  p1: "bg-[var(--color-error-100)] text-[var(--color-error-700)]",
  p2: "bg-[var(--color-warning-100)] text-[var(--color-warning-700)]",
  p3: "bg-[var(--color-info-100)] text-[var(--color-info-700)]",
  p4: "bg-[var(--color-neutral-100)] text-[var(--color-text-secondary)]",
  normal: "bg-[var(--color-success-100)] text-[var(--color-success-700)]",
  unknown: "bg-[var(--color-neutral-100)] text-[var(--color-text-secondary)]",
}

const priorityLabel: Record<RiskLevel, string> = {
  p1: "P1",
  p2: "P2",
  p3: "P3",
  p4: "P4",
  normal: "普通",
  unknown: "-",
}

function PriorityBadge({ level }: { level: RiskLevel }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[length:var(--text-xs)] font-medium",
        priorityClass[level]
      )}
    >
      {priorityLabel[level]}
    </span>
  )
}

export function TodoQueue({ tasks, loading, lastUpdated, onComplete }: TodoQueueProps) {
  const router = useRouter()
  const [completingIds, setCompletingIds] = React.useState<Set<string>>(new Set())
  const [removingIds, setRemovingIds] = React.useState<Set<string>>(new Set())
  const [completedIds, setCompletedIds] = React.useState<Set<string>>(new Set())

  const handleComplete = (task: TodoTask) => {
    if (completingIds.has(task.id) || removingIds.has(task.id) || completedIds.has(task.id)) return

    setCompletingIds((prev) => new Set(prev).add(task.id))

    window.setTimeout(() => {
      setRemovingIds((prev) => new Set(prev).add(task.id))

      window.setTimeout(() => {
        setCompletedIds((prev) => new Set(prev).add(task.id))
        setCompletingIds((prev) => {
          const next = new Set(prev)
          next.delete(task.id)
          return next
        })
        setRemovingIds((prev) => {
          const next = new Set(prev)
          next.delete(task.id)
          return next
        })
        onComplete?.(task)
        toast.success("任务已完成")
      }, 250)
    }, 600)
  }

  const sortedItems = React.useMemo(
    () =>
      tasks
        .filter((t) => !completedIds.has(t.id))
        .sort((a, b) => a.dueTime.getTime() - b.dueTime.getTime()),
    [tasks, completedIds]
  )

  const now = new Date()

  return (
    <Card className="h-full border-[var(--color-border-default)] bg-[var(--color-bg-card)]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-[length:var(--text-lg)] font-semibold text-[var(--color-text-primary)]">
              To-do Queue
            </CardTitle>
            {lastUpdated && (
              <span className="text-[length:var(--text-xs)] text-[var(--color-text-tertiary)]">
                更新于 {lastUpdated.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}
              </span>
            )}
          </div>
          <CardAction>
            <Button variant="ghost" size="sm" onClick={() => router.push("/tasks")}>
              查看全部
              <ChevronRight className="size-4" aria-hidden="true" />
            </Button>
          </CardAction>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg border border-[var(--color-border-default)] p-3"
              >
                <div className="size-4 rounded bg-[var(--color-neutral-200)]" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/2 rounded bg-[var(--color-neutral-200)]" />
                  <div className="h-3 w-1/3 rounded bg-[var(--color-neutral-200)]" />
                </div>
              </div>
            ))}
          </div>
        ) : sortedItems.length === 0 ? (
          <EmptyState
            icon={InboxIcon}
            title="今日任务已完成"
            description="所有任务均已处理，可以开始新的随访计划"
            action={{
              label: "新建任务",
              onClick: () => router.push("/tasks/new"),
            }}
          />
        ) : (
          <ul className="space-y-0 divide-y divide-[var(--color-border-divider)]">
            {sortedItems.map((task) => {
              const isCompleting = completingIds.has(task.id)
              const isRemoving = removingIds.has(task.id)
              const isOverdue = task.dueTime < now

              return (
                <li
                  key={task.id}
                  className={cn(
                    "flex items-center gap-3 rounded-lg p-3 transition-all duration-200",
                    "hover:bg-[var(--color-bg-hover)] focus-within:bg-[var(--color-bg-hover)]",
                    isRemoving && "pointer-events-none opacity-0",
                    isCompleting && "opacity-50"
                  )}
                >
                  {isCompleting ? (
                    <Loader2 className="size-4 shrink-0 animate-spin text-[var(--color-text-tertiary)]" />
                  ) : (
                    <Checkbox
                      aria-label={`标记 ${task.title} 为已完成`}
                      onCheckedChange={() => handleComplete(task)}
                    />
                  )}
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <span
                      className={cn(
                        "truncate text-[length:var(--text-sm)] font-medium text-[var(--color-text-primary)]",
                        isCompleting && "line-through text-[var(--color-text-disabled)]"
                      )}
                    >
                      {task.title}
                    </span>
                    <span className="text-[length:var(--text-xs)] text-[var(--color-text-tertiary)]">
                      {task.patientName}
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span
                      className={cn(
                        "text-[length:var(--text-xs)]",
                        isOverdue
                          ? "text-[var(--color-error-500)]"
                          : "text-[var(--color-text-tertiary)]"
                      )}
                    >
                      {formatTime(task.dueTime)}
                    </span>
                    <PriorityBadge level={task.priority} />
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
