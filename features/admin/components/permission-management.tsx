"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ConfirmDialog } from "./confirm-dialog"
import { mockPermissions, mockUsers } from "@/features/admin/lib/mock-data"
import type { PermissionNode } from "@/features/admin/lib/types"

function collectIds(nodes: PermissionNode[]): string[] {
  return nodes.flatMap((node) => [node.id, ...(node.children ? collectIds(node.children) : [])])
}

function getAllChildrenIds(node: PermissionNode): string[] {
  return node.children ? collectIds(node.children) : []
}

export function PermissionManagement() {
  const allIds = React.useMemo(() => collectIds(mockPermissions), [])
  const [selected, setSelected] = React.useState<Set<string>>(new Set(allIds))
  const [loading, setLoading] = React.useState(true)
  const [saveOpen, setSaveOpen] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(timer)
  }, [])

  const toggleOne = (id: string) => {
    const next = new Set(selected)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelected(next)
  }

  const toggleGroup = (node: PermissionNode, checked: boolean) => {
    const next = new Set(selected)
    const ids = [node.id, ...getAllChildrenIds(node)]
    ids.forEach((id) => {
      if (checked) next.add(id)
      else next.delete(id)
    })
    setSelected(next)
  }

  const groupChecked = (node: PermissionNode): boolean => {
    if (!selected.has(node.id)) return false
    if (!node.children) return true
    return node.children.every((child) => groupChecked(child))
  }

  const affectedUsers = mockUsers.filter((u) => u.role === "医生" || u.role === "护士").length

  const handleSave = () => {
    setSaveOpen(false)
  }

  if (loading) {
    return (
      <div className="grid gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-xl bg-[var(--color-neutral-100)]" />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>医生角色权限</CardTitle>
          <CardDescription>勾选权限点后点击保存，变更将影响 {affectedUsers} 位用户。</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {mockPermissions.map((module) => (
              <div key={module.id} className="rounded-lg border border-[var(--color-border-default)] p-3">
                <div className="flex items-center gap-2 pb-2">
                  <Checkbox
                    id={module.id}
                    checked={groupChecked(module)}
                    onCheckedChange={(checked) => toggleGroup(module, Boolean(checked))}
                    aria-label={module.name}
                  />
                  <label
                    htmlFor={module.id}
                    className="text-[length:var(--text-base)] font-medium text-[var(--color-text-primary)]"
                  >
                    {module.name}
                  </label>
                </div>
                {module.children && (
                  <div className="ml-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {module.children.map((child) => (
                      <div key={child.id} className="flex items-center gap-2">
                        <Checkbox
                          id={child.id}
                          checked={selected.has(child.id)}
                          onCheckedChange={() => toggleOne(child.id)}
                          aria-label={child.name}
                        />
                        <label
                          htmlFor={child.id}
                          className="text-[length:var(--text-sm)] text-[var(--color-text-secondary)]"
                        >
                          {child.name}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={() => setSaveOpen(true)}>保存权限变更</Button>
      </div>

      <ConfirmDialog
        open={saveOpen}
        onOpenChange={setSaveOpen}
        title="确认保存权限变更？"
        description={
          <div className="grid gap-2">
            <p>保存后，{affectedUsers} 位关联用户的权限将立即生效。</p>
            <p className="text-[var(--color-text-tertiary)]">请确认变更范围正确。</p>
          </div>
        }
        confirmText="确认保存"
        onConfirm={handleSave}
      />
    </div>
  )
}
