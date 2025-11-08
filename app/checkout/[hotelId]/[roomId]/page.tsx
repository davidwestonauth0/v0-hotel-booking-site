"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { ChevronLeft } from "lucide-react"

interface User {
  name?: string
  email?: string
}

export default function CheckoutPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const [user, setUser] = useState<User | null>(null)
  const [isGuest, setIsGuest] = useState(true)
  const [showAuthModal, setShowAuthModal] = useState(false)

  const checkIn = searchParams.get("checkIn") || ""
  const checkOut = searchParams.get("checkOut") || ""
  const guests = searchParams.get("guests") || "1"
  const quantity = Number.parseInt(searchParams.get("quantity") || "1")
  const hotelName = searchParams.get("hotelName") || ""
  const roomType = searchParams.get("roomType") || ""
  const roomPrice = Number.parseFloat(searchParams.get("roomPrice") || "0")

  const [isProcessing, setIsProcessing] = useState(false)
  const [guestName, setGuestName] = useState("")
  const [guestEmail, setGuestEmail] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  }

  const nights = calculateNights()
  const subtotal = roomPrice * nights * quantity
  const tax = subtotal * 0.12
  const total = subtotal + tax

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isGuest && (!guestName || !guestEmail)) {
      alert("Please fill in your name and email")
      return
    }

    if (!cardNumber || !expiryDate || !cvv) {
      alert("Please fill in all payment details")
      return
    }

    setIsProcessing(true)
    // Simulate booking processing
    setTimeout(() => {
      const bookingEmail = isGuest ? guestEmail : user?.email
      alert(`Booking confirmed! Confirmation sent to ${bookingEmail}`)
      if (isGuest) {
        setShowAuthModal(true)
      }
      setIsProcessing(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href={`/rooms/${params.hotelId}`}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Rooms</span>
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold">Complete Your Booking</h1>
          <p className="text-muted-foreground mt-2">{hotelName}</p>
        </div>

        <form onSubmit={handleBooking} className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Guest Information */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 text-foreground">Guest Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Full Name</label>
                  <Input
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
                  <Input
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="your@email.com"
                    type="email"
                    required
                  />
                </div>
              </div>
            </Card>

            {/* Stay Details */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 text-foreground">Stay Details</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Check-in</label>
                  <Input type="text" value={checkIn} disabled className="bg-muted" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Check-out</label>
                  <Input type="text" value={checkOut} disabled className="bg-muted" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Nights</label>
                  <Input type="text" value={nights} disabled className="bg-muted" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Guests</label>
                  <Input type="text" value={guests} disabled className="bg-muted" />
                </div>
              </div>
            </Card>

            {/* Payment Information */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 text-foreground">Payment Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Card Number</label>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Expiry Date</label>
                    <Input
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">CVC</label>
                    <Input placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4 text-foreground">Order Summary</h2>

              <div className="space-y-3 mb-4 pb-4 border-b border-border">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Room</p>
                  <p className="font-semibold text-foreground">{roomType}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rate:</span>
                  <span className="font-medium text-foreground">£{roomPrice}/night</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Nights:</span>
                  <span className="font-medium text-foreground">{nights}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rooms:</span>
                  <span className="font-medium text-foreground">{quantity}</span>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between">
                    <span className="text-foreground">Subtotal</span>
                    <span className="font-medium">£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground">Tax (12%)</span>
                    <span className="font-medium">£{tax.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-lg font-bold text-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">£{total.toFixed(2)}</span>
              </div>

              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg"
              >
                {isProcessing ? "Processing..." : "Confirm Booking"}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">Your booking is secure and encrypted</p>
            </Card>
          </div>
        </form>

        {/* Auth Modal */}
        {showAuthModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-2 text-foreground">Booking Complete!</h2>
              <p className="text-muted-foreground mb-6">
                Your booking has been confirmed. Create an account to access your bookings and get exclusive deals.
              </p>

              <div className="space-y-3">
                <Link
                  href={`/api/auth/login?screen_hint=signup&login_hint=${encodeURIComponent(guestEmail)}`}
                  className="block"
                >
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">Create Account</Button>
                </Link>
                <Link href={`/api/auth/login?login_hint=${encodeURIComponent(guestEmail)}`} className="block">
                  <Button variant="outline" className="w-full bg-transparent">
                    Sign In
                  </Button>
                </Link>
                <Link href="/" className="block">
                  <Button variant="ghost" className="w-full">
                    Continue as Guest
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
