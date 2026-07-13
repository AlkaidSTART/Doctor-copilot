"use client"

import * as React from "react"

import { CopyIcon, Trash2Icon, PencilIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DataTable, type DataTableColumn } from "@/components/common/data-table"
import { EmptyState } from "@/components/common/empty-state"
import { ConfirmDialog } from "./confirm-dialog"
import { mockRoles } from "@/features/admin/lib/mock-data"
import type { AdminRole } from "@/features/admin/lib/types"

function formatTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })
}

export function RoleManagement() {
  const [roles, setRoles] = React.useState<AdminRole[]>(mockRoles)
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")

  const [formOpen, setFormOpen] = React.useState(false)
  const [editingRole, setEditingRole] = React.useState<AdminRole | undefined>()
  const [formName, setFormName] = React.useState("")
  const [formDesc, setFormDesc] = React.useState("")

  const [deleteTarget, setDeleteTarget] = React.useState<AdminRole | null>(null)
  const [confirmName, setConfirmName] = React.useState("")
  const [deleteOpen, setDeleteOpen] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const startEdit = (role: AdminRole) => {
    setEditingRole(role)
    setFormName(role.name)
    setFormDesc(role.description)
    setFormOpen(true)
  }

  const startNew = () => {
    setEditingRole(undefined)
    setFormName("")
    setFormDesc("")
    setFormOpen(true)
  }

  const handleSave = () => {
    if (!formName.trim()) return
    if (editingRole) {
      setRoles((prev) =>
        prev.map((r) => (r.id === editingRole.id ? { ...r, name: formName, description: formDesc } : r))
      )
    } else {
      const timestamp = Date.now()
      setRoles((prev) => [
        {
          id: `r-${timestamp}`,
          name: formName,
          description: formDesc,
          userCount: 0,
          createdAt: new Date(timestamp).toISOString(),
        },
        ...prev,
      ])
    }
    setFormOpen(false)
  }

  const handleCopy = (role: AdminRole) => {
    const timestamp = Date.now()
    setRoles((prev) => [
      {
        id: `r-${timestamp}`,
        name: `${role.name} 副本`,
        description: role.description,
        userCount: 0,
        createdAt: new Date(timestamp).toISOString(),
      },
      ...prev,
    ])
  }

  const handleDelete = (role: AdminRole) => {
    setDeleteTarget(role)
    setConfirmName("")
    setDeleteOpen(true)
  }

  const confirmDelete = () => {
    if (!deleteTarget || confirmName !== deleteTarget.name) return
    setRoles((prev) => prev.filter((r) => r.id !== deleteTarget.id))
    setDeleteOpen(false)
    setDeleteTarget(null)
    setConfirmName("")
  }

  const filteredRoles = roles.filter((r) => r.name.includes(search) || r.description.includes(search))

  const columns: DataTableColumn<AdminRole>[] = [
    { key: "name", header: "角色名称", render: (row) => <span className="font-medium">{row.name}</span> },
    { key: "description", header: "描述", render: (row) => <span className="text-[var(--color-text-secondary)]">{row.description}</span> },
    { key: "userCount", header: "关联用户数", render: (row) => row.userCount },
    {
      key: "createdAt",
      header: "创建时间",
      render: (row) => <span className="text-[var(--color-text-tertiary)]">{formatTime(row.createdAt)}</span>,
    },
    {
      key: "actions",
      header: "操作",
      render: (row) => (
        <div className="flex items-center justify-end gap-1">
          <Button variant="ghost" size="icon-sm" onClick={() => startEdit(row)} title="编辑">
            <PencilIcon className="size-4" />
            <span className="sr-only">编辑</span>
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={() => handleCopy(row)} title="复制">
            <CopyIcon className="size-4" />
            <span className="sr-only">复制</span>
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-[var(--color-error-700)]"
            onClick={() => handleDelete(row)}
            disabled={row.userCount > 0}
            title={row.userCount > 0 ? "该角色下存在用户，不可删除" : "删除"}
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
        <Input
          placeholder="搜索角色名称..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={startNew}>+ 新建角色</Button>
      </div>

      <DataTable
        columns={columns}
        data={filteredRoles}
        loading={loading}
        loadingRows={5}
        getRowKey={(row) => row.id}
        emptyState={{
          title: search ? "未找到角色" : "暂无角色",
          description: search ? "请尝试其他关键词" : "点击右上角按钮创建角色",
          action: search
            ? { label: "清除搜索", onClick: () => setSearch("") }
            : { label: "新建角色", onClick: startNew },
        }}
      />

      {/* Mobile card list */}
      <div className="flex flex-col gap-3 md:hidden">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-xl bg-[var(--color-neutral-100)]" />
          ))
        ) : filteredRoles.length === 0 ? (
          <EmptyState
            title={search ? "未找到角色" : "暂无角色"}
            description={search ? "请尝试其他关键词" : "点击右上角按钮创建角色"}
            action={search
              ? { label: "清除搜索", onClick: () => setSearch("") }
              : { label: "新建角色", onClick: startNew }}
          />
        ) : (
          filteredRoles.map((role) => (
            <div
              key={role.id}
              className="flex flex-col gap-2 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-card)] p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-[var(--color-text-primary)]">{role.name}</span>
                <span className="text-[length:var(--text-sm)] text-[var(--color-text-tertiary)]">
                  {role.userCount} 位用户
                </span>
              </div>
              <div className="text-[length:var(--text-sm)] text-[var(--color-text-secondary)]">{role.description}</div>
              <div className="text-[length:var(--text-xs)] text-[var(--color-text-tertiary)]">
                创建于 {formatTime(role.createdAt)}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => startEdit(role)}>
                  编辑
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleCopy(role)}>
                  复制
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-[var(--color-error-700)]"
                  onClick={() => handleDelete(role)}
                  disabled={role.userCount > 0}
                >
                  删除
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>{editingRole ? "编辑角色" : "新建角色"}</DialogTitle>
            <DialogDescription>设置角色名称与描述。</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-1.5">
              <Label htmlFor="roleName">角色名称</Label>
              <Input
                id="roleName"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="请输入角色名称"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="roleDesc">描述</Label>
              <Input
                id="roleDesc"
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                placeholder="请输入角色描述"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFormOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSave} disabled={!formName.trim()}>
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open)
          if (!open) setConfirmName("")
        }}
        title="确认删除角色？"
        description={
          <div className="grid gap-3">
            <p>
              角色「{deleteTarget?.name}」将被永久删除。此操作不可恢复。
            </p>
            <div className="grid gap-1.5">
              <Label htmlFor="confirmName">请输入角色名称以确认</Label>
              <Input
                id="confirmName"
                value={confirmName}
                onChange={(e) => setConfirmName(e.target.value)}
                placeholder={deleteTarget?.name}
              />
            </div>
          </div>
        }
        confirmText="删除"
        variant="destructive"
        onConfirm={confirmDelete}
      />
    </div>
  )
}
