"use client"

import { useMemo } from "react"
import { Flame, Clock, TrendingUp, ArrowRight } from "lucide-react"
import { FeedProblemCard } from "@/components/feed-problem-card"
import { getCategoryIcon, getCategoryDescription } from "@/lib/category-icons"
import { useFeedFilters } from "@/contexts/feed-filter-context"
import type { LucideIcon } from "lucide-react"

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
  createdAt: Date | string
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

// Convert to sentence case: "World of Atoms" → "World of atoms"
// Keeps first word, acronyms (<=3 chars all-caps), and operators (&) unchanged
function toSentenceCase(str: string): string {
  const words = str.split(" ")
  return words
    .map((word, i) => {
      if (i === 0) return word
      if (word === "&") return word
      if (word === word.toUpperCase() && word.length <= 3) return word
      return word.charAt(0).toLowerCase() + word.slice(1)
    })
    .join(" ")
}

interface FeedSectionsProps {
  problems: FeedProblem[]
  isSaved: (id: string) => boolean
  onToggleSave: (id: string) => void
  onUpvote: (id: string) => Promise<{ hasUpvoted: boolean; upvoteCount: number } | null>
  sectionsData?: {
    trending: FeedProblem[]
    recentlyAdded: FeedProblem[]
    popular: FeedProblem[]
    categoryGroups: Array<{ category: string; problems: FeedProblem[] }>
  }
}

// Section header + card list
function FeedSection({
  title,
  subtitle,
  icon: Icon,
  problems,
  onSeeAll,
  seeAllLabel,
  isSaved,
  onToggleSave,
  onUpvote,
  isFirst = false,
}: {
  title: string
  subtitle: string
  icon: LucideIcon
  problems: FeedProblem[]
  onSeeAll: () => void
  seeAllLabel: string
  isSaved: (id: string) => boolean
  onToggleSave: (id: string) => void
  onUpvote: (id: string) => Promise<{ hasUpvoted: boolean; upvoteCount: number } | null>
  isFirst?: boolean
}) {
  if (problems.length === 0) return null

  return (
    <section className="mb-12">
      {/* Divider between sections (skip on first) */}
      {!isFirst && <div className="border-t border-border/40 mb-6" />}

      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
            <Icon className="h-[18px] w-[18px] text-foreground/70" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground leading-tight">{toSentenceCase(title)}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          </div>
        </div>
        <button
          onClick={onSeeAll}
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          {seeAllLabel}
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {problems.map((problem) => (
          <FeedProblemCard
            key={problem.id}
            problem={problem}
            isSaved={isSaved(String(problem.id))}
            onToggleSave={() => onToggleSave(String(problem.id))}
            onUpvote={() => onUpvote(String(problem.id))}
          />
        ))}
      </div>
    </section>
  )
}

export function FeedSections({ problems, isSaved, onToggleSave, onUpvote, sectionsData }: FeedSectionsProps) {
  const { setActiveTab, setSortOption, setSelectedCategory } = useFeedFilters()

  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  // Trending: Most upvoted from last 30 days
  const trending = useMemo(() => {
    if (sectionsData) return sectionsData.trending
    const recent = problems.filter((p) => {
      const d = p.createdAt instanceof Date ? p.createdAt : new Date(p.createdAt)
      return d >= thirtyDaysAgo
    })
    // If not enough recent problems, fall back to all
    const pool = recent.length >= 5 ? recent : problems
    return [...pool].sort((a, b) => b.upvotes - a.upvotes).slice(0, 5)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problems, sectionsData])

  // Recently added: Newest by date
  const recentlyAdded = useMemo(() => {
    if (sectionsData) return sectionsData.recentlyAdded
    return [...problems]
      .sort((a, b) => {
        const da = a.createdAt instanceof Date ? a.createdAt.getTime() : new Date(a.createdAt).getTime()
        const db = b.createdAt instanceof Date ? b.createdAt.getTime() : new Date(b.createdAt).getTime()
        return db - da
      })
      .slice(0, 5)
  }, [problems, sectionsData])

  // Most popular: Highest upvotes all-time
  const popular = useMemo(() => {
    if (sectionsData) return sectionsData.popular
    return [...problems].sort((a, b) => b.upvotes - a.upvotes).slice(0, 5)
  }, [problems, sectionsData])

  // Category sections: Top 3 per category (only categories with 2+ problems)
  const categoryGroups = useMemo(() => {
    if (sectionsData) return sectionsData.categoryGroups
    const groups = new Map<string, FeedProblem[]>()
    for (const p of problems) {
      const existing = groups.get(p.category) || []
      existing.push(p)
      groups.set(p.category, existing)
    }

    return Array.from(groups.entries())
      .filter(([, items]) => items.length >= 2)
      .map(([category, items]) => ({
        category,
        problems: [...items].sort((a, b) => b.upvotes - a.upvotes).slice(0, 3),
      }))
      .sort((a, b) => b.problems.length - a.problems.length)
  }, [problems, sectionsData])

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      {/* Trending */}
      <FeedSection
        title="Trending"
        subtitle="Most engaged problems right now"
        icon={Flame}
        problems={trending}
        onSeeAll={() => {
          setActiveTab("trending")
          setSortOption("Most upvoted")
        }}
        seeAllLabel="See all"
        isSaved={isSaved}
        onToggleSave={onToggleSave}
        onUpvote={onUpvote}
        isFirst
      />

      {/* Recently Added */}
      <FeedSection
        title="Recently Added"
        subtitle="Fresh problems just submitted"
        icon={Clock}
        problems={recentlyAdded}
        onSeeAll={() => {
          setActiveTab("new")
        }}
        seeAllLabel="See all"
        isSaved={isSaved}
        onToggleSave={onToggleSave}
        onUpvote={onUpvote}
      />

      {/* Most Popular */}
      <FeedSection
        title="Most Popular"
        subtitle="Highest upvoted problems of all time"
        icon={TrendingUp}
        problems={popular}
        onSeeAll={() => {
          setActiveTab("popular")
        }}
        seeAllLabel="See all"
        isSaved={isSaved}
        onToggleSave={onToggleSave}
        onUpvote={onUpvote}
      />

      {/* Category Sections */}
      {categoryGroups.map(({ category, problems: catProblems }) => {
        const config = getCategoryIcon(category)
        return (
          <FeedSection
            key={category}
            title={category}
            subtitle={getCategoryDescription(category)}
            icon={config.icon}
            problems={catProblems}
            onSeeAll={() => {
              setSelectedCategory(category)
              setActiveTab("trending")
            }}
            seeAllLabel="See all"
            isSaved={isSaved}
            onToggleSave={onToggleSave}
            onUpvote={onUpvote}
          />
        )
      })}
    </div>
  )
}
