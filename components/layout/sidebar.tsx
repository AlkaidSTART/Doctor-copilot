"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Bell,
  Stethoscope,
  MessageSquare,
  MessageCircleQuestion,
  Shield,
  Lock,
  Bot,
  FileText,
  BookOpen,
  ScrollText,
  HeartPulse,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { SidebarItem } from "@/components/layout/sidebar-item"
import type { UserRole } from "@/components/layout/app-shell"
import type { LucideIcon } from "lucide-react"

export interface SidebarProps {
  role?: UserRole
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  mobileOpen?: boolean
  onMobileOpenChange?: (open: boolean) => void
  user?: {
    name?: string
    email?: string
  }
}

function getUserDisplayName(user: { name?: string; email?: string } | undefined, role: UserRole) {
  if (user?.name) return user.name
  const roleLabel =
    role === "doctor" ? "医生" : role === "nurse" ? "护士" : role === "patient" ? "患者" : "管理员"
  return roleLabel
}

interface NavItem {
  icon: LucideIcon
  label: string
  href: string
  badge?: number
}

const navGroups: Record<UserRole, NavItem[]> = {
  doctor: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Users, label: "Patients", href: "/patients" },
    { icon: ClipboardList, label: "Tasks", href: "#", badge: 5 },
    { icon: Bell, label: "Alerts", href: "#", badge: 2 },
    { icon: Stethoscope, label: "Doctor Brief", href: "/doctor-brief" },
    { icon: MessageSquare, label: "Messages", href: "/messages" },
  ],
  nurse: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Users, label: "Patients", href: "/patients" },
    { icon: ClipboardList, label: "Tasks", href: "#", badge: 8 },
    { icon: Bell, label: "Alerts", href: "#", badge: 1 },
    { icon: MessageSquare, label: "Messages", href: "/messages" },
  ],
  patient: [
    { icon: ClipboardList, label: "Tasks", href: "/tasks" },
    { icon: MessageSquare, label: "Messages", href: "/messages" },
    { icon: MessageCircleQuestion, label: "Feedback", href: "/feedback" },
  ],
  admin: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Users, label: "Users", href: "/admin/users" },
    { icon: Shield, label: "Roles", href: "/admin/roles" },
    { icon: Lock, label: "Permissions", href: "/admin/permissions" },
    { icon: Bot, label: "AI Config", href: "/admin/ai-config" },
    { icon: FileText, label: "Prompts", href: "/admin/prompts" },
    { icon: BookOpen, label: "KB", href: "/admin/knowledge-base" },
    { icon: ScrollText, label: "Audit", href: "/admin/audit" },
  ],
}

function SidebarContent({
  role = "doctor",
  collapsed = false,
  onCollapsedChange,
  onItemClick,
  user,
}: {
  role?: UserRole
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  onItemClick?: () => void
  user?: { name?: string; email?: string }
}) {
  const items = navGroups[role]

  return (
    <div className="flex h-full flex-col">
      <div
        className={cn(
          "flex h-[var(--layout-header-height)] items-center border-b border-[var(--color-border-divider)] px-4",
          collapsed ? "justify-center" : "justify-between"
        )}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <HeartPulse
            className="size-6 shrink-0 text-[var(--color-primary-600)]"
            aria-hidden="true"
          />
          {!collapsed && (
            <span className="truncate text-base font-semibold text-[var(--color-text-primary)]">
              Doctor Copilot
            </span>
          )}
        </div>
        {!collapsed && onCollapsedChange && (
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="折叠侧边栏"
            onClick={() => onCollapsedChange(true)}
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </Button>
        )}
        {collapsed && onCollapsedChange && (
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="展开侧边栏"
            onClick={() => onCollapsedChange(false)}
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1 px-3 py-3">
        <nav className="flex flex-col gap-1" role="navigation" aria-label="主导航">
          {items.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              href={item.href}
              badge={item.badge}
              collapsed={collapsed}
              onClick={onItemClick}
            />
          ))}
        </nav>
      </ScrollArea>

      {!collapsed && (
        <div className="border-t border-[var(--color-border-divider)] p-4">
          <div className="flex items-center gap-3">
            <Avatar size="sm">
              <AvatarFallback className="bg-[var(--color-primary-100)] text-[var(--color-primary-700)]">
                {getUserDisplayName(user, role).slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col overflow-hidden">
              <span className="truncate text-sm font-medium text-[var(--color-text-primary)]">
                {getUserDisplayName(user, role)}
              </span>
              <span className="truncate text-xs text-[var(--color-text-tertiary)]">
                {user?.email ?? (role === "doctor" ? "医生" : role === "nurse" ? "护士" : role === "patient" ? "患者" : "管理员")}
              </span>
            </div>
            <Button variant="ghost" size="icon-sm" aria-label="退出登录">
              <LogOut className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export function Sidebar({
  role = "doctor",
  collapsed = false,
  onCollapsedChange,
  mobileOpen = false,
  onMobileOpenChange,
  user,
}: SidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="fixed left-0 top-[var(--layout-header-height)] hidden h-[calc(100vh-var(--layout-header-height))] border-r border-[var(--color-border-divider)] bg-[var(--color-bg-card)] shadow-[var(--shadow-sm)] transition-[width] duration-200 ease-[var(--ease-default)] md:block"
        style={{ width: collapsed ? "var(--layout-sidebar-collapsed-width)" : "var(--layout-sidebar-width)" }}
        aria-label="侧边导航"
      >
        <SidebarContent
          role={role}
          collapsed={collapsed}
          onCollapsedChange={onCollapsedChange}
          user={user}
        />
      </aside>

      {/* Mobile drawer */}
      <Sheet open={mobileOpen} onOpenChange={onMobileOpenChange}>
        <SheetContent side="left" className="w-[280px] p-0" showCloseButton={false}>
          <SheetHeader className="sr-only">
            <SheetTitle>导航菜单</SheetTitle>
            <SheetDescription>Doctor Copilot 主导航</SheetDescription>
          </SheetHeader>
          <SidebarContent
            role={role}
            collapsed={false}
            onItemClick={() => onMobileOpenChange?.(false)}
            user={user}
          />
        </SheetContent>
      </Sheet>
    </>
  )
}
