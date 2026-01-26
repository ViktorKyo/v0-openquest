"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ChevronUp, MoreVertical, MessageCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { AuthorIntentTags } from "@/components/author-intent-tags"
import { GetInvolvedSection } from "@/components/get-involved-section"
import { LoginPromptModal } from "@/components/login-prompt-modal"
import { useAuth } from "@/contexts/auth-context"
import type { InvestmentTier, BuildStatus, Visibility, RoleInterest } from "@/types/engagement"
import { allProblems } from "@/data/mock-problems"

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
      { name: "Alex Kumar", avatar: "/man.jpg", type: "building" },
      { name: "Maria Garcia", avatar: "/diverse-woman-portrait.png", type: "investor" },
      { name: "James Wilson", avatar: "/man.jpg", type: "building" },
      { name: "Lisa Zhang", avatar: "/diverse-woman-portrait.png", type: "investor" },
      { name: "David Brown", avatar: "/man.jpg", type: "investor" },
    ],
  },
}

const mockComments = [
  {
    id: 1,
    author: { name: "Marcus Reid", avatar: "/man.jpg", initials: "MR" },
    content:
      "This is huge. I run a small marketing agency and we've been manually tracking this in spreadsheets. Would definitely pay for a simple solution.",
    timeAgo: "1h ago",
    upvotes: 12,
    replies: [
      {
        id: 11,
        author: { name: "Sarah Chen", avatar: "/diverse-woman-portrait.png", initials: "SC" },
        content: "Thanks Marcus! What's the biggest pain point with the spreadsheet approach for you?",
        timeAgo: "45m ago",
        upvotes: 3,
      },
      {
        id: 12,
        author: { name: "Marcus Reid", avatar: "/man.jpg", initials: "MR" },
        content:
          "Mainly keeping it updated and making sure we're calculating emissions correctly. Plus it's hard to show progress over time.",
        timeAgo: "30m ago",
        upvotes: 5,
      },
    ],
  },
  {
    id: 2,
    author: { name: "Emily Watson", avatar: "/diverse-woman-portrait.png", initials: "EW" },
    content: "Have you looked at Watershed or Persefoni? They might have SMB plans.",
    timeAgo: "50m ago",
    upvotes: 4,
    replies: [],
  },
  {
    id: 3,
    author: { name: "Alex Kumar", avatar: "/man.jpg", initials: "AK" },
    content:
      "I'm actually building something in this space! Would love to chat. The key is making data input stupid simple - probably needs to integrate with accounting software.",
    timeAgo: "40m ago",
    upvotes: 18,
    replies: [
      {
        id: 31,
        author: { name: "Jordan Lee", avatar: "/diverse-group.png", initials: "JL" },
        content: "QuickBooks integration would be killer. Most small biz expenses directly correlate to emissions.",
        timeAgo: "35m ago",
        upvotes: 8,
      },
    ],
  },
  {
    id: 4,
    author: { name: "Anonymous", avatar: "", initials: "A" },
    content: "This market is more crowded than you think. Normative, Plan A, CarbonChain all targeting SMBs now.",
    timeAgo: "25m ago",
    upvotes: 6,
    replies: [],
  },
  {
    id: 5,
    author: { name: "Rachel Adams", avatar: "/diverse-woman-portrait.png", initials: "RA" },
    content:
      "Love this. The B2B sales cycle for sustainability is brutal though. Most small businesses won't pay until they're required to report.",
    timeAgo: "15m ago",
    upvotes: 9,
    replies: [],
  },
]

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
    },
    upvotes: problemData.upvotes,
    elevatorPitch: problemData.elevatorPitch,
    involvement: problemData.involvement,
    alreadyBuildingSupport: (problemData as any).alreadyBuildingSupport,
    wantBuildBlocker: (problemData as any).wantBuildBlocker,
    wantToWorkInvolvement: (problemData as any).wantToWorkInvolvement,
    fullDescription: `## The Problem\n\n${problemData.elevatorPitch}\n\n## Details\n\nThis is a real problem that needs solving.`,
    engagement: {
      building: problemData.builderCount || 0,
      buildingAnonymous: 0,
      investors: problemData.investorCount || 0,
      followers: 0,
      users: [],
    },
  } : mockProblem

  const [upvoted, setUpvoted] = useState(false)
  const [upvoteCount, setUpvoteCount] = useState(problem.upvotes)
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState(mockComments)
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyText, setReplyText] = useState("")

  // Engagement states
  const [isFollowing, setIsFollowing] = useState(false)
  const [isBuilding, setIsBuilding] = useState(false)
  const [hasInvested, setHasInvested] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)

  // Auth modal state
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [loginPromptAction, setLoginPromptAction] = useState("")

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

  const handleInvest = (data: { tier: InvestmentTier; note: string; isPublic: boolean }) => {
    console.log("Investment data:", data)
    setHasInvested(true)
    // In a real app, this would make an API call
  }

  const handleBuild = (data: { status: BuildStatus; visibility: Visibility; description: string }) => {
    console.log("Build data:", data)
    setIsBuilding(true)
    // In a real app, this would make an API call
  }

  const handleJoinTeam = (data: { roleInterest: RoleInterest; skills: string[]; intro: string }) => {
    console.log("Join team data:", data)
    setHasApplied(true)
    // In a real app, this would make an API call
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return

    const newComment = {
      id: comments.length + 1,
      author: { name: "You", avatar: "/abstract-geometric-shapes.png", initials: "YO" },
      content: commentText,
      timeAgo: "just now",
      upvotes: 0,
      replies: [],
    }

    setComments([newComment, ...comments])
    setCommentText("")
  }

  const handleReplySubmit = (commentId: number) => {
    if (!replyText.trim()) return

    const newReply = {
      id: commentId * 10 + 100,
      author: { name: "You", avatar: "/abstract-geometric-shapes.png", initials: "YO" },
      content: replyText,
      timeAgo: "just now",
      upvotes: 0,
    }

    setComments(
      comments.map((comment) =>
        comment.id === commentId ? { ...comment, replies: [...(comment.replies || []), newReply] } : comment,
      ),
    )
    setReplyText("")
    setReplyingTo(null)
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
                {problem.author.name.toLowerCase() === "ycombinator" || problem.author.name.toLowerCase() === "y combinator" ? (
                  <>
                    <div className="flex size-10 items-center justify-center rounded-full bg-orange-500">
                      <span className="text-lg font-bold text-white">Y</span>
                    </div>
                    <div>
                      <p className="font-medium">{problem.author.name}</p>
                      <p className="text-sm text-muted-foreground">Y Combinator RFS</p>
                    </div>
                  </>
                ) : problem.author.name.toLowerCase() === "weekendfund" || problem.author.name.toLowerCase() === "weekend fund" ? (
                  <>
                    <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500">
                      <span className="text-lg">☀️</span>
                    </div>
                    <div>
                      <p className="font-medium">{problem.author.name}</p>
                      <p className="text-sm text-muted-foreground">Weekend Fund RFS</p>
                    </div>
                  </>
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
                <div className="space-y-4 text-[15px] leading-relaxed">
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        problem.fullDescription
                          .split('\n\n')
                          .map(section => {
                            // Handle headers (##)
                            if (section.startsWith('## ')) {
                              return `<h3 class="text-lg font-semibold text-foreground mt-6 mb-3 first:mt-0">${section.replace('## ', '')}</h3>`
                            }
                            // Handle bullet points with bold labels
                            if (section.includes('\n- **')) {
                              const items = section.split('\n- ')
                                .filter(item => item.trim())
                                .map(item => {
                                  const boldMatch = item.match(/^\*\*(.*?)\*\*(.*)/)
                                  if (boldMatch) {
                                    return `<li class="ml-4"><span class="font-medium text-foreground">${boldMatch[1]}</span><span class="text-muted-foreground">${boldMatch[2]}</span></li>`
                                  }
                                  return `<li class="ml-4 text-muted-foreground">${item}</li>`
                                })
                              return `<ul class="space-y-2 list-none">${items.join('')}</ul>`
                            }
                            // Handle regular paragraphs with inline bold
                            return `<p class="text-muted-foreground">${section.replace(/\*\*(.*?)\*\*/g, '<span class="font-medium text-foreground">$1</span>')}</p>`
                          })
                          .join(''),
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Get Involved Section */}
            <GetInvolvedSection
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Discussion ({comments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0)})
                </CardTitle>
              </CardHeader>

              <Separator />

              <CardContent className="pt-6 space-y-6">
                {/* Comment Input */}
                <div className="space-y-3">
                  <Textarea
                    placeholder="Share your thoughts..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="min-h-24"
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => setCommentText("")}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleCommentSubmit} disabled={!commentText.trim()}>
                      Post Comment
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="space-y-4">
                      {/* Main Comment */}
                      <div className="flex gap-3">
                        <Avatar className="size-8 shrink-0">
                          <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">{comment.author.initials}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">{comment.author.name}</span>
                            <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                          </div>

                          <p className="text-sm text-muted-foreground leading-relaxed">{comment.content}</p>

                          <div className="flex items-center gap-4 text-sm">
                            <button className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground">
                              <ChevronUp className="h-4 w-4" />
                              <span>{comment.upvotes}</span>
                            </button>
                            <button
                              className="text-muted-foreground transition-colors hover:text-foreground"
                              onClick={() => setReplyingTo(comment.id)}
                            >
                              Reply
                            </button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button className="text-muted-foreground transition-colors hover:text-foreground">
                                  <MoreVertical className="h-4 w-4" />
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          {/* Reply Input */}
                          {replyingTo === comment.id && (
                            <div className="space-y-2 pt-2">
                              <Textarea
                                placeholder="Write a reply..."
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className="min-h-20"
                              />
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                                  Cancel
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleReplySubmit(comment.id)}
                                  disabled={!replyText.trim()}
                                >
                                  Reply
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Nested Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="ml-11 space-y-4 border-l-2 border-border/50 pl-4">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex gap-3">
                              <Avatar className="size-8 shrink-0">
                                <AvatarImage src={reply.author.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-xs">{reply.author.initials}</AvatarFallback>
                              </Avatar>

                              <div className="flex-1 min-w-0 space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-sm">{reply.author.name}</span>
                                  <span className="text-xs text-muted-foreground">{reply.timeAgo}</span>
                                </div>

                                <p className="text-sm text-muted-foreground leading-relaxed">{reply.content}</p>

                                <div className="flex items-center gap-4 text-sm">
                                  <button className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground">
                                    <ChevronUp className="h-4 w-4" />
                                    <span>{reply.upvotes}</span>
                                  </button>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <button className="text-muted-foreground transition-colors hover:text-foreground">
                                        <MoreVertical className="h-4 w-4" />
                                      </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>Edit</DropdownMenuItem>
                                      <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
    </div>
  )
}
