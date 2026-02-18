import { ProblemCard } from "@/components/reusable-problem-card"

// Mock data for demonstration
const mockProblems = [
  {
    id: "1",
    title: "Open source LLM benchmark that matters",
    elevatorPitch:
      "Current benchmarks like MMLU don't predict real-world performance. We need benchmarks that measure what users care about: accuracy, speed, and cost in production scenarios.",
    category: "AI & infrastructure",
    upvotes: 142,
    commentCount: 23,
    builderCount: 5,
    investorCount: 12,
    author: { username: "alexj", avatarUrl: "" },
    isAnonymous: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    involvement: "already-building" as const,
    alreadyBuildingSupport: ["awareness", "capital"] as const,
  },
  {
    id: "2",
    title: "Carbon footprint tracker for remote teams",
    elevatorPitch:
      "Remote work reduces commuting emissions but increases home energy use. Teams need tools to measure and optimize their distributed carbon footprint with actionable insights.",
    category: "Climate tech",
    upvotes: 87,
    commentCount: 15,
    builderCount: 3,
    investorCount: 7,
    isAnonymous: true,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    involvement: "want-build" as const,
    wantBuildBlocker: ["need-capital"] as const,
  },
  {
    id: "3",
    title: "AI video editor for podcast highlights",
    elevatorPitch:
      "Podcasters spend hours editing clips for social media. Need AI that understands context, finds viral moments, and auto-generates platform-optimized shorts with captions and branding.",
    category: "Creator economy",
    upvotes: 234,
    commentCount: 42,
    builderCount: 8,
    investorCount: 15,
    author: { username: "sarahm", avatarUrl: "" },
    isAnonymous: false,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    involvement: "want-to-work" as const,
    wantToWorkInvolvement: ["volunteer"] as const,
  },
]

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Compact Variant Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Compact Variant (for feeds)</h2>
          <p className="text-muted-foreground mb-6">Optimized for list views with essential information only</p>
          <div className="space-y-4">
            {mockProblems.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} variant="compact" />
            ))}
          </div>
        </section>

        {/* Detailed Variant Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Detailed Variant (for search results)</h2>
          <p className="text-muted-foreground mb-6">More spacious with extended descriptions for browsing</p>
          <div className="space-y-4">
            {mockProblems.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} variant="detailed" />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
