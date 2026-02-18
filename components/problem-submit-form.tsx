"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ArrowLeft, Sparkles, Link as LinkIcon, Upload, X, FileText, AlertCircle, Trash2, Twitter } from "lucide-react"
import { extractTweetId, MAX_TWEETS_PER_PROBLEM } from "@/lib/tweet-utils"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { SubmissionSuccessModal } from "@/components/submission-success-modal"
import { Header } from "@/components/header"
import { ForkBanner } from "@/components/fork-banner"
import { validateFork, type ForkValidationResult } from "@/lib/similarity"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { COMMENT_MAX_LENGTH } from "@/types/comment"

const CATEGORIES = [
  { value: "moonshots", label: "Moonshots", color: "bg-purple-500" },
  { value: "niche-markets", label: "Niche markets", color: "bg-blue-500" },
  { value: "future-work", label: "Future of work", color: "bg-green-500" },
  { value: "creator-economy", label: "Creator economy", color: "bg-pink-500" },
  { value: "longevity", label: "Longevity", color: "bg-teal-500" },
  { value: "rebuild-money", label: "Rebuild money", color: "bg-yellow-500" },
  { value: "climate-tech", label: "Climate tech", color: "bg-emerald-500" },
  { value: "ai-infrastructure", label: "AI & infrastructure", color: "bg-indigo-500" },
  { value: "world-atoms", label: "World of atoms", color: "bg-orange-500" },
  { value: "other", label: "Other", color: "bg-gray-500" },
] as const

const SUGGESTED_TAGS = [
  "SaaS",
  "B2B",
  "Consumer",
  "Healthcare",
  "Fintech",
  "Education",
  "Enterprise",
  "Mobile",
  "Web3",
  "Hardware",
  "Analytics",
  "Developer Tools",
]

const ALREADY_BUILDING_SUPPORT_OPTIONS = [
  { value: "awareness", label: "I need more awareness/visibility" },
  { value: "founding-team", label: "I'm looking for founding team members" },
  { value: "cofounder", label: "I'm looking for a technical/business co-founder" },
  { value: "capital", label: "I need more capital/investment" },
] as const

const blankFormValues = {
  title: "",
  pitch: "",
  description: "",
  category: "",
  tags: [],
  anonymous: false,
  involvement: "just-sharing" as const,
  wantBuildBlocker: [],
  alreadyBuildingSupport: [],
  wantToWorkInvolvement: [],
  deckType: "none" as const,
  deckLink: "",
  creatorLaunchComment: "",
}

type AlreadyBuildingSupport = (typeof ALREADY_BUILDING_SUPPORT_OPTIONS)[number]["value"]
type DraftLifecycleState = "idle" | "creating" | "editing" | "autosaving" | "saved" | "submitting"

interface DraftSummary {
  id: string
  title: string
  updatedAt: string
  pitchPreview: string
  missingRequired: Array<"title" | "pitch" | "description" | "category" | "involvement" | "creatorLaunchComment">
  isAnonymous: boolean
  completenessScore: number
  isFork: boolean
  category: string
}

const MISSING_FIELD_LABELS: Record<DraftSummary["missingRequired"][number], string> = {
  title: "Title",
  pitch: "Pitch",
  description: "Description",
  category: "Category",
  involvement: "Involvement",
  creatorLaunchComment: "Creator comment",
}

const problemSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be 100 characters or less"),
  pitch: z.string().min(1, "Elevator pitch is required").max(280, "Elevator pitch must be 280 characters or less"),
  description: z.string().min(1, "Full description is required"),
  category: z.string().min(1, "Please select a category"),
  tags: z.array(z.string()).max(5, "Maximum 5 tags allowed").optional(),
  anonymous: z.boolean().optional(),
  involvement: z.enum(["want-build", "already-building", "just-sharing", "want-to-work"]),
  wantBuildBlocker: z.array(z.enum(["need-capital", "need-cofounder"])).optional(),
  alreadyBuildingSupport: z.array(z.enum(["awareness", "founding-team", "cofounder", "capital"])).optional(),
  wantToWorkInvolvement: z.array(z.enum(["volunteer", "full-time"])).optional(),
  deckType: z.enum(["link", "file", "none"]).optional(),
  deckLink: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  creatorLaunchComment: z.string().max(COMMENT_MAX_LENGTH, `Comment must be ${COMMENT_MAX_LENGTH} characters or less`).optional(),
}).superRefine((data, ctx) => {
  if (!data.anonymous && !(data.creatorLaunchComment || "").trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Creator context comment is required for non-anonymous submissions",
      path: ["creatorLaunchComment"],
    })
  }
})

type ProblemFormData = z.infer<typeof problemSchema>

interface DraftPayloadResponse {
  draftId: string
  status: "draft"
  savedAt: string
  submissionVersion: number
}

export default function ProblemSubmitForm() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [customTag, setCustomTag] = useState("")
  const [alreadyBuildingSupportOptions, setAlreadyBuildingSupportOptions] = useState<AlreadyBuildingSupport[]>([])
  const [deckType, setDeckType] = useState<"link" | "file" | "none">("none")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showForkValidationError, setShowForkValidationError] = useState(false)
  const [showDiscardDialog, setShowDiscardDialog] = useState(false)
  const [draftLifecycleState, setDraftLifecycleState] = useState<DraftLifecycleState>("idle")
  const [draftActionError, setDraftActionError] = useState<string | null>(null)
  const [isDraftActionLoading, setIsDraftActionLoading] = useState(false)
  const [drafts, setDrafts] = useState<DraftSummary[]>([])
  const [archiveTargetDraft, setArchiveTargetDraft] = useState<DraftSummary | null>(null)
  const [isArchiveActionLoading, setIsArchiveActionLoading] = useState(false)
  const [currentDraftId, setCurrentDraftId] = useState<string | null>(null)
  const [currentSubmissionVersion, setCurrentSubmissionVersion] = useState<number | null>(null)
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null)
  const [statusTick, setStatusTick] = useState(0)
  const [hasInitializedDrafts, setHasInitializedDrafts] = useState(false)
  const [forkValidation, setForkValidation] = useState<ForkValidationResult | null>(null)
  const [tweetUrls, setTweetUrls] = useState<string[]>([])
  const [newTweetUrl, setNewTweetUrl] = useState("")
  const [tweetUrlError, setTweetUrlError] = useState<string | null>(null)
  const [forkData, setForkData] = useState<{
    originalId: number
    originalTitle: string
    title: string
    elevatorPitch: string
    fullDescription: string
    category: string
  } | null>(null)

  const router = useRouter()
  const searchParams = useSearchParams()
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const forkId = searchParams.get("fork")
  const isHydratingFromServer = useRef(false)

  const form = useForm<ProblemFormData>({
    resolver: zodResolver(problemSchema),
    defaultValues: blankFormValues,
  })

  const titleLength = form.watch("title")?.length || 0
  const pitchLength = form.watch("pitch")?.length || 0
  const currentInvolvement = form.watch("involvement")

  useEffect(() => {
    if (!lastSavedAt || draftLifecycleState !== "saved") return
    const interval = setInterval(() => setStatusTick((prev) => prev + 1), 30_000)
    return () => clearInterval(interval)
  }, [lastSavedAt, draftLifecycleState])

  const draftStatusLabel = useMemo(() => {
    void statusTick

    if (draftLifecycleState === "creating") return "Creating draft..."
    if (draftLifecycleState === "editing") return "Editing"
    if (draftLifecycleState === "autosaving") return "Autosaving..."
    if (draftLifecycleState === "submitting") return "Submitting..."
    if (draftLifecycleState === "saved" && lastSavedAt) {
      const diffMs = Date.now() - lastSavedAt.getTime()
      const diffMinutes = Math.max(0, Math.floor(diffMs / 60_000))
      if (diffMinutes === 0) return "Saved just now"
      if (diffMinutes === 1) return "Saved 1 min ago"
      return `Saved ${diffMinutes} mins ago`
    }
    return "Idle"
  }, [draftLifecycleState, lastSavedAt, statusTick])

  const categoryLabelToSlug = useMemo(
    () =>
      CATEGORIES.reduce<Record<string, string>>((acc, category) => {
        acc[category.label.toLowerCase()] = category.value
        return acc
      }, {}),
    [],
  )

  const mapCategoryToSlug = useCallback(
    (category?: string | null) => {
      const normalized = (category || "").trim().toLowerCase()
      return categoryLabelToSlug[normalized] || normalized || "other"
    },
    [categoryLabelToSlug],
  )

  const normalizeServerDraft = useCallback(
    (draft: Partial<ProblemFormData> & { tags?: string[]; alreadyBuildingSupport?: string[]; category?: string }) => {
      const safeSupport = (draft.alreadyBuildingSupport || []).filter((value): value is AlreadyBuildingSupport =>
        ALREADY_BUILDING_SUPPORT_OPTIONS.some((opt) => opt.value === value),
      )

      return {
        title: draft.title || "",
        pitch: draft.pitch || "",
        description: draft.description || "",
        category: mapCategoryToSlug(draft.category),
        tags: draft.tags || [],
        anonymous: draft.anonymous || false,
        involvement: draft.involvement || "just-sharing",
        wantBuildBlocker: Array.isArray(draft.wantBuildBlocker) ? draft.wantBuildBlocker : [],
        alreadyBuildingSupport: safeSupport,
        wantToWorkInvolvement: Array.isArray(draft.wantToWorkInvolvement) ? draft.wantToWorkInvolvement : [],
        deckType: draft.deckType || "none",
        deckLink: draft.deckLink || "",
        creatorLaunchComment: draft.creatorLaunchComment || "",
      } satisfies ProblemFormData
    },
    [mapCategoryToSlug],
  )

  const resetToBlankDraft = useCallback(() => {
    form.reset(blankFormValues)
    setSelectedTags([])
    setAlreadyBuildingSupportOptions([])
    setDeckType("none")
    setUploadedFile(null)
    setCurrentDraftId(null)
    setCurrentSubmissionVersion(null)
    setLastSavedAt(null)
    setDraftLifecycleState("idle")
    setTweetUrls([])
    localStorage.removeItem("openquest_draft")
  }, [form])

  const buildDraftPayload = useCallback(
    (
      data: ProblemFormData,
      overrides?: {
        tags?: string[]
        alreadyBuildingSupport?: AlreadyBuildingSupport[]
        deckType?: "link" | "file" | "none"
        forkedFromProblemId?: string
        tweetUrls?: string[]
      },
    ) => ({
      title: data.title,
      pitch: data.pitch,
      description: data.description,
      category: data.category,
      tags: overrides?.tags || selectedTags,
      anonymous: data.anonymous,
      involvement: data.involvement,
      wantBuildBlocker: data.wantBuildBlocker,
      alreadyBuildingSupport: overrides?.alreadyBuildingSupport || alreadyBuildingSupportOptions,
      wantToWorkInvolvement: data.wantToWorkInvolvement,
      deckType: overrides?.deckType || deckType,
      deckLink: (overrides?.deckType || deckType) === "link" ? data.deckLink : "",
      forkedFromProblemId: overrides?.forkedFromProblemId || (forkData?.originalId ? String(forkData.originalId) : undefined),
      creatorLaunchComment: data.anonymous ? "" : (data.creatorLaunchComment || "").trim(),
      tweetUrls: overrides?.tweetUrls ?? tweetUrls,
    }),
    [selectedTags, alreadyBuildingSupportOptions, deckType, forkData?.originalId, tweetUrls],
  )

  const syncLocalFallbackDraft = useCallback(
    (data: ProblemFormData) => {
      localStorage.setItem(
        "openquest_draft",
        JSON.stringify({
          ...data,
          tags: selectedTags,
          alreadyBuildingSupport: alreadyBuildingSupportOptions,
          deckType,
          tweetUrls,
          timestamp: Date.now(),
        }),
      )
    },
    [selectedTags, alreadyBuildingSupportOptions, deckType, tweetUrls],
  )

  const redirectToLoginWithDraft = useCallback(
    (data: ProblemFormData) => {
      const snapshot = {
        ...data,
        tags: selectedTags,
        alreadyBuildingSupport: alreadyBuildingSupportOptions,
        deckType,
        tweetUrls,
        forkedFromProblemId: forkData?.originalId ? String(forkData.originalId) : undefined,
        timestamp: Date.now(),
      }
      localStorage.setItem("openquest_pending_auth_draft", JSON.stringify(snapshot))
      localStorage.setItem("openquest_draft", JSON.stringify(snapshot))
      router.push("/login?returnUrl=/submit")
    },
    [selectedTags, alreadyBuildingSupportOptions, deckType, tweetUrls, forkData?.originalId, router],
  )

  const loadDrafts = useCallback(async () => {
    if (!isAuthenticated) return []

    const response = await fetch("/api/problems/drafts", { cache: "no-store" })
    if (!response.ok) {
      throw new Error("Failed to fetch drafts")
    }

    const data = await response.json()
    const draftList = Array.isArray(data.drafts) ? (data.drafts as DraftSummary[]) : []
    setDrafts(draftList)
    return draftList
  }, [isAuthenticated])

  const hydrateDraft = useCallback(
    async (draftId: string) => {
      setDraftActionError(null)
      isHydratingFromServer.current = true
      try {
        const response = await fetch(`/api/problems/drafts/${draftId}`, { cache: "no-store" })
        if (!response.ok) {
          throw new Error("Failed to load draft")
        }

        const data = await response.json()
        const normalizedDraft = normalizeServerDraft(data.draft || {})

        form.reset(normalizedDraft)
        setSelectedTags(normalizedDraft.tags || [])
        setAlreadyBuildingSupportOptions((normalizedDraft.alreadyBuildingSupport || []) as AlreadyBuildingSupport[])
        setDeckType(normalizedDraft.deckType || "none")
        setTweetUrls(data.draft?.tweetUrls || [])
        setCurrentDraftId(draftId)
        setCurrentSubmissionVersion(typeof data?.draft?.submissionVersion === "number" ? data.draft.submissionVersion : null)
        setLastSavedAt(data?.draft?.updatedAt ? new Date(data.draft.updatedAt) : null)
        setDraftLifecycleState("editing")
        localStorage.setItem("openquest_draft", JSON.stringify({ ...normalizedDraft, timestamp: Date.now() }))
      } finally {
        isHydratingFromServer.current = false
      }
    },
    [form, normalizeServerDraft],
  )

  const saveDraftToServer = useCallback(
    async (mode: "manual" | "autosave") => {
      const data = form.getValues()
      if (!isAuthenticated) {
        redirectToLoginWithDraft(data)
        return null
      }

      setDraftActionError(null)
      setIsDraftActionLoading(mode === "manual")
      setDraftLifecycleState(currentDraftId ? (mode === "autosave" ? "autosaving" : "editing") : "creating")

      const payload = buildDraftPayload(data)

      let draftId = currentDraftId
      let savedAt: string | undefined
      let submissionVersion = currentSubmissionVersion
      if (!draftId) {
        const createResponse = await fetch("/api/problems/drafts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, dedupe: true }),
        })

        if (!createResponse.ok) {
          throw new Error("Failed to create draft")
        }

        const created = (await createResponse.json()) as DraftPayloadResponse
        draftId = created.draftId
        savedAt = created.savedAt
        submissionVersion = created.submissionVersion
        setCurrentDraftId(draftId)
        setCurrentSubmissionVersion(created.submissionVersion)
      } else {
        if (typeof submissionVersion !== "number") {
          throw new Error("Draft version unavailable. Please reload this draft and try again.")
        }

        const updateResponse = await fetch(`/api/problems/drafts/${draftId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, submissionVersion }),
        })

        if (!updateResponse.ok) {
          let errorMessage = "Failed to save draft"
          try {
            const errorPayload = await updateResponse.json()
            if (typeof errorPayload?.currentSubmissionVersion === "number") {
              setCurrentSubmissionVersion(errorPayload.currentSubmissionVersion)
            }
            if (typeof errorPayload?.error === "string" && errorPayload.error.length > 0) {
              errorMessage = errorPayload.error
            }
          } catch {
            // keep fallback message
          }
          throw new Error(errorMessage)
        }
        const updated = (await updateResponse.json()) as DraftPayloadResponse
        savedAt = updated.savedAt
        submissionVersion = updated.submissionVersion
        setCurrentSubmissionVersion(updated.submissionVersion)
      }

      form.reset(data)
      if (mode === "manual") {
        await loadDrafts()
      }
      setDraftLifecycleState("saved")
      setLastSavedAt(savedAt ? new Date(savedAt) : new Date())
      setIsDraftActionLoading(false)
      syncLocalFallbackDraft(data)
      return draftId
    },
    [
      form,
      isAuthenticated,
      redirectToLoginWithDraft,
      currentDraftId,
      currentSubmissionVersion,
      buildDraftPayload,
      loadDrafts,
      syncLocalFallbackDraft,
    ],
  )

  const discardCurrentDraft = useCallback(async () => {
    if (!currentDraftId) {
      resetToBlankDraft()
      return
    }

    setIsDraftActionLoading(true)
    const response = await fetch(`/api/problems/drafts/${currentDraftId}/abandon`, { method: "POST" })
    if (!response.ok) {
      setIsDraftActionLoading(false)
      throw new Error("Failed to discard draft")
    }

    resetToBlankDraft()
    setIsDraftActionLoading(false)
    await loadDrafts()
  }, [currentDraftId, resetToBlankDraft, loadDrafts])

  const handleManualSave = useCallback(async () => {
    try {
      await saveDraftToServer("manual")
    } catch (error) {
      setIsDraftActionLoading(false)
      setDraftLifecycleState("editing")
      setDraftActionError(error instanceof Error ? error.message : "Failed to save draft")
    }
  }, [saveDraftToServer])

  const handleLoadDraft = useCallback(
    async (draftId: string) => {
      try {
        await hydrateDraft(draftId)
      } catch (error) {
        setDraftActionError(error instanceof Error ? error.message : "Failed to load draft")
      }
    },
    [hydrateDraft],
  )

  const archiveDraftById = useCallback(
    async (draftId: string) => {
      setIsArchiveActionLoading(true)
      setDraftActionError(null)
      try {
        const response = await fetch(`/api/problems/drafts/${draftId}/abandon`, { method: "POST" })
        if (!response.ok) {
          throw new Error("Failed to archive draft")
        }

        if (currentDraftId === draftId) {
          resetToBlankDraft()
        }
        await loadDrafts()
      } finally {
        setIsArchiveActionLoading(false)
      }
    },
    [currentDraftId, loadDrafts, resetToBlankDraft],
  )

  // Save local fallback draft when core fields change.
  useEffect(() => {
    const values = form.getValues()
    syncLocalFallbackDraft(values)
  }, [
    form,
    form.watch("title"),
    form.watch("pitch"),
    form.watch("description"),
    form.watch("category"),
    form.watch("involvement"),
    form.watch("deckLink"),
    form.watch("anonymous"),
    form.watch("creatorLaunchComment"),
    selectedTags,
    alreadyBuildingSupportOptions,
    deckType,
    syncLocalFallbackDraft,
  ])

  // Initial hydration: fork payload or local fallback draft for anonymous users.
  useEffect(() => {
    if (forkId) {
      const savedFork = localStorage.getItem("openquest_fork")
      if (savedFork) {
        try {
          const fork = JSON.parse(savedFork)
          setForkData(fork)
          form.reset({
            ...blankFormValues,
            title: fork.title || "",
            pitch: fork.elevatorPitch || "",
            description: fork.fullDescription || "",
            category: mapCategoryToSlug(fork.category),
            involvement: "want-build",
          })
          localStorage.removeItem("openquest_fork")
        } catch {
          // Ignore invalid fork payload
        }
      }
      return
    }

    // If a pending auth draft exists, the authenticated resume effect owns restoration
    if (localStorage.getItem("openquest_pending_auth_draft")) return

    const savedDraft = localStorage.getItem("openquest_draft")
    if (!savedDraft) return

    try {
      const draft = JSON.parse(savedDraft)
      if (Date.now() - draft.timestamp < 24 * 60 * 60 * 1000) {
        const normalized = normalizeServerDraft(draft)
        form.reset(normalized)
        setSelectedTags(normalized.tags || [])
        setAlreadyBuildingSupportOptions((normalized.alreadyBuildingSupport || []) as AlreadyBuildingSupport[])
        setDeckType(normalized.deckType || "none")
        setTweetUrls(draft.tweetUrls || [])
      }
    } catch {
      // Ignore invalid local fallback draft
    }
  }, [forkId, form, mapCategoryToSlug, normalizeServerDraft])

  // Authenticated resume flow: merge pending local snapshot once, otherwise load latest draft.
  // Strategy: "populate first, sync second" — always show user their data immediately from
  // localStorage, then sync with the server in the background. Never let a server failure blank the form.
  useEffect(() => {
    if (authLoading || !isAuthenticated || hasInitializedDrafts) {
      return
    }

    let cancelled = false

    const init = async () => {
      try {
        const pendingRaw = localStorage.getItem("openquest_pending_auth_draft")
        if (pendingRaw) {
          const snapshot = JSON.parse(pendingRaw)
          const normalized = normalizeServerDraft(snapshot)

          const snapshotTags = Array.isArray(snapshot.tags) ? snapshot.tags : []
          const snapshotSupport = (Array.isArray(snapshot.alreadyBuildingSupport) ? snapshot.alreadyBuildingSupport : [])
            .filter((value: string): value is AlreadyBuildingSupport =>
              ALREADY_BUILDING_SUPPORT_OPTIONS.some((option) => option.value === value),
            )
          const snapshotDeckType = snapshot.deckType === "link" || snapshot.deckType === "file" ? snapshot.deckType : "none" as const
          const snapshotTweetUrls = Array.isArray(snapshot.tweetUrls) ? snapshot.tweetUrls : []

          // IMMEDIATELY populate form from snapshot — user sees their data before any fetch
          if (!cancelled) {
            form.reset(normalized)
            setSelectedTags(snapshotTags)
            setAlreadyBuildingSupportOptions(snapshotSupport)
            setDeckType(snapshotDeckType)
            setTweetUrls(snapshotTweetUrls)
          }

          // Now try to create/merge server draft (best-effort — form is already populated)
          try {
            const createResponse = await fetch("/api/problems/drafts", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                title: normalized.title,
                pitch: normalized.pitch,
                description: normalized.description,
                category: normalized.category,
                tags: snapshotTags,
                anonymous: normalized.anonymous,
                involvement: normalized.involvement,
                wantBuildBlocker: normalized.wantBuildBlocker,
                alreadyBuildingSupport: snapshotSupport,
                wantToWorkInvolvement: normalized.wantToWorkInvolvement,
                deckType: snapshotDeckType,
                deckLink: snapshotDeckType === "link" ? (normalized.deckLink || "") : "",
                forkedFromProblemId: typeof snapshot.forkedFromProblemId === "string" ? snapshot.forkedFromProblemId : undefined,
                creatorLaunchComment: normalized.anonymous ? "" : (normalized.creatorLaunchComment || "").trim(),
                tweetUrls: snapshotTweetUrls,
                dedupe: true,
              }),
            })

            if (createResponse.ok && !cancelled) {
              const created = (await createResponse.json()) as DraftPayloadResponse
              setCurrentDraftId(created.draftId)
              setCurrentSubmissionVersion(created.submissionVersion)
              setLastSavedAt(created.savedAt ? new Date(created.savedAt) : new Date())
              setDraftLifecycleState("saved")
              await loadDrafts()
            }
            // If POST fails: form already populated from snapshot, user can save manually
          } catch {
            // Server sync failed silently — form data is intact from snapshot
          }

          localStorage.removeItem("openquest_pending_auth_draft")
        } else {
          const draftList = await loadDrafts()
          if (!cancelled && draftList.length > 0 && !forkId) {
            await hydrateDraft(draftList[0].id)
          }
        }
      } catch (error) {
        if (!cancelled) {
          setDraftActionError(error instanceof Error ? error.message : "Failed to initialize drafts")
        }
      } finally {
        if (!cancelled) {
          setHasInitializedDrafts(true)
        }
      }
    }

    void init()

    return () => {
      cancelled = true
    }
  }, [
    authLoading,
    isAuthenticated,
    hasInitializedDrafts,
    normalizeServerDraft,
    form,
    hydrateDraft,
    loadDrafts,
    forkId,
  ])

  // Real-time fork validation
  useEffect(() => {
    if (!forkData) return

    const currentValues = form.getValues()
    if (!currentValues.title && !currentValues.pitch && !currentValues.description) {
      return
    }

    const validation = validateFork(
      {
        title: forkData.title,
        pitch: forkData.elevatorPitch,
        description: forkData.fullDescription,
      },
      {
        title: currentValues.title || "",
        pitch: currentValues.pitch || "",
        description: currentValues.description || "",
      },
    )

    setForkValidation(validation)
  }, [forkData, form, form.watch("title"), form.watch("pitch"), form.watch("description")])

  // Autosave server draft for authenticated users.
  useEffect(() => {
    if (!isAuthenticated || !hasInitializedDrafts || !currentDraftId || isHydratingFromServer.current) {
      return
    }

    if (!form.formState.isDirty || isDraftActionLoading || draftLifecycleState === "submitting") {
      return
    }

    const timeout = setTimeout(async () => {
      try {
        await saveDraftToServer("autosave")
      } catch {
        setDraftActionError("Autosave failed. Your local draft is still preserved.")
      }
    }, 1200)

    return () => clearTimeout(timeout)
  }, [
    form.formState.isDirty,
    form.watch("title"),
    form.watch("pitch"),
    form.watch("description"),
    form.watch("category"),
    form.watch("involvement"),
    form.watch("deckLink"),
    form.watch("anonymous"),
    form.watch("creatorLaunchComment"),
    selectedTags,
    alreadyBuildingSupportOptions,
    deckType,
    tweetUrls,
    isAuthenticated,
    hasInitializedDrafts,
    currentDraftId,
    isDraftActionLoading,
    draftLifecycleState,
    saveDraftToServer,
  ])

  const onSubmit = async (data: ProblemFormData) => {
    setDraftActionError(null)

    if (!isAuthenticated) {
      redirectToLoginWithDraft(data)
      return
    }

    if (forkData && forkValidation && !forkValidation.isValid) {
      setShowForkValidationError(true)
      return
    }

    setIsDraftActionLoading(true)
    setDraftLifecycleState("submitting")

    try {
      let draftId = currentDraftId
      if (!draftId) {
        draftId = await saveDraftToServer("manual")
      } else if (form.formState.isDirty) {
        await saveDraftToServer("manual")
      }

      if (!draftId) {
        throw new Error("Could not create draft for submission")
      }

      const response = await fetch(`/api/problems/drafts/${draftId}/submit`, {
        method: "POST",
      })

      const responseBody = await response.json()
      if (!response.ok) {
        if (responseBody?.errors?.length) {
          throw new Error(responseBody.errors.join(". "))
        }
        throw new Error(responseBody?.error || "Failed to submit draft")
      }

      localStorage.removeItem("openquest_draft")
      localStorage.removeItem("openquest_pending_auth_draft")
      setShowSuccessModal(true)
      resetToBlankDraft()
      await loadDrafts()
      setIsDraftActionLoading(false)
    } catch (error) {
      setIsDraftActionLoading(false)
      setDraftLifecycleState("editing")
      setDraftActionError(error instanceof Error ? error.message : "Failed to submit draft")
    }
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : prev.length >= 5
          ? prev
          : [...prev, tag]
      form.setValue("tags", next, { shouldDirty: true })
      return next
    })
  }

  const addCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim()) && selectedTags.length < 5) {
      const next = [...selectedTags, customTag.trim()]
      setSelectedTags(next)
      form.setValue("tags", next, { shouldDirty: true })
      setCustomTag("")
    }
  }

  const removeTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = prev.filter((t) => t !== tag)
      form.setValue("tags", next, { shouldDirty: true })
      return next
    })
  }

  return (
    <>
    <Header compact hideSubmitButton maxWidth="max-w-3xl" />
    <div className="mx-auto max-w-3xl px-4 pt-24 pb-8 md:pb-12">
      <div className="mb-8">
        <Link
          href="/feed"
          className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-2 text-sm transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to feed
        </Link>
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 flex size-12 shrink-0 items-center justify-center rounded-xl">
            <Sparkles className="text-primary size-6" />
          </div>
          <div>
            <h1 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Share a problem
            </h1>
            <p className="text-muted-foreground mt-1">What's broken that needs fixing?</p>
          </div>
        </div>
      </div>

      {isAuthenticated && (
        <div className="mb-6 space-y-3 rounded-lg border p-4">
          <div className="flex items-center justify-between gap-3">
            {currentDraftId && (
              <Button type="button" variant="outline" size="sm" onClick={resetToBlankDraft}>
                Start New
              </Button>
            )}
          </div>

          {drafts.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">My Drafts</p>
              <div className="space-y-2">
                {drafts.map((draft) => (
                  <div
                    key={draft.id}
                    className={cn(
                      "w-full rounded-md border p-3 transition-colors",
                      currentDraftId === draft.id ? "border-primary bg-primary/5" : "hover:bg-muted/40",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <button type="button" onClick={() => void handleLoadDraft(draft.id)} className="min-w-0 flex-1 text-left">
                        <p className="truncate text-sm font-medium">{draft.title || "Untitled draft"}</p>
                        <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">{draft.pitchPreview}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {draft.category} • Updated {new Date(draft.updatedAt).toLocaleString()}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-1">
                          <span className="rounded-full border px-2 py-0.5 text-[11px] text-muted-foreground">
                            {draft.completenessScore}% complete
                          </span>
                          {draft.isFork && (
                            <span className="rounded-full border px-2 py-0.5 text-[11px] text-muted-foreground">
                              Fork
                            </span>
                          )}
                          {draft.missingRequired.slice(0, 2).map((field) => (
                            <span key={`${draft.id}-${field}`} className="rounded-full border px-2 py-0.5 text-[11px] text-muted-foreground">
                              Missing: {MISSING_FIELD_LABELS[field]}
                            </span>
                          ))}
                          {draft.missingRequired.length > 2 && (
                            <span className="rounded-full border px-2 py-0.5 text-[11px] text-muted-foreground">
                              +{draft.missingRequired.length - 2} more
                            </span>
                          )}
                        </div>
                      </button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setArchiveTargetDraft(draft)}
                        disabled={isArchiveActionLoading}
                        className="shrink-0"
                      >
                        <Trash2 className="mr-1 h-4 w-4" />
                        Archive
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {forkData && (
        <ForkBanner
          originalTitle={forkData.originalTitle}
          originalId={forkData.originalId}
          onDismiss={() => setForkData(null)}
          differentiationScore={forkValidation?.overallDiff}
          isValid={forkValidation?.isValid}
        />
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  Title <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="e.g., Small businesses can't afford carbon tracking software" className="text-base pr-16" {...field} />
                    <div
                      className={cn(
                        "absolute right-3 top-1/2 -translate-y-1/2 text-xs tabular-nums text-muted-foreground",
                        titleLength > 90 && titleLength <= 100 && "text-orange-500",
                        titleLength > 100 && "text-destructive",
                      )}
                    >
                      {titleLength}/100
                    </div>
                  </div>
                </FormControl>
                {forkData && forkValidation && (
                  <div
                    className={cn(
                      "text-xs mt-2 flex items-center gap-1.5",
                      forkValidation.titleDiff >= 30
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400",
                    )}
                  >
                    {forkValidation.titleDiff >= 30 ? "✓" : "⚠"} {forkValidation.titleDiff}% different from original
                    {forkValidation.titleDiff < 30 && ` (need ${30 - forkValidation.titleDiff}% more)`}
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pitch"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  Elevator Pitch <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Textarea
                      placeholder="Who has this problem? How big is it? Why does it matter now?"
                      rows={3}
                      className="resize-none text-base pb-8"
                      {...field}
                    />
                    <div
                      className={cn(
                        "absolute bottom-3 right-3 text-xs tabular-nums text-muted-foreground",
                        pitchLength > 250 && pitchLength <= 280 && "text-orange-500",
                        pitchLength > 280 && "text-destructive",
                      )}
                    >
                      {pitchLength}/280
                    </div>
                  </div>
                </FormControl>
                {forkData && forkValidation && (
                  <div
                    className={cn(
                      "text-xs mt-2 flex items-center gap-1.5",
                      forkValidation.pitchDiff >= 40
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400",
                    )}
                  >
                    {forkValidation.pitchDiff >= 40 ? "✓" : "⚠"} {forkValidation.pitchDiff}% different from original
                    {forkValidation.pitchDiff < 40 && ` (need ${40 - forkValidation.pitchDiff}% more)`}
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-baseline justify-between">
                  <FormLabel className="text-base">
                    Full Description <span className="text-destructive">*</span>
                  </FormLabel>
                  <span className="text-xs text-muted-foreground">Markdown supported</span>
                </div>
                <FormControl>
                  <Textarea
                    placeholder="Go deeper: What's broken today? Who's affected and how badly? What would solving this unlock? Any validation or data you have?"
                    rows={8}
                    className="text-base"
                    {...field}
                  />
                </FormControl>
                {forkData && forkValidation && (
                  <div
                    className={cn(
                      "text-xs mt-2 flex items-center gap-1.5",
                      forkValidation.descriptionDiff >= 50
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400",
                    )}
                  >
                    {forkValidation.descriptionDiff >= 50 ? "✓" : "⚠"} {forkValidation.descriptionDiff}% different from
                    original{forkValidation.descriptionDiff < 50 && ` (need ${50 - forkValidation.descriptionDiff}% more)`}
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <FormLabel className="text-base">Deck or Presentation</FormLabel>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={deckType === "link" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setDeckType("link")
                  form.setValue("deckType", "link", { shouldDirty: true })
                  setUploadedFile(null)
                }}
                className="flex items-center gap-2"
              >
                <LinkIcon className="h-4 w-4" />
                Add Link
              </Button>
              <Button
                type="button"
                variant={deckType === "file" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setDeckType("file")
                  form.setValue("deckType", "file", { shouldDirty: true })
                  form.setValue("deckLink", "", { shouldDirty: true })
                }}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Upload
              </Button>
              {(deckType === "link" || deckType === "file") && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setDeckType("none")
                    form.setValue("deckType", "none", { shouldDirty: true })
                    form.setValue("deckLink", "", { shouldDirty: true })
                    setUploadedFile(null)
                  }}
                  className="text-muted-foreground"
                >
                  Clear
                </Button>
              )}
            </div>

            {deckType === "link" && (
              <FormField
                control={form.control}
                name="deckLink"
                render={({ field }) => (
                  <FormItem className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <FormControl>
                      <Input placeholder="https://..." className="text-base" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {deckType === "file" && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                {!uploadedFile ? (
                  <label className="border-input hover:border-primary flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed p-6 transition-colors">
                    <Upload className="text-muted-foreground h-6 w-6" />
                    <p className="text-muted-foreground text-sm">PDF, PPT, PPTX (max 25MB)</p>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.ppt,.pptx,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          if (file.size > 25 * 1024 * 1024) {
                            alert("File size must be less than 25MB")
                            return
                          }
                          setUploadedFile(file)
                        }
                      }}
                    />
                  </label>
                ) : (
                  <div className="bg-secondary flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                        <FileText className="text-primary h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{uploadedFile.name}</p>
                        <p className="text-muted-foreground text-xs">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setUploadedFile(null)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Related Tweets */}
          <div className="space-y-3">
            <div>
              <p className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Related Tweets
              </p>
              <p className="text-sm text-muted-foreground mt-1.5">
                Add tweets that discuss this problem (up to {MAX_TWEETS_PER_PROBLEM})
              </p>
            </div>

            {tweetUrls.length > 0 && (
              <div className="space-y-2">
                {tweetUrls.map((url, index) => (
                  <div key={index} className="flex items-center gap-2 rounded-lg border bg-secondary/50 px-3 py-2">
                    <Twitter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm truncate flex-1">{url}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                      onClick={() => setTweetUrls((prev) => prev.filter((_, i) => i !== index))}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {tweetUrls.length < MAX_TWEETS_PER_PROBLEM && (
              <div className="flex gap-2">
                <Input
                  placeholder="https://x.com/user/status/..."
                  value={newTweetUrl}
                  onChange={(e) => {
                    setNewTweetUrl(e.target.value)
                    setTweetUrlError(null)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      const id = extractTweetId(newTweetUrl)
                      if (!id) {
                        setTweetUrlError("Please enter a valid tweet URL (x.com or twitter.com)")
                        return
                      }
                      if (tweetUrls.some((u) => extractTweetId(u) === id)) {
                        setTweetUrlError("This tweet has already been added")
                        return
                      }
                      setTweetUrls((prev) => [...prev, newTweetUrl.trim()])
                      setNewTweetUrl("")
                      setTweetUrlError(null)
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const id = extractTweetId(newTweetUrl)
                    if (!id) {
                      setTweetUrlError("Please enter a valid tweet URL (x.com or twitter.com)")
                      return
                    }
                    if (tweetUrls.some((u) => extractTweetId(u) === id)) {
                      setTweetUrlError("This tweet has already been added")
                      return
                    }
                    setTweetUrls((prev) => [...prev, newTweetUrl.trim()])
                    setNewTweetUrl("")
                    setTweetUrlError(null)
                  }}
                >
                  Add
                </Button>
              </div>
            )}

            {tweetUrlError && (
              <p className="text-xs text-destructive">{tweetUrlError}</p>
            )}

            {tweetUrls.length > 0 && (
              <p className="text-xs text-muted-foreground">
                {tweetUrls.length}/{MAX_TWEETS_PER_PROBLEM} tweets added
              </p>
            )}
          </div>

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  Category <span className="text-destructive">*</span>
                </FormLabel>
                <Select value={field.value} onValueChange={(value) => field.onChange(value)}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        <div className="flex items-center gap-2">
                          <div className={cn("size-2 rounded-full", cat.color)} />
                          <span>{cat.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-3">
            <div className="flex items-baseline justify-between">
              <FormLabel className="text-base">Tags</FormLabel>
              <span className="text-xs text-muted-foreground">Up to 5</span>
            </div>

            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2" role="list" aria-label="Selected tags">
                {selectedTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => removeTag(tag)}
                    aria-label={`Remove ${tag} tag`}
                    className="bg-primary/10 text-primary hover:bg-primary/20 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm transition-colors"
                  >
                    {tag}
                    <span className="text-primary/60" aria-hidden="true">×</span>
                  </button>
                ))}
              </div>
            )}

            {selectedTags.length < 5 && (
              <div className="flex flex-wrap gap-2" role="list" aria-label="Suggested tags">
                {SUGGESTED_TAGS.filter((tag) => !selectedTags.includes(tag)).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    aria-label={`Add ${tag} tag`}
                    className="border-input hover:border-primary hover:bg-primary/5 rounded-full border px-3 py-1 text-sm transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            {selectedTags.length < 5 && (
              <div className="flex gap-2">
                <Input
                  placeholder="Add custom tag..."
                  value={customTag}
                  onChange={(e) => setCustomTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addCustomTag()
                    }
                  }}
                  aria-label="Custom tag input"
                  className="max-w-xs"
                />
                <Button type="button" variant="outline" onClick={addCustomTag} aria-label="Add custom tag">
                  Add
                </Button>
              </div>
            )}
          </div>

          <div className="border-border space-y-6 rounded-lg border p-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Privacy Settings</h3>

              <FormField
                control={form.control}
                name="anonymous"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start gap-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          const isAnonymous = checked === true
                          field.onChange(isAnonymous)
                          if (isAnonymous) {
                            form.setValue("creatorLaunchComment", "", { shouldDirty: true })
                          }
                        }}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-normal">Post anonymously</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="creatorLaunchComment"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between gap-3">
                      <FormLabel className="text-sm font-medium">
                        Creator context comment {!form.watch("anonymous") && <span className="text-destructive">*</span>}
                      </FormLabel>
                      <span className="text-xs text-muted-foreground">
                        {(field.value || "").length}/{COMMENT_MAX_LENGTH}
                      </span>
                    </div>
                    <FormControl>
                      <Textarea
                        value={field.value || ""}
                        onChange={field.onChange}
                        placeholder={
                          form.watch("anonymous")
                            ? "Disabled for anonymous submissions"
                            : "Share your context: why this matters, what you've learned, and where discussion should focus."
                        }
                        disabled={form.watch("anonymous")}
                        rows={4}
                        className="resize-none text-sm"
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      This will be posted as the first discussion comment when your problem is approved.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="border-border border-t pt-6">
              <FormField
                control={form.control}
                name="involvement"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base">Your involvement</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="radio"
                            value="want-build"
                            checked={field.value === "want-build"}
                            onChange={(e) => {
                              field.onChange(e)
                              form.setValue("alreadyBuildingSupport", [], { shouldDirty: true })
                              form.setValue("wantToWorkInvolvement", [], { shouldDirty: true })
                              setAlreadyBuildingSupportOptions([])
                            }}
                            className="mt-1"
                          />
                          <div>
                            <div className="font-medium">I want to build this</div>
                            <div className="text-muted-foreground text-sm">Looking for co-founders or resources</div>
                          </div>
                        </label>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="radio"
                            value="already-building"
                            checked={field.value === "already-building"}
                            onChange={(e) => {
                              field.onChange(e)
                              form.setValue("wantBuildBlocker", [], { shouldDirty: true })
                              form.setValue("wantToWorkInvolvement", [], { shouldDirty: true })
                            }}
                            className="mt-1"
                          />
                          <div>
                            <div className="font-medium">I'm already building this</div>
                            <div className="text-muted-foreground text-sm">Share progress, get feedback</div>
                          </div>
                        </label>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="radio"
                            value="want-to-work"
                            checked={field.value === "want-to-work"}
                            onChange={(e) => {
                              field.onChange(e)
                              form.setValue("wantBuildBlocker", [], { shouldDirty: true })
                              form.setValue("alreadyBuildingSupport", [], { shouldDirty: true })
                              setAlreadyBuildingSupportOptions([])
                            }}
                            className="mt-1"
                          />
                          <div>
                            <div className="font-medium">I would love to work on this project</div>
                            <div className="text-muted-foreground text-sm">
                              Open to joining as a team member or contributor
                            </div>
                          </div>
                        </label>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="radio"
                            value="just-sharing"
                            checked={field.value === "just-sharing"}
                            onChange={(e) => {
                              field.onChange(e)
                              form.setValue("wantBuildBlocker", [], { shouldDirty: true })
                              form.setValue("alreadyBuildingSupport", [], { shouldDirty: true })
                              form.setValue("wantToWorkInvolvement", [], { shouldDirty: true })
                              setAlreadyBuildingSupportOptions([])
                            }}
                            className="mt-1"
                          />
                          <div>
                            <div className="font-medium">Surfacing this for others to explore</div>
                          </div>
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {currentInvolvement === "want-build" && (
                <FormField
                  control={form.control}
                  name="wantBuildBlocker"
                  render={({ field }) => (
                    <FormItem className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                      <FormLabel className="text-sm font-medium">What's currently holding you back?</FormLabel>
                      <p className="text-muted-foreground text-xs">Select all that apply</p>
                      <FormControl>
                        <div className="space-y-2 pl-6">
                          <label className="flex items-start gap-3 cursor-pointer">
                            <Checkbox
                              checked={(field.value || []).includes("need-capital")}
                              onCheckedChange={(checked) => {
                                const current = field.value || []
                                field.onChange(
                                  checked
                                    ? [...current, "need-capital"]
                                    : current.filter((v: string) => v !== "need-capital")
                                )
                              }}
                            />
                            <div className="text-sm">I need capital/investment</div>
                          </label>
                          <label className="flex items-start gap-3 cursor-pointer">
                            <Checkbox
                              checked={(field.value || []).includes("need-cofounder")}
                              onCheckedChange={(checked) => {
                                const current = field.value || []
                                field.onChange(
                                  checked
                                    ? [...current, "need-cofounder"]
                                    : current.filter((v: string) => v !== "need-cofounder")
                                )
                              }}
                            />
                            <div className="text-sm">I need to find a co-founder or team</div>
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {currentInvolvement === "already-building" && (
                <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <FormLabel className="text-sm font-medium">How can the community best support you?</FormLabel>
                  <p className="text-muted-foreground text-xs">Select all that apply</p>
                  <div className="space-y-2 pl-6">
                    {ALREADY_BUILDING_SUPPORT_OPTIONS.map((option) => (
                      <label key={option.value} className="flex items-start gap-3 cursor-pointer">
                        <Checkbox
                          checked={alreadyBuildingSupportOptions.includes(option.value)}
                          onCheckedChange={(checked) => {
                            const newOptions = checked
                              ? [...alreadyBuildingSupportOptions, option.value]
                              : alreadyBuildingSupportOptions.filter((v) => v !== option.value)
                            setAlreadyBuildingSupportOptions(newOptions)
                            form.setValue("alreadyBuildingSupport", newOptions, { shouldDirty: true })
                          }}
                        />
                        <div className="text-sm leading-none pt-0.5">{option.label}</div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {currentInvolvement === "want-to-work" && (
                <FormField
                  control={form.control}
                  name="wantToWorkInvolvement"
                  render={({ field }) => (
                    <FormItem className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                      <FormLabel className="text-sm font-medium">
                        What kind of involvement are you open to?
                      </FormLabel>
                      <p className="text-muted-foreground text-xs">Select all that apply</p>
                      <FormControl>
                        <div className="space-y-2 pl-6">
                          <label className="flex items-start gap-3 cursor-pointer">
                            <Checkbox
                              checked={(field.value || []).includes("volunteer")}
                              onCheckedChange={(checked) => {
                                const current = field.value || []
                                field.onChange(
                                  checked
                                    ? [...current, "volunteer"]
                                    : current.filter((v: string) => v !== "volunteer")
                                )
                              }}
                            />
                            <div className="text-sm">Happy to volunteer my time</div>
                          </label>
                          <label className="flex items-start gap-3 cursor-pointer">
                            <Checkbox
                              checked={(field.value || []).includes("full-time")}
                              onCheckedChange={(checked) => {
                                const current = field.value || []
                                field.onChange(
                                  checked
                                    ? [...current, "full-time"]
                                    : current.filter((v: string) => v !== "full-time")
                                )
                              }}
                            />
                            <div className="text-sm">Open to exploring full-time opportunities in this space</div>
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>

          {draftActionError && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
              {draftActionError}
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <div className="flex gap-3">
              <Button
                type="submit"
                size="lg"
                className={cn(
                  "flex-1 sm:flex-none",
                  forkData && forkValidation && !forkValidation.isValid && "opacity-50",
                )}
                disabled={(forkData && forkValidation ? !forkValidation.isValid : false) || isDraftActionLoading || authLoading}
              >
                {isDraftActionLoading && draftLifecycleState === "submitting"
                  ? "Submitting..."
                  : forkData && forkValidation
                    ? forkValidation.isValid
                      ? "Submit Fork for Review"
                      : "Fork Too Similar - Make Changes"
                    : "Submit for Review"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => void handleManualSave()}
                disabled={isDraftActionLoading || authLoading}
              >
                {isDraftActionLoading && draftLifecycleState !== "submitting" ? "Saving..." : "Save Draft"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="lg"
                onClick={() => setShowDiscardDialog(true)}
                disabled={isDraftActionLoading}
              >
                Discard Draft
              </Button>
            </div>
            <Button type="button" variant="ghost" size="lg" asChild>
              <Link href="/feed">Cancel</Link>
            </Button>
          </div>
        </form>
      </Form>

      <SubmissionSuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />

      <AlertDialog open={showForkValidationError} onOpenChange={setShowForkValidationError}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              This Fork is Too Similar
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-4 text-left">
              <p>
                Your submission is {forkValidation?.overallDiff}% different from the original problem. Forks must offer
                substantially different perspectives to be approved.
              </p>

              {forkValidation && forkValidation.errors.length > 0 && (
                <div className="space-y-2">
                  <p className="font-semibold text-foreground">What needs to change:</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {forkValidation.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-2 bg-secondary/50 rounded-lg p-4">
                <p className="font-semibold text-foreground text-sm">Tips for a great fork:</p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>What unique angle or focus are you bringing?</li>
                  <li>How is your approach different from the original?</li>
                  <li>What validation or insights do you have that are unique?</li>
                  <li>Consider targeting a different geography, demographic, or use case</li>
                </ul>
              </div>

              <Link
                href={`/problem/${forkData?.originalId}`}
                className="text-sm text-accent hover:text-accent/80 inline-flex items-center gap-1"
              >
                View original problem →
              </Link>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Editing</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showDiscardDialog} onOpenChange={setShowDiscardDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard this draft?</AlertDialogTitle>
            <AlertDialogDescription>
              This will archive the current server draft and clear your editor.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                void (async () => {
                  try {
                    await discardCurrentDraft()
                    setShowDiscardDialog(false)
                  } catch (error) {
                    setDraftActionError(error instanceof Error ? error.message : "Failed to discard draft")
                    setShowDiscardDialog(false)
                  }
                })()
              }}
            >
              Discard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={Boolean(archiveTargetDraft)} onOpenChange={(open) => !open && setArchiveTargetDraft(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Archive "{archiveTargetDraft?.title || "Untitled draft"}"?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes it from active drafts. You will not see it in your drafts list anymore.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isArchiveActionLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={!archiveTargetDraft || isArchiveActionLoading}
              onClick={(e) => {
                e.preventDefault()
                if (!archiveTargetDraft) return
                void (async () => {
                  try {
                    await archiveDraftById(archiveTargetDraft.id)
                    setArchiveTargetDraft(null)
                  } catch (error) {
                    setDraftActionError(error instanceof Error ? error.message : "Failed to archive draft")
                    setArchiveTargetDraft(null)
                  }
                })()
              }}
            >
              {isArchiveActionLoading ? "Archiving..." : "Archive"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    </>
  )
}
