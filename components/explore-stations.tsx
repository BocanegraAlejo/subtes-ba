"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { subteData, type Station } from "@/lib/subte-data"
import { StationInfo } from "./station-info"

export function ExploreStations() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedStation, setSelectedStation] = useState<Station | null>(null)

  const allStations = Object.values(subteData.lines)
    .flat()
    .filter((station) => station.pointsOfInterest && station.pointsOfInterest.length > 0)

  const filteredStations = allStations.filter((station) => {
    const matchesSearch =
      station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.neighborhood?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.pointsOfInterest?.some((poi) => poi.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesType = selectedType === "all" || station.pointsOfInterest?.some((poi) => poi.type === selectedType)

    return matchesSearch && matchesType
  })

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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Explorar lugares de interés
          </CardTitle>
          <CardDescription>Descubrí qué hay cerca de cada estación de subte</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar por estación, barrio o lugar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="tourist">Turismo</SelectItem>
                <SelectItem value="culture">Cultura</SelectItem>
                <SelectItem value="shopping">Compras</SelectItem>
                <SelectItem value="food">Gastronomía</SelectItem>
                <SelectItem value="government">Gobierno</SelectItem>
                <SelectItem value="business">Negocios</SelectItem>
                <SelectItem value="transport">Transporte</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3 max-h-96 overflow-y-auto">
            {filteredStations.map((station) => (
              <div
                key={`${station.line}-${station.name}`}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedStation(station)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${getLineColor(station.line)}`} />
                  <div>
                    <div className="font-medium">{station.name}</div>
                    <div className="text-sm text-gray-500">
                      Línea {station.line} • {station.neighborhood}
                    </div>
                  </div>
                </div>
                <Badge variant="secondary">{station.pointsOfInterest?.length} lugares</Badge>
              </div>
            ))}
          </div>

          {filteredStations.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No se encontraron estaciones que coincidan con tu búsqueda
            </div>
          )}
        </CardContent>
      </Card>

      {selectedStation && <StationInfo station={selectedStation} />}
    </div>
  )
}
