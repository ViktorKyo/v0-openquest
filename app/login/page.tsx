"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Sparkles, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

function sanitizeReturnUrl(url: string | null): string {
  if (!url) return "/feed"
  // Only allow relative paths starting with /
  if (!url.startsWith("/") || url.startsWith("//")) return "/feed"
  return url
}

function LoginForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [notice, setNotice] = useState("")

  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, signup, isAuthenticated } = useAuth()

  const returnUrl = sanitizeReturnUrl(searchParams.get("returnUrl"))

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push(returnUrl)
    }
  }, [isAuthenticated, router, returnUrl])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setNotice("")
    setIsLoading(true)

    try {
      if (isLogin) {
        await login(email, password, rememberMe)
        router.push(returnUrl)
      } else {
        if (!name.trim()) {
          setError("Please enter your name")
          setIsLoading(false)
          return
        }
        await signup(email, password, name)
        setIsLogin(true)
        setPassword("")
        setName("")
        setNotice("If this email can be used for OpenQuest, your account is ready. Please sign in.")
        setIsLoading(false)
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Authentication failed. Please try again.")
      }
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back button */}
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card border border-border/50 rounded-2xl p-8 shadow-lg"
        >
          {/* Logo/Header */}
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary/10 flex h-14 w-14 items-center justify-center rounded-xl">
              <Sparkles className="text-primary h-7 w-7" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center mb-2">
            {isLogin ? "Welcome back" : "Join OpenQuest"}
          </h1>
          <p className="text-muted-foreground text-center mb-6">
            {isLogin ? "Sign in to continue" : "Create an account to share world-changing problems"}
          </p>

          {/* Toggle between login and signup */}
          <div className="flex gap-2 mb-6 p-1 bg-secondary rounded-lg">
            <button
              type="button"
              aria-pressed={isLogin}
              onClick={() => {
                setIsLogin(true)
                setError("")
                setNotice("")
              }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                isLogin ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              aria-pressed={!isLogin}
              onClick={() => {
                setIsLogin(false)
                setError("")
                setNotice("")
              }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                !isLogin ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                />
              </div>
            )}

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

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {isLogin && (
                  <Link
                    href="/forgot-password"
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <Input
                id="password"
                type="password"
                placeholder={isLogin ? "Enter your password" : "Create a password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
              {!isLogin && <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>}
            </div>

            {isLogin && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                  Remember me for 30 days
                </Label>
              </div>
            )}

            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">{error}</div>
            )}
            {notice && (
              <div className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-sm p-3 rounded-lg">
                {notice}
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>
        </motion.div>

        {/* Footer note */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          By continuing, you agree to OpenQuest's{" "}
          <Link href="/terms" className="underline hover:text-foreground transition-colors">Terms of Service</Link>
          {" "}and{" "}
          <Link href="/privacy" className="underline hover:text-foreground transition-colors">Privacy Policy</Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
