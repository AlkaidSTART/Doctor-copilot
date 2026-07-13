"use client"

import * as React from "react"

import { PlayIcon, PencilIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { DataTable, type DataTableColumn } from "@/components/common/data-table"
import { mockPrompts } from "@/features/admin/lib/mock-data"
import type { AdminPrompt } from "@/features/admin/lib/types"

function promptStatusBadge(status: AdminPrompt["status"]) {
  if (status === "published") {
    return (
      <span className="inline-flex h-5 items-center rounded-full bg-[var(--color-success-100)] px-2 text-xs font-medium text-[var(--color-success-700)]">
        已发布
      </span>
    )
  }
  return (
    <span className="inline-flex h-5 items-center rounded-full bg-[var(--color-neutral-100)] px-2 text-xs font-medium text-[var(--color-text-secondary)]">
      草稿
    </span>
  )
}

function formatTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })
}

function highlightVariables(text: string): React.ReactNode {
  const parts = text.split(/(\{\{[^}]+\}\})/g)
  return parts.map((part, index) => {
    if (part.match(/^\{\{[^}]+\}\}$/)) {
      return (
        <span
          key={index}
          className="rounded bg-[var(--color-primary-100)] px-1 font-mono text-[length:var(--text-xs)] text-[var(--color-primary-700)]"
        >
          {part}
        </span>
      )
    }
    return part
  })
}

export function PromptManagement() {
  const [prompts, setPrompts] = React.useState<AdminPrompt[]>(mockPrompts)
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")

  const [editingPrompt, setEditingPrompt] = React.useState<AdminPrompt | undefined>()
  const [editOpen, setEditOpen] = React.useState(false)
  const [editName, setEditName] = React.useState("")
  const [editScenario, setEditScenario] = React.useState("")
  const [editContent, setEditContent] = React.useState("")

  const [testPrompt, setTestPrompt] = React.useState<AdminPrompt | undefined>()
  const [testInputs, setTestInputs] = React.useState<Record<string, string>>({})
  const [testOutput, setTestOutput] = React.useState("")

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const startEdit = (prompt: AdminPrompt) => {
    setEditingPrompt(prompt)
    setEditName(prompt.name)
    setEditScenario(prompt.scenario)
    setEditContent(prompt.content)
    setEditOpen(true)
  }

  const startTest = (prompt: AdminPrompt) => {
    setTestPrompt(prompt)
    const variables = Array.from(prompt.content.matchAll(/\{\{(\w+)\}\}/g)).map((m) => m[1])
    const initial: Record<string, string> = {}
    variables.forEach((v) => (initial[v] = ""))
    setTestInputs(initial)
    setTestOutput("")
  }

  const handleSave = () => {
    if (!editingPrompt) return
    setPrompts((prev) =>
      prev.map((p) =>
        p.id === editingPrompt.id ? { ...p, name: editName, scenario: editScenario, content: editContent } : p
      )
    )
    setEditOpen(false)
  }

  const handlePublish = (prompt: AdminPrompt) => {
    setPrompts((prev) =>
      prev.map((p) => (p.id === prompt.id ? { ...p, status: "published" as const, version: incrementVersion(p.version) } : p))
    )
  }

  const incrementVersion = (version: string): string => {
    const match = version.match(/v(\d+)\.(\d+)/)
    if (!match) return version
    const major = Number(match[1])
    const minor = Number(match[2]) + 1
    return `v${major}.${minor}`
  }

  const runTest = () => {
    let output = testPrompt?.content ?? ""
    Object.entries(testInputs).forEach(([key, value]) => {
      output = output.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), value || `{{${key}}}`)
    })
    setTestOutput(output)
  }

  const filteredPrompts = prompts.filter((p) => p.name.includes(search) || p.scenario.includes(search))

  const columns: DataTableColumn<AdminPrompt>[] = [
    { key: "name", header: "名称", render: (row) => <span className="font-medium">{row.name}</span> },
    { key: "scenario", header: "场景", render: (row) => row.scenario },
    { key: "version", header: "版本", render: (row) => row.version },
    { key: "status", header: "状态", render: (row) => promptStatusBadge(row.status) },
    {
      key: "updatedAt",
      header: "更新时间",
      render: (row) => <span className="text-[var(--color-text-tertiary)]">{formatTime(row.updatedAt)}</span>,
    },
    {
      key: "actions",
      header: "操作",
      render: (row) => (
        <div className="flex items-center justify-end gap-1">
          <Button variant="ghost" size="icon-sm" onClick={() => startTest(row)} title="测试">
            <PlayIcon className="size-4" />
            <span className="sr-only">测试</span>
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={() => startEdit(row)} title="编辑">
            <PencilIcon className="size-4" />
            <span className="sr-only">编辑</span>
          </Button>
          {row.status === "draft" && (
            <Button variant="ghost" size="sm" onClick={() => handlePublish(row)}>
              发布
            </Button>
          )}
        </div>
      ),
      className: "text-right",
    },
  ]

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="搜索 Prompt..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Button
          onClick={() =>
            startEdit({
              id: `pr-${Date.now()}`,
              name: "",
              scenario: "",
              version: "v1.0",
              status: "draft",
              updatedAt: new Date().toISOString(),
              content: "",
            })
          }
        >
          + 新建 Prompt
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={filteredPrompts}
        loading={loading}
        loadingRows={5}
        getRowKey={(row) => row.id}
        emptyState={{
          title: search ? "未找到 Prompt" : "暂无 Prompt",
          description: search ? "请尝试其他关键词" : "点击右上角按钮创建 Prompt",
          action: search
            ? { label: "清除搜索", onClick: () => setSearch("") }
            : { label: "新建 Prompt", onClick: () => startEdit({ id: "", name: "", scenario: "", version: "v1.0", status: "draft", updatedAt: "", content: "" }) },
        }}
      />

      {/* Test panel */}
      {testPrompt && (
        <div className="grid gap-4 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-card)] p-4 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-[var(--color-text-primary)]">Prompt 编辑器</h3>
              <Button variant="ghost" size="icon-sm" onClick={() => setTestPrompt(undefined)}>
                <XIcon className="size-4" />
              </Button>
            </div>
            <div className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-neutral-50)] p-3 text-[length:var(--text-sm)] leading-relaxed text-[var(--color-text-secondary)]">
              {highlightVariables(testPrompt.content)}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-medium text-[var(--color-text-primary)]">测试面板</h3>
            <div className="grid gap-3">
              {Object.keys(testInputs).map((key) => (
                <div key={key} className="grid gap-1.5">
                  <Label htmlFor={key}>{key}</Label>
                  <Input
                    id={key}
                    value={testInputs[key]}
                    onChange={(e) => setTestInputs((prev) => ({ ...prev, [key]: e.target.value }))}
                    placeholder={`输入 ${key}`}
                  />
                </div>
              ))}
              {Object.keys(testInputs).length === 0 && (
                <p className="text-[length:var(--text-sm)] text-[var(--color-text-tertiary)]">该 Prompt 无变量。</p>
              )}
              <Button onClick={runTest} className="self-start">
                <PlayIcon className="mr-1 size-4" />
                运行
              </Button>
              {testOutput && (
                <div className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-neutral-50)] p-3 text-[length:var(--text-sm)] text-[var(--color-text-secondary)]">
                  {testOutput}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>编辑 Prompt</DialogTitle>
            <DialogDescription>修改 Prompt 内容，变量使用 {'{{variable}}'} 格式。</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-1.5">
              <Label htmlFor="promptName">名称</Label>
              <Input id="promptName" value={editName} onChange={(e) => setEditName(e.target.value)} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="promptScenario">场景</Label>
              <Select value={editScenario} onValueChange={(value) => value && setEditScenario(value)}>
                <SelectTrigger id="promptScenario">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="随访记录">随访记录</SelectItem>
                  <SelectItem value="风险评估">风险评估</SelectItem>
                  <SelectItem value="临床决策支持">临床决策支持</SelectItem>
                  <SelectItem value="通用">通用</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="promptContent">内容</Label>
              <Textarea
                id="promptContent"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={8}
                className="font-mono text-[length:var(--text-sm)]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSave} disabled={!editName.trim()}>
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
