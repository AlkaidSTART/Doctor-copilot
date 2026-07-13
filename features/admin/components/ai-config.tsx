"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { ConfirmDialog } from "./confirm-dialog"

export function AIConfig() {
  const [model, setModel] = React.useState("gpt-4o")
  const [temperature, setTemperature] = React.useState("0.7")
  const [maxTokens, setMaxTokens] = React.useState("4096")
  const [routingScenario, setRoutingScenario] = React.useState("default")
  const [contentFilter, setContentFilter] = React.useState(true)
  const [auditLevel, setAuditLevel] = React.useState("standard")
  const [ragEnabled, setRagEnabled] = React.useState(true)
  const [streamingEnabled, setStreamingEnabled] = React.useState(true)
  const [aiSuggestions, setAiSuggestions] = React.useState(true)

  const [pendingSwitch, setPendingSwitch] = React.useState<{
    name: string
    setter: (value: boolean) => void
    value: boolean
    risk: string
  } | null>(null)

  const requestDangerousChange = (name: string, current: boolean, setter: (value: boolean) => void, risk: string) => {
    setPendingSwitch({ name, setter, value: !current, risk })
  }

  const confirmDangerousChange = () => {
    if (pendingSwitch) {
      pendingSwitch.setter(pendingSwitch.value)
      setPendingSwitch(null)
    }
  }

  const handleSave = () => {
    // Mock save
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>模型设置</CardTitle>
            <CardDescription>配置默认大模型与生成参数。</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="model">默认模型</Label>
              <Select value={model} onValueChange={(value) => value && setModel(value)}>
                <SelectTrigger id="model">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                  <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                  <SelectItem value="claude-3-5">Claude 3.5 Sonnet</SelectItem>
                  <SelectItem value="qwen-max">Qwen Max</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="temperature">温度 ({temperature})</Label>
              <Input
                id="temperature"
                type="number"
                min={0}
                max={2}
                step={0.1}
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="maxTokens">最大 Token</Label>
              <Input
                id="maxTokens"
                type="number"
                value={maxTokens}
                onChange={(e) => setMaxTokens(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>路由规则</CardTitle>
            <CardDescription>按场景路由到不同模型。</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="routing">默认路由场景</Label>
              <Select value={routingScenario} onValueChange={(value) => value && setRoutingScenario(value)}>
                <SelectTrigger id="routing">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">默认</SelectItem>
                  <SelectItem value="followup">随访摘要</SelectItem>
                  <SelectItem value="risk">风险评估</SelectItem>
                  <SelectItem value="drug">用药建议</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="rounded-lg bg-[var(--color-neutral-50)] p-3 text-[length:var(--text-sm)] text-[var(--color-text-secondary)]">
              当前路由：随访摘要 → GPT-4o · 风险评估 → Claude 3.5 · 用药建议 → GPT-4o Mini
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>安全策略</CardTitle>
            <CardDescription>内容过滤、敏感词与审计级别。</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="grid gap-0.5">
                <Label>内容过滤</Label>
                <span className="text-[length:var(--text-xs)] text-[var(--color-text-tertiary)]">自动过滤敏感与不当内容</span>
              </div>
              <Switch
                checked={contentFilter}
                onCheckedChange={(checked) =>
                  checked
                    ? setContentFilter(true)
                    : requestDangerousChange("内容过滤", contentFilter, setContentFilter, "关闭后可能输出不安全内容")
                }
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="auditLevel">审计级别</Label>
              <Select value={auditLevel} onValueChange={(value) => value && setAuditLevel(value)}>
                <SelectTrigger id="auditLevel">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">不审计</SelectItem>
                  <SelectItem value="standard">标准审计</SelectItem>
                  <SelectItem value="strict">严格审计</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>功能开关</CardTitle>
            <CardDescription>控制 AI 功能启用状态。</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="grid gap-0.5">
                <Label>RAG 知识检索</Label>
                <span className="text-[length:var(--text-xs)] text-[var(--color-text-tertiary)]">基于知识库增强回答</span>
              </div>
              <Switch
                checked={ragEnabled}
                onCheckedChange={(checked) =>
                  checked
                    ? setRagEnabled(true)
                    : requestDangerousChange("RAG 知识检索", ragEnabled, setRagEnabled, "关闭后 AI 回答不再引用知识库")
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="grid gap-0.5">
                <Label>流式输出</Label>
                <span className="text-[length:var(--text-xs)] text-[var(--color-text-tertiary)]">逐字显示 AI 回复</span>
              </div>
              <Switch checked={streamingEnabled} onCheckedChange={setStreamingEnabled} />
            </div>
            <div className="flex items-center justify-between">
              <div className="grid gap-0.5">
                <Label>AI 建议</Label>
                <span className="text-[length:var(--text-xs)] text-[var(--color-text-tertiary)]">在诊疗场景主动给出建议</span>
              </div>
              <Switch checked={aiSuggestions} onCheckedChange={setAiSuggestions} />
            </div>
          </CardContent>
        </Card>
      </div>

      <CardFooter className="justify-end px-0">
        <Button onClick={handleSave}>保存配置</Button>
      </CardFooter>

      <ConfirmDialog
        open={!!pendingSwitch}
        onOpenChange={(open) => !open && setPendingSwitch(null)}
        title={`确认关闭「${pendingSwitch?.name}」？`}
        description={
          <div className="grid gap-2">
            <p>此操作存在风险：{pendingSwitch?.risk}。</p>
            <p className="text-[var(--color-text-tertiary)]">请确认仍要执行。</p>
          </div>
        }
        confirmText="确认关闭"
        variant="destructive"
        onConfirm={confirmDangerousChange}
      />
    </div>
  )
}
