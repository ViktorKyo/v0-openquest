import { NextRequest, NextResponse } from "next/server"
import { and, eq, sql } from "drizzle-orm"
import { db } from "@/lib/db/supabase"
import { problems } from "@/lib/db/schema"
import { getUserSession } from "@/lib/user-auth"
import { validateFinalSubmission } from "@/lib/problem-drafts"

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getUserSession(req)
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { id } = await params

    const [draft] = await db
      .select({
        id: problems.id,
        title: problems.title,
        elevatorPitch: problems.elevatorPitch,
        fullDescription: problems.fullDescription,
        category: problems.category,
        involvement: problems.involvement,
        isAnonymous: problems.isAnonymous,
        creatorLaunchCommentDraft: problems.creatorLaunchCommentDraft,
        status: problems.status,
      })
      .from(problems)
      .where(and(eq(problems.id, id), eq(problems.authorId, session.userId)))
      .limit(1)

    if (!draft || draft.status !== "draft") {
      return NextResponse.json({ error: "Draft not found" }, { status: 404 })
    }

    const errors = validateFinalSubmission(draft)
    if (errors.length > 0) {
      return NextResponse.json({ error: "Draft is incomplete", errors }, { status: 400 })
    }

    const [submitted] = await db
      .update(problems)
      .set({
        status: "pending_review",
        submittedAt: new Date(),
        draftUpdatedAt: null,
        creatorLaunchCommentDraft: draft.isAnonymous ? null : draft.creatorLaunchCommentDraft,
        creatorLaunchCommentRequired: draft.isAnonymous ? false : true,
        updatedAt: new Date(),
        submissionVersion: sql`${problems.submissionVersion} + 1`,
      })
      .where(and(eq(problems.id, id), eq(problems.authorId, session.userId), eq(problems.status, "draft")))
      .returning({
        id: problems.id,
        status: problems.status,
        submittedAt: problems.submittedAt,
      })

    if (!submitted) {
      return NextResponse.json({ error: "Draft not found" }, { status: 404 })
    }

    return NextResponse.json({
      problemId: submitted.id,
      status: submitted.status,
      submittedAt: submitted.submittedAt,
    })
  } catch (error) {
    console.error("Draft submit error:", error)
    return NextResponse.json({ error: "Failed to submit draft" }, { status: 500 })
  }
}
