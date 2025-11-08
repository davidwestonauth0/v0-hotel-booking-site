"use client"

import React from "react"

interface User {
  name?: string
  email?: string
  picture?: string
}

// Simulate checking if user is logged in by checking for Auth0 session
export function useUser() {
  const [user, setUser] = React.useState<User | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    // Check if user session exists via API
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user)
        }
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [])

  return { user, isLoading }
}
