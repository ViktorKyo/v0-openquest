"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ArrowLeft, Sparkles, Link as LinkIcon, Upload, X, FileText, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { SubmissionSuccessModal } from "@/components/submission-success-modal"
import { ForkBanner } from "@/components/fork-banner"
import { validateFork, type ForkValidationResult } from "@/lib/similarity"
import {
  AlertDialog,
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

const problemSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be 100 characters or less"),
  pitch: z.string().min(1, "Elevator pitch is required").max(280, "Elevator pitch must be 280 characters or less"),
  description: z.string().min(1, "Full description is required"),
  category: z.string().min(1, "Please select a category"),
  tags: z.array(z.string()).max(5, "Maximum 5 tags allowed").optional(),
  anonymous: z.boolean().optional(),
  involvement: z.enum(["want-build", "already-building", "just-sharing", "want-to-work"]),
  // Follow-up fields
  wantBuildBlocker: z.enum(["need-capital", "need-cofounder"]).optional(),
  alreadyBuildingSupport: z.array(z.string()).optional(),
  wantToWorkInvolvement: z.enum(["volunteer", "full-time"]).optional(),
  // Deck upload fields
  deckType: z.enum(["link", "file", "none"]).optional(),
  deckLink: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
})

type ProblemFormData = z.infer<typeof problemSchema>

export default function ProblemSubmitForm() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [customTag, setCustomTag] = useState("")
  const [alreadyBuildingSupportOptions, setAlreadyBuildingSupportOptions] = useState<string[]>([])
  const [deckType, setDeckType] = useState<"link" | "file" | "none">("none")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showForkValidationError, setShowForkValidationError] = useState(false)
  const [forkValidation, setForkValidation] = useState<ForkValidationResult | null>(null)
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

  const form = useForm<ProblemFormData>({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      title: "",
      pitch: "",
      description: "",
      category: "",
      tags: [],
      anonymous: false,
      involvement: "just-sharing",
      wantBuildBlocker: undefined,
      alreadyBuildingSupport: [],
      wantToWorkInvolvement: undefined,
      deckType: "none",
      deckLink: "",
    },
  })

  const titleLength = form.watch("title")?.length || 0
  const pitchLength = form.watch("pitch")?.length || 0
  const currentInvolvement = form.watch("involvement")

  // Save form data to localStorage when it changes
  useEffect(() => {
    const formData = form.getValues()
    localStorage.setItem(
      "openquest_draft",
      JSON.stringify({
        ...formData,
        tags: selectedTags,
        alreadyBuildingSupport: alreadyBuildingSupportOptions,
        deckType,
        timestamp: Date.now(),
      }),
    )
  }, [form.watch(), selectedTags, alreadyBuildingSupportOptions, deckType])

  // Restore form data on mount or load fork data
  useEffect(() => {
    // Check if we're forking a problem
    if (forkId) {
      const savedFork = localStorage.getItem("openquest_fork")
      if (savedFork) {
        try {
          const fork = JSON.parse(savedFork)
          setForkData(fork)

          // Pre-fill form with fork data
          form.reset({
            title: fork.title,
            pitch: fork.elevatorPitch,
            description: fork.fullDescription,
            category: fork.category.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-"),
            involvement: "want-build", // Default to "I want to build this"
            anonymous: false,
            tags: [],
            deckType: "none",
            deckLink: "",
          })

          // Clear the fork data from localStorage after loading
          localStorage.removeItem("openquest_fork")
        } catch (e) {
          // Invalid fork data, ignore
        }
      }
    } else {
      // Not forking, check for saved draft
      const savedDraft = localStorage.getItem("openquest_draft")
      if (savedDraft) {
        try {
          const draft = JSON.parse(savedDraft)
          // Only restore if less than 24 hours old
          if (Date.now() - draft.timestamp < 24 * 60 * 60 * 1000) {
            form.reset(draft)
            setSelectedTags(draft.tags || [])
            setAlreadyBuildingSupportOptions(draft.alreadyBuildingSupport || [])
            setDeckType(draft.deckType || "none")
          }
        } catch (e) {
          // Invalid draft data, ignore
        }
      }
    }
  }, [forkId])

  // Real-time fork validation
  useEffect(() => {
    if (!forkData) return

    const currentValues = form.getValues()

    // Only validate if user has made some changes
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
  }, [forkData, form.watch("title"), form.watch("pitch"), form.watch("description")])

  const onSubmit = (data: ProblemFormData) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      // Save current form data
      localStorage.setItem(
        "openquest_draft",
        JSON.stringify({
          ...data,
          tags: selectedTags,
          alreadyBuildingSupport: alreadyBuildingSupportOptions,
          deckType,
          timestamp: Date.now(),
        }),
      )
      // Redirect to login with return URL
      router.push("/login?returnUrl=/submit")
      return
    }

    // Validate fork if this is a forked problem
    if (forkData && forkValidation && !forkValidation.isValid) {
      setShowForkValidationError(true)
      return
    }

    // TODO: Submit to API
    // const formPayload = {
    //   ...data,
    //   tags: selectedTags,
    //   alreadyBuildingSupport: alreadyBuildingSupportOptions,
    //   forkedFrom: forkData?.originalId,
    // }

    // Show success modal
    setShowSuccessModal(true)

    // Clear draft
    localStorage.removeItem("openquest_draft")

    // In a real implementation, you would:
    // 1. Upload the file to a storage service
    // 2. Submit the problem data to your API
    // 3. Handle success/error states
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag)
      }
      if (prev.length >= 5) {
        return prev
      }
      return [...prev, tag]
    })
  }

  const addCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim()) && selectedTags.length < 5) {
      setSelectedTags((prev) => [...prev, customTag.trim()])
      setCustomTag("")
    }
  }

  const removeTag = (tag: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag))
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:py-12">
      {/* Header */}
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

      {/* Fork Banner */}
      {forkData && (
        <ForkBanner
          originalTitle={forkData.originalTitle}
          originalId={forkData.originalId}
          onDismiss={() => setForkData(null)}
          differentiationScore={forkValidation?.overallDiff}
          isValid={forkValidation?.isValid}
        />
      )}

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Title */}
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

          {/* Elevator Pitch */}
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

          {/* Full Description */}
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

          {/* Supporting Deck/Presentation (Optional) */}
          <div className="space-y-4">
            <FormLabel className="text-base">Deck or Presentation</FormLabel>

            {/* Toggle between link and file */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant={deckType === "link" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setDeckType("link")
                  form.setValue("deckType", "link")
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
                  form.setValue("deckType", "file")
                  form.setValue("deckLink", "")
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
                    form.setValue("deckType", "none")
                    form.setValue("deckLink", "")
                    setUploadedFile(null)
                  }}
                  className="text-muted-foreground"
                >
                  Clear
                </Button>
              )}
            </div>

            {/* Link Input */}
            {deckType === "link" && (
              <FormField
                control={form.control}
                name="deckLink"
                render={({ field }) => (
                  <FormItem className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <FormControl>
                      <Input
                        placeholder="https://..."
                        className="text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* File Upload */}
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
                          // Check file size (25MB max)
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
                        <p className="text-muted-foreground text-xs">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
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

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  Category <span className="text-destructive">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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

          {/* Industry Tags */}
          <div className="space-y-3">
            <div className="flex items-baseline justify-between">
              <FormLabel className="text-base">Tags</FormLabel>
              <span className="text-xs text-muted-foreground">Up to 5</span>
            </div>

            {/* Selected Tags */}
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

            {/* Suggested Tags */}
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

            {/* Custom Tag Input */}
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

          {/* Privacy & Involvement */}
          <div className="border-border space-y-6 rounded-lg border p-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Privacy Settings</h3>

              <FormField
                control={form.control}
                name="anonymous"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start gap-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-normal">Post anonymously</FormLabel>
                    </div>
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
                              form.setValue("alreadyBuildingSupport", [])
                              form.setValue("wantToWorkInvolvement", undefined)
                              setAlreadyBuildingSupportOptions([])
                            }}
                            className="mt-1"
                          />
                          <div>
                            <div className="font-medium">I want to build this</div>
                            <div className="text-muted-foreground text-sm">
                              Looking for co-founders or resources
                            </div>
                          </div>
                        </label>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="radio"
                            value="already-building"
                            checked={field.value === "already-building"}
                            onChange={(e) => {
                              field.onChange(e)
                              form.setValue("wantBuildBlocker", undefined)
                              form.setValue("wantToWorkInvolvement", undefined)
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
                              form.setValue("wantBuildBlocker", undefined)
                              form.setValue("alreadyBuildingSupport", [])
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
                              form.setValue("wantBuildBlocker", undefined)
                              form.setValue("alreadyBuildingSupport", [])
                              form.setValue("wantToWorkInvolvement", undefined)
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

              {/* Follow-up: I want to build this */}
              {currentInvolvement === "want-build" && (
                <FormField
                  control={form.control}
                  name="wantBuildBlocker"
                  render={({ field }) => (
                    <FormItem className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                      <FormLabel className="text-sm font-medium">What's currently holding you back?</FormLabel>
                      <FormControl>
                        <div className="space-y-2 pl-6">
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="radio"
                              value="need-capital"
                              checked={field.value === "need-capital"}
                              onChange={field.onChange}
                              className="mt-0.5"
                            />
                            <div className="text-sm">I need capital/investment</div>
                          </label>
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="radio"
                              value="need-cofounder"
                              checked={field.value === "need-cofounder"}
                              onChange={field.onChange}
                              className="mt-0.5"
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

              {/* Follow-up: I'm already building this */}
              {currentInvolvement === "already-building" && (
                <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <FormLabel className="text-sm font-medium">How can the community best support you?</FormLabel>
                  <p className="text-muted-foreground text-xs">Select all that apply</p>
                  <div className="space-y-2 pl-6">
                    {[
                      { value: "need-awareness", label: "I need more awareness/visibility" },
                      { value: "need-team", label: "I'm looking for founding team members" },
                      { value: "need-cofounder", label: "I'm looking for a technical/business co-founder" },
                      { value: "need-capital", label: "I need more capital/investment" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-start gap-3 cursor-pointer">
                        <Checkbox
                          checked={alreadyBuildingSupportOptions.includes(option.value)}
                          onCheckedChange={(checked) => {
                            const newOptions = checked
                              ? [...alreadyBuildingSupportOptions, option.value]
                              : alreadyBuildingSupportOptions.filter((v) => v !== option.value)
                            setAlreadyBuildingSupportOptions(newOptions)
                            form.setValue("alreadyBuildingSupport", newOptions)
                          }}
                        />
                        <div className="text-sm leading-none pt-0.5">{option.label}</div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Follow-up: I would love to work on this project */}
              {currentInvolvement === "want-to-work" && (
                <FormField
                  control={form.control}
                  name="wantToWorkInvolvement"
                  render={({ field }) => (
                    <FormItem className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                      <FormLabel className="text-sm font-medium">
                        What kind of involvement are you open to?
                      </FormLabel>
                      <FormControl>
                        <div className="space-y-2 pl-6">
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="radio"
                              value="volunteer"
                              checked={field.value === "volunteer"}
                              onChange={field.onChange}
                              className="mt-0.5"
                            />
                            <div className="text-sm">Happy to volunteer my time</div>
                          </label>
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="radio"
                              value="full-time"
                              checked={field.value === "full-time"}
                              onChange={field.onChange}
                              className="mt-0.5"
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

          {/* Submit Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <div className="flex gap-3">
              <Button
                type="submit"
                size="lg"
                className={cn(
                  "flex-1 sm:flex-none",
                  forkData && forkValidation && !forkValidation.isValid && "opacity-50",
                )}
                disabled={forkData && forkValidation ? !forkValidation.isValid : false}
              >
                {forkData && forkValidation ? (
                  forkValidation.isValid ? (
                    "Submit Fork for Review"
                  ) : (
                    "Fork Too Similar - Make Changes"
                  )
                ) : (
                  "Submit for Review"
                )}
              </Button>
              <Button type="button" variant="outline" size="lg">
                Save Draft
              </Button>
            </div>
            <Button type="button" variant="ghost" size="lg" asChild>
              <Link href="/feed">Cancel</Link>
            </Button>
          </div>
        </form>
      </Form>

      {/* Success Modal */}
      <SubmissionSuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />

      {/* Fork Validation Error Dialog */}
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
                <p className="font-semibold text-foreground text-sm">💡 Tips for a great fork:</p>
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
    </div>
  )
}
