import type { LucideIcon } from "lucide-react"
import {
  Brain,
  Leaf,
  Briefcase,
  Heart,
  Rocket,
  Coins,
  Atom,
  Palette,
  Target,
  Lightbulb,
} from "lucide-react"

export interface CategoryIconConfig {
  icon: LucideIcon
  bgColor: string
  iconColor: string
}

export const CATEGORY_ICONS: Record<string, CategoryIconConfig> = {
  "AI & Infrastructure": { icon: Brain, bgColor: "bg-blue-500/15", iconColor: "text-blue-500" },
  "Climate Tech": { icon: Leaf, bgColor: "bg-emerald-500/15", iconColor: "text-emerald-500" },
  "Future of Work": { icon: Briefcase, bgColor: "bg-green-500/15", iconColor: "text-green-500" },
  "Longevity": { icon: Heart, bgColor: "bg-pink-500/15", iconColor: "text-pink-500" },
  "Moonshots": { icon: Rocket, bgColor: "bg-orange-500/15", iconColor: "text-orange-500" },
  "Rebuild Money": { icon: Coins, bgColor: "bg-yellow-500/15", iconColor: "text-yellow-500" },
  "World of Atoms": { icon: Atom, bgColor: "bg-amber-500/15", iconColor: "text-amber-500" },
  "Creator Economy": { icon: Palette, bgColor: "bg-purple-500/15", iconColor: "text-purple-500" },
  "Niche Markets": { icon: Target, bgColor: "bg-orange-500/15", iconColor: "text-orange-500" },
  "Other": { icon: Lightbulb, bgColor: "bg-gray-500/15", iconColor: "text-gray-500" },
}

const DEFAULT_ICON: CategoryIconConfig = {
  icon: Lightbulb,
  bgColor: "bg-gray-500/15",
  iconColor: "text-gray-500",
}

export function getCategoryIcon(category: string): CategoryIconConfig {
  return CATEGORY_ICONS[category] || DEFAULT_ICON
}

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "AI & Infrastructure": "Building the foundations of AI",
  "Climate Tech": "Technology for a sustainable future",
  "Future of Work": "Reimagining how we work and collaborate",
  "Longevity": "Extending healthy human life",
  "Moonshots": "Ambitious bets on the future",
  "Rebuild Money": "Reinventing finance and payments",
  "World of Atoms": "Innovation in the physical world",
  "Creator Economy": "Empowering creators and their audiences",
  "Niche Markets": "Underserved markets with outsized potential",
  "Other": "Problems that defy categorization",
}

export function getCategoryDescription(category: string): string {
  return CATEGORY_DESCRIPTIONS[category] || `Explore ${category.toLowerCase()}`
}
