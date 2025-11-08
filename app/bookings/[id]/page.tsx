"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Header } from "@/components/header"
import { ChevronLeft, Calendar, MapPin, Users, Home, Phone, Mail, Download } from "lucide-react"

interface User {
  name?: string
  email?: string
}

const SAMPLE_BOOKINGS = {
  BK001: {
    id: "BK001",
    hotel: "Luxury Grand Resort",
    location: "Miami Beach, Florida",
    checkIn: "2024-12-20",
    checkOut: "2024-12-23",
    room: "Deluxe Room",
    guests: 2,
    total: 897,
    status: "Confirmed",
    image: "/luxury-ocean-view-hotel.png",
    nights: 3,
    pricePerNight: 299,
    tax: 107.64,
    bookingDate: "2024-10-15",
    confirmationNumber: "CONF-2024-BK001",
    hotelPhone: "+1 (305) 555-0100",
    hotelEmail: "reservations@luxurygrandresort.com",
    guestName: "John Doe",
    guestEmail: "john.doe@example.com",
    cancellationPolicy: "Free cancellation up to 48 hours before check-in",
  },
  BK002: {
    id: "BK002",
    hotel: "Mountain Retreat Inn",
    location: "Aspen, Colorado",
    checkIn: "2024-01-10",
    checkOut: "2024-01-12",
    room: "Executive Suite",
    guests: 3,
    total: 1198,
    status: "Pending",
    image: "/mountain-resort-luxury-room.jpg",
    nights: 2,
    pricePerNight: 549,
    tax: 131.76,
    bookingDate: "2024-10-20",
    confirmationNumber: "CONF-2024-BK002",
    hotelPhone: "+1 (970) 555-0200",
    hotelEmail: "reservations@mountainretreat.com",
    guestName: "Jane Smith",
    guestEmail: "jane.smith@example.com",
    cancellationPolicy: "Free cancellation up to 72 hours before check-in",
  },
}

export default function BookingDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const bookingId = params.id as string

  const booking = SAMPLE_BOOKINGS[bookingId as keyof typeof SAMPLE_BOOKINGS]

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me")
        const data = await res.json()
        if (!data.user) {
          router.push("/api/auth/login")
        } else {
          setUser(data.user)
        }
      } catch (error) {
        console.error("Failed to fetch user:", error)
        router.push("/api/auth/login")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || !booking) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-center text-muted-foreground">Booking not found</p>
        </main>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/bookings" className="flex items-center gap-2 text-primary hover:text-primary/80 transition mb-6">
          <ChevronLeft className="w-4 h-4" />
          <span>Back to My Bookings</span>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{booking.hotel}</h1>
              <p className="text-muted-foreground flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {booking.location}
              </p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
              {booking.status}
            </span>
          </div>

          <div className="relative w-full h-64 bg-muted rounded-lg overflow-hidden">
            <img src={booking.image || "/placeholder.svg"} alt={booking.hotel} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Reservation Details */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6 text-foreground">Reservation Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4" />
                    Check-in
                  </p>
                  <p className="text-lg font-semibold text-foreground">{booking.checkIn}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4" />
                    Check-out
                  </p>
                  <p className="text-lg font-semibold text-foreground">{booking.checkOut}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4" />
                    Guests
                  </p>
                  <p className="text-lg font-semibold text-foreground">{booking.guests}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                    <Home className="w-4 h-4" />
                    Room Type
                  </p>
                  <p className="text-lg font-semibold text-foreground">{booking.room}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nights</p>
                  <p className="text-lg font-semibold text-foreground">{booking.nights}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Confirmation</p>
                  <p className="text-lg font-semibold text-foreground">{booking.confirmationNumber}</p>
                </div>
              </div>
            </Card>

            {/* Guest Information */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6 text-foreground">Guest Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Guest Name</p>
                  <p className="font-semibold text-foreground">{booking.guestName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </p>
                  <p className="font-semibold text-foreground">{booking.guestEmail}</p>
                </div>
              </div>
            </Card>

            {/* Hotel Contact */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6 text-foreground">Hotel Contact</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-semibold text-foreground">{booking.hotelPhone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold text-foreground">{booking.hotelEmail}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Cancellation Policy */}
            <Card className="p-6 bg-muted/50">
              <h3 className="font-semibold text-foreground mb-3">Cancellation Policy</h3>
              <p className="text-sm text-muted-foreground">{booking.cancellationPolicy}</p>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Summary */}
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6 text-foreground">Price Summary</h2>
              <div className="space-y-3 pb-4 border-b border-border">
                <div className="flex justify-between">
                  <span className="text-foreground">
                    £{booking.pricePerNight} × {booking.nights} nights
                  </span>
                  <span className="font-semibold text-foreground">£{booking.pricePerNight * booking.nights}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground">Tax</span>
                  <span className="font-semibold text-foreground">£{booking.tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between mt-4 mb-6">
                <span className="text-lg font-bold text-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">£{booking.total}</span>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-white gap-2 mb-3">
                <Download className="w-4 h-4" />
                Download Receipt
              </Button>

              {booking.status === "Confirmed" && (
                <Button variant="outline" className="w-full bg-transparent">
                  Modify Booking
                </Button>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
