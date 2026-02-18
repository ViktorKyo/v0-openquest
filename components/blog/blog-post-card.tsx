import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import type { BlogPost } from "@/types/blog"

interface BlogPostCardProps {
  post: BlogPost
  className?: string
}

export function BlogPostCard({ post, className }: BlogPostCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group block rounded-xl border bg-card p-6 transition-all hover:border-foreground/20 hover:shadow-md",
        className
      )}
    >
      {post.coverImage && (
        <div className="mb-4 overflow-hidden rounded-lg border">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-40 object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}

      <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary mb-3">
        {post.category}
      </span>

      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
        {post.title}
      </h3>

      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
        {post.description}
      </p>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {formattedDate}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {post.readingTime} min
        </span>
      </div>

      {post.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}

export function FeaturedBlogPostCard({ post, className }: BlogPostCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-xl border bg-card transition-all hover:border-foreground/20 hover:shadow-lg",
        className
      )}
    >
      <div className="flex flex-col md:flex-row">
        {post.coverImage && (
          <div className="md:w-2/5 overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-48 md:h-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}

        <div className={cn("p-8 flex-1", !post.coverImage && "w-full")}>
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            {post.category}
          </span>

          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-3">
            {post.title}
          </h3>

          <p className="text-muted-foreground mb-6 line-clamp-3">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                {post.author.name[0]}
              </div>
              <span className="font-medium text-foreground">
                {post.author.name}
              </span>
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
    </Link>
  )
}
