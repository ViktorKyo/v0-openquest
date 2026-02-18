"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronUp, MessageCircle, Hammer, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { VCBadge, detectVCFromFlags } from "@/components/vc-badge"
import { getCategoryIcon } from "@/lib/category-icons"

interface FeedProblem {
  id: number | string
  title: string
  description: string
  category: string
  categoryColor: string
  upvotes: number
  comments: number
  building: number
  investors: number
  author: {
    name: string
    isAnonymous: boolean
    isYC?: boolean
    isWeekendFund?: boolean
    isConviction?: boolean
    isARK?: boolean
    isPathlight?: boolean
    isAccel?: boolean
  }
  timeAgo: string
  isYCRFS?: boolean
  ycQuarter?: string
  isWeekendFundRFS?: boolean
  wfPublishedDate?: string
  isConviction?: boolean
  convictionPublishedDate?: string
  isARK?: boolean
  arkPublishedDate?: string
  isPathlight?: boolean
  pathlightPublishedDate?: string
  isAccel?: boolean
  accelPublishedDate?: string
}

interface FeedProblemCardProps {
  problem: FeedProblem
  isSaved?: boolean
  onToggleSave?: () => void
  onUpvote?: () => Promise<{ hasUpvoted: boolean; upvoteCount: number } | null>
}

export type { FeedProblem, FeedProblemCardProps }

export function FeedProblemCard({ problem, onUpvote }: FeedProblemCardProps) {
  const [upvoted, setUpvoted] = useState(false)
  const [upvoteCount, setUpvoteCount] = useState(problem.upvotes)
  const router = useRouter()

  const handleUpvote = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Optimistic update
    const wasUpvoted = upvoted
    setUpvoted(!wasUpvoted)
    setUpvoteCount(wasUpvoted ? upvoteCount - 1 : upvoteCount + 1)

    if (onUpvote) {
      const result = await onUpvote()
      if (result === null) {
        // Auth check failed or API error — revert
        setUpvoted(wasUpvoted)
        setUpvoteCount(wasUpvoted ? upvoteCount : upvoteCount)
        return
      }
      // Sync with server state
      setUpvoted(result.hasUpvoted)
      setUpvoteCount(result.upvoteCount)
    }
  }

  const handleCardClick = () => {
    router.push(`/problem/${problem.id}`)
  }

  const handleCommentClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/problem/${problem.id}#comments`)
  }

  // Get category icon config
  const categoryConfig = getCategoryIcon(problem.category)
  const CategoryIcon = categoryConfig.icon

  // Detect VC badge
  const vcKey = detectVCFromFlags(problem)

  // Author display name
  const authorName = problem.author.isAnonymous
    ? "Anonymous"
    : problem.author.name

  return (
    <div
      className="group flex items-start gap-3 sm:gap-4 rounded-xl border border-border/50 bg-card px-4 sm:px-5 py-3.5 sm:py-4 transition-all hover:border-accent/30 hover:bg-accent/[0.02] cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Category icon */}
      <div
        className={cn(
          "hidden sm:flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl mt-0.5",
          categoryConfig.bgColor,
        )}
      >
        <CategoryIcon className={cn("h-5.5 w-5.5", categoryConfig.iconColor)} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-base leading-snug text-foreground line-clamp-1 group-hover:text-accent transition-colors">
          {problem.title}
        </h3>

        {/* Metadata row */}
        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          {vcKey && (
            <>
              <VCBadge vc={vcKey} variant="compact" />
              <span className="text-muted-foreground/40">&middot;</span>
            </>
          )}
          <span className="font-medium">{problem.category}</span>
          <span className="text-muted-foreground/40">&middot;</span>
          <span>{authorName}</span>
          <span className="text-muted-foreground/40">&middot;</span>
          <span>{problem.timeAgo}</span>
        </div>

        {/* Description - 2 lines on desktop, 1 on mobile */}
        <p className="text-sm text-muted-foreground/80 line-clamp-1 sm:line-clamp-2 mt-1.5 leading-relaxed">
          {problem.description}
        </p>

        {/* Stats row: comments + engagement signals */}
        <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground/60">
          <button
            onClick={handleCommentClick}
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <MessageCircle className="h-3 w-3" />
            <span>{problem.comments}</span>
          </button>
          {problem.building > 0 && (
            <span className="hidden sm:flex items-center gap-1">
              <Hammer className="h-3 w-3" />
              <span>{problem.building} building</span>
            </span>
          )}
          {problem.investors > 0 && (
            <span className="hidden sm:flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              <span>{problem.investors} interested</span>
            </span>
          )}
        </div>
      </div>

      {/* Right side: upvote action */}
      <div className="flex-shrink-0 self-start mt-0.5 sm:mt-1">
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={handleUpvote}
          aria-label={`Upvote ${problem.title}`}
          className={cn(
            "flex h-12 min-w-[52px] flex-col items-center justify-center gap-0.5 rounded-xl border px-2 transition-all",
            upvoted
              ? "border-orange-500/50 bg-orange-500/10 text-orange-500 shadow-sm shadow-orange-500/20"
              : "border-border/60 bg-muted/30 text-muted-foreground hover:border-orange-500/30 hover:bg-orange-500/5 hover:text-orange-500",
          )}
        >
          <ChevronUp className={cn("h-4 w-4", upvoted && "scale-110")} />
          <span className="text-xs font-semibold tabular-nums leading-none">{upvoteCount}</span>
        </motion.button>
      </div>

    </div>
  )
}
