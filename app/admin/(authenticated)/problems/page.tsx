"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Filter, ArrowUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
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
import { ModerationModal } from "@/components/admin/moderation-modal"

interface Problem {
  id: string
  title: string
  elevatorPitch: string
  category: string
  status: string
  upvotes: number
  commentCount: number
  createdAt: string
  authorId: string
  authorName: string | null
  authorEmail: string | null
}

interface PaginationInfo {
  page: number
  limit: number
  total: number
  pages: number
}

export default function AdminProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([])
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchProblems = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        sortBy,
        sortOrder,
      })

      if (statusFilter !== "all") {
        params.append("status", statusFilter)
      }

      if (searchQuery) {
        params.append("search", searchQuery)
      }

      const res = await fetch(`/api/admin/problems?${params}`)
      if (!res.ok) throw new Error("Failed to fetch problems")

      const data = await res.json()
      setProblems(data.problems)
      setPagination(data.pagination)
    } catch (error) {
      console.error("Failed to fetch problems:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProblems()
  }, [pagination.page, statusFilter, sortBy, sortOrder])

  const handleSearch = () => {
    setPagination({ ...pagination, page: 1 })
    fetchProblems()
  }

  const handleModerate = async (
    problemId: string,
    action: "approve" | "reject",
    notes?: string
  ) => {
    const res = await fetch(`/api/admin/problems/${problemId}/moderate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, notes }),
    })

    if (!res.ok) throw new Error("Moderation failed")

    // Refresh the list
    fetchProblems()
  }

  const openModal = (problem: Problem) => {
    setSelectedProblem(problem)
    setIsModalOpen(true)
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending_review: "secondary",
      approved: "default",
      rejected: "destructive",
      looking_for_builders: "outline",
      in_progress: "outline",
      completed: "outline",
    }

    return (
      <Badge variant={variants[status] || "secondary"}>
        {status.replace(/_/g, " ")}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold">Problems Management</h1>
        <p className="text-muted-foreground mt-1">
          Review and moderate user-submitted problems
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="flex-1 flex gap-2">
          <Input
            placeholder="Search problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="max-w-md"
          />
          <Button onClick={handleSearch} variant="secondary">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending_review">Pending Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="looking_for_builders">Looking for Builders</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt">Date Created</SelectItem>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="upvotes">Upvotes</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          {sortOrder === "asc" ? "↑" : "↓"}
        </Button>
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
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Upvotes</TableHead>
              <TableHead className="text-center">Comments</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  Loading problems...
                </TableCell>
              </TableRow>
            ) : problems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No problems found
                </TableCell>
              </TableRow>
            ) : (
              problems.map((problem) => (
                <TableRow
                  key={problem.id}
                  className="cursor-pointer hover:bg-secondary/50"
                  onClick={() => openModal(problem)}
                >
                  <TableCell className="font-medium max-w-md">
                    <div className="truncate">{problem.title}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {problem.elevatorPitch}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{problem.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {problem.authorName || problem.authorEmail || "Unknown"}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(problem.status)}</TableCell>
                  <TableCell className="text-center">{problem.upvotes}</TableCell>
                  <TableCell className="text-center">
                    <span className="text-muted-foreground">{problem.commentCount}</span>
                  </TableCell>
                  <TableCell>
                    {new Date(problem.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openModal(problem)}
                    >
                      {problem.status === "pending_review" ? "Review" : "View"}
                    </Button>
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
            {pagination.total} problems
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

      {/* Moderation Modal */}
      <ModerationModal
        problem={selectedProblem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onModerate={handleModerate}
      />
    </div>
  )
}
