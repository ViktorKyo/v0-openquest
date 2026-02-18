"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface NavSectionLinkProps {
  href: string
  label: string
  tooltip: string
  className?: string
}

export function NavSectionLink({ href, label, tooltip, className }: NavSectionLinkProps) {
  return (
    <span className={cn("group relative inline-flex items-center", className)}>
      <Link
        href={href}
        className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
      >
        {label}
      </Link>
      <span
        role="tooltip"
        className="pointer-events-none absolute top-full left-1/2 z-50 mt-2 w-72 -translate-x-1/2 rounded-lg border border-border/70 bg-background/95 px-3 py-2 text-xs leading-relaxed text-muted-foreground opacity-0 shadow-xl backdrop-blur transition-all duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {tooltip}
      </span>
    </span>
  )
}
