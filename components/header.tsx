"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Compass, User, LogOut, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

interface HeaderProps {
  compact?: boolean
  hideSubmitButton?: boolean
  maxWidth?: string
}

export function Header({ compact = false, hideSubmitButton = false, maxWidth = "max-w-7xl" }: HeaderProps) {
  const { user, isAuthenticated, isLoading, logout } = useAuth()

  const getInitials = (name: string | null) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl"
    >
      <div className={`mx-auto flex h-16 ${maxWidth} items-center justify-between px-6`}>
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Compass className="h-5 w-5 text-primary-foreground" />
          </div>
          {!compact && <span className="text-lg font-semibold text-foreground">OpenQuest</span>}
        </Link>

        {compact ? (
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/feed" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Browse
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus:outline-none">
                Resources <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link href="/accelerators">Accelerators</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/landscape">VCs</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/fellowships">Fellowships</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/residencies">Residencies</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/blog">Blog</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/categories">Categories</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              How it works
            </Link>
          </nav>
        ) : (
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/feed" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Browse
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus:outline-none">
                Resources <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link href="/accelerators">Accelerators</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/landscape">VCs</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/fellowships">Fellowships</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/residencies">Residencies</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/blog">Blog</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/categories">Categories</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              How it works
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-3">
          {isLoading ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
          ) : isAuthenticated && user ? (
            <>
              {!hideSubmitButton && (
                <Button size="sm" asChild>
                  <Link href="/submit">Submit a Problem</Link>
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatarUrl || undefined} alt={user.name || "User"} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {user.name && <p className="font-medium">{user.name}</p>}
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
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
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="text-muted-foreground" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              {!hideSubmitButton && (
                <Button size="sm" asChild>
                  <Link href="/submit">Submit a Problem</Link>
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </motion.header>
  )
}
