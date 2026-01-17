import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ProblemsPreview } from "@/components/problems-preview"
import { HowItWorks } from "@/components/how-it-works"
import { Categories } from "@/components/categories"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ProblemsPreview />
      <HowItWorks />
      <Categories />
      <Footer />
    </main>
  )
}
