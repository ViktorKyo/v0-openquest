import Link from 'next/link'
import { notFound } from 'next/navigation'
import { allVCTheses, getThesisBySlug } from '@/data/vc-theses'
import { getRelatedThemes, slugifyTheme } from '@/lib/funding-themes'
import { ArrowLeft, ExternalLink, Calendar, BookOpen, Lightbulb, TrendingUp } from 'lucide-react'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const thesis = getThesisBySlug(slug)

  if (!thesis) {
    return {
      title: 'Not Found | OpenQuest',
    }
  }

  const description = thesis.summary.slice(0, 160)
  const ogImageUrl = `/api/og?${new URLSearchParams({
    title: `${thesis.vcName} ${thesis.title}`,
    description: thesis.subtitle.slice(0, 140),
    category: 'VCs',
  }).toString()}`

  return {
    title: `${thesis.vcName} ${thesis.title} | VCs | OpenQuest`,
    description,
    alternates: { canonical: `/landscape/${thesis.slug}` },
    openGraph: {
      title: `${thesis.vcName} ${thesis.title} | VCs`,
      description: thesis.subtitle,
      type: 'article',
      url: `/landscape/${thesis.slug}`,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: `${thesis.vcName} ${thesis.title}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${thesis.vcName} ${thesis.title}`,
      description: thesis.subtitle,
      images: [ogImageUrl],
    },
  }
}

export async function generateStaticParams() {
  return allVCTheses.map((thesis) => ({
    slug: thesis.slug,
  }))
}

export default async function VCThesisPage({ params }: PageProps) {
  const { slug } = await params
  const thesis = getThesisBySlug(slug)

  if (!thesis) {
    notFound()
  }

  const formattedDate = new Date(thesis.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  const asOfFormattedDate = thesis.asOfDate
    ? new Date(thesis.asOfDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  // Get related VCs (those that share similar themes)
  const relatedVCs = allVCTheses
    .filter((t) => t.slug !== thesis.slug)
    .filter((t) => t.tags.some((tag) => thesis.tags.includes(tag)))
    .slice(0, 4)

  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: `${thesis.vcName} ${thesis.title}`,
            description: thesis.subtitle,
            author: {
              '@type': 'Organization',
              name: thesis.vcName,
            },
            publisher: {
              '@type': 'Organization',
              name: 'OpenQuest',
              url: 'https://openquest.com',
            },
            datePublished: thesis.publishedAt,
            dateModified: thesis.lastUpdated || thesis.publishedAt,
            url: `https://openquest.com/landscape/${thesis.slug}`,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://openquest.com/landscape/${thesis.slug}`,
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://openquest.com' },
                { '@type': 'ListItem', position: 2, name: 'VCs', item: 'https://openquest.com/landscape' },
                { '@type': 'ListItem', position: 3, name: thesis.vcName, item: `https://openquest.com/landscape/${thesis.slug}` },
              ],
            },
          }),
        }}
      />

      {/* Hero Section */}
      <div className="border-b">
        {/* Colored header bar */}
        <div className="h-2" style={{ backgroundColor: thesis.brandColor }} />

        <div className="container mx-auto max-w-4xl px-4 py-12">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/landscape" className="hover:text-foreground transition-colors">
              VCs
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{thesis.vcShortName}</span>
          </nav>

          {/* Header */}
          <div className="flex items-start gap-6 mb-8">
            {/* VC Logo */}
            <div
              className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-xl text-3xl font-bold text-white"
              style={{ backgroundColor: thesis.brandColor }}
            >
              {thesis.vcShortName.slice(0, 2).toUpperCase()}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl sm:text-4xl font-bold">{thesis.vcName}</h1>
                {thesis.hasRFSProblems && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-600 dark:text-green-400">
                    <Lightbulb className="h-3.5 w-3.5" />
                    Has RFS
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl text-muted-foreground mb-4">
                {thesis.title}
              </h2>
              <p className="text-lg text-muted-foreground mb-4">{thesis.subtitle}</p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formattedDate}
                </span>
                {thesis.themeCount && (
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4" />
                    {thesis.themeCount} themes
                  </span>
                )}
                <a
                  href={thesis.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary hover:underline"
                >
                  View Original
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Tags - Now linked to theme pages */}
          <div className="flex flex-wrap gap-2">
            {thesis.tags.map((tag) => (
              <Link
                key={tag}
                href={`/landscape/theme/${slugifyTheme(tag)}`}
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
          <h3 className="text-xl font-bold mb-4">Summary</h3>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {thesis.summary.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-muted-foreground mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {thesis.sections.map((section, index) => (
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
                        style={{ backgroundColor: thesis.brandColor }}
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Freshness + Evidence */}
        {(asOfFormattedDate || thesis.evidenceLinks?.length) && (
          <div className="mt-12 rounded-xl border bg-muted/20 p-6">
            <h3 className="text-lg font-bold mb-3">Freshness & Evidence</h3>
            {asOfFormattedDate && (
              <p className="text-sm text-muted-foreground mb-3">As of {asOfFormattedDate}</p>
            )}
            {thesis.evidenceLinks && thesis.evidenceLinks.length > 0 && (
              <ul className="space-y-2 text-sm">
                {thesis.evidenceLinks.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-primary hover:underline"
                    >
                      {link.label}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Founder engagement card */}
        {(thesis.engagementUrl || thesis.rfsPageUrl || thesis.hasRFSProblems) && (
          <div className="mt-12 rounded-xl border bg-muted/20 p-6">
            <h3 className="text-lg font-bold mb-2">How this VC engages founders</h3>
            <p className="text-muted-foreground mb-4">
              Use this entry point to review how {thesis.vcShortName} engages with early teams.
            </p>
            <Link
              href={
                thesis.rfsPageUrl ||
                thesis.engagementUrl ||
                '/feed?source=VC%20Partners'
              }
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {thesis.engagementLabel ||
                (thesis.hasRFSProblems ? `View ${thesis.vcShortName} RFS Signals` : `Contact ${thesis.vcShortName}`)}
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </div>
        )}

        {/* RFS Link */}
        {thesis.hasRFSProblems && thesis.rfsPageUrl && (
          <div className="mt-12 rounded-xl border bg-muted/30 p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-600">
                <Lightbulb className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">View Related Problems</h3>
                <p className="text-muted-foreground mb-4">
                  {thesis.vcName} has published specific problems they want founders to solve.
                  These problems are available in our feed.
                </p>
                <Link
                  href={thesis.rfsPageUrl}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  View {thesis.vcShortName} Problems
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Related VCs */}
        {relatedVCs.length > 0 && (
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-xl font-bold mb-6">Similar VCs</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedVCs.map((vc) => (
                <Link
                  key={vc.slug}
                  href={`/landscape/${vc.slug}`}
                  className="flex items-center gap-4 p-4 rounded-lg border hover:border-foreground/20 transition-colors"
                >
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg text-lg font-bold text-white"
                    style={{ backgroundColor: vc.brandColor }}
                  >
                    {vc.vcShortName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{vc.vcName}</p>
                    <p className="text-sm text-muted-foreground">{vc.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Source */}
        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            Source:{' '}
            <a
              href={thesis.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {thesis.sourceName}
            </a>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: {formattedDate}
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t bg-muted/20 py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Explore VCs</h2>
          <p className="text-muted-foreground mb-8">
            Discover what other top VCs are looking to fund.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/landscape"
              className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 font-medium transition-colors hover:bg-accent"
            >
              <TrendingUp className="h-4 w-4" />
              View All Themes
            </Link>
            <Link
              href="/feed"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Browse Problem Feed
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
