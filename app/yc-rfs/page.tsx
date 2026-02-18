import Link from "next/link"
import { ProblemCard } from "@/components/reusable-problem-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink } from "lucide-react"
import { ycRfsProblems, transformYCProblem, ycAuthor } from "@/data/yc-rfs-problems"
import { VCBadge, VCDateTag } from "@/components/vc-badge"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Y Combinator Requests for Startups | OpenQuest",
  description:
    "Explore problems surfaced by Y Combinator for founders to tackle. From AI infrastructure to robotics, find validated problems worth solving.",
  openGraph: {
    title: "Y Combinator Requests for Startups | OpenQuest",
    description:
      "Explore problems surfaced by Y Combinator for founders to tackle. From AI infrastructure to robotics, find validated problems worth solving.",
    type: "website",
  },
}

export default function YCRFSPage() {
  const fall2025Problems = ycRfsProblems.filter((p) => p.quarter === "Fall 2025")
  const summer2025Problems = ycRfsProblems.filter((p) => p.quarter === "Summer 2025")

  return (
    <div>
      {/* Hero Section */}
      <div className="border-b bg-gradient-to-b from-orange-50/50 via-background to-background dark:from-orange-950/10">
        <div className="container mx-auto max-w-6xl px-4 py-16 sm:py-24">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">YC Requests for Startups</span>
          </nav>

          {/* YC Logo & Title */}
          <div className="flex items-start gap-4 mb-6">
            <div className="h-16 w-16 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
              Y
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                  Y Combinator
                  <br />
                  Requests for Startups
                </h1>
              </div>
              <VCBadge vc="yc" className="mb-4" />
            </div>
          </div>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mb-8">
            Problems curated by Y Combinator's partners—validated ideas for founders to tackle. These aren't random
            suggestions; they're opportunities backed by deep market insight and funding appetite.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.ycombinator.com/rfs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-600 dark:text-orange-400 transition-colors hover:bg-orange-500/20"
            >
              View on YC.com
              <ExternalLink className="h-4 w-4" />
            </a>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              Browse All Categories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div>
              <div className="text-3xl font-bold text-foreground">{ycRfsProblems.length}</div>
              <div className="text-sm text-muted-foreground">Total Problems</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">{fall2025Problems.length}</div>
              <div className="text-sm text-muted-foreground">Fall 2025</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">{summer2025Problems.length}</div>
              <div className="text-sm text-muted-foreground">Summer 2025</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">
                {new Set(ycRfsProblems.map((p) => p.category)).size}
              </div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
          </div>
        </div>
      </div>

      {/* Fall 2025 Problems */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Fall 2025</h2>
            <p className="text-muted-foreground">Latest problems from YC's Fall 2025 batch</p>
          </div>
          <VCDateTag vc="yc" date="Fall 2025" />
        </div>

        <div className="space-y-6 mb-16">
          {fall2025Problems.map((problem) => {
            const transformed = transformYCProblem(problem)
            return <ProblemCard key={problem.id} problem={transformed} variant="detailed" />
          })}
        </div>

        {/* Summer 2025 Problems */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Summer 2025</h2>
            <p className="text-muted-foreground">Problems from YC's Summer 2025 batch</p>
          </div>
          <VCDateTag vc="yc" date="Summer 2025" />
        </div>

        <div className="space-y-6">
          {summer2025Problems.map((problem) => {
            const transformed = transformYCProblem(problem)
            return <ProblemCard key={problem.id} problem={transformed} variant="detailed" />
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t bg-muted/20 py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Building one of these?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            YC wants to fund founders tackling these problems. If you're working on something related, apply to Y
            Combinator.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://www.ycombinator.com/apply"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-600"
            >
              Apply to Y Combinator
              <ExternalLink className="h-4 w-4" />
            </a>
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 font-medium transition-colors hover:bg-accent"
            >
              Submit Your Own Problem
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
