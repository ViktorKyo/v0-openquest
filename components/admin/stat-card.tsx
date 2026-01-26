"use client"

import { motion } from "framer-motion"
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: number
  trendLabel?: string
  index?: number
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendLabel,
  index = 0,
}: StatCardProps) {
  const hasPositiveTrend = trend !== undefined && trend > 0
  const hasNegativeTrend = trend !== undefined && trend < 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className="bg-primary/10 p-2 rounded-lg">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{value}</div>
          {trend !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {hasPositiveTrend && (
                <>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-green-500">
                    +{trend}%
                  </span>
                </>
              )}
              {hasNegativeTrend && (
                <>
                  <TrendingDown className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium text-red-500">
                    {trend}%
                  </span>
                </>
              )}
              {trend === 0 && (
                <span className="text-sm font-medium text-muted-foreground">
                  0%
                </span>
              )}
              <span className="text-xs text-muted-foreground ml-1">
                {trendLabel || "vs last 30 days"}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
