// Comment types for the discussion system

export interface CommentAuthor {
  id: string
  name: string
  avatarUrl?: string
  // Engagement badges for this problem
  engagement?: {
    isBuilder?: boolean
    isInvestor?: boolean
    isTeamApplicant?: boolean
    isProblemAuthor?: boolean
  }
}

export interface Comment {
  id: string
  problemId: string
  author: CommentAuthor
  content: string
  upvotes: number
  createdAt: Date
  updatedAt?: Date
  isDeleted: boolean

  // For the current user
  hasUpvoted?: boolean
  canEdit?: boolean // true if within 2-hour window and is author
  canDelete?: boolean // true if no replies and is author

  // Replies (nested comments)
  replies?: Comment[]
  replyCount?: number
}

export interface CommentFormData {
  content: string
  parentId?: string // If replying to a comment
}

// 2-hour edit window
export const EDIT_WINDOW_MS = 2 * 60 * 60 * 1000 // 2 hours

export function canEditComment(comment: Comment, currentUserId?: string): boolean {
  if (!currentUserId) return false
  if (comment.author.id !== currentUserId) return false

  const createdAt = new Date(comment.createdAt).getTime()
  const now = Date.now()
  return now - createdAt < EDIT_WINDOW_MS
}

export function canDeleteComment(comment: Comment, currentUserId?: string): boolean {
  if (!currentUserId) return false
  if (comment.author.id !== currentUserId) return false

  // Can only delete if no replies
  return !comment.replies || comment.replies.length === 0
}

export function getTimeAgo(date: Date): string {
  const now = new Date()
  const seconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000)

  if (seconds < 60) return "just now"
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return `${Math.floor(seconds / 604800)}w ago`
}

export function getEditTimeRemaining(createdAt: Date): string | null {
  const elapsed = Date.now() - new Date(createdAt).getTime()
  const remaining = EDIT_WINDOW_MS - elapsed

  if (remaining <= 0) return null

  const minutes = Math.floor(remaining / (60 * 1000))
  if (minutes < 60) return `${minutes}m left to edit`
  const hours = Math.floor(minutes / 60)
  return `${hours}h ${minutes % 60}m left to edit`
}
