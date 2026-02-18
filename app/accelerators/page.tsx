'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, TrendingUp, Compass, Building2 } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { allAccelerators } from '@/data/accelerators'
import {
  ACCELERATOR_CATEGORY_META,
  getAcceleratorFocusByPopularity,
  getAcceleratorFocusStats,
  getAcceleratorsForFocus,
} from '@/lib/accelerator-themes'
import { AnimatedStats } from '@/components/pillar/animated-stats'
import { CategoryInfographic, type CategoryItem } from '@/components/pillar/category-infographic'
import { EntityQuickLinks, type QuickLinkEntity } from '@/components/pillar/entity-quick-links'

export default function AcceleratorsPage() {
  const [selectedFocus, setSelectedFocus] = useState<string | null>(null)
  const [showOpenOnly, setShowOpenOnly] = useState(false)

  const focusAreas = useMemo(() => getAcceleratorFocusByPopularity(), [])
  const stats = useMemo(() => getAcceleratorFocusStats(), [])

  const focusedAccelerators = useMemo(() => {
    if (!selectedFocus) return allAccelerators
    return getAcceleratorsForFocus(selectedFocus)
  }, [selectedFocus])

  const visibleAccelerators = useMemo(() => {
    if (!showOpenOnly) return focusedAccelerators
    return focusedAccelerators.filter(
      (a) => a.applicationStatus === 'open' || a.applicationStatus === 'rolling'
    )
  }, [focusedAccelerators, showOpenOnly])

  const categorizedAccelerators = useMemo(() => {
    const categories = new Map<string, typeof allAccelerators>()
    for (const accelerator of visibleAccelerators) {
      const existing = categories.get(accelerator.category) || []
      existing.push(accelerator)
      categories.set(accelerator.category, existing)
    }
    return categories
  }, [visibleAccelerators])

  const categoryItems: CategoryItem[] = useMemo(
    () =>
      focusAreas.map((focus) => ({
        slug: focus.slug,
        name: focus.name,
        count: focus.acceleratorCount,
        totalCount: focus.totalAccelerators,
        consensusPercentage: focus.consensusPercentage,
        color: focus.color,
        entities: focus.accelerators.map((a) => ({
          slug: a.slug,
          shortName: a.shortName,
          brandColor: a.brandColor,
          name: a.name,
        })),
        detailUrl: `/accelerators/focus/${focus.slug}`,
      })),
    [focusAreas]
  )

  const quickLinks: QuickLinkEntity[] = useMemo(
    () =>
      visibleAccelerators.map((accelerator) => ({
        slug: accelerator.slug,
        shortName: accelerator.shortName,
        brandColor: accelerator.brandColor,
        href: `/accelerators/${accelerator.slug}`,
        subtitle: accelerator.hqRegion,
      })),
    [visibleAccelerators]
  )

  const getStatusBadgeClass = (status?: 'open' | 'closed' | 'rolling' | 'unknown') => {
    if (status === 'open') {
      return 'inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400'
    }
    if (status === 'rolling') {
      return 'inline-flex items-center rounded-full bg-blue-500/10 px-2 py-0.5 text-[11px] font-medium text-blue-600 dark:text-blue-400'
    }
    if (status === 'closed') {
      return 'inline-flex items-center rounded-full bg-slate-500/10 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:text-slate-400'
    }
    return undefined
  }

  const statItems = useMemo(
    () => [
      {
        icon: Building2,
        value: stats.totalAccelerators,
        label: 'Top-Tier Accelerators',
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
        icon: Compass,
        value: stats.mostPopularCount,
        suffix: `/${stats.totalAccelerators}`,
        label: `In ${stats.mostPopularFocus}`,
        color: 'text-amber-500',
        bgColor: 'bg-amber-500/10',
      },
    ],
    [stats]
  )

  return (
    <div className="min-h-screen pt-16">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Top-Tier Accelerators 2026',
            description:
              'A curated guide to top 1% accelerators in the US, Canada, UK, and EU.',
            url: 'https://openquest.com/accelerators',
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: allAccelerators.length,
              itemListElement: allAccelerators.map((a, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: a.name,
                url: `https://openquest.com/accelerators/${a.slug}`,
              })),
            },
          }),
        }}
      />

      <div className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-background to-emerald-500/5" />
        <div className="container relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">Accelerators</span>
          </nav>

          <div className="flex items-start gap-4 mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="h-16 w-16 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white flex-shrink-0"
            >
              <Compass className="h-8 w-8" />
            </motion.div>
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
              >
                Top-Tier Accelerators{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500">
                  2026
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg sm:text-xl text-muted-foreground max-w-3xl"
              >
                Compare the top 1% accelerator programs in the US, Canada, UK, and EU. Filter by
                focus area, shortlist active applications, and inspect program terms quickly.
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

      <div className="container mx-auto max-w-6xl px-4 py-12">
        <AnimatedStats items={statItems} />
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            Open now: {stats.openNowCount}
          </span>
          <span className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400">
            Rolling: {stats.rollingCount}
          </span>
          <span className="inline-flex items-center rounded-full bg-slate-500/10 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-400">
            Closed: {stats.closedCount}
          </span>
        </div>
      </div>

      <div id="focus-areas" className="container mx-auto max-w-6xl px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Accelerator Focus Areas</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Click a focus area to filter programs. Bubble size reflects concentration among top-tier
            accelerators.
          </p>
        </div>

        <CategoryInfographic
          items={categoryItems}
          onSelect={setSelectedFocus}
          selected={selectedFocus}
          labels={{
            entityNoun: 'accelerators',
            emergingLabel: 'Specialized focus areas',
            viewAllLabel: 'View all {name} accelerators',
            selectedPrefix: 'Showing accelerators for:',
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-12 border-t">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">
              {selectedFocus
                ? `Accelerators in ${focusAreas.find((a) => a.slug === selectedFocus)?.name}`
                : 'All Accelerators'}
            </h2>
            <p className="text-muted-foreground">
              {visibleAccelerators.length} top-tier programs in current view
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
        <EntityQuickLinks entities={quickLinks} />
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-12 border-t">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Browse by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Programs organized by operating model and specialization.
          </p>
        </div>

        <div className="space-y-12">
          {Array.from(categorizedAccelerators.entries()).map(([category, accelerators]) => {
            const meta = ACCELERATOR_CATEGORY_META[category as keyof typeof ACCELERATOR_CATEGORY_META]
            if (!meta) return null
            return (
              <div key={category}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: meta.color }} />
                  <h3 className="text-xl font-bold">{meta.name}</h3>
                  <span className="text-sm text-muted-foreground">({accelerators.length})</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{meta.description}</p>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {accelerators.map((accelerator, i) => (
                    <motion.div
                      key={accelerator.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={`/accelerators/${accelerator.slug}`}
                        className="flex items-start gap-4 p-5 rounded-xl border bg-card hover:border-foreground/20 transition-all group"
                      >
                        <div
                          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-lg font-bold text-white transition-transform group-hover:scale-105"
                          style={{ backgroundColor: accelerator.brandColor }}
                        >
                          {accelerator.shortName.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold group-hover:text-primary transition-colors truncate">
                              {accelerator.name}
                            </h4>
                            {accelerator.applicationStatus && accelerator.applicationStatus !== 'unknown' && (
                              <span className={getStatusBadgeClass(accelerator.applicationStatus)}>
                                {accelerator.applicationStatus === 'rolling'
                                  ? 'Rolling'
                                  : accelerator.applicationStatus === 'open'
                                    ? 'Open'
                                    : 'Closed'}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {accelerator.typicalCheckSize || accelerator.fundingModel}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {accelerator.description}
                          </p>
                          {accelerator.lastVerifiedAt && (
                            <p className="text-[11px] text-muted-foreground/80 mt-2">
                              Verified {new Date(accelerator.lastVerifiedAt).toLocaleDateString('en-US')}
                            </p>
                          )}
                          <p className="text-[11px] text-muted-foreground/80 mt-1">
                            {accelerator.duration} · {accelerator.cohortCadence}
                          </p>
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

      <div className="border-t bg-muted/20 py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Find startup problems worth solving</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Use this shortlist to pick a target accelerator, then validate your idea against
            real-world problem demand.
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
