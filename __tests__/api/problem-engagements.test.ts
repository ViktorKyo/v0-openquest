import { describe, it, expect, beforeEach } from 'vitest'

type Type = 'build' | 'invest' | 'join_team' | 'follow'
type Visibility = 'public' | 'private'
type Status = 'active' | 'withdrawn'

type Engagement = {
  id: string
  problemId: string
  userId: string
  type: Type
  visibility: Visibility
  status: Status
}

describe('Problem engagement lifecycle rules', () => {
  let engagements: Engagement[]

  const upsertEngagement = (problemId: string, userId: string, type: Type, visibility: Visibility) => {
    const existing = engagements.find(
      (e) =>
        e.problemId === problemId &&
        e.userId === userId &&
        e.type === type &&
        e.status === 'active'
    )

    if (existing) {
      existing.visibility = visibility
      return existing
    }

    const created: Engagement = {
      id: `e-${engagements.length + 1}`,
      problemId,
      userId,
      type,
      visibility,
      status: 'active',
    }
    engagements.push(created)
    return created
  }

  const withdrawEngagement = (id: string) => {
    const row = engagements.find((e) => e.id === id)
    if (row) row.status = 'withdrawn'
  }

  const counts = (problemId: string) => {
    const active = engagements.filter((e) => e.problemId === problemId && e.status === 'active')
    return {
      building: active.filter((e) => e.type === 'build').length,
      buildingAnonymous: active.filter((e) => e.type === 'build' && e.visibility === 'private').length,
      investors: active.filter((e) => e.type === 'invest').length,
      followers: active.filter((e) => e.type === 'follow').length,
    }
  }

  beforeEach(() => {
    engagements = []
  })

  it('enforces one active engagement per problem/user/type', () => {
    upsertEngagement('p1', 'u1', 'build', 'public')
    upsertEngagement('p1', 'u1', 'build', 'private')

    const activeBuilds = engagements.filter(
      (e) => e.problemId === 'p1' && e.userId === 'u1' && e.type === 'build' && e.status === 'active'
    )

    expect(activeBuilds).toHaveLength(1)
    expect(activeBuilds[0].visibility).toBe('private')
  })

  it('updates aggregate counts and private builder split', () => {
    upsertEngagement('p1', 'u1', 'build', 'private')
    upsertEngagement('p1', 'u2', 'build', 'public')
    upsertEngagement('p1', 'u3', 'invest', 'public')
    upsertEngagement('p1', 'u4', 'follow', 'public')

    expect(counts('p1')).toEqual({
      building: 2,
      buildingAnonymous: 1,
      investors: 1,
      followers: 1,
    })
  })

  it('withdraw removes engagement from active counts', () => {
    const row = upsertEngagement('p1', 'u1', 'invest', 'public')
    withdrawEngagement(row.id)

    expect(counts('p1').investors).toBe(0)
  })
})
