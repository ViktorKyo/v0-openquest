"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send reset link")
      }

      setIsSubmitted(true)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Failed to send reset link. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back button */}
        <Link
          href="/login"
          className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card border border-border/50 rounded-2xl p-8 shadow-lg"
        >
          {isSubmitted ? (
            <>
              {/* Success State */}
              <div className="flex items-center justify-center mb-6">
                <div className="bg-green-500/10 flex h-14 w-14 items-center justify-center rounded-xl">
                  <CheckCircle className="text-green-600 h-7 w-7" />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-center mb-2">Check your email</h1>
              <p className="text-muted-foreground text-center mb-6">
                If an account exists with <strong>{email}</strong>, you will receive a password reset link shortly.
              </p>

              <div className="space-y-3">
                <Button asChild className="w-full" variant="outline">
                  <Link href="/login">Return to login</Link>
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Didn't receive an email? Check your spam folder or{" "}
                  <button
                    onClick={() => {
                      setIsSubmitted(false)
                      setEmail("")
                    }}
                    className="text-primary hover:underline"
                  >
                    try again
                  </button>
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Form State */}
              <div className="flex items-center justify-center mb-6">
                <div className="bg-primary/10 flex h-14 w-14 items-center justify-center rounded-xl">
                  <Mail className="text-primary h-7 w-7" />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-center mb-2">Forgot your password?</h1>
              <p className="text-muted-foreground text-center mb-6">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {error && (
                  <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}
