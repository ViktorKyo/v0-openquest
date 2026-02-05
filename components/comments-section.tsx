"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MessageCircle, ChevronUp, MoreVertical, Pencil, Trash2, Flag, Hammer, DollarSign, UserPlus, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { LoginPromptModal } from "@/components/login-prompt-modal"
import type { Comment, CommentAuthor } from "@/types/comment"
import { getTimeAgo, canEditComment, canDeleteComment, getEditTimeRemaining } from "@/types/comment"

interface CommentsSectionProps {
  problemId: string
  comments: Comment[]
  onAddComment: (content: string, parentId?: string) => Promise<void>
  onEditComment: (commentId: string, content: string) => Promise<void>
  onDeleteComment: (commentId: string) => Promise<void>
  onUpvoteComment: (commentId: string) => Promise<void>
  currentUserId?: string
  returnUrl?: string
}

export function CommentsSection({
  problemId,
  comments,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onUpvoteComment,
  currentUserId,
  returnUrl = "/feed",
}: CommentsSectionProps) {
  const { isAuthenticated } = useAuth()
  const [commentText, setCommentText] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  // Calculate total comments including replies
  const totalComments = comments.reduce(
    (acc, c) => acc + 1 + (c.replies?.length || 0),
    0
  )

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return

    if (!isAuthenticated) {
      setShowLoginPrompt(true)
      return
    }

    setIsSubmitting(true)
    try {
      await onAddComment(commentText.trim())
      setCommentText("")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReplySubmit = async (parentId: string) => {
    if (!replyText.trim()) return

    if (!isAuthenticated) {
      setShowLoginPrompt(true)
      return
    }

    setIsSubmitting(true)
    try {
      await onAddComment(replyText.trim(), parentId)
      setReplyText("")
      setReplyingTo(null)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditSubmit = async (commentId: string) => {
    if (!editText.trim()) return

    setIsSubmitting(true)
    try {
      await onEditComment(commentId, editText.trim())
      setEditingId(null)
      setEditText("")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpvote = async (commentId: string) => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true)
      return
    }
    await onUpvoteComment(commentId)
  }

  const startEdit = (comment: Comment) => {
    setEditingId(comment.id)
    setEditText(comment.content)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            {totalComments > 0 ? `Discussion (${totalComments})` : "Discussion"}
          </CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6 space-y-6">
          {/* Comment Input */}
          <div className="space-y-3">
            {isAuthenticated ? (
              <>
                <Textarea
                  placeholder="Share your thoughts, questions, or insights..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="min-h-24 resize-none"
                  maxLength={2000}
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {commentText.length}/2000
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCommentText("")}
                      disabled={!commentText.trim()}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleCommentSubmit}
                      disabled={!commentText.trim() || isSubmitting}
                    >
                      {isSubmitting ? "Posting..." : "Post Comment"}
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <button
                onClick={() => setShowLoginPrompt(true)}
                className="w-full flex items-center gap-3 rounded-lg border border-dashed p-4 text-left text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors"
              >
                <Lock className="h-5 w-5 shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Sign in to join the discussion</p>
                  <p className="text-sm">Share your thoughts, ask questions, or offer insights</p>
                </div>
              </button>
            )}
          </div>

          <Separator />

          {/* Comments List */}
          {comments.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <p className="text-sm">No comments yet. Be the first to share your thoughts.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {comments.map((comment) => (
                <CommentThread
                  key={comment.id}
                  comment={comment}
                  currentUserId={currentUserId}
                  isAuthenticated={isAuthenticated}
                  replyingTo={replyingTo}
                  setReplyingTo={setReplyingTo}
                  replyText={replyText}
                  setReplyText={setReplyText}
                  editingId={editingId}
                  editText={editText}
                  setEditText={setEditText}
                  isSubmitting={isSubmitting}
                  onReplySubmit={handleReplySubmit}
                  onEditSubmit={handleEditSubmit}
                  onStartEdit={startEdit}
                  onCancelEdit={() => {
                    setEditingId(null)
                    setEditText("")
                  }}
                  onDelete={onDeleteComment}
                  onUpvote={handleUpvote}
                  onAuthRequired={() => setShowLoginPrompt(true)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <LoginPromptModal
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        actionDescription="join the discussion"
        returnUrl={returnUrl}
      />
    </>
  )
}

// Individual comment with replies
interface CommentThreadProps {
  comment: Comment
  currentUserId?: string
  isAuthenticated: boolean
  replyingTo: string | null
  setReplyingTo: (id: string | null) => void
  replyText: string
  setReplyText: (text: string) => void
  editingId: string | null
  editText: string
  setEditText: (text: string) => void
  isSubmitting: boolean
  onReplySubmit: (parentId: string) => Promise<void>
  onEditSubmit: (commentId: string) => Promise<void>
  onStartEdit: (comment: Comment) => void
  onCancelEdit: () => void
  onDelete: (commentId: string) => Promise<void>
  onUpvote: (commentId: string) => Promise<void>
  onAuthRequired: () => void
  depth?: number
}

function CommentThread({
  comment,
  currentUserId,
  isAuthenticated,
  replyingTo,
  setReplyingTo,
  replyText,
  setReplyText,
  editingId,
  editText,
  setEditText,
  isSubmitting,
  onReplySubmit,
  onEditSubmit,
  onStartEdit,
  onCancelEdit,
  onDelete,
  onUpvote,
  onAuthRequired,
  depth = 0,
}: CommentThreadProps) {
  const isEditing = editingId === comment.id
  const isReplying = replyingTo === comment.id
  const canEdit = canEditComment(comment, currentUserId)
  const canDelete = canDeleteComment(comment, currentUserId)
  const editTimeRemaining = getEditTimeRemaining(comment.createdAt)
  const isAuthor = comment.author.id === currentUserId

  // Engagement badges
  const badges = comment.author.engagement

  return (
    <div className="space-y-4">
      {/* Main Comment */}
      <div className="flex gap-3">
        <Avatar className="size-8 shrink-0">
          <AvatarImage src={comment.author.avatarUrl || "/placeholder.svg"} />
          <AvatarFallback className="text-xs">
            {comment.author.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0 space-y-2">
          {/* Author line with badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm">{comment.author.name}</span>

            {/* Engagement badges */}
            {badges?.isProblemAuthor && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400">
                Author
              </span>
            )}
            {badges?.isBuilder && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Hammer className="h-2.5 w-2.5" />
                Building
              </span>
            )}
            {badges?.isInvestor && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
                <DollarSign className="h-2.5 w-2.5" />
                Investor
              </span>
            )}
            {badges?.isTeamApplicant && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <UserPlus className="h-2.5 w-2.5" />
                Team
              </span>
            )}

            <span className="text-xs text-muted-foreground">{getTimeAgo(comment.createdAt)}</span>
            {comment.updatedAt && (
              <span className="text-xs text-muted-foreground">(edited)</span>
            )}
          </div>

          {/* Content or Edit form */}
          {isEditing ? (
            <div className="space-y-2">
              <Textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="min-h-20 resize-none"
                maxLength={2000}
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {editText.length}/2000
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={onCancelEdit}>
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onEditSubmit(comment.id)}
                    disabled={!editText.trim() || isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save"}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {comment.isDeleted ? (
                <span className="italic">[Comment deleted]</span>
              ) : (
                comment.content
              )}
            </p>
          )}

          {/* Actions */}
          {!comment.isDeleted && !isEditing && (
            <div className="flex items-center gap-4 text-sm">
              {/* Upvote */}
              <button
                onClick={() => onUpvote(comment.id)}
                className={cn(
                  "flex items-center gap-1.5 transition-colors",
                  comment.hasUpvoted
                    ? "text-orange-500"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <ChevronUp className={cn("h-4 w-4", comment.hasUpvoted && "fill-current")} />
                <span>{comment.upvotes}</span>
              </button>

              {/* Reply */}
              {depth < 2 && ( // Limit nesting to 2 levels
                <button
                  onClick={() => {
                    if (!isAuthenticated) {
                      onAuthRequired()
                      return
                    }
                    setReplyingTo(isReplying ? null : comment.id)
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Reply
                </button>
              )}

              {/* Edit time remaining indicator */}
              {isAuthor && canEdit && editTimeRemaining && (
                <span className="text-xs text-muted-foreground">
                  {editTimeRemaining}
                </span>
              )}

              {/* More actions */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {isAuthor && canEdit && (
                    <DropdownMenuItem onClick={() => onStartEdit(comment)}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                  )}
                  {isAuthor && canDelete && (
                    <DropdownMenuItem
                      onClick={() => onDelete(comment.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>
                    <Flag className="h-4 w-4 mr-2" />
                    Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {/* Reply Input */}
          {isReplying && (
            <div className="space-y-2 pt-2">
              <Textarea
                placeholder="Write a reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="min-h-20 resize-none"
                maxLength={2000}
                autoFocus
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {replyText.length}/2000
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setReplyingTo(null)
                      setReplyText("")
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onReplySubmit(comment.id)}
                    disabled={!replyText.trim() || isSubmitting}
                  >
                    {isSubmitting ? "Posting..." : "Reply"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-11 space-y-4 border-l-2 border-border/50 pl-4">
          {comment.replies.map((reply) => (
            <CommentThread
              key={reply.id}
              comment={reply}
              currentUserId={currentUserId}
              isAuthenticated={isAuthenticated}
              replyingTo={replyingTo}
              setReplyingTo={setReplyingTo}
              replyText={replyText}
              setReplyText={setReplyText}
              editingId={editingId}
              editText={editText}
              setEditText={setEditText}
              isSubmitting={isSubmitting}
              onReplySubmit={onReplySubmit}
              onEditSubmit={onEditSubmit}
              onStartEdit={onStartEdit}
              onCancelEdit={onCancelEdit}
              onDelete={onDelete}
              onUpvote={onUpvote}
              onAuthRequired={onAuthRequired}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

