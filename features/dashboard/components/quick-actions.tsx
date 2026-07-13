"use client"

import * as React from "react"
import Link from "next/link"
import { Plus, Bell, FileText, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const actions = [
  { label: "新建随访", icon: Plus, href: "/tasks/new" },
  { label: "发送提醒", icon: Bell, href: "/messages" },
  { label: "查看报告", icon: FileText, href: "/reports" },
  { label: "AI 助手", icon: Sparkles, href: "/ai-chat" },
]

export function QuickActions({ loading }: { loading?: boolean }) {
  return (
    <Card className="h-full border-[var(--color-border-default)] bg-[var(--color-bg-card)]">
      <CardHeader>
        <CardTitle className="text-[length:var(--text-lg)] font-semibold text-[var(--color-text-primary)]">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {loading ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-20 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-neutral-100)]"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {actions.map((action) => {
              const Icon = action.icon
              return (
                <Button
                  key={action.label}
                  variant="outline"
                  className="h-auto flex-col gap-2 py-4"
                  render={<Link href={action.href} />}
                >
                  <Icon className="size-5 text-[var(--color-primary-600)]" aria-hidden="true" />
                  <span className="text-[length:var(--text-sm)] font-medium text-[var(--color-text-primary)]">
                    {action.label}
                  </span>
                </Button>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
