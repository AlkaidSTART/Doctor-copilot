"use client"

import * as React from "react"
import { Send } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const QUICK_REPLIES = [
  "收到，稍后回复",
  "请按时服药并监测",
  "已为您安排随访",
  "感谢您的反馈",
]

interface MessageReplyAreaProps {
  recipient: string
  onSend: (text: string) => void
}

export function MessageReplyArea({ recipient, onSend }: MessageReplyAreaProps) {
  const [text, setText] = React.useState("")
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const adjustHeight = React.useCallback(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`
  }, [])

  React.useEffect(() => {
    adjustHeight()
  }, [text, adjustHeight])

  const handleSend = React.useCallback(() => {
    const trimmed = text.trim()
    if (!trimmed) return
    onSend(trimmed)
    setText("")
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
  }, [text, onSend])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault()
        handleSend()
      }
    },
    [handleSend]
  )

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {QUICK_REPLIES.map((reply) => (
          <Button
            key={reply}
            variant="outline"
            size="xs"
            onClick={() => {
              setText((prev) => (prev ? `${prev}\n${reply}` : reply))
              textareaRef.current?.focus()
            }}
          >
            {reply}
          </Button>
        ))}
      </div>

      <div className="flex items-end gap-2">
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`回复 ${recipient}...`}
            rows={1}
            className={cn(
              "min-h-[40px] w-full resize-none rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-card)] px-3 py-2 text-[length:var(--text-base)] leading-5 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]",
              "transition-colors outline-none focus-visible:border-[var(--color-border-focus)] focus-visible:ring-3 focus-visible:ring-[var(--color-ring)]/50",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
            aria-label="回复内容"
          />
        </div>
        <Button onClick={handleSend} disabled={!text.trim()} size="icon" aria-label="发送">
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  )
}
