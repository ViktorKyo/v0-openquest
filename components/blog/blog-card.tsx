import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ExternalLink, Calendar, BookOpen } from 'lucide-react'
import type { VCThesis } from '@/data/vc-theses'

interface BlogCardProps {
  thesis: VCThesis
  className?: string
}

export function BlogCard({ thesis, className }: BlogCardProps) {
  const formattedDate = new Date(thesis.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })

  return (
    <Link
      href={`/landscape/${thesis.slug}`}
      className={cn(
        'group block rounded-xl border bg-card p-6 transition-all hover:border-foreground/20 hover:shadow-md',
        className
      )}
    >
      {/* Header with VC branding */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* VC Logo/Initial */}
          <div
            className="flex h-12 w-12 items-center justify-center rounded-lg text-lg font-bold text-white"
            style={{ backgroundColor: thesis.brandColor }}
          >
            {thesis.vcShortName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {thesis.vcName}
            </h3>
            <p className="text-sm text-muted-foreground">{thesis.year}</p>
          </div>
        </div>

        {/* RFS Badge */}
        {thesis.hasRFSProblems && (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-600 dark:text-green-400">
            Has RFS
          </span>
        )}
      </div>

      {/* Title */}
      <h4 className="mb-2 text-xl font-bold text-foreground">
        {thesis.title}
      </h4>

      {/* Subtitle */}
      <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
        {thesis.subtitle}
      </p>

      {/* Summary */}
      <p className="mb-4 text-sm text-muted-foreground line-clamp-3">
        {thesis.summary.split('\n\n')[0]}
      </p>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {formattedDate}
        </span>
        {thesis.themeCount && (
          <span className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            {thesis.themeCount} themes
          </span>
        )}
        {thesis.problemCount && (
          <span className="flex items-center gap-1">
            {thesis.problemCount} problems
          </span>
        )}
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {thesis.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
        {thesis.tags.length > 4 && (
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            +{thesis.tags.length - 4}
          </span>
        )}
      </div>
    </Link>
  )
}

interface FeaturedBlogCardProps {
  thesis: VCThesis
  className?: string
}

export function FeaturedBlogCard({ thesis, className }: FeaturedBlogCardProps) {
  const formattedDate = new Date(thesis.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <Link
      href={`/landscape/${thesis.slug}`}
      className={cn(
        'group relative block overflow-hidden rounded-xl border bg-card transition-all hover:border-foreground/20 hover:shadow-lg',
        className
      )}
    >
      {/* Colored header bar */}
      <div
        className="h-2"
        style={{ backgroundColor: thesis.brandColor }}
      />

      <div className="p-8">
        {/* Header with VC branding */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* VC Logo/Initial */}
            <div
              className="flex h-16 w-16 items-center justify-center rounded-xl text-2xl font-bold text-white"
              style={{ backgroundColor: thesis.brandColor }}
            >
              {thesis.vcShortName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {thesis.vcName}
              </h3>
              <p className="text-sm text-muted-foreground">{formattedDate}</p>
            </div>
          </div>

          {/* RFS Badge */}
          {thesis.hasRFSProblems && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-600 dark:text-green-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Has Problems
            </span>
          )}
        </div>

        {/* Title */}
        <h4 className="mb-3 text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
          {thesis.title}
        </h4>

        {/* Subtitle */}
        <p className="mb-4 text-lg text-muted-foreground">
          {thesis.subtitle}
        </p>

        {/* Summary */}
        <p className="mb-6 text-muted-foreground line-clamp-4">
          {thesis.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {thesis.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
