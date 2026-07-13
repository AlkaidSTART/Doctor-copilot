"use client"

import * as React from "react"

import { SearchIcon, PlusIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTable, type DataTableColumn } from "@/components/common/data-table"
import { EmptyState } from "@/components/common/empty-state"
import { ConfirmDialog } from "./confirm-dialog"
import { mockUsers } from "@/features/admin/lib/mock-data"
import type { AdminUser } from "@/features/admin/lib/types"

const PAGE_SIZE_OPTIONS = [10, 20, 50]

function relativeTime(dateString: string, nowTimestamp: number): string {
  const date = new Date(dateString)
  const diffMs = nowTimestamp - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  if (diffMins < 1) return "刚刚"
  if (diffMins < 60) return `${diffMins} 分钟前`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours} 小时前`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays < 30) return `${diffDays} 天前`
  return date.toLocaleDateString("zh-CN")
}

function statusBadge(status: AdminUser["status"]) {
  switch (status) {
    case "active":
      return (
        <span className="inline-flex h-5 items-center rounded-full bg-[var(--color-success-100)] px-2 text-xs font-medium text-[var(--color-success-700)]">
          启用
        </span>
      )
    case "inactive":
      return (
        <span className="inline-flex h-5 items-center rounded-full bg-[var(--color-neutral-100)] px-2 text-xs font-medium text-[var(--color-text-secondary)]">
          禁用
        </span>
      )
    case "pending":
      return (
        <span className="inline-flex h-5 items-center rounded-full bg-[var(--color-warning-100)] px-2 text-xs font-medium text-[var(--color-warning-700)]">
          待激活
        </span>
      )
  }
}

interface UserFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  draft: Partial<AdminUser>
  onDraftChange: (draft: Partial<AdminUser>) => void
  onSave: () => void
  isEdit: boolean
}

function UserFormDialog({ open, onOpenChange, draft, onDraftChange, onSave, isEdit }: UserFormDialogProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSave()
    onOpenChange(false)
  }

  const update = (patch: Partial<AdminUser>) => {
    onDraftChange({ ...draft, ...patch })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEdit ? "编辑用户" : "新建用户"}</DialogTitle>
            <DialogDescription>填写用户信息后点击保存。</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-1.5">
              <Label htmlFor="name">姓名</Label>
              <Input
                id="name"
                value={draft.name ?? ""}
                onChange={(e) => update({ name: e.target.value })}
                placeholder="请输入姓名"
                required
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                type="email"
                value={draft.email ?? ""}
                onChange={(e) => update({ email: e.target.value })}
                placeholder="请输入邮箱"
                required
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="role">角色</Label>
              <Select value={draft.role ?? "医生"} onValueChange={(value) => value && update({ role: value })}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="选择角色" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="医生">医生</SelectItem>
                  <SelectItem value="护士">护士</SelectItem>
                  <SelectItem value="患者">患者</SelectItem>
                  <SelectItem value="管理员">管理员</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="department">科室</Label>
              <Input
                id="department"
                value={draft.department ?? ""}
                onChange={(e) => update({ department: e.target.value })}
                placeholder="请输入科室"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="phone">手机号</Label>
              <Input
                id="phone"
                value={draft.phone ?? ""}
                onChange={(e) => update({ phone: e.target.value })}
                placeholder="请输入手机号"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="status">状态</Label>
              <Select
                value={draft.status ?? "active"}
                onValueChange={(value) => value && update({ status: value as AdminUser["status"] })}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">启用</SelectItem>
                  <SelectItem value="inactive">禁用</SelectItem>
                  <SelectItem value="pending">待激活</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button type="submit">保存</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function UserManagement() {
  const [users, setUsers] = React.useState<AdminUser[]>(mockUsers)
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<string>("all")
  const [timeFilter, setTimeFilter] = React.useState<string>("all")
  const [page, setPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(10)
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())

  const [formOpen, setFormOpen] = React.useState(false)
  const [editingUser, setEditingUser] = React.useState<AdminUser | undefined>()
  const [draft, setDraft] = React.useState<Partial<AdminUser>>({})
  const [disableTarget, setDisableTarget] = React.useState<AdminUser | null>(null)
  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const [now] = React.useState(() => Date.now())

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const startNew = () => {
    setEditingUser(undefined)
    setDraft({
      name: "",
      email: "",
      role: "医生",
      department: "",
      phone: "",
      status: "active",
    })
    setFormOpen(true)
  }

  const startEdit = (user: AdminUser) => {
    setEditingUser(user)
    setDraft({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      phone: user.phone,
      status: user.status,
    })
    setFormOpen(true)
  }

  const handleSave = () => {
    const timestamp = Date.now()
    const payload: AdminUser = {
      ...(editingUser ?? { id: `u-${timestamp}`, lastLoginAt: new Date(timestamp).toISOString() }),
      ...draft,
    } as AdminUser
    setUsers((prev) => {
      const exists = prev.find((u) => u.id === payload.id)
      if (exists) return prev.map((u) => (u.id === payload.id ? payload : u))
      return [payload, ...prev]
    })
  }

  const filteredUsers = React.useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        search.trim() === "" ||
        user.name.includes(search) ||
        user.email.includes(search)
      const matchesStatus = statusFilter === "all" || user.status === statusFilter
      let matchesTime = true
      if (timeFilter === "today") {
        const d = new Date(user.lastLoginAt)
        const today = new Date(now)
        matchesTime =
          d.getFullYear() === today.getFullYear() &&
          d.getMonth() === today.getMonth() &&
          d.getDate() === today.getDate()
      } else if (timeFilter === "week") {
        const d = new Date(user.lastLoginAt)
        const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000)
        matchesTime = d >= weekAgo
      } else if (timeFilter === "month") {
        const d = new Date(user.lastLoginAt)
        const monthAgo = new Date(now - 30 * 24 * 60 * 60 * 1000)
        matchesTime = d >= monthAgo
      }
      return matchesSearch && matchesStatus && matchesTime
    })
  }, [users, search, statusFilter, timeFilter, now])

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize))
  const currentPageUsers = filteredUsers.slice((page - 1) * pageSize, page * pageSize)

  const allSelectedOnPage = currentPageUsers.length > 0 && currentPageUsers.every((u) => selectedIds.has(u.id))

  const toggleSelectAll = () => {
    const next = new Set(selectedIds)
    if (allSelectedOnPage) {
      currentPageUsers.forEach((u) => next.delete(u.id))
    } else {
      currentPageUsers.forEach((u) => next.add(u.id))
    }
    setSelectedIds(next)
  }

  const toggleSelectOne = (id: string) => {
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedIds(next)
  }

  const handleDisable = (user: AdminUser) => {
    setDisableTarget(user)
    setConfirmOpen(true)
  }

  const confirmDisable = () => {
    if (!disableTarget) return
    setUsers((prev) =>
      prev.map((u) => (u.id === disableTarget.id ? { ...u, status: u.status === "inactive" ? "active" : "inactive" } : u))
    )
    setConfirmOpen(false)
    setDisableTarget(null)
  }

  const resetFilters = () => {
    setSearch("")
    setStatusFilter("all")
    setTimeFilter("all")
    setPage(1)
  }

  const hasFilters = search || statusFilter !== "all" || timeFilter !== "all"

  const columns: DataTableColumn<AdminUser>[] = [
    {
      key: "select",
      header: (
        <Checkbox
          checked={allSelectedOnPage}
          onCheckedChange={toggleSelectAll}
          aria-label="全选当前页"
        />
      ),
      render: (row) => (
        <Checkbox
          checked={selectedIds.has(row.id)}
          onCheckedChange={() => toggleSelectOne(row.id)}
          aria-label={`选择 ${row.name}`}
        />
      ),
      className: "w-10",
    },
    { key: "name", header: "姓名", render: (row) => row.name },
    {
      key: "email",
      header: "账号 / 邮箱",
      render: (row) => <span className="text-[var(--color-text-secondary)]">{row.email}</span>,
    },
    { key: "role", header: "角色", render: (row) => row.role },
    { key: "status", header: "状态", render: (row) => statusBadge(row.status) },
    {
      key: "lastLoginAt",
      header: "最近登录",
      render: (row) => <span className="text-[var(--color-text-tertiary)]">{relativeTime(row.lastLoginAt, now)}</span>,
    },
    {
      key: "actions",
      header: "操作",
      render: (row) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => startEdit(row)}>
            编辑
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              row.status === "inactive" ? "text-[var(--color-success-700)]" : "text-[var(--color-error-700)]"
            )}
            onClick={() => handleDisable(row)}
          >
            {row.status === "inactive" ? "启用" : "禁用"}
          </Button>
        </div>
      ),
      className: "text-right",
    },
  ]

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
            <Input
              placeholder="搜索姓名、邮箱..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={(value) => value && setStatusFilter(value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="全部状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部状态</SelectItem>
              <SelectItem value="active">启用</SelectItem>
              <SelectItem value="inactive">禁用</SelectItem>
              <SelectItem value="pending">待激活</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeFilter} onValueChange={(value) => value && setTimeFilter(value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="全部时间" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部时间</SelectItem>
              <SelectItem value="today">今天</SelectItem>
              <SelectItem value="week">最近 7 天</SelectItem>
              <SelectItem value="month">最近 30 天</SelectItem>
            </SelectContent>
          </Select>
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              重置
            </Button>
          )}
        </div>
        <Button onClick={startNew}>
          <PlusIcon className="size-4" />
          新建用户
        </Button>
      </div>

      {/* Batch action bar */}
      {selectedIds.size > 0 && (
        <div className="flex items-center justify-between rounded-lg bg-[var(--color-primary-50)] px-4 py-2 text-[length:var(--text-sm)]">
          <span className="text-[var(--color-text-secondary)]">已选择 {selectedIds.size} 项</span>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setSelectedIds(new Set())}>
              取消选择
            </Button>
            <Button variant="outline" size="sm" onClick={() => setSelectedIds(new Set())}>
              批量禁用
            </Button>
          </div>
        </div>
      )}

      {/* Desktop table */}
      <div className="hidden md:block">
        <DataTable
          columns={columns}
          data={currentPageUsers}
          loading={loading}
          loadingRows={5}
          getRowKey={(row) => row.id}
          emptyState={{
            title: hasFilters ? "无符合条件的数据" : "暂无用户",
            description: hasFilters ? "请尝试调整筛选条件" : "点击右上角按钮创建第一位用户",
            action: hasFilters
              ? { label: "清除筛选", onClick: resetFilters }
              : { label: "新建用户", onClick: startNew },
          }}
        />
      </div>

      {/* Mobile card list */}
      <div className="flex flex-col gap-3 md:hidden">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-xl bg-[var(--color-neutral-100)]"
            />
          ))
        ) : currentPageUsers.length === 0 ? (
          <EmptyState
            title={hasFilters ? "无符合条件的数据" : "暂无用户"}
            description={hasFilters ? "请尝试调整筛选条件" : "点击右上角按钮创建第一位用户"}
            action={hasFilters
              ? { label: "清除筛选", onClick: resetFilters }
              : { label: "新建用户", onClick: startNew }}
          />
        ) : (
          currentPageUsers.map((user) => (
            <div
              key={user.id}
              className="flex flex-col gap-2 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-card)] p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-[var(--color-text-primary)]">{user.name}</span>
                {statusBadge(user.status)}
              </div>
              <div className="text-[length:var(--text-sm)] text-[var(--color-text-secondary)]">{user.email}</div>
              <div className="text-[length:var(--text-sm)] text-[var(--color-text-tertiary)]">
                {user.role} · 最近登录 {relativeTime(user.lastLoginAt, now)}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => startEdit(user)}>
                  编辑
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "flex-1",
                    user.status === "inactive" ? "text-[var(--color-success-700)]" : "text-[var(--color-error-700)]"
                  )}
                  onClick={() => handleDisable(user)}
                >
                  {user.status === "inactive" ? "启用" : "禁用"}
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col items-center justify-between gap-3 text-[length:var(--text-sm)] text-[var(--color-text-secondary)] sm:flex-row">
        <span>共 {filteredUsers.length} 条</span>
        <div className="flex items-center gap-2">
          <Select value={String(pageSize)} onValueChange={(v) => { if (v) { setPageSize(Number(v)); setPage(1) } }}>
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZE_OPTIONS.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size} 条/页
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
              上一页
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                variant={page === p ? "default" : "outline"}
                size="icon-sm"
                onClick={() => setPage(p)}
              >
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

      <UserFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        draft={draft}
        onDraftChange={setDraft}
        onSave={handleSave}
        isEdit={!!editingUser}
      />
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={disableTarget?.status === "inactive" ? "确认启用用户？" : "确认禁用用户？"}
        description={
          disableTarget?.status === "inactive"
            ? `用户 "${disableTarget?.name}" 将被重新启用。`
            : `用户 "${disableTarget?.name}" 将被禁用，禁用后无法登录系统。`
        }
        confirmText="确认"
        variant="destructive"
        onConfirm={confirmDisable}
      />
    </div>
  )
}
