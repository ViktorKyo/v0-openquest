/**
 * VC Registry - Single source of truth for all VC partners
 *
 * This registry tracks all VCs in the system, their files, and configurations.
 * When adding a new VC, add an entry here first, then run `npm run add-vc`
 * to scaffold the required files.
 */

// All known VC partner keys - add new ones here
export const VC_PARTNER_KEYS = [
  'yc',
  'weekendFund',
  'conviction',
  'ark',
  'pathlight',
  'accel',
] as const

export type VCPartnerKey = (typeof VC_PARTNER_KEYS)[number]

// Badge color configurations
export interface VCBadgeConfig {
  label: string
  bgColor: string
  textColor: string
  borderColor: string
  darkTextColor: string
}

export interface VCRegistryEntry {
  // Identity
  key: VCPartnerKey
  slug: string
  vcName: string
  vcShortName: string
  brandColor: string

  // Files (relative to project root)
  thesisFile?: string // e.g., "data/vc-theses/yc-spring-2026.ts"
  problemsFile?: string // e.g., "data/yc-rfs-problems.ts"

  // Flags
  hasThesis: boolean
  hasRFSProblems: boolean

  // Badge configuration
  badge: VCBadgeConfig

  // Author flag names (for type generation)
  authorFlagName: string // e.g., "isYC"
  problemFlagName: string // e.g., "isYCRFS"
  dateFlagName?: string // e.g., "ycQuarter" or "convictionPublishedDate"
}

/**
 * The VC Registry
 *
 * Contains all VCs that have either:
 * - A thesis page in /landscape
 * - RFS problems in the feed
 * - Both
 */
export const vcRegistry: VCRegistryEntry[] = [
  // === VCs with Theses AND RFS Problems ===
  {
    key: 'yc',
    slug: 'yc-spring-2026',
    vcName: 'Y Combinator',
    vcShortName: 'YC',
    brandColor: '#F26625',
    thesisFile: 'data/vc-theses/yc-spring-2026.ts',
    problemsFile: 'data/yc-rfs-problems.ts',
    hasThesis: true,
    hasRFSProblems: true,
    badge: {
      label: 'YC RFS',
      bgColor: 'bg-orange-500/10',
      textColor: 'text-orange-600',
      darkTextColor: 'dark:text-orange-400',
      borderColor: 'border-orange-500/20',
    },
    authorFlagName: 'isYC',
    problemFlagName: 'isYCRFS',
    dateFlagName: 'ycQuarter',
  },
  {
    key: 'conviction',
    slug: 'conviction-2026',
    vcName: 'Conviction',
    vcShortName: 'Conviction',
    brandColor: '#6366F1',
    thesisFile: 'data/vc-theses/conviction-2026.ts',
    problemsFile: 'data/conviction-problems.ts',
    hasThesis: true,
    hasRFSProblems: true,
    badge: {
      label: 'Conviction',
      bgColor: 'bg-indigo-500/10',
      textColor: 'text-indigo-600',
      darkTextColor: 'dark:text-indigo-400',
      borderColor: 'border-indigo-500/20',
    },
    authorFlagName: 'isConviction',
    problemFlagName: 'isConviction',
    dateFlagName: 'convictionPublishedDate',
  },
  {
    key: 'pathlight',
    slug: 'pathlight-2026',
    vcName: 'Pathlight',
    vcShortName: 'Pathlight',
    brandColor: '#8B5CF6',
    thesisFile: 'data/vc-theses/pathlight-2026.ts',
    problemsFile: 'data/pathlight-problems.ts',
    hasThesis: true,
    hasRFSProblems: true,
    badge: {
      label: 'Pathlight',
      bgColor: 'bg-violet-500/10',
      textColor: 'text-violet-600',
      darkTextColor: 'dark:text-violet-400',
      borderColor: 'border-violet-500/20',
    },
    authorFlagName: 'isPathlight',
    problemFlagName: 'isPathlight',
    dateFlagName: 'pathlightPublishedDate',
  },

  // === VCs with RFS Problems only (no thesis page yet) ===
  {
    key: 'accel',
    slug: 'accel-2026',
    vcName: 'Accel',
    vcShortName: 'Accel',
    brandColor: '#0F766E',
    thesisFile: 'data/vc-theses/accel-2026.ts',
    hasThesis: true,
    hasRFSProblems: false,
    badge: {
      label: 'Accel',
      bgColor: 'bg-teal-500/10',
      textColor: 'text-teal-600',
      darkTextColor: 'dark:text-teal-400',
      borderColor: 'border-teal-500/20',
    },
    authorFlagName: 'isAccel',
    problemFlagName: 'isAccel',
    dateFlagName: 'accelPublishedDate',
  },
  {
    key: 'ark',
    slug: 'ark-invest-2026',
    vcName: 'ARK Invest',
    vcShortName: 'ARK',
    brandColor: '#000000',
    problemsFile: 'data/ark-invest-problems.ts',
    hasThesis: false,
    hasRFSProblems: true,
    badge: {
      label: 'ARK Invest',
      bgColor: 'bg-slate-500/10',
      textColor: 'text-slate-600',
      darkTextColor: 'dark:text-slate-400',
      borderColor: 'border-slate-500/20',
    },
    authorFlagName: 'isARK',
    problemFlagName: 'isARK',
    dateFlagName: 'arkPublishedDate',
  },
  {
    key: 'weekendFund',
    slug: 'weekend-fund-2026',
    vcName: 'Weekend Fund',
    vcShortName: 'WF',
    brandColor: '#10B981',
    problemsFile: 'data/weekend-fund-problems.ts',
    hasThesis: false,
    hasRFSProblems: true,
    badge: {
      label: 'Weekend Fund',
      bgColor: 'bg-emerald-500/10',
      textColor: 'text-emerald-600',
      darkTextColor: 'dark:text-emerald-400',
      borderColor: 'border-emerald-500/20',
    },
    authorFlagName: 'isWeekendFund',
    problemFlagName: 'isWeekendFundRFS',
    dateFlagName: 'wfPublishedDate',
  },
]

// === VCs with Theses only (no RFS problems - just for reference) ===
// These are tracked in data/vc-theses/ but don't need registry entries
// because they don't have problems in the feed:
// - a16z-2026
// - index-2026
// - ivp-2026
// - nea-2026
// - insight-2026
// - gv-2026
// - kleiner-perkins-2026
// - sequoia-2025
// - lightspeed-2026
// - bessemer-2025
// - general-catalyst-2025
// - founders-fund-2025
// - khosla-2025
// - greylock-2025
// - felicis-2025
// - lux-2025

// === Helper Functions ===

export function getVCByKey(key: VCPartnerKey): VCRegistryEntry | undefined {
  return vcRegistry.find((vc) => vc.key === key)
}

export function getVCBySlug(slug: string): VCRegistryEntry | undefined {
  return vcRegistry.find((vc) => vc.slug === slug)
}

export function getVCsWithProblems(): VCRegistryEntry[] {
  return vcRegistry.filter((vc) => vc.hasRFSProblems)
}

export function getVCsWithTheses(): VCRegistryEntry[] {
  return vcRegistry.filter((vc) => vc.hasThesis)
}

export function getAllVCKeys(): VCPartnerKey[] {
  return vcRegistry.map((vc) => vc.key)
}

// Type guard to check if a string is a valid VC key
export function isVCPartnerKey(key: string): key is VCPartnerKey {
  return VC_PARTNER_KEYS.includes(key as VCPartnerKey)
}
