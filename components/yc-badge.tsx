import { cn } from "@/lib/utils"
import { CheckCircle2 } from "lucide-react"

interface YCBadgeProps {
  variant?: "default" | "compact"
  className?: string
}

/**
 * YC RFS Badge Component
 * Displays a special verified badge for Y Combinator RFS problems
 */
export function YCBadge({ variant = "default", className }: YCBadgeProps) {
  const isCompact = variant === "compact"

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border font-medium",
        isCompact ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm",
        "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
        className
      )}
    >
      <CheckCircle2 className={cn("flex-shrink-0", isCompact ? "h-3 w-3" : "h-3.5 w-3.5")} />
      <span>YC RFS</span>
    </span>
  )
}

interface YCQuarterTagProps {
  quarter: string
  className?: string
}

/**
 * YC Quarter Tag Component
 * Displays the quarter/batch for a YC RFS problem
 */
export function YCQuarterTag({ quarter, className }: YCQuarterTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        "bg-muted text-muted-foreground",
        className
      )}
    >
      {quarter}
    </span>
  )
}
