"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ChevronUp } from "lucide-react"
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

// Helper to get category color
function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    "Niche Markets": "bg-orange-500/10 text-orange-400 border-orange-500/20",
    "Climate Tech": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "AI & Infrastructure": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Future of Work": "bg-green-500/10 text-green-400 border-green-500/20",
    "Creator Economy": "bg-purple-500/10 text-purple-400 border-purple-500/20",
    Longevity: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    "Rebuild Money": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Moonshots: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    "World of Atoms": "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Other: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  }
  return colors[category] || "bg-gray-500/10 text-gray-400 border-gray-500/20"
}

// Helper to get time ago
function getTimeAgo(date: Date): string {
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return "just now"
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return `${Math.floor(seconds / 604800)}w ago`
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
  alreadyBuildingSupport: ["cofounder", "capital"] as const,
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
    building: 5,
    buildingAnonymous: 2,
    investors: 12,
    followers: 34,
    users: [
      { name: "Alex Kumar", avatar: "/man.jpg", type: "building" as const },
      { name: "Maria Garcia", avatar: "/diverse-woman-portrait.png", type: "investor" as const },
      { name: "James Wilson", avatar: "/man.jpg", type: "building" as const },
      { name: "Lisa Zhang", avatar: "/diverse-woman-portrait.png", type: "investor" as const },
      { name: "David Brown", avatar: "/man.jpg", type: "investor" as const },
    ],
  },
  // Institutional source data (not applicable for regular problems)
  isYCRFS: false,
  ycQuarter: undefined as string | undefined,
  isWeekendFundRFS: false,
  wfPublishedDate: undefined as string | undefined,
}

export function ProblemDetailPage({ problemId }: { problemId?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  // Find the problem from allProblems data
  const problemData = allProblems.find((p) => String(p.id) === String(problemId))

  // Transform problem data to match the expected format
  const problem = problemData ? {
    id: problemData.id,
    title: problemData.title,
    category: problemData.category,
    categoryColor: getCategoryColor(problemData.category),
    timeAgo: getTimeAgo(problemData.createdAt),
    author: {
      name: problemData.author.username,
      avatar: problemData.author.avatarUrl,
      isAnonymous: problemData.isAnonymous,
      isYC: (problemData.author as any).isYC,
      isWeekendFund: (problemData.author as any).isWeekendFund,
    },
    upvotes: problemData.upvotes,
    elevatorPitch: problemData.elevatorPitch,
    involvement: problemData.involvement,
    alreadyBuildingSupport: (problemData as any).alreadyBuildingSupport,
    wantBuildBlocker: (problemData as any).wantBuildBlocker,
    wantToWorkInvolvement: (problemData as any).wantToWorkInvolvement,
    fullDescription: problemData.fullDescription || `## The Problem\n\n${problemData.elevatorPitch}\n\n## Details\n\nThis is a real problem that needs solving.`,
    engagement: {
      building: problemData.builderCount || 0,
      buildingAnonymous: 0,
      investors: problemData.investorCount || 0,
      followers: 0,
      users: [],
    },
    // Institutional source data
    isYCRFS: (problemData as any).isYCRFS,
    ycQuarter: (problemData as any).ycQuarter,
    isWeekendFundRFS: (problemData as any).isWeekendFundRFS,
    wfPublishedDate: (problemData as any).wfPublishedDate,
  } : mockProblem

  const [upvoted, setUpvoted] = useState(false)
  const [upvoteCount, setUpvoteCount] = useState(problem.upvotes)

  // Comments hook
  const { comments, addComment, editComment, deleteComment, upvoteComment } = useComments({
    problemId: String(problem.id),
  })

  // Engagement states
  const [isFollowing, setIsFollowing] = useState(false)
  const [isBuilding, setIsBuilding] = useState(false)
  const [hasInvested, setHasInvested] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)

  // Auth modal state
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [loginPromptAction, setLoginPromptAction] = useState("")

  // Pending engagement state (for deferred auth flow)
  const [pendingEngagement, setPendingEngagement] = useState<PendingEngagement | null>(null)
  const [showPendingConfirmModal, setShowPendingConfirmModal] = useState(false)

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
          setUpvoted(true)
          setUpvoteCount(upvoteCount + 1)
        }
        break
      case 'follow':
        if (!isFollowing) {
          setIsFollowing(true)
        }
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
    requireAuth("upvote this problem", () => {
      setUpvoted(!upvoted)
      setUpvoteCount(upvoted ? upvoteCount - 1 : upvoteCount + 1)
    })
  }

  const handleInvest = (_data: { tier: InvestmentTier; focus: InvestmentFocus; engagementLevel: EngagementLevel; note: string; visibility: Visibility; linkedIn?: string }) => {
    setHasInvested(true)
    // TODO: Make API call to record investment interest with new fields
  }

  const handleBuild = (_data: { status: BuildStatus; stage: BuildStage; visibility: Visibility; lookingFor: LookingFor[]; projectLink: string; description: string; whyYou: string; progressSoFar?: string; linkedIn?: string; twitter?: string; website?: string; raisingStage?: RaisingStage }) => {
    setIsBuilding(true)
    // TODO: Make API call to record builder interest with enhanced data
  }

  const handleJoinTeam = (_data: { roleInterest: RoleInterest; skills: string[]; intro: string; linkedIn?: string; twitter?: string; portfolio?: string }) => {
    setHasApplied(true)
    // TODO: Make API call to record team application with profile links
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-5xl mx-auto px-4 py-4">
          <Link href="/feed">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to feed
            </Button>
          </Link>
        </div>
      </header>

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
          <div className="space-y-6">
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
                investors: problem.engagement.investors,
                building: problem.engagement.building,
                buildingAnonymous: problem.engagement.buildingAnonymous,
                followers: problem.engagement.followers,
              }}
              engagedUsers={problem.engagement.users}
              onUpvote={handleUpvote}
              onInvest={handleInvest}
              onBuild={handleBuild}
              onJoinTeam={handleJoinTeam}
              onFollow={handleFollow}
              onFork={handleFork}
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
              returnUrl={pathname}
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
