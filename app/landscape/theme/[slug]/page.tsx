import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, TrendingUp, Users, Lightbulb } from 'lucide-react'
import type { Metadata } from 'next'
import {
  getThemeBySlug,
  getRelatedThemes,
  getAllThemeSlugs,
} from '@/lib/funding-themes'
import { allVCTheses, getVCsByTag } from '@/data/vc-theses'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const theme = getThemeBySlug(slug)

  if (!theme) {
    return {
      title: 'Theme Not Found | OpenQuest',
    }
  }

  const ogImageUrl = `/api/og?${new URLSearchParams({
    title: `${theme.name} Investment Theme`,
    description: theme.seo.description.slice(0, 140),
    category: 'VCs',
  }).toString()}`

  return {
    title: theme.seo.title,
    description: theme.seo.description,
    alternates: { canonical: `/landscape/theme/${theme.slug}` },
    openGraph: {
      title: `${theme.name} Investment Theme | VCs`,
      description: theme.seo.description,
      type: 'website',
      url: `/landscape/theme/${theme.slug}`,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: `${theme.name} Investment Theme` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${theme.name} Investment Theme`,
      description: theme.seo.description,
      images: [ogImageUrl],
    },
  }
}

export async function generateStaticParams() {
  const slugs = getAllThemeSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function ThemePage({ params }: PageProps) {
  const { slug } = await params
  const theme = getThemeBySlug(slug)

  if (!theme) {
    notFound()
  }

  // Get VCs for this theme
  const vcs = getVCsByTag(theme.name)
  const relatedThemes = getRelatedThemes(theme.slug, 5)

  // VCs with RFS problems in this theme
  const vcsWithProblems = vcs.filter((vc) => vc.hasRFSProblems)

  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `${theme.name} Investment Opportunities`,
            description: theme.seo.description,
            url: `https://openquest.com/landscape/theme/${theme.slug}`,
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://openquest.com' },
                { '@type': 'ListItem', position: 2, name: 'VCs', item: 'https://openquest.com/landscape' },
                { '@type': 'ListItem', position: 3, name: theme.name, item: `https://openquest.com/landscape/theme/${theme.slug}` },
              ],
            },
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: vcs.length,
              itemListElement: vcs.map((vc, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: vc.vcName,
                url: `https://openquest.com/landscape/${vc.slug}`,
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
            <Link href="/landscape" className="hover:text-foreground transition-colors">
              VCs
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{theme.name}</span>
          </nav>

          <div className="flex items-start gap-4 mb-6">
            <div
              className="h-16 w-16 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${theme.color}20` }}
            >
              <TrendingUp className="h-8 w-8" style={{ color: theme.color }} />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
                {theme.name}
              </h1>
              <p className="text-lg text-muted-foreground">
                {theme.vcCount} of {theme.totalVCs} top VCs are investing in this space (
                {theme.consensusPercentage}% consensus)
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
                <Users className="h-5 w-5 text-violet-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{theme.vcCount}</p>
                <p className="text-sm text-muted-foreground">VCs Investing</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <Lightbulb className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{vcsWithProblems.length}</p>
                <p className="text-sm text-muted-foreground">With RFS Problems</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VCs investing in this theme */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">VCs Investing in {theme.name}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vcs.map((vc) => (
            <Link
              key={vc.slug}
              href={`/landscape/${vc.slug}`}
              className="flex items-start gap-4 p-6 rounded-xl border bg-card hover:border-foreground/20 transition-all group"
            >
              <div
                className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl text-xl font-bold text-white transition-transform group-hover:scale-105"
                style={{ backgroundColor: vc.brandColor }}
              >
                {vc.vcShortName.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold group-hover:text-primary transition-colors truncate">
                    {vc.vcName}
                  </h3>
                  {vc.hasRFSProblems && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-600 dark:text-green-400">
                      <Lightbulb className="h-3 w-3" />
                      RFS
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{vc.title}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {vc.themeCount} themes · {vc.year}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Related themes */}
      {relatedThemes.length > 0 && (
        <div className="container mx-auto max-w-6xl px-4 py-12 border-t">
          <h2 className="text-2xl font-bold mb-6">Related Themes</h2>
          <p className="text-muted-foreground mb-6">
            VCs investing in {theme.name} also tend to invest in these areas:
          </p>
          <div className="flex flex-wrap gap-3">
            {relatedThemes.map((related) => (
              <Link
                key={related.slug}
                href={`/landscape/theme/${related.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border hover:border-foreground/20 transition-colors"
              >
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: related.color }}
                />
                <span>{related.name}</span>
                <span className="text-muted-foreground text-sm">
                  ({related.vcCount} VCs)
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
            Interested in {theme.name} opportunities?
          </h2>
          <p className="text-muted-foreground mb-8">
            Browse problems that VCs want solved in this space, or explore other investment
            themes.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/feed"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Browse {theme.name} Problems
            </Link>
            <Link
              href="/landscape"
              className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 font-medium transition-colors hover:bg-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to VCs
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
