"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { NavigationHeader } from "@/components/navigation-header"
import { ProblemCard } from "@/components/reusable-problem-card"
import { Flame, Clock, ChevronDown, Plus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface CategoryPageProps {
  slug: string
  categoryData: {
    name: string
    description: string
    color: string
    gradient: string
    textColor: string
    relatedCategories: string[]
  }
}

// Mock problem data for the category
const MOCK_PROBLEMS = [
  {
    id: "1",
    title: "AI agents need better memory systems for long-term context retention",
    elevatorPitch:
      "Current AI systems struggle to maintain context across multiple interactions. We need breakthrough memory architectures that can store and retrieve relevant information efficiently over weeks or months.",
    category: "AI & infrastructure",
    upvotes: 234,
    commentCount: 45,
    builderCount: 12,
    investorCount: 8,
    author: { username: "techfounder", avatarUrl: "" },
    isAnonymous: false,
    createdAt: new Date(Date.now() - 3600000 * 5),
  },
  {
    id: "2",
    title: "Carbon capture technology is too expensive for widespread adoption",
    elevatorPitch:
      "While carbon capture tech exists, the cost per ton makes it impractical at scale. We need innovations that reduce costs by 10x to make meaningful climate impact.",
    category: "Climate tech",
    upvotes: 189,
    commentCount: 67,
    builderCount: 23,
    investorCount: 15,
    author: { username: "climatehacker", avatarUrl: "" },
    isAnonymous: false,
    createdAt: new Date(Date.now() - 3600000 * 12),
  },
  {
    id: "3",
    title: "Remote teams lack effective async communication tools",
    elevatorPitch:
      "Video calls don't work across time zones and email is too slow. We need better tools for asynchronous collaboration that maintain team cohesion and productivity.",
    category: "Future of work",
    upvotes: 156,
    commentCount: 34,
    builderCount: 18,
    investorCount: 6,
    isAnonymous: true,
    createdAt: new Date(Date.now() - 3600000 * 24),
  },
  {
    id: "4",
    title: "Mental health support is inaccessible in underserved communities",
    elevatorPitch:
      "Millions lack access to quality mental health care due to cost, stigma, and availability. We need scalable solutions that bring therapy and support to those who need it most.",
    category: "Health & wellness",
    upvotes: 298,
    commentCount: 89,
    builderCount: 31,
    investorCount: 19,
    author: { username: "healthtech", avatarUrl: "" },
    isAnonymous: false,
    createdAt: new Date(Date.now() - 3600000 * 48),
  },
  {
    id: "5",
    title: "Creators struggle to monetize niche audiences under 10k followers",
    elevatorPitch:
      "Most monetization tools require massive audiences. We need platforms that enable micro-creators to earn sustainable income from highly engaged niche communities.",
    category: "Creator economy",
    upvotes: 211,
    commentCount: 52,
    builderCount: 27,
    investorCount: 11,
    author: { username: "contentcreator", avatarUrl: "" },
    isAnonymous: false,
    createdAt: new Date(Date.now() - 3600000 * 72),
  },
]

const STATUS_OPTIONS = ["All", "Being Built", "Solved"]
const SORT_OPTIONS = ["Most upvoted", "Most recent", "Most discussed"]

// Category name mappings for display
const CATEGORY_NAMES: Record<string, string> = {
  "ai-infrastructure": "AI & infrastructure",
  "climate-tech": "Climate tech",
  "creator-economy": "Creator economy",
  "niche-markets": "Niche markets",
  "health-wellness": "Health & wellness",
  "future-of-work": "Future of work",
  "world-of-atoms": "World of atoms",
  moonshots: "Moonshots",
  education: "Education",
  longevity: "Longevity",
}

export function CategoryPage({ slug, categoryData }: CategoryPageProps) {
  const [activeTab, setActiveTab] = useState<"trending" | "new">("trending")
  const [status, setStatus] = useState("All")
  const [sortBy, setSortBy] = useState("Most upvoted")

  // Filter problems for this category
  const categoryProblems = MOCK_PROBLEMS

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader variant="feed" />

      {/* Category Header with Gradient */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={cn("relative border-b border-border/40 bg-gradient-to-b", categoryData.gradient)}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="relative mx-auto max-w-7xl px-6 py-12 sm:py-16 md:py-20">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-3xl"
          >
            <h1
              className={cn("text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4", categoryData.textColor)}
            >
              {categoryData.name}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6">{categoryData.description}</p>
            <div className="flex items-center gap-4 flex-wrap">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">142 problems</span> in this category
              </p>
              <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90 gap-1.5">
                <Plus className="h-4 w-4" />
                Submit Problem
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="sticky top-16 z-40 border-b border-border/40 bg-background/95 backdrop-blur-sm"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-14 items-center justify-between gap-4">
            {/* Tabs */}
            <div className="flex items-center gap-2">
              <Button
                variant={activeTab === "trending" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("trending")}
                className="h-8"
              >
                <Flame className="h-4 w-4 mr-1.5" />
                Trending
              </Button>
              <Button
                variant={activeTab === "new" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("new")}
                className="h-8"
              >
                <Clock className="h-4 w-4 mr-1.5" />
                New
              </Button>
            </div>

            {/* Filter dropdowns */}
            <div className="flex items-center gap-2">
              {/* Status filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 hidden sm:flex bg-transparent">
                    Status: {status}
                    <ChevronDown className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  {STATUS_OPTIONS.map((option) => (
                    <DropdownMenuItem key={option} onClick={() => setStatus(option)}>
                      {option}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Sort dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 bg-transparent">
                    <span className="hidden sm:inline">Sort</span>
                    <ChevronDown className="h-3.5 w-3.5 sm:ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {SORT_OPTIONS.map((option) => (
                    <DropdownMenuItem key={option} onClick={() => setSortBy(option)}>
                      {option}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          {/* Problem Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            {categoryProblems.map((problem, index) => (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <ProblemCard problem={problem} variant="compact" />
              </motion.div>
            ))}

            {/* Load More Button */}
            <div className="flex justify-center pt-8">
              <Button variant="outline" size="lg">
                Load more problems
              </Button>
            </div>
          </motion.div>

          {/* Sidebar - Related Categories */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="sticky top-32 space-y-6">
              {/* Related Categories */}
              <div className="rounded-xl border border-border/50 bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Explore more</h3>
                <div className="space-y-2">
                  {categoryData.relatedCategories.map((relatedSlug) => {
                    const relatedName = CATEGORY_NAMES[relatedSlug]
                    return (
                      <Link key={relatedSlug} href={`/category/${relatedSlug}`}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
                        >
                          {relatedName}
                        </Button>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Stats Card */}
              <div className="rounded-xl border border-border/50 bg-card p-6">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Category Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total problems</span>
                    <span className="text-lg font-semibold text-foreground">142</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Being built</span>
                    <span className="text-lg font-semibold text-orange-500">38</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Solved</span>
                    <span className="text-lg font-semibold text-emerald-500">12</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  )
}
