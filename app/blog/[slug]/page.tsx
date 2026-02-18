import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ShareButton } from "@/components/blog/share-button"
import { BlogPostCard } from "@/components/blog/blog-post-card"
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from "@/lib/blog"
import { buildMetadata, BASE_URL } from "@/lib/seo"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return { title: "Not Found | OpenQuest" }
  }

  return buildMetadata({
    title: `${post.title} | OpenQuest Blog`,
    description: post.description,
    path: `/blog/${slug}`,
    ogType: "article",
    ogImage: post.coverImage || `/api/og?title=${encodeURIComponent(post.title)}&type=blog`,
    article: {
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
  })
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(slug, 2)

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  const canonicalUrl = `${BASE_URL}/blog/${slug}`
  const wordCount = post.content.trim().split(/\s+/).length

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: canonicalUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    author: {
      "@type": "Person",
      name: post.author.name,
      ...(post.author.role && { jobTitle: post.author.role }),
    },
    datePublished: post.publishedAt,
    ...(post.updatedAt && { dateModified: post.updatedAt }),
    ...(post.coverImage && { image: post.coverImage }),
    wordCount,
    keywords: post.tags.join(", "),
    publisher: {
      "@type": "Organization",
      name: "OpenQuest",
      url: "https://openquest.com",
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="pt-24 pb-20">
        {/* Article Header */}
        <div className="border-b bg-gradient-to-b from-muted/50 via-background to-background">
          <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
            {/* Breadcrumbs */}
            <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-foreground transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium truncate max-w-[200px]">
                {post.title}
              </span>
            </nav>

            {/* Category */}
            <Link
              href={`/blog?category=${post.category}`}
              className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6 hover:bg-primary/20 transition-colors"
            >
              {post.category}
            </Link>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-muted-foreground mb-8">
              {post.description}
            </p>

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                {post.author.avatarUrl ? (
                  <img
                    src={post.author.avatarUrl}
                    alt={post.author.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                    {post.author.name[0]}
                  </div>
                )}
                <div>
                  <span className="font-medium text-foreground">
                    {post.author.name}
                  </span>
                  {post.author.role && (
                    <span className="text-muted-foreground">
                      {" "}· {post.author.role}
                    </span>
                  )}
                </div>
              </div>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTime} min read
              </span>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="mx-auto max-w-3xl px-6 -mt-4 mb-8">
            <div className="overflow-hidden rounded-xl border">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        )}

        {/* Article Body */}
        <article className="mx-auto max-w-3xl px-6 py-8">
          <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:border">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>

        {/* Tags & Share */}
        <div className="mx-auto max-w-3xl px-6 py-8 border-t">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <ShareButton title={post.title} slug={post.slug} />
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mx-auto max-w-3xl px-6 py-12 border-t">
            <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
            <div className="grid gap-8 sm:grid-cols-2">
              {relatedPosts.map((related) => (
                <BlogPostCard key={related.slug} post={related} />
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mx-auto max-w-3xl px-6 py-8 border-t">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all posts
          </Link>
        </div>

        {/* CTA */}
        <div className="border-t bg-muted/20 py-16">
          <div className="mx-auto max-w-3xl px-6 text-center">
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
