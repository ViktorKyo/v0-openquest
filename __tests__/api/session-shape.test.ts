import { describe, it, expect, vi, beforeEach } from 'vitest'

const getUserSession = vi.fn()
const getUserWithProfileById = vi.fn()

vi.mock('@/lib/user-auth', () => ({
  getUserSession,
  getUserWithProfileById,
}))

describe('GET /api/auth/session response shape', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns unauthenticated shape when no session exists', async () => {
    getUserSession.mockResolvedValueOnce(null)

    const { GET } = await import('@/app/api/auth/session/route')
    const response = await GET()
    const data = await response.json()

    expect(data).toEqual({
      authenticated: false,
      user: null,
    })
  })

  it('returns expanded user shape when session is valid', async () => {
    getUserSession.mockResolvedValueOnce({ userId: 'u1' })
    getUserWithProfileById.mockResolvedValueOnce({
      id: 'u1',
      email: 'user@example.com',
      name: 'User',
      avatarUrl: null,
      status: 'active',
      hasCompletedOnboarding: true,
      profileCompletionScore: 75,
    })

    const { GET } = await import('@/app/api/auth/session/route')
    const response = await GET()
    const data = await response.json()

    expect(data.authenticated).toBe(true)
    expect(data.user).toMatchObject({
      id: 'u1',
      email: 'user@example.com',
      status: 'active',
      hasCompletedOnboarding: true,
      profileCompletionScore: 75,
    })
  })
})
