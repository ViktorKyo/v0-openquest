/**
 * Calculate text similarity using word-level comparison
 * Returns a percentage (0-100) of how different the texts are
 * 0% = identical, 100% = completely different
 */
export function calculateDifference(original: string, forked: string): number {
  // Normalize texts: lowercase, remove extra whitespace, remove punctuation
  const normalize = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim()

  const originalNormalized = normalize(original)
  const forkedNormalized = normalize(forked)

  // If either is empty, return 100% different
  if (!originalNormalized || !forkedNormalized) {
    return 100
  }

  // If identical after normalization, return 0% different
  if (originalNormalized === forkedNormalized) {
    return 0
  }

  // Split into words
  const originalWords = originalNormalized.split(" ")
  const forkedWords = forkedNormalized.split(" ")

  // Calculate word-level similarity using Jaccard similarity
  const originalSet = new Set(originalWords)
  const forkedSet = new Set(forkedWords)

  const intersection = new Set([...originalSet].filter((x) => forkedSet.has(x)))
  const union = new Set([...originalSet, ...forkedSet])

  const jaccardSimilarity = intersection.size / union.size
  const difference = (1 - jaccardSimilarity) * 100

  return Math.round(difference)
}

/**
 * Calculate character-level edit distance (Levenshtein distance)
 * Returns percentage of how different the texts are
 */
export function calculateCharacterDifference(original: string, forked: string): number {
  const maxLength = Math.max(original.length, forked.length)
  if (maxLength === 0) return 100

  const editDistance = levenshteinDistance(original, forked)
  const difference = (editDistance / maxLength) * 100

  return Math.round(difference)
}

/**
 * Levenshtein distance algorithm
 */
function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length
  const n = str2.length
  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0))

  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1
      }
    }
  }

  return dp[m][n]
}

/**
 * Validate if a fork meets the minimum differentiation requirements
 */
export interface ForkValidationResult {
  isValid: boolean
  titleDiff: number
  pitchDiff: number
  descriptionDiff: number
  overallDiff: number
  errors: string[]
  warnings: string[]
}

export function validateFork(
  original: { title: string; pitch: string; description: string },
  forked: { title: string; pitch: string; description: string },
): ForkValidationResult {
  const titleDiff = calculateDifference(original.title, forked.title)
  const pitchDiff = calculateDifference(original.pitch, forked.pitch)
  const descriptionDiff = calculateDifference(original.description, forked.description)

  // Calculate weighted overall difference
  // Title is 20%, Pitch is 30%, Description is 50%
  const overallDiff = Math.round(titleDiff * 0.2 + pitchDiff * 0.3 + descriptionDiff * 0.5)

  const errors: string[] = []
  const warnings: string[] = []

  // Minimum thresholds
  const MIN_TITLE_DIFF = 30
  const MIN_PITCH_DIFF = 40
  const MIN_DESCRIPTION_DIFF = 50
  const WARN_THRESHOLD = 60

  // Check title
  if (titleDiff < MIN_TITLE_DIFF) {
    errors.push(`Title needs to be more different (currently ${titleDiff}% different, need ${MIN_TITLE_DIFF}%)`)
  }

  // Check pitch
  if (pitchDiff < MIN_PITCH_DIFF) {
    errors.push(
      `Elevator pitch needs to be more different (currently ${pitchDiff}% different, need ${MIN_PITCH_DIFF}%)`,
    )
  }

  // Check description
  if (descriptionDiff < MIN_DESCRIPTION_DIFF) {
    errors.push(
      `Description needs to be more different (currently ${descriptionDiff}% different, need ${MIN_DESCRIPTION_DIFF}%)`,
    )
  }

  // Add warnings for fields that pass but are close to threshold
  if (titleDiff >= MIN_TITLE_DIFF && titleDiff < WARN_THRESHOLD) {
    warnings.push("Title is similar to original - consider making it more unique")
  }
  if (pitchDiff >= MIN_PITCH_DIFF && pitchDiff < WARN_THRESHOLD) {
    warnings.push("Elevator pitch is similar to original - consider adding more unique insights")
  }
  if (descriptionDiff >= MIN_DESCRIPTION_DIFF && descriptionDiff < WARN_THRESHOLD) {
    warnings.push("Description is similar to original - consider adding more unique perspectives")
  }

  return {
    isValid: errors.length === 0,
    titleDiff,
    pitchDiff,
    descriptionDiff,
    overallDiff,
    errors,
    warnings,
  }
}

/**
 * Get a progress indicator emoji based on difference percentage
 */
export function getDifficultyIndicator(diff: number): { emoji: string; color: string; label: string } {
  if (diff >= 70) {
    return { emoji: "🟢", color: "text-green-500", label: "Substantially Different" }
  } else if (diff >= 50) {
    return { emoji: "🟡", color: "text-yellow-500", label: "Getting There" }
  } else {
    return { emoji: "🔴", color: "text-red-500", label: "Too Similar" }
  }
}
