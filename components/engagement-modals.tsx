"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { InvestmentTier, InvestmentFocus, EngagementLevel, BuildStatus, BuildStage, LookingFor, RaisingStage, Visibility, RoleInterest } from "@/types/engagement"
import { Globe, ChevronDown, ChevronUp, CheckCircle2, Bell, Handshake, ShieldCheck } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { BuildFormData, InvestFormData, JoinTeamFormData } from "@/lib/pending-engagement"

// Investment Modal - Enhanced with clear value exchange
interface InvestModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: {
    tier: InvestmentTier
    focus: InvestmentFocus
    engagementLevel: EngagementLevel
    note: string
    visibility: Visibility
    linkedIn?: string
  }) => void
  isAuthenticated?: boolean
  onAuthRequired?: (data: InvestFormData) => void
}

export function InvestModal({ isOpen, onClose, onSubmit, isAuthenticated = true, onAuthRequired }: InvestModalProps) {
  // Core fields
  const [focus, setFocus] = useState<InvestmentFocus>("angel")
  const [engagementLevel, setEngagementLevel] = useState<EngagementLevel>("evaluating")
  const [note, setNote] = useState("")
  const [visibility, setVisibility] = useState<Visibility>("public")
  const [linkedIn, setLinkedIn] = useState("")
  const [submitted, setSubmitted] = useState(false)

  // Derive tier from focus for backwards compatibility
  const tierFromFocus = (f: InvestmentFocus): InvestmentTier => {
    switch (f) {
      case "small-checks": return "scout"
      case "angel": return "angel"
      case "vc": return "institutional"
    }
  }

  const focusOptions: { value: InvestmentFocus; label: string; description: string }[] = [
    { value: "small-checks", label: "Small Checks", description: "$1K–$10K | Backing founders at the earliest stage" },
    { value: "angel", label: "Angel", description: "$10K–$100K | Pre-seed and seed-stage investing" },
    { value: "vc", label: "Venture Capital", description: "$100K+ | Institutional rounds and beyond" },
  ]

  const engagementOptions: { value: EngagementLevel; label: string; description: string }[] = [
    { value: "watching", label: "Just watching", description: "Notify me of fundraising news only" },
    { value: "evaluating", label: "Actively evaluating", description: "I'd like intro calls with promising builders" },
    { value: "ready-to-support", label: "Ready to support", description: "Open to advising, intros, or writing checks" },
  ]

  const handleSubmit = () => {
    const formData = {
      tier: tierFromFocus(focus),
      focus,
      engagementLevel,
      note,
      visibility,
      linkedIn: linkedIn || undefined,
    }

    // Check auth on submit, not on open
    if (!isAuthenticated && onAuthRequired) {
      onAuthRequired(formData)
      onClose()
      return
    }

    onSubmit(formData)
    setSubmitted(true)
  }

  const resetForm = () => {
    setFocus("angel")
    setEngagementLevel("evaluating")
    setNote("")
    setVisibility("public")
    setLinkedIn("")
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      resetForm()
      setSubmitted(false)
    }, 200)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
        {submitted ? (
          /* ── Success State ── */
          <>
            <div className="py-8 text-center space-y-6">
              {/* Success icon */}
              <div className="flex justify-center">
                <div className="bg-accent/10 rounded-full p-4">
                  <CheckCircle2 className="h-10 w-10 text-accent" />
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold">Interest Registered</h2>
                <p className="text-sm text-muted-foreground">
                  You're on the list. Here's what happens from here.
                </p>
              </div>

              {/* Coaching steps */}
              <div className="space-y-4 text-left bg-secondary/50 rounded-lg p-5">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="bg-accent/10 rounded-full p-1.5">
                      <Bell className="h-4 w-4 text-accent" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Builders get notified</p>
                    <p className="text-xs text-muted-foreground">
                      Founders working on this will see that an investor is interested
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="bg-accent/10 rounded-full p-1.5">
                      <Handshake className="h-4 w-4 text-accent" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-sm">We'll make introductions</p>
                    <p className="text-xs text-muted-foreground">
                      When there's mutual fit, we'll connect you directly
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="bg-accent/10 rounded-full p-1.5">
                      <ShieldCheck className="h-4 w-4 text-accent" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-sm">No commitment</p>
                    <p className="text-xs text-muted-foreground">
                      This is exploratory — you can withdraw anytime
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="pt-0">
              <Button onClick={handleClose} className="w-full" size="sm">Done</Button>
            </DialogFooter>
          </>
        ) : (
          /* ── Form State ── */
          <>
            <DialogHeader className="pb-2">
              <DialogTitle className="flex items-center gap-2 text-xl">
                <span>📫</span> Get Connected to Builders
              </DialogTitle>
              <DialogDescription className="text-sm">
                We'll introduce you to founders tackling this problem when they're ready. No commitment required.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-2">
              {/* Investment Focus */}
              <div className="space-y-2.5">
                <Label className="text-sm font-medium">What type of opportunities interest you?</Label>
                <RadioGroup value={focus} onValueChange={(value) => setFocus(value as InvestmentFocus)}>
                  {focusOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-start space-x-3 space-y-0 rounded-lg border p-3 hover:bg-accent/5 transition-colors"
                    >
                      <RadioGroupItem value={option.value} id={`focus-${option.value}`} className="mt-0.5" />
                      <div className="flex-1">
                        <Label htmlFor={`focus-${option.value}`} className="font-medium cursor-pointer text-sm">
                          {option.label}
                        </Label>
                        <p className="text-xs text-muted-foreground">{option.description}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Engagement Level */}
              <div className="space-y-2.5">
                <Label className="text-sm font-medium">How involved would you like to be?</Label>
                <RadioGroup value={engagementLevel} onValueChange={(value) => setEngagementLevel(value as EngagementLevel)}>
                  {engagementOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-start space-x-3 space-y-0 rounded-lg border p-3 hover:bg-accent/5 transition-colors"
                    >
                      <RadioGroupItem value={option.value} id={`engagement-${option.value}`} className="mt-0.5" />
                      <div className="flex-1">
                        <Label htmlFor={`engagement-${option.value}`} className="font-medium cursor-pointer text-sm">
                          {option.label}
                        </Label>
                        <p className="text-xs text-muted-foreground">{option.description}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Optional Note */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="invest-note" className="text-sm font-medium">
                    Anything specific you're looking for? <span className="text-muted-foreground font-normal">(optional)</span>
                  </Label>
                  <span className="text-xs text-muted-foreground">{note.length}/280</span>
                </div>
                <Textarea
                  id="invest-note"
                  placeholder='e.g., "Especially interested in technical founders" or "Would love to see customer traction"'
                  value={note}
                  onChange={(e) => {
                    if (e.target.value.length <= 280) setNote(e.target.value)
                  }}
                  className="min-h-[60px] resize-none"
                />
              </div>

              {/* Visibility - Radio style consistent with BuildModal */}
              <div className="space-y-2.5">
                <Label className="text-sm font-medium">How should you appear to builders?</Label>
                <div className="grid gap-2">
                  {/* Public option */}
                  <button
                    type="button"
                    onClick={() => setVisibility("public")}
                    aria-pressed={visibility === "public"}
                    className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-all ${
                      visibility === "public"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                      visibility === "public" ? "border-primary bg-primary" : "border-muted-foreground"
                    }`}>
                      {visibility === "public" && (
                        <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                      )}
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <div className="text-sm font-medium">Share my profile</div>
                      <p className="text-xs text-muted-foreground">
                        Your name and background are visible to builders on this problem
                      </p>
                    </div>
                  </button>

                  {/* Anonymous option */}
                  <button
                    type="button"
                    onClick={() => setVisibility("private")}
                    aria-pressed={visibility === "private"}
                    className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-all ${
                      visibility === "private"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                      visibility === "private" ? "border-primary bg-primary" : "border-muted-foreground"
                    }`}>
                      {visibility === "private" && (
                        <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                      )}
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <div className="text-sm font-medium">Stay anonymous for now</div>
                      <p className="text-xs text-muted-foreground">
                        Builders see "An investor is interested" until you reach out
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* LinkedIn - optional but recommended */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Help builders learn about you</Label>
                  <span className="text-xs text-muted-foreground">Recommended</span>
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <Input
                    placeholder="linkedin.com/in/yourname"
                    value={linkedIn}
                    onChange={(e) => setLinkedIn(e.target.value)}
                    className="pl-10 h-9"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Having a profile helps builders take your interest seriously.
                </p>
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button variant="ghost" onClick={handleClose} size="sm">
                Cancel
              </Button>
              <Button onClick={handleSubmit} size="sm">Express Interest</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

// Build Modal - Enhanced accelerator-style application
interface BuildModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: {
    status: BuildStatus
    stage: BuildStage
    visibility: Visibility
    lookingFor: LookingFor[]
    projectLink: string
    description: string
    whyYou: string
    progressSoFar?: string
    linkedIn?: string
    twitter?: string
    website?: string
    raisingStage?: RaisingStage
  }) => void
  isAuthenticated?: boolean
  onAuthRequired?: (data: BuildFormData) => void
}

export function BuildModal({ isOpen, onClose, onSubmit, isAuthenticated = true, onAuthRequired }: BuildModalProps) {
  // Core fields
  const [stage, setStage] = useState<BuildStage>("idea")
  const [lookingFor, setLookingFor] = useState<LookingFor[]>([])
  const [projectLink, setProjectLink] = useState("")
  const [visibility, setVisibility] = useState<Visibility>("public")
  const [description, setDescription] = useState("")

  // Enhanced fields
  const [whyYou, setWhyYou] = useState("")
  const [progressSoFar, setProgressSoFar] = useState("")
  const [linkedIn, setLinkedIn] = useState("")
  const [twitter, setTwitter] = useState("")
  const [website, setWebsite] = useState("")
  const [showWebsite, setShowWebsite] = useState(false)
  const [raisingStage, setRaisingStage] = useState<RaisingStage | undefined>(undefined)

  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({})

  const stageOptions: { value: BuildStage; label: string }[] = [
    { value: "idea", label: "Idea" },
    { value: "research", label: "Research" },
    { value: "building", label: "Building" },
    { value: "launched", label: "Launched" },
  ]

  const lookingForOptions: { id: LookingFor; label: string }[] = [
    { id: "feedback", label: "Feedback" },
    { id: "early-users", label: "Early users" },
    { id: "domain-experts", label: "Domain experts" },
    { id: "cofounders", label: "Co-founders" },
    { id: "investment", label: "Investment" },
  ]

  const raisingStageOptions: { value: RaisingStage; label: string }[] = [
    { value: "small-checks", label: "Small checks ($1K–$10K)" },
    { value: "angel", label: "Angel ($10K–$100K)" },
    { value: "vc", label: "VC ($100K+)" },
    { value: "not-sure", label: "Not sure yet" },
  ]

  // Dynamic placeholders based on stage
  const whyYouPlaceholder = stage === "idea"
    ? "What sparked your interest? Why does this matter to you?"
    : "What insight or experience gives you a unique perspective on this problem?"

  const descriptionPlaceholder = {
    idea: "What's your hypothesis or initial approach?",
    research: "What are you learning? What direction are you heading?",
    building: "What are you building? What makes it different?",
    launched: "What's your solution? How does it work?",
  }[stage]

  // Conditional rendering flags
  const showProgressField = stage !== "idea"
  const showRaisingStage = lookingFor.includes("investment")
  const projectLinkRequired = stage === "building" || stage === "launched"

  const toggleLookingFor = (option: LookingFor) => {
    setLookingFor((prev) => {
      const newValue = prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
      // Clear raising stage if investment is deselected
      if (option === "investment" && prev.includes("investment")) {
        setRaisingStage(undefined)
      }
      return newValue
    })
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (whyYou.trim().length < 20) {
      newErrors.whyYou = "Please share a bit more (min 20 characters)"
    }

    if (projectLinkRequired && !projectLink.trim()) {
      newErrors.projectLink = "Project link is required at this stage"
    }

    if (showRaisingStage && !raisingStage) {
      newErrors.raisingStage = "Please select what stage you're raising"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return

    const status: BuildStatus = stage === "idea" || stage === "research" ? "exploring" : "active"
    const formData = {
      status,
      stage,
      visibility,
      lookingFor,
      projectLink,
      description,
      whyYou,
      progressSoFar: showProgressField ? progressSoFar : undefined,
      linkedIn: linkedIn || undefined,
      twitter: twitter || undefined,
      website: website || undefined,
      raisingStage: showRaisingStage ? raisingStage : undefined,
    }

    // Check auth on submit, not on open
    if (!isAuthenticated && onAuthRequired) {
      onAuthRequired(formData)
      onClose()
      return
    }

    onSubmit(formData)
    onClose()
    resetForm()
  }

  const resetForm = () => {
    setStage("idea")
    setLookingFor([])
    setProjectLink("")
    setVisibility("public")
    setDescription("")
    setWhyYou("")
    setProgressSoFar("")
    setLinkedIn("")
    setTwitter("")
    setWebsite("")
    setShowWebsite(false)
    setRaisingStage(undefined)
    setErrors({})
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-2">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <span>🛠️</span> I'm Working on This
          </DialogTitle>
          <DialogDescription className="text-sm">
            Your profile will be shared with investors and collaborators interested in this problem space.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Stage selector */}
          <div className="space-y-2.5">
            <Label className="text-sm font-medium">What stage are you at?</Label>
            <div className="grid grid-cols-4 gap-1.5">
              {stageOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={stage === option.value}
                  onClick={() => setStage(option.value)}
                  className={`px-2 py-2.5 rounded-md border text-center transition-all ${
                    stage === option.value
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border hover:border-primary/50 hover:bg-accent/50"
                  }`}
                >
                  <div className="font-medium text-xs">{option.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Why You - Intent filter question */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="why-you" className="text-sm font-medium">
                What draws you to this problem? <span className="text-destructive">*</span>
              </Label>
              <span className="text-xs text-muted-foreground">{whyYou.length}/500</span>
            </div>
            <Textarea
              id="why-you"
              placeholder={whyYouPlaceholder}
              value={whyYou}
              onChange={(e) => {
                if (e.target.value.length <= 500) {
                  setWhyYou(e.target.value)
                  if (errors.whyYou) setErrors((prev) => ({ ...prev, whyYou: "" }))
                }
              }}
              className={`min-h-[80px] resize-none ${errors.whyYou ? "border-destructive" : ""}`}
            />
            {errors.whyYou && <p className="text-xs text-destructive">{errors.whyYou}</p>}
          </div>

          {/* Progress - Conditional on stage */}
          {showProgressField && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-between">
                <Label htmlFor="progress" className="text-sm font-medium">
                  What have you accomplished so far?
                </Label>
                <span className="text-xs text-muted-foreground">{progressSoFar.length}/280</span>
              </div>
              <Textarea
                id="progress"
                placeholder="e.g., '15 user interviews, MVP wireframes, 50 waitlist signups'"
                value={progressSoFar}
                onChange={(e) => {
                  if (e.target.value.length <= 280) setProgressSoFar(e.target.value)
                }}
                className="min-h-[60px] resize-none"
              />
            </div>
          )}

          {/* Looking for - chips */}
          <div className="space-y-2.5">
            <Label className="text-sm font-medium">What are you looking for?</Label>
            <div className="flex flex-wrap gap-2">
              {lookingForOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={lookingFor.includes(option.id)}
                  onClick={() => toggleLookingFor(option.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    lookingFor.includes(option.id)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80 text-muted-foreground"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Raising Stage - Conditional on Investment selected */}
          {showRaisingStage && (
            <div className="space-y-2.5 animate-in fade-in slide-in-from-top-2 duration-300">
              <Label className="text-sm font-medium">
                What stage are you raising? <span className="text-destructive">*</span>
              </Label>
              <div className="flex flex-wrap gap-2">
                {raisingStageOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={raisingStage === option.value}
                    onClick={() => {
                      setRaisingStage(option.value)
                      if (errors.raisingStage) setErrors((prev) => ({ ...prev, raisingStage: "" }))
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      raisingStage === option.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80 text-muted-foreground"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {errors.raisingStage && <p className="text-xs text-destructive">{errors.raisingStage}</p>}
            </div>
          )}

          {/* Social Links Section */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Help others learn about you</Label>
              <span className="text-xs text-muted-foreground">Recommended</span>
            </div>

            {/* LinkedIn */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <Input
                placeholder="linkedin.com/in/yourname"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
                className="pl-10 h-9"
              />
            </div>

            {/* Twitter */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <Input
                placeholder="@yourhandle"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                className="pl-10 h-9"
              />
            </div>

            {/* Website toggle */}
            <button
              type="button"
              aria-expanded={showWebsite}
              onClick={() => setShowWebsite(!showWebsite)}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {showWebsite ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              {showWebsite ? "Hide" : "Add"} personal/company website
            </button>
            {showWebsite && (
              <div className="relative animate-in fade-in slide-in-from-top-2 duration-300">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="https://yoursite.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="pl-10 h-9"
                />
              </div>
            )}
          </div>

          {/* Project link */}
          <div className="space-y-2">
            <Label htmlFor="project-link" className="text-sm font-medium">
              Project link {projectLinkRequired && <span className="text-destructive">*</span>}
            </Label>
            <Input
              id="project-link"
              type="url"
              placeholder={projectLinkRequired ? "https://yourproject.com" : "https://... (optional)"}
              value={projectLink}
              onChange={(e) => {
                setProjectLink(e.target.value)
                if (errors.projectLink) setErrors((prev) => ({ ...prev, projectLink: "" }))
              }}
              className={`h-9 ${errors.projectLink ? "border-destructive" : ""}`}
            />
            {errors.projectLink && <p className="text-xs text-destructive">{errors.projectLink}</p>}
          </div>

          {/* Brief description */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="description" className="text-sm font-medium">Brief description of your approach</Label>
              <span className="text-xs text-muted-foreground">{description.length}/500</span>
            </div>
            <Textarea
              id="description"
              placeholder={descriptionPlaceholder}
              value={description}
              onChange={(e) => {
                if (e.target.value.length <= 500) setDescription(e.target.value)
              }}
              className="min-h-[72px] resize-none"
            />
          </div>

          {/* Visibility choice */}
          <div className="space-y-2.5">
            <Label className="text-sm font-medium">How should you appear on the problem page?</Label>
            <div className="grid gap-2">
              {/* Public option */}
              <button
                type="button"
                onClick={() => setVisibility("public")}
                aria-pressed={visibility === "public"}
                className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-all ${
                  visibility === "public"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                  visibility === "public" ? "border-primary bg-primary" : "border-muted-foreground"
                }`}>
                  {visibility === "public" && (
                    <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                  )}
                </div>
                <div className="flex-1 space-y-0.5">
                  <div className="text-sm font-medium">Show my name</div>
                  <p className="text-xs text-muted-foreground">
                    Your name and profile appear publicly under "Building this"
                  </p>
                </div>
              </button>

              {/* Anonymous option */}
              <button
                type="button"
                onClick={() => setVisibility("private")}
                aria-pressed={visibility === "private"}
                className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-all ${
                  visibility === "private"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                  visibility === "private" ? "border-primary bg-primary" : "border-muted-foreground"
                }`}>
                  {visibility === "private" && (
                    <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                  )}
                </div>
                <div className="flex-1 space-y-0.5">
                  <div className="text-sm font-medium">Stay anonymous publicly</div>
                  <p className="text-xs text-muted-foreground">
                    You appear as "Anonymous" on the page, but the problem author and interested investors can still see your profile
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Reassurance note */}
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Either way:</span> Your full profile is shared with the problem author and investors interested in this space — that's how connections happen.
            </p>
          </div>
        </div>

        <DialogFooter className="pt-2">
          <Button variant="ghost" onClick={onClose} size="sm">
            Cancel
          </Button>
          <Button onClick={handleSubmit} size="sm">Submit Application</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Join Team Modal - Enhanced with social proof
interface JoinTeamModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { roleInterest: RoleInterest; skills: string[]; intro: string; linkedIn?: string; twitter?: string; portfolio?: string }) => void
  isAuthenticated?: boolean
  onAuthRequired?: (data: JoinTeamFormData) => void
}

export function JoinTeamModal({ isOpen, onClose, onSubmit, isAuthenticated = true, onAuthRequired }: JoinTeamModalProps) {
  const [roleInterest, setRoleInterest] = useState<RoleInterest>("cofounder")
  const [skills, setSkills] = useState<string[]>([])
  const [intro, setIntro] = useState("")

  // Social proof fields
  const [linkedIn, setLinkedIn] = useState("")
  const [twitter, setTwitter] = useState("")
  const [portfolio, setPortfolio] = useState("")
  const [showPortfolio, setShowPortfolio] = useState(false)

  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({})

  const skillOptions = [
    { id: "technical", label: "Technical" },
    { id: "business", label: "Business" },
    { id: "domain", label: "Domain expertise" },
    { id: "connections", label: "Connections" },
    { id: "other", label: "Other" },
  ]

  const toggleSkill = (skillId: string) => {
    setSkills((prev) => (prev.includes(skillId) ? prev.filter((s) => s !== skillId) : [...prev, skillId]))
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (intro.trim().length < 10) {
      newErrors.intro = "Please share a bit more (min 10 characters)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return

    const formData = {
      roleInterest,
      skills,
      intro,
      linkedIn: linkedIn || undefined,
      twitter: twitter || undefined,
      portfolio: portfolio || undefined,
    }

    // Check auth on submit, not on open
    if (!isAuthenticated && onAuthRequired) {
      onAuthRequired(formData)
      onClose()
      return
    }

    onSubmit(formData)
    onClose()
    resetForm()
  }

  const resetForm = () => {
    setRoleInterest("cofounder")
    setSkills([])
    setIntro("")
    setLinkedIn("")
    setTwitter("")
    setPortfolio("")
    setShowPortfolio(false)
    setErrors({})
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-2">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <span>🙋</span> Join This Project
          </DialogTitle>
          <DialogDescription className="text-sm">
            Your application will be sent directly to the problem author.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Role Interest */}
          <div className="space-y-2.5">
            <Label className="text-sm font-medium">How would you like to contribute?</Label>
            <RadioGroup value={roleInterest} onValueChange={(value) => setRoleInterest(value as RoleInterest)}>
              <div className="flex items-start space-x-3 space-y-0 rounded-lg border p-3 hover:bg-accent/5 transition-colors">
                <RadioGroupItem value="cofounder" id="jt-cofounder" className="mt-0.5" />
                <div className="flex-1">
                  <Label htmlFor="jt-cofounder" className="font-medium cursor-pointer text-sm">
                    Co-founder / Founding team
                  </Label>
                  <p className="text-xs text-muted-foreground">I want to be a core part of building this</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 space-y-0 rounded-lg border p-3 hover:bg-accent/5 transition-colors">
                <RadioGroupItem value="fulltime" id="jt-fulltime" className="mt-0.5" />
                <div className="flex-1">
                  <Label htmlFor="jt-fulltime" className="font-medium cursor-pointer text-sm">
                    Full-time opportunity
                  </Label>
                  <p className="text-xs text-muted-foreground">Open to joining as an early employee</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 space-y-0 rounded-lg border p-3 hover:bg-accent/5 transition-colors">
                <RadioGroupItem value="parttime" id="jt-parttime" className="mt-0.5" />
                <div className="flex-1">
                  <Label htmlFor="jt-parttime" className="font-medium cursor-pointer text-sm">
                    Part-time / Advisor
                  </Label>
                  <p className="text-xs text-muted-foreground">I can contribute some hours weekly</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 space-y-0 rounded-lg border p-3 hover:bg-accent/5 transition-colors">
                <RadioGroupItem value="volunteer" id="jt-volunteer" className="mt-0.5" />
                <div className="flex-1">
                  <Label htmlFor="jt-volunteer" className="font-medium cursor-pointer text-sm">
                    Volunteer
                  </Label>
                  <p className="text-xs text-muted-foreground">Happy to help in my spare time</p>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Skills - Chip style like BuildModal */}
          <div className="space-y-2.5">
            <Label className="text-sm font-medium">What do you bring to the table?</Label>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={skills.includes(option.id)}
                  onClick={() => toggleSkill(option.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    skills.includes(option.id)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80 text-muted-foreground"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Brief Intro */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="jt-intro" className="text-sm font-medium">
                Why are you excited about this problem? <span className="text-destructive">*</span>
              </Label>
              <span className="text-xs text-muted-foreground">{intro.length}/500</span>
            </div>
            <Textarea
              id="jt-intro"
              placeholder="What draws you to this problem? What relevant experience or perspective do you bring?"
              value={intro}
              onChange={(e) => {
                if (e.target.value.length <= 500) {
                  setIntro(e.target.value)
                  if (errors.intro) setErrors((prev) => ({ ...prev, intro: "" }))
                }
              }}
              className={`min-h-[80px] resize-none ${errors.intro ? "border-destructive" : ""}`}
            />
            {errors.intro && <p className="text-xs text-destructive">{errors.intro}</p>}
          </div>

          {/* Social Links Section */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Help the author learn about you</Label>
              <span className="text-xs text-muted-foreground">Recommended</span>
            </div>

            {/* LinkedIn */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <Input
                placeholder="linkedin.com/in/yourname"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
                className="pl-10 h-9"
              />
            </div>

            {/* Twitter */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <Input
                placeholder="@yourhandle"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                className="pl-10 h-9"
              />
            </div>

            {/* Portfolio toggle */}
            <button
              type="button"
              aria-expanded={showPortfolio}
              onClick={() => setShowPortfolio(!showPortfolio)}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {showPortfolio ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              {showPortfolio ? "Hide" : "Add"} portfolio / resume link
            </button>
            {showPortfolio && (
              <div className="relative animate-in fade-in slide-in-from-top-2 duration-300">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="https://yourportfolio.com or resume link"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  className="pl-10 h-9"
                />
              </div>
            )}
          </div>

          {/* Value proposition note */}
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Why profiles matter:</span> Applications with verified profiles get priority responses. The author will review your background to find the right fit.
            </p>
          </div>
        </div>

        <DialogFooter className="pt-2">
          <Button variant="ghost" onClick={onClose} size="sm">
            Cancel
          </Button>
          <Button onClick={handleSubmit} size="sm">
            Send Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
