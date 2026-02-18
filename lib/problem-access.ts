export const PUBLIC_PROBLEM_STATUSES = ["approved", "published"] as const

export function isPublicProblemStatus(status: string | null | undefined): boolean {
  if (!status) return false
  return PUBLIC_PROBLEM_STATUSES.includes(status as (typeof PUBLIC_PROBLEM_STATUSES)[number])
}

export function canAccessProblem(params: {
  status: string | null | undefined
  authorId: string | null | undefined
  userId?: string | null
}): boolean {
  if (isPublicProblemStatus(params.status)) return true
  return Boolean(params.userId && params.authorId && params.userId === params.authorId)
}
