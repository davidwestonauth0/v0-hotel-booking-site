"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"

interface SearchFilterProps {
  checkIn: string
  checkOut: string
  guests: string
  onCheckInChange: (value: string) => void
  onCheckOutChange: (value: string) => void
  onGuestsChange: (value: string) => void
  onSearch?: () => void
}

export function SearchFilter({
  checkIn,
  checkOut,
  guests,
  onCheckInChange,
  onCheckOutChange,
  onGuestsChange,
  onSearch,
}: SearchFilterProps) {
  const [checkInOpen, setCheckInOpen] = useState(false)
  const [checkOutOpen, setCheckOutOpen] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const checkInDate = checkIn ? new Date(checkIn + "T00:00:00") : null
  const checkOutDate = checkOut ? new Date(checkOut + "T00:00:00") : null

  const handleSearch = () => {
    setIsSearching(true)
    // Simulate search delay for visual feedback
    setTimeout(() => {
      setIsSearching(false)
      onSearch?.()
    }, 500)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Check-in</label>
          <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
            <PopoverTrigger asChild>
              <button className="w-full px-3 py-2 border border-input rounded-md bg-white text-foreground hover:bg-accent text-left flex items-center justify-between gap-2">
                <span className={checkInDate ? "text-foreground font-medium" : "text-muted-foreground"}>
                  {checkInDate ? format(checkInDate, "MMM dd, yyyy") : "Select date"}
                </span>
                <CalendarIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkInDate || undefined}
                onSelect={(date) => {
                  if (date) {
                    onCheckInChange(format(date, "yyyy-MM-dd"))
                    setCheckInOpen(false)
                  }
                }}
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Check-out</label>
          <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
            <PopoverTrigger asChild>
              <button className="w-full px-3 py-2 border border-input rounded-md bg-white text-foreground hover:bg-accent text-left flex items-center justify-between gap-2">
                <span className={checkOutDate ? "text-foreground font-medium" : "text-muted-foreground"}>
                  {checkOutDate ? format(checkOutDate, "MMM dd, yyyy") : "Select date"}
                </span>
                <CalendarIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOutDate || undefined}
                onSelect={(date) => {
                  if (date) {
                    onCheckOutChange(format(date, "yyyy-MM-dd"))
                    setCheckOutOpen(false)
                  }
                }}
                disabled={(date) => {
                  const today = new Date(new Date().setHours(0, 0, 0, 0))
                  if (checkInDate && date <= checkInDate) return true
                  return date < today
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Guests</label>
          <select
            value={guests}
            onChange={(e) => onGuestsChange(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md text-foreground bg-white"
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-white disabled:opacity-50"
            onClick={handleSearch}
            disabled={isSearching}
          >
            {isSearching ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Searching...
              </>
            ) : (
              "Search"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
