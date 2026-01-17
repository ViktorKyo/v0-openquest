"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
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
  involvement: z.enum(["want-build", "already-building", "just-sharing"]),
})

type ProblemFormData = z.infer<typeof problemSchema>

export default function ProblemSubmitForm() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [customTag, setCustomTag] = useState("")

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
    },
  })

  const titleLength = form.watch("title")?.length || 0
  const pitchLength = form.watch("pitch")?.length || 0

  const onSubmit = (data: ProblemFormData) => {
    console.log("[v0] Form submitted:", { ...data, tags: selectedTags })
    // Handle form submission
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
              Share a problem worth solving
            </h1>
            <p className="text-muted-foreground mt-2 text-balance text-lg">
              The best problems are clear, compelling, and matter to real people. Take your time.
            </p>
          </div>
        </div>
      </div>

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
                    <Input placeholder="What problem needs solving?" className="text-base" {...field} />
                    <div
                      className={cn(
                        "absolute right-3 top-1/2 -translate-y-1/2 text-xs tabular-nums",
                        titleLength > 90 && titleLength <= 100 && "text-orange-500",
                        titleLength > 100 && "text-destructive",
                      )}
                    >
                      {titleLength}/100
                    </div>
                  </div>
                </FormControl>
                <FormDescription>Make it clear and compelling</FormDescription>
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
                      placeholder="Explain it like you're in an elevator with an investor..."
                      rows={3}
                      className="resize-none text-base"
                      {...field}
                    />
                    <div
                      className={cn(
                        "absolute bottom-3 right-3 text-xs tabular-nums",
                        pitchLength > 250 && pitchLength <= 280 && "text-orange-500",
                        pitchLength > 280 && "text-destructive",
                      )}
                    >
                      {pitchLength}/280
                    </div>
                  </div>
                </FormControl>
                <FormDescription>Keep it short and punchy</FormDescription>
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
                <FormLabel className="text-base">
                  Full Description <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Go deep. What's the context? Why does this matter? Who's affected?"
                    rows={10}
                    className="text-base"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="flex items-center gap-2">
                  <span>Provide details, market size, why you care</span>
                  <span className="text-muted-foreground/60">•</span>
                  <span className="text-muted-foreground/80">Markdown supported</span>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

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
            <FormLabel className="text-base">Industry Tags (optional)</FormLabel>
            <p className="text-muted-foreground text-sm">Add up to 5 tags to help people discover your problem</p>

            {/* Selected Tags */}
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="bg-primary/10 text-primary hover:bg-primary/20 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm transition-colors"
                  >
                    {tag}
                    <span className="text-primary/60">×</span>
                  </button>
                ))}
              </div>
            )}

            {/* Suggested Tags */}
            {selectedTags.length < 5 && (
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_TAGS.filter((tag) => !selectedTags.includes(tag)).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
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
                  className="max-w-xs"
                />
                <Button type="button" variant="outline" onClick={addCustomTag}>
                  Add
                </Button>
              </div>
            )}

            {selectedTags.length >= 5 && <p className="text-muted-foreground text-sm">Maximum 5 tags reached</p>}
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
                      <FormDescription>Your name won't be shown on this problem</FormDescription>
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
                            onChange={field.onChange}
                            className="mt-1"
                          />
                          <div>
                            <div className="font-medium">I want to build this</div>
                            <div className="text-muted-foreground text-sm">
                              Looking for co-founders, resources, or validation
                            </div>
                          </div>
                        </label>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="radio"
                            value="already-building"
                            checked={field.value === "already-building"}
                            onChange={field.onChange}
                            className="mt-1"
                          />
                          <div>
                            <div className="font-medium">I'm already building this</div>
                            <div className="text-muted-foreground text-sm">Share progress and get feedback</div>
                          </div>
                        </label>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="radio"
                            value="just-sharing"
                            checked={field.value === "just-sharing"}
                            onChange={field.onChange}
                            className="mt-1"
                          />
                          <div>
                            <div className="font-medium">Just sharing the problem</div>
                            <div className="text-muted-foreground text-sm">Not planning to build it myself</div>
                          </div>
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <div className="flex gap-3">
              <Button type="submit" size="lg" className="flex-1 sm:flex-none">
                Submit for Review
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
    </div>
  )
}
