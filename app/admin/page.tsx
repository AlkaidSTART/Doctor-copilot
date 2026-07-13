"use client"

import * as React from "react"

import { AppShell } from "@/components/layout/app-shell"
import { PageHeader } from "@/components/layout/page-header"
import { AdminSidebar } from "@/features/admin/components/admin-sidebar"
import { UserManagement } from "@/features/admin/components/user-management"
import { RoleManagement } from "@/features/admin/components/role-management"
import { PermissionManagement } from "@/features/admin/components/permission-management"
import { AIConfig } from "@/features/admin/components/ai-config"
import { PromptManagement } from "@/features/admin/components/prompt-management"
import { KnowledgeBase } from "@/features/admin/components/knowledge-base"
import { AuditLogs } from "@/features/admin/components/audit-logs"
import { MODULE_ITEMS, type AdminModule } from "@/features/admin/lib/types"

const MODULE_TITLES: Record<AdminModule, string> = {
  users: "用户管理",
  roles: "角色管理",
  permissions: "权限管理",
  "ai-config": "AI 配置",
  prompts: "Prompt 管理",
  knowledge: "知识库",
  audit: "审计日志",
}

export default function AdminPage() {
  const [activeModule, setActiveModule] = React.useState<AdminModule>("users")

  const renderModule = () => {
    switch (activeModule) {
      case "users":
        return <UserManagement />
      case "roles":
        return <RoleManagement />
      case "permissions":
        return <PermissionManagement />
      case "ai-config":
        return <AIConfig />
      case "prompts":
        return <PromptManagement />
      case "knowledge":
        return <KnowledgeBase />
      case "audit":
        return <AuditLogs />
      default:
        return <UserManagement />
    }
  }

  return (
    <AppShell role="admin">
      <PageHeader
        title="系统管理"
        description="管理用户、角色、权限、AI 配置与审计日志"
        breadcrumbs={[{ label: "管理后台" }]}
      />
      <div className="flex min-h-[calc(100vh-var(--layout-header-height)-var(--layout-page-header-height))] flex-col md:flex-row">
        <AdminSidebar activeModule={activeModule} onModuleChange={setActiveModule} />
        <section className="flex flex-1 flex-col gap-4 overflow-hidden p-4 md:p-6" aria-label={MODULE_TITLES[activeModule]}>
          <div className="flex items-center justify-between">
            <h2 className="text-[length:var(--text-xl)] font-semibold text-[var(--color-text-primary)]">
              {MODULE_TITLES[activeModule]}
            </h2>
          </div>
          {renderModule()}
        </section>
      </div>
    </AppShell>
  )
}
