"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Loader2, Settings, Bookmark } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Header } from "@/components/header"
import { ProblemCard } from "@/components/problem-card"
import { cn } from "@/lib/utils"

type Tab = "settings" | "saved"

interface SavedProblem {
  id: string
  title: string
  description: string
  category: string
  upvotes: number
  comments: number
  author: {
    name: string
    avatar: string
    isYC?: boolean
    isWeekendFund?: boolean
  }
  timeAgo: string
  categoryColor: string
  involvement?: "want-build" | "already-building" | "just-sharing" | "want-to-work"
  wantBuildBlocker?: Array<"need-capital" | "need-cofounder">
  wantToWorkInvolvement?: Array<"volunteer" | "full-time">
  alreadyBuildingSupport?: Array<"awareness" | "founding-team" | "cofounder" | "capital">
  isAnonymous?: boolean
}

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading: authLoading, refreshSession } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [activeTab, setActiveTab] = useState<Tab>("settings")
  const [name, setName] = useState("")
  const [headline, setHeadline] = useState("")
  const [bio, setBio] = useState("")
  const [location, setLocation] = useState("")
  const [timezone, setTimezone] = useState("")
  const [linkedinUrl, setLinkedinUrl] = useState("")
  const [twitterUrl, setTwitterUrl] = useState("")
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [profileVisibilityDefault, setProfileVisibilityDefault] = useState<"public" | "private">("public")
  const [profileCompletionScore, setProfileCompletionScore] = useState(0)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
  const [showOnboardingBanner, setShowOnboardingBanner] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [profileLoading, setProfileLoading] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [profileSuccess, setProfileSuccess] = useState("")
  const [profileError, setProfileError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState("")
  const [passwordError, setPasswordError] = useState("")

  // Saved problems state
  const [savedProblems, setSavedProblems] = useState<SavedProblem[]>([])
  const [savedLoading, setSavedLoading] = useState(false)
  const [savedProblemIds, setSavedProblemIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login?returnUrl=/profile")
    }
  }, [authLoading, isAuthenticated, router])

  // Fetch saved problems when tab changes to "saved"
  useEffect(() => {
    if (activeTab === "saved" && isAuthenticated) {
      fetchSavedProblems()
    }
  }, [activeTab, isAuthenticated])

  const fetchSavedProblems = async () => {
    setSavedLoading(true)
    try {
      const res = await fetch("/api/user/saved-problems")
      if (res.ok) {
        const data = await res.json()
        setSavedProblems(data.problems || [])
        setSavedProblemIds(new Set(data.problems?.map((p: SavedProblem) => p.id) || []))
      }
    } catch (error) {
      console.error("Error fetching saved problems:", error)
    } finally {
      setSavedLoading(false)
    }
  }

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/user/profile", { cache: "no-store" })
      if (!response.ok) {
        return
      }

      const data = await response.json()
      setName(data.name || "")
      setHeadline(data.headline || "")
      setBio(data.bio || "")
      setLocation(data.location || "")
      setTimezone(data.timezone || "")
      setLinkedinUrl(data.linkedinUrl || "")
      setTwitterUrl(data.twitterUrl || "")
      setWebsiteUrl(data.websiteUrl || "")
      setProfileVisibilityDefault(data.profileVisibilityDefault === "private" ? "private" : "public")
      setProfileCompletionScore(data.profileCompletionScore || 0)
      setHasCompletedOnboarding(Boolean(data.hasCompletedOnboarding))
    } catch (error) {
      console.error("Error fetching profile:", error)
    }
  }

  const handleToggleSave = async (problemId: string) => {
    // Optimistic update
    const wasSaved = savedProblemIds.has(problemId)
    setSavedProblemIds((prev) => {
      const newSet = new Set(prev)
      if (wasSaved) {
        newSet.delete(problemId)
      } else {
        newSet.add(problemId)
      }
      return newSet
    })

    if (wasSaved) {
      setSavedProblems((prev) => prev.filter((p) => p.id !== problemId))
    }

    try {
      const res = await fetch(`/api/problems/${problemId}/save`, { method: "POST" })
      if (!res.ok) {
        throw new Error("Failed to toggle save")
      }
    } catch (error) {
      // Rollback on error
      setSavedProblemIds((prev) => {
        const newSet = new Set(prev)
        if (wasSaved) {
          newSet.add(problemId)
        } else {
          newSet.delete(problemId)
        }
        return newSet
      })
      // Refetch to restore state
      fetchSavedProblems()
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile()
    }
  }, [isAuthenticated])

  useEffect(() => {
    const onboarding = searchParams.get("onboarding")
    if (onboarding === "1") {
      setShowOnboardingBanner(true)
    }
  }, [searchParams])

  const getInitials = (name: string | null) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setProfileError("")
    setProfileSuccess("")
    setProfileLoading(true)

    try {
      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          headline: headline.trim() || null,
          bio: bio.trim() || null,
          location: location.trim() || null,
          timezone: timezone.trim() || null,
          linkedinUrl: linkedinUrl.trim() || null,
          twitterUrl: twitterUrl.trim() || null,
          websiteUrl: websiteUrl.trim() || null,
          profileVisibilityDefault,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update profile")
      }

      setProfileSuccess("Profile updated successfully")
      setShowOnboardingBanner(false)
      setHasCompletedOnboarding(true)
      await refreshSession()
      await fetchProfile()
    } catch (err) {
      if (err instanceof Error) {
        setProfileError(err.message)
      } else {
        setProfileError("Failed to update profile")
      }
    } finally {
      setProfileLoading(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError("")
    setPasswordSuccess("")

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match")
      return
    }

    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters")
      return
    }

    setPasswordLoading(true)

    try {
      const response = await fetch("/api/user/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to change password")
      }

      setPasswordSuccess("Password changed successfully")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err) {
      if (err instanceof Error) {
        setPasswordError(err.message)
      } else {
        setPasswordError("Failed to change password")
      }
    } finally {
      setPasswordLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Back button */}
          <Link
            href="/feed"
            className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to feed
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatarUrl || undefined} alt={user.name || "User"} />
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{user.name || "User"}</h1>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>

            {showOnboardingBanner && !hasCompletedOnboarding && (
              <div className="mb-6 rounded-xl border border-accent/30 bg-accent/5 p-4">
                <h2 className="font-semibold text-sm">Finish your profile setup</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Add a headline and short bio so builders and investors can trust who they connect with.
                </p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-xs text-muted-foreground">Completion: {profileCompletionScore}%</span>
                  <button
                    type="button"
                    className="text-xs text-primary hover:underline"
                    onClick={() => {
                      setShowOnboardingBanner(false)
                      const returnUrl = searchParams.get("returnUrl")
                      if (returnUrl && returnUrl.startsWith("/") && !returnUrl.startsWith("//")) {
                        router.push(returnUrl)
                      }
                    }}
                  >
                    Skip for now
                  </button>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="flex gap-1 mb-6 border-b border-border/50">
              <button
                onClick={() => setActiveTab("settings")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
                  activeTab === "settings"
                    ? "border-accent text-accent"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <Settings className="h-4 w-4" />
                Settings
              </button>
              <button
                onClick={() => setActiveTab("saved")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
                  activeTab === "saved"
                    ? "border-accent text-accent"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <Bookmark className="h-4 w-4" />
                Saved
                {savedProblemIds.size > 0 && (
                  <span className="ml-1 bg-accent/10 text-accent px-1.5 py-0.5 rounded text-xs">
                    {savedProblemIds.size}
                  </span>
                )}
              </button>
            </div>

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <>
                {/* Profile Form */}
            <div className="bg-card border border-border/50 rounded-2xl p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
              <div className="mb-5">
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-accent transition-all" style={{ width: `${profileCompletionScore}%` }} />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Profile completion: {profileCompletionScore}%</p>
              </div>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="headline">Headline</Label>
                  <Input
                    id="headline"
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="e.g. Founder building in climate AI"
                    maxLength={120}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Short intro (max 500 chars)"
                    maxLength={500}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="City, Country"
                      maxLength={120}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input
                      id="timezone"
                      type="text"
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      placeholder="e.g. UTC+1"
                      maxLength={64}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                  <Input
                    id="linkedinUrl"
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/you"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitterUrl">X/Twitter URL</Label>
                  <Input
                    id="twitterUrl"
                    type="url"
                    value={twitterUrl}
                    onChange={(e) => setTwitterUrl(e.target.value)}
                    placeholder="https://x.com/you"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="websiteUrl">Website URL</Label>
                  <Input
                    id="websiteUrl"
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://your-site.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profileVisibilityDefault">Default Profile Visibility</Label>
                  <select
                    id="profileVisibilityDefault"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={profileVisibilityDefault}
                    onChange={(e) => setProfileVisibilityDefault(e.target.value === "private" ? "private" : "public")}
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                {profileError && (
                  <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
                    {profileError}
                  </div>
                )}

                {profileSuccess && (
                  <div className="bg-green-500/10 text-green-600 text-sm p-3 rounded-lg">
                    {profileSuccess}
                  </div>
                )}

                <Button type="submit" disabled={profileLoading}>
                  {profileLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </form>
            </div>

            {/* Password Change Form */}
            <div className="bg-card border border-border/50 rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">Change Password</h2>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter your current password"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password"
                    required
                    minLength={8}
                  />
                  <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password"
                    required
                    minLength={8}
                  />
                </div>

                {passwordError && (
                  <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
                    {passwordError}
                  </div>
                )}

                {passwordSuccess && (
                  <div className="bg-green-500/10 text-green-600 text-sm p-3 rounded-lg">
                    {passwordSuccess}
                  </div>
                )}

                <Button type="submit" disabled={passwordLoading}>
                  {passwordLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Changing...
                    </>
                  ) : (
                    "Change Password"
                  )}
                </Button>
              </form>
            </div>
              </>
            )}

            {/* Saved Tab */}
            {activeTab === "saved" && (
              <div className="space-y-4">
                {savedLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : savedProblems.length === 0 ? (
                  <div className="text-center py-12 bg-card border border-border/50 rounded-2xl">
                    <Bookmark className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No saved problems yet</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Click the bookmark icon on any problem to save it for later
                    </p>
                    <Button asChild variant="outline">
                      <Link href="/feed">Browse Problems</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedProblems.map((problem) => (
                      <ProblemCard
                        key={problem.id}
                        problem={problem}
                        isSaved={savedProblemIds.has(problem.id)}
                        onToggleSave={() => handleToggleSave(problem.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  )
}
