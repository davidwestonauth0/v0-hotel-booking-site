"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wifi, Tv, Coffee, Wind, Users, Bed, ArrowLeft } from "lucide-react"
import { useUser } from "@/components/auth-provider"

const hotelsData = {
  "1": {
    name: "The Ritz London",
    location: "London, UK",
    description: "Iconic luxury hotel in the heart of Piccadilly",
    image: "/luxury-hotel-london-ritz.jpg",
    rooms: [
      {
        id: 1,
        name: "Deluxe Room",
        description: "Elegant room with king-size bed and city views",
        price: 450,
        capacity: 2,
        beds: "1 King",
        amenities: ["WiFi", "TV", "Coffee Maker", "Air Conditioning"],
        image: "/luxury-hotel-room.png",
      },
      {
        id: 2,
        name: "Executive Suite",
        description: "Spacious suite with separate living area and premium amenities",
        price: 750,
        capacity: 3,
        beds: "1 King + Sofa Bed",
        amenities: ["WiFi", "TV", "Coffee Maker", "Air Conditioning"],
        image: "/luxury-hotel-suite.png",
      },
    ],
  },
  "2": {
    name: "The Lowry Hotel",
    location: "Manchester, UK",
    description: "Five-star contemporary hotel on the River Irwell",
    image: "/modern-hotel-manchester-waterfront.jpg",
    rooms: [
      {
        id: 1,
        name: "River View Room",
        description: "Modern room overlooking the River Irwell",
        price: 280,
        capacity: 2,
        beds: "1 Queen",
        amenities: ["WiFi", "TV", "Coffee Maker", "Air Conditioning"],
        image: "/modern-hotel-room-river-view.jpg",
      },
      {
        id: 2,
        name: "Penthouse Suite",
        description: "Luxurious top-floor suite with panoramic city views",
        price: 550,
        capacity: 4,
        beds: "2 Queens",
        amenities: ["WiFi", "TV", "Coffee Maker", "Air Conditioning"],
        image: "/penthouse-suite-modern.jpg",
      },
    ],
  },
  "3": {
    name: "The Balmoral",
    location: "Edinburgh, UK",
    description: "Elegant Victorian hotel with views of Edinburgh Castle",
    image: "/historic-hotel-edinburgh-castle.jpg",
    rooms: [
      {
        id: 1,
        name: "Castle View Room",
        description: "Classic room with stunning views of Edinburgh Castle",
        price: 380,
        capacity: 2,
        beds: "1 King",
        amenities: ["WiFi", "TV", "Coffee Maker", "Air Conditioning"],
        image: "/elegant-hotel-room-castle-view.jpg",
      },
      {
        id: 2,
        name: "Royal Suite",
        description: "Grand suite with Victorian elegance and modern comfort",
        price: 680,
        capacity: 3,
        beds: "1 King + Single",
        amenities: ["WiFi", "TV", "Coffee Maker", "Air Conditioning"],
        image: "/victorian-hotel-suite-elegant.jpg",
      },
    ],
  },
}

const amenityIcons = {
  WiFi: Wifi,
  TV: Tv,
  "Coffee Maker": Coffee,
  "Air Conditioning": Wind,
}

export default function RoomsPage() {
  const params = useParams()
  const { user } = useUser()
  const hotelId = params.id as string
  const hotel = hotelsData[hotelId as keyof typeof hotelsData]

  if (!hotel) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p>Hotel not found</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Hotels
        </Link>
      </Button>

      <div className="mb-8">
        <img
          src={hotel.image || "/placeholder.svg"}
          alt={hotel.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h1 className="text-4xl font-bold mb-2">{hotel.name}</h1>
        <p className="text-xl text-muted-foreground mb-2">{hotel.location}</p>
        <p className="text-lg">{hotel.description}</p>
      </div>

      <h2 className="text-3xl font-bold mb-6">Available Rooms</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {hotel.rooms.map((room) => (
          <Card key={room.id} className="overflow-hidden">
            <img src={room.image || "/placeholder.svg"} alt={room.name} className="w-full h-48 object-cover" />
            <CardHeader>
              <CardTitle>{room.name}</CardTitle>
              <CardDescription>{room.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Up to {room.capacity} guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{room.beds}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {room.amenities.map((amenity) => {
                  const Icon = amenityIcons[amenity as keyof typeof amenityIcons]
                  return (
                    <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
                      {Icon && <Icon className="h-3 w-3" />}
                      {amenity}
                    </Badge>
                  )
                })}
              </div>

              <div className="text-2xl font-bold">£{room.price}/night</div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href={user ? `/checkout/${hotelId}/${room.id}` : "/auth/login"}>
                  {user ? "Book Now" : "Sign in to Book"}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
