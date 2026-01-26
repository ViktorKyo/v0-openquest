import { CheckCircle2, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

interface WeekendFundBadgeProps {
  variant?: "default" | "compact"
  className?: string
}

/**
 * Weekend Fund RFS Badge Component
 * Displays the "Weekend Fund RFS" verified badge with sun icon
 */
export function WeekendFundBadge({ variant = "default", className }: WeekendFundBadgeProps) {
  const isCompact = variant === "compact"

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border font-medium",
        isCompact ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm",
        "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
        className,
      )}
    >
      <CheckCircle2 className={cn("flex-shrink-0", isCompact ? "h-3 w-3" : "h-3.5 w-3.5")} />
      <span>Weekend Fund RFS</span>
    </span>
  )
}

interface WeekendFundDateTagProps {
  date: string
  className?: string
}

/**
 * Weekend Fund Published Date Tag
 * Shows when the RFS was published
 */
export function WeekendFundDateTag({ date, className }: WeekendFundDateTagProps) {
  return (
    <span
      className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", "bg-muted text-muted-foreground", className)}
    >
      {date}
    </span>
  )
}

interface WeekendFundLogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

/**
 * Weekend Fund Logo Component
 * Displays the sun icon representing Weekend Fund
 */
export function WeekendFundLogo({ size = "md", className }: WeekendFundLogoProps) {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white",
        sizeClasses[size],
        className,
      )}
    >
      <Sun className={cn(sizeClasses[size === "sm" ? "sm" : size === "md" ? "sm" : "md"])} />
    </div>
  )
}
