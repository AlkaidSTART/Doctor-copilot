"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState, type EmptyStateProps } from "@/components/common/empty-state"
import type { RiskLevel } from "@/components/common/risk-badge"

export interface DataTableColumn<T> {
  key: string
  header: React.ReactNode
  render: (row: T) => React.ReactNode
  className?: string
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  data: T[]
  loading?: boolean
  loadingRows?: number
  emptyState?: EmptyStateProps
  getRowKey: (row: T, index: number) => string | number
  getRowRisk?: (row: T) => RiskLevel | undefined
  onRowClick?: (row: T) => void
  className?: string
}

const riskBorderClass: Record<RiskLevel, string> = {
  p1: "border-l-4 border-l-[var(--color-risk-p1)] bg-[var(--color-risk-p1-bg)]",
  p2: "border-l-4 border-l-[var(--color-risk-p2)] bg-[var(--color-risk-p2-bg)]",
  p3: "border-l-4 border-l-[var(--color-risk-p3)] bg-[var(--color-risk-p3-bg)]",
  p4: "border-l-4 border-l-[var(--color-risk-p4)] bg-[var(--color-risk-p4-bg)]",
  normal: "border-l-4 border-l-[var(--color-risk-normal)] bg-[var(--color-risk-normal-bg)]",
  unknown: "border-l-4 border-l-[var(--color-risk-unknown)] bg-[var(--color-neutral-100)]",
}

export function DataTable<T>({
  columns,
  data,
  loading = false,
  loadingRows = 5,
  emptyState,
  getRowKey,
  getRowRisk,
  onRowClick,
  className,
}: DataTableProps<T>) {
  const showEmpty = !loading && data.length === 0

  return (
    <div className={cn("overflow-x-auto rounded-xl border border-[var(--color-border-default)]", className)}>
      <Table>
        <TableHeader>
          <TableRow className="bg-[var(--color-neutral-50)] hover:bg-[var(--color-neutral-50)]">
            {columns.map((column) => (
              <TableHead key={column.key} className={cn("h-11 text-[length:var(--text-sm)] font-semibold text-[var(--color-text-secondary)]", column.className)}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading &&
            Array.from({ length: loadingRows }).map((_, rowIndex) => (
              <TableRow key={`skeleton-${rowIndex}`}>
                {columns.map((column, colIndex) => (
                  <TableCell key={`skeleton-${rowIndex}-${column.key}-${colIndex}`}>
                    <Skeleton className="h-4 w-full max-w-[120px]" />
                  </TableCell>
                ))}
              </TableRow>
            ))}

          {showEmpty && (
            <TableRow>
              <TableCell colSpan={columns.length} className="p-0">
                <EmptyState
                  icon={emptyState?.icon}
                  title={emptyState?.title ?? "暂无数据"}
                  description={emptyState?.description}
                  action={emptyState?.action}
                />
              </TableCell>
            </TableRow>
          )}

          {!loading &&
            data.map((row, rowIndex) => {
              const risk = getRowRisk?.(row)
              return (
                <TableRow
                  key={getRowKey(row, rowIndex)}
                  className={cn(
                    "h-12 transition-colors",
                    risk ? riskBorderClass[risk] : "hover:bg-[var(--color-bg-hover)]",
                    onRowClick && "cursor-pointer hover:bg-[var(--color-bg-hover)]"
                  )}
                  onClick={() => onRowClick?.(row)}
                  tabIndex={onRowClick ? 0 : undefined}
                  role={onRowClick ? "button" : undefined}
                  onKeyDown={
                    onRowClick
                      ? (e: React.KeyboardEvent) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            onRowClick(row)
                          }
                        }
                      : undefined
                  }
                >
                  {columns.map((column) => (
                    <TableCell key={column.key} className={cn("text-[length:var(--text-sm)]", column.className)}>
                      {column.render(row)}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
    </div>
  )
}
