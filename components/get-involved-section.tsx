"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronUp, DollarSign, Hammer, UserPlus, Eye, GitFork, Bookmark } from "lucide-react"
import { cn } from "@/lib/utils"
import { InvestModal, BuildModal, JoinTeamModal } from "@/components/engagement-modals"
import { AuthorIntentTags, type Involvement, type AlreadyBuildingSupport } from "@/components/author-intent-tags"
import { LoginPromptModal } from "@/components/login-prompt-modal"
import { useAuth } from "@/contexts/auth-context"
import { savePendingEngagement, type BuildFormData, type InvestFormData, type JoinTeamFormData, type EngagementActionType } from "@/lib/pending-engagement"
import type { InvestmentTier, InvestmentFocus, EngagementLevel, BuildStatus, BuildStage, LookingFor, RaisingStage, Visibility, RoleInterest, EngagementCounts, EngagedUser } from "@/types/engagement"

interface GetInvolvedSectionProps {
  // Problem identification (for deferred auth)
  problemId: string
  problemTitle?: string

  // Author intent data
  authorInvolvement?: Involvement
  alreadyBuildingSupport?: ReadonlyArray<AlreadyBuildingSupport>
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
  onInvest: (data: { tier: InvestmentTier; focus: InvestmentFocus; engagementLevel: EngagementLevel; note: string; visibility: Visibility; linkedIn?: string }) => void
  onBuild: (data: { status: BuildStatus; stage: BuildStage; visibility: Visibility; lookingFor: LookingFor[]; projectLink: string; description: string; whyYou: string; progressSoFar?: string; linkedIn?: string; twitter?: string; website?: string; raisingStage?: RaisingStage }) => void
  onJoinTeam: (data: { roleInterest: RoleInterest; skills: string[]; intro: string; linkedIn?: string; twitter?: string; portfolio?: string }) => void
  onFollow: () => void
  onFork: () => void

  // Save/bookmark
  isSaved?: boolean
  onSave?: () => void

  // Permissions
  isAuthor?: boolean
}

export function GetInvolvedSection({
  problemId,
  problemTitle,
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
  isSaved = false,
  onSave,
  isAuthor = false,
}: GetInvolvedSectionProps) {
  const { isAuthenticated } = useAuth()
  const pathname = usePathname()

  const [showInvestModal, setShowInvestModal] = useState(false)
  const [showBuildModal, setShowBuildModal] = useState(false)
  const [showJoinTeamModal, setShowJoinTeamModal] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [loginPromptAction, setLoginPromptAction] = useState("")

  // For simple actions without forms, require auth upfront
  const requireAuth = (action: string, actionType: EngagementActionType, callback: () => void) => {
    if (!isAuthenticated) {
      savePendingEngagement({
        type: actionType,
        problemId,
        problemTitle,
      })
      setLoginPromptAction(action)
      setShowLoginPrompt(true)
      return
    }
    callback()
  }

  // Auth-required handlers for form-based actions (form-first, auth-later)
  const handleBuildAuthRequired = (formData: BuildFormData) => {
    savePendingEngagement({
      type: 'build',
      problemId,
      problemTitle,
      data: formData,
    })
    setLoginPromptAction("submit your building status")
    setShowLoginPrompt(true)
  }

  const handleInvestAuthRequired = (formData: InvestFormData) => {
    savePendingEngagement({
      type: 'invest',
      problemId,
      problemTitle,
      data: formData,
    })
    setLoginPromptAction("express your investment interest")
    setShowLoginPrompt(true)
  }

  const handleJoinTeamAuthRequired = (formData: JoinTeamFormData) => {
    savePendingEngagement({
      type: 'joinTeam',
      problemId,
      problemTitle,
      data: formData,
    })
    setLoginPromptAction("submit your team application")
    setShowLoginPrompt(true)
  }

  const handleInvestSubmit = (data: { tier: InvestmentTier; focus: InvestmentFocus; engagementLevel: EngagementLevel; note: string; visibility: Visibility; linkedIn?: string }) => {
    onInvest(data)
    setShowInvestModal(false)
  }

  const handleBuildSubmit = (data: { status: BuildStatus; stage: BuildStage; visibility: Visibility; lookingFor: LookingFor[]; projectLink: string; description: string; whyYou: string; progressSoFar?: string; linkedIn?: string; twitter?: string; website?: string; raisingStage?: RaisingStage }) => {
    onBuild(data)
    setShowBuildModal(false)
  }

  const handleJoinTeamSubmit = (data: { roleInterest: RoleInterest; skills: string[]; intro: string; linkedIn?: string; twitter?: string; portfolio?: string }) => {
    onJoinTeam(data)
    setShowJoinTeamModal(false)
  }

  // Determine if author is looking for certain things
  const isLookingForCofounder = alreadyBuildingSupport?.includes("cofounder") || alreadyBuildingSupport?.includes("founding-team")

  // Builders list (public only)
  const publicBuilders = engagedUsers.filter((u) => u.type === "building")
  const publicInvestors = engagedUsers.filter((u) => u.type === "investor")

  return (
    <>
      <Card>
        <CardContent className="pt-6 space-y-6">
          {/* Engagement Stats - Prominent at top */}
          <div className="grid grid-cols-4 gap-2">
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold tabular-nums">{engagementCounts.upvotes}</div>
              <div className="text-xs text-muted-foreground">upvotes</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold tabular-nums">{engagementCounts.building}</div>
              <div className="text-xs text-muted-foreground">building</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold tabular-nums">{engagementCounts.investors}</div>
              <div className="text-xs text-muted-foreground">investors</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold tabular-nums">{engagementCounts.followers}</div>
              <div className="text-xs text-muted-foreground">following</div>
            </div>
          </div>

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

          {/* Primary Action - Upvote */}
          <Button
            onClick={() => requireAuth("upvote this problem", "upvote", onUpvote)}
            variant={isUpvoted ? "default" : "outline"}
            size="lg"
            className={cn(
              "w-full gap-2 h-12",
              isUpvoted
                ? "bg-orange-500 hover:bg-orange-600 text-white border-orange-500"
                : "hover:border-orange-500/50 hover:text-orange-500"
            )}
          >
            <ChevronUp className={cn("h-5 w-5", isUpvoted && "fill-current")} />
            <span className="font-medium">{isUpvoted ? "Upvoted" : "Upvote this problem"}</span>
          </Button>

          {/* Commitment Actions */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Get involved</p>
            <div className="grid gap-2 sm:grid-cols-3">
              {/* Build - opens modal directly, auth check on submit */}
              <Button
                onClick={() => setShowBuildModal(true)}
                variant="outline"
                className={cn(
                  "h-auto py-3 flex-col gap-1",
                  isBuilding && "bg-emerald-500/10 border-emerald-500/50 text-emerald-600 dark:text-emerald-400"
                )}
                disabled={isBuilding}
              >
                <Hammer className="h-4 w-4" />
                <span className="text-xs">{isBuilding ? "Building" : "I'm building this"}</span>
              </Button>

              {/* Invest - opens modal directly, auth check on submit */}
              <Button
                onClick={() => setShowInvestModal(true)}
                variant="outline"
                className={cn(
                  "h-auto py-3 flex-col gap-1",
                  hasInvested && "bg-yellow-500/10 border-yellow-500/50 text-yellow-600 dark:text-yellow-400"
                )}
                disabled={hasInvested}
              >
                <DollarSign className="h-4 w-4" />
                <span className="text-xs">{hasInvested ? "Interested" : "I'd invest"}</span>
              </Button>

              {/* Join Team - opens modal directly, auth check on submit */}
              <Button
                onClick={() => setShowJoinTeamModal(true)}
                variant="outline"
                className={cn(
                  "h-auto py-3 flex-col gap-1",
                  hasApplied && "bg-blue-500/10 border-blue-500/50 text-blue-600 dark:text-blue-400",
                  isLookingForCofounder && !hasApplied && "border-accent/50"
                )}
                disabled={isAuthor || hasApplied}
              >
                <UserPlus className="h-4 w-4" />
                <span className="text-xs">{hasApplied ? "Applied" : "Join team"}</span>
              </Button>
            </div>
          </div>

          {/* Secondary Actions - Inline */}
          <div className="flex items-center justify-between pt-2 border-t">
            <Button
              onClick={() => requireAuth("follow this problem", "follow", onFollow)}
              variant="ghost"
              size="sm"
              className={cn("gap-2 text-muted-foreground", isFollowing && "text-foreground")}
            >
              <Eye className="h-4 w-4" />
              <span>{isFollowing ? "Following" : "Follow"}</span>
            </Button>
            {onSave && (
              <Button
                onClick={onSave}
                variant="ghost"
                size="sm"
                className={cn("gap-2 text-muted-foreground", isSaved && "text-foreground")}
              >
                <Bookmark className={cn("h-4 w-4", isSaved && "fill-current")} />
                <span>{isSaved ? "Saved" : "Save"}</span>
              </Button>
            )}
            <Button
              onClick={() => requireAuth("fork this problem", "fork", onFork)}
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground"
            >
              <GitFork className="h-4 w-4" />
              <span>Fork</span>
            </Button>
          </div>

          {/* Public Builders */}
          {publicBuilders.length > 0 && (
            <div className="pt-2 border-t">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                Building this ({publicBuilders.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {publicBuilders.map((user, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-muted/50 rounded-full pl-1 pr-3 py-1">
                    <Avatar className="size-6">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-[10px]">
                        {user.name.split(" ").map((n) => n[0]).join("")}
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
            <div className={cn(publicBuilders.length === 0 && "pt-2 border-t")}>
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                Interested investors ({publicInvestors.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {publicInvestors.slice(0, 5).map((user, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-muted/50 rounded-full pl-1 pr-3 py-1">
                    <Avatar className="size-6">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-[10px]">
                        {user.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{user.name}</span>
                  </div>
                ))}
                {publicInvestors.length > 5 && (
                  <div className="flex items-center text-sm text-muted-foreground px-3">+{publicInvestors.length - 5} more</div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals - with deferred auth (form-first, auth-later) */}
      <InvestModal
        isOpen={showInvestModal}
        onClose={() => setShowInvestModal(false)}
        onSubmit={handleInvestSubmit}
        isAuthenticated={isAuthenticated}
        onAuthRequired={handleInvestAuthRequired}
      />
      <BuildModal
        isOpen={showBuildModal}
        onClose={() => setShowBuildModal(false)}
        onSubmit={handleBuildSubmit}
        isAuthenticated={isAuthenticated}
        onAuthRequired={handleBuildAuthRequired}
      />
      <JoinTeamModal
        isOpen={showJoinTeamModal}
        onClose={() => setShowJoinTeamModal(false)}
        onSubmit={handleJoinTeamSubmit}
        isAuthenticated={isAuthenticated}
        onAuthRequired={handleJoinTeamAuthRequired}
      />
      <LoginPromptModal
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        actionDescription={loginPromptAction}
        returnUrl={pathname}
      />
    </>
  )
}
