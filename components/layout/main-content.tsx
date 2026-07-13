"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface MainContentProps {
  children: React.ReactNode
  className?: string
}

export function MainContent({ children, className }: MainContentProps) {
  return (
    <main
      className={cn(
        "mx-auto w-full max-w-[var(--layout-main-max-width)] min-h-[calc(100vh-var(--layout-header-height)-var(--layout-page-header-height))] px-4 py-5 md:px-6 xl:px-8",
        className
      )}
    >
      {children}
    </main>
  )
}
