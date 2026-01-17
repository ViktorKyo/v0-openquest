"use client"

import { motion } from "framer-motion"
import { ProblemCard } from "@/components/problem-card"

const problems = [
  {
    id: 1,
    title: "Local food delivery for rural areas",
    description:
      "Rural communities lack access to food delivery services that urban areas take for granted. There's an opportunity to build hyper-local solutions.",
    category: "Niche markets",
    upvotes: 247,
    comments: 34,
    author: {
      name: "Sarah Chen",
      avatar: "/professional-woman-avatar.png",
    },
    timeAgo: "2h ago",
    categoryColor: "bg-orange-500/10 text-orange-400",
  },
  {
    id: 2,
    title: "Carbon tracking for small businesses",
    description:
      "Enterprise carbon tracking exists, but SMBs need affordable, simple solutions to measure and reduce their environmental impact.",
    category: "Climate tech",
    upvotes: 189,
    comments: 28,
    author: {
      name: "Marcus Johnson",
      avatar: "/professional-man-avatar.png",
    },
    timeAgo: "5h ago",
    categoryColor: "bg-emerald-500/10 text-emerald-400",
  },
  {
    id: 3,
    title: "AI-powered code review for solo devs",
    description:
      "Solo developers miss out on code review benefits. An AI system that provides meaningful, context-aware feedback could fill this gap.",
    category: "AI & infrastructure",
    upvotes: 312,
    comments: 56,
    author: {
      name: "Alex Rivera",
      avatar: "/person-avatar-tech.jpg",
    },
    timeAgo: "8h ago",
    categoryColor: "bg-blue-500/10 text-blue-400",
  },
]

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
          <a
            href="#"
            className="inline-flex items-center text-sm font-medium text-accent hover:text-accent/80 transition-colors"
          >
            View all problems →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
