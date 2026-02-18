"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { FeedProblemCard } from "@/components/feed-problem-card"
import { FeedSections } from "@/components/feed-sections"
import { useFeedFilters } from "@/contexts/feed-filter-context"
import { useSavedProblems } from "@/hooks/use-saved-problems"
import { useAuth } from "@/contexts/auth-context"
import { Loader2, Search } from "lucide-react"
import { LoginPromptModal } from "@/components/login-prompt-modal"
import { getTimeAgo, getCategoryColor } from "@/lib/formatters"
import { Button } from "@/components/ui/button"
import type { SearchProblemResult } from "@/types/problem"

const PAGE_SIZE = 50

// Transform API response to feed format
function transformProblem(problem: SearchProblemResult) {
  const author = problem.author || { name: "Anonymous", isAnonymous: true }

  return {
    id: problem.id,
    title: problem.title,
    description: problem.description || problem.elevatorPitch,
    category: problem.category,
    categoryColor: getCategoryColor(problem.category),
    upvotes: problem.upvotes || 0,
    comments: problem.comments || problem.commentCount || 0,
    building: problem.building || problem.builderCount || 0,
    investors: problem.investors || problem.investorCount || 0,
    author: {
      name: author.name,
      isAnonymous: author.isAnonymous || false,
      isYC: author.isYC || problem.isYCRFS || false,
      isWeekendFund: author.isWeekendFund || problem.isWeekendFundRFS || false,
      isConviction: author.isConviction || problem.isConviction || false,
      isARK: author.isARK || problem.isARK || false,
      isPathlight: author.isPathlight || problem.isPathlight || false,
      isAccel: author.isAccel || problem.isAccel || false,
    },
    timeAgo: getTimeAgo(problem.createdAt),
    createdAt: new Date(problem.createdAt),
    isYCRFS: problem.isYCRFS || author.isYC || false,
    ycQuarter: problem.ycQuarter,
    isWeekendFundRFS: problem.isWeekendFundRFS || author.isWeekendFund || false,
    wfPublishedDate: problem.wfPublishedDate,
    isConviction: problem.isConviction || author.isConviction || false,
    convictionPublishedDate: problem.convictionPublishedDate,
    isARK: problem.isARK || author.isARK || false,
    arkPublishedDate: problem.arkPublishedDate,
    isPathlight: problem.isPathlight || author.isPathlight || false,
    pathlightPublishedDate: problem.pathlightPublishedDate,
    isAccel: problem.isAccel || author.isAccel || false,
    accelPublishedDate: problem.accelPublishedDate,
  }
}

export function FeedList() {
  const { activeTab, selectedCategory, sortOption, selectedSource, debouncedSearchQuery, isSearching } = useFeedFilters()
  const { isSaved, toggleSave } = useSavedProblems()
  const { isAuthenticated } = useAuth()

  const [problems, setProblems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [searchResultCount, setSearchResultCount] = useState<number | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [sectionsData, setSectionsData] = useState<{
    trending: any[]
    recentlyAdded: any[]
    popular: any[]
    categoryGroups: Array<{ category: string; problems: any[] }>
  } | null>(null)
  const requestRef = useRef(0)

  // Login prompt modal state
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loginActionDescription, setLoginActionDescription] = useState("")

  // Determine if we're in the default "sections" view (no filters active)
  const isDefaultView = !debouncedSearchQuery
    && selectedCategory === "All Categories"
    && selectedSource === "All Sources"
    && activeTab === "trending"
    && sortOption === "Most upvoted"

  const fetchProblemsPage = useCallback(async (
    nextPage: number,
    append: boolean,
    opts?: { signal?: AbortSignal; requestId?: number },
  ) => {
    try {
      const params = new URLSearchParams({
        category: selectedCategory,
        sort: sortOption,
        source: selectedSource,
        tab: activeTab === "popular" ? "trending" : activeTab,
        limit: String(PAGE_SIZE),
        page: String(nextPage),
      })
      if (debouncedSearchQuery) {
        params.set("q", debouncedSearchQuery)
      }
      const res = await fetch(`/api/problems/search?${params}`, { signal: opts?.signal })
      if (!res.ok) {
        let message = `Search API returned ${res.status}`
        try {
          const errorBody = await res.json()
          if (typeof errorBody?.error === "string") {
            message = errorBody.error
          }
        } catch {
          // ignore non-json error payloads
        }
        throw new Error(message)
      }

      const data = await res.json()
      if (opts?.signal?.aborted) return
      if (typeof opts?.requestId === "number" && opts.requestId !== requestRef.current) return
      const apiProblems = (data.problems || []).map(transformProblem)
      setProblems((prev) => (append ? [...prev, ...apiProblems] : apiProblems))
      const total = Number(data?.pagination?.total || 0)
      setSearchResultCount(debouncedSearchQuery ? total : null)
      setPage(Number(data?.pagination?.page || nextPage))
      setTotalPages(Number(data?.pagination?.pages || 1))
    } catch (error) {
      if ((error as Error)?.name === "AbortError") return
      if (typeof opts?.requestId === "number" && opts.requestId !== requestRef.current) return
      setLoadError(error instanceof Error ? error.message : "Failed to load problems")
      if (!append) {
        setProblems([])
        setSearchResultCount(debouncedSearchQuery ? 0 : null)
      }
    }
  }, [activeTab, debouncedSearchQuery, selectedCategory, selectedSource, sortOption])

  const fetchSections = useCallback(async (opts?: { signal?: AbortSignal; requestId?: number }) => {
    try {
      const params = new URLSearchParams({
        source: selectedSource,
        category: selectedCategory,
      })
      const res = await fetch(`/api/problems/sections?${params}`, { signal: opts?.signal })
      if (!res.ok) {
        let message = `Sections API returned ${res.status}`
        try {
          const errorBody = await res.json()
          if (typeof errorBody?.error === "string") {
            message = errorBody.error
          }
        } catch {
          // ignore non-json error payloads
        }
        throw new Error(message)
      }

      const data = await res.json()
      if (opts?.signal?.aborted) return
      if (typeof opts?.requestId === "number" && opts.requestId !== requestRef.current) return
      setSectionsData(data?.sections || null)
      setProblems([])
      setSearchResultCount(null)
      setPage(1)
      setTotalPages(1)
    } catch (error) {
      if ((error as Error)?.name === "AbortError") return
      if (typeof opts?.requestId === "number" && opts.requestId !== requestRef.current) return
      setLoadError(error instanceof Error ? error.message : "Failed to load browse sections")
      setSectionsData(null)
    }
  }, [selectedSource, selectedCategory])

  // Fetch sections or search results whenever filters change.
  useEffect(() => {
    const requestId = requestRef.current + 1
    requestRef.current = requestId
    const controller = new AbortController()

    const fetchData = async () => {
      setIsLoading(true)
      setLoadError(null)
      if (isDefaultView) {
        await fetchSections({ signal: controller.signal, requestId })
      } else {
        setSectionsData(null)
        await fetchProblemsPage(1, false, { signal: controller.signal, requestId })
      }
      setIsLoading(false)
    }

    void fetchData()

    return () => {
      controller.abort()
    }
  }, [fetchProblemsPage, fetchSections, isDefaultView])

  const hasMore = page < totalPages

  const handleLoadMore = async () => {
    if (!hasMore || isLoadingMore) return
    setIsLoadingMore(true)
    await fetchProblemsPage(page + 1, true)
    setIsLoadingMore(false)
  }

  // Auth check
  const requireAuth = (actionDescription: string): boolean => {
    if (!isAuthenticated) {
      setLoginActionDescription(actionDescription)
      setShowLoginModal(true)
      return false
    }
    return true
  }

  const handleToggleSave = async (problemId: string) => {
    if (!requireAuth("save this problem")) return
    await toggleSave(problemId)
  }

  const handleUpvote = async (problemId: string): Promise<{ hasUpvoted: boolean; upvoteCount: number } | null> => {
    if (!requireAuth("upvote this problem")) return null
    try {
      const res = await fetch(`/api/problems/${problemId}/upvote`, { method: "POST" })
      if (!res.ok) return null
      return await res.json()
    } catch {
      return null
    }
  }

  // Loading state
  if (isLoading || isSearching) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    )
  }

  // Empty state
  if (problems.length === 0 && !isDefaultView) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-8">
        {loadError && (
          <div className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            Could not load the latest problems. {loadError}
          </div>
        )}
        <div className="text-center py-12">
          {debouncedSearchQuery ? (
            <>
              <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No problems found for &quot;{debouncedSearchQuery}&quot;</p>
              <p className="text-sm text-muted-foreground mt-2">Try a different search term or browse all problems.</p>
            </>
          ) : (
            <>
              <p className="text-muted-foreground">No problems found matching your filters.</p>
              <p className="text-sm text-muted-foreground mt-2">Try adjusting your category or sort options.</p>
            </>
          )}
        </div>
      </div>
    )
  }

  // Default view: Sectioned layout
  if (isDefaultView) {
    return (
      <>
        {loadError && (
          <div className="mx-auto max-w-5xl px-6 pt-6">
            <div className="mb-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              Could not load the latest problems. {loadError}
            </div>
          </div>
        )}
        <FeedSections
          problems={problems}
          sectionsData={sectionsData || undefined}
          isSaved={isSaved}
          onToggleSave={handleToggleSave}
          onUpvote={handleUpvote}
        />
        <LoginPromptModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          actionDescription={loginActionDescription}
          returnUrl="/feed"
        />
      </>
    )
  }

  // Filtered view: Flat list of compact cards
  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      {loadError && (
        <div className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          Could not load the latest problems. {loadError}
        </div>
      )}
      {/* Search results header */}
      {debouncedSearchQuery && searchResultCount !== null && (
        <div className="mb-4 text-sm text-muted-foreground">
          {searchResultCount} {searchResultCount === 1 ? "problem" : "problems"} found for &quot;{debouncedSearchQuery}&quot;
        </div>
      )}

      <div className="space-y-3">
        {problems.map((problem) => (
          <FeedProblemCard
            key={problem.id}
            problem={problem}
            isSaved={isSaved(String(problem.id))}
            onToggleSave={() => handleToggleSave(String(problem.id))}
            onUpvote={() => handleUpvote(String(problem.id))}
          />
        ))}
      </div>

      {hasMore && (
        <div className="mt-6 flex justify-center">
          <Button variant="outline" onClick={handleLoadMore} disabled={isLoadingMore}>
            {isLoadingMore ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load more"
            )}
          </Button>
        </div>
      )}

      <LoginPromptModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        actionDescription={loginActionDescription}
        returnUrl="/feed"
      />
    </div>
  )
}
