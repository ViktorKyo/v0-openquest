"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown, Flame, Clock } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const categories = [
  "All Categories",
  "Moonshots",
  "Climate tech",
  "AI & infrastructure",
  "Creator economy",
  "Niche markets",
  "Health & wellness",
  "Education",
]

const sortOptions = ["Most upvoted", "Most recent", "Most discussed"]

export function FeedFilters() {
  const [activeTab, setActiveTab] = useState<"trending" | "new">("trending")

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
          </div>

          {/* Filter dropdowns */}
          <div className="flex items-center gap-2">
            {/* Category filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 hidden sm:flex bg-transparent">
                  Category
                  <ChevronDown className="ml-1 h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {categories.map((category) => (
                  <DropdownMenuItem key={category}>{category}</DropdownMenuItem>
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
                {sortOptions.map((option) => (
                  <DropdownMenuItem key={option}>{option}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
