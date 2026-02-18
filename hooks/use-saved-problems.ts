"use client"

import { useState, useEffect, useCallback } from "react"
import { useAuth } from "@/contexts/auth-context"

interface UseSavedProblemsReturn {
  savedProblemIds: Set<string>
  isLoading: boolean
  toggleSave: (problemId: string) => Promise<boolean>
  isSaved: (problemId: string) => boolean
  refreshSaved: () => Promise<void>
}

export function useSavedProblems(): UseSavedProblemsReturn {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const [savedProblemIds, setSavedProblemIds] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(false)

  // Fetch saved problem IDs on mount if authenticated
  const refreshSaved = useCallback(async () => {
    if (!isAuthenticated) {
      setSavedProblemIds(new Set())
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch("/api/user/saved-problems", { method: "POST" })
      if (res.ok) {
        const data = await res.json()
        setSavedProblemIds(new Set(data.savedIds || []))
      }
    } catch (error) {
      console.error("Error fetching saved problems:", error)
    } finally {
      setIsLoading(false)
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (!authLoading) {
      refreshSaved()
    }
  }, [authLoading, refreshSaved])

  // Toggle save with optimistic update
  const toggleSave = useCallback(async (problemId: string): Promise<boolean> => {
    if (!isAuthenticated) {
      return false // Caller should handle showing login prompt
    }

    const wasSaved = savedProblemIds.has(problemId)

    // Optimistic update
    setSavedProblemIds((prev) => {
      const newSet = new Set(prev)
      if (wasSaved) {
        newSet.delete(problemId)
      } else {
        newSet.add(problemId)
      }
      return newSet
    })

    try {
      const res = await fetch(`/api/problems/${problemId}/save`, { method: "POST" })
      if (!res.ok) {
        throw new Error("Failed to toggle save")
      }
      const data = await res.json()
      return data.isSaved
    } catch (error) {
      // Rollback on error
      setSavedProblemIds((prev) => {
        const newSet = new Set(prev)
        if (wasSaved) {
          newSet.add(problemId)
        } else {
          newSet.delete(problemId)
        }
        return newSet
      })
      console.error("Error toggling save:", error)
      return wasSaved
    }
  }, [isAuthenticated, savedProblemIds])

  const isSaved = useCallback((problemId: string): boolean => {
    return savedProblemIds.has(problemId)
  }, [savedProblemIds])

  return {
    savedProblemIds,
    isLoading,
    toggleSave,
    isSaved,
    refreshSaved,
  }
}
