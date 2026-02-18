/**
 * Shared formatting utilities for the OpenQuest application
 */

/**
 * Returns a human-readable relative time string (e.g., "2h ago", "3d ago")
 */
export function getTimeAgo(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  const now = new Date()
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000)

  if (seconds < 60) return "just now"
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return `${Math.floor(seconds / 604800)}w ago`
}

/**
 * Category color mappings for problem cards
 */
const CATEGORY_COLORS: Record<string, string> = {
  "Niche Markets": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Climate Tech": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "AI & Infrastructure": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Future of Work": "bg-green-500/10 text-green-400 border-green-500/20",
  "Creator Economy": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Longevity": "bg-pink-500/10 text-pink-400 border-pink-500/20",
  "Rebuild Money": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "Moonshots": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "World of Atoms": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Other": "bg-gray-500/10 text-gray-400 border-gray-500/20",
}

const DEFAULT_CATEGORY_COLOR = "bg-gray-500/10 text-gray-400 border-gray-500/20"

/**
 * Returns Tailwind CSS classes for a category badge
 */
export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] || DEFAULT_CATEGORY_COLOR
}
