"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronUp, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface Problem {
  id: number
  title: string
  description: string
  category: string
  upvotes: number
  comments: number
  author: {
    name: string
    avatar: string
  }
  timeAgo: string
  categoryColor: string
}

export function ProblemCard({ problem }: { problem: Problem }) {
  const [upvoted, setUpvoted] = useState(false)
  const [upvoteCount, setUpvoteCount] = useState(problem.upvotes)

  const handleUpvote = () => {
    if (upvoted) {
      setUpvoteCount(upvoteCount - 1)
    } else {
      setUpvoteCount(upvoteCount + 1)
    }
    setUpvoted(!upvoted)
  }

  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-accent/5">
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
              <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium", problem.categoryColor)}>
                {problem.category}
              </span>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
              {problem.title}
            </h3>
            <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{problem.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={problem.author.avatar || "/placeholder.svg"}
                  alt={problem.author.name}
                  className="h-6 w-6 rounded-full"
                />
                <span className="text-sm text-muted-foreground">{problem.author.name}</span>
                <span className="text-muted-foreground/50">·</span>
                <span className="text-sm text-muted-foreground">{problem.timeAgo}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">{problem.comments}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
