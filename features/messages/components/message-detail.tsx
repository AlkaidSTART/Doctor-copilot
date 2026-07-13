"use client"

import * as React from "react"
import {
  Bell,
  ClipboardList,
  AlertTriangle,
  Sparkles,
  MoreVertical,
  CheckCheck,
  Trash2,
  Pin,
  PinOff,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RiskBadge } from "@/components/common/risk-badge"
import { EmptyState } from "@/components/common/empty-state"
import { MessageTypeBadge } from "@/features/messages/components/message-type-badge"
import { MessageReplyArea } from "@/features/messages/components/message-reply-area"
import { formatMessageTime } from "@/features/messages/lib/utils"
import type { Message, MessageType } from "@/features/messages/types"

interface MessageDetailProps {
  message: Message | null
  onMarkRead: (id: string) => void
  onDelete: (id: string) => void
  onPin: (id: string) => void
}

const typeIcon: Record<MessageType, LucideIcon> = {
  patient: Bell,
  system: Bell,
  task: ClipboardList,
  risk: AlertTriangle,
  ai: Sparkles,
}

export function MessageDetail({ message, onMarkRead, onDelete, onPin }: MessageDetailProps) {
  if (!message) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-[var(--color-bg-page)]">
        <EmptyState
          icon={typeIcon.system}
          title="选择一条消息"
          description="在左侧列表中选择一条消息，查看详情并快速处理"
        />
      </div>
    )
  }

  const TypeIcon = typeIcon[message.type]

  return (
    <div className="flex h-full flex-col bg-[var(--color-bg-card)]">
      <div className="flex items-start justify-between border-b border-[var(--color-border-divider)] p-4">
        <div className="flex items-center gap-3">
          <Avatar size="lg">
            {message.senderAvatar && <AvatarImage src={message.senderAvatar} alt={message.senderName} />}
            <AvatarFallback className="bg-[var(--color-primary-100)] text-[var(--color-primary-700)]">
              {message.senderInitial}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <h2 className="truncate text-[length:var(--text-lg)] font-semibold text-[var(--color-text-primary)]">
              {message.senderName}
            </h2>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <MessageTypeBadge type={message.type} />
              {message.patientName && (
                <span className="text-[length:var(--text-xs)] text-[var(--color-text-tertiary)]">
                  {message.patientName}
                </span>
              )}
              {message.taskName && (
                <span className="text-[length:var(--text-xs)] text-[var(--color-text-tertiary)]">
                  {message.taskName}
                </span>
              )}
              {message.riskLevel && message.riskLevel !== "normal" && message.riskLevel !== "unknown" && (
                <RiskBadge level={message.riskLevel} size="sm" />
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            disabled={message.isRead}
            onClick={() => onMarkRead(message.id)}
          >
            <CheckCheck className="size-4" />
            <span className="ml-1 hidden sm:inline">标记已读</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="更多操作">
                  <MoreVertical className="size-4" />
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onPin(message.id)}>
                {message.isPinned ? (
                  <>
                    <PinOff className="size-4" />
                    取消置顶
                  </>
                ) : (
                  <>
                    <Pin className="size-4" />
                    置顶消息
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onClick={() => onDelete(message.id)}>
                <Trash2 className="size-4" />
                删除
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <MessageDetailBody message={message} />
      </ScrollArea>

      {message.type === "patient" && (
        <>
          <Separator />
          <div className="p-4">
            <MessageReplyArea
              recipient={message.patientName || message.senderName}
              onSend={(text: string) => {
                // eslint-disable-next-line no-console
                console.log("发送回复:", text)
              }}
            />
          </div>
        </>
      )}
    </div>
  )
}

function MessageDetailBody({ message }: { message: Message }) {
  switch (message.type) {
    case "patient":
      return <PatientMessageBody message={message} />
    case "system":
      return (
        <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-page)] p-4 shadow-sm">
          <div className="flex items-center gap-2 text-[var(--color-success-700)]">
            <Bell className="size-5" />
            <span className="text-[length:var(--text-base)] font-semibold">系统通知</span>
          </div>
          <p className="mt-3 text-[length:var(--text-base)] leading-relaxed text-[var(--color-text-secondary)]">
            {message.content}
          </p>
          <p className="mt-4 text-[length:var(--text-xs)] text-[var(--color-text-tertiary)]">
            {formatMessageTime(message.timestamp)}
          </p>
        </div>
      )
    case "task":
      return (
        <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-warning-100)] p-4">
          <div className="flex items-center gap-2 text-[var(--color-warning-700)]">
            <ClipboardList className="size-5" />
            <span className="text-[length:var(--text-base)] font-semibold">任务提醒</span>
          </div>
          <p className="mt-3 text-[length:var(--text-base)] leading-relaxed text-[var(--color-text-secondary)]">
            {message.content}
          </p>
          <div className="mt-4 flex gap-2">
            <Button size="sm">查看任务</Button>
            <Button variant="outline" size="sm">
              稍后处理
            </Button>
          </div>
        </div>
      )
    case "risk":
      return (
        <div className="rounded-xl border-l-4 border-l-[var(--color-risk-p1)] bg-[var(--color-risk-p1-bg)] p-4">
          <div className="flex items-center gap-2 text-[var(--color-risk-p1)]">
            <AlertTriangle className="size-5" />
            <span className="text-[length:var(--text-base)] font-semibold">风险预警</span>
          </div>
          <p className="mt-3 text-[length:var(--text-base)] leading-relaxed text-[var(--color-text-secondary)]">
            {message.content}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {message.patientName && (
              <span className="text-[length:var(--text-sm)] text-[var(--color-text-secondary)]">
                关联患者：{message.patientName}
              </span>
            )}
            {message.riskLevel && <RiskBadge level={message.riskLevel} size="sm" />}
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="destructive" size="sm">
              查看患者
            </Button>
            <Button variant="outline" size="sm">
              已处理
            </Button>
          </div>
        </div>
      )
    case "ai":
      return <AiMessageBody message={message} />
    default:
      return null
  }
}

function PatientMessageBody({ message }: { message: Message }) {
  const thread = message.thread?.length ? message.thread : [
    {
      id: message.id,
      role: "incoming" as const,
      content: message.content,
      timestamp: message.timestamp,
    },
  ]

  return (
    <div className="space-y-4">
      {thread.map((item) => (
        <div
          key={item.id}
          className={cn(
            "flex w-full",
            item.role === "incoming" ? "justify-start" : "justify-end"
          )}
        >
          <div
            className={cn(
              "max-w-[80%] rounded-2xl px-4 py-3 text-[length:var(--text-base)] leading-relaxed",
              item.role === "incoming"
                ? "rounded-tl-sm border border-[var(--color-border-default)] bg-[var(--color-bg-card)] text-[var(--color-text-secondary)]"
                : "rounded-tr-sm bg-[var(--color-primary-600)] text-[var(--color-text-inverse)]"
            )}
          >
            {item.content}
            <div
              className={cn(
                "mt-1 text-[length:var(--text-xs)]",
                item.role === "incoming" ? "text-[var(--color-text-tertiary)]" : "text-[var(--color-primary-100)]"
              )}
            >
              {formatMessageTime(item.timestamp)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function AiMessageBody({ message }: { message: Message }) {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2 text-[var(--color-primary-700)]">
        <Sparkles className="mt-0.5 size-5" />
        <div>
          <p className="text-[length:var(--text-base)] font-semibold">AI 建议</p>
          <p className="text-[length:var(--text-sm)] text-[var(--color-text-secondary)]">{message.content}</p>
        </div>
      </div>

      {message.aiSuggestions?.map((suggestion) => (
        <div
          key={suggestion.id}
          className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-page)] p-4 shadow-sm"
        >
          <h3 className="text-[length:var(--text-base)] font-semibold text-[var(--color-text-primary)]">
            {suggestion.title}
          </h3>
          <p className="mt-2 text-[length:var(--text-sm)] leading-relaxed text-[var(--color-text-secondary)]">
            {suggestion.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {suggestion.actions.map((action) => (
              <Button
                key={action.id}
                size="sm"
                variant={action.variant === "ghost" ? "ghost" : action.variant === "secondary" ? "secondary" : "default"}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
