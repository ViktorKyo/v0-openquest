import type { Metadata } from "next"
import { MarketingHeader } from "@/components/marketing-header"

export const metadata: Metadata = {
  title: "Find Problems Worth Solving",
  description: "The community for discovering and sharing problems worth solving. Browse startup problems, connect with builders and investors, and find your next big idea.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "OpenQuest - Find Problems Worth Solving",
    description: "The community for discovering and sharing problems worth solving. Browse startup problems and find your next big idea.",
    url: "/",
  },
}
import { Hero } from "@/components/hero"
import { ProblemsPreview } from "@/components/problems-preview"
import { HowItWorks } from "@/components/how-it-works"
import { Categories } from "@/components/categories"
import { Footer } from "@/components/footer"
import { getHomepageTrendingProblems } from "@/lib/db/queries/get-homepage-trending"

export const revalidate = 300

export default async function Home() {
  const trendingProblems = await getHomepageTrendingProblems()

  return (
    <main className="min-h-screen bg-background">
      <MarketingHeader />
      <Hero />
      <ProblemsPreview problems={trendingProblems} />
      <HowItWorks />
      <Categories />
      <Footer />
    </main>
  )
}
