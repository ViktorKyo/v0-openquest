import { beforeEach, describe, expect, it, vi } from "vitest"

const getUserSession = vi.fn()
let mockDraftRows: any[] = []

const db = {
  select: vi.fn(() => ({
    from: vi.fn(() => ({
      where: vi.fn(() => ({
        orderBy: vi.fn(async () => mockDraftRows),
      })),
    })),
  })),
}

vi.mock("@/lib/user-auth", () => ({
  getUserSession,
}))

vi.mock("@/lib/db/supabase", () => ({
  db,
}))

vi.mock("drizzle-orm", () => ({
  and: vi.fn(() => Symbol("and")),
  desc: vi.fn(() => Symbol("desc")),
  eq: vi.fn(() => Symbol("eq")),
}))

vi.mock("@/lib/db/schema", () => ({
  problems: {
    id: "id",
    title: "title",
    elevatorPitch: "elevatorPitch",
    fullDescription: "fullDescription",
    category: "category",
    involvement: "involvement",
    isAnonymous: "isAnonymous",
    creatorLaunchCommentDraft: "creatorLaunchCommentDraft",
    updatedAt: "updatedAt",
    createdAt: "createdAt",
    forkedFromProblemId: "forkedFromProblemId",
    authorId: "authorId",
    status: "status",
  },
}))

describe("GET /api/problems/drafts payload shape", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockDraftRows = []
  })

  it("returns 401 when unauthenticated", async () => {
    getUserSession.mockResolvedValueOnce(null)
    const { GET } = await import("@/app/api/problems/drafts/route")

    const response = await GET({} as any)
    expect(response.status).toBe(401)
    expect(await response.json()).toEqual({ error: "Authentication required" })
  })

  it("returns enriched draft cards with pitch preview and missing required fields", async () => {
    getUserSession.mockResolvedValueOnce({ userId: "u1" })
    mockDraftRows = [
      {
        id: "d1",
        title: "Contractor payroll compliance",
        elevatorPitch:
          "  Global contractor payroll is fragmented across tax jurisdictions, causing costly compliance mistakes for startups without legal teams.  ",
        fullDescription: "",
        category: "Other",
        involvement: "just-sharing",
        isAnonymous: false,
        creatorLaunchCommentDraft: null,
        updatedAt: new Date("2026-02-12T21:42:02.000Z"),
        createdAt: new Date("2026-02-12T21:00:00.000Z"),
        forkedFromProblemId: null,
      },
      {
        id: "d2",
        title: "",
        elevatorPitch: "",
        fullDescription: "",
        category: "",
        involvement: "",
        isAnonymous: true,
        creatorLaunchCommentDraft: null,
        updatedAt: new Date("2026-02-12T19:00:00.000Z"),
        createdAt: new Date("2026-02-12T18:00:00.000Z"),
        forkedFromProblemId: "source-1",
      },
    ]

    const { GET } = await import("@/app/api/problems/drafts/route")
    const response = await GET({} as any)
    expect(response.status).toBe(200)

    const data = await response.json()
    expect(Array.isArray(data.drafts)).toBe(true)
    expect(data.drafts).toHaveLength(2)

    const first = data.drafts[0]
    expect(first).toMatchObject({
      id: "d1",
      title: "Contractor payroll compliance",
      category: "Other",
      isAnonymous: false,
    })
    expect(first.pitchPreview.length).toBeLessThanOrEqual(123)
    expect(first.pitchPreview.endsWith("...")).toBe(true)
    expect(first.missingRequired).toContain("description")
    expect(first.missingRequired).toContain("creatorLaunchComment")

    const second = data.drafts[1]
    expect(second.title).toBe("Untitled draft")
    expect(second.pitchPreview).toBe("No elevator pitch yet.")
    expect(second.isFork).toBe(true)
    expect(second.missingRequired).not.toContain("creatorLaunchComment")
    expect(second.missingRequired).toEqual(
      expect.arrayContaining(["title", "pitch", "description", "category", "involvement"]),
    )
  })
})
