"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ChevronUp, MessageCircle, Hammer, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { YCBadge, YCQuarterTag } from "@/components/yc-badge"
import { WeekendFundBadge, WeekendFundDateTag } from "@/components/weekend-fund-badge"

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
  }
  timeAgo: string
  isYCRFS?: boolean
  ycQuarter?: string
  isWeekendFundRFS?: boolean
  wfPublishedDate?: string
}

export function FeedProblemCard({ problem }: { problem: FeedProblem }) {
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

  return (
    <Card
      className="group relative overflow-hidden border-border/50 bg-card transition-all duration-200 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 py-0 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex gap-4 p-4 sm:p-5">
        {/* Upvote button - Product Hunt style */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleUpvote}
          className={cn(
            "flex h-16 w-14 flex-shrink-0 flex-col items-center justify-center rounded-lg border-2 transition-all duration-200",
            upvoted
              ? "border-orange-500/50 bg-orange-500/10 text-orange-500 shadow-sm shadow-orange-500/20"
              : "border-border/60 bg-secondary/50 text-muted-foreground hover:border-orange-500/30 hover:bg-orange-500/5 hover:text-orange-500/80",
          )}
        >
          <ChevronUp className={cn("h-6 w-6 transition-transform", upvoted && "scale-110")} />
          <span className="text-sm font-semibold">{upvoteCount}</span>
        </motion.button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Category badge and YC badge */}
          <div className="mb-2.5 flex items-center gap-2 flex-wrap">
            <button
              onClick={handleCategoryClick}
              className={cn(
                "inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors hover:bg-opacity-80",
                problem.categoryColor,
              )}
            >
              {problem.category}
            </button>
            {problem.isYCRFS && <YCBadge variant="compact" />}
            {problem.ycQuarter && <YCQuarterTag quarter={problem.ycQuarter} />}
            {problem.isWeekendFundRFS && <WeekendFundBadge variant="compact" />}
            {problem.wfPublishedDate && <WeekendFundDateTag date={problem.wfPublishedDate} />}
          </div>

          {/* Title */}
          <h3 className="mb-2 text-xl font-bold text-foreground line-clamp-2 leading-tight group-hover:text-accent transition-colors">
            {problem.title}
          </h3>

          {/* Metadata */}
          <div className="mb-2.5 flex items-center gap-2 text-sm text-muted-foreground">
            {problem.author.isYC ? (
              <span className="flex items-center gap-1.5">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-orange-500 text-[10px] font-bold text-white">
                  Y
                </span>
                <span className="font-medium">{problem.author.name}</span>
              </span>
            ) : problem.author.isWeekendFund ? (
              <span className="flex items-center gap-1.5">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-[10px] font-bold text-white">
                  ☀️
                </span>
                <span className="font-medium">{problem.author.name}</span>
              </span>
            ) : (
              <span>{problem.author.isAnonymous ? "Anonymous" : problem.author.name}</span>
            )}
            <span className="text-muted-foreground/50">·</span>
            <span>{problem.timeAgo}</span>
          </div>

          {/* Description */}
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2 sm:line-clamp-3">
            {problem.description}
          </p>

          {/* Footer stats */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5 transition-colors hover:text-foreground">
              <MessageCircle className="h-4 w-4" />
              <span>{problem.comments}</span>
            </div>
            <div className="flex items-center gap-1.5 transition-colors hover:text-foreground">
              <Hammer className="h-4 w-4" />
              <span>{problem.building} building</span>
            </div>
            <div className="flex items-center gap-1.5 transition-colors hover:text-foreground">
              <DollarSign className="h-4 w-4" />
              <span>{problem.investors} investors</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
