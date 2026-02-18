import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, TrendingUp, Users, Globe, Award, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import {
  getFocusBySlug,
  getRelatedFocusAreas,
  getAllFocusSlugs,
} from '@/lib/fellowship-themes'
import { allFellowships } from '@/data/fellowships'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const focus = getFocusBySlug(slug)

  if (!focus) {
    return { title: 'Focus Area Not Found | OpenQuest' }
  }

  const ogImageUrl = `/api/og?${new URLSearchParams({
    title: `${focus.name} Fellowships`,
    description: focus.seo.description.slice(0, 140),
    category: 'Fellowship Guide',
  }).toString()}`

  return {
    title: focus.seo.title,
    description: focus.seo.description,
    alternates: { canonical: `/fellowships/focus/${focus.slug}` },
    openGraph: {
      title: `${focus.name} Fellowships | Fellowship Guide`,
      description: focus.seo.description,
      type: 'website',
      url: `/fellowships/focus/${focus.slug}`,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: `${focus.name} Fellowships` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${focus.name} Fellowships`,
      description: focus.seo.description,
      images: [ogImageUrl],
    },
  }
}

export async function generateStaticParams() {
  const slugs = getAllFocusSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function FocusAreaPage({ params }: PageProps) {
  const { slug } = await params
  const focus = getFocusBySlug(slug)

  if (!focus) {
    notFound()
  }

  const relatedFocusAreas = getRelatedFocusAreas(focus.slug, 5)

  // Get full fellowship data for the fellowships in this focus area
  const fellowships = focus.fellowships
    .map((f) => allFellowships.find((af) => af.slug === f.slug))
    .filter(Boolean)

  const globalCount = fellowships.filter(
    (f) => f!.geographicScope === 'global'
  ).length

  return (
    <div className="min-h-screen">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `${focus.name} Fellowships`,
            description: focus.seo.description,
            url: `https://openquest.com/fellowships/focus/${focus.slug}`,
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://openquest.com' },
                { '@type': 'ListItem', position: 2, name: 'Fellowships', item: 'https://openquest.com/fellowships' },
                { '@type': 'ListItem', position: 3, name: focus.name, item: `https://openquest.com/fellowships/focus/${focus.slug}` },
              ],
            },
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: fellowships.length,
              itemListElement: fellowships.map((f, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: f!.name,
                url: `https://openquest.com/fellowships/${f!.slug}`,
              })),
            },
          }),
        }}
      />

      {/* Hero Section */}
      <div className="border-b bg-gradient-to-b from-muted/50 via-background to-background">
        <div className="container mx-auto max-w-6xl px-4 py-12 sm:py-16">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/fellowships" className="hover:text-foreground transition-colors">
              Fellowships
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{focus.name}</span>
          </nav>

          <div className="flex items-start gap-4 mb-6">
            <div
              className="h-16 w-16 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${focus.color}20` }}
            >
              <TrendingUp className="h-8 w-8" style={{ color: focus.color }} />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
                {focus.name}
              </h1>
              <p className="text-lg text-muted-foreground">
                {focus.fellowshipCount} of {focus.totalFellowships} fellowships focus on this area (
                {focus.consensusPercentage}% consensus)
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
                <Award className="h-5 w-5 text-violet-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{focus.fellowshipCount}</p>
                <p className="text-sm text-muted-foreground">Fellowships</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Globe className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{globalCount}</p>
                <p className="text-sm text-muted-foreground">Global Programs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fellowships in this focus area */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Fellowships in {focus.name}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fellowships.map((fellowship) => (
            <Link
              key={fellowship!.slug}
              href={`/fellowships/${fellowship!.slug}`}
              className="flex items-start gap-4 p-6 rounded-xl border bg-card hover:border-foreground/20 transition-all group"
            >
              <div
                className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl text-xl font-bold text-white transition-transform group-hover:scale-105"
                style={{ backgroundColor: fellowship!.brandColor }}
              >
                {fellowship!.shortName.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold group-hover:text-primary transition-colors truncate">
                    {fellowship!.name}
                  </h3>
                  {fellowship!.geographicScope === 'global' && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400">
                      <Globe className="h-3 w-3" />
                      Global
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {fellowship!.fundingAmount}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {fellowship!.organization} · {fellowship!.duration}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Related focus areas */}
      {relatedFocusAreas.length > 0 && (
        <div className="container mx-auto max-w-6xl px-4 py-12 border-t">
          <h2 className="text-2xl font-bold mb-6">Related Focus Areas</h2>
          <p className="text-muted-foreground mb-6">
            Fellowships in {focus.name} also tend to cover these areas:
          </p>
          <div className="flex flex-wrap gap-3">
            {relatedFocusAreas.map((related) => (
              <Link
                key={related.slug}
                href={`/fellowships/focus/${related.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border hover:border-foreground/20 transition-colors"
              >
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: related.color }}
                />
                <span>{related.name}</span>
                <span className="text-muted-foreground text-sm">
                  ({related.fellowshipCount} fellowships)
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="border-t bg-muted/20 py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Interested in {focus.name}?
          </h2>
          <p className="text-muted-foreground mb-8">
            Browse problems related to this focus area, or explore other fellowship themes.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/feed"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Browse Problems
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/fellowships"
              className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 font-medium transition-colors hover:bg-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              All Fellowships
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
