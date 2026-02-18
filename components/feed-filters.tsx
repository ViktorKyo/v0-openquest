"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown, Flame, Clock, TrendingUp, Check, Building2, Users } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useFeedFilters } from "@/contexts/feed-filter-context"

// Categories must match exactly what's in the data (case-sensitive)
const categories = [
  "All Categories",
  "AI & Infrastructure",
  "Climate Tech",
  "Future of Work",
  "Longevity",
  "Moonshots",
  "Rebuild Money",
  "World of Atoms",
  "Creator Economy",
  "Niche Markets",
  "Other",
]

const sortOptions = ["Most upvoted", "Most recent", "Most discussed"] as const

const sourceOptions = ["All Sources", "VC Partners", "Community"] as const

export function FeedFilters() {
  const { activeTab, setActiveTab, selectedCategory, setSelectedCategory, sortOption, setSortOption, selectedSource, setSelectedSource } = useFeedFilters()

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
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
            <Button
              variant={activeTab === "popular" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("popular")}
              className="h-8"
            >
              <TrendingUp className="h-4 w-4 mr-1.5" />
              Popular
            </Button>
          </div>

          {/* Filter dropdowns */}
          <div className="flex items-center gap-2">
            {/* Source filter (VC Partners vs Community) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 bg-transparent">
                  {selectedSource === "All Sources" ? (
                    <>
                      <span className="hidden sm:inline">Source</span>
                      <span className="sm:hidden">All</span>
                    </>
                  ) : selectedSource === "VC Partners" ? (
                    <>
                      <Building2 className="h-3.5 w-3.5 mr-1" />
                      <span className="hidden sm:inline">{selectedSource}</span>
                      <span className="sm:hidden">VCs</span>
                    </>
                  ) : (
                    <>
                      <Users className="h-3.5 w-3.5 mr-1" />
                      <span className="hidden sm:inline">{selectedSource}</span>
                      <span className="sm:hidden">People</span>
                    </>
                  )}
                  <ChevronDown className="ml-1 h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {sourceOptions.map((source) => (
                  <DropdownMenuItem
                    key={source}
                    onClick={() => setSelectedSource(source)}
                    className="cursor-pointer flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      {source === "VC Partners" && <Building2 className="h-4 w-4" />}
                      {source === "Community" && <Users className="h-4 w-4" />}
                      {source}
                    </span>
                    {selectedSource === source && <Check className="h-4 w-4 ml-2" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Category filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 hidden sm:flex bg-transparent">
                  {selectedCategory === "All Categories" ? "Category" : selectedCategory}
                  <ChevronDown className="ml-1 h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 max-h-[300px] overflow-y-auto">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="cursor-pointer flex items-center justify-between"
                  >
                    {category}
                    {selectedCategory === category && <Check className="h-4 w-4 ml-2" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 bg-transparent">
                  <span className="hidden sm:inline">{sortOption}</span>
                  <span className="sm:hidden">Sort</span>
                  <ChevronDown className="h-3.5 w-3.5 sm:ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => setSortOption(option)}
                    className="cursor-pointer flex items-center justify-between"
                  >
                    {option}
                    {sortOption === option && <Check className="h-4 w-4 ml-2" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
