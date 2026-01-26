import type { Metadata } from "next"
import { getAllCategories } from "@/lib/categories"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "All Categories | OpenQuest",
  description: "Explore all problem categories on OpenQuest - from moonshots to niche markets, find the space you're passionate about.",
  openGraph: {
    title: "All Categories | OpenQuest",
    description: "Explore all problem categories on OpenQuest - from moonshots to niche markets, find the space you're passionate about.",
    type: "website",
  },
}

export default function CategoriesPage() {
  const categories = getAllCategories()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="border-b bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto max-w-6xl px-4 py-16 sm:py-24">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">Categories</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Explore by category
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl">
            Find problems in the space you're passionate about. From moonshots that could change civilization to niche markets
            waiting for a champion.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group rounded-lg border bg-card p-8 transition-all hover:border-accent hover:bg-accent/5 hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium ${category.colorClass}`}>
                  {category.name}
                </span>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </div>

              <h2 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                {category.tagline}
              </h2>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {category.description}
              </p>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  What we're looking for:
                </p>
                <ul className="space-y-1">
                  {category.lookingFor.slice(0, 2).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground" />
                      <span className="line-clamp-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t bg-muted/20 py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Don't see what you're looking for?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Every category started with someone seeing a problem worth solving.
          </p>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-accent-foreground transition-colors hover:bg-accent/90"
          >
            Submit a Problem
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
