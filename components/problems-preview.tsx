"use client"

import { motion } from "framer-motion"
import { ProblemCard } from "@/components/problem-card"
import Link from "next/link"
import type { HomepageTrendingProblem } from "@/lib/db/queries/get-homepage-trending"

interface ProblemsPreviewProps {
  problems: HomepageTrendingProblem[]
}

export function ProblemsPreview({ problems }: ProblemsPreviewProps) {
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
