"use client"

import { motion } from "framer-motion"
import { FeedProblemCard } from "@/components/feed-problem-card"

const mockProblems = [
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
  },
]

export function FeedList() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="space-y-4">
        {mockProblems.map((problem, index) => (
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
    </div>
  )
}
