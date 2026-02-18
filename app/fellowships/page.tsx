'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Award, Sparkles, TrendingUp, Globe, DollarSign } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { allFellowships } from '@/data/fellowships'
import {
  getFocusByPopularity,
  getFocusStats,
  getFellowshipsForFocus,
  CATEGORY_META,
} from '@/lib/fellowship-themes'
import { AnimatedStats } from '@/components/pillar/animated-stats'
import { CategoryInfographic, type CategoryItem } from '@/components/pillar/category-infographic'
import { EntityQuickLinks, type QuickLinkEntity } from '@/components/pillar/entity-quick-links'

export default function FellowshipsPage() {
  const [selectedFocus, setSelectedFocus] = useState<string | null>(null)
  const [showOpenOnly, setShowOpenOnly] = useState(false)

  const focusAreas = useMemo(() => getFocusByPopularity(), [])
  const stats = useMemo(() => getFocusStats(), [])
  const globalCount = useMemo(
    () => allFellowships.filter((f) => f.geographicScope === 'global').length,
    []
  )

  // Filter fellowships by selected focus area and optional open-only mode
  const filteredFellowships = useMemo(() => {
    if (!selectedFocus) return allFellowships
    return getFellowshipsForFocus(selectedFocus)
  }, [selectedFocus])

  const visibleFellowships = useMemo(() => {
    if (!showOpenOnly) return filteredFellowships
    return filteredFellowships.filter(
      (f) => f.applicationStatus === 'open' || f.applicationStatus === 'rolling'
    )
  }, [filteredFellowships, showOpenOnly])

  // Group fellowships by category for the category sections
  const categorizedFellowships = useMemo(() => {
    const categories = new Map<string, typeof allFellowships>()
    for (const f of visibleFellowships) {
      const existing = categories.get(f.category) || []
      existing.push(f)
      categories.set(f.category, existing)
    }
    return categories
  }, [visibleFellowships])

  // Map focus areas to shared CategoryItem format
  const categoryItems: CategoryItem[] = useMemo(
    () =>
      focusAreas.map((area) => ({
        slug: area.slug,
        name: area.name,
        count: area.fellowshipCount,
        totalCount: area.totalFellowships,
        consensusPercentage: area.consensusPercentage,
        color: area.color,
        entities: area.fellowships.map((f) => ({
          slug: f.slug,
          shortName: f.shortName,
          brandColor: f.brandColor,
          name: f.name,
        })),
        detailUrl: `/fellowships/focus/${area.slug}`,
      })),
    [focusAreas]
  )

  // Map fellowships to shared QuickLinkEntity format
  const quickLinkEntities: QuickLinkEntity[] = useMemo(
    () =>
      filteredFellowships.map((fellowship) => ({
        slug: fellowship.slug,
        shortName: fellowship.shortName,
        brandColor: fellowship.brandColor,
        href: `/fellowships/${fellowship.slug}`,
        subtitle: CATEGORY_META[fellowship.category]?.name || fellowship.category,
        badge: fellowship.geographicScope === 'global'
          ? {
              label: 'Global',
              icon: Globe,
              colorClass: 'text-blue-600 dark:text-blue-400',
              bgClass: 'bg-blue-500/10',
            }
          : undefined,
      })),
    [filteredFellowships]
  )

  const statusCounts = useMemo(() => {
    const counts = { open: 0, rolling: 0, closed: 0 }
    for (const fellowship of allFellowships) {
      if (fellowship.applicationStatus === 'open') counts.open += 1
      else if (fellowship.applicationStatus === 'rolling') counts.rolling += 1
      else if (fellowship.applicationStatus === 'closed') counts.closed += 1
    }
    return counts
  }, [])

  const getStatusBadge = (status?: 'open' | 'closed' | 'rolling' | 'unknown') => {
    if (!status || status === 'unknown') return undefined
    if (status === 'open') {
      return 'inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400'
    }
    if (status === 'rolling') {
      return 'inline-flex items-center rounded-full bg-blue-500/10 px-2 py-0.5 text-[11px] font-medium text-blue-600 dark:text-blue-400'
    }
    return 'inline-flex items-center rounded-full bg-slate-500/10 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:text-slate-400'
  }

  // Stats items for AnimatedStats
  const statItems = useMemo(
    () => [
      {
        icon: Award,
        value: stats.totalFellowships,
        label: 'Fellowships',
        color: 'text-violet-500',
        bgColor: 'bg-violet-500/10',
      },
      {
        icon: TrendingUp,
        value: stats.totalFocusAreas,
        label: 'Focus Areas',
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
      },
      {
        icon: Globe,
        value: globalCount,
        label: 'Global Programs',
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
      },
      {
        icon: DollarSign,
        value: stats.mostPopularCount,
        suffix: `/${stats.totalFellowships}`,
        label: `In ${stats.mostPopularFocus.length > 12 ? stats.mostPopularFocus.slice(0, 12) + '…' : stats.mostPopularFocus}`,
        fullLabel: `Fellowships focused on ${stats.mostPopularFocus}`,
        color: 'text-amber-500',
        bgColor: 'bg-amber-500/10',
      },
    ],
    [stats, globalCount]
  )

  return (
    <div className="min-h-screen pt-16">
      <Header />
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Fellowship Guide 2026',
            description:
              `Discover ${allFellowships.length} top fellowships for ambitious builders, researchers, and founders.`,
            url: 'https://openquest.com/fellowships',
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: allFellowships.length,
              itemListElement: allFellowships.map((f, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: f.name,
                url: `https://openquest.com/fellowships/${f.slug}`,
              })),
            },
          }),
        }}
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-background to-violet-500/5" />
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />

        <div className="container relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">Fellowships</span>
          </nav>

          <div className="flex items-start gap-4 mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="h-16 w-16 rounded-xl bg-gradient-to-br from-amber-500 to-violet-500 flex items-center justify-center text-white flex-shrink-0"
            >
              <Award className="h-8 w-8" />
            </motion.div>
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
              >
                Fellowship Guide{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-violet-500">
                  2026
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg sm:text-xl text-muted-foreground max-w-3xl"
              >
                Comprehensive guide to {allFellowships.length} top fellowships for ambitious
                builders, researchers, and founders. Explore focus areas, funding amounts, and find
                problems to work on before you apply.
              </motion.p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              href="/feed"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Sparkles className="h-4 w-4" />
              Browse Problems
            </Link>
            <Link
              href="#focus-areas"
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              Explore Focus Areas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <AnimatedStats items={statItems} />
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            Open now: {statusCounts.open}
          </span>
          <span className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400">
            Rolling: {statusCounts.rolling}
          </span>
          <span className="inline-flex items-center rounded-full bg-slate-500/10 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-400">
            Closed: {statusCounts.closed}
          </span>
        </div>
      </div>

      {/* Focus Area Infographic */}
      <div id="focus-areas" className="container mx-auto max-w-6xl px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Focus Areas</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Click a focus area to filter fellowships. Larger bubbles indicate more fellowships
            covering that area.
          </p>
        </div>

        <CategoryInfographic
          items={categoryItems}
          onSelect={setSelectedFocus}
          selected={selectedFocus}
          labels={{
            entityNoun: 'fellowships',
            emergingLabel: 'Specialized focus areas',
            viewAllLabel: 'View all {name} fellowships',
            selectedPrefix: 'Showing fellowships for:',
          }}
        />
      </div>

      {/* Fellowship Quick Links */}
      <div className="container mx-auto max-w-6xl px-4 py-12 border-t">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">
              {selectedFocus
                ? `Fellowships in ${focusAreas.find((a) => a.slug === selectedFocus)?.name}`
                : 'All Fellowships'}
            </h2>
            <p className="text-muted-foreground">
              {selectedFocus
                ? `${visibleFellowships.length} fellowships cover this focus area`
                : `${visibleFellowships.length} fellowships for ambitious people`}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={showOpenOnly}
                onChange={(e) => setShowOpenOnly(e.target.checked)}
                className="h-4 w-4 rounded border-border bg-background"
              />
              Open only
            </label>
            {selectedFocus && (
              <button
                onClick={() => setSelectedFocus(null)}
                className="text-sm text-primary hover:underline"
              >
                Show all
              </button>
            )}
          </div>
        </div>

        <EntityQuickLinks
          entities={
            showOpenOnly
              ? quickLinkEntities.filter((entity) => {
                  const fellowship = visibleFellowships.find((f) => f.slug === entity.slug)
                  return Boolean(fellowship)
                })
              : quickLinkEntities
          }
        />
      </div>

      {/* Category Sections */}
      <div className="container mx-auto max-w-6xl px-4 py-12 border-t">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Browse by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Fellowships organized by type — from startup accelerators to research grants to creative
            awards.
          </p>
        </div>

        <div className="space-y-12">
          {Array.from(categorizedFellowships.entries()).map(([category, fellowships]) => {
            const meta = CATEGORY_META[category as keyof typeof CATEGORY_META]
            if (!meta) return null
            return (
              <div key={category}>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: meta.color }}
                  />
                  <h3 className="text-xl font-bold">{meta.name}</h3>
                  <span className="text-sm text-muted-foreground">
                    ({fellowships.length})
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{meta.description}</p>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {fellowships.map((fellowship, i) => (
                    <motion.div
                      key={fellowship.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={`/fellowships/${fellowship.slug}`}
                        className="flex items-start gap-4 p-5 rounded-xl border bg-card hover:border-foreground/20 transition-all group"
                      >
                        <div
                          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-lg font-bold text-white transition-transform group-hover:scale-105"
                          style={{ backgroundColor: fellowship.brandColor }}
                        >
                          {fellowship.shortName.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold group-hover:text-primary transition-colors truncate">
                              {fellowship.name}
                            </h4>
                            {fellowship.applicationStatus && fellowship.applicationStatus !== 'unknown' && (
                              <span className={getStatusBadge(fellowship.applicationStatus)}>
                                {fellowship.applicationStatus === 'rolling'
                                  ? 'Rolling'
                                  : fellowship.applicationStatus === 'open'
                                    ? 'Open'
                                    : 'Closed'}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {fellowship.fundingAmount}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {fellowship.description}
                          </p>
                          {fellowship.lastVerifiedAt && (
                            <p className="text-[11px] text-muted-foreground/80 mt-2">
                              Verified {new Date(fellowship.lastVerifiedAt).toLocaleDateString('en-US')}
                            </p>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t bg-muted/20 py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Find problems worth solving</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Browse real problems submitted by founders, investors, and industry experts. Find
            inspiration for your fellowship application.
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
              href="/landscape"
              className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 font-medium transition-colors hover:bg-accent"
            >
              Funding Landscape
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
