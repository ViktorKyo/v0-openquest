"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Filter, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface AdminLog {
  id: string
  actionType: string
  targetType: string
  targetId: string
  notes: string | null
  metadata: Record<string, unknown> | null
  createdAt: string
  adminName: string | null
  adminEmail: string | null
  adminRole: string
}

interface PaginationInfo {
  page: number
  limit: number
  total: number
  pages: number
}

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<AdminLog[]>([])
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 50,
    total: 0,
    pages: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [actionTypeFilter, setActionTypeFilter] = useState("all")
  const [daysFilter, setDaysFilter] = useState("30")

  const fetchLogs = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        days: daysFilter,
      })

      if (actionTypeFilter !== "all") {
        params.append("actionType", actionTypeFilter)
      }

      const res = await fetch(`/api/admin/logs?${params}`)
      if (!res.ok) throw new Error("Failed to fetch logs")

      const data = await res.json()
      setLogs(data.logs)
      setPagination(data.pagination)
    } catch (error) {
      console.error("Failed to fetch logs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [pagination.page, actionTypeFilter, daysFilter])

  const getActionBadge = (actionType: string) => {
    const actionConfig: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", label: string }> = {
      login: { variant: "secondary", label: "Login" },
      logout: { variant: "secondary", label: "Logout" },
      approve_problem: { variant: "default", label: "Approved Problem" },
      reject_problem: { variant: "destructive", label: "Rejected Problem" },
      suspend_user: { variant: "destructive", label: "Suspended User" },
      unsuspend_user: { variant: "default", label: "Unsuspended User" },
      ban_user: { variant: "destructive", label: "Banned User" },
      unban_user: { variant: "default", label: "Unbanned User" },
      create_admin: { variant: "default", label: "Created Admin" },
      deactivate_admin: { variant: "destructive", label: "Deactivated Admin" },
    }

    const config = actionConfig[actionType] || { variant: "outline" as const, label: actionType }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold">Activity Log</h1>
        <p className="text-muted-foreground mt-1">
          Track all admin actions and system events
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <Select value={actionTypeFilter} onValueChange={setActionTypeFilter}>
          <SelectTrigger className="w-[200px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="login">Logins</SelectItem>
            <SelectItem value="approve_problem">Problem Approvals</SelectItem>
            <SelectItem value="reject_problem">Problem Rejections</SelectItem>
            <SelectItem value="suspend_user">User Suspensions</SelectItem>
            <SelectItem value="ban_user">User Bans</SelectItem>
          </SelectContent>
        </Select>

        <Select value={daysFilter} onValueChange={setDaysFilter}>
          <SelectTrigger className="w-[200px]">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Last 24 hours</SelectItem>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-lg border"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Admin</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Loading activity logs...
                </TableCell>
              </TableRow>
            ) : logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No logs found
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log) => (
                <TableRow key={log.id} className="hover:bg-secondary/50">
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(log.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>{getActionBadge(log.actionType)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">
                        {log.adminName || log.adminEmail || "Unknown"}
                      </div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {log.adminRole?.replace("_", " ")}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {log.targetType}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <div className="truncate text-sm text-muted-foreground">
                      {log.notes || "-"}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </motion.div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
            {pagination.total} logs
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page === 1}
              onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page === pagination.pages}
              onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
