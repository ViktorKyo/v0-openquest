'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import type { CategoryItem, CategoryLabels } from './category-infographic'

interface CategoryBubbleProps {
  item: CategoryItem
  isSelected: boolean
  onSelect: (slug: string | null) => void
  index: number
  labels: CategoryLabels
}

export function CategoryBubble({ item, isSelected, onSelect, index, labels }: CategoryBubbleProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Scale bubble size based on count (min 80px, max 160px)
  const baseSize = 80
  const maxSize = 160
  const sizeRange = maxSize - baseSize
  const normalizedCount = item.count / item.totalCount
  const size = baseSize + sizeRange * normalizedCount

  // Scale font size based on bubble diameter
  const fontClass = size < 100 ? 'text-[10px]' : size < 130 ? 'text-xs' : 'text-sm'

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20,
        delay: index * 0.05,
      }}
    >
      <motion.button
        className={`
          relative rounded-full flex flex-col items-center justify-center
          transition-shadow cursor-pointer overflow-hidden
          ${isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-background' : ''}
        `}
        style={{
          width: size,
          height: size,
          backgroundColor: `${item.color}20`,
          border: `2px solid ${item.color}40`,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => onSelect(isSelected ? null : item.slug)}
      >
        {/* Pulse animation for high-consensus items */}
        {item.consensusPercentage >= 70 && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: item.color }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.05, 0.1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}

        {/* Content */}
        <span
          className={`${fontClass} font-bold text-center px-1.5 leading-tight line-clamp-2 max-w-full`}
          style={{ color: item.color }}
        >
          {item.name}
        </span>
        <span className="text-[10px] text-muted-foreground mt-0.5 whitespace-nowrap">
          {item.count}/{item.totalCount}
        </span>
      </motion.button>

      {/* Hover tooltip — info only, not interactive */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 pointer-events-none"
          >
            <div className="bg-popover border rounded-lg shadow-lg p-3 min-w-[200px] max-w-[280px]">
              <p className="text-sm font-medium mb-2">
                {item.count} of {item.totalCount} {labels.entityNoun} ({item.consensusPercentage}%)
              </p>
              <div className="flex flex-wrap gap-1.5">
                {item.entities.slice(0, 6).map((entity, i) => (
                  <motion.div
                    key={entity.slug}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="flex h-8 w-8 items-center justify-center rounded text-xs font-bold text-white"
                    style={{ backgroundColor: entity.brandColor }}
                    title={entity.name}
                  >
                    {entity.shortName.slice(0, 2).toUpperCase()}
                  </motion.div>
                ))}
                {item.entities.length > 6 && (
                  <div className="flex h-8 w-8 items-center justify-center rounded text-xs font-medium bg-muted">
                    +{item.entities.length - 6}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
