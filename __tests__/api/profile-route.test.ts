import { describe, it, expect, vi, beforeEach } from 'vitest'

const getUserSession = vi.fn()
const getUserWithProfileById = vi.fn()
const updateUserProfile = vi.fn()
const calculateProfileCompletionScore = vi.fn()

vi.mock('@/lib/user-auth', () => ({
  getUserSession,
  getUserWithProfileById,
  updateUserProfile,
  calculateProfileCompletionScore,
  normalizeOptionalUrl: (value: unknown) => (typeof value === 'string' ? value : null),
}))

describe('PATCH /api/user/profile validation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    getUserSession.mockResolvedValue({ userId: 'u1' })
  })

  it('rejects overly long headline', async () => {
    const { PATCH } = await import('@/app/api/user/profile/route')

    const req = {
      json: async () => ({ headline: 'x'.repeat(121) }),
    } as any

    const response = await PATCH(req)
    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({ error: 'Headline must be 120 characters or less' })
  })

  it('accepts valid profile update payload', async () => {
    updateUserProfile.mockResolvedValueOnce({ id: 'u1' })
    getUserWithProfileById.mockResolvedValueOnce({
      id: 'u1',
      email: 'u@example.com',
      name: 'Test User',
      avatarUrl: null,
      profile: {
        headline: 'Builder',
        bio: 'Bio',
        location: null,
        timezone: null,
        linkedinUrl: null,
        twitterUrl: null,
        websiteUrl: null,
        profileVisibilityDefault: 'public',
      },
      status: 'active',
      hasCompletedOnboarding: false,
      profileCompletionScore: 25,
      createdAt: new Date(),
    })
    calculateProfileCompletionScore.mockReturnValueOnce(25)

    const { PATCH } = await import('@/app/api/user/profile/route')

    const req = {
      json: async () => ({ name: 'Test User', headline: 'Builder', profileVisibilityDefault: 'public' }),
    } as any

    const response = await PATCH(req)
    expect(response.status).toBe(200)

    const data = await response.json()
    expect(data).toMatchObject({
      id: 'u1',
      name: 'Test User',
      headline: 'Builder',
      profileVisibilityDefault: 'public',
    })
  })
})
