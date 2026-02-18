export const DEFAULT_VC_PARTNER_AUTHOR_NAMES = [
  "Y Combinator",
  "Weekend Fund",
  "Conviction",
  "ARK Invest",
  "Pathlight Ventures",
  "Accel",
] as const

function parseAdditionalPartnerNames(raw: string | undefined): string[] {
  if (!raw) return []
  return raw
    .split(",")
    .map((value) => value.trim())
    .filter((value) => value.length > 0)
}

export function getVCPartnerAuthorNames(): string[] {
  const extra = parseAdditionalPartnerNames(process.env.OPENQUEST_ADDITIONAL_VC_PARTNERS)
  return Array.from(new Set([...DEFAULT_VC_PARTNER_AUTHOR_NAMES, ...extra]))
}

