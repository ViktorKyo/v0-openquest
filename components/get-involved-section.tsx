"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronUp, DollarSign, Hammer, UserPlus, Eye, GitFork } from "lucide-react"
import { cn } from "@/lib/utils"
import { InvestModal, BuildModal, JoinTeamModal } from "@/components/engagement-modals"
import { AuthorIntentTags, type Involvement, type AlreadyBuildingSupport } from "@/components/author-intent-tags"
import { LoginPromptModal } from "@/components/login-prompt-modal"
import { useAuth } from "@/contexts/auth-context"
import type { InvestmentTier, BuildStatus, Visibility, RoleInterest, EngagementCounts, EngagedUser } from "@/types/engagement"

interface GetInvolvedSectionProps {
  // Author intent data
  authorInvolvement?: Involvement
  alreadyBuildingSupport?: AlreadyBuildingSupport[]
  isAnonymous?: boolean

  // Current engagement state
  isUpvoted?: boolean
  isFollowing?: boolean
  isBuilding?: boolean
  hasInvested?: boolean
  hasApplied?: boolean

  // Engagement counts
  engagementCounts: EngagementCounts
  engagedUsers: EngagedUser[]

  // Callbacks
  onUpvote: () => void
  onInvest: (data: { tier: InvestmentTier; note: string; isPublic: boolean }) => void
  onBuild: (data: { status: BuildStatus; visibility: Visibility; description: string }) => void
  onJoinTeam: (data: { roleInterest: RoleInterest; skills: string[]; intro: string }) => void
  onFollow: () => void
  onFork: () => void

  // Permissions
  isAuthor?: boolean
}

export function GetInvolvedSection({
  authorInvolvement,
  alreadyBuildingSupport,
  isAnonymous = false,
  isUpvoted = false,
  isFollowing = false,
  isBuilding = false,
  hasInvested = false,
  hasApplied = false,
  engagementCounts,
  engagedUsers,
  onUpvote,
  onInvest,
  onBuild,
  onJoinTeam,
  onFollow,
  onFork,
  isAuthor = false,
}: GetInvolvedSectionProps) {
  const { isAuthenticated } = useAuth()
  const pathname = usePathname()

  const [showInvestModal, setShowInvestModal] = useState(false)
  const [showBuildModal, setShowBuildModal] = useState(false)
  const [showJoinTeamModal, setShowJoinTeamModal] = useState(false)
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

  const handleInvestSubmit = (data: { tier: InvestmentTier; note: string; isPublic: boolean }) => {
    onInvest(data)
    setShowInvestModal(false)
  }

  const handleBuildSubmit = (data: { status: BuildStatus; visibility: Visibility; description: string }) => {
    onBuild(data)
    setShowBuildModal(false)
  }

  const handleJoinTeamSubmit = (data: { roleInterest: RoleInterest; skills: string[]; intro: string }) => {
    onJoinTeam(data)
    setShowJoinTeamModal(false)
  }

  // Determine if author is looking for certain things
  const isLookingForCofounder = alreadyBuildingSupport?.includes("cofounder") || alreadyBuildingSupport?.includes("founding-team")
  const isLookingForCapital = alreadyBuildingSupport?.includes("capital")

  // Builders list (public only)
  const publicBuilders = engagedUsers.filter((u) => u.type === "building")
  const publicInvestors = engagedUsers.filter((u) => u.type === "investor")

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🤝</span> Get Involved
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Author Context - What they're looking for */}
          {authorInvolvement && (authorInvolvement !== "just-sharing") && (
            <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
              <h3 className="font-semibold text-sm mb-3">What the author is looking for:</h3>
              <AuthorIntentTags
                involvement={authorInvolvement}
                alreadyBuildingSupport={alreadyBuildingSupport}
                variant="compact"
                isAnonymous={isAnonymous}
              />
            </div>
          )}

          {/* Primary Action Buttons */}
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              {/* Upvote */}
              <Button
                onClick={() => requireAuth("upvote this problem", onUpvote)}
                variant={isUpvoted ? "default" : "outline"}
                className={cn("h-auto py-3 gap-2", isUpvoted && "bg-accent hover:bg-accent/90")}
              >
                <ChevronUp className="h-5 w-5" />
                <span>{isUpvoted ? "Upvoted" : "Upvote"}</span>
              </Button>

              {/* Invest */}
              <Button
                onClick={() => requireAuth("express investment interest", () => setShowInvestModal(true))}
                variant={hasInvested ? "default" : "secondary"}
                className={cn("h-auto py-3 gap-2", hasInvested && "bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/20")}
                disabled={hasInvested}
              >
                <DollarSign className="h-5 w-5" />
                <span>{hasInvested ? "Interest Expressed" : "Invest"}</span>
              </Button>

              {/* Build */}
              <Button
                onClick={() => requireAuth("claim you're building this", () => setShowBuildModal(true))}
                variant={isBuilding ? "default" : "secondary"}
                className={cn("h-auto py-3 gap-2", isBuilding && "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20")}
                disabled={isBuilding}
              >
                <Hammer className="h-5 w-5" />
                <span>{isBuilding ? "Building" : "Build"}</span>
              </Button>

              {/* Join Team */}
              <Button
                onClick={() => requireAuth("apply to join this team", () => setShowJoinTeamModal(true))}
                variant={hasApplied ? "default" : "secondary"}
                className={cn(
                  "h-auto py-3 gap-2",
                  hasApplied && "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20",
                  isLookingForCofounder && !hasApplied && "border-accent/50 bg-accent/5"
                )}
                disabled={isAuthor || hasApplied}
              >
                <UserPlus className="h-5 w-5" />
                <span>{hasApplied ? "Applied" : isAuthor ? "Your Problem" : "Join Team"}</span>
              </Button>
            </div>

            {/* Secondary Actions */}
            <div className="flex gap-3">
              <Button
                onClick={() => requireAuth("follow this problem", onFollow)}
                variant="outline"
                size="sm"
                className={cn("flex-1 gap-2", isFollowing && "bg-accent/10 border-accent/50")}
              >
                <Eye className="h-4 w-4" />
                <span>{isFollowing ? "Following" : "Follow"}</span>
              </Button>
              <Button
                onClick={() => requireAuth("fork this problem", onFork)}
                variant="outline"
                size="sm"
                className="flex-1 gap-2"
              >
                <GitFork className="h-4 w-4" />
                <span>Fork</span>
              </Button>
            </div>
          </div>

          <Separator />

          {/* Who's Engaged */}
          <div>
            <h3 className="font-semibold mb-4">Who's engaged</h3>

            {/* Engagement Stats */}
            <div className="flex flex-wrap gap-4 text-sm mb-4">
              <div className="flex items-center gap-1.5">
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{engagementCounts.upvotes}</span>
                <span className="text-muted-foreground">upvotes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{engagementCounts.investors}</span>
                <span className="text-muted-foreground">investors</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Hammer className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{engagementCounts.building}</span>
                <span className="text-muted-foreground">building</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{engagementCounts.followers}</span>
                <span className="text-muted-foreground">following</span>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Public Builders */}
            {publicBuilders.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-3">
                  Building ({publicBuilders.length} public
                  {engagementCounts.buildingAnonymous > 0 && `, ${engagementCounts.buildingAnonymous} anonymous`})
                </h4>
                <div className="flex flex-wrap gap-3">
                  {publicBuilders.map((user, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Avatar className="size-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{user.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Public Investors */}
            {publicInvestors.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-3">Interested in Investing</h4>
                <div className="flex flex-wrap gap-3">
                  {publicInvestors.slice(0, 5).map((user, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Avatar className="size-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{user.name}</span>
                    </div>
                  ))}
                  {publicInvestors.length > 5 && (
                    <div className="flex items-center text-sm text-muted-foreground">+{publicInvestors.length - 5} more</div>
                  )}
                </div>
              </div>
            )}

            {/* Empty state */}
            {publicBuilders.length === 0 && publicInvestors.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                Be the first to get involved with this problem!
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <InvestModal isOpen={showInvestModal} onClose={() => setShowInvestModal(false)} onSubmit={handleInvestSubmit} />
      <BuildModal isOpen={showBuildModal} onClose={() => setShowBuildModal(false)} onSubmit={handleBuildSubmit} />
      <JoinTeamModal isOpen={showJoinTeamModal} onClose={() => setShowJoinTeamModal(false)} onSubmit={handleJoinTeamSubmit} />
      <LoginPromptModal
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        actionDescription={loginPromptAction}
        returnUrl={pathname}
      />
    </>
  )
}
