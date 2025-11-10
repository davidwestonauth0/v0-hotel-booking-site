"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Mail, Phone, ArrowLeft, CreditCard } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"
import { useUser } from "@/components/auth-provider"

// Mock booking details
const mockBookingDetails = {
  "1": {
    id: "1",
    hotelName: "The Ritz London",
    roomName: "Deluxe Room",
    location: "London, UK",
    checkIn: new Date("2025-05-15"),
    checkOut: new Date("2025-05-18"),
    guests: 2,
    status: "confirmed",
    image: "/luxury-hotel-london-ritz.jpg",
    guestName: "John Doe",
    guestEmail: "john@example.com",
    guestPhone: "+44 20 1234 5678",
    roomPrice: 450,
    nights: 3,
    subtotal: 1350,
    tax: 135,
    total: 1485,
    confirmationNumber: "RZ-2025-001",
  },
  "2": {
    id: "2",
    hotelName: "The Balmoral",
    roomName: "Castle View Room",
    location: "Edinburgh, UK",
    checkIn: new Date("2025-06-10"),
    checkOut: new Date("2025-06-13"),
    guests: 2,
    status: "confirmed",
    image: "/historic-hotel-edinburgh-castle.jpg",
    guestName: "John Doe",
    guestEmail: "john@example.com",
    guestPhone: "+44 20 1234 5678",
    roomPrice: 380,
    nights: 3,
    subtotal: 1140,
    tax: 114,
    total: 1254,
    confirmationNumber: "BM-2025-002",
  },
}

export default function BookingDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user, isLoading } = useUser()
  const bookingId = params.id as string
  const booking = mockBookingDetails[bookingId as keyof typeof mockBookingDetails]

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (!booking) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p>Booking not found</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/bookings">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Bookings
        </Link>
      </Button>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold">Booking Details</h1>
        <Badge variant={booking.status === "confirmed" ? "default" : "secondary"} className="text-base px-4 py-1">
          {booking.status}
        </Badge>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <img
              src={booking.image || "/placeholder.svg"}
              alt={booking.hotelName}
              className="w-full h-64 object-cover"
            />
            <CardHeader>
              <CardTitle className="text-2xl">{booking.hotelName}</CardTitle>
              <CardDescription className="flex items-center gap-1 text-base">
                <MapPin className="h-4 w-4" />
                {booking.location}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium">{booking.roomName}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stay Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Check-in</p>
                  <p className="text-muted-foreground">{format(booking.checkIn, "EEEE, MMMM d, yyyy")}</p>
                  <p className="text-sm text-muted-foreground">After 3:00 PM</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Check-out</p>
                  <p className="text-muted-foreground">{format(booking.checkOut, "EEEE, MMMM d, yyyy")}</p>
                  <p className="text-sm text-muted-foreground">Before 11:00 AM</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Guests</p>
                  <p className="text-muted-foreground">{booking.guests} guests</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Guest Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Name</p>
                  <p className="text-muted-foreground">{booking.guestName}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">{booking.guestEmail}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">{booking.guestPhone}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Confirmation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Confirmation Number</p>
                <p className="font-mono font-bold text-lg">{booking.confirmationNumber}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Price Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>
                    £{booking.roomPrice} × {booking.nights} nights
                  </span>
                  <span>£{booking.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (20%)</span>
                  <span>£{booking.tax}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>£{booking.total}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                <CreditCard className="h-4 w-4" />
                <span>Paid in full</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
