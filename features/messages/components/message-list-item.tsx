"use client"

import * as React from "react"
import { CheckCheck, Pin } from "lucide-react"

import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RiskBadge } from "@/components/common/risk-badge"
import { MessageTypeBadge } from "@/features/messages/components/message-type-badge"
import { formatMessageTime } from "@/features/messages/lib/utils"
import type { Message } from "@/features/messages/types"

interface MessageListItemProps {
  message: Message
  selected: boolean
  checked: boolean
  onSelect: () => void
  onToggleCheck: () => void
  onMarkRead: () => void
  className?: string
}

export function MessageListItem({
  message,
  selected,
  checked,
  onSelect,
  onToggleCheck,
  onMarkRead,
  className,
}: MessageListItemProps) {
  const handleCheckboxClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation()
      onToggleCheck()
    },
    [onToggleCheck]
  )

  const handleMarkReadClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation()
      onMarkRead()
    },
    [onMarkRead]
  )

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onSelect()
        }
      }}
      className={cn(
        "group/item relative flex cursor-pointer items-start gap-3 border-b border-[var(--color-border-divider)] p-3 transition-colors outline-none hover:bg-[var(--color-bg-hover)] focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-inset",
        selected && "bg-[var(--color-bg-selected)]",
        className
      )}
    >
      <div className="flex items-center pt-1" onClick={handleCheckboxClick}>
        <Checkbox checked={checked} aria-label={`选择 ${message.senderName} 的消息`} />
      </div>

      <Avatar size="default" className="mt-0.5">
        {message.senderAvatar && <AvatarImage src={message.senderAvatar} alt={message.senderName} />}
        <AvatarFallback className="bg-[var(--color-primary-100)] text-[var(--color-primary-700)]">
          {message.senderInitial}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "truncate text-[length:var(--text-base)] leading-5",
              !message.isRead ? "font-semibold text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)]"
            )}
          >
            {message.senderName}
          </span>
          {!message.isRead && (
            <span
              className="size-2 shrink-0 rounded-full bg-[var(--color-error-500)]"
              aria-label="未读"
            />
          )}
          {message.isPinned && (
            <Pin className="size-3 shrink-0 text-[var(--color-warning-500)]" aria-label="已置顶" />
          )}
        </div>

        <p
          className={cn(
            "mt-0.5 line-clamp-2 text-[length:var(--text-sm)] leading-5",
            !message.isRead ? "font-medium text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)]"
          )}
        >
          {message.summary}
        </p>

        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          <span className="text-[length:var(--text-xs)] text-[var(--color-text-tertiary)]">
            {formatMessageTime(message.timestamp)}
          </span>

          {message.patientName && (
            <span className="inline-flex items-center rounded-full bg-[var(--color-neutral-100)] px-2 py-0.5 text-[length:var(--text-xs)] text-[var(--color-text-secondary)]">
              {message.patientName}
            </span>
          )}

          {message.taskName && (
            <span className="inline-flex items-center rounded-full bg-[var(--color-neutral-100)] px-2 py-0.5 text-[length:var(--text-xs)] text-[var(--color-text-secondary)]">
              {message.taskName}
            </span>
          )}

          {message.tags?.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-[var(--color-neutral-100)] px-2 py-0.5 text-[length:var(--text-xs)] text-[var(--color-text-secondary)]"
            >
              {tag}
            </span>
          ))}

          <MessageTypeBadge type={message.type} />

          {message.riskLevel && message.riskLevel !== "normal" && message.riskLevel !== "unknown" && (
            <RiskBadge level={message.riskLevel} size="sm" />
          )}
        </div>
      </div>

      <div className="absolute top-3 right-3 flex items-center">
        <span className="text-[length:var(--text-xs)] text-[var(--color-text-tertiary)] transition-opacity group-hover/item:opacity-0">
          {formatMessageTime(message.timestamp)}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleMarkReadClick}
          className="h-auto px-2 py-1 opacity-0 transition-opacity group-hover/item:opacity-100"
          disabled={message.isRead}
        >
          <CheckCheck className="size-3.5" />
          <span className="ml-1">已读</span>
        </Button>
      </div>
    </div>
  )
}
