"use client"

import * as React from "react"

import { SearchIcon, DownloadIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DataTable, type DataTableColumn } from "@/components/common/data-table"
import { mockAuditLogs } from "@/features/admin/lib/mock-data"
import type { AuditLog } from "@/features/admin/lib/types"

function resultBadge(result: AuditLog["result"]) {
  if (result === "success") {
    return (
      <span className="inline-flex h-5 items-center rounded-full bg-[var(--color-success-100)] px-2 text-xs font-medium text-[var(--color-success-700)]">
        成功
      </span>
    )
  }
  return (
    <span className="inline-flex h-5 items-center rounded-full bg-[var(--color-error-100)] px-2 text-xs font-medium text-[var(--color-error-700)]">
      失败
    </span>
  )
}

const OPERATION_TYPES = ["全部", "登录", "创建", "更新", "删除", "导出", "禁用用户", "修改角色权限"]

export function AuditLogs() {
  const [logs] = React.useState<AuditLog[]>(mockAuditLogs)
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [dateRange, setDateRange] = React.useState("all")
  const [userFilter, setUserFilter] = React.useState("")
  const [operationType, setOperationType] = React.useState("全部")
  const [resultFilter, setResultFilter] = React.useState("all")
  const [page, setPage] = React.useState(1)
  const pageSize = 10

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const filteredLogs = React.useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch =
        search.trim() === "" ||
        log.user.includes(search) ||
        log.operation.includes(search) ||
        log.object.includes(search)
      const matchesUser = userFilter.trim() === "" || log.user.includes(userFilter)
      const matchesOp = operationType === "全部" || log.operation === operationType
      const matchesResult = resultFilter === "all" || log.result === resultFilter
      let matchesDate = true
      const logDate = new Date(log.time)
      const now = new Date()
      if (dateRange === "today") {
        matchesDate =
          logDate.getFullYear() === now.getFullYear() &&
          logDate.getMonth() === now.getMonth() &&
          logDate.getDate() === now.getDate()
      } else if (dateRange === "week") {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        matchesDate = logDate >= weekAgo
      } else if (dateRange === "month") {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        matchesDate = logDate >= monthAgo
      }
      return matchesSearch && matchesUser && matchesOp && matchesResult && matchesDate
    })
  }, [logs, search, userFilter, operationType, resultFilter, dateRange])

  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / pageSize))
  const currentLogs = filteredLogs.slice((page - 1) * pageSize, page * pageSize)

  const resetFilters = () => {
    setSearch("")
    setDateRange("all")
    setUserFilter("")
    setOperationType("全部")
    setResultFilter("all")
    setPage(1)
  }

  const hasFilters = search || dateRange !== "all" || userFilter || operationType !== "全部" || resultFilter !== "all"

  const columns: DataTableColumn<AuditLog>[] = [
    {
      key: "time",
      header: "时间",
      render: (row) => <span className="text-[var(--color-text-secondary)]">{new Date(row.time).toLocaleString("zh-CN")}</span>,
    },
    { key: "user", header: "用户", render: (row) => row.user },
    { key: "operation", header: "操作", render: (row) => row.operation },
    { key: "object", header: "对象", render: (row) => row.object },
    { key: "ip", header: "IP", render: (row) => <span className="font-mono text-[var(--color-text-tertiary)]">{row.ip}</span> },
    { key: "result", header: "结果", render: (row) => resultBadge(row.result) },
  ]

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Filters */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div className="relative">
          <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
          <Input
            placeholder="搜索用户、操作、对象..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Input
          placeholder="按用户筛选..."
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
        />
        <Select value={dateRange} onValueChange={(value) => value && setDateRange(value)}>
          <SelectTrigger>
            <SelectValue placeholder="时间范围" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部时间</SelectItem>
            <SelectItem value="today">今天</SelectItem>
            <SelectItem value="week">最近 7 天</SelectItem>
            <SelectItem value="month">最近 30 天</SelectItem>
          </SelectContent>
        </Select>
        <Select value={operationType} onValueChange={(value) => value && setOperationType(value)}>
          <SelectTrigger>
            <SelectValue placeholder="操作类型" />
          </SelectTrigger>
          <SelectContent>
            {OPERATION_TYPES.map((op) => (
              <SelectItem key={op} value={op}>
                {op}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={resultFilter} onValueChange={(value) => value && setResultFilter(value)}>
          <SelectTrigger>
            <SelectValue placeholder="结果" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部结果</SelectItem>
            <SelectItem value="success">成功</SelectItem>
            <SelectItem value="failure">失败</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-[length:var(--text-sm)] text-[var(--color-text-secondary)]">
          共 {filteredLogs.length} 条记录
        </span>
        <div className="flex items-center gap-2">
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              清除筛选
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={() => {}}>
            <DownloadIcon className="mr-1 size-4" />
            导出 CSV
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={currentLogs}
        loading={loading}
        loadingRows={5}
        getRowKey={(row) => row.id}
        emptyState={{
          title: hasFilters ? "无符合条件的数据" : "暂无审计日志",
          description: hasFilters ? "请尝试调整筛选条件" : "系统操作记录将显示在这里",
          action: hasFilters ? { label: "清除筛选", onClick: resetFilters } : undefined,
        }}
      />

      {/* Pagination */}
      <div className="flex flex-col items-center justify-between gap-3 text-[length:var(--text-sm)] text-[var(--color-text-secondary)] sm:flex-row">
        <span>共 {filteredLogs.length} 条</span>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            上一页
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Button key={p} variant={page === p ? "default" : "outline"} size="icon-sm" onClick={() => setPage(p)}>
              {p}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            下一页
          </Button>
        </div>
      </div>
    </div>
  )
}
