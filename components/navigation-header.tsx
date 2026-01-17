"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Compass, Search, ChevronDown, User, Plus, Menu } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  { name: "All Categories", color: "bg-gray-500" },
  { name: "Moonshots", color: "bg-purple-500" },
  { name: "Climate tech", color: "bg-emerald-500" },
  { name: "AI & infrastructure", color: "bg-indigo-500" },
  { name: "Creator economy", color: "bg-pink-500" },
  { name: "Niche markets", color: "bg-blue-500" },
  { name: "Health & wellness", color: "bg-teal-500" },
  { name: "Education", color: "bg-yellow-500" },
  { name: "Longevity", color: "bg-cyan-500" },
  { name: "Future of work", color: "bg-green-500" },
]

interface NavigationHeaderProps {
  variant?: "default" | "feed"
  isLoggedIn?: boolean
}

export function NavigationHeader({ variant = "default", isLoggedIn = false }: NavigationHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const showSearch = variant === "feed"
  const showCategories = variant === "feed"

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Compass className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground hidden sm:inline">OpenQuest</span>
          </Link>

          {/* Desktop Search Bar */}
          {showSearch && (
            <div className="relative flex-1 max-w-md hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 pl-9 pr-16 bg-secondary/50 border-border/50 focus-visible:ring-2 focus-visible:ring-orange-500"
              />
              <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border border-border/50 bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 lg:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          )}

          {/* Mobile Search Icon */}
          {showSearch && (
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
          )}

          {/* Desktop Navigation - Default Variant */}
          {variant === "default" && (
            <nav className="hidden items-center gap-8 md:flex">
              <Link href="/feed" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Browse
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                How it works
              </Link>
              <Link
                href="#categories"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Categories
              </Link>
            </nav>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Categories Dropdown - Desktop Only for Feed Variant */}
            {showCategories && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hidden md:flex text-muted-foreground gap-1">
                    Categories
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {CATEGORIES.map((category) => (
                    <DropdownMenuItem key={category.name} className="flex items-center gap-2">
                      <div className={cn("size-2 rounded-full", category.color)} />
                      <span>{category.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Submit Problem Button */}
            <Button asChild size="sm" className="bg-foreground text-background hover:bg-foreground/90 gap-1.5">
              <Link href="/submit">
                <Plus className="h-4 w-4 hidden sm:inline" />
                <span className="hidden sm:inline">Submit Problem</span>
                <span className="sm:hidden">Submit</span>
              </Link>
            </Button>

            {/* User Menu */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full" aria-label="User menu">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>My Problems</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <Separator className="my-1" />
                  <DropdownMenuItem>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm" className="hidden md:flex text-muted-foreground">
                Sign In
              </Button>
            )}
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Sheet */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-[300px] sm:w-[350px]">
          <SheetHeader className="text-left">
            <SheetTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Compass className="h-5 w-5 text-primary-foreground" />
              </div>
              OpenQuest
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-6 mt-6">
            {/* Search in Mobile Menu */}
            {showSearch && (
              <div className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input type="text" placeholder="Search problems..." className="pl-9" />
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <nav className="flex flex-col gap-4">
              {variant === "default" ? (
                <>
                  <Link
                    href="/feed"
                    className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Browse Problems
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    How it works
                  </Link>
                </>
              ) : (
                <Link
                  href="/"
                  className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
              )}
            </nav>

            <Separator />

            {/* Categories in Mobile Menu */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Categories</h3>
              <div className="flex flex-col gap-1">
                {CATEGORIES.map((category) => (
                  <button
                    key={category.name}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className={cn("size-3 rounded-full flex-shrink-0", category.color)} />
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {/* User Actions in Mobile Menu */}
            {isLoggedIn ? (
              <div className="flex flex-col gap-2">
                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" asChild>
                  <Link href="/profile">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                  My Problems
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                  Settings
                </Button>
                <Separator className="my-2" />
                <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button className="w-full" variant="default">
                Sign In
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
