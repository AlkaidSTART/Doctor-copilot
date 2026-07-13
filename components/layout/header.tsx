"use client"

import * as React from "react"
import Link from "next/link"
import {
  Menu,
  HeartPulse,
  Search,
  Bell,
  Settings,
  LogOut,
  Sun,
  Moon,
  Monitor,
} from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth/use-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { UserRole } from "@/components/layout/app-shell"

export interface HeaderProps {
  role?: UserRole
  notificationCount?: number
  onMenuClick?: () => void
  onLogoClick?: () => void
  className?: string
}

function ThemeSubMenu() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Sun className="size-4" aria-hidden="true" />
        <span>主题</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="min-w-[140px]">
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="light">
            <Sun className="size-4" aria-hidden="true" />
            <span>浅色</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            <Moon className="size-4" aria-hidden="true" />
            <span>深色</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">
            <Monitor className="size-4" aria-hidden="true" />
            <span>跟随系统</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}

export function Header({
  role = "doctor",
  notificationCount = 0,
  onMenuClick,
  onLogoClick,
  className,
}: HeaderProps) {
  const { user, logout } = useAuth()
  const userInitial = (user?.name?.[0] ?? "U").toUpperCase()
  const userLabel = user?.name ?? "用户"

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 flex h-[var(--layout-header-height)] items-center justify-between border-b border-[var(--color-border-divider)] bg-[var(--color-bg-card)] px-4 shadow-[var(--shadow-sm)] md:px-6",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="打开导航菜单"
          onClick={onMenuClick}
        >
          <Menu className="size-5" aria-hidden="true" />
        </Button>

        <Link
          href={role === "admin" ? "/admin" : "/dashboard"}
          onClick={onLogoClick}
          className="flex items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2"
        >
          <HeartPulse
            className="size-6 text-[var(--color-primary-600)]"
            aria-hidden="true"
          />
          <span className="hidden text-base font-semibold text-[var(--color-text-primary)] sm:inline">
            Doctor Copilot
          </span>
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 md:justify-between md:px-6">
        <div className="relative hidden w-full max-w-md md:block">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--color-text-tertiary)]"
            aria-hidden="true"
          />
          <Input
            type="search"
            placeholder="搜索患者、任务、文档..."
            aria-label="全局搜索"
            className="h-9 w-full rounded-full border-[var(--color-border-default)] bg-[var(--color-neutral-50)] pl-9 pr-20 text-sm placeholder:text-[var(--color-text-tertiary)] focus-visible:bg-[var(--color-bg-card)]"
          />
          <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded border border-[var(--color-border-default)] bg-[var(--color-bg-card)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--color-text-tertiary)] lg:inline-flex">
            ⌘ K
          </kbd>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="搜索"
          >
            <Search className="size-5" aria-hidden="true" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label={`通知${notificationCount > 0 ? `，${notificationCount} 条未读` : ""}`}
            className="relative"
          >
            <Bell className="size-5" aria-hidden="true" />
            {notificationCount > 0 && (
              <Badge
                variant="destructive"
                className="pointer-events-none absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px]"
              >
                {notificationCount > 99 ? "99+" : notificationCount}
              </Badge>
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 rounded-full px-2 py-1.5"
                  aria-label="用户菜单"
                >
                  <Avatar size="sm">
                    <AvatarFallback className="bg-[var(--color-primary-100)] text-[var(--color-primary-700)]">
                      {userInitial}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden max-w-[120px] truncate text-sm font-medium text-[var(--color-text-primary)] lg:inline">
                    {userLabel}
                  </span>
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{userLabel}</span>
                  {user?.email && (
                    <span className="truncate text-xs text-[var(--color-text-tertiary)]">
                      {user.email}
                    </span>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="size-4" aria-hidden="true" />
                <span>设置</span>
              </DropdownMenuItem>
              <ThemeSubMenu />
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={logout}>
                <LogOut className="size-4" aria-hidden="true" />
                <span>退出登录</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
