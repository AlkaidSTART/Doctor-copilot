"use client"

import * as React from "react"
import {
  Calendar,
  ChevronDown,
  FileDown,
  Phone,
  Pencil,
  Printer,
  Trash2,
} from "lucide-react"
import type { Patient } from "@/features/patient/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RiskBadge } from "@/components/common/risk-badge"
import { Skeleton } from "@/components/ui/skeleton"

interface PatientHeaderProps {
  patient: Patient
  loading?: boolean
  onEdit: () => void
  onDelete: () => void
  onExport: () => void
  onPrint: () => void
}

function formatRelativeTime(isoString: string): string {
  const date = new Date(isoString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMinutes = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMinutes < 1) return "刚刚"
  if (diffMinutes < 60) return `${diffMinutes} 分钟前`
  if (diffHours < 24) return `${diffHours} 小时前`
  if (diffDays < 30) return `${diffDays} 天前`
  return date.toLocaleDateString("zh-CN")
}

function maskPhone(phone: string): string {
  if (phone.length !== 11) return phone
  return `${phone.slice(0, 3)}****${phone.slice(7)}`
}

function getInitials(name: string): string {
  return name.slice(0, 1)
}

export function PatientHeader({
  patient,
  loading = false,
  onEdit,
  onDelete,
  onExport,
  onPrint,
}: PatientHeaderProps) {
  const visibleDiagnoses = patient.diagnosis.slice(0, 3)
  const hiddenDiagnosesCount = patient.diagnosis.length - visibleDiagnoses.length

  if (loading) {
    return (
      <Card>
        <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="size-16 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-56" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-20" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4">
          <Avatar size="lg" className="size-16 text-[length:var(--text-2xl)]">
            <AvatarImage src={patient.avatarUrl} alt={patient.name} />
            <AvatarFallback className="bg-[var(--color-primary-100)] text-[var(--color-primary-700)]">
              {getInitials(patient.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-[length:var(--text-2xl)] font-semibold text-[var(--color-text-primary)]">
                {patient.name}
              </h2>
              <span className="text-[length:var(--text-sm)] text-[var(--color-text-tertiary)]">
                {patient.gender} · {patient.age}岁
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {visibleDiagnoses.map((diagnosis) => (
                <Badge key={diagnosis} variant="secondary">
                  {diagnosis}
                </Badge>
              ))}
              {hiddenDiagnosesCount > 0 && (
                <Badge variant="secondary">+{hiddenDiagnosesCount}</Badge>
              )}
              <RiskBadge level={patient.riskLevel} size="sm" />
            </div>

            <div className="flex flex-wrap items-center gap-4 text-[length:var(--text-sm)] text-[var(--color-text-tertiary)]">
              <span className="inline-flex items-center gap-1">
                <Phone className="size-3.5" aria-hidden="true" />
                {maskPhone(patient.phone)}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="size-3.5" aria-hidden="true" />
                最近更新：{formatRelativeTime(patient.lastUpdated)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          <Button variant="secondary" size="sm" onClick={onEdit}>
            <Pencil data-icon="inline-start" />
            编辑资料
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="sm">
                  更多
                  <ChevronDown data-icon="inline-end" />
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={onExport}>
                <FileDown className="size-4" aria-hidden="true" />
                导出
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onPrint}>
                <Printer className="size-4" aria-hidden="true" />
                打印
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={onDelete}>
                <Trash2 className="size-4" aria-hidden="true" />
                删除
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}
