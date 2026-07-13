"use client"

import * as React from "react"
import {
  Activity,
  Check,
  CheckCircle2,
  Circle,
  Clock,
  MoreHorizontal,
  Plus,
  Trash2,
} from "lucide-react"

import { cn } from "@/lib/utils"
import type { Task, TaskStatus } from "@/features/patient/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EmptyState } from "@/components/common/empty-state"

interface TasksTabProps {
  tasks: Task[]
  loading?: boolean
  error?: Error | null
  onRetry?: () => void
  onCreateTask: () => void
  onEditTask: (taskId: string) => void
  onDeleteTask: (taskId: string) => void
}

function getStatusConfig(status: TaskStatus) {
  switch (status) {
    case "pending":
      return {
        label: "待处理",
        className:
          "bg-[var(--color-warning-100)] text-[var(--color-warning-700)]",
      }
    case "in-progress":
      return {
        label: "进行中",
        className:
          "bg-[var(--color-primary-100)] text-[var(--color-primary-700)]",
      }
    case "completed":
      return {
        label: "已完成",
        className:
          "bg-[var(--color-success-100)] text-[var(--color-success-700)]",
      }
    case "overdue":
      return {
        label: "已逾期",
        className: "bg-[var(--color-error-100)] text-[var(--color-error-700)]",
      }
    default:
      return {
        label: "未知",
        className: "bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)]",
      }
  }
}

export function TasksTab({
  tasks: initialTasks,
  loading = false,
  error = null,
  onRetry,
  onCreateTask,
  onEditTask,
  onDeleteTask,
}: TasksTabProps) {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks)
  const [statusFilter, setStatusFilter] = React.useState<TaskStatus | "all">("all")

  const filteredTasks = React.useMemo(() => {
    if (statusFilter === "all") return tasks
    return tasks.filter((task) => task.status === statusFilter)
  }, [tasks, statusFilter])

  const handleToggleComplete = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, status: task.status === "completed" ? "pending" : "completed" }
          : task
      )
    )
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-40" />
        </div>
        <div className="rounded-xl border border-[var(--color-border-default)]">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <EmptyState
        icon={Activity}
        title="加载失败"
        description="无法获取任务列表，请重试"
        action={onRetry ? { label: "重新加载", onClick: onRetry } : undefined}
      />
    )
  }

  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={Clock}
        title="暂无任务"
        description="为该患者创建首个随访或护理任务"
        action={{ label: "新建任务", onClick: onCreateTask }}
      />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Button onClick={onCreateTask}>
          <Plus data-icon="inline-start" />
          新建任务
        </Button>

        <Select
          value={statusFilter}
          onValueChange={(value) =>
            setStatusFilter(value as TaskStatus | "all")
          }
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="全部状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="pending">待处理</SelectItem>
            <SelectItem value="in-progress">进行中</SelectItem>
            <SelectItem value="completed">已完成</SelectItem>
            <SelectItem value="overdue">已逾期</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredTasks.length === 0 ? (
        <EmptyState
          icon={Clock}
          title="无匹配任务"
          description="当前筛选条件下没有任务"
          action={{
            label: "清除筛选",
            onClick: () => setStatusFilter("all"),
          }}
        />
      ) : (
        <>
          <div className="hidden rounded-xl border border-[var(--color-border-default)] md:block">
            <Table>
              <TableHeader>
                <TableRow className="bg-[var(--color-neutral-50)] hover:bg-[var(--color-neutral-50)]">
                  <TableHead className="w-10" />
                  <TableHead>任务</TableHead>
                  <TableHead>负责人</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>截止时间</TableHead>
                  <TableHead className="w-24">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map((task) => {
                  const status = getStatusConfig(task.status)
                  const isCompleted = task.status === "completed"

                  return (
                    <TableRow key={task.id}>
                      <TableCell>
                        <Checkbox
                          checked={isCompleted}
                          onCheckedChange={() => handleToggleComplete(task.id)}
                          aria-label={`标记 ${task.title} 为${isCompleted ? "未完成" : "已完成"}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-0.5">
                          <span
                            className={cn(
                              "text-[length:var(--text-sm)] font-medium text-[var(--color-text-primary)]",
                              isCompleted && "line-through text-[var(--color-text-tertiary)]"
                            )}
                          >
                            {task.title}
                          </span>
                          <span className="text-[length:var(--text-xs)] text-[var(--color-text-tertiary)]">
                            {task.type}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-[length:var(--text-sm)] text-[var(--color-text-secondary)]">
                          {task.assignee}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={status.className}>{status.label}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-[length:var(--text-sm)] text-[var(--color-text-secondary)]">
                          {task.dueTime}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => handleToggleComplete(task.id)}
                            aria-label={isCompleted ? "标记未完成" : "完成"}
                          >
                            {isCompleted ? (
                              <Circle className="size-3.5" />
                            ) : (
                              <Check className="size-3.5" />
                            )}
                          </Button>

                          <DropdownMenu>
                            <DropdownMenuTrigger
                              render={
                                <Button
                                  variant="ghost"
                                  size="icon-xs"
                                  aria-label="更多操作"
                                >
                                  <MoreHorizontal className="size-3.5" />
                                </Button>
                              }
                            />
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => onEditTask(task.id)}
                              >
                                编辑
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                variant="destructive"
                                onClick={() => onDeleteTask(task.id)}
                              >
                                <Trash2 className="size-4" aria-hidden="true" />
                                删除
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col gap-3 md:hidden">
            {filteredTasks.map((task) => {
              const status = getStatusConfig(task.status)
              const isCompleted = task.status === "completed"

              return (
                <Card key={task.id}>
                  <CardContent className="flex items-start gap-3 py-3">
                    <Checkbox
                      checked={isCompleted}
                      onCheckedChange={() => handleToggleComplete(task.id)}
                      aria-label={`标记 ${task.title} 为${isCompleted ? "未完成" : "已完成"}`}
                    />
                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-col gap-0.5">
                          <span
                            className={cn(
                              "text-[length:var(--text-sm)] font-medium text-[var(--color-text-primary)]",
                              isCompleted &&
                                "line-through text-[var(--color-text-tertiary)]"
                            )}
                          >
                            {task.title}
                          </span>
                          <span className="text-[length:var(--text-xs)] text-[var(--color-text-tertiary)]">
                            {task.type} · {task.assignee}
                          </span>
                        </div>
                        <Badge className={status.className}>{status.label}</Badge>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[length:var(--text-xs)] text-[var(--color-text-tertiary)]">
                          {task.dueTime}
                        </span>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => handleToggleComplete(task.id)}
                          >
                            {isCompleted ? (
                              <Circle className="size-3.5" />
                            ) : (
                              <CheckCircle2 className="size-3.5" />
                            )}
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              render={
                                <Button
                                  variant="ghost"
                                  size="icon-xs"
                                  aria-label="更多操作"
                                >
                                  <MoreHorizontal className="size-3.5" />
                                </Button>
                              }
                            />
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => onEditTask(task.id)}
                              >
                                编辑
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                variant="destructive"
                                onClick={() => onDeleteTask(task.id)}
                              >
                                <Trash2
                                  className="size-4"
                                  aria-hidden="true"
                                />
                                删除
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
