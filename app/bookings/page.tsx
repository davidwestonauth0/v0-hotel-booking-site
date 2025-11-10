"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useUser } from "@auth0/nextjs-auth0/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Calendar, MapPin, Users, ChevronRight, Filter } from "lucide-react"

interface Booking {
  id: string
  hotel: string
  location: string
  checkIn: string
  checkOut: string
  room: string
  guests: number
  total: number
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled"
  image: string
}

interface User {
  name?: string
  email?: string
}

const SAMPLE_BOOKINGS: Booking[] = [
  {
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
  },
  {
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
  },
  {
    id: "BK003",
    hotel: "Tropical Paradise Resort",
    location: "Bali, Indonesia",
    checkIn: "2024-03-15",
    checkOut: "2024-03-22",
    room: "Standard Room",
    guests: 2,
    total: 1043,
    status: "Completed",
    image: "/tropical-resort-villa-bali.jpg",
  },
  {
    id: "BK004",
    hotel: "Urban Elite Hotel",
    location: "New York City, NY",
    checkIn: "2024-02-01",
    checkOut: "2024-02-03",
    room: "Deluxe Room",
    guests: 1,
    total: 698,
    status: "Cancelled",
    image: "/luxury-city-hotel-room-skyscraper.jpg",
  },
]

type FilterStatus = "All" | "Confirmed" | "Pending" | "Completed" | "Cancelled"

export default function BookingsPage() {
  const router = useRouter()
  const { user, isLoading } = useUser()
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("All")
  const [bookings, setBookings] = useState<Booking[]>(SAMPLE_BOOKINGS)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/api/auth/login")
    }
  }, [user, isLoading, router])

  const filteredBookings = filterStatus === "All" ? bookings : bookings.filter((b) => b.status === filterStatus)

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

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((b) => b.status === "Confirmed").length,
    pending: bookings.filter((b) => b.status === "Pending").length,
    completed: bookings.filter((b) => b.status === "Completed").length,
    totalSpent: bookings.filter((b) => b.status !== "Cancelled").reduce((sum, b) => sum + b.total, 0),
  }

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

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Bookings</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}! View and manage your reservations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
                <p className="text-3xl font-bold text-foreground">{stats.total}</p>
              </div>
              <div className="text-3xl text-muted-foreground">📋</div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Confirmed</p>
                <p className="text-3xl font-bold text-foreground">{stats.confirmed}</p>
              </div>
              <div className="text-3xl text-muted-foreground">✓</div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold text-foreground">{stats.pending}</p>
              </div>
              <div className="text-3xl text-muted-foreground">⏳</div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-3xl font-bold text-primary">£{stats.totalSpent}</p>
              </div>
              <div className="text-3xl text-muted-foreground">💰</div>
            </div>
          </Card>
        </div>

        {/* Filter Section */}
        <div className="mb-8 flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filter:</span>
          </div>
          {(["All", "Confirmed", "Pending", "Completed", "Cancelled"] as FilterStatus[]).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                filterStatus === status ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <Card key={booking.id} className="p-6 hover:shadow-lg transition">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Hotel Image */}
                  <div className="md:w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={booking.image || "/placeholder.svg"}
                      alt={booking.hotel}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Booking Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{booking.hotel}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="w-4 h-4" />
                          {booking.location}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-sm">
                        <p className="text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Check-in
                        </p>
                        <p className="font-semibold text-foreground">{booking.checkIn}</p>
                      </div>
                      <div className="text-sm">
                        <p className="text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Check-out
                        </p>
                        <p className="font-semibold text-foreground">{booking.checkOut}</p>
                      </div>
                      <div className="text-sm">
                        <p className="text-muted-foreground flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          Guests
                        </p>
                        <p className="font-semibold text-foreground">{booking.guests}</p>
                      </div>
                      <div className="text-sm">
                        <p className="text-muted-foreground">Room Type</p>
                        <p className="font-semibold text-foreground">{booking.room}</p>
                      </div>
                    </div>
                  </div>

                  {/* Price and Action */}
                  <div className="flex flex-col items-end justify-between">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total Price</p>
                      <p className="text-2xl font-bold text-primary">£{booking.total}</p>
                    </div>
                    <Link href={`/bookings/${booking.id}`}>
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        Details
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-lg text-foreground mb-4">
              No {filterStatus !== "All" ? filterStatus.toLowerCase() : ""} bookings found
            </p>
            <p className="text-muted-foreground mb-6">Start exploring hotels to make your first reservation</p>
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90 text-white">Browse Hotels</Button>
            </Link>
          </Card>
        )}
      </main>
    </div>
  )
}
