"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  email?: string
  name?: string
  picture?: string
  sub?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/auth/me")
        const data = await response.json()
        setUser(data.user || null)
      } catch (error) {
        console.error("[v0] Error fetching user:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  return <AuthContext.Provider value={{ user, isLoading }}>{children}</AuthContext.Provider>
}

export function useUser() {
  return useContext(AuthContext)
}
