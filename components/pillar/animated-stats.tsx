'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import type { LucideIcon } from 'lucide-react'

export interface StatItem {
  icon: LucideIcon
  value: number
  suffix?: string
  label: string
  fullLabel?: string
  color: string
  bgColor: string
}

interface AnimatedStatsProps {
  items: StatItem[]
}

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {value}
      </motion.span>
      {suffix}
    </motion.span>
  )
}

export function AnimatedStats({ items }: AnimatedStatsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="border rounded-xl bg-muted/30 p-6">
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {items.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div
              className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg ${stat.bgColor}`}
            >
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div className="text-3xl font-bold">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>
            <p
              className="text-sm text-muted-foreground mt-1"
              title={stat.fullLabel}
            >
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
