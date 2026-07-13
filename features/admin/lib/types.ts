export type AdminModule =
  | "users"
  | "roles"
  | "permissions"
  | "ai-config"
  | "prompts"
  | "knowledge"
  | "audit"

export interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  department: string
  status: "active" | "inactive" | "pending"
  lastLoginAt: string
  phone?: string
}

export interface AdminRole {
  id: string
  name: string
  description: string
  userCount: number
  createdAt: string
}

export interface PermissionNode {
  id: string
  name: string
  children?: PermissionNode[]
}

export interface AdminPrompt {
  id: string
  name: string
  scenario: string
  version: string
  status: "draft" | "published"
  updatedAt: string
  content: string
}

export interface KnowledgeDoc {
  id: string
  name: string
  type: string
  chunkCount: number
  status: "parsed" | "parsing" | "failed"
  updatedAt: string
}

export interface AuditLog {
  id: string
  time: string
  user: string
  operation: string
  object: string
  ip: string
  result: "success" | "failure"
}

export const MODULE_ITEMS: { id: AdminModule; label: string }[] = [
  { id: "users", label: "用户管理" },
  { id: "roles", label: "角色管理" },
  { id: "permissions", label: "权限管理" },
  { id: "ai-config", label: "AI 配置" },
  { id: "prompts", label: "Prompt 管理" },
  { id: "knowledge", label: "知识库" },
  { id: "audit", label: "审计日志" },
]
