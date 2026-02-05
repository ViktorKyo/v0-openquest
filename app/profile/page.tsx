"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Header } from "@/components/header"

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading: authLoading, refreshSession } = useAuth()
  const router = useRouter()

  const [name, setName] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [profileLoading, setProfileLoading] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [profileSuccess, setProfileSuccess] = useState("")
  const [profileError, setProfileError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState("")
  const [passwordError, setPasswordError] = useState("")

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login?returnUrl=/profile")
    }
  }, [authLoading, isAuthenticated, router])

  useEffect(() => {
    if (user?.name) {
      setName(user.name)
    }
  }, [user])

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
        body: JSON.stringify({ name: name.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update profile")
      }

      setProfileSuccess("Profile updated successfully")
      await refreshSession()
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
            <div className="flex items-center gap-4 mb-8">
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

            {/* Profile Form */}
            <div className="bg-card border border-border/50 rounded-2xl p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
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
          </motion.div>
        </div>
      </div>
    </>
  )
}
