"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { FeedProblemCard } from "@/components/feed-problem-card"
import { useFeedFilters } from "@/contexts/feed-filter-context"
import { allProblems } from "@/data/mock-problems"

function getTimeAgo(date: Date): string {
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return "just now"
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return `${Math.floor(seconds / 604800)}w ago`
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    "Niche Markets": "bg-orange-500/10 text-orange-400 border-orange-500/20",
    "Climate Tech": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "AI & Infrastructure": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Future of Work": "bg-green-500/10 text-green-400 border-green-500/20",
    "Creator Economy": "bg-purple-500/10 text-purple-400 border-purple-500/20",
    Longevity: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    "Rebuild Money": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Moonshots: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    "World of Atoms": "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Other: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  }
  return colors[category] || "bg-gray-500/10 text-gray-400 border-gray-500/20"
}

// Transform centralized problems to feed format
const transformedProblems = allProblems.map((problem) => {
  return {
    id: problem.id,
    originalId: problem.id, // Keep original ID for reference
    title: problem.title,
    description: problem.elevatorPitch,
    category: problem.category,
    categoryColor: getCategoryColor(problem.category),
    upvotes: problem.upvotes,
    comments: problem.commentCount,
    building: problem.builderCount,
    investors: problem.investorCount,
    author: {
      name: problem.author.username,
      isAnonymous: problem.isAnonymous,
      isYC: (problem as any).isYCRFS || false,
      isWeekendFund: (problem as any).isWeekendFundRFS || false,
    },
    timeAgo: getTimeAgo(problem.createdAt),
    createdAt: problem.createdAt,
    isYCRFS: (problem as any).isYCRFS || false,
    ycQuarter: (problem as any).ycQuarter,
    isWeekendFundRFS: (problem as any).isWeekendFundRFS || false,
    wfPublishedDate: (problem as any).wfPublishedDate,
  }
});

// Use transformed problems from centralized data
const mockProblems = transformedProblems;

// Keep old data as fallback (commented out)
/* const mockProblemsOld = [
  {
    id: 1,
    title: "Need a better way to track carbon footprint for small manufacturing businesses",
    description:
      "Enterprise solutions are too expensive and complex. Small manufacturers need affordable, simple tools to measure emissions across their supply chain and production process.",
    category: "Climate tech",
    categoryColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    upvotes: 156,
    comments: 23,
    building: 4,
    investors: 2,
    author: { name: "Sarah Martinez", isAnonymous: false },
    timeAgo: "2h ago",
    createdAt: hoursAgo(2),
  },
  {
    id: 2,
    title: "AI-powered meeting notes that actually understand context and follow-ups",
    description:
      "Current tools transcribe but don't understand. Need AI that can identify action items, understand who's responsible, and integrate with project management tools automatically.",
    category: "AI & infrastructure",
    categoryColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    upvotes: 134,
    comments: 31,
    building: 8,
    investors: 5,
    author: { name: "Anonymous", isAnonymous: true },
    timeAgo: "4h ago",
    createdAt: hoursAgo(4),
  },
  {
    id: 3,
    title: "Platform for creators to sell digital products without coding",
    description:
      "Creators want to monetize but existing platforms take huge cuts or require technical skills. Need a zero-code solution with fair pricing and beautiful storefronts.",
    category: "Creator economy",
    categoryColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    upvotes: 98,
    comments: 18,
    building: 12,
    investors: 3,
    author: { name: "Alex Chen", isAnonymous: false },
    timeAgo: "6h ago",
    createdAt: hoursAgo(6),
  },
  {
    id: 4,
    title: "Vertical farming automation for apartment balconies",
    description:
      "Urban dwellers want to grow food but lack space and time. Need smart, compact systems that automate watering, lighting, and nutrients for balcony gardens.",
    category: "Moonshots",
    categoryColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    upvotes: 87,
    comments: 14,
    building: 2,
    investors: 1,
    author: { name: "Jamie Lee", isAnonymous: false },
    timeAgo: "8h ago",
    createdAt: hoursAgo(8),
  },
  {
    id: 5,
    title: "Mental health check-ins integrated into workplace Slack",
    description:
      "Companies care about mental health but have no easy way to gauge team wellness. Need a non-invasive, privacy-first tool that integrates into daily workflows.",
    category: "Health & wellness",
    categoryColor: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    upvotes: 76,
    comments: 9,
    building: 3,
    investors: 0,
    author: { name: "Anonymous", isAnonymous: true },
    timeAgo: "10h ago",
    createdAt: hoursAgo(10),
  },
  {
    id: 6,
    title: "Peer-to-peer car sharing for rural communities",
    description:
      "Rural areas lack public transport and ride-sharing. Neighbors have cars sitting idle. Need a trust-based platform for hyper-local car sharing with insurance coverage.",
    category: "Niche markets",
    categoryColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    upvotes: 65,
    comments: 12,
    building: 1,
    investors: 0,
    author: { name: "Morgan Taylor", isAnonymous: false },
    timeAgo: "12h ago",
    createdAt: hoursAgo(12),
  },
  {
    id: 7,
    title: "Personalized learning paths for adult career transitions",
    description:
      "Adults switching careers need structured guidance but MOOCs are overwhelming. Need AI-driven learning paths that adapt to prior experience and career goals.",
    category: "Education",
    categoryColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    upvotes: 54,
    comments: 7,
    building: 5,
    investors: 1,
    author: { name: "Taylor Brooks", isAnonymous: false },
    timeAgo: "14h ago",
    createdAt: hoursAgo(14),
  },
  {
    id: 8,
    title: "Real-time collaboration tool for architects and contractors",
    description:
      "Construction projects suffer from miscommunication between architects and builders. Need visual collaboration tools with AR overlays for on-site coordination.",
    category: "AI & infrastructure",
    categoryColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    upvotes: 43,
    comments: 6,
    building: 2,
    investors: 2,
    author: { name: "Anonymous", isAnonymous: true },
    timeAgo: "16h ago",
    createdAt: hoursAgo(16),
  },
  {
    id: 9,
    title: "Waste reduction marketplace for restaurants and grocers",
    description:
      "Tons of food waste happens daily from overstocking. Need a last-minute marketplace where restaurants/grocers can sell excess inventory at discount before it expires.",
    category: "Climate tech",
    categoryColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    upvotes: 38,
    comments: 5,
    building: 6,
    investors: 1,
    author: { name: "Riley Kim", isAnonymous: false },
    timeAgo: "18h ago",
    createdAt: hoursAgo(18),
  },
  {
    id: 10,
    title: "Voice-first social network for hands-free creators",
    description:
      "Content creators multitask constantly. Need a social platform optimized for voice messages, audio sharing, and hands-free interaction while working.",
    category: "Creator economy",
    categoryColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    upvotes: 23,
    comments: 4,
    building: 1,
    investors: 0,
    author: { name: "Casey Jordan", isAnonymous: false },
    timeAgo: "20h ago",
    createdAt: hoursAgo(20),
  },
] */

export function FeedList() {
  const { activeTab, selectedCategory, sortOption } = useFeedFilters()

  const filteredAndSortedProblems = useMemo(() => {
    // Step 1: Filter by category
    let filtered = mockProblems
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((problem) => problem.category === selectedCategory)
    }

    // Step 2: Apply sorting based on active tab and sort option
    let sorted = [...filtered]

    if (activeTab === "trending") {
      // Trending tab: Primary sort by upvotes (can be overridden by sort dropdown)
      if (sortOption === "Most upvoted") {
        sorted.sort((a, b) => b.upvotes - a.upvotes)
      } else if (sortOption === "Most recent") {
        sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      } else if (sortOption === "Most discussed") {
        sorted.sort((a, b) => b.comments - a.comments)
      }
    } else if (activeTab === "new") {
      // New tab: Primary sort by creation date (can be overridden by sort dropdown)
      if (sortOption === "Most recent") {
        sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      } else if (sortOption === "Most upvoted") {
        sorted.sort((a, b) => b.upvotes - a.upvotes)
      } else if (sortOption === "Most discussed") {
        sorted.sort((a, b) => b.comments - a.comments)
      }
    }

    return sorted
  }, [activeTab, selectedCategory, sortOption])

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      {filteredAndSortedProblems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No problems found matching your filters.</p>
          <p className="text-sm text-muted-foreground mt-2">Try adjusting your category or sort options.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAndSortedProblems.map((problem, index) => (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <FeedProblemCard problem={problem} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
