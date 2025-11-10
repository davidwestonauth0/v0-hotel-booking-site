import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Star } from "lucide-react"

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
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">Find Your Perfect Stay</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Book luxury hotels across the UK with the best prices guaranteed
        </p>
        <Button size="lg" asChild>
          <a href="/auth/login">Get Started</a>
        </Button>
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
