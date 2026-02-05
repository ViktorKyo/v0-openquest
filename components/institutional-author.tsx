import { cn } from "@/lib/utils"

interface InstitutionalAuthorProps {
  type: "yc" | "weekend-fund"
  year?: string // e.g., "2026", "2025"
  quarter?: string // e.g., "Spring 2026", "Fall 2025"
  size?: "sm" | "md" | "lg"
  className?: string
}

/**
 * Minimalistic institutional author display for YC, Weekend Fund, etc.
 * Shows a clean logo with the year below
 */
export function InstitutionalAuthor({
  type,
  year,
  quarter,
  size = "md",
  className,
}: InstitutionalAuthorProps) {
  // Extract year from quarter if year not provided directly
  const displayYear = year || (quarter ? extractYear(quarter) : undefined)

  const sizeClasses = {
    sm: {
      container: "size-8",
      logo: "text-sm",
      name: "text-sm",
      subtitle: "text-xs",
    },
    md: {
      container: "size-10",
      logo: "text-lg",
      name: "text-sm font-medium",
      subtitle: "text-xs",
    },
    lg: {
      container: "size-12",
      logo: "text-xl",
      name: "text-base font-medium",
      subtitle: "text-sm",
    },
  }

  const sizes = sizeClasses[size]

  if (type === "yc") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <div
          className={cn(
            "flex items-center justify-center rounded-lg bg-orange-500 font-bold text-white",
            sizes.container,
            sizes.logo
          )}
        >
          Y
        </div>
        <div>
          <p className={sizes.name}>Y Combinator</p>
          <p className={cn("text-muted-foreground", sizes.subtitle)}>
            Request for Startups{displayYear ? ` ${displayYear}` : ""}
          </p>
        </div>
      </div>
    )
  }

  if (type === "weekend-fund") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <div
          className={cn(
            "flex items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 font-bold text-white",
            sizes.container,
            sizes.logo
          )}
        >
          W
        </div>
        <div>
          <p className={sizes.name}>Weekend Fund</p>
          <p className={cn("text-muted-foreground", sizes.subtitle)}>
            Request for Startups{displayYear ? ` ${displayYear}` : ""}
          </p>
        </div>
      </div>
    )
  }

  return null
}

/**
 * Extract year from quarter string like "Spring 2026" -> "2026"
 * or from date string like "2024-03-15" -> "2024"
 */
function extractYear(input: string): string | undefined {
  // Match 4-digit year
  const match = input.match(/\b(20\d{2})\b/)
  return match ? match[1] : undefined
}

/**
 * Small inline logo for use in feeds/cards
 */
export function InstitutionalLogo({
  type,
  className,
}: {
  type: "yc" | "weekend-fund"
  className?: string
}) {
  if (type === "yc") {
    return (
      <div
        className={cn(
          "inline-flex size-5 items-center justify-center rounded bg-orange-500 text-xs font-bold text-white",
          className
        )}
      >
        Y
      </div>
    )
  }

  if (type === "weekend-fund") {
    return (
      <div
        className={cn(
          "inline-flex size-5 items-center justify-center rounded bg-gradient-to-br from-amber-400 to-orange-500 text-xs font-bold text-white",
          className
        )}
      >
        W
      </div>
    )
  }

  return null
}
