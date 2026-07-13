import type { Message, MessageFilters } from "@/features/messages/types"

export function formatMessageTime(date: Date): string {
  const now = new Date()
  const isSameDay =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()

  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()

  const pad = (n: number) => String(n).padStart(2, "0")
  const time = `${pad(date.getHours())}:${pad(date.getMinutes())}`

  if (isSameDay) return time
  if (isYesterday) return `昨天 ${time}`
  return `${date.getMonth() + 1}/${date.getDate()} ${time}`
}

function isWithinTimeRange(date: Date, range: MessageFilters["timeRange"]): boolean {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = diffMs / (1000 * 60 * 60 * 24)

  switch (range) {
    case "today":
      return date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
    case "week":
      return diffDays <= 7
    case "month":
      return diffDays <= 30
    default:
      return true
  }
}

export function filterMessages(messages: Message[], filters: MessageFilters): Message[] {
  const query = filters.search.trim().toLowerCase()

  return messages
    .filter((message) => {
      if (filters.type !== "all" && message.type !== filters.type) return false
      if (filters.status === "unread" && message.isRead) return false
      if (filters.status === "read" && !message.isRead) return false
      if (!isWithinTimeRange(message.timestamp, filters.timeRange)) return false
      if (filters.riskLevel !== "all" && message.riskLevel !== filters.riskLevel) return false

      if (query) {
        const haystack = [
          message.senderName,
          message.summary,
          message.content,
          message.patientName,
          message.taskName,
          ...(message.tags ?? []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
        if (!haystack.includes(query)) return false
      }

      return true
    })
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1
      if (!a.isPinned && b.isPinned) return 1
      return b.timestamp.getTime() - a.timestamp.getTime()
    })
}
