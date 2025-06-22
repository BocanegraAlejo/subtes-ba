"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, Search } from "lucide-react"
import { importantPlaces, type ImportantPlace } from "@/lib/subte-data"

interface PlaceSelectorProps {
  onPlaceSelect: (stationName: string, placeName: string) => void
  placeholder: string
  selectedPlace?: string
}

export function PlaceSelector({ onPlaceSelect, placeholder, selectedPlace }: PlaceSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const filteredPlaces = importantPlaces.filter(
    (place) =>
      place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getCategoryColor = (category: ImportantPlace["category"]) => {
    const colors = {
      shopping: "bg-purple-100 text-purple-800",
      tourist: "bg-green-100 text-green-800",
      culture: "bg-blue-100 text-blue-800",
      food: "bg-orange-100 text-orange-800",
      business: "bg-indigo-100 text-indigo-800",
      transport: "bg-gray-100 text-gray-800",
      government: "bg-red-100 text-red-800",
    }
    return colors[category]
  }

  const getCategoryLabel = (category: ImportantPlace["category"]) => {
    const labels = {
      shopping: "Compras",
      tourist: "Turismo",
      culture: "Cultura",
      food: "Gastronomía",
      business: "Negocios",
      transport: "Transporte",
      government: "Gobierno",
    }
    return labels[category]
  }

  const getLineColor = (line: string) => {
    const colors: { [key: string]: string } = {
      A: "bg-cyan-500",
      B: "bg-red-500",
      C: "bg-blue-600",
      D: "bg-green-600",
      E: "bg-purple-600",
      H: "bg-yellow-500",
    }
    return colors[line] || "bg-gray-500"
  }

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder={placeholder}
          value={selectedPlace || searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          className="pl-10"
        />
      </div>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-1 max-h-80 overflow-y-auto">
          <CardContent className="p-2">
            {filteredPlaces.length > 0 ? (
              <div className="space-y-1">
                {filteredPlaces.map((place) => (
                  <Button
                    key={place.name}
                    variant="ghost"
                    className="w-full justify-start h-auto p-3"
                    onClick={() => {
                      onPlaceSelect(place.nearestStation, place.name)
                      setSearchTerm("")
                      setIsOpen(false)
                    }}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <MapPin className="w-4 h-4 mt-1 text-gray-500 flex-shrink-0" />
                      <div className="flex-1 text-left">
                        <div className="font-medium">{place.name}</div>
                        <div className="text-sm text-gray-500 mt-1">{place.description}</div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-1">
                            <div className={`w-3 h-3 rounded-full ${getLineColor(place.line)}`} />
                            <span className="text-xs text-gray-600">
                              {place.nearestStation} (Línea {place.line})
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-600">{place.walkingTime} min caminando</span>
                          </div>
                        </div>
                        <Badge className={`mt-2 text-xs ${getCategoryColor(place.category)}`}>
                          {getCategoryLabel(place.category)}
                        </Badge>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                No se encontraron lugares que coincidan con tu búsqueda
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  )
}
