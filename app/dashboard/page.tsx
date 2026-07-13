"use client"

import * as React from "react"
import Link from "next/link"
import { Plus, Download } from "lucide-react"
import { toast } from "sonner"

import { AppShell } from "@/components/layout/app-shell"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { KpiSection } from "@/features/dashboard/components/kpi-section"
import { RiskQueue } from "@/features/dashboard/components/risk-queue"
import { TodoQueue } from "@/features/dashboard/components/todo-queue"
import { DoctorBrief } from "@/features/dashboard/components/doctor-brief"
import { QuickActions } from "@/features/dashboard/components/quick-actions"
import { kpis as mockKpis, riskPatients as mockPatients, timelineEvents, todoTasks as mockTasks, briefEvents as mockBriefs } from "@/features/dashboard/lib/mock-data"
import type { RiskPatient, TodoTask } from "@/features/dashboard/lib/types"

export default function DashboardPage() {
  const [loading, setLoading] = React.useState(true)
  const [refreshing, setRefreshing] = React.useState(false)
  const [patients, setPatients] = React.useState<RiskPatient[]>([])
  const [tasks, setTasks] = React.useState<TodoTask[]>([])
  const [briefs, setBriefs] = React.useState(mockBriefs)
  const [lastUpdated, setLastUpdated] = React.useState<Date | undefined>(undefined)

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setPatients(mockPatients)
      setTasks(mockTasks)
      setBriefs(mockBriefs)
      setLastUpdated(new Date())
      setLoading(false)
    }, 800)

    return () => window.clearTimeout(timer)
  }, [])

  React.useEffect(() => {
    if (loading) return
    const interval = window.setInterval(() => {
      setRefreshing(true)
      window.setTimeout(() => {
        setLastUpdated(new Date())
        setRefreshing(false)
      }, 700)
    }, 60000)

    return () => window.clearInterval(interval)
  }, [loading])

  const kpis = React.useMemo(
    () => [
      {
        ...mockKpis[0],
      },
      {
        ...mockKpis[1],
        value: tasks.length,
        alert: tasks.length > 20 ? ("warning" as const) : undefined,
      },
      {
        ...mockKpis[2],
        value: patients.filter((p) => p.level === "p1").length,
      },
      {
        ...mockKpis[3],
      },
    ],
    [patients, tasks]
  )

  const handleMarkHandled = (patient: RiskPatient) => {
    setPatients((prev) => prev.filter((p) => p.id !== patient.id))
    toast.success(`已将 ${patient.name} 标记为已处理`)
  }

  const handleTaskComplete = (task: TodoTask) => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id))
  }

  return (
    <AppShell role="doctor">
      <PageHeader
        title="Dashboard"
        description="今日待处理 12 项，P1 风险 2 人"
        actions={
          <>
            <Button render={<Link href="/tasks/new" />}>
              <Plus className="size-4" aria-hidden="true" />
              新建任务
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.info("导出功能开发中")}
            >
              <Download className="size-4" aria-hidden="true" />
              导出
            </Button>
          </>
        }
      />

      <div className="space-y-6 py-6">
        <KpiSection kpis={kpis} loading={loading} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <RiskQueue
            patients={patients}
            timelineEvents={timelineEvents}
            loading={loading || refreshing}
            lastUpdated={lastUpdated}
            onMarkHandled={handleMarkHandled}
          />
          <TodoQueue
            tasks={tasks}
            loading={loading || refreshing}
            lastUpdated={lastUpdated}
            onComplete={handleTaskComplete}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <DoctorBrief events={briefs} loading={loading} />
          <QuickActions loading={loading} />
        </div>
      </div>
    </AppShell>
  )
}
