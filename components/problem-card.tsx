"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronUp, MessageCircle, Bookmark } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { AuthorIntentTags } from "@/components/author-intent-tags"
import { InstitutionalLogo } from "@/components/institutional-author"

interface Problem {
  id: number | string
  title: string
  description: string
  category: string
  upvotes: number
  comments: number
  author: {
    name: string
    avatar: string | null
    isYC?: boolean
    isWeekendFund?: boolean
    isConviction?: boolean
    isARK?: boolean
    isPathlight?: boolean
  }
  timeAgo: string
  categoryColor: string
  // Author intent fields
  involvement?: "want-build" | "already-building" | "just-sharing" | "want-to-work"
  wantBuildBlocker?: Array<"need-capital" | "need-cofounder">
  wantToWorkInvolvement?: Array<"volunteer" | "full-time">
  alreadyBuildingSupport?: Array<"awareness" | "founding-team" | "cofounder" | "capital">
  isAnonymous?: boolean
}

interface ProblemCardProps {
  problem: Problem
  isSaved?: boolean
  onToggleSave?: () => void
}

export function ProblemCard({ problem, isSaved = false, onToggleSave }: ProblemCardProps) {
  const [upvoted, setUpvoted] = useState(false)
  const [upvoteCount, setUpvoteCount] = useState(problem.upvotes)
  const router = useRouter()

  const handleUpvote = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (upvoted) {
      setUpvoteCount(upvoteCount - 1)
    } else {
      setUpvoteCount(upvoteCount + 1)
    }
    setUpvoted(!upvoted)
  }

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/category/${problem.category.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}`)
  }

  const handleCardClick = () => {
    router.push(`/problem/${problem.id}`)
  }

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onToggleSave?.()
  }

  return (
    <Card
      className="group relative overflow-hidden border-border/50 bg-card transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-accent/5 cursor-pointer"
      onClick={handleCardClick}
    >
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* Upvote button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleUpvote}
            className={cn(
              "flex h-14 w-12 flex-shrink-0 flex-col items-center justify-center rounded-lg border transition-all",
              upvoted
                ? "border-accent bg-accent/10 text-accent"
                : "border-border bg-secondary/50 text-muted-foreground hover:border-accent/50 hover:text-accent",
            )}
          >
            <ChevronUp className="h-5 w-5" />
            <span className="text-sm font-medium">{upvoteCount}</span>
          </motion.button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="mb-2">
              <button
                onClick={handleCategoryClick}
                className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors hover:bg-opacity-80", problem.categoryColor)}
              >
                {problem.category}
              </button>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
              {problem.title}
            </h3>
            <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{problem.description}</p>

            {/* Author Intent Tags */}
            {problem.involvement && (
              <div className="mb-3">
                <AuthorIntentTags
                  involvement={problem.involvement}
                  wantBuildBlocker={problem.wantBuildBlocker}
                  wantToWorkInvolvement={problem.wantToWorkInvolvement}
                  alreadyBuildingSupport={problem.alreadyBuildingSupport}
                  variant="compact"
                  isAnonymous={problem.isAnonymous}
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {problem.author.isYC ? (
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <InstitutionalLogo type="yc" className="size-6" />
                    <span className="font-medium">Y Combinator</span>
                  </span>
                ) : problem.author.isWeekendFund ? (
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <InstitutionalLogo type="weekend-fund" className="size-6" />
                    <span className="font-medium">Weekend Fund</span>
                  </span>
                ) : problem.author.isConviction ? (
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <InstitutionalLogo type="conviction" className="size-6" />
                    <span className="font-medium">Conviction</span>
                  </span>
                ) : problem.author.isARK ? (
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <InstitutionalLogo type="ark" className="size-6" />
                    <span className="font-medium">ARK Invest</span>
                  </span>
                ) : problem.author.isPathlight ? (
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <InstitutionalLogo type="pathlight" className="size-6" />
                    <span className="font-medium">Pathlight</span>
                  </span>
                ) : (
                  <>
                    <img
                      src={problem.author.avatar || "/placeholder.svg"}
                      alt={problem.author.name}
                      className="h-6 w-6 rounded-full"
                    />
                    <span className="text-sm text-muted-foreground">{problem.author.name}</span>
                  </>
                )}
                <span className="text-muted-foreground/50">·</span>
                <span className="text-sm text-muted-foreground">{problem.timeAgo}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-sm">{problem.comments}</span>
                </div>
                {/* Bookmark button */}
                {onToggleSave && (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSaveClick}
                    className={cn(
                      "p-1 rounded-md transition-colors",
                      isSaved
                        ? "text-orange-500 hover:text-orange-600"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                    title={isSaved ? "Remove from saved" : "Save for later"}
                  >
                    <Bookmark className={cn("h-4 w-4", isSaved && "fill-current")} />
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
