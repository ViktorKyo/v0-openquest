"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import type { InvestmentTier, BuildStatus, Visibility, RoleInterest } from "@/types/engagement"

// Investment Modal
interface InvestModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { tier: InvestmentTier; note: string; isPublic: boolean }) => void
}

export function InvestModal({ isOpen, onClose, onSubmit }: InvestModalProps) {
  const [tier, setTier] = useState<InvestmentTier>("angel")
  const [note, setNote] = useState("")
  const [isPublic, setIsPublic] = useState(true)

  const handleSubmit = () => {
    onSubmit({ tier, note, isPublic })
    onClose()
    // Reset form
    setTier("angel")
    setNote("")
    setIsPublic(true)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>💰</span> Express Investment Interest
          </DialogTitle>
          <DialogDescription>Let the author know you're interested in investing in a solution to this problem.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label>What's your typical check size?</Label>
            <RadioGroup value={tier} onValueChange={(value) => setTier(value as InvestmentTier)}>
              <div className="flex items-start space-x-3 space-y-0 rounded-lg border p-4 hover:bg-accent/5 transition-colors">
                <RadioGroupItem value="scout" id="scout" />
                <div className="flex-1">
                  <Label htmlFor="scout" className="font-medium cursor-pointer">
                    Scout / Small checks
                  </Label>
                  <p className="text-sm text-muted-foreground">$1K - $10K</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 space-y-0 rounded-lg border p-4 hover:bg-accent/5 transition-colors">
                <RadioGroupItem value="angel" id="angel" />
                <div className="flex-1">
                  <Label htmlFor="angel" className="font-medium cursor-pointer">
                    Angel investor
                  </Label>
                  <p className="text-sm text-muted-foreground">$10K - $100K</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 space-y-0 rounded-lg border p-4 hover:bg-accent/5 transition-colors">
                <RadioGroupItem value="institutional" id="institutional" />
                <div className="flex-1">
                  <Label htmlFor="institutional" className="font-medium cursor-pointer">
                    Institutional / Fund
                  </Label>
                  <p className="text-sm text-muted-foreground">$100K+</p>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Add a note (optional)</Label>
            <Textarea
              id="note"
              placeholder='e.g., "Interested if you have paying customers"'
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-20"
            />
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox id="public" checked={isPublic} onCheckedChange={(checked) => setIsPublic(checked as boolean)} />
            <div className="space-y-1 leading-none">
              <Label htmlFor="public" className="cursor-pointer font-normal">
                Share my interest publicly
              </Label>
              <p className="text-sm text-muted-foreground">Your name will appear as a potential investor</p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Express Interest</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Build Modal
interface BuildModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { status: BuildStatus; visibility: Visibility; description: string }) => void
}

export function BuildModal({ isOpen, onClose, onSubmit }: BuildModalProps) {
  const [status, setStatus] = useState<BuildStatus>("active")
  const [visibility, setVisibility] = useState<Visibility>("public")
  const [description, setDescription] = useState("")

  const handleSubmit = () => {
    onSubmit({ status, visibility, description })
    onClose()
    // Reset form
    setStatus("active")
    setVisibility("public")
    setDescription("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>🛠️</span> Claim This Problem
          </DialogTitle>
          <DialogDescription>Let others know you're working on a solution to this problem.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label>Are you working on a solution to this problem?</Label>
            <RadioGroup value={status} onValueChange={(value) => setStatus(value as BuildStatus)}>
              <div className="flex items-start space-x-3 space-y-0 rounded-lg border p-4 hover:bg-accent/5 transition-colors">
                <RadioGroupItem value="active" id="active" />
                <div className="flex-1">
                  <Label htmlFor="active" className="font-medium cursor-pointer">
                    Yes, I'm actively building this
                  </Label>
                  <p className="text-sm text-muted-foreground">I'm working on this problem right now</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 space-y-0 rounded-lg border p-4 hover:bg-accent/5 transition-colors">
                <RadioGroupItem value="exploring" id="exploring" />
                <div className="flex-1">
                  <Label htmlFor="exploring" className="font-medium cursor-pointer">
                    I'm exploring / researching
                  </Label>
                  <p className="text-sm text-muted-foreground">Thinking about it, doing discovery</p>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Visibility</Label>
            <RadioGroup value={visibility} onValueChange={(value) => setVisibility(value as Visibility)}>
              <div className="flex items-start space-x-3 space-y-0 rounded-lg border p-4 hover:bg-accent/5 transition-colors">
                <RadioGroupItem value="public" id="public-vis" />
                <div className="flex-1">
                  <Label htmlFor="public-vis" className="font-medium cursor-pointer">
                    Public
                  </Label>
                  <p className="text-sm text-muted-foreground">Your name appears as a builder</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 space-y-0 rounded-lg border p-4 hover:bg-accent/5 transition-colors">
                <RadioGroupItem value="private" id="private-vis" />
                <div className="flex-1">
                  <Label htmlFor="private-vis" className="font-medium cursor-pointer">
                    Private
                  </Label>
                  <p className="text-sm text-muted-foreground">Counted anonymously ("X people building")</p>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">What are you building? (optional)</Label>
            <Textarea
              id="description"
              placeholder="Share a link or brief description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-20"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Claim Problem</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Join Team Modal
interface JoinTeamModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { roleInterest: RoleInterest; skills: string[]; intro: string }) => void
}

export function JoinTeamModal({ isOpen, onClose, onSubmit }: JoinTeamModalProps) {
  const [roleInterest, setRoleInterest] = useState<RoleInterest>("cofounder")
  const [skills, setSkills] = useState<string[]>([])
  const [intro, setIntro] = useState("")

  const skillOptions = [
    { id: "technical", label: "Technical skills (engineering, design)" },
    { id: "business", label: "Business skills (sales, marketing, ops)" },
    { id: "domain", label: "Domain expertise" },
    { id: "connections", label: "Industry connections" },
    { id: "other", label: "Other" },
  ]

  const toggleSkill = (skillId: string) => {
    setSkills((prev) => (prev.includes(skillId) ? prev.filter((s) => s !== skillId) : [...prev, skillId]))
  }

  const handleSubmit = () => {
    if (!intro.trim()) return
    onSubmit({ roleInterest, skills, intro })
    onClose()
    // Reset form
    setRoleInterest("cofounder")
    setSkills([])
    setIntro("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>🙋</span> Join This Project
          </DialogTitle>
          <DialogDescription>Express your interest in contributing to solving this problem.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label>How would you like to contribute?</Label>
            <RadioGroup value={roleInterest} onValueChange={(value) => setRoleInterest(value as RoleInterest)}>
              <div className="flex items-start space-x-3 space-y-0 rounded-lg border p-4 hover:bg-accent/5 transition-colors">
                <RadioGroupItem value="cofounder" id="cofounder" />
                <div className="flex-1">
                  <Label htmlFor="cofounder" className="font-medium cursor-pointer">
                    Co-founder / Founding team
                  </Label>
                  <p className="text-sm text-muted-foreground">I want to be a core part of building this</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 space-y-0 rounded-lg border p-4 hover:bg-accent/5 transition-colors">
                <RadioGroupItem value="fulltime" id="fulltime" />
                <div className="flex-1">
                  <Label htmlFor="fulltime" className="font-medium cursor-pointer">
                    Full-time opportunity
                  </Label>
                  <p className="text-sm text-muted-foreground">Open to joining as an early employee</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 space-y-0 rounded-lg border p-4 hover:bg-accent/5 transition-colors">
                <RadioGroupItem value="parttime" id="parttime" />
                <div className="flex-1">
                  <Label htmlFor="parttime" className="font-medium cursor-pointer">
                    Part-time / Advisor
                  </Label>
                  <p className="text-sm text-muted-foreground">I can contribute some hours weekly</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 space-y-0 rounded-lg border p-4 hover:bg-accent/5 transition-colors">
                <RadioGroupItem value="volunteer" id="volunteer-role" />
                <div className="flex-1">
                  <Label htmlFor="volunteer-role" className="font-medium cursor-pointer">
                    Volunteer
                  </Label>
                  <p className="text-sm text-muted-foreground">Happy to help in my spare time</p>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>What do you bring to the table?</Label>
            <div className="space-y-2">
              {skillOptions.map((option) => (
                <div key={option.id} className="flex items-start space-x-3">
                  <Checkbox
                    id={option.id}
                    checked={skills.includes(option.id)}
                    onCheckedChange={() => toggleSkill(option.id)}
                  />
                  <Label htmlFor={option.id} className="cursor-pointer font-normal">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="intro">
              Brief intro <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="intro"
              placeholder="Why are you excited about this problem?"
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              className="min-h-24"
              required
            />
          </div>

          <div className="rounded-lg border border-border/50 bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">
              📎 Your application will be sent directly to the problem author. They'll reach out if there's a fit.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!intro.trim()}>
            Send Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
