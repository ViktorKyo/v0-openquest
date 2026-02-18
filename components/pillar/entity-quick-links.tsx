'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'

export interface QuickLinkEntity {
  slug: string
  shortName: string
  brandColor: string
  href: string
  subtitle: string
  badge?: {
    label: string
    icon: LucideIcon
    colorClass: string
    bgClass: string
  }
}

interface EntityQuickLinksProps {
  entities: QuickLinkEntity[]
}

export function EntityQuickLinks({ entities }: EntityQuickLinksProps) {
  return (
    <div className="relative">
      {/* Gradient masks for scroll indication */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Scrollable container */}
      <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
        <div className="flex gap-4" style={{ width: 'max-content' }}>
          {entities.map((entity, i) => (
            <motion.div
              key={entity.slug}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={entity.href}
                className="flex flex-col items-center gap-3 p-4 rounded-xl border bg-card hover:border-foreground/20 transition-all group w-[140px]"
              >
                {/* Logo */}
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-xl text-2xl font-bold text-white transition-transform group-hover:scale-105"
                  style={{ backgroundColor: entity.brandColor }}
                >
                  {entity.shortName.slice(0, 2).toUpperCase()}
                </div>

                {/* Name */}
                <div className="text-center">
                  <p className="font-medium text-sm truncate w-full">
                    {entity.shortName}
                  </p>
                  <p className="text-xs text-muted-foreground">{entity.subtitle}</p>
                </div>

                {/* Badge */}
                {entity.badge && (
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${entity.badge.colorClass} ${entity.badge.bgClass}`}>
                    <entity.badge.icon className="h-3 w-3" />
                    {entity.badge.label}
                  </span>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
