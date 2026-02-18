import { cn } from '@/lib/utils'
import { CheckCircle2 } from 'lucide-react'
import { vcRegistry, type VCPartnerKey, type VCRegistryEntry } from '@/lib/vc-registry'

interface VCBadgeProps {
  /** The VC partner key from the registry */
  vc: VCPartnerKey
  /** Badge size variant */
  variant?: 'default' | 'compact'
  className?: string
}

/**
 * Generic VC Badge Component
 *
 * Renders a badge for any VC partner using configuration from the registry.
 * This replaces individual badge components (yc-badge, conviction-badge, etc.)
 *
 * @example
 * <VCBadge vc="yc" />
 * <VCBadge vc="conviction" variant="compact" />
 */
export function VCBadge({ vc, variant = 'default', className }: VCBadgeProps) {
  const vcEntry = vcRegistry.find((entry) => entry.key === vc)

  if (!vcEntry) {
    console.warn(`VCBadge: Unknown VC key "${vc}"`)
    return null
  }

  const { badge } = vcEntry
  const isCompact = variant === 'compact'

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border font-medium',
        isCompact ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm',
        badge.bgColor,
        badge.textColor,
        badge.darkTextColor,
        badge.borderColor,
        className
      )}
    >
      <CheckCircle2
        className={cn('flex-shrink-0', isCompact ? 'h-3 w-3' : 'h-3.5 w-3.5')}
      />
      <span>{badge.label}</span>
    </span>
  )
}

interface VCDateTagProps {
  /** The VC partner key from the registry */
  vc: VCPartnerKey
  /** The date string to display (format depends on VC - could be quarter or date) */
  date: string
  className?: string
}

/**
 * Generic VC Date Tag Component
 *
 * Displays the date/quarter for a VC RFS problem.
 * Extracts and formats the year from the date string.
 *
 * @example
 * <VCDateTag vc="yc" date="Spring 2026" />
 * <VCDateTag vc="conviction" date="2026-01-15" />
 */
export function VCDateTag({ vc, date, className }: VCDateTagProps) {
  const vcEntry = vcRegistry.find((entry) => entry.key === vc)

  if (!vcEntry) {
    console.warn(`VCDateTag: Unknown VC key "${vc}"`)
    return null
  }

  // Format the date - extract year if it's a full date
  const displayText = formatVCDate(date, vcEntry)

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        'bg-muted text-muted-foreground',
        className
      )}
    >
      {displayText}
    </span>
  )
}

/**
 * Format date based on VC type
 * - YC: Shows quarter directly (e.g., "Spring 2026")
 * - Others: Extracts year from ISO date (e.g., "2026-01-15" → "2026")
 */
function formatVCDate(date: string, vcEntry: VCRegistryEntry): string {
  // If it's already a quarter format (contains season name), return as-is
  if (/spring|summer|fall|winter/i.test(date)) {
    return date
  }

  // Try to extract year from ISO date
  const yearMatch = date.match(/(\d{4})/)
  if (yearMatch) {
    return yearMatch[1]
  }

  // Fallback to original
  return date
}

// === Utility to detect VC type from problem flags ===

interface ProblemFlags {
  isYCRFS?: boolean
  isConviction?: boolean
  isPathlight?: boolean
  isARK?: boolean
  isWeekendFundRFS?: boolean
  isAccel?: boolean
}

/**
 * Detect which VC a problem belongs to based on its flags
 */
export function detectVCFromFlags(flags: ProblemFlags): VCPartnerKey | null {
  if (flags.isYCRFS) return 'yc'
  if (flags.isConviction) return 'conviction'
  if (flags.isPathlight) return 'pathlight'
  if (flags.isARK) return 'ark'
  if (flags.isAccel) return 'accel'
  if (flags.isWeekendFundRFS) return 'weekendFund'
  return null
}

/**
 * Get the date value from problem flags for a specific VC
 */
export function getVCDateFromProblem(
  vc: VCPartnerKey,
  problem: {
    ycQuarter?: string
    convictionPublishedDate?: string
    pathlightPublishedDate?: string
    arkPublishedDate?: string
    wfPublishedDate?: string
    accelPublishedDate?: string
  }
): string | undefined {
  switch (vc) {
    case 'yc':
      return problem.ycQuarter
    case 'conviction':
      return problem.convictionPublishedDate
    case 'pathlight':
      return problem.pathlightPublishedDate
    case 'ark':
      return problem.arkPublishedDate
    case 'weekendFund':
      return problem.wfPublishedDate
    case 'accel':
      return problem.accelPublishedDate
    default:
      return undefined
  }
}
