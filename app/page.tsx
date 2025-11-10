"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { SearchFilter } from "@/components/search-filter"
import { HotelCard } from "@/components/hotel-card"
import { useUser } from "@/components/auth-provider"

interface User {
  name?: string
  email?: string
}

const SAMPLE_HOTELS = [
  {
    id: 1,
    name: "The Savoy London",
    location: "London, England",
    rating: 4.8,
    reviews: 284,
    price: 350,
    image: "/luxury-ocean-view-hotel.png",
    amenities: ["Pool", "Spa", "Gym", "WiFi"],
    rooms: 85,
  },
  {
    id: 2,
    name: "The Balmoral Hotel",
    location: "Edinburgh, Scotland",
    rating: 4.7,
    reviews: 156,
    price: 280,
    image: "/beachfront-hotel-room-tropical.jpg",
    amenities: ["Restaurant", "Bar", "Gym", "WiFi"],
    rooms: 120,
  },
  {
    id: 3,
    name: "Llyod House Country Resort",
    location: "Cotswolds, England",
    rating: 4.9,
    reviews: 342,
    price: 320,
    image: "/mountain-resort-luxury-room.jpg",
    amenities: ["Spa", "Restaurant", "Library", "Gardens"],
    rooms: 45,
  },
  {
    id: 4,
    name: "The Peninsula Manchester",
    location: "Manchester, England",
    rating: 4.6,
    reviews: 521,
    price: 240,
    image: "/luxury-city-hotel-room-skyscraper.jpg",
    amenities: ["Concierge", "Gym", "Restaurant", "WiFi"],
    rooms: 200,
  },
  {
    id: 5,
    name: "Portmeirion Hotel",
    location: "North Wales, Wales",
    rating: 4.8,
    reviews: 198,
    price: 220,
    image: "/tropical-resort-villa-bali.jpg",
    amenities: ["Spa", "Restaurant", "Beach", "WiFi"],
    rooms: 75,
  },
  {
    id: 6,
    name: "The Goring Hotel",
    location: "London, England",
    rating: 4.7,
    reviews: 412,
    price: 300,
    image: "/european-historic-boutique-hotel.jpg",
    amenities: ["Concierge", "Restaurant", "Wine Bar", "WiFi"],
    rooms: 55,
  },
]

export default function Home() {
  const { user } = useUser()
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState("1")

  const getHotelLink = (hotelId: number) => {
    const params = new URLSearchParams()
    if (checkIn) params.append("checkIn", checkIn)
    if (checkOut) params.append("checkOut", checkOut)
    if (guests) params.append("guests", guests)
    return `/rooms/${hotelId}${params.toString() ? `?${params.toString()}` : ""}`
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-accent/80 text-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">Find Your Perfect Stay</h1>
              <p className="text-lg opacity-90">Explore our collection of luxury hotels in the UK</p>
            </div>

            <SearchFilter
              checkIn={checkIn}
              checkOut={checkOut}
              guests={guests}
              onCheckInChange={setCheckIn}
              onCheckOutChange={setCheckOut}
              onGuestsChange={setGuests}
            />
          </div>
        </section>

        {/* Hotels Grid */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Featured Hotels</h2>
            <p className="text-muted-foreground">Browse through our selection of premium accommodations in the UK</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_HOTELS.map((hotel) => (
              <Link key={hotel.id} href={getHotelLink(hotel.id)}>
                <HotelCard hotel={hotel} />
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-secondary py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Book?</h2>
            <p className="text-secondary-foreground mb-6">
              Create an account to access exclusive deals and manage your bookings
            </p>
            {!user && (
              <Link href="/auth/login">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  Sign In to Get Started
                </Button>
              </Link>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
