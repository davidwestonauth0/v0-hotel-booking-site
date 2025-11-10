"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users } from "lucide-react"
import { useUser } from "@/components/auth-provider"
import { format } from "date-fns"

// Mock bookings data
const mockBookings = [
  {
    id: "1",
    hotelName: "The Ritz London",
    roomName: "Deluxe Room",
    location: "London, UK",
    checkIn: new Date("2025-05-15"),
    checkOut: new Date("2025-05-18"),
    guests: 2,
    total: 1485,
    status: "confirmed",
    image: "/luxury-hotel-london-ritz.jpg",
  },
  {
    id: "2",
    hotelName: "The Balmoral",
    roomName: "Castle View Room",
    location: "Edinburgh, UK",
    checkIn: new Date("2025-06-10"),
    checkOut: new Date("2025-06-13"),
    guests: 2,
    total: 1254,
    status: "confirmed",
    image: "/historic-hotel-edinburgh-castle.jpg",
  },
]

export default function BookingsPage() {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const [bookings, setBookings] = useState(mockBookings)

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

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">My Bookings</h1>

      {bookings.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">You don't have any bookings yet</p>
            <Button asChild>
              <Link href="/">Browse Hotels</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <Card key={booking.id} className="overflow-hidden">
              <img
                src={booking.image || "/placeholder.svg"}
                alt={booking.hotelName}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{booking.hotelName}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {booking.location}
                    </CardDescription>
                  </div>
                  <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>{booking.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-medium">{booking.roomName}</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {format(booking.checkIn, "MMM d")} - {format(booking.checkOut, "MMM d, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{booking.guests} guests</span>
                  </div>
                </div>
                <div className="text-lg font-bold">£{booking.total}</div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-transparent" variant="outline" asChild>
                  <Link href={`/bookings/${booking.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
