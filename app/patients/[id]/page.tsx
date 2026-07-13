"use client"

import * as React from "react"
import { use } from "react"

import type { TabValue } from "@/features/patient/types"
import {
  mockPatient,
  mockTimelineEvents,
  mockCarePlan,
  mockIndicators,
  mockTasks,
  mockMessages,
  quickQuestions,
} from "@/features/patient/data/mock"
import { PatientHeader } from "@/features/patient/components/patient-header"
import { TimelineTab } from "@/features/patient/components/timeline-tab"
import { CarePlanTab } from "@/features/patient/components/care-plan-tab"
import { TasksTab } from "@/features/patient/components/tasks-tab"
import { AIChatTab } from "@/features/patient/components/ai-chat-tab"
import { AppShell } from "@/components/layout/app-shell"
import { PageHeader } from "@/components/layout/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

const TABS: { value: TabValue; label: string }[] = [
  { value: "timeline", label: "Timeline" },
  { value: "care-plan", label: "Care Plan" },
  { value: "tasks", label: "Tasks" },
  { value: "ai-chat", label: "AI Chat" },
]

const VALID_TAB_VALUES: TabValue[] = ["timeline", "care-plan", "tasks", "ai-chat"]

interface PatientDetailPageProps {
  params: Promise<{ id: string }>
}

export default function PatientDetailPage({
  params,
}: PatientDetailPageProps) {
  const patientId = use(params).id
  const [activeTab, setActiveTab] = React.useState<TabValue>(() => {
    if (typeof window === "undefined") return "timeline"
    const hash = window.location.hash.replace("#", "")
    return VALID_TAB_VALUES.includes(hash as TabValue)
      ? (hash as TabValue)
      : "timeline"
  })

  React.useEffect(() => {
    window.history.replaceState(null, "", `#${activeTab}`)
  }, [activeTab])

  const handleEditProfile = () => {
    toast.info("打开患者资料编辑抽屉", {
      description: `正在编辑患者 ${mockPatient.name}`,
    })
  }

  const handleDeletePatient = () => {
    toast.error("删除患者", {
      description: `已触发删除患者 ${mockPatient.name} (${patientId}) 的二次确认`,
    })
  }

  const handleExportPatient = () => {
    toast.success("导出患者资料", {
      description: "已开始导出 PDF 报告",
    })
  }

  const handlePrintPatient = () => {
    toast.success("打印患者资料", {
      description: "已调用浏览器打印",
    })
  }

  const handleViewFullPlan = () => {
    toast.info("查看完整照护计划", {
      description: mockCarePlan.name,
    })
  }

  const handleRecordIndicator = (indicatorId: string) => {
    const indicator = mockIndicators.find((item) => item.id === indicatorId)
    toast.info("记录指标", {
      description: indicator
        ? `打开 ${indicator.name} 记录表单`
        : "打开指标记录表单",
    })
  }

  const handleCreateTask = () => {
    toast.info("新建任务", {
      description: "打开新建任务抽屉",
    })
  }

  const handleEditTask = (taskId: string) => {
    toast.info("编辑任务", {
      description: `编辑任务 ${taskId}`,
    })
  }

  const handleDeleteTask = (taskId: string) => {
    toast.error("删除任务", {
      description: `已触发删除任务 ${taskId} 的二次确认`,
    })
  }

  return (
    <AppShell role="doctor">
      <PageHeader
        title="患者详情"
        breadcrumbs={[
          { label: "首页", href: "/" },
          { label: "患者管理", href: "/patients" },
          { label: mockPatient.name },
        ]}
      />

      <div className="flex flex-col gap-4">
        <PatientHeader
          patient={mockPatient}
          onEdit={handleEditProfile}
          onDelete={handleDeletePatient}
          onExport={handleExportPatient}
          onPrint={handlePrintPatient}
        />

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabValue)}>
          <TabsList variant="line" className="w-full justify-start">
            {TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="timeline" className="pt-4">
            <TimelineTab events={mockTimelineEvents} />
          </TabsContent>

          <TabsContent value="care-plan" className="pt-4">
            <CarePlanTab
              carePlan={mockCarePlan}
              indicators={mockIndicators}
              onViewFullPlan={handleViewFullPlan}
              onRecordIndicator={handleRecordIndicator}
            />
          </TabsContent>

          <TabsContent value="tasks" className="pt-4">
            <TasksTab
              tasks={mockTasks}
              onCreateTask={handleCreateTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          </TabsContent>

          <TabsContent value="ai-chat" className="pt-4">
            <AIChatTab
              messages={mockMessages}
              quickQuestions={quickQuestions}
            />
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  )
}
