"use client"

import { Inbox, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "@/components/common/empty-state"
import { MessageListItem } from "@/features/messages/components/message-list-item"
import type { Message } from "@/features/messages/types"

interface MessageListProps {
  messages: Message[]
  totalCount: number
  selectedId: string | null
  selectedIds: Set<string>
  loading: boolean
  onSelect: (message: Message) => void
  onToggleCheck: (id: string) => void
  onMarkRead: (id: string) => void
  onClearFilters: () => void
  onDashboard: () => void
  className?: string
}

function MessageListSkeleton() {
  return (
    <div className="flex items-start gap-3 border-b border-[var(--color-border-divider)] p-3">
      <Skeleton className="size-4 shrink-0 rounded-sm" />
      <Skeleton className="size-8 shrink-0 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  )
}

export function MessageList({
  messages,
  totalCount,
  selectedId,
  selectedIds,
  loading,
  onSelect,
  onToggleCheck,
  onMarkRead,
  onClearFilters,
  onDashboard,
  className,
}: MessageListProps) {
  if (loading) {
    return (
      <ScrollArea className={cn("flex-1", className)}>
        <div className="p-1">
          {Array.from({ length: 6 }).map((_, index) => (
            <MessageListSkeleton key={index} />
          ))}
        </div>
      </ScrollArea>
    )
  }

  if (messages.length === 0 && totalCount === 0) {
    return (
      <div className={cn("flex flex-1 items-center justify-center overflow-auto", className)}>
        <EmptyState
          icon={Inbox}
          title="暂无消息"
          description="有新消息时会在这里显示"
          action={{
            label: "返回 Dashboard",
            onClick: onDashboard,
          }}
        />
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className={cn("flex flex-1 items-center justify-center overflow-auto", className)}>
        <EmptyState
          icon={Search}
          title="没有符合条件的消息"
          description="请尝试调整筛选条件或搜索关键词"
          action={{
            label: "清除筛选",
            onClick: onClearFilters,
          }}
        />
      </div>
    )
  }

  return (
    <ScrollArea className={cn("flex-1", className)}>
      <div className="pb-1">
        {messages.map((message) => (
          <MessageListItem
            key={message.id}
            message={message}
            selected={selectedId === message.id}
            checked={selectedIds.has(message.id)}
            onSelect={() => onSelect(message)}
            onToggleCheck={() => onToggleCheck(message.id)}
            onMarkRead={() => onMarkRead(message.id)}
          />
        ))}
      </div>
    </ScrollArea>
  )
}
