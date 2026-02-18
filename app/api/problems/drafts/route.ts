import { NextRequest, NextResponse } from "next/server"
import { and, desc, eq } from "drizzle-orm"
import { db } from "@/lib/db/supabase"
import { problems } from "@/lib/db/schema"
import { getUserSession } from "@/lib/user-auth"
import { createDraftRequestSchema, getCompletenessScore, toDbDraftValues } from "@/lib/problem-drafts"

type MissingRequiredField =
  | "title"
  | "pitch"
  | "description"
  | "category"
  | "involvement"
  | "creatorLaunchComment"

function computeMissingRequired(draft: {
  title: string | null
  elevatorPitch: string | null
  fullDescription: string | null
  category: string | null
  involvement: string | null
  isAnonymous: boolean | null
  creatorLaunchCommentDraft: string | null
}): MissingRequiredField[] {
  const missing: MissingRequiredField[] = []
  if (!(draft.title || "").trim()) missing.push("title")
  if (!(draft.elevatorPitch || "").trim()) missing.push("pitch")
  if (!(draft.fullDescription || "").trim()) missing.push("description")
  if (!(draft.category || "").trim()) missing.push("category")
  if (!(draft.involvement || "").trim()) missing.push("involvement")
  if (!draft.isAnonymous && !(draft.creatorLaunchCommentDraft || "").trim()) {
    missing.push("creatorLaunchComment")
  }
  return missing
}

function getPitchPreview(elevatorPitch: string | null): string {
  const trimmed = (elevatorPitch || "").trim()
  if (!trimmed) return "No elevator pitch yet."
  return trimmed.length > 120 ? `${trimmed.slice(0, 120).trimEnd()}...` : trimmed
}

export async function GET(req: NextRequest) {
  try {
    const session = await getUserSession(req)
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const drafts = await db
      .select({
        id: problems.id,
        title: problems.title,
        elevatorPitch: problems.elevatorPitch,
        fullDescription: problems.fullDescription,
        category: problems.category,
        involvement: problems.involvement,
        isAnonymous: problems.isAnonymous,
        creatorLaunchCommentDraft: problems.creatorLaunchCommentDraft,
        updatedAt: problems.updatedAt,
        createdAt: problems.createdAt,
        forkedFromProblemId: problems.forkedFromProblemId,
      })
      .from(problems)
      .where(and(eq(problems.authorId, session.userId), eq(problems.status, "draft")))
      .orderBy(desc(problems.updatedAt))

    const result = drafts.map((draft) => ({
      id: draft.id,
      title: draft.title || "Untitled draft",
      category: draft.category || "Other",
      updatedAt: draft.updatedAt || draft.createdAt,
      pitchPreview: getPitchPreview(draft.elevatorPitch),
      missingRequired: computeMissingRequired(draft),
      isAnonymous: Boolean(draft.isAnonymous),
      completenessScore: getCompletenessScore({
        title: draft.title,
        elevatorPitch: draft.elevatorPitch,
        fullDescription: draft.fullDescription,
        category: draft.category,
        involvement: draft.involvement,
      }),
      isFork: Boolean(draft.forkedFromProblemId),
    }))

    return NextResponse.json({ drafts: result })
  } catch (error) {
    console.error("Draft list error:", error)
    return NextResponse.json({ error: "Failed to fetch drafts" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getUserSession(req)
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const body = await req.json()
    const parsed = createDraftRequestSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid draft payload" }, { status: 400 })
    }

    const { dedupe, ...fields } = parsed.data

    if (dedupe) {
      const [existingDraft] = await db
        .select({
          id: problems.id,
          updatedAt: problems.updatedAt,
          submissionVersion: problems.submissionVersion,
        })
        .from(problems)
        .where(and(eq(problems.authorId, session.userId), eq(problems.status, "draft")))
        .orderBy(desc(problems.updatedAt))
        .limit(1)

      if (existingDraft) {
        if (Object.keys(fields).length > 0) {
          const [updatedDraft] = await db
            .update(problems)
            .set({
              ...toDbDraftValues(fields),
              updatedAt: new Date(),
              draftUpdatedAt: new Date(),
            })
            .where(eq(problems.id, existingDraft.id))
              .returning({
                id: problems.id,
                updatedAt: problems.updatedAt,
                status: problems.status,
                submissionVersion: problems.submissionVersion,
              })

          return NextResponse.json({
            draftId: updatedDraft.id,
            status: updatedDraft.status,
            savedAt: updatedDraft.updatedAt,
            submissionVersion: updatedDraft.submissionVersion,
          })
        }

        return NextResponse.json({
          draftId: existingDraft.id,
          status: "draft",
          savedAt: existingDraft.updatedAt,
          submissionVersion: existingDraft.submissionVersion,
        })
      }
    }

    const [draft] = await db
      .insert(problems)
      .values({
        ...toDbDraftValues(fields),
        authorId: session.userId,
        status: "draft",
        draftUpdatedAt: new Date(),
        updatedAt: new Date(),
      })
      .returning({
        id: problems.id,
        status: problems.status,
        updatedAt: problems.updatedAt,
        submissionVersion: problems.submissionVersion,
      })

    return NextResponse.json({
      draftId: draft.id,
      status: draft.status,
      savedAt: draft.updatedAt,
      submissionVersion: draft.submissionVersion,
    })
  } catch (error) {
    console.error("Draft create error:", error)
    return NextResponse.json({ error: "Failed to create draft" }, { status: 500 })
  }
}
