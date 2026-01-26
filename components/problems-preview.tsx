"use client"

import { motion } from "framer-motion"
import { ProblemCard } from "@/components/problem-card"
import Link from "next/link"
import { getTrendingProblems } from "@/data/mock-problems"

// Get top 6 trending problems (mix of regular and YC)
const trendingProblems = getTrendingProblems(6)

// Transform to match ProblemCard interface
const problems = trendingProblems.map((problem) => {
  const timeAgo = getTimeAgo(problem.createdAt)

  return {
    id: problem.id,
    title: problem.title,
    description: problem.elevatorPitch,
    category: problem.category,
    upvotes: problem.upvotes,
    comments: problem.commentCount,
    author: {
      name: problem.author.username,
      avatar: problem.author.avatarUrl,
    },
    timeAgo,
    categoryColor: getCategoryColor(problem.category),
    involvement: problem.involvement,
    wantBuildBlocker: problem.wantBuildBlocker,
    wantToWorkInvolvement: problem.wantToWorkInvolvement,
    alreadyBuildingSupport: problem.alreadyBuildingSupport,
    isAnonymous: problem.isAnonymous,
  }
})

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
    "Niche Markets": "bg-orange-500/10 text-orange-400",
    "Climate Tech": "bg-emerald-500/10 text-emerald-400",
    "AI & Infrastructure": "bg-blue-500/10 text-blue-400",
    "Future of Work": "bg-green-500/10 text-green-400",
    "Creator Economy": "bg-pink-500/10 text-pink-400",
    Longevity: "bg-red-500/10 text-red-400",
    "Rebuild Money": "bg-yellow-500/10 text-yellow-400",
    Moonshots: "bg-violet-500/10 text-violet-400",
    "World of Atoms": "bg-amber-500/10 text-amber-400",
    Other: "bg-gray-500/10 text-gray-400",
  }
  return colors[category] || "bg-gray-500/10 text-gray-400"
}

export function ProblemsPreview() {
  return (
    <section id="problems" className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Trending Problems</h2>
          <p className="mt-4 text-lg text-muted-foreground">See what the community is excited about solving</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProblemCard problem={problem} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/feed"
            className="inline-flex items-center text-sm font-medium text-accent hover:text-accent/80 transition-colors"
          >
            View all problems →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
