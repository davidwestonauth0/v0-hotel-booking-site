"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Header } from "@/components/header"
import { AlertCircle, Home } from "lucide-react"

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")
  const errorDescription = searchParams.get("error_description")

  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case "access_denied":
        return "Access denied. You may have cancelled the login process."
      case "invalid_grant":
        return "The authorization code has expired or is invalid. Please try logging in again."
      case "unauthorized":
        return "Authentication failed. Please check your credentials."
      case "server_error":
        return "An error occurred on the authentication server. Please try again later."
      default:
        return "An authentication error occurred. Please try again."
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="p-8 border-red-200 bg-red-50/50">
          <div className="flex items-start gap-4 mb-6">
            <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground mb-2">Authentication Error</h1>
              <p className="text-muted-foreground mb-4">{getErrorMessage(error)}</p>
              {errorDescription && (
                <p className="text-sm text-muted-foreground bg-white p-3 rounded border border-red-100">
                  {errorDescription}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-red-200">
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Button>
            </Link>
            <Link href="/api/auth/login">
              <Button variant="outline">Try Again</Button>
            </Link>
          </div>
        </Card>

        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h2 className="font-semibold mb-2 text-foreground">Need Help?</h2>
          <p className="text-sm text-muted-foreground mb-4">
            If you continue to experience issues, please contact our support team or try clearing your browser cookies
            and trying again.
          </p>
          <Link href="/">
            <Button variant="outline" className="text-sm bg-transparent">
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
