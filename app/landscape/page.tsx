'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Sparkles, Users, Target, Lightbulb } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { allVCTheses, getThesesWithProblems } from '@/data/vc-theses'
import {
  getThemesByPopularity,
  getThemeStats,
  getVCsForTheme,
} from '@/lib/funding-themes'
import { AnimatedStats } from '@/components/pillar/animated-stats'
import { CategoryInfographic, type CategoryItem } from '@/components/pillar/category-infographic'
import { EntityQuickLinks, type QuickLinkEntity } from '@/components/pillar/entity-quick-links'

export default function LandscapePage() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)

  // Get data
  const themes = useMemo(() => getThemesByPopularity(), [])
  const stats = useMemo(() => getThemeStats(), [])
  const thesesWithProblems = useMemo(() => getThesesWithProblems(), [])

  // Get VCs for selected theme (for filtering)
  const filteredVCs = useMemo(() => {
    if (!selectedTheme) return allVCTheses
    return getVCsForTheme(selectedTheme)
  }, [selectedTheme])

  // Map themes to shared CategoryItem format
  const categoryItems: CategoryItem[] = useMemo(
    () =>
      themes.map((theme) => ({
        slug: theme.slug,
        name: theme.name,
        count: theme.vcCount,
        totalCount: theme.totalVCs,
        consensusPercentage: theme.consensusPercentage,
        color: theme.color,
        entities: theme.vcs.map((vc) => ({
          slug: vc.slug,
          shortName: vc.vcShortName,
          brandColor: vc.brandColor,
          name: vc.vcName,
        })),
        detailUrl: `/landscape/theme/${theme.slug}`,
      })),
    [themes]
  )

  // Map VCs to shared QuickLinkEntity format
  const quickLinkEntities: QuickLinkEntity[] = useMemo(
    () =>
      filteredVCs.map((thesis) => ({
        slug: thesis.slug,
        shortName: thesis.vcShortName,
        brandColor: thesis.brandColor,
        href: `/landscape/${thesis.slug}`,
        subtitle: String(thesis.year),
        badge: thesis.hasRFSProblems
          ? {
              label: 'RFS',
              icon: Lightbulb,
              colorClass: 'text-green-600 dark:text-green-400',
              bgClass: 'bg-green-500/10',
            }
          : undefined,
      })),
    [filteredVCs]
  )

  // Stats items for AnimatedStats
  const statItems = useMemo(
    () => [
      {
        icon: Users,
        value: stats.totalVCs,
        label: 'Top VCs',
        color: 'text-violet-500',
        bgColor: 'bg-violet-500/10',
      },
      {
        icon: TrendingUp,
        value: stats.totalThemes,
        label: 'Investment Themes',
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
      },
      {
        icon: Target,
        value: stats.mostPopularCount,
        suffix: `/${stats.totalVCs}`,
        label: `VCs on ${stats.mostPopularTheme.length > 12 ? stats.mostPopularTheme.slice(0, 12) + '…' : stats.mostPopularTheme}`,
        fullLabel: `VCs investing in ${stats.mostPopularTheme}`,
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
      },
      {
        icon: Lightbulb,
        value: thesesWithProblems.length,
        label: 'VCs with RFS',
        color: 'text-amber-500',
        bgColor: 'bg-amber-500/10',
      },
    ],
    [stats, thesesWithProblems.length]
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
            name: 'VCs 2026',
            description:
              'Interactive visualization of what top VCs are investing in. See consensus themes from a16z, YC, Sequoia, and more.',
            url: 'https://openquest.com/landscape',
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: allVCTheses.length,
              itemListElement: allVCTheses.map((thesis, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: thesis.vcName,
                url: `https://openquest.com/landscape/${thesis.slug}`,
              })),
            },
          }),
        }}
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden border-b">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-background to-blue-500/5" />
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
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
            <span className="text-foreground font-medium">VCs</span>
          </nav>

          <div className="flex items-start gap-4 mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="h-16 w-16 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white flex-shrink-0"
            >
              <TrendingUp className="h-8 w-8" />
            </motion.div>
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
              >
                VCs{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-blue-500">
                  2026
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg sm:text-xl text-muted-foreground max-w-3xl"
              >
                Interactive visualization of where top VCs are placing their bets. See the
                consensus themes, explore individual theses, and find problems investors want
                solved.
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
              href="#themes"
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              Explore Themes
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <AnimatedStats items={statItems} />
      </div>

      {/* Theme Infographic Section */}
      <div id="themes" className="container mx-auto max-w-6xl px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Investment Themes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Click a theme to see which VCs are investing in that space. Larger bubbles indicate
            more VC consensus.
          </p>
        </div>

        <CategoryInfographic
          items={categoryItems}
          onSelect={setSelectedTheme}
          selected={selectedTheme}
          labels={{
            entityNoun: 'VCs',
            emergingLabel: 'Emerging themes (fewer VCs)',
            viewAllLabel: 'View all {name} investments',
            selectedPrefix: 'Showing problems for:',
          }}
        />
      </div>

      {/* VC Quick Links */}
      <div className="container mx-auto max-w-6xl px-4 py-12 border-t">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">
              {selectedTheme
                ? `VCs Investing in ${themes.find((t) => t.slug === selectedTheme)?.name}`
                : 'All VC Theses'}
            </h2>
            <p className="text-muted-foreground">
              {selectedTheme
                ? `${filteredVCs.length} VCs have this as a focus area`
                : `${allVCTheses.length} investment theses from top VCs`}
            </p>
          </div>
          {selectedTheme && (
            <button
              onClick={() => setSelectedTheme(null)}
              className="text-sm text-primary hover:underline"
            >
              Show all
            </button>
          )}
        </div>

        <EntityQuickLinks entities={quickLinkEntities} />
      </div>

      {/* VCs with RFS Problems */}
      {thesesWithProblems.length > 0 && (
        <div className="container mx-auto max-w-6xl px-4 py-12 border-t">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">VCs with Active RFS</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These VCs publish specific problems they want founders to solve. Their Requests
              for Startups are available in our feed.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {thesesWithProblems.map((thesis, i) => (
              <motion.div
                key={thesis.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/landscape/${thesis.slug}`}
                  className="flex items-start gap-4 p-6 rounded-xl border bg-card hover:border-foreground/20 transition-all group"
                >
                  <div
                    className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl text-xl font-bold text-white transition-transform group-hover:scale-105"
                    style={{ backgroundColor: thesis.brandColor }}
                  >
                    {thesis.vcShortName.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {thesis.vcName}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {thesis.subtitle}
                    </p>
                    {thesis.problemCount && (
                      <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                        {thesis.problemCount} problems published
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="border-t bg-muted/20 py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Have a problem to share?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Share problems you've encountered or want solved. Help founders find ideas worth
            building.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Submit a Problem
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/feed"
              className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 font-medium transition-colors hover:bg-accent"
            >
              Browse All Problems
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
