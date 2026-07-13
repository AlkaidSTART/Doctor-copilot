"use client"

import * as React from "react"
import { Activity, Bot, MessageSquare, Send } from "lucide-react"

import { cn } from "@/lib/utils"
import type { ChatMessage, ChatRole } from "@/features/patient/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "@/components/common/empty-state"

interface AIChatTabProps {
  messages: ChatMessage[]
  quickQuestions: string[]
  loading?: boolean
  error?: Error | null
  onRetry?: () => void
}

function ChatBubble({
  role,
  content,
  timestamp,
}: {
  role: ChatRole
  content: string
  timestamp: string
}) {
  const isUser = role === "user"

  return (
    <div
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "flex max-w-[85%] items-start gap-2 rounded-2xl px-4 py-3 sm:max-w-[75%]",
          isUser
            ? "rounded-br-sm bg-[var(--color-primary-600)] text-[var(--color-text-inverse)]"
            : "rounded-bl-sm border border-[var(--color-border-default)] bg-[var(--color-bg-card)] text-[var(--color-text-primary)]"
        )}
      >
        {!isUser && (
          <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-700)]">
            <Bot className="size-3.5" aria-hidden="true" />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <p className="text-[length:var(--text-sm)] leading-relaxed whitespace-pre-wrap">
            {content}
          </p>
          <span
            className={cn(
              "text-[length:var(--text-xs)]",
              isUser
                ? "text-[var(--color-primary-100)]"
                : "text-[var(--color-text-tertiary)]"
            )}
          >
            {timestamp}
          </span>
        </div>
      </div>
    </div>
  )
}

export function AIChatTab({
  messages: initialMessages,
  quickQuestions,
  loading = false,
  error = null,
  onRetry,
}: AIChatTabProps) {
  const [messages, setMessages] = React.useState<ChatMessage[]>(initialMessages)
  const [inputValue, setInputValue] = React.useState("")
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    const text = inputValue.trim()
    if (!text) return

    const now = new Date()
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp,
    }

    const aiMessage: ChatMessage = {
      id: `ai-${Date.now()}`,
      role: "ai",
      content: `已收到您的问题「${text}」，我正在结合张三的病历和近期指标进行分析，请稍候。`,
      timestamp,
    }

    setMessages((prev) => [...prev, userMessage, aiMessage])
    setInputValue("")
  }

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "flex w-full",
                index % 2 === 0 ? "justify-start" : "justify-end"
              )}
            >
              <Skeleton
                className={cn(
                  "h-16",
                  index % 2 === 0 ? "w-3/4" : "w-2/3"
                )}
              />
            </div>
          ))}
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <EmptyState
        icon={Activity}
        title="加载失败"
        description="无法获取 AI 对话，请重试"
        action={onRetry ? { label: "重新加载", onClick: onRetry } : undefined}
      />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={scrollRef}
        className="flex max-h-[480px] min-h-[240px] flex-col gap-4 overflow-y-auto rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-page)] p-4"
      >
        {messages.length === 0 ? (
          <EmptyState
            icon={MessageSquare}
            title="问我关于这位患者的问题"
            description="例如：查看血压趋势、生成随访建议等"
          />
        ) : (
          messages.map((message) => (
            <ChatBubble
              key={message.id}
              role={message.role}
              content={message.content}
              timestamp={message.timestamp}
            />
          ))
        )}
      </div>

      {quickQuestions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question) => (
            <Button
              key={question}
              variant="outline"
              size="sm"
              onClick={() => handleQuickQuestion(question)}
            >
              {question}
            </Button>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <Input
          placeholder="输入问题..."
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button onClick={handleSend} disabled={!inputValue.trim()}>
          <Send data-icon="inline-start" />
          发送
        </Button>
      </div>
    </div>
  )
}
