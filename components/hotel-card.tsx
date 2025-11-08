"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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

interface HotelCardProps {
  hotel: Hotel
}

export function HotelCard({ hotel }: HotelCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition cursor-pointer h-full flex flex-col">
      <div className="relative w-full h-48 bg-muted overflow-hidden">
        <img
          src={hotel.image || "/placeholder.svg"}
          alt={hotel.name}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
        <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow">
          <span className="text-sm font-semibold text-foreground">★ {hotel.rating}</span>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-lg mb-1 text-foreground">{hotel.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{hotel.location}</p>

        <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
          <span>({hotel.reviews} reviews)</span>
          <span>•</span>
          <span>{hotel.rooms} rooms available</span>
        </div>

        <div className="mb-4 flex flex-wrap gap-1">
          {hotel.amenities.slice(0, 2).map((amenity, i) => (
            <span key={i} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
              {amenity}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-border">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-muted-foreground">Per night</span>
            <span className="text-2xl font-bold text-primary">£{hotel.price}</span>
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90 text-white">View Rooms</Button>
        </div>
      </div>
    </Card>
  )
}
