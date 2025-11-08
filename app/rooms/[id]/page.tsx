"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Header } from "@/components/header"
import { ChevronLeft, Star, Wifi, Tv, Coffee, Wind } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Room {
  id: number
  type: string
  price: number
  capacity: number
  beds: string
  size: number
  amenities: string[]
  available: number
}

interface Hotel {
  id: number
  name: string
  location: string
  rating: number
  reviews: number
  price: number
  image: string
  amenities: string[]
  rooms: number
}

interface User {
  name?: string
  email?: string
}

const SAMPLE_HOTELS: Record<number, Hotel> = {
  1: {
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
  2: {
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
  3: {
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
  4: {
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
  5: {
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
  6: {
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
}

const ROOM_TYPES: Room[] = [
  {
    id: 1,
    type: "Standard Room",
    price: 149,
    capacity: 2,
    beds: "1 Queen Bed",
    size: 280,
    amenities: ["WiFi", "Air Conditioning", "Flat-screen TV", "Work Desk"],
    available: 12,
  },
  {
    id: 2,
    type: "Deluxe Room",
    price: 249,
    capacity: 3,
    beds: "1 King Bed + Sofa",
    size: 450,
    amenities: ["WiFi", "Air Conditioning", "Smart TV", "Minibar", "Work Area", "City View"],
    available: 8,
  },
  {
    id: 3,
    type: "Executive Suite",
    price: 449,
    capacity: 4,
    beds: "2 Queen Beds",
    size: 650,
    amenities: ["WiFi", "Air Conditioning", "55-inch TV", "Full Kitchen", "Living Room", "Jacuzzi"],
    available: 3,
  },
  {
    id: 4,
    type: "Presidential Suite",
    price: 799,
    capacity: 6,
    beds: "3 Bedrooms",
    size: 1200,
    amenities: ["WiFi", "Air Conditioning", "Cinema Room", "Full Kitchen", "Butler Service", "Panoramic Views"],
    available: 1,
  },
]

const amenityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="w-4 h-4" />,
  TV: <Tv className="w-4 h-4" />,
  Coffee: <Coffee className="w-4 h-4" />,
  "Air Conditioning": <Wind className="w-4 h-4" />,
}

export default function RoomDetailsPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const hotelId = Number.parseInt(params.id as string)
  const hotel = SAMPLE_HOTELS[hotelId]
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [checkIn, setCheckIn] = useState(searchParams.get("checkIn") || "")
  const [checkOut, setCheckOut] = useState(searchParams.get("checkOut") || "")
  const [guests, setGuests] = useState(searchParams.get("guests") || "1")

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me")
        const data = await res.json()
        setUser(data.user || null)
      } catch (error) {
        console.error("Failed to fetch user:", error)
      }
    }

    fetchUser()
  }, [])

  if (!hotel) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-center text-muted-foreground">Hotel not found</p>
        </main>
      </div>
    )
  }

  const handleSelectRoom = (room: Room) => {
    setSelectedRoom(room)
  }

  const handleProceedToCheckout = () => {
    if (!selectedRoom || !checkIn || !checkOut) {
      alert("Please select a room and check-in/check-out dates")
      return
    }
    router.push(
      `/checkout/${hotelId}/${selectedRoom.id}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}&quantity=${quantity}&hotelName=${encodeURIComponent(hotel.name)}&roomType=${encodeURIComponent(selectedRoom.type)}&roomPrice=${selectedRoom.price}`,
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition mb-6">
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Hotels</span>
        </Link>

        {/* Hotel Header */}
        <div className="mb-8">
          <div className="relative w-full h-96 bg-muted rounded-lg overflow-hidden mb-6">
            <img src={hotel.image || "/placeholder.svg"} alt={hotel.name} className="w-full h-full object-cover" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold mb-2 text-foreground">{hotel.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1 bg-accent text-accent-foreground px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold">{hotel.rating}</span>
                  <span className="text-sm">({hotel.reviews} reviews)</span>
                </div>
                <span className="text-muted-foreground">{hotel.location}</span>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-foreground">Hotel Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {hotel.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-muted text-muted-foreground px-3 py-2 rounded">
                      {amenityIcons[amenity] || <span>•</span>}
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="p-6 bg-muted/50">
                <h3 className="font-semibold mb-4 text-foreground">When are you staying?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Check-in</label>
                    <Input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Check-out</label>
                    <Input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Guests</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md text-foreground bg-white"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6 h-fit sticky top-24">
              <h3 className="font-semibold text-lg mb-4 text-foreground">Booking Summary</h3>
              {selectedRoom ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Selected Room</p>
                    <p className="font-semibold text-foreground">{selectedRoom.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Price per night</p>
                    <p className="text-2xl font-bold text-primary">£{selectedRoom.price}</p>
                  </div>
                  <div className="flex items-center gap-3 pt-2 border-t border-border">
                    <label htmlFor="quantity" className="text-sm text-muted-foreground">
                      Quantity:
                    </label>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                        −
                      </Button>
                      <span className="w-8 text-center font-semibold">{quantity}</span>
                      <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-1">Total</p>
                    <p className="text-3xl font-bold text-primary">£{selectedRoom.price * quantity}</p>
                  </div>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white mt-4"
                    onClick={handleProceedToCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Select a room to get started</p>
              )}
            </Card>
          </div>
        </div>

        {/* Room Types */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-foreground">Available Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ROOM_TYPES.map((room) => (
              <Card
                key={room.id}
                className={`p-6 cursor-pointer transition hover:shadow-lg ${
                  selectedRoom?.id === room.id ? "border-primary border-2 shadow-lg" : ""
                }`}
                onClick={() => handleSelectRoom(room)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{room.type}</h3>
                    <p className="text-sm text-muted-foreground">{room.beds}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">£{room.price}</p>
                    <p className="text-xs text-muted-foreground">per night</p>
                  </div>
                </div>

                <div className="mb-4 pb-4 border-b border-border">
                  <div className="flex gap-6 text-sm">
                    <div>
                      <span className="text-muted-foreground">Size:</span>
                      <p className="font-semibold text-foreground">{room.size} sqft</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Guests:</span>
                      <p className="font-semibold text-foreground">Up to {room.capacity}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Available:</span>
                      <p className="font-semibold text-foreground">{room.available}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">Room Amenities:</p>
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.map((amenity, idx) => (
                      <span key={idx} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <Button
                  className={`w-full mt-4 ${
                    selectedRoom?.id === room.id
                      ? "bg-primary hover:bg-primary/90 text-white"
                      : "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  }`}
                  onClick={() => handleSelectRoom(room)}
                >
                  {selectedRoom?.id === room.id ? "Selected ✓" : "Select Room"}
                </Button>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
