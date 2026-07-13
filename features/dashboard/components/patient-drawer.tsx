"use client"

import * as React from "react"
import Link from "next/link"
import { Activity, CheckCircle2, MessageSquare, AlertTriangle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import { RiskBadge } from "@/components/common/risk-badge"
import { Separator } from "@/components/ui/separator"
import type { RiskPatient, TimelineEvent } from "../lib/types"
import { formatRelativeTime } from "../lib/format"

interface PatientDrawerProps {
  patient: RiskPatient | null
  events: TimelineEvent[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onMarkHandled: (patient: RiskPatient) => void
}

const eventIcon: Record<TimelineEvent["type"], React.ElementType> = {
  metric: Activity,
  feedback: MessageSquare,
  care: CheckCircle2,
  risk: AlertTriangle,
}

export function PatientDrawer({
  patient,
  events,
  open,
  onOpenChange,
  onMarkHandled,
}: PatientDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        {patient ? (
          <>
            <SheetHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary-100)] text-[length:var(--text-lg)] font-semibold text-[var(--color-primary-700)]">
                  {patient.name.charAt(0)}
                </div>
                <div className="flex flex-col gap-1">
                  <SheetTitle className="text-[length:var(--text-xl)] font-semibold text-[var(--color-text-primary)]">
                    {patient.name}
                  </SheetTitle>
                  <SheetDescription className="text-[length:var(--text-sm)] text-[var(--color-text-tertiary)]">
                    {patient.age} 岁 · {patient.diagnosis}
                  </SheetDescription>
                </div>
              </div>
              <div className="mt-2">
                <RiskBadge level={patient.level} />
              </div>
            </SheetHeader>

            <div className="flex-1 space-y-5 overflow-y-auto px-4 py-2">
              <div>
                <h4 className="mb-3 text-[length:var(--text-sm)] font-semibold text-[var(--color-text-secondary)]">
                  当前风险
                </h4>
                <p className="text-[length:var(--text-base)] text-[var(--color-text-primary)]">
                  {patient.description}
                </p>
                <p className="mt-1 text-[length:var(--text-xs)] text-[var(--color-text-tertiary)]">
                  更新于 {formatRelativeTime(patient.updatedAt)}
                </p>
              </div>

              <Separator className="bg-[var(--color-border-divider)]" />

              <div>
                <h4 className="mb-3 text-[length:var(--text-sm)] font-semibold text-[var(--color-text-secondary)]">
                  最新动态
                </h4>
                <ul className="space-y-3">
                  {events.slice(0, 3).map((event) => {
                    const Icon = eventIcon[event.type]
                    return (
                      <li key={event.id} className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-neutral-100)] text-[var(--color-text-tertiary)]">
                          <Icon className="size-4" aria-hidden="true" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[length:var(--text-sm)] text-[var(--color-text-primary)]">
                            {event.description}
                          </span>
                          <span className="text-[length:var(--text-xs)] text-[var(--color-text-tertiary)]">
                            {formatRelativeTime(event.time)}
                          </span>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>

            <SheetFooter className="flex-col gap-2 sm:flex-col">
              <Button
                className="w-full"
                onClick={() => patient && onMarkHandled(patient)}
              >
                标记已处理
              </Button>
              <Button
                variant="outline"
                className="w-full"
                render={<Link href={`/patients/${patient.id}`} />}
              >
                查看患者详情
              </Button>
            </SheetFooter>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}
