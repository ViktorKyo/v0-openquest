"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Compass, Search, ChevronDown, User, X, Loader2, Check, Building2, Users, LogOut } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useFeedFilters } from "@/contexts/feed-filter-context"
import { useAuth } from "@/contexts/auth-context"

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

const sourceOptions = ["All Sources", "VC Partners", "Community"] as const

export function FeedHeader() {
  const {
    searchQuery,
    setSearchQuery,
    isSearching,
    clearSearch,
    activeTab,
    setActiveTab,
    selectedCategory,
    setSelectedCategory,
    selectedSource,
    setSelectedSource,
  } = useFeedFilters()
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const inputRef = useRef<HTMLInputElement>(null)

  // Keyboard shortcut: Cmd+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        inputRef.current?.focus()
      }
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        clearSearch()
        inputRef.current?.blur()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [clearSearch])

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-5xl px-6">
        {/* Row 1: Logo + Search + Submit + User */}
        <div className="flex h-14 items-center gap-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Compass className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground hidden sm:inline">OpenQuest</span>
          </Link>

          {/* Search bar — takes remaining space */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 pl-9 pr-16 bg-secondary/50 border-border/50 focus-visible:border-accent"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {isSearching ? (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              ) : searchQuery ? (
                <button
                  onClick={clearSearch}
                  className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : (
                <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border border-border/50 bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              )}
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90" asChild>
              <Link href="/submit">
                <span className="hidden sm:inline">Submit Problem</span>
                <span className="sm:hidden">Submit</span>
              </Link>
            </Button>

            {isLoading ? (
              <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
            ) : isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon-sm">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="flex flex-col space-y-1 p-2 leading-none">
                    {user.name && <p className="font-medium text-sm">{user.name}</p>}
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => logout()}
                    className="cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm" className="text-muted-foreground" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            )}
          </div>
        </div>

        {/* Row 2: Tabs + Filter dropdowns */}
        <div className="flex items-center justify-between pt-1 pb-3">
          {/* Tabs */}
          <nav className="flex items-center gap-0.5 overflow-x-auto">
            <button
              onClick={() => setActiveTab("trending")}
              className={cn(
                "px-3 py-1.5 text-sm rounded-lg transition-colors whitespace-nowrap",
                activeTab === "trending"
                  ? "bg-secondary font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Trending
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={cn(
                "px-3 py-1.5 text-sm rounded-lg transition-colors whitespace-nowrap",
                activeTab === "new"
                  ? "bg-secondary font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              New
            </button>
            <button
              onClick={() => setActiveTab("popular")}
              className={cn(
                "px-3 py-1.5 text-sm rounded-lg transition-colors whitespace-nowrap",
                activeTab === "popular"
                  ? "bg-secondary font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Popular
            </button>
          </nav>

          {/* Filter dropdowns */}
          <div className="flex items-center gap-2">
            {/* Source filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-muted-foreground rounded-lg hover:text-foreground transition-colors whitespace-nowrap">
                  {selectedSource === "All Sources" ? (
                    "Source"
                  ) : selectedSource === "VC Partners" ? (
                    <span className="flex items-center gap-1">
                      <Building2 className="h-3.5 w-3.5" />
                      VCs
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      Community
                    </span>
                  )}
                  <ChevronDown className="ml-0.5 h-3.5 w-3.5" />
                </button>
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

            {/* Category filter — hidden on very small screens */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-sm text-muted-foreground rounded-lg hover:text-foreground transition-colors whitespace-nowrap">
                  {selectedCategory === "All Categories" ? "Category" : selectedCategory}
                  <ChevronDown className="ml-0.5 h-3.5 w-3.5" />
                </button>
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
          </div>
        </div>
      </div>
    </header>
  )
}
