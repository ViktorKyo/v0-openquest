import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getCategoryBySlug, getAllCategorySlugs } from "@/lib/categories"
import { CategoryHero } from "@/components/category-hero"
import { ProblemCard } from "@/components/reusable-problem-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getProblemsByCategory } from "@/data/mock-problems"

// Generate static params for all categories
export async function generateStaticParams() {
  const slugs = getAllCategorySlugs()
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    return {
      title: "Category Not Found",
    }
  }

  return {
    title: category.seo.title,
    description: category.seo.description,
    openGraph: {
      title: category.seo.title,
      description: category.seo.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: category.seo.title,
      description: category.seo.description,
    },
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  // Get problems for this category (includes both regular and YC problems)
  const categoryProblems = getProblemsByCategory(slug)

  // Get other categories for "Explore More" section
  const otherCategories = getAllCategorySlugs()
    .filter((s) => s !== slug)
    .slice(0, 6)

  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: category.name,
            description: category.description,
            url: `https://openquest.com/category/${category.slug}`,
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://openquest.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Categories",
                  item: "https://openquest.com/categories",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: category.name,
                  item: `https://openquest.com/category/${category.slug}`,
                },
              ],
            },
          }),
        }}
      />

      {/* Hero Section */}
      <CategoryHero category={category} />

      {/* Problems List */}
      <div className="container mx-auto max-w-5xl px-4 py-12" id="problems">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Problems in {category.name}</h2>
          <div className="text-sm text-muted-foreground">{categoryProblems.length} problems</div>
        </div>

        <div className="space-y-6">
          {categoryProblems.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} variant="detailed" />
          ))}
        </div>

        {/* Empty state - shown when no problems */}
        {categoryProblems.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground mb-6">No problems submitted in this category yet.</p>
            <Button asChild>
              <Link href={`/submit?category=${category.slug}`}>Be the first to submit a problem</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Explore Other Categories */}
      <div className="border-t bg-muted/20 py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold mb-8">Explore Other Categories</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherCategories.map((slug) => {
              const cat = getCategoryBySlug(slug)
              if (!cat) return null
              return (
                <Link
                  key={slug}
                  href={`/category/${slug}`}
                  className="group rounded-lg border bg-card p-6 transition-all hover:border-accent hover:bg-accent/5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${cat.colorClass}`}>
                      {cat.name}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                  <h3 className="font-semibold mb-2">{cat.tagline}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{cat.description}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
