import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight, Compass, Globe, TrendingUp } from 'lucide-react'
import {
  getAcceleratorFocusBySlug,
  getRelatedAcceleratorFocusAreas,
  getAllAcceleratorFocusSlugs,
} from '@/lib/accelerator-themes'
import { allAccelerators } from '@/data/accelerators'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const focus = getAcceleratorFocusBySlug(slug)

  if (!focus) {
    return { title: 'Focus Area Not Found | OpenQuest' }
  }

  const ogImageUrl = `/api/og?${new URLSearchParams({
    title: `${focus.name} Accelerators`,
    description: focus.seo.description.slice(0, 140),
    category: 'Accelerators',
  }).toString()}`

  return {
    title: focus.seo.title,
    description: focus.seo.description,
    alternates: { canonical: `/accelerators/focus/${focus.slug}` },
    openGraph: {
      title: `${focus.name} Accelerators | OpenQuest`,
      description: focus.seo.description,
      type: 'website',
      url: `/accelerators/focus/${focus.slug}`,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: `${focus.name} Accelerators` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${focus.name} Accelerators`,
      description: focus.seo.description,
      images: [ogImageUrl],
    },
  }
}

export async function generateStaticParams() {
  return getAllAcceleratorFocusSlugs().map((slug) => ({ slug }))
}

export default async function AcceleratorFocusPage({ params }: PageProps) {
  const { slug } = await params
  const focus = getAcceleratorFocusBySlug(slug)

  if (!focus) {
    notFound()
  }

  const relatedFocusAreas = getRelatedAcceleratorFocusAreas(focus.slug, 5)

  const accelerators = focus.accelerators
    .map((accelerator) => allAccelerators.find((entry) => entry.slug === accelerator.slug))
    .filter(Boolean)

  const openCount = accelerators.filter((a) => a?.applicationStatus === 'open').length
  const rollingCount = accelerators.filter((a) => a?.applicationStatus === 'rolling').length

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `${focus.name} Accelerators`,
            description: focus.seo.description,
            url: `https://openquest.com/accelerators/focus/${focus.slug}`,
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://openquest.com' },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Accelerators',
                  item: 'https://openquest.com/accelerators',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: focus.name,
                  item: `https://openquest.com/accelerators/focus/${focus.slug}`,
                },
              ],
            },
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: accelerators.length,
              itemListElement: accelerators.map((a, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: a?.name,
                url: `https://openquest.com/accelerators/${a?.slug}`,
              })),
            },
          }),
        }}
      />

      <div className="border-b bg-gradient-to-b from-muted/50 via-background to-background">
        <div className="container mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <Link href="/accelerators" className="transition-colors hover:text-foreground">
              Accelerators
            </Link>
            <span>/</span>
            <span className="font-medium text-foreground">{focus.name}</span>
          </nav>

          <div className="mb-6 flex items-start gap-4">
            <div
              className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${focus.color}20` }}
            >
              <TrendingUp className="h-8 w-8" style={{ color: focus.color }} />
            </div>
            <div>
              <h1 className="mb-2 text-4xl font-bold tracking-tight sm:text-5xl">{focus.name}</h1>
              <p className="text-lg text-muted-foreground">
                {focus.acceleratorCount} of {focus.totalAccelerators} top accelerators focus on this area ({focus.consensusPercentage}% consensus)
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
                <Compass className="h-5 w-5 text-violet-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{focus.acceleratorCount}</p>
                <p className="text-sm text-muted-foreground">Accelerators</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <Globe className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{openCount + rollingCount}</p>
                <p className="text-sm text-muted-foreground">Open or Rolling</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-12">
        <h2 className="mb-6 text-2xl font-bold">Accelerators in {focus.name}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {accelerators.map((accelerator) => {
            if (!accelerator) return null
            return (
              <Link
                key={accelerator.slug}
                href={`/accelerators/${accelerator.slug}`}
                className="group flex items-start gap-4 rounded-xl border bg-card p-6 transition-all hover:border-foreground/20"
              >
                <div
                  className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl text-xl font-bold text-white transition-transform group-hover:scale-105"
                  style={{ backgroundColor: accelerator.brandColor }}
                >
                  {accelerator.shortName.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-semibold transition-colors group-hover:text-primary">
                      {accelerator.name}
                    </h3>
                    {accelerator.applicationStatus && accelerator.applicationStatus !== 'unknown' && (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                        {accelerator.applicationStatus === 'rolling' ? 'Rolling' : accelerator.applicationStatus === 'open' ? 'Open' : 'Closed'}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {accelerator.typicalCheckSize || accelerator.fundingModel}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {accelerator.hqRegion} · {accelerator.duration}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {relatedFocusAreas.length > 0 && (
        <div className="container mx-auto max-w-6xl border-t px-4 py-12">
          <h2 className="mb-6 text-2xl font-bold">Related Focus Areas</h2>
          <div className="flex flex-wrap gap-3">
            {relatedFocusAreas.map((related) => (
              <Link
                key={related.slug}
                href={`/accelerators/focus/${related.slug}`}
                className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 transition-colors hover:border-foreground/20"
              >
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: related.color }} />
                <span>{related.name}</span>
                <span className="text-sm text-muted-foreground">({related.acceleratorCount})</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="border-t bg-muted/20 py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold">Explore more programs and problem spaces</h2>
          <p className="mb-8 text-muted-foreground">
            Use this focus area to shortlist targets, then map your startup idea to active market pain.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/feed"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Browse Problems
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/accelerators"
              className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 font-medium transition-colors hover:bg-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              All Accelerators
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
