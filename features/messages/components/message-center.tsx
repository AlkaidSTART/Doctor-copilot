"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { MessageFilters } from "@/features/messages/components/message-filters"
import { MessageList } from "@/features/messages/components/message-list"
import { MessageDetail } from "@/features/messages/components/message-detail"
import { BulkActionBar } from "@/features/messages/components/bulk-action-bar"
import { MOCK_MESSAGES } from "@/features/messages/lib/mock-data"
import { filterMessages } from "@/features/messages/lib/utils"
import type { MessageFilters as Filters } from "@/features/messages/types"

const DEFAULT_FILTERS: Filters = {
  type: "all",
  status: "all",
  timeRange: "week",
  riskLevel: "all",
  search: "",
}

function parseFiltersFromParams(params: URLSearchParams | null): Filters {
  return {
    type: (params?.get("type") as Filters["type"]) || DEFAULT_FILTERS.type,
    status: (params?.get("status") as Filters["status"]) || DEFAULT_FILTERS.status,
    timeRange: (params?.get("timeRange") as Filters["timeRange"]) || DEFAULT_FILTERS.timeRange,
    riskLevel: (params?.get("riskLevel") as Filters["riskLevel"]) || DEFAULT_FILTERS.riskLevel,
    search: params?.get("search") ?? DEFAULT_FILTERS.search,
  }
}

function buildQueryString(filters: Filters): string {
  const params = new URLSearchParams()
  if (filters.type !== DEFAULT_FILTERS.type) params.set("type", filters.type)
  if (filters.status !== DEFAULT_FILTERS.status) params.set("status", filters.status)
  if (filters.timeRange !== DEFAULT_FILTERS.timeRange) params.set("timeRange", filters.timeRange)
  if (filters.riskLevel !== DEFAULT_FILTERS.riskLevel) params.set("riskLevel", filters.riskLevel)
  if (filters.search.trim()) params.set("search", filters.search.trim())
  const query = params.toString()
  return query ? `?${query}` : ""
}

export function MessageCenter() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [messages, setMessages] = React.useState(MOCK_MESSAGES)
  const [filters, setFilters] = React.useState(() => parseFiltersFromParams(searchParams))
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = React.useState(true)
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const didSyncRef = React.useRef(false)

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  React.useEffect(() => {
    if (!didSyncRef.current) {
      didSyncRef.current = true
      return
    }
    const query = buildQueryString(filters)
    router.replace(`${pathname}${query}`, { scroll: false })
  }, [filters, pathname, router])

  const filteredMessages = React.useMemo(() => filterMessages(messages, filters), [messages, filters])

  const selectedMessage = React.useMemo(
    () => messages.find((message) => message.id === selectedId) || null,
    [messages, selectedId]
  )

  const handleSelect = React.useCallback(
    (message: (typeof messages)[number]) => {
      setSelectedId(message.id)
      setDrawerOpen(true)
    },
    []
  )

  const handleToggleCheck = React.useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const handleMarkRead = React.useCallback((id: string) => {
    setMessages((prev) => prev.map((message) => (message.id === id ? { ...message, isRead: true } : message)))
  }, [])

  const handleBulkMarkRead = React.useCallback(() => {
    setMessages((prev) =>
      prev.map((message) => (selectedIds.has(message.id) ? { ...message, isRead: true } : message))
    )
    setSelectedIds(new Set())
  }, [selectedIds])

  const handleDelete = React.useCallback((id: string) => {
    setMessages((prev) => prev.filter((message) => message.id !== id))
    setSelectedId((prev) => (prev === id ? null : prev))
    setSelectedIds((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }, [])

  const handleBulkDelete = React.useCallback(() => {
    setMessages((prev) => prev.filter((message) => !selectedIds.has(message.id)))
    setSelectedId((prev) => (prev && selectedIds.has(prev) ? null : prev))
    setSelectedIds(new Set())
  }, [selectedIds])

  const handlePin = React.useCallback((id: string) => {
    setMessages((prev) =>
      prev.map((message) => (message.id === id ? { ...message, isPinned: !message.isPinned } : message))
    )
  }, [])

  const handleClearFilters = React.useCallback(() => {
    setFilters(DEFAULT_FILTERS)
  }, [])

  const handleDashboard = React.useCallback(() => {
    router.push("/")
  }, [router])

  const selectionActive = selectedIds.size > 0

  return (
    <div
      className="flex overflow-hidden rounded-xl border border-[var(--color-border-divider)] bg-[var(--color-bg-card)] shadow-sm"
      style={{
        height: "calc(100vh - var(--layout-header-height) - var(--layout-page-header-height) - 40px)",
      }}
    >
      <div className="flex w-full flex-col md:w-2/5 lg:w-[360px]">
        {selectionActive ? (
          <BulkActionBar
            selectedCount={selectedIds.size}
            onMarkRead={handleBulkMarkRead}
            onDelete={handleBulkDelete}
            onClear={() => setSelectedIds(new Set())}
          />
        ) : (
          <MessageFilters
            filters={filters}
            onChange={setFilters}
            resultCount={filteredMessages.length}
          />
        )}
        <MessageList
          messages={filteredMessages}
          totalCount={messages.length}
          selectedId={selectedId}
          selectedIds={selectedIds}
          loading={isLoading}
          onSelect={handleSelect}
          onToggleCheck={handleToggleCheck}
          onMarkRead={handleMarkRead}
          onClearFilters={handleClearFilters}
          onDashboard={handleDashboard}
        />
      </div>

      <div className="hidden flex-1 flex-col border-l border-[var(--color-border-divider)] md:flex">
        <MessageDetail
          message={selectedMessage}
          onMarkRead={handleMarkRead}
          onDelete={handleDelete}
          onPin={handlePin}
        />
      </div>

      <Sheet
        open={drawerOpen}
        onOpenChange={(open) => {
          setDrawerOpen(open)
          if (!open) setSelectedId(null)
        }}
      >
        <SheetContent
          side="bottom"
          className={cn(
            "h-[100dvh] max-h-none rounded-none p-0",
            "data-[side=bottom]:h-[100dvh]"
          )}
        >
          <SheetTitle className="sr-only">消息详情</SheetTitle>
          <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-[var(--color-border-hover)]" aria-hidden="true" />
          <div className="flex h-[calc(100dvh-1rem)] flex-col">
            <MessageDetail
              message={selectedMessage}
              onMarkRead={handleMarkRead}
              onDelete={handleDelete}
              onPin={handlePin}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
