"use client"

import * as React from "react"

import { UploadIcon, RefreshCwIcon, Trash2Icon, SearchIcon, FileTextIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTable, type DataTableColumn } from "@/components/common/data-table"
import { ConfirmDialog } from "./confirm-dialog"
import { mockKnowledgeDocs } from "@/features/admin/lib/mock-data"
import type { KnowledgeDoc } from "@/features/admin/lib/types"

function docStatusBadge(status: KnowledgeDoc["status"]) {
  switch (status) {
    case "parsed":
      return (
        <span className="inline-flex h-5 items-center rounded-full bg-[var(--color-success-100)] px-2 text-xs font-medium text-[var(--color-success-700)]">
          已解析
        </span>
      )
    case "parsing":
      return (
        <span className="inline-flex h-5 items-center rounded-full bg-[var(--color-info-100)] px-2 text-xs font-medium text-[var(--color-info-700)]">
          解析中
        </span>
      )
    case "failed":
      return (
        <span className="inline-flex h-5 items-center rounded-full bg-[var(--color-error-100)] px-2 text-xs font-medium text-[var(--color-error-700)]">
          失败
        </span>
      )
  }
}

export function KnowledgeBase() {
  const [docs, setDocs] = React.useState<KnowledgeDoc[]>(mockKnowledgeDocs)
  const [loading, setLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [searchResults, setSearchResults] = React.useState<{ name: string; score: number; snippet: string }[]>([])
  const [searching, setSearching] = React.useState(false)

  const [deleteTarget, setDeleteTarget] = React.useState<KnowledgeDoc | null>(null)
  const [deleteOpen, setDeleteOpen] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleDelete = (doc: KnowledgeDoc) => {
    setDeleteTarget(doc)
    setDeleteOpen(true)
  }

  const confirmDelete = () => {
    if (!deleteTarget) return
    setDocs((prev) => prev.filter((d) => d.id !== deleteTarget.id))
    setDeleteOpen(false)
    setDeleteTarget(null)
  }

  const handleReparse = (doc: KnowledgeDoc) => {
    setDocs((prev) =>
      prev.map((d) => (d.id === doc.id ? { ...d, status: "parsing" as const, chunkCount: 0 } : d))
    )
    setTimeout(() => {
      setDocs((prev) =>
        prev.map((d) =>
          d.id === doc.id ? { ...d, status: "parsed" as const, chunkCount: Math.floor(Math.random() * 100) + 20 } : d
        )
      )
    }, 1500)
  }

  const handleUpload = () => {
    const timestamp = Date.now()
    setDocs((prev) => [
      {
        id: `k-${timestamp}`,
        name: `新上传文档-${timestamp}.pdf`,
        type: "PDF",
        chunkCount: 0,
        status: "parsing",
        updatedAt: new Date(timestamp).toISOString(),
      },
      ...prev,
    ])
    setTimeout(() => {
      setDocs((prev) =>
        prev.map((d) =>
          d.id === `k-${timestamp}`
            ? { ...d, status: "parsed" as const, chunkCount: Math.floor(Math.random() * 100) + 20 }
            : d
        )
      )
    }, 1500)
  }

  const handleSearch = () => {
    if (!searchQuery.trim()) return
    setSearching(true)
    setTimeout(() => {
      setSearchResults([
        { name: "高血压诊疗指南 2025.pdf", score: 0.92, snippet: "...高血压患者应定期监测血压，目标值为..." },
        { name: "心内科随访问题库.xlsx", score: 0.85, snippet: "...随访时应询问患者是否按时服药..." },
        { name: "药品说明书汇总.docx", score: 0.71, snippet: "...本药适用于原发性高血压的治疗..." },
      ])
      setSearching(false)
    }, 800)
  }

  const columns: DataTableColumn<KnowledgeDoc>[] = [
    {
      key: "name",
      header: "文档名称",
      render: (row) => (
        <div className="flex items-center gap-2">
          <FileTextIcon className="size-4 text-[var(--color-text-tertiary)]" />
          <span className="font-medium">{row.name}</span>
        </div>
      ),
    },
    { key: "type", header: "类型", render: (row) => row.type },
    { key: "chunkCount", header: "分块数", render: (row) => row.chunkCount },
    { key: "status", header: "状态", render: (row) => docStatusBadge(row.status) },
    {
      key: "updatedAt",
      header: "更新时间",
      render: (row) => <span className="text-[var(--color-text-tertiary)]">{new Date(row.updatedAt).toLocaleString("zh-CN")}</span>,
    },
    {
      key: "actions",
      header: "操作",
      render: (row) => (
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => handleReparse(row)}
            disabled={row.status === "parsing"}
            title="重新解析"
          >
            <RefreshCwIcon className={row.status === "parsing" ? "size-4 animate-spin" : "size-4"} />
            <span className="sr-only">重新解析</span>
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-[var(--color-error-700)]"
            onClick={() => handleDelete(row)}
            title="删除"
          >
            <Trash2Icon className="size-4" />
            <span className="sr-only">删除</span>
          </Button>
        </div>
      ),
      className: "text-right",
    },
  ]

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-[length:var(--text-lg)] font-medium text-[var(--color-text-primary)]">文档列表</h3>
        <Button onClick={handleUpload}>
          <UploadIcon className="mr-1 size-4" />
          上传文档
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={docs}
        loading={loading}
        loadingRows={4}
        getRowKey={(row) => row.id}
        emptyState={{
          title: "暂无文档",
          description: "点击右上角上传文档到知识库",
          action: { label: "上传文档", onClick: handleUpload },
        }}
      />

      {/* Search test panel */}
      <div className="mt-2 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-card)] p-4">
        <h3 className="mb-3 text-[length:var(--text-lg)] font-medium text-[var(--color-text-primary)]">检索测试</h3>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
            <Input
              placeholder="输入查询语句..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Button onClick={handleSearch} disabled={searching || !searchQuery.trim()}>
            {searching ? "检索中..." : "检索"}
          </Button>
        </div>

        {searchResults.length > 0 && (
          <div className="mt-4 grid gap-3">
            {searchResults.map((result, index) => (
              <div
                key={index}
                className="rounded-lg border border-[var(--color-border-default)] p-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[var(--color-text-primary)]">{result.name}</span>
                  <span className="text-[length:var(--text-xs)] font-medium text-[var(--color-primary-700)]">
                    相似度 {(result.score * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="mt-1 text-[length:var(--text-sm)] text-[var(--color-text-secondary)]">{result.snippet}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="确认删除文档？"
        description={`文档「${deleteTarget?.name}」将被从知识库中移除。`}
        confirmText="删除"
        variant="destructive"
        onConfirm={confirmDelete}
      />
    </div>
  )
}
