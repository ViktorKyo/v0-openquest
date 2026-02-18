import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getCategoryBySlug, getAllCategorySlugs } from "@/lib/categories"
import { CategoryHero } from "@/components/category-hero"
import { ProblemCard } from "@/components/reusable-problem-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getProblemsByCategory } from "@/data/mock-problems"
import { db } from "@/lib/db/supabase"
import { problems, users } from "@/lib/db/schema"
import { and, eq, ilike, inArray } from "drizzle-orm"
import { PUBLIC_PROBLEM_STATUSES } from "@/lib/problem-access"

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
    alternates: {
      canonical: `/category/${category.slug}`,
    },
    openGraph: {
      title: category.seo.title,
      description: category.seo.description,
      url: `/category/${category.slug}`,
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

  // Featured editorial/sourced content (shown first while community grows)
  const editorialProblems = getProblemsByCategory(slug)

  // Community submissions from DB
  let communityProblems: Array<{
    id: string
    title: string
    elevatorPitch: string
    category: string
    upvotes: number
    commentCount: number
    builderCount: number
    investorCount: number
    author: { username: string; avatarUrl: string }
    isAnonymous: boolean
    createdAt: Date | string
    involvement?: "want-build" | "already-building" | "just-sharing" | "want-to-work"
    wantBuildBlocker?: ReadonlyArray<"need-capital" | "need-cofounder">
    wantToWorkInvolvement?: ReadonlyArray<"volunteer" | "full-time">
    alreadyBuildingSupport?: ReadonlyArray<"awareness" | "founding-team" | "cofounder" | "capital">
  }> = []

  try {
    const rows = await db
      .select({
        id: problems.id,
        title: problems.title,
        elevatorPitch: problems.elevatorPitch,
        category: problems.category,
        upvotes: problems.upvotes,
        commentCount: problems.commentCount,
        builderCount: problems.builderCount,
        investorCount: problems.investorCount,
        isAnonymous: problems.isAnonymous,
        createdAt: problems.createdAt,
        involvement: problems.involvement,
        wantBuildBlocker: problems.wantBuildBlocker,
        wantToWorkInvolvement: problems.wantToWorkInvolvement,
        alreadyBuildingSupport: problems.alreadyBuildingSupport,
        authorName: users.name,
        authorAvatarUrl: users.avatarUrl,
      })
      .from(problems)
      .leftJoin(users, eq(problems.authorId, users.id))
      .where(
        and(
          inArray(problems.status, [...PUBLIC_PROBLEM_STATUSES]),
          ilike(problems.category, category.name),
        ),
      )

    communityProblems = rows.map((row) => ({
      id: row.id,
      title: row.title,
      elevatorPitch: row.elevatorPitch,
      category: row.category,
      upvotes: row.upvotes || 0,
      commentCount: row.commentCount || 0,
      builderCount: row.builderCount || 0,
      investorCount: row.investorCount || 0,
      author: {
        username: row.isAnonymous ? "Anonymous" : (row.authorName || "Anonymous"),
        avatarUrl: row.isAnonymous ? "" : (row.authorAvatarUrl || ""),
      },
      isAnonymous: Boolean(row.isAnonymous),
      createdAt: row.createdAt,
      involvement: (row.involvement || undefined) as "want-build" | "already-building" | "just-sharing" | "want-to-work" | undefined,
      wantBuildBlocker: ((row.wantBuildBlocker as string[] | null) || undefined) as ReadonlyArray<"need-capital" | "need-cofounder"> | undefined,
      wantToWorkInvolvement: ((row.wantToWorkInvolvement as string[] | null) || undefined) as ReadonlyArray<"volunteer" | "full-time"> | undefined,
      alreadyBuildingSupport: ((row.alreadyBuildingSupport as string[] | null) || undefined) as ReadonlyArray<"awareness" | "founding-team" | "cofounder" | "capital"> | undefined,
    }))
  } catch {
    // Keep page functional during local/dev DB outages.
  }

  const totalProblems = editorialProblems.length + communityProblems.length

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
          <div className="text-sm text-muted-foreground">{totalProblems} problems</div>
        </div>

        {editorialProblems.length > 0 && (
          <div className="mb-10">
            <h3 className="mb-4 text-lg font-semibold">Featured sourced problems</h3>
            <div className="space-y-6">
              {editorialProblems.map((problem) => (
                <ProblemCard key={`editorial-${problem.id}`} problem={problem} variant="detailed" />
              ))}
            </div>
          </div>
        )}

        {communityProblems.length > 0 && (
          <div className="mb-6">
            <h3 className="mb-4 text-lg font-semibold">Community submissions</h3>
            <div className="space-y-6">
              {communityProblems.map((problem) => (
                <ProblemCard key={`community-${problem.id}`} problem={problem} variant="detailed" />
              ))}
            </div>
          </div>
        )}

        {/* Empty state - shown when no problems */}
        {totalProblems === 0 && (
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
