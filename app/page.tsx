"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Star, CalendarIcon, Users, Search } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const hotels = [
  {
    id: 1,
    name: "The Ritz London",
    location: "London, UK",
    rating: 4.9,
    price: 450,
    image: "/luxury-hotel-london-ritz.jpg",
    description: "Iconic luxury hotel in the heart of Piccadilly",
  },
  {
    id: 2,
    name: "The Lowry Hotel",
    location: "Manchester, UK",
    rating: 4.7,
    price: 280,
    image: "/modern-hotel-manchester-waterfront.jpg",
    description: "Five-star contemporary hotel on the River Irwell",
  },
  {
    id: 3,
    name: "The Balmoral",
    location: "Edinburgh, UK",
    rating: 4.8,
    price: 380,
    image: "/historic-hotel-edinburgh-castle.jpg",
    description: "Elegant Victorian hotel with views of Edinburgh Castle",
  },
]

export default function Page() {
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guests, setGuests] = useState("2")
  const [location, setLocation] = useState("")

  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">Find Your Perfect Stay</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Book luxury hotels across the UK with the best prices guaranteed
        </p>
      </section>

      <section className="mb-16">
        <Card>
          <CardHeader>
            <CardTitle>Search Hotels</CardTitle>
            <CardDescription>Find your ideal accommodation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Where are you going?"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Check-in</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !checkIn && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkIn ? format(checkIn, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Check-out</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !checkOut && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOut ? format(checkOut, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests">Guests</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" size="lg">
              <Search className="mr-2 h-4 w-4" />
              Search Hotels
            </Button>
          </CardFooter>
        </Card>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8">Featured Hotels</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <Card key={hotel.id} className="overflow-hidden">
              <img src={hotel.image || "/placeholder.svg"} alt={hotel.name} className="w-full h-48 object-cover" />
              <CardHeader>
                <CardTitle>{hotel.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {hotel.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{hotel.rating}</span>
                  </div>
                  <div className="text-lg font-bold">£{hotel.price}/night</div>
                </div>
                <p className="text-sm text-muted-foreground">{hotel.description}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href={`/rooms/${hotel.id}`}>View Rooms</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
