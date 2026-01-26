"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type SortOption = "Most upvoted" | "Most recent" | "Most discussed"
type TabOption = "trending" | "new"

interface FeedFilterContextType {
  activeTab: TabOption
  setActiveTab: (tab: TabOption) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  sortOption: SortOption
  setSortOption: (option: SortOption) => void
}

const FeedFilterContext = createContext<FeedFilterContextType | undefined>(undefined)

export function FeedFilterProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabOption>("trending")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [sortOption, setSortOption] = useState<SortOption>("Most upvoted")

  return (
    <FeedFilterContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedCategory,
        setSelectedCategory,
        sortOption,
        setSortOption,
      }}
    >
      {children}
    </FeedFilterContext.Provider>
  )
}

export function useFeedFilters() {
  const context = useContext(FeedFilterContext)
  if (context === undefined) {
    throw new Error("useFeedFilters must be used within a FeedFilterProvider")
  }
  return context
}
