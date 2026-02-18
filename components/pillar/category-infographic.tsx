'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CategoryBubble } from './category-bubble'
import { Circle, LayoutGrid } from 'lucide-react'

export interface CategoryItem {
  slug: string
  name: string
  count: number
  totalCount: number
  consensusPercentage: number
  color: string
  entities: { slug: string; shortName: string; brandColor: string; name: string }[]
  detailUrl: string
}

export interface CategoryLabels {
  entityNoun: string
  emergingLabel: string
  viewAllLabel: string
  selectedPrefix: string
}

interface CategoryInfographicProps {
  items: CategoryItem[]
  onSelect: (slug: string | null) => void
  selected: string | null
  labels: CategoryLabels
}

type ViewMode = 'bubbles' | 'grid'

export function CategoryInfographic({
  items,
  onSelect,
  selected,
  labels,
}: CategoryInfographicProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('bubbles')

  // Sort by count for display
  const sortedItems = useMemo(
    () => [...items].sort((a, b) => b.count - a.count),
    [items]
  )

  // Top items (>30% consensus)
  const consensusItems = sortedItems.filter((t) => t.consensusPercentage >= 30)
  const otherItems = sortedItems.filter((t) => t.consensusPercentage < 30)

  return (
    <div className="relative">
      {/* View mode toggle */}
      <div className="flex justify-end mb-4">
        <div className="inline-flex rounded-lg border bg-muted/50 p-1">
          <button
            onClick={() => setViewMode('bubbles')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
              viewMode === 'bubbles'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Circle className="h-4 w-4" />
            <span className="hidden sm:inline">Bubbles</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
              viewMode === 'grid'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="hidden sm:inline">Grid</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'bubbles' ? (
          <motion.div
            key="bubbles"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Bubble visualization */}
            <div className="relative min-h-[400px] flex flex-col items-center justify-center">
              {/* High consensus - prominent */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {consensusItems.map((item, i) => (
                  <CategoryBubble
                    key={item.slug}
                    item={item}
                    isSelected={selected === item.slug}
                    onSelect={onSelect}
                    index={i}
                    labels={labels}
                  />
                ))}
              </div>

              {/* Lower consensus - secondary */}
              {otherItems.length > 0 && (
                <>
                  <div className="w-full border-t border-dashed my-4" />
                  <p className="text-xs text-muted-foreground mb-4">
                    {labels.emergingLabel}
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {otherItems.map((item, i) => (
                      <CategoryBubble
                        key={item.slug}
                        item={item}
                        isSelected={selected === item.slug}
                        onSelect={onSelect}
                        index={consensusItems.length + i}
                        labels={labels}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Grid visualization */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {sortedItems.map((item, i) => (
                <motion.button
                  key={item.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() =>
                    onSelect(selected === item.slug ? null : item.slug)
                  }
                  className={`
                    flex items-center gap-4 p-4 rounded-lg border text-left transition-all
                    ${
                      selected === item.slug
                        ? 'ring-2 ring-primary border-primary'
                        : 'hover:border-foreground/20'
                    }
                  `}
                >
                  {/* Item indicator */}
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg text-lg font-bold"
                    style={{
                      backgroundColor: `${item.color}20`,
                      color: item.color,
                    }}
                  >
                    {item.count}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {/* Progress bar showing consensus */}
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: item.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.consensusPercentage}%` }}
                          transition={{ delay: i * 0.03 + 0.2, duration: 0.5 }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {item.consensusPercentage}%
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected item indicator */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-6 text-center"
          >
            <button
              onClick={() => onSelect(null)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm"
            >
              {labels.selectedPrefix} {items.find((t) => t.slug === selected)?.name}
              <span className="text-xs">✕</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
