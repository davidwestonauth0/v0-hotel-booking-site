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
  user: User | null | undefined
  isLoading: boolean
  error?: Error
}

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  isLoading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error>()

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me")
        if (res.ok) {
          const data = await res.json()
          setUser(data)
        } else {
          setUser(null)
        }
      } catch (err) {
        setError(err as Error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  return <AuthContext.Provider value={{ user, isLoading, error }}>{children}</AuthContext.Provider>
}

export function useUser() {
  return useContext(AuthContext)
}
