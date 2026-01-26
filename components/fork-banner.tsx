"use client"

import { GitFork, X, AlertCircle, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { getDifficultyIndicator } from "@/lib/similarity"
import { cn } from "@/lib/utils"

interface ForkBannerProps {
  originalTitle: string
  originalId: number
  onDismiss?: () => void
  differentiationScore?: number
  isValid?: boolean
}

export function ForkBanner({ originalTitle, originalId, onDismiss, differentiationScore, isValid }: ForkBannerProps) {
  const indicator = differentiationScore !== undefined ? getDifficultyIndicator(differentiationScore) : null

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-accent/10 border border-accent/20 rounded-lg p-5 mb-6"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <div className="bg-accent/10 rounded-full p-2">
            <GitFork className="h-4 w-4 text-accent" />
          </div>
        </div>

        <div className="flex-1 min-w-0 space-y-3">
          <div>
            <h3 className="font-semibold text-sm mb-1">You're forking a problem</h3>
            <p className="text-sm text-muted-foreground">
              Great ideas evolve. Take this problem in a new direction—add your unique angle, insights, or focus.
            </p>
          </div>

          {/* Differentiation Progress */}
          {indicator && differentiationScore !== undefined && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {isValid ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : differentiationScore >= 50 ? (
                  <Clock className="h-4 w-4 text-yellow-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-500" />
                )}
                <span className="text-xs font-medium">Fork Differentiation:</span>
                <span className={cn("text-xs font-semibold", indicator.color)}>
                  {differentiationScore}% different
                </span>
                <span className="text-xs text-muted-foreground">({indicator.label})</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(differentiationScore, 100)}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={cn(
                    "h-full rounded-full transition-colors",
                    differentiationScore >= 70
                      ? "bg-green-500"
                      : differentiationScore >= 50
                        ? "bg-yellow-500"
                        : "bg-red-500",
                  )}
                />
              </div>

              {/* Status Message */}
              <p className="text-xs text-muted-foreground">
                {isValid ? (
                  <span className="text-green-600 dark:text-green-400">
                    ✓ Your fork offers a unique perspective. Ready to submit!
                  </span>
                ) : differentiationScore >= 50 ? (
                  <span className="text-yellow-600 dark:text-yellow-400">
                    Keep going! Make your title, pitch, and description more distinct.
                  </span>
                ) : (
                  <span className="text-red-600 dark:text-red-400">
                    Your fork needs to be more different. Focus on your unique angle or approach.
                  </span>
                )}
              </p>
            </div>
          )}

          <Link
            href={`/problem/${originalId}`}
            className="text-sm text-accent hover:text-accent/80 transition-colors inline-flex items-center gap-1.5"
          >
            <GitFork className="h-3.5 w-3.5" />
            View original: {originalTitle}
          </Link>
        </div>

        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </motion.div>
  )
}
