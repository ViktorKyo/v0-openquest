import type { Metadata } from "next"
import Link from "next/link"
import { BookOpen, ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllPosts } from "@/lib/blog"
import { BLOG_CATEGORIES } from "@/types/blog"
import { BlogPostCard, FeaturedBlogPostCard } from "@/components/blog/blog-post-card"
import { buildMetadata } from "@/lib/seo"
import { cn } from "@/lib/utils"

interface PageProps {
  searchParams: Promise<{ category?: string }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { category } = await searchParams

  const description = category
    ? `${category} posts from the OpenQuest team. Insights on building products that solve real problems.`
    : "Insights, guides, and updates from the OpenQuest team. Learn about building products that solve real problems."

  const meta = buildMetadata({
    title: category ? `${category} — Blog | OpenQuest` : "Blog | OpenQuest",
    description,
    path: "/blog", // canonical always points to /blog (no query params)
  })

  return meta
}

export default async function BlogPage({ searchParams }: PageProps) {
  const { category } = await searchParams
  const allPosts = getAllPosts()

  const filteredPosts = category
    ? allPosts.filter((p) => p.category === category)
    : allPosts

  const featured =
    !category
      ? filteredPosts.find((p) => p.featured) || filteredPosts[0] || null
      : null
  const rest = featured
    ? filteredPosts.filter((p) => p.slug !== featured.slug)
    : filteredPosts

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        {/* Hero */}
        <div className="border-b bg-gradient-to-b from-muted/50 via-background to-background">
          <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
            <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">Blog</span>
            </nav>

            <div className="flex items-start gap-4 mb-6">
              <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <BookOpen className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
                  Blog
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
                  Insights, guides, and updates from the OpenQuest team.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="border-b bg-muted/30">
          <div className="mx-auto max-w-4xl px-6 py-4">
            <div className="flex flex-wrap gap-2">
              <Link
                href="/blog"
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  !category
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                All
              </Link>
              {BLOG_CATEGORIES.map((cat) => (
                <Link
                  key={cat}
                  href={`/blog?category=${cat}`}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                    category === cat
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="mx-auto max-w-4xl px-6 py-12">
          {featured && !category && (
            <div className="mb-12">
              <FeaturedBlogPostCard post={featured} />
            </div>
          )}

          {rest.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2">
              {rest.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No posts yet{category ? ` in ${category}` : ""}.
              </p>
            </div>
          ) : null}
        </div>

        {/* CTA */}
        <div className="border-t bg-muted/20 py-16">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Have a problem to share?</h2>
            <p className="text-muted-foreground mb-8">
              Help founders find ideas worth building.
            </p>
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Submit a Problem
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
