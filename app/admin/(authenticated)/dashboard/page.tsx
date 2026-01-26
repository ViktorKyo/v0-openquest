"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { AlertCircle, Users, FileText, Briefcase } from "lucide-react"
import { StatCard } from "@/components/admin/stat-card"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface DashboardStats {
  stats: {
    totalProblems: number
    pendingProblems: number
    totalUsers: number
    activeBuilders: number
  }
  trends: {
    problems: number
    users: number
  }
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats")
        if (!res.ok) throw new Error("Failed to fetch stats")
        const data = await res.json()
        setStats(data)
      } catch (err) {
        setError("Failed to load dashboard stats")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading dashboard...</div>
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-destructive">{error || "Failed to load stats"}</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your OpenQuest platform
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Problems"
          value={stats.stats.totalProblems.toLocaleString()}
          icon={FileText}
          trend={stats.trends.problems}
          index={0}
        />
        <StatCard
          title="Pending Reviews"
          value={stats.stats.pendingProblems.toLocaleString()}
          icon={AlertCircle}
          index={1}
        />
        <StatCard
          title="Total Users"
          value={stats.stats.totalUsers.toLocaleString()}
          icon={Users}
          trend={stats.trends.users}
          index={2}
        />
        <StatCard
          title="Active Projects"
          value={stats.stats.activeBuilders.toLocaleString()}
          icon={Briefcase}
          index={3}
        />
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href="/admin/problems"
                className="flex items-center gap-3 p-4 rounded-lg border hover:bg-secondary transition-colors"
              >
                <div className="bg-primary/10 p-2 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Review Problems</p>
                  <p className="text-sm text-muted-foreground">
                    {stats.stats.pendingProblems} pending
                  </p>
                </div>
              </a>

              <a
                href="/admin/users"
                className="flex items-center gap-3 p-4 rounded-lg border hover:bg-secondary transition-colors"
              >
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Manage Users</p>
                  <p className="text-sm text-muted-foreground">
                    View and moderate users
                  </p>
                </div>
              </a>

              <a
                href="/admin/analytics"
                className="flex items-center gap-3 p-4 rounded-lg border hover:bg-secondary transition-colors"
              >
                <div className="bg-primary/10 p-2 rounded-lg">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">View Analytics</p>
                  <p className="text-sm text-muted-foreground">
                    Platform insights
                  </p>
                </div>
              </a>

              <a
                href="/admin/logs"
                className="flex items-center gap-3 p-4 rounded-lg border hover:bg-secondary transition-colors"
              >
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Activity Log</p>
                  <p className="text-sm text-muted-foreground">
                    Recent admin actions
                  </p>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
