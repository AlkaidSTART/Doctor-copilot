"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"

export interface MobileDrawerProps {
  trigger: React.ReactElement
  title: string
  description?: string
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

export function MobileDrawer({
  trigger,
  title,
  description,
  children,
  open,
  onOpenChange,
  className,
}: MobileDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger render={trigger} />
      <SheetContent side="bottom" className={cn("rounded-t-2xl p-0", className)}>
        <div
          className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-[var(--color-border-hover)]"
          aria-hidden="true"
        />
        <SheetHeader className="px-5 pb-2 pt-2">
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <div className="max-h-[calc(100svh-8rem)] overflow-y-auto px-5 pb-6">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  )
}
