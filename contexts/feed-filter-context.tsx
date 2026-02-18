"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type SortOption = "Most upvoted" | "Most recent" | "Most discussed"
type TabOption = "trending" | "new" | "popular"
type SourceOption = "All Sources" | "VC Partners" | "Community"

interface FeedFilterContextType {
  activeTab: TabOption
  setActiveTab: (tab: TabOption) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  sortOption: SortOption
  setSortOption: (option: SortOption) => void
  selectedSource: SourceOption
  setSelectedSource: (source: SourceOption) => void
  // Search
  searchQuery: string
  setSearchQuery: (query: string) => void
  debouncedSearchQuery: string
  isSearching: boolean
  clearSearch: () => void
}

const FeedFilterContext = createContext<FeedFilterContextType | undefined>(undefined)

export function FeedFilterProvider({
  children,
  initialSearch = "",
  initialCategory = "All Categories",
  initialSort = "Most upvoted" as SortOption,
  initialSource = "All Sources" as SourceOption,
}: {
  children: ReactNode
  initialSearch?: string
  initialCategory?: string
  initialSort?: SortOption
  initialSource?: SourceOption
}) {
  const [activeTab, setActiveTab] = useState<TabOption>("trending")
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [sortOption, setSortOption] = useState<SortOption>(initialSort)
  const [selectedSource, setSelectedSource] = useState<SourceOption>(initialSource)

  // Search state
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(initialSearch)
  const [isSearching, setIsSearching] = useState(false)

  // Debounce search query (300ms)
  useEffect(() => {
    if (searchQuery !== debouncedSearchQuery) {
      setIsSearching(true)
    }

    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
      setIsSearching(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, debouncedSearchQuery])

  const clearSearch = () => {
    setSearchQuery("")
    setDebouncedSearchQuery("")
    setIsSearching(false)
  }

  return (
    <FeedFilterContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedCategory,
        setSelectedCategory,
        sortOption,
        setSortOption,
        selectedSource,
        setSelectedSource,
        searchQuery,
        setSearchQuery,
        debouncedSearchQuery,
        isSearching,
        clearSearch,
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
