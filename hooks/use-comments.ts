"use client"

import { useState, useCallback, useEffect } from "react"
import type { Comment } from "@/types/comment"

interface UseCommentsOptions {
  problemId: string
  initialComments?: Comment[]
}

interface UseCommentsReturn {
  comments: Comment[]
  isLoading: boolean
  error: string | null
  addComment: (content: string, parentId?: string) => Promise<void>
  editComment: (commentId: string, content: string) => Promise<void>
  deleteComment: (commentId: string) => Promise<void>
  upvoteComment: (commentId: string) => Promise<void>
  refreshComments: () => Promise<void>
}

export function useComments({ problemId, initialComments = [] }: UseCommentsOptions): UseCommentsReturn {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchComments = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/problems/${problemId}/comments`)
      if (!res.ok) {
        throw new Error("Failed to fetch comments")
      }
      const data = await res.json()
      setComments(data.comments)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch comments")
    } finally {
      setIsLoading(false)
    }
  }, [problemId])

  // Fetch comments on mount if no initial comments provided
  useEffect(() => {
    if (initialComments.length === 0) {
      fetchComments()
    }
  }, [fetchComments, initialComments.length])

  const addComment = useCallback(async (content: string, parentId?: string) => {
    const res = await fetch(`/api/problems/${problemId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, parentId }),
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error || "Failed to add comment")
    }

    const data = await res.json()
    const newComment = data.comment

    setComments(prev => {
      if (!parentId) {
        // Add top-level comment at the beginning
        return [newComment, ...prev]
      }

      // Add reply to parent
      return prev.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newComment],
          }
        }
        // Check nested replies (one level deep)
        if (comment.replies) {
          const updatedReplies = comment.replies.map(reply => {
            if (reply.id === parentId) {
              return {
                ...reply,
                replies: [...(reply.replies || []), newComment],
              }
            }
            return reply
          })
          return { ...comment, replies: updatedReplies }
        }
        return comment
      })
    })
  }, [problemId])

  const editComment = useCallback(async (commentId: string, content: string) => {
    const res = await fetch(`/api/comments/${commentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error || "Failed to edit comment")
    }

    const data = await res.json()

    // Update comment in state
    const updateCommentInList = (list: Comment[]): Comment[] => {
      return list.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            content: data.comment.content,
            updatedAt: new Date(data.comment.updatedAt),
          }
        }
        if (comment.replies) {
          return {
            ...comment,
            replies: updateCommentInList(comment.replies),
          }
        }
        return comment
      })
    }

    setComments(prev => updateCommentInList(prev))
  }, [])

  const deleteComment = useCallback(async (commentId: string) => {
    const res = await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error || "Failed to delete comment")
    }

    // Mark comment as deleted in state
    const markDeleted = (list: Comment[]): Comment[] => {
      return list.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isDeleted: true,
            content: "[deleted]",
          }
        }
        if (comment.replies) {
          return {
            ...comment,
            replies: markDeleted(comment.replies),
          }
        }
        return comment
      })
    }

    setComments(prev => markDeleted(prev))
  }, [])

  const upvoteComment = useCallback(async (commentId: string) => {
    const res = await fetch(`/api/comments/${commentId}/upvote`, {
      method: "POST",
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error || "Failed to upvote comment")
    }

    const data = await res.json()

    // Update upvote state
    const updateUpvote = (list: Comment[]): Comment[] => {
      return list.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            hasUpvoted: data.hasUpvoted,
            upvotes: data.upvotes,
          }
        }
        if (comment.replies) {
          return {
            ...comment,
            replies: updateUpvote(comment.replies),
          }
        }
        return comment
      })
    }

    setComments(prev => updateUpvote(prev))
  }, [])

  return {
    comments,
    isLoading,
    error,
    addComment,
    editComment,
    deleteComment,
    upvoteComment,
    refreshComments: fetchComments,
  }
}
