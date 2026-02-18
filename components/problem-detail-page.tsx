"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ChevronUp, Loader2, Compass, Plus, User as UserIcon, LogIn } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CommentsSection } from "@/components/comments-section"
import { useComments } from "@/hooks/use-comments"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { AuthorIntentTags } from "@/components/author-intent-tags"
import { GetInvolvedSection } from "@/components/get-involved-section"
import { InstitutionalAuthor } from "@/components/institutional-author"
import { LoginPromptModal } from "@/components/login-prompt-modal"
import { PendingEngagementModal } from "@/components/pending-engagement-modal"
import { useAuth } from "@/contexts/auth-context"
import {
  getPendingEngagement,
  clearPendingEngagement,
  type PendingEngagement,
  type BuildFormData,
  type InvestFormData,
  type JoinTeamFormData,
} from "@/lib/pending-engagement"
import type { InvestmentTier, InvestmentFocus, EngagementLevel, BuildStatus, BuildStage, LookingFor, RaisingStage, Visibility, RoleInterest } from "@/types/engagement"
import { allProblems } from "@/data/mock-problems"
import ReactMarkdown from "react-markdown"
import { RelatedProblems } from "@/components/related-problems"
import { TweetEmbedsSection } from "@/components/tweet-embeds-section"
import { getTimeAgo, getCategoryColor } from "@/lib/formatters"
import type { BaseProblem, ProblemDetailApiResponse } from "@/types/problem"
import type { AlreadyBuildingSupport } from "@/components/author-intent-tags"
import { useSavedProblems } from "@/hooks/use-saved-problems"

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const ALREADY_BUILDING_SUPPORT_VALUES: ReadonlyArray<AlreadyBuildingSupport> = [
  "awareness",
  "founding-team",
  "cofounder",
  "capital",
]

function normalizeAlreadyBuildingSupport(value: unknown): AlreadyBuildingSupport[] | undefined {
  if (!Array.isArray(value)) return undefined
  return value.filter(
    (item): item is AlreadyBuildingSupport =>
      typeof item === "string" &&
      ALREADY_BUILDING_SUPPORT_VALUES.includes(item as AlreadyBuildingSupport),
  )
}

// Fallback mock data for when problem is not found
const mockProblem = {
  id: 1,
  title: "We need a better way to track carbon emissions for small businesses",
  category: "Climate tech",
  categoryColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  timeAgo: "2h ago",
  author: {
    name: "Sarah Chen",
    avatar: "/diverse-woman-portrait.png",
    isAnonymous: false,
    isYC: false,
    isWeekendFund: false,
  },
  upvotes: 142,
  elevatorPitch:
    "Most carbon tracking tools are built for enterprises with complex supply chains. Small businesses want to be sustainable but can't afford $10k/year software or hire a sustainability consultant.",
  // Author intent fields
  involvement: "already-building" as const,
  alreadyBuildingSupport: ["cofounder", "capital"] as AlreadyBuildingSupport[],
  fullDescription: `## The Problem

Small businesses (5-50 employees) want to track and reduce their carbon footprint, but existing solutions are:

- **Too expensive** - Enterprise tools cost $5k-50k annually
- **Too complex** - Require dedicated sustainability teams
- **Too manual** - Spreadsheet-based approaches are time-consuming

## Who This Affects

- 33M small businesses in the US alone
- Increasing pressure from customers and investors to report emissions
- Many are willing to pay $50-200/month for the right solution

## Potential Impact

If 1% of US small businesses adopted a simple carbon tracking tool at $100/month, that's a $400M annual market while helping reduce millions of tons of CO2.`,
  engagement: {
    building: 0,
    buildingAnonymous: 0,
    investors: 0,
    followers: 0,
    users: [],
  },
  // Institutional source data (not applicable for regular problems)
  isYCRFS: false,
  ycQuarter: undefined as string | undefined,
  isWeekendFundRFS: false,
  wfPublishedDate: undefined as string | undefined,
  isConviction: false,
  convictionPublishedDate: undefined as string | undefined,
  isARK: false,
  arkPublishedDate: undefined as string | undefined,
  isPathlight: false,
  pathlightPublishedDate: undefined as string | undefined,
  isAccel: false,
  accelPublishedDate: undefined as string | undefined,
  tweetUrls: [] as string[],
}

// Helper to transform mock data to expected format
function transformMockData(problemData: typeof allProblems[0]) {
  // Cast to BaseProblem to access VC partner flags
  const p = problemData as BaseProblem
  return {
    id: p.id,
    title: p.title,
    category: p.category,
    categoryColor: getCategoryColor(p.category),
    timeAgo: getTimeAgo(p.createdAt),
    author: {
      name: p.author.username || p.author.name,
      avatar: p.author.avatarUrl || p.author.avatar,
      isAnonymous: p.isAnonymous,
      isYC: p.author.isYC,
      isWeekendFund: p.author.isWeekendFund,
      isConviction: p.author.isConviction,
      isARK: p.author.isARK,
      isPathlight: p.author.isPathlight,
      isAccel: p.author.isAccel,
    },
    upvotes: p.upvotes,
    elevatorPitch: p.elevatorPitch,
    involvement: p.involvement,
    alreadyBuildingSupport: normalizeAlreadyBuildingSupport(p.alreadyBuildingSupport),
    wantBuildBlocker: p.wantBuildBlocker,
    wantToWorkInvolvement: p.wantToWorkInvolvement,
    fullDescription: p.fullDescription || `## The Problem\n\n${p.elevatorPitch}\n\n## Details\n\nThis is a real problem that needs solving.`,
    engagement: {
      building: p.builderCount || 0,
      buildingAnonymous: 0,
      investors: p.investorCount || 0,
      followers: 0,
      users: [],
    },
    isYCRFS: p.isYCRFS,
    ycQuarter: p.ycQuarter,
    isWeekendFundRFS: p.isWeekendFundRFS,
    wfPublishedDate: p.wfPublishedDate,
    isConviction: p.isConviction,
    convictionPublishedDate: p.convictionPublishedDate,
    isARK: p.isARK,
    arkPublishedDate: p.arkPublishedDate,
    isPathlight: p.isPathlight,
    pathlightPublishedDate: p.pathlightPublishedDate,
    isAccel: p.isAccel,
    accelPublishedDate: p.accelPublishedDate,
    tweetUrls: p.tweetUrls || [],
  }
}

// Helper to transform API data to expected format
function transformApiData(apiData: ProblemDetailApiResponse) {
  return {
    id: apiData.id,
    title: apiData.title,
    category: apiData.category,
    categoryColor: getCategoryColor(apiData.category),
    timeAgo: getTimeAgo(new Date(apiData.createdAt)),
    author: {
      name: apiData.author?.name || 'Anonymous',
      avatar: apiData.author?.avatarUrl || '',
      isAnonymous: apiData.author?.isAnonymous || false,
      isYC: apiData.author?.isYC || apiData.isYCRFS || false,
      isWeekendFund: apiData.author?.isWeekendFund || apiData.isWeekendFundRFS || false,
      isConviction: apiData.author?.isConviction || apiData.isConviction || false,
      isARK: apiData.author?.isARK || apiData.isARK || false,
      isPathlight: apiData.author?.isPathlight || apiData.isPathlight || false,
      isAccel: apiData.author?.isAccel || apiData.isAccel || false,
    },
    upvotes: apiData.upvotes || 0,
    elevatorPitch: apiData.elevatorPitch,
    involvement: (apiData.involvement || 'just-sharing') as "already-building" | "just-sharing" | "want-build" | "want-to-work",
    alreadyBuildingSupport: normalizeAlreadyBuildingSupport(apiData.alreadyBuildingSupport),
    wantBuildBlocker: (Array.isArray(apiData.wantBuildBlocker) ? apiData.wantBuildBlocker : []) as Array<"need-capital" | "need-cofounder">,
    wantToWorkInvolvement: (Array.isArray(apiData.wantToWorkInvolvement) ? apiData.wantToWorkInvolvement : []) as Array<"volunteer" | "full-time">,
    fullDescription: apiData.fullDescription || `## The Problem\n\n${apiData.elevatorPitch}\n\n## Details\n\nThis is a real problem that needs solving.`,
    engagement: {
      building: apiData.builderCount || 0,
      buildingAnonymous: 0,
      investors: apiData.investorCount || 0,
      followers: 0,
      users: [],
    },
    isYCRFS: apiData.isYCRFS || false,
    ycQuarter: apiData.ycQuarter,
    isWeekendFundRFS: apiData.isWeekendFundRFS || false,
    wfPublishedDate: apiData.wfPublishedDate,
    isConviction: apiData.isConviction || false,
    convictionPublishedDate: apiData.convictionPublishedDate,
    isARK: apiData.isARK || false,
    arkPublishedDate: apiData.arkPublishedDate,
    isPathlight: apiData.isPathlight || false,
    pathlightPublishedDate: apiData.pathlightPublishedDate,
    isAccel: apiData.isAccel || false,
    accelPublishedDate: apiData.accelPublishedDate,
    tweetUrls: apiData.tweetUrls || [],
  }
}

export function ProblemDetailPage({
  problemId,
  initialProblemData,
}: {
  problemId?: string
  initialProblemData?: ProblemDetailApiResponse | null
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, user } = useAuth()
  const { toggleSave, isSaved } = useSavedProblems()

  // Whether this problem ID is a real UUID (DB problem) vs mock data string
  const isDbProblem = Boolean(problemId && UUID_RE.test(problemId))

  // Problem state - starts with mock lookup, can be updated from API
  const [problem, setProblem] = useState(() => {
    if (initialProblemData) {
      return transformApiData(initialProblemData)
    }

    // First try to find in mock data (for YC/Weekend Fund problems)
    const problemData = allProblems.find((p) => String(p.id) === String(problemId))
    if (problemData) {
      return transformMockData(problemData)
    }
    return mockProblem
  })
  const [isLoading, setIsLoading] = useState(false)

  // Fetch from API if not found in mock data (for database problems with UUIDs)
  useEffect(() => {
    const fetchFromApi = async () => {
      if (initialProblemData) return

      // Skip if already found in mock data
      const mockData = allProblems.find((p) => String(p.id) === String(problemId))
      if (mockData || !problemId) return

      setIsLoading(true)
      try {
        const res = await fetch(`/api/problems/${problemId}`)
        if (res.ok) {
          const data = await res.json()
          if (data.problem) {
            setProblem(transformApiData(data.problem))
          }
        }
      } catch (error) {
        console.error('Error fetching problem:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFromApi()
  }, [problemId, initialProblemData])

  const [upvoted, setUpvoted] = useState(false)
  const [upvoteCount, setUpvoteCount] = useState(problem.upvotes)

  // Update upvoteCount when problem changes
  useEffect(() => {
    setUpvoteCount(problem.upvotes)
  }, [problem.upvotes])

  // Comments hook
  const { comments, addComment, editComment, deleteComment, upvoteComment } = useComments({
    problemId: String(problem.id),
  })

  // Engagement states
  const [isFollowing, setIsFollowing] = useState(false)
  const [isBuilding, setIsBuilding] = useState(false)
  const [hasInvested, setHasInvested] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)
  const [engagementUsers, setEngagementUsers] = useState(problem.engagement.users)
  const [engagementCounts, setEngagementCounts] = useState(problem.engagement)

  // Auth modal state
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [loginPromptAction, setLoginPromptAction] = useState("")

  // Pending engagement state (for deferred auth flow)
  const [pendingEngagement, setPendingEngagement] = useState<PendingEngagement | null>(null)
  const [showPendingConfirmModal, setShowPendingConfirmModal] = useState(false)

  const fetchUpvoteState = useCallback(async () => {
    if (!problemId || !isDbProblem) return
    try {
      const response = await fetch(`/api/problems/${problemId}/upvote`, { cache: "no-store" })
      if (!response.ok) return
      const data = await response.json()
      setUpvoted(Boolean(data.hasUpvoted))
      setUpvoteCount(Number(data.upvoteCount || 0))
    } catch (error) {
      console.error("Failed to fetch upvote state:", error)
    }
  }, [problemId, isDbProblem])

  const fetchEngagementState = useCallback(async () => {
    if (!problemId || !isDbProblem) return
    try {
      const response = await fetch(`/api/problems/${problemId}/engagements?publicOnly=false`, { cache: "no-store" })
      if (!response.ok) return
      const data = await response.json()
      setEngagementUsers(Array.isArray(data.engagedUsers) ? data.engagedUsers : [])
      if (data.counts) {
        setEngagementCounts({
          building: Number(data.counts.building || 0),
          buildingAnonymous: Number(data.counts.buildingAnonymous || 0),
          investors: Number(data.counts.investors || 0),
          followers: Number(data.counts.followers || 0),
          users: Array.isArray(data.engagedUsers) ? data.engagedUsers : [],
        })
      }
      if (data.myEngagements) {
        setIsBuilding(Boolean(data.myEngagements.isBuilding))
        setHasInvested(Boolean(data.myEngagements.hasInvested))
        setHasApplied(Boolean(data.myEngagements.hasApplied))
        setIsFollowing(Boolean(data.myEngagements.isFollowing))
      }
    } catch (error) {
      console.error("Failed to fetch engagement state:", error)
    }
  }, [problemId, isDbProblem])

  useEffect(() => {
    fetchUpvoteState()
    fetchEngagementState()
  }, [fetchUpvoteState, fetchEngagementState, isAuthenticated])

  // Check for pending engagement when user becomes authenticated
  useEffect(() => {
    if (!isAuthenticated) return

    const pending = getPendingEngagement()
    if (pending && pending.problemId === String(problem.id)) {
      setPendingEngagement(pending)
      setShowPendingConfirmModal(true)
    }
  }, [isAuthenticated, problem.id])

  // Handle confirming a pending engagement
  const handleConfirmPendingEngagement = () => {
    if (!pendingEngagement) return

    switch (pendingEngagement.type) {
      case 'build':
        handleBuild(pendingEngagement.data as BuildFormData)
        break
      case 'invest':
        handleInvest(pendingEngagement.data as InvestFormData)
        break
      case 'joinTeam':
        handleJoinTeam(pendingEngagement.data as JoinTeamFormData)
        break
      case 'upvote':
        if (!upvoted) {
          handleUpvote()
        }
        break
      case 'follow':
        if (!isFollowing) {
          handleFollow()
        }
        break
      case 'fork':
        handleFork()
        break
    }

    clearPendingEngagement()
    setPendingEngagement(null)
    setShowPendingConfirmModal(false)
  }

  // Handle dismissing a pending engagement
  const handleDismissPendingEngagement = () => {
    clearPendingEngagement()
    setPendingEngagement(null)
    setShowPendingConfirmModal(false)
  }

  const requireAuth = (action: string, callback: () => void) => {
    if (!isAuthenticated) {
      setLoginPromptAction(action)
      setShowLoginPrompt(true)
      return
    }
    callback()
  }

  const handleUpvote = () => {
    if (!isDbProblem) return
    requireAuth("upvote this problem", () => {
      void (async () => {
        const response = await fetch(`/api/problems/${problem.id}/upvote`, { method: "POST" })
        if (!response.ok) return
        const data = await response.json()
        setUpvoted(Boolean(data.hasUpvoted))
        setUpvoteCount(Number(data.upvoteCount || 0))
      })()
    })
  }

  const handleSave = () => {
    if (!isDbProblem) return
    requireAuth("save this problem", () => {
      void toggleSave(String(problem.id))
    })
  }

  const handleInvest = (data: { tier: InvestmentTier; focus: InvestmentFocus; engagementLevel: EngagementLevel; note: string; visibility: Visibility; linkedIn?: string }) => {
    if (!isDbProblem) return
    void (async () => {
      const response = await fetch(`/api/problems/${problem.id}/engagements`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "invest",
          visibility: data.visibility,
          payload: data,
        }),
      })

      if (!response.ok) return
      await fetchEngagementState()
    })()
  }

  const handleBuild = (data: { status: BuildStatus; stage: BuildStage; visibility: Visibility; lookingFor: LookingFor[]; projectLink: string; description: string; whyYou: string; progressSoFar?: string; linkedIn?: string; twitter?: string; website?: string; raisingStage?: RaisingStage }) => {
    if (!isDbProblem) return
    void (async () => {
      const response = await fetch(`/api/problems/${problem.id}/engagements`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "build",
          visibility: data.visibility,
          payload: data,
        }),
      })

      if (!response.ok) return
      await fetchEngagementState()
    })()
  }

  const handleJoinTeam = (data: { roleInterest: RoleInterest; skills: string[]; intro: string; linkedIn?: string; twitter?: string; portfolio?: string }) => {
    if (!isDbProblem) return
    void (async () => {
      const response = await fetch(`/api/problems/${problem.id}/engagements`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "join_team",
          visibility: "private",
          payload: data,
        }),
      })

      if (!response.ok) return
      await fetchEngagementState()
    })()
  }

  const handleFollow = () => {
    if (!isDbProblem) return
    void (async () => {
      if (isFollowing) {
        const response = await fetch(`/api/problems/${problem.id}/engagements?publicOnly=false`, { cache: "no-store" })
        if (!response.ok) return
        const data = await response.json()
        const followEngagement = (data.engagements || []).find(
          (item: { id: string; type: string; userId: string }) => item.type === "follow" && item.userId === user?.id
        )
        if (followEngagement?.id) {
          await fetch(`/api/problems/${problem.id}/engagements/${followEngagement.id}`, { method: "DELETE" })
        }
      } else {
        await fetch(`/api/problems/${problem.id}/engagements`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "follow",
            visibility: "public",
            payload: {},
          }),
        })
      }

      await fetchEngagementState()
    })()
  }

  const handleFork = () => {
    // Store the problem data for forking
    const forkData = {
      originalId: problem.id,
      originalTitle: problem.title,
      title: problem.title,
      elevatorPitch: problem.elevatorPitch,
      fullDescription: problem.fullDescription.replace(/##\s/g, '## ').replace(/<br\/>/g, '\n'),
      category: problem.category,
    }
    localStorage.setItem("openquest_fork", JSON.stringify(forkData))
    router.push(`/submit?fork=${problem.id}`)
  }

  const detailHeader = (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-5xl mx-auto flex items-center gap-3 px-4 sm:px-6 h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Compass className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground hidden sm:inline">OpenQuest</span>
        </Link>

        {/* Back to feed */}
        <Link href="/feed">
          <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to feed</span>
          </Button>
        </Link>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Submit Problem */}
        <Button asChild size="sm" className="bg-foreground text-background hover:bg-foreground/90 gap-1.5">
          <Link href="/submit">
            <Plus className="h-4 w-4 hidden sm:inline" />
            <span className="hidden sm:inline">Submit Problem</span>
            <span className="sm:hidden">Submit</span>
          </Link>
        </Button>

        {/* User menu */}
        {isAuthenticated ? (
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link href="/profile">
              <UserIcon className="h-5 w-5" />
            </Link>
          </Button>
        ) : (
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login" className="gap-1.5">
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          </Button>
        )}
      </div>
    </header>
  )

  // Show loading state while fetching from API
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        {detailHeader}
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {detailHeader}

      {/* Main Content */}
      <main className="container max-w-5xl mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-[80px_1fr] lg:gap-8">
          {/* Sticky upvote button (desktop only) */}
          <div className="hidden md:block">
            <div className="sticky top-24">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleUpvote}
                className={cn(
                  "flex h-20 w-20 flex-col items-center justify-center rounded-xl border-2 transition-all duration-200",
                  upvoted
                    ? "border-orange-500/50 bg-orange-500/10 text-orange-500 shadow-lg shadow-orange-500/20"
                    : "border-border/60 bg-secondary/50 text-muted-foreground hover:border-orange-500/30 hover:bg-orange-500/5 hover:text-orange-500/80",
                )}
              >
                <ChevronUp className={cn("h-7 w-7 transition-transform", upvoted && "scale-110")} />
                <span className="text-base font-semibold mt-1">{upvoteCount}</span>
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 min-w-0 overflow-hidden">
            {/* Mobile upvote */}
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleUpvote}
                className={cn(
                  "flex h-16 w-16 flex-col items-center justify-center rounded-xl border-2 transition-all duration-200",
                  upvoted
                    ? "border-orange-500/50 bg-orange-500/10 text-orange-500 shadow-lg shadow-orange-500/20"
                    : "border-border/60 bg-secondary/50 text-muted-foreground hover:border-orange-500/30 hover:bg-orange-500/5",
                )}
              >
                <ChevronUp className={cn("h-6 w-6 transition-transform", upvoted && "scale-110")} />
                <span className="text-sm font-semibold">{upvoteCount}</span>
              </motion.button>
            </div>

            {/* Problem Header */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex rounded-full border px-3 py-1 text-xs font-medium",
                    problem.categoryColor,
                  )}
                >
                  {problem.category}
                </span>
                <span className="text-sm text-muted-foreground">{problem.timeAgo}</span>
              </div>

              <h1 className="mb-4 text-3xl font-bold leading-tight text-balance lg:text-4xl">{problem.title}</h1>

              <div className="flex items-center gap-3">
                {problem.isYCRFS ? (
                  <InstitutionalAuthor
                    type="yc"
                    quarter={problem.ycQuarter}
                    size="md"
                  />
                ) : problem.isWeekendFundRFS ? (
                  <InstitutionalAuthor
                    type="weekend-fund"
                    year={problem.wfPublishedDate}
                    size="md"
                  />
                ) : problem.isConviction ? (
                  <InstitutionalAuthor
                    type="conviction"
                    year={problem.convictionPublishedDate}
                    size="md"
                  />
                ) : problem.isARK ? (
                  <InstitutionalAuthor
                    type="ark"
                    year={problem.arkPublishedDate}
                    size="md"
                  />
                ) : problem.isPathlight ? (
                  <InstitutionalAuthor
                    type="pathlight"
                    year={problem.pathlightPublishedDate}
                    size="md"
                  />
                ) : problem.isAccel ? (
                  <InstitutionalAuthor
                    type="accel"
                    year={problem.accelPublishedDate}
                    size="md"
                  />
                ) : (
                  <>
                    <Avatar className="size-10">
                      <AvatarImage src={problem.author.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {problem.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {problem.author.isAnonymous ? "Anonymous" : problem.author.name}
                      </p>
                      <p className="text-sm text-muted-foreground">Problem author</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Elevator Pitch */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Elevator Pitch</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{problem.elevatorPitch}</p>
              </CardContent>
            </Card>

            {/* Full Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Full Description</CardTitle>
              </CardHeader>
              <CardContent>
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h2 className="text-xl font-semibold text-foreground mt-8 mb-4 first:mt-0">{children}</h2>
                    ),
                    h2: ({ children }) => (
                      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3 first:mt-0">{children}</h3>
                    ),
                    h3: ({ children }) => (
                      <h4 className="text-base font-semibold text-foreground mt-6 mb-2 first:mt-0">{children}</h4>
                    ),
                    p: ({ children }) => (
                      <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="space-y-2 mb-6 ml-1">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="space-y-2 mb-6 ml-1 list-decimal list-inside">{children}</ol>
                    ),
                    li: ({ children }) => (
                      <li className="flex gap-3 text-muted-foreground leading-relaxed">
                        <span className="text-muted-foreground/60 select-none">•</span>
                        <span>{children}</span>
                      </li>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-foreground">{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic text-muted-foreground">{children}</em>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-2 border-muted-foreground/30 pl-4 my-4 text-muted-foreground italic">{children}</blockquote>
                    ),
                    code: ({ children }) => (
                      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
                    ),
                    a: ({ href, children }) => (
                      <a href={href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>
                    ),
                  }}
                >
                  {problem.fullDescription}
                </ReactMarkdown>
              </CardContent>
            </Card>

            {/* Get Involved Section */}
            <GetInvolvedSection
              problemId={String(problem.id)}
              problemTitle={problem.title}
              authorInvolvement={problem.involvement}
              alreadyBuildingSupport={problem.alreadyBuildingSupport}
              isAnonymous={problem.author.isAnonymous}
              isUpvoted={upvoted}
              isFollowing={isFollowing}
              isBuilding={isBuilding}
              hasInvested={hasInvested}
              hasApplied={hasApplied}
              engagementCounts={{
                upvotes: upvoteCount,
                investors: engagementCounts.investors,
                building: engagementCounts.building,
                buildingAnonymous: engagementCounts.buildingAnonymous,
                followers: engagementCounts.followers,
              }}
              engagedUsers={engagementUsers}
              onUpvote={handleUpvote}
              onInvest={handleInvest}
              onBuild={handleBuild}
              onJoinTeam={handleJoinTeam}
              onFollow={handleFollow}
              onFork={handleFork}
              isSaved={isSaved(String(problem.id))}
              onSave={handleSave}
              isAuthor={false}
            />

            {/* Comments Section */}
            <CommentsSection
              problemId={String(problem.id)}
              comments={comments}
              onAddComment={addComment}
              onEditComment={editComment}
              onDeleteComment={deleteComment}
              onUpvoteComment={upvoteComment}
              currentUserId={user?.id}
              returnUrl={pathname}
            />

            {/* Tweet Embeds */}
            {problem.tweetUrls && problem.tweetUrls.length > 0 && (
              <TweetEmbedsSection tweetUrls={problem.tweetUrls} />
            )}

            {/* Related Problems Carousel */}
            <RelatedProblems
              currentProblemId={String(problem.id)}
              category={problem.category}
            />
          </div>
        </div>
      </main>

      {/* Login Prompt Modal */}
      <LoginPromptModal
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        actionDescription={loginPromptAction}
        returnUrl={pathname}
      />

      {/* Pending Engagement Confirmation Modal */}
      {pendingEngagement && (
        <PendingEngagementModal
          isOpen={showPendingConfirmModal}
          onClose={handleDismissPendingEngagement}
          onConfirm={handleConfirmPendingEngagement}
          actionType={pendingEngagement.type}
          problemTitle={pendingEngagement.problemTitle}
        />
      )}
    </div>
  )
}
