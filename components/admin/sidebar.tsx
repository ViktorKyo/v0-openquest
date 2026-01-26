"use client"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  AlertCircle,
  Users,
  BarChart,
  FileText,
  Settings,
  LogOut,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AdminSession {
  adminDbId: string
  adminId: string
  name: string | null
  email: string | null
  role: "super_admin" | "moderator" | "analyst"
}

interface SidebarProps {
  session: AdminSession
}

const menuItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    roles: ["super_admin", "moderator", "analyst"],
  },
  {
    label: "Problems",
    href: "/admin/problems",
    icon: AlertCircle,
    roles: ["super_admin", "moderator"],
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
    roles: ["super_admin", "moderator"],
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: BarChart,
    roles: ["super_admin", "moderator", "analyst"],
  },
  {
    label: "Activity Log",
    href: "/admin/logs",
    icon: FileText,
    roles: ["super_admin", "moderator", "analyst"],
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
    roles: ["super_admin"],
  },
]

export function Sidebar({ session }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" })
      router.push("/admin/login")
      router.refresh()
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const visibleMenuItems = menuItems.filter((item) =>
    item.roles.includes(session.role)
  )

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-card">
      {/* Header */}
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <div className="bg-primary/10 p-2 rounded-lg">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-bold text-lg">OpenQuest</h1>
          <p className="text-xs text-muted-foreground">Admin Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {visibleMenuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="border-t p-4 space-y-3">
        <div className="px-3 py-2 rounded-lg bg-secondary/50">
          <p className="text-xs font-medium text-muted-foreground">Signed in as</p>
          <p className="text-sm font-semibold truncate">
            {session.name || session.email || "Admin"}
          </p>
          <p className="text-xs text-muted-foreground capitalize">
            {session.role.replace("_", " ")}
          </p>
        </div>

        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
