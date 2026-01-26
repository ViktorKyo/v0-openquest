"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Copy, Check, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminSetupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState("")
  const [adminId, setAdminId] = useState("")
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if setup is allowed
    fetch("/api/admin/auth/setup")
      .then(res => res.json())
      .then(data => {
        if (!data.canSetup) {
          router.push("/admin/login")
        }
        setIsLoading(false)
      })
      .catch(() => {
        setError("Failed to check setup status")
        setIsLoading(false)
      })
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsCreating(true)

    try {
      const res = await fetch("/api/admin/auth/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Setup failed")
        setIsCreating(false)
        return
      }

      // Show generated admin ID
      setAdminId(data.adminId)
    } catch (err) {
      setError("Network error. Please try again.")
      setIsCreating(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(adminId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (adminId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl"
        >
          <Card>
            <CardHeader className="space-y-1 flex flex-col items-center">
              <div className="bg-green-500/10 p-3 rounded-full mb-2">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <CardTitle className="text-2xl font-bold">Setup Complete!</CardTitle>
              <CardDescription>Your admin ID has been generated</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="font-semibold text-yellow-600 dark:text-yellow-400">
                      Save This ID Immediately
                    </p>
                    <p className="text-sm text-muted-foreground">
                      This ID will only be shown once. Store it securely in a password manager.
                      You'll need it to log in to the admin dashboard.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Your Admin ID</Label>
                <div className="flex gap-2">
                  <Input
                    value={adminId}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="icon"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-3 p-4 bg-secondary/30 rounded-lg">
                <h3 className="font-semibold text-sm">Next Steps:</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Copy your admin ID and save it in a password manager</li>
                  <li>Click "Go to Login" below</li>
                  <li>Paste your admin ID to access the dashboard</li>
                  <li>You can create additional admin users from Settings</li>
                </ol>
              </div>

              <Button
                onClick={() => router.push("/admin/login")}
                className="w-full"
                size="lg"
              >
                Go to Login
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="space-y-1 flex flex-col items-center">
            <div className="bg-primary/10 p-3 rounded-full mb-2">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">First-Time Setup</CardTitle>
            <CardDescription>Create your first admin account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name (Optional)</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {error && (
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}

              <Button type="submit" className="w-full" size="lg" disabled={isCreating}>
                {isCreating ? "Creating..." : "Generate Admin ID"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
              <p className="text-xs text-muted-foreground text-center">
                This will create a Super Admin account with full access to all features.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
