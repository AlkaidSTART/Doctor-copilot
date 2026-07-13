import type { Metadata } from "next";
import "./globals.css";
import { ClientProviders } from "@/components/providers/client-providers";

export const metadata: Metadata = {
  title: "Doctor Copilot",
  description: "AI-powered healthcare assistant platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased" suppressHydrationWarning>
      <body
        className="min-h-full flex flex-col bg-[var(--color-bg-page)] text-[var(--color-text-primary)]"
      >
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}