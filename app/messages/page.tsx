import * as React from "react"

import { AppShell } from "@/components/layout/app-shell"
import { PageHeader } from "@/components/layout/page-header"
import { MessageCenter } from "@/features/messages/components/message-center"

export default function MessagesPage() {
  return (
    <AppShell role="doctor">
      <PageHeader title="消息中心" />
      <React.Suspense
        fallback={
          <div className="flex h-[calc(100vh-var(--layout-header-height)-var(--layout-page-header-height)-40px)] items-center justify-center rounded-xl border border-[var(--color-border-divider)] bg-[var(--color-bg-card)] text-[var(--color-text-tertiary)]">
            加载中...
          </div>
        }
      >
        <MessageCenter />
      </React.Suspense>
    </AppShell>
  )
}
