"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardAction, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/common/data-table"
import { RiskBadge } from "@/components/common/risk-badge"
import { PatientDrawer } from "./patient-drawer"
import type { RiskPatient, TimelineEvent } from "../lib/types"
import { formatRelativeTime } from "../lib/format"

interface RiskQueueProps {
  patients: RiskPatient[]
  timelineEvents: Record<string, TimelineEvent[]>
  loading?: boolean
  lastUpdated?: Date
  onMarkHandled: (patient: RiskPatient) => void
}

export function RiskQueue({
  patients,
  timelineEvents,
  loading,
  lastUpdated,
  onMarkHandled,
}: RiskQueueProps) {
  const router = useRouter()
  const [selected, setSelected] = React.useState<RiskPatient | null>(null)

  const columns = [
    {
      key: "risk",
      header: "风险",
      render: (row: RiskPatient) => <RiskBadge level={row.level} size="sm" />,
      className: "w-24",
    },
    {
      key: "patient",
      header: "患者",
      render: (row: RiskPatient) => (
        <span className="font-medium text-[var(--color-text-primary)]">{row.name}</span>
      ),
    },
    {
      key: "description",
      header: "风险描述",
      render: (row: RiskPatient) => (
        <span className="text-[var(--color-text-secondary)]">{row.description}</span>
      ),
    },
    {
      key: "updatedAt",
      header: "更新时间",
      render: (row: RiskPatient) => (
        <span className="text-[var(--color-text-tertiary)]">{formatRelativeTime(row.updatedAt)}</span>
      ),
      className: "w-32",
    },
    {
      key: "action",
      header: "",
      render: (row: RiskPatient) => (
        <Button
          size="sm"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation()
            setSelected(row)
          }}
        >
          查看
        </Button>
      ),
      className: "w-20 text-right",
    },
  ]

  return (
    <>
      <Card className="h-full border-[var(--color-border-default)] bg-[var(--color-bg-card)]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-[length:var(--text-lg)] font-semibold text-[var(--color-text-primary)]">
                Risk Queue
              </CardTitle>
              {lastUpdated && (
                <span className="text-[length:var(--text-xs)] text-[var(--color-text-tertiary)]">
                  更新于 {lastUpdated.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}
                </span>
              )}
            </div>
            <CardAction>
              <Button variant="ghost" size="sm" onClick={() => router.push("/patients")}>
                查看全部
                <ChevronRight className="size-4" aria-hidden="true" />
              </Button>
            </CardAction>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <DataTable
            columns={columns}
            data={patients}
            loading={loading}
            loadingRows={3}
            getRowKey={(row) => row.id}
            getRowRisk={(row) => row.level}
            onRowClick={(row) => setSelected(row)}
            emptyState={{
              title: "暂无高风险患者",
              description: "当前没有需要 immediate 关注的患者",
              action: {
                label: "查看全部患者",
                onClick: () => router.push("/patients"),
              },
            }}
          />
        </CardContent>
      </Card>

      <PatientDrawer
        patient={selected}
        events={selected ? timelineEvents[selected.id] ?? [] : []}
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
        onMarkHandled={(patient) => {
          onMarkHandled(patient)
          setSelected(null)
        }}
      />
    </>
  )
}
