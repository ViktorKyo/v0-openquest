"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Eye, EyeOff, Trash2, ExternalLink } from "lucide-react"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface Comment {
  id: string
  content: string
  createdAt: string
  updatedAt: string | null
  upvotes: number
  isHidden: boolean
  hiddenReason: string | null
  problemId: string
  authorId: string
  authorName: string | null
  authorEmail: string | null
  problemTitle: string | null
}

interface PaginationInfo {
  page: number
  limit: number
  total: number
  pages: number
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([])
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  // Moderation modal state
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [moderationAction, setModerationAction] = useState<"hide" | "unhide" | "delete" | null>(null)
  const [moderationReason, setModerationReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchComments = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        sortBy,
        sortOrder,
      })

      if (filter !== "all") {
        params.append("filter", filter)
      }

      if (searchQuery) {
        params.append("search", searchQuery)
      }

      const res = await fetch(`/api/admin/comments?${params}`)
      if (!res.ok) throw new Error("Failed to fetch comments")

      const data = await res.json()
      setComments(data.comments)
      setPagination(data.pagination)
    } catch (error) {
      console.error("Failed to fetch comments:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [pagination.page, filter, sortBy, sortOrder])

  const handleSearch = () => {
    setPagination({ ...pagination, page: 1 })
    fetchComments()
  }

  const handleModerate = async () => {
    if (!selectedComment || !moderationAction) return

    setIsSubmitting(true)
    try {
      const res = await fetch(`/api/admin/comments/${selectedComment.id}/moderate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: moderationAction,
          reason: moderationReason,
        }),
      })

      if (!res.ok) throw new Error("Failed to moderate comment")

      // Refresh the list
      await fetchComments()

      // Close modal
      setSelectedComment(null)
      setModerationAction(null)
      setModerationReason("")
    } catch (error) {
      console.error("Moderation failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const openModerationModal = (comment: Comment, action: "hide" | "unhide" | "delete") => {
    setSelectedComment(comment)
    setModerationAction(action)
    setModerationReason("")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold">Comments</h1>
        <p className="text-muted-foreground mt-1">
          Moderate and manage user comments
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex-1 flex gap-2">
          <Input
            placeholder="Search comments, authors, or problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="max-w-md"
          />
          <Button variant="outline" onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="visible">Visible</SelectItem>
              <SelectItem value="hidden">Hidden</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Date</SelectItem>
              <SelectItem value="upvotes">Upvotes</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
          >
            {sortOrder === "desc" ? "↓" : "↑"}
          </Button>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="border rounded-lg"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Comment</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Problem</TableHead>
              <TableHead className="text-center">Upvotes</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  Loading comments...
                </TableCell>
              </TableRow>
            ) : comments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No comments found
                </TableCell>
              </TableRow>
            ) : (
              comments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell className="max-w-[300px]">
                    <p className="text-sm truncate" title={comment.content}>
                      {truncateText(comment.content, 80)}
                    </p>
                    {comment.hiddenReason && (
                      <p className="text-xs text-destructive mt-1">
                        Hidden: {comment.hiddenReason}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{comment.authorName || "Unknown"}</p>
                      <p className="text-xs text-muted-foreground">{comment.authorEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px]">
                    <a
                      href={`/problem/${comment.problemId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      {truncateText(comment.problemTitle || "Unknown", 30)}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm">{comment.upvotes}</span>
                  </TableCell>
                  <TableCell>
                    {comment.isHidden ? (
                      <Badge variant="destructive">Hidden</Badge>
                    ) : (
                      <Badge variant="secondary">Visible</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(comment.createdAt)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      {comment.isHidden ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openModerationModal(comment, "unhide")}
                          title="Unhide comment"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openModerationModal(comment, "hide")}
                          title="Hide comment"
                        >
                          <EyeOff className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openModerationModal(comment, "delete")}
                        className="text-destructive hover:text-destructive"
                        title="Delete comment"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={pagination.page === 1}
            onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
          >
            Previous
          </Button>
          <span className="flex items-center text-sm text-muted-foreground">
            Page {pagination.page} of {pagination.pages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={pagination.page === pagination.pages}
            onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
          >
            Next
          </Button>
        </div>
      )}

      {/* Moderation Modal */}
      <Dialog
        open={!!selectedComment && !!moderationAction}
        onOpenChange={() => {
          setSelectedComment(null)
          setModerationAction(null)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {moderationAction === "hide" && "Hide Comment"}
              {moderationAction === "unhide" && "Unhide Comment"}
              {moderationAction === "delete" && "Delete Comment"}
            </DialogTitle>
            <DialogDescription>
              {moderationAction === "hide" &&
                "This comment will be hidden from public view but can be restored later."}
              {moderationAction === "unhide" &&
                "This comment will become visible to all users again."}
              {moderationAction === "delete" &&
                "This action cannot be undone. The comment will be permanently removed."}
            </DialogDescription>
          </DialogHeader>

          {selectedComment && (
            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-3">
                <p className="text-sm">{selectedComment.content}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  By {selectedComment.authorName || "Unknown"} · {formatDate(selectedComment.createdAt)}
                </p>
              </div>

              {(moderationAction === "hide" || moderationAction === "delete") && (
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason (optional)</Label>
                  <Textarea
                    id="reason"
                    placeholder="Why are you taking this action?"
                    value={moderationReason}
                    onChange={(e) => setModerationReason(e.target.value)}
                  />
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedComment(null)
                setModerationAction(null)
              }}
            >
              Cancel
            </Button>
            <Button
              variant={moderationAction === "delete" ? "destructive" : "default"}
              onClick={handleModerate}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
