"use client";

import * as React from "react";
import Link from "next/link";
import { HeartPulse, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/lib/auth/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [remember, setRemember] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("请填写邮箱和密码");
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "登录失败");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[var(--color-bg-page)] px-4 py-12">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-gradient-shift absolute -left-[20%] -top-[20%] h-[70vh] w-[70vh] rounded-full bg-primary-100/50 blur-[100px]" />
        <div className="animate-gradient-shift absolute -bottom-[20%] -right-[20%] h-[60vh] w-[60vh] rounded-full bg-teal-50/70 blur-[100px]" style={{ animationDelay: '-10s' }} />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border-default) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border-default) 1px, transparent 1px)",
          backgroundSize: "3rem 3rem",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 50%, #000 60%, transparent 100%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[400px]">
        <div className="animate-fade-in-up text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600 text-white shadow-lg shadow-primary-600/15">
            <HeartPulse className="h-6 w-6" />
          </div>
          <h1 className="text-[28px] font-semibold tracking-tight text-[var(--color-text-primary)]">
            Doctor Copilot
          </h1>
          <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-text-tertiary)]">
            登录您的账户，开始智能医疗辅助之旅
          </p>
        </div>

        <div
          className="animate-fade-in-up mt-8 rounded-2xl border border-[var(--color-border-default)] bg-white/85 p-8 shadow-[var(--shadow-xl)] backdrop-blur-md"
          style={{ animationDelay: "80ms" }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-[var(--color-text-secondary)]">
                邮箱地址
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@hospital.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-lg border-[var(--color-border-default)] bg-[var(--color-bg-page)] pl-10 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] focus:border-primary-500 focus:ring-primary-500/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-[var(--color-text-secondary)]">
                密码
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="请输入密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 rounded-lg border-[var(--color-border-default)] bg-[var(--color-bg-page)] pl-10 pr-10 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] focus:border-primary-500 focus:ring-primary-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] transition-colors hover:text-[var(--color-text-primary)]"
                  aria-label={showPassword ? "隐藏密码" : "显示密码"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(checked) => setRemember(checked === true)}
                  className="border-[var(--color-border-default)] data-[state=checked]:border-primary-600 data-[state=checked]:bg-primary-600"
                />
                <Label
                  htmlFor="remember"
                  className="cursor-pointer text-sm font-normal text-[var(--color-text-secondary)]"
                >
                  记住我
                </Label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-primary-600 transition-colors hover:text-primary-700"
              >
                忘记密码？
              </Link>
            </div>

            <Button
              type="submit"
              className="h-11 w-full rounded-lg bg-primary-600 text-sm font-semibold text-white shadow-md shadow-primary-600/15 transition-all hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/20 active:scale-[0.98] disabled:opacity-70"
              disabled={isLoading || isSubmitting}
            >
              {isSubmitting ? "登录中..." : "登录"}
            </Button>
          </form>
        </div>

        <p
          className="animate-fade-in-up mt-6 text-center text-sm text-[var(--color-text-tertiary)]"
          style={{ animationDelay: "160ms" }}
        >
          还没有账户？{" "}
          <Link
            href="/register"
            className="font-medium text-primary-600 transition-colors hover:text-primary-700"
          >
            立即注册
          </Link>
        </p>
      </div>
    </div>
  );
}
