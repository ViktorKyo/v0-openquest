"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ChevronUp, MessageCircle, Hammer, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { AuthorIntentTags, type Involvement, type WantBuildBlocker, type WantToWorkInvolvement, type AlreadyBuildingSupport } from "@/components/author-intent-tags"

interface ProblemCardProps {
  problem: {
    id: string
    title: string
    elevatorPitch: string
    category: string
    upvotes: number
    commentCount: number
    builderCount: number
    investorCount: number
    author?: { username: string; avatarUrl: string }
    isAnonymous: boolean
    createdAt: Date
    // Author intent fields
    involvement?: Involvement
    wantBuildBlocker?: WantBuildBlocker
    wantToWorkInvolvement?: WantToWorkInvolvement
    alreadyBuildingSupport?: AlreadyBuildingSupport[]
  }
  variant?: "compact" | "detailed"
  onUpvote?: () => void
  isUpvoted?: boolean
}

// Category color mappings
const categoryColors: Record<string, string> = {
  "AI & infrastructure": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Climate tech": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Creator economy": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Moonshots: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Health & wellness": "bg-pink-500/10 text-pink-400 border-pink-500/20",
  "Niche markets": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Education: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
}

function getTimeAgo(date: Date): string {
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return "just now"
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return `${Math.floor(seconds / 604800)}w ago`
}

export function ProblemCard({ problem, variant = "compact", onUpvote, isUpvoted: externalUpvoted }: ProblemCardProps) {
  const [internalUpvoted, setInternalUpvoted] = useState(false)
  const [upvoteCount, setUpvoteCount] = useState(problem.upvotes)

  const isUpvoted = externalUpvoted !== undefined ? externalUpvoted : internalUpvoted

  const handleUpvote = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (onUpvote) {
      onUpvote()
    } else {
      if (internalUpvoted) {
        setUpvoteCount((prev) => prev - 1)
      } else {
        setUpvoteCount((prev) => prev + 1)
      }
      setInternalUpvoted(!internalUpvoted)
    }
  }

  const timeAgo = getTimeAgo(problem.createdAt)
  const categoryColor = categoryColors[problem.category] || "bg-gray-500/10 text-gray-400 border-gray-500/20"
  const isCompact = variant === "compact"
  const authorDisplay = problem.isAnonymous ? "Anonymous" : problem.author?.username || "Anonymous"

  return (
    <Link href={`/problem/${problem.id}`}>
      <Card
        className={cn(
          "group relative overflow-hidden border-border/50 bg-card transition-all duration-200 hover:border-border hover:shadow-lg hover:shadow-accent/5 cursor-pointer",
          isCompact ? "py-0" : "py-0",
        )}
      >
        <div className={cn("flex gap-3", isCompact ? "p-4" : "p-5 sm:p-6")}>
          {/* Upvote Button */}
          <motion.button
            whileTap={{ scale: 0.9, rotate: -2 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleUpvote}
            className={cn(
              "flex flex-shrink-0 flex-col items-center justify-center rounded-lg border-2 transition-all duration-200",
              isCompact ? "h-[40px] w-[40px]" : "h-[56px] w-[56px]",
              isUpvoted
                ? "border-orange-500/50 bg-orange-500/10 text-orange-500 shadow-sm shadow-orange-500/20"
                : "border-border/60 bg-muted/50 text-muted-foreground hover:border-orange-500/30 hover:bg-orange-500/5 hover:text-orange-500/80",
            )}
          >
            <motion.div
              animate={isUpvoted ? { rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <ChevronUp className={cn(isCompact ? "h-4 w-4" : "h-5 w-5")} />
            </motion.div>
            <span className={cn("font-semibold", isCompact ? "text-xs" : "text-sm")}>{upvoteCount}</span>
          </motion.button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h3
              className={cn(
                "font-semibold text-foreground group-hover:text-accent transition-colors leading-tight",
                isCompact ? "text-base line-clamp-2 mb-1.5" : "text-lg line-clamp-2 mb-2",
              )}
            >
              {problem.title}
            </h3>

            {/* Metadata Row */}
            <div className="flex items-center gap-2 flex-wrap mb-2">
              {/* Category Badge */}
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                className={cn(
                  "inline-flex rounded-full border px-2 py-0.5 text-xs font-medium transition-all hover:scale-105",
                  categoryColor,
                )}
              >
                {problem.category}
              </button>
              <span className="text-muted-foreground/50">·</span>
              <span className="text-xs text-muted-foreground">{timeAgo}</span>
              <span className="text-muted-foreground/50">·</span>
              <span className="text-xs text-muted-foreground">@{authorDisplay}</span>
            </div>

            {/* Description */}
            <p
              className={cn(
                "text-sm leading-relaxed text-muted-foreground",
                isCompact ? "line-clamp-2 mb-2" : "line-clamp-3 mb-3",
              )}
            >
              {problem.elevatorPitch}
            </p>

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

            {/* Engagement Row */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5 transition-colors hover:text-foreground">
                <MessageCircle className="h-3.5 w-3.5" />
                <span>{problem.commentCount}</span>
              </div>
              <div className="flex items-center gap-1.5 transition-colors hover:text-foreground">
                <Hammer className="h-3.5 w-3.5" />
                <span>{problem.builderCount}</span>
              </div>
              <div className="flex items-center gap-1.5 transition-colors hover:text-foreground">
                <DollarSign className="h-3.5 w-3.5" />
                <span>{problem.investorCount}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
