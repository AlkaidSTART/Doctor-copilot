"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { MainContent } from "@/components/layout/main-content"

export type UserRole = "doctor" | "nurse" | "patient" | "admin"

export interface AppShellProps {
  children: React.ReactNode
  role?: UserRole
  user?: {
    name?: string
    email?: string
    avatarUrl?: string
  }
  className?: string
}

export function AppShell({ children, role = "doctor", user, className }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [collapsed, setCollapsed] = React.useState(() => {
    if (typeof window === "undefined") return false
    const stored = window.localStorage.getItem("dc-sidebar-collapsed")
    return stored === "true"
  })

  const toggleCollapsed = React.useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev
      window.localStorage.setItem("dc-sidebar-collapsed", String(next))
      return next
    })
  }, [])

  const sidebarWidth = collapsed ? "var(--layout-sidebar-collapsed-width)" : "var(--layout-sidebar-width)"

  return (
    <div className={cn("relative min-h-screen bg-[var(--color-bg-page)]", className)}>
      <Header
        role={role}
        user={user}
        onMenuClick={() => setMobileOpen(true)}
        onLogoClick={() => setMobileOpen(false)}
      />

      <Sidebar
        role={role}
        collapsed={collapsed}
        onCollapsedChange={toggleCollapsed}
        mobileOpen={mobileOpen}
        onMobileOpenChange={setMobileOpen}
        user={user ? { name: user.name, email: user.email } : undefined}
      />

      <div
        className="flex min-h-[calc(100vh-var(--layout-header-height))] flex-col transition-[margin] duration-200 ease-[var(--ease-default)]"
        style={{ marginLeft: sidebarWidth }}
      >
        <MainContent>{children}</MainContent>
      </div>
    </div>
  )
}
