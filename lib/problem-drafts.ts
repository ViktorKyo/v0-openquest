import { z } from "zod"

export const CATEGORY_SLUG_TO_LABEL: Record<string, string> = {
  "moonshots": "Moonshots",
  "niche-markets": "Niche Markets",
  "future-work": "Future of Work",
  "creator-economy": "Creator Economy",
  "longevity": "Longevity",
  "rebuild-money": "Rebuild Money",
  "climate-tech": "Climate Tech",
  "ai-infrastructure": "AI & Infrastructure",
  "world-atoms": "World of Atoms",
  "other": "Other",
}

export const INVOLVEMENT_VALUES = [
  "want-build",
  "already-building",
  "just-sharing",
  "want-to-work",
] as const

export const WANT_BUILD_BLOCKER_VALUES = ["need-capital", "need-cofounder"] as const
export const WANT_TO_WORK_INVOLVEMENT_VALUES = ["volunteer", "full-time"] as const
export const ALREADY_BUILDING_SUPPORT_VALUES = [
  "awareness",
  "founding-team",
  "cofounder",
  "capital",
] as const
export const DECK_TYPE_VALUES = ["link", "file", "none"] as const
export const CREATOR_LAUNCH_COMMENT_MAX_LENGTH = 5000

const maybeEmptyString = z.string().trim()

export const draftFieldsSchema = z.object({
  title: maybeEmptyString.max(100).optional(),
  pitch: maybeEmptyString.max(280).optional(),
  description: maybeEmptyString.optional(),
  category: maybeEmptyString.optional(),
  tags: z.array(z.string().trim().min(1).max(40)).max(5).optional(),
  anonymous: z.boolean().optional(),
  involvement: z.enum(INVOLVEMENT_VALUES).optional(),
  wantBuildBlocker: z.array(z.enum(WANT_BUILD_BLOCKER_VALUES)).optional(),
  alreadyBuildingSupport: z.array(z.enum(ALREADY_BUILDING_SUPPORT_VALUES)).optional(),
  wantToWorkInvolvement: z.array(z.enum(WANT_TO_WORK_INVOLVEMENT_VALUES)).optional(),
  deckType: z.enum(DECK_TYPE_VALUES).optional(),
  deckLink: z.string().url().optional().or(z.literal("")),
  forkedFromProblemId: z.string().optional(),
  creatorLaunchComment: maybeEmptyString.max(CREATOR_LAUNCH_COMMENT_MAX_LENGTH).optional(),
  tweetUrls: z.array(z.string().trim().min(1)).max(5).optional(),
})

export const createDraftRequestSchema = draftFieldsSchema.extend({
  dedupe: z.boolean().optional().default(false),
})

export type DraftFields = z.infer<typeof draftFieldsSchema>

export interface DraftLike {
  title: string | null
  elevatorPitch: string | null
  fullDescription: string | null
  category: string | null
  involvement?: string | null
  isAnonymous?: boolean | null
  creatorLaunchCommentDraft?: string | null
}

export function getCompletenessScore(draft: DraftLike): number {
  const checks = [
    Boolean((draft.title || "").trim()),
    Boolean((draft.elevatorPitch || "").trim()),
    Boolean((draft.fullDescription || "").trim()),
    Boolean((draft.category || "").trim()),
    Boolean((draft.involvement || "").trim()),
  ]
  const passed = checks.filter(Boolean).length
  return Math.round((passed / checks.length) * 100)
}

export function normalizeCategory(category?: string): string {
  if (!category) return "Other"
  const trimmed = category.trim()
  if (!trimmed) return "Other"
  return CATEGORY_SLUG_TO_LABEL[trimmed] || trimmed
}

export function toDbDraftValues(fields: DraftFields) {
  return {
    title: fields.title?.trim() || "Untitled draft",
    elevatorPitch: fields.pitch?.trim() || "",
    fullDescription: fields.description?.trim() || "",
    category: normalizeCategory(fields.category),
    industryTags: fields.tags || [],
    isAnonymous: fields.anonymous ?? false,
    involvement: fields.involvement || "just-sharing",
    wantBuildBlocker: fields.wantBuildBlocker || [],
    alreadyBuildingSupport: fields.alreadyBuildingSupport || [],
    wantToWorkInvolvement: fields.wantToWorkInvolvement || [],
    deckType: fields.deckType || "none",
    deckLink: fields.deckLink || null,
    forkedFromProblemId: fields.forkedFromProblemId || null,
    creatorLaunchCommentDraft: fields.anonymous ? null : fields.creatorLaunchComment?.trim() || null,
    creatorLaunchCommentRequired: fields.anonymous ? false : true,
    tweetUrls: fields.tweetUrls || [],
  }
}

export function validateFinalSubmission(draft: DraftLike): string[] {
  const errors: string[] = []
  if (!(draft.title || "").trim()) errors.push("Title is required")
  if (!(draft.elevatorPitch || "").trim()) errors.push("Elevator pitch is required")
  if ((draft.elevatorPitch || "").trim().length > 280) errors.push("Elevator pitch must be 280 characters or less")
  if (!(draft.fullDescription || "").trim()) errors.push("Full description is required")
  if (!(draft.category || "").trim()) errors.push("Category is required")
  if (!(draft.involvement || "").trim()) errors.push("Involvement is required")
  if (!draft.isAnonymous) {
    const creatorLaunchComment = (draft.creatorLaunchCommentDraft || "").trim()
    if (!creatorLaunchComment) errors.push("Creator context comment is required for non-anonymous submissions")
    if (creatorLaunchComment.length > CREATOR_LAUNCH_COMMENT_MAX_LENGTH) {
      errors.push(`Creator context comment must be ${CREATOR_LAUNCH_COMMENT_MAX_LENGTH} characters or less`)
    }
  }
  return errors
}
