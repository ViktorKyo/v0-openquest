import { cn } from "@/lib/utils"

interface YCLogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

/**
 * Y Combinator Logo Component
 * Displays the iconic orange Y logo
 */
export function YCLogo({ size = "md", className }: YCLogoProps) {
  const sizeClasses = {
    sm: "h-5 w-5 text-[10px]",
    md: "h-8 w-8 text-sm",
    lg: "h-12 w-12 text-lg",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded bg-orange-500 font-bold text-white",
        sizeClasses[size],
        className
      )}
    >
      Y
    </div>
  )
}
