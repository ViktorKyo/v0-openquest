import Link from 'next/link'
import { notFound } from 'next/navigation'
import { allFellowships, getFellowshipBySlug } from '@/data/fellowships'
import { slugifyFocus } from '@/lib/fellowship-themes'
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Clock,
  DollarSign,
  Globe,
  Users,
  Award,
  MapPin,
  ArrowRight,
} from 'lucide-react'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const fellowship = getFellowshipBySlug(slug)

  if (!fellowship) {
    return { title: 'Not Found' }
  }

  const description = fellowship.description.slice(0, 160)
  const ogImageUrl = `/api/og?${new URLSearchParams({
    title: fellowship.name,
    description: description.slice(0, 140),
  }).toString()}`

  return {
    title: `${fellowship.name} | Fellowship Guide`,
    description,
    alternates: { canonical: `/fellowships/${fellowship.slug}` },
    openGraph: {
      title: `${fellowship.name} | Fellowship Guide`,
      description: fellowship.description,
      type: 'article',
      url: `/fellowships/${fellowship.slug}`,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: fellowship.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fellowship.name,
      description: fellowship.description,
      images: [ogImageUrl],
    },
  }
}

export async function generateStaticParams() {
  return allFellowships.map((f) => ({
    slug: f.slug,
  }))
}

export default async function FellowshipDetailPage({ params }: PageProps) {
  const { slug } = await params
  const fellowship = getFellowshipBySlug(slug)

  if (!fellowship) {
    notFound()
  }

  // Related fellowships (share tags)
  const relatedFellowships = allFellowships
    .filter((f) => f.slug !== fellowship.slug)
    .filter((f) => f.tags.some((tag) => fellowship.tags.includes(tag)))
    .slice(0, 4)

  // Scope label
  const scopeLabels: Record<string, string> = {
    global: 'Global',
    us: 'United States',
    'us-canada': 'US & Canada',
    uk: 'United Kingdom',
    'multi-country': 'Multiple countries',
  }

  return (
    <div className="min-h-screen">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: fellowship.name,
            description: fellowship.description,
            author: {
              '@type': 'Organization',
              name: fellowship.organization,
            },
            publisher: {
              '@type': 'Organization',
              name: 'OpenQuest',
              url: 'https://openquest.com',
            },
            url: `https://openquest.com/fellowships/${fellowship.slug}`,
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://openquest.com' },
                { '@type': 'ListItem', position: 2, name: 'Fellowships', item: 'https://openquest.com/fellowships' },
                { '@type': 'ListItem', position: 3, name: fellowship.name, item: `https://openquest.com/fellowships/${fellowship.slug}` },
              ],
            },
          }),
        }}
      />

      {/* Hero Section */}
      <div className="border-b">
        <div className="h-2" style={{ backgroundColor: fellowship.brandColor }} />

        <div className="container mx-auto max-w-4xl px-4 py-12">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link href="/fellowships" className="hover:text-foreground transition-colors">Fellowships</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{fellowship.shortName}</span>
          </nav>

          {/* Header */}
          <div className="flex items-start gap-6 mb-8">
            <div
              className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-xl text-3xl font-bold text-white"
              style={{ backgroundColor: fellowship.brandColor }}
            >
              {fellowship.shortName.slice(0, 2).toUpperCase()}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="text-3xl sm:text-4xl font-bold">{fellowship.name}</h1>
                {fellowship.geographicScope === 'global' && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                    <Globe className="h-3.5 w-3.5" />
                    Global
                  </span>
                )}
              </div>
              <p className="text-lg text-muted-foreground mb-4">
                by {fellowship.organization}
              </p>
              <p className="text-muted-foreground mb-4">
                {fellowship.description}
              </p>

              {/* Apply CTA */}
              <a
                href={fellowship.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Apply Now
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Key Facts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <DollarSign className="h-4 w-4" />
                Funding
              </div>
              <p className="font-semibold">{fellowship.fundingAmount}</p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Clock className="h-4 w-4" />
                Duration
              </div>
              <p className="font-semibold">{fellowship.duration}</p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <MapPin className="h-4 w-4" />
                Geography
              </div>
              <p className="font-semibold">{scopeLabels[fellowship.geographicScope] || fellowship.geographicScope}</p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Users className="h-4 w-4" />
                Eligibility
              </div>
              <p className="font-semibold text-sm">{fellowship.eligibility}</p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Calendar className="h-4 w-4" />
                Application
              </div>
              <p className="font-semibold text-sm">{fellowship.applicationCycle}</p>
            </div>
            {fellowship.lastVerifiedAt && (
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Calendar className="h-4 w-4" />
                  Last verified
                </div>
                <p className="font-semibold text-sm">
                  {new Date(fellowship.lastVerifiedAt).toLocaleDateString('en-US')}
                </p>
              </div>
            )}
            {fellowship.deadline && (
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Calendar className="h-4 w-4" />
                  Deadline
                </div>
                <p className="font-semibold text-sm">{fellowship.deadline}</p>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {fellowship.tags.map((tag) => (
              <Link
                key={tag}
                href={`/fellowships/focus/${slugifyFocus(tag)}`}
                className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground hover:bg-muted/80 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-4 py-12">
        {/* Summary */}
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-4">About This Fellowship</h3>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {fellowship.summary.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-muted-foreground mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {fellowship.sections.map((section, index) => (
            <div key={index} className="border-t pt-8">
              <h3 className="text-xl font-bold mb-4">{section.title}</h3>

              {section.content && (
                <div className="prose prose-neutral dark:prose-invert max-w-none mb-4">
                  {section.content.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-muted-foreground mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <ul className="space-y-2">
                  {section.bulletPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span
                        className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                        style={{ backgroundColor: fellowship.brandColor }}
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Related Fellowships */}
        {relatedFellowships.length > 0 && (
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-xl font-bold mb-6">Similar Fellowships</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedFellowships.map((f) => (
                <Link
                  key={f.slug}
                  href={`/fellowships/${f.slug}`}
                  className="flex items-center gap-4 p-4 rounded-lg border hover:border-foreground/20 transition-colors"
                >
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg text-lg font-bold text-white"
                    style={{ backgroundColor: f.brandColor }}
                  >
                    {f.shortName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{f.name}</p>
                    <p className="text-sm text-muted-foreground">{f.fundingAmount}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Source */}
        <div className="mt-12 pt-8 border-t">
          {fellowship.sourceLinks && fellowship.sourceLinks.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Official sources</h4>
              <ul className="space-y-1">
                {fellowship.sourceLinks.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      {source.label}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <a
            href={fellowship.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            Visit {fellowship.name} website
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t bg-muted/20 py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Explore More Fellowships</h2>
          <p className="text-muted-foreground mb-8">
            Discover other fellowships and find problems to work on.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/fellowships"
              className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 font-medium transition-colors hover:bg-accent"
            >
              <Award className="h-4 w-4" />
              All Fellowships
            </Link>
            <Link
              href="/feed"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Browse Problems
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
