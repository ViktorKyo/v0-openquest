"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check for stored auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("openquest_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Mock authentication - in production, this would call your API
    await new Promise((resolve) => setTimeout(resolve, 800)) // Simulate network delay

    // Mock user data
    const mockUser: User = {
      id: Math.random().toString(36).substring(7),
      email,
      name: email.split("@")[0], // Use email prefix as name
    }

    setUser(mockUser)
    localStorage.setItem("openquest_user", JSON.stringify(mockUser))
  }

  const signup = async (email: string, password: string, name: string) => {
    // Mock authentication - in production, this would call your API
    await new Promise((resolve) => setTimeout(resolve, 800)) // Simulate network delay

    const mockUser: User = {
      id: Math.random().toString(36).substring(7),
      email,
      name,
    }

    setUser(mockUser)
    localStorage.setItem("openquest_user", JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("openquest_user")
    router.push("/")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
