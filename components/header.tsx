"use client"

import Link from "next/link"
import { useUser } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"

export function Header() {
  const { user, isLoading } = useUser()

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">0</div>
            <span className="font-bold text-lg text-foreground">Hotel0</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition">
              Hotels
            </Link>
            {user && (
              <Link href="/bookings" className="text-foreground hover:text-primary transition">
                My Bookings
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-4">
            {!isLoading && !user && (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/login?screen_hint=signup">
                  <Button className="bg-primary hover:bg-primary/90 text-white">Sign Up</Button>
                </Link>
              </>
            )}
            {user && (
              <>
                <span className="text-sm text-foreground">{user.name}</span>
                <Link href="/auth/logout">
                  <Button variant="ghost">Sign Out</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
