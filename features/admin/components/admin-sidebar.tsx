"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MODULE_ITEMS, type AdminModule } from "@/features/admin/lib/types"

export interface AdminSidebarProps {
  activeModule: AdminModule
  onModuleChange: (module: AdminModule) => void
}

export function AdminSidebar({ activeModule, onModuleChange }: AdminSidebarProps) {
  return (
    <>
      {/* Mobile dropdown */}
      <div className="mb-4 md:hidden">
        <Select value={activeModule} onValueChange={(value) => onModuleChange(value as AdminModule)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="选择模块" />
          </SelectTrigger>
          <SelectContent>
            {MODULE_ITEMS.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden w-[200px] shrink-0 flex-col border-r border-[var(--color-border-divider)] bg-[var(--color-bg-card)] md:flex lg:w-[240px]">
        <nav className="flex flex-1 flex-col gap-1 p-3" role="navigation" aria-label="Admin secondary navigation">
          {MODULE_ITEMS.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => onModuleChange(item.id)}
              className={cn(
                "w-full justify-start text-[length:var(--text-sm)] font-medium",
                activeModule === item.id
                  ? "bg-[var(--color-bg-selected)] text-[var(--color-primary-700)] hover:bg-[var(--color-bg-selected)]"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-primary)]"
              )}
            >
              {item.label}
            </Button>
          ))}
        </nav>
      </aside>
    </>
  )
}
