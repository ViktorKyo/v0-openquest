import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  DollarSign,
  ExternalLink,
  Globe,
  Landmark,
  MapPin,
  TrendingUp,
  Users,
} from 'lucide-react'
import { allAccelerators, getAcceleratorBySlug } from '@/data/accelerators'
import { slugifyAcceleratorFocus } from '@/lib/accelerator-themes'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const accelerator = getAcceleratorBySlug(slug)

  if (!accelerator) {
    return { title: 'Not Found | OpenQuest' }
  }

  const description = accelerator.description.slice(0, 160)
  const ogImageUrl = `/api/og?${new URLSearchParams({
    title: accelerator.name,
    description: description.slice(0, 140),
    category: 'Accelerators',
  }).toString()}`

  return {
    title: `${accelerator.name} | Top-Tier Accelerators | OpenQuest`,
    description,
    alternates: { canonical: `/accelerators/${accelerator.slug}` },
    openGraph: {
      title: `${accelerator.name} | Top-Tier Accelerators`,
      description,
      type: 'article',
      url: `/accelerators/${accelerator.slug}`,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: accelerator.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${accelerator.name} | Top-Tier Accelerators`,
      description,
      images: [ogImageUrl],
    },
  }
}

export async function generateStaticParams() {
  return allAccelerators.map((accelerator) => ({
    slug: accelerator.slug,
  }))
}

export default async function AcceleratorDetailPage({ params }: PageProps) {
  const { slug } = await params
  const accelerator = getAcceleratorBySlug(slug)

  if (!accelerator) {
    notFound()
  }

  const relatedAccelerators = allAccelerators
    .filter((a) => a.slug !== accelerator.slug)
    .filter((a) => a.tags.some((tag) => accelerator.tags.includes(tag)))
    .slice(0, 4)

  const statusLabelMap: Record<string, string> = {
    open: 'Open',
    rolling: 'Rolling',
    closed: 'Closed',
    unknown: 'Unknown',
  }

  const scopeLabels: Record<string, string> = {
    global: 'Global',
    us: 'United States',
    canada: 'Canada',
    uk: 'United Kingdom',
    eu: 'European Union',
    'multi-west': 'US + Canada + UK + EU',
  }

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: accelerator.name,
            description: accelerator.description,
            author: {
              '@type': 'Organization',
              name: accelerator.organization,
            },
            publisher: {
              '@type': 'Organization',
              name: 'OpenQuest',
              url: 'https://openquest.com',
            },
            url: `https://openquest.com/accelerators/${accelerator.slug}`,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://openquest.com/accelerators/${accelerator.slug}`,
            },
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
                  name: accelerator.name,
                  item: `https://openquest.com/accelerators/${accelerator.slug}`,
                },
              ],
            },
          }),
        }}
      />

      <div className="border-b">
        <div className="h-2" style={{ backgroundColor: accelerator.brandColor }} />

        <div className="container mx-auto max-w-4xl px-4 py-12">
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <Link href="/accelerators" className="transition-colors hover:text-foreground">
              Accelerators
            </Link>
            <span>/</span>
            <span className="font-medium text-foreground">{accelerator.shortName}</span>
          </nav>

          <div className="mb-8 flex items-start gap-6">
            <div
              className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-xl text-3xl font-bold text-white"
              style={{ backgroundColor: accelerator.brandColor }}
            >
              {accelerator.shortName.slice(0, 2).toUpperCase()}
            </div>

            <div className="flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold sm:text-4xl">{accelerator.name}</h1>
                {accelerator.applicationStatus && (
                  <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm font-medium">
                    {statusLabelMap[accelerator.applicationStatus]}
                  </span>
                )}
              </div>
              <p className="mb-4 text-lg text-muted-foreground">by {accelerator.organization}</p>
              <p className="mb-5 text-muted-foreground">{accelerator.description}</p>

              <a
                href={accelerator.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Visit Program
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-lg border bg-card p-4">
              <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                Funding Model
              </div>
              <p className="text-sm font-semibold">{accelerator.fundingModel}</p>
            </div>

            {accelerator.typicalCheckSize && (
              <div className="rounded-lg border bg-card p-4">
                <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <Landmark className="h-4 w-4" />
                  Typical Check
                </div>
                <p className="text-sm font-semibold">{accelerator.typicalCheckSize}</p>
              </div>
            )}

            {accelerator.equityTerms && (
              <div className="rounded-lg border bg-card p-4">
                <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  Equity Terms
                </div>
                <p className="text-sm font-semibold">{accelerator.equityTerms}</p>
              </div>
            )}

            <div className="rounded-lg border bg-card p-4">
              <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                Duration
              </div>
              <p className="text-sm font-semibold">{accelerator.duration}</p>
            </div>

            <div className="rounded-lg border bg-card p-4">
              <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                Cohort Cadence
              </div>
              <p className="text-sm font-semibold">{accelerator.cohortCadence}</p>
            </div>

            <div className="rounded-lg border bg-card p-4">
              <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Application Cycle
              </div>
              <p className="text-sm font-semibold">{accelerator.applicationCycle}</p>
            </div>

            {accelerator.deadline && (
              <div className="rounded-lg border bg-card p-4">
                <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Deadline
                </div>
                <p className="text-sm font-semibold">{accelerator.deadline}</p>
              </div>
            )}

            <div className="rounded-lg border bg-card p-4">
              <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                HQ Region
              </div>
              <p className="text-sm font-semibold">{accelerator.hqRegion}</p>
            </div>

            <div className="rounded-lg border bg-card p-4">
              <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="h-4 w-4" />
                Geographic Scope
              </div>
              <p className="text-sm font-semibold">
                {scopeLabels[accelerator.geographicScope] || accelerator.geographicScope}
              </p>
            </div>

            {accelerator.lastVerifiedAt && (
              <div className="rounded-lg border bg-card p-4">
                <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Last Verified
                </div>
                <p className="text-sm font-semibold">
                  {new Date(accelerator.lastVerifiedAt).toLocaleDateString('en-US')}
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {accelerator.tags.map((tag) => (
              <Link
                key={tag}
                href={`/accelerators/focus/${slugifyAcceleratorFocus(tag)}`}
                className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted/80"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="mb-12">
          <h3 className="mb-4 text-xl font-bold">Summary</h3>
          {accelerator.summary.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="space-y-12">
          {accelerator.sections.map((section, index) => (
            <div key={index} className="border-t pt-8">
              <h3 className="mb-4 text-xl font-bold">{section.title}</h3>
              {section.content && (
                <p className="mb-4 text-muted-foreground">{section.content}</p>
              )}
              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <ul className="space-y-2">
                  {section.bulletPoints.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-3 text-muted-foreground">
                      <span
                        className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                        style={{ backgroundColor: accelerator.brandColor }}
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {accelerator.sourceLinks && accelerator.sourceLinks.length > 0 && (
          <div className="mt-12 rounded-xl border bg-muted/20 p-6">
            <h3 className="mb-3 text-lg font-bold">Official Sources</h3>
            <ul className="space-y-2 text-sm">
              {accelerator.sourceLinks.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-primary hover:underline"
                  >
                    {source.label}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {accelerator.notableAlumni && accelerator.notableAlumni.length > 0 && (
          <div className="mt-8 rounded-xl border bg-card p-6">
            <h3 className="mb-3 text-lg font-bold">Notable Alumni</h3>
            <div className="flex flex-wrap gap-2">
              {accelerator.notableAlumni.map((alumni) => (
                <span key={alumni} className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
                  {alumni}
                </span>
              ))}
            </div>
          </div>
        )}

        {relatedAccelerators.length > 0 && (
          <div className="mt-12 border-t pt-8">
            <h3 className="mb-6 text-xl font-bold">Similar Accelerators</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedAccelerators.map((related) => (
                <Link
                  key={related.slug}
                  href={`/accelerators/${related.slug}`}
                  className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:border-foreground/20"
                >
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg text-lg font-bold text-white"
                    style={{ backgroundColor: related.brandColor }}
                  >
                    {related.shortName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{related.name}</p>
                    <p className="text-sm text-muted-foreground">{related.typicalCheckSize || related.fundingModel}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border-t bg-muted/20 py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold">Ready to match an idea to this accelerator?</h2>
          <p className="mb-8 text-muted-foreground">
            Browse high-signal problems and validate demand before your next application cycle.
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
