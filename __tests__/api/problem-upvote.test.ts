import { describe, it, expect, beforeEach } from 'vitest'

type Vote = { problemId: string; userId: string }

describe('Problem upvote consistency', () => {
  let votes: Vote[]
  let storedCount: number

  const countVotes = (problemId: string) => votes.filter((v) => v.problemId === problemId).length

  const toggleUpvote = (problemId: string, userId: string) => {
    const existing = votes.findIndex((v) => v.problemId === problemId && v.userId === userId)
    if (existing >= 0) {
      votes.splice(existing, 1)
    } else {
      votes.push({ problemId, userId })
    }

    // mirror API contract: denormalized count is recalculated via COUNT(*)
    storedCount = countVotes(problemId)

    return {
      hasUpvoted: existing < 0,
      upvoteCount: storedCount,
    }
  }

  beforeEach(() => {
    votes = []
    storedCount = 0
  })

  it('keeps count in sync after add/remove cycles', () => {
    toggleUpvote('p1', 'u1')
    toggleUpvote('p1', 'u2')
    toggleUpvote('p1', 'u1')

    expect(storedCount).toBe(1)
    expect(storedCount).toBe(countVotes('p1'))
  })

  it('self-corrects count drift on next toggle', () => {
    votes.push({ problemId: 'p1', userId: 'u1' })
    storedCount = 999

    const result = toggleUpvote('p1', 'u2')

    expect(result.upvoteCount).toBe(2)
    expect(storedCount).toBe(countVotes('p1'))
  })
})
