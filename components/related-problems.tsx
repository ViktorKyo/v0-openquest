"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { ChevronUp, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { allProblems } from "@/data/mock-problems"
import { InstitutionalLogo } from "@/components/institutional-author"
import { getTimeAgo, getCategoryColor } from "@/lib/formatters"
import type { BaseProblem } from "@/types/problem"

interface RelatedProblem {
  id: string
  title: string
  description: string
  category: string
  categoryColor: string
  upvotes: number
  author: {
    name: string
    isYC?: boolean
    isWeekendFund?: boolean
    isConviction?: boolean
    isARK?: boolean
    isPathlight?: boolean
    isAccel?: boolean
  }
  timeAgo: string
}

interface RelatedProblemsProps {
  currentProblemId: string
  category: string
}

export function RelatedProblems({ currentProblemId, category }: RelatedProblemsProps) {
  const [problems, setProblems] = useState<RelatedProblem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Fetch related problems
  useEffect(() => {
    const fetchRelated = async () => {
      setIsLoading(true)

      // First try to get from mock data (same category, excluding current)
      const mockRelated = allProblems
        .filter(
          (p) =>
            String(p.id) !== String(currentProblemId) &&
            p.category.toLowerCase() === category.toLowerCase()
        )
        .slice(0, 8)
        .map((problem) => {
          // Cast to BaseProblem to access VC partner flags
          const p = problem as BaseProblem
          return {
            id: String(p.id),
            title: p.title,
            description: p.elevatorPitch,
            category: p.category,
            categoryColor: getCategoryColor(p.category),
            upvotes: p.upvotes,
            author: {
              name: p.author.username || p.author.name,
              isYC: p.author.isYC,
              isWeekendFund: p.author.isWeekendFund,
              isConviction: p.author.isConviction,
              isARK: p.author.isARK,
              isPathlight: p.author.isPathlight,
              isAccel: p.author.isAccel,
            },
            timeAgo: getTimeAgo(p.createdAt),
          }
        })

      if (mockRelated.length > 0) {
        setProblems(mockRelated)
        setIsLoading(false)
        return
      }

      // Try API for database problems
      try {
        const res = await fetch(
          `/api/problems/search?category=${encodeURIComponent(category)}&limit=8`
        )
        if (res.ok) {
          const data = await res.json()
          const apiProblems = data.problems
            .filter((p: any) => String(p.id) !== String(currentProblemId))
            .slice(0, 8)
            .map((p: any) => ({
              id: p.id,
              title: p.title,
              description: p.description || p.elevatorPitch,
              category: p.category,
              categoryColor: getCategoryColor(p.category),
              upvotes: p.upvotes || 0,
              author: {
                name: p.author?.name || "Anonymous",
                isYC: p.author?.isYC || p.isYCRFS,
                isWeekendFund: p.author?.isWeekendFund || p.isWeekendFundRFS,
                isConviction: p.author?.isConviction || p.isConviction,
                isARK: p.author?.isARK || p.isARK,
                isPathlight: p.author?.isPathlight || p.isPathlight,
                isAccel: p.author?.isAccel || p.isAccel,
              },
              timeAgo: getTimeAgo(new Date(p.createdAt)),
            }))

          if (apiProblems.length > 0) {
            setProblems(apiProblems)
          }
        }
      } catch (error) {
        console.error("Error fetching related problems:", error)
      }

      setIsLoading(false)
    }

    fetchRelated()
  }, [currentProblemId, category])

  // Handle scroll buttons
  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    updateScrollButtons()
    const ref = scrollRef.current
    if (ref) {
      ref.addEventListener("scroll", updateScrollButtons)
      return () => ref.removeEventListener("scroll", updateScrollButtons)
    }
  }, [problems])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 316 // Card width (300px) + gap (16px)
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  // Don't render if no related problems
  if (!isLoading && problems.length === 0) {
    return null
  }

  return (
    <Card className="mt-8 overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">More in {category}</h2>
          {problems.length > 2 && (
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={cn(
                  "p-2 rounded-lg border transition-colors",
                  canScrollLeft
                    ? "border-border bg-secondary hover:bg-secondary/80 text-foreground"
                    : "border-border/50 bg-secondary/30 text-muted-foreground/50 cursor-not-allowed"
                )}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={cn(
                  "p-2 rounded-lg border transition-colors",
                  canScrollRight
                    ? "border-border bg-secondary hover:bg-secondary/80 text-foreground"
                    : "border-border/50 bg-secondary/30 text-muted-foreground/50 cursor-not-allowed"
                )}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {problems.map((problem) => (
              <Link
                key={problem.id}
                href={`/problem/${problem.id}`}
                className="flex-shrink-0 w-[280px] sm:w-[300px] snap-start"
              >
                <Card className="h-full p-3 sm:p-4 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-200 cursor-pointer group">
                  {/* Upvotes badge */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-secondary/50 text-muted-foreground">
                      <ChevronUp className="h-4 w-4" />
                      <span className="text-sm font-medium">{problem.upvotes}</span>
                    </div>
                    <span
                      className={cn(
                        "inline-flex rounded-full border px-2 py-0.5 text-xs font-medium",
                        problem.categoryColor
                      )}
                    >
                      {problem.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-accent transition-colors">
                    {problem.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {problem.description}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {problem.author.isYC ? (
                      <span className="flex items-center gap-1">
                        <InstitutionalLogo type="yc" className="size-4" />
                        <span className="font-medium">Y Combinator</span>
                      </span>
                    ) : problem.author.isWeekendFund ? (
                      <span className="flex items-center gap-1">
                        <InstitutionalLogo type="weekend-fund" className="size-4" />
                        <span className="font-medium">Weekend Fund</span>
                      </span>
                    ) : problem.author.isConviction ? (
                      <span className="flex items-center gap-1">
                        <InstitutionalLogo type="conviction" className="size-4" />
                        <span className="font-medium">Conviction</span>
                      </span>
                    ) : problem.author.isARK ? (
                      <span className="flex items-center gap-1">
                        <InstitutionalLogo type="ark" className="size-4" />
                        <span className="font-medium">ARK Invest</span>
                      </span>
                    ) : problem.author.isPathlight ? (
                      <span className="flex items-center gap-1">
                        <InstitutionalLogo type="pathlight" className="size-4" />
                        <span className="font-medium">Pathlight</span>
                      </span>
                    ) : problem.author.isAccel ? (
                      <span className="flex items-center gap-1">
                        <InstitutionalLogo type="accel" className="size-4" />
                        <span className="font-medium">Accel</span>
                      </span>
                    ) : (
                      <span>{problem.author.name}</span>
                    )}
                    <span className="text-muted-foreground/50">·</span>
                    <span>{problem.timeAgo}</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}
