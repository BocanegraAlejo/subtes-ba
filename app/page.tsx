"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, ArrowRight, Train } from "lucide-react"
import { subteData, findRoute, getLineDirection, type Route } from "@/lib/subte-data"
// Agregar import para el nuevo componente
import { StationInfo } from "@/components/station-info"
// Agregar import para el componente de exploración
import { ExploreStations } from "@/components/explore-stations"
// Agregar import para el nuevo componente
import { PlaceSelector } from "@/components/place-selector"

export default function SubteApp() {
  const [origin, setOrigin] = useState<string>("")
  const [destination, setDestination] = useState<string>("")
  const [route, setRoute] = useState<Route | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  // Agregar estado para controlar qué vista mostrar
  const [currentView, setCurrentView] = useState<"planner" | "explore">("planner")
  // En el estado del componente, agregar:
  const [selectedOriginPlace, setSelectedOriginPlace] = useState<string>("")
  const [selectedDestinationPlace, setSelectedDestinationPlace] = useState<string>("")

  const handleCalculateRoute = () => {
    if (!origin || !destination) {
      alert("Por favor selecciona origen y destino")
      return
    }

    if (origin === destination) {
      alert("El origen y destino no pueden ser iguales")
      return
    }

    setIsCalculating(true)

    // Simular un pequeño delay para mostrar el loading
    setTimeout(() => {
      try {
        const calculatedRoute = findRoute(origin, destination)
        console.log("Ruta calculada:", calculatedRoute) // Para debug
        setRoute(calculatedRoute)

        if (!calculatedRoute) {
          alert("No se pudo encontrar una ruta entre estas estaciones. Intenta con otras estaciones.")
        }
      } catch (error) {
        console.error("Error calculando ruta:", error)
        alert("Hubo un error calculando la ruta")
      }
      setIsCalculating(false)
    }, 500)
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

  const allStations = Object.values(subteData.lines)
    .flat()
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
              <Train className="w-6 h-6 text-black font-bold" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Subte BA</h1>
          </div>
          <p className="text-gray-600">Navegá el subte de Buenos Aires fácilmente</p>
        </div>

        {/* Navigation */}
        <div className="flex gap-2 justify-center">
          <Button variant={currentView === "planner" ? "default" : "outline"} onClick={() => setCurrentView("planner")}>
            Planificar viaje
          </Button>
          <Button variant={currentView === "explore" ? "default" : "outline"} onClick={() => setCurrentView("explore")}>
            Explorar lugares
          </Button>
        </div>

        {currentView === "planner" ? (
          <>
            {/* Route Planner - código existente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="w-5 h-5" />
                  Planificá tu viaje
                </CardTitle>
                <CardDescription>Seleccioná tu estación de origen y destino</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Reemplazar los Select de origen y destino con: */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-600" />
                      Desde
                    </label>
                    <div className="space-y-2">
                      <PlaceSelector
                        placeholder="Buscar lugar de origen (ej: Shopping Abasto)"
                        onPlaceSelect={(stationName, placeName) => {
                          setOrigin(stationName)
                          setSelectedOriginPlace(placeName)
                        }}
                        selectedPlace={selectedOriginPlace}
                      />
                      <Select
                        value={origin}
                        onValueChange={(value) => {
                          setOrigin(value)
                          setSelectedOriginPlace("")
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="O seleccionar estación directamente" />
                        </SelectTrigger>
                        <SelectContent>
                          {allStations.map((station) => (
                            <SelectItem key={`${station.line}-${station.name}`} value={station.name}>
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${getLineColor(station.line)}`} />
                                {station.name} (Línea {station.line})
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-600" />
                      Hasta
                    </label>
                    <div className="space-y-2">
                      <PlaceSelector
                        placeholder="Buscar lugar de destino (ej: Teatro Colón)"
                        onPlaceSelect={(stationName, placeName) => {
                          setDestination(stationName)
                          setSelectedDestinationPlace(placeName)
                        }}
                        selectedPlace={selectedDestinationPlace}
                      />
                      <Select
                        value={destination}
                        onValueChange={(value) => {
                          setDestination(value)
                          setSelectedDestinationPlace("")
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="O seleccionar estación directamente" />
                        </SelectTrigger>
                        <SelectContent>
                          {allStations.map((station) => (
                            <SelectItem key={`${station.line}-${station.name}`} value={station.name}>
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${getLineColor(station.line)}`} />
                                {station.name} (Línea {station.line})
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    console.log("Botón clickeado")
                    console.log("Origen:", origin)
                    console.log("Destino:", destination)
                    handleCalculateRoute()
                  }}
                  disabled={!origin || !destination || isCalculating}
                  className="w-full"
                >
                  {isCalculating ? "Calculando ruta..." : "Calcular ruta"}
                </Button>
              </CardContent>
            </Card>

            {/* Route Results */}
            {route && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Train className="w-5 h-5" />
                      Tu ruta
                    </CardTitle>
                    <CardDescription>
                      {route.totalStations} estaciones • {route.transfers} transbordo{route.transfers !== 1 ? "s" : ""}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {route.segments.map((segment, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center gap-3">
                            <Badge className={`${getLineColor(segment.line)} text-white`}>
                              Línea {segment.line} {getLineDirection(segment.line, segment.stations)}
                            </Badge>
                            <span className="text-sm text-gray-600">{segment.stations.length} estaciones</span>
                          </div>

                          <div className="ml-4 space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 bg-green-500 rounded-full" />
                              <span className="font-medium">{segment.stations[0]}</span>
                              <span className="text-gray-500">→ Subir</span>
                            </div>

                            {segment.stations.slice(1, -1).map((station, stationIndex) => (
                              <div key={stationIndex} className="flex items-center gap-2 text-sm text-gray-600 ml-4">
                                <div className="w-1 h-1 bg-gray-400 rounded-full" />
                                {station}
                              </div>
                            ))}

                            <div className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 bg-red-500 rounded-full" />
                              <span className="font-medium">{segment.stations[segment.stations.length - 1]}</span>
                              <span className="text-gray-500">
                                → {index === route.segments.length - 1 ? "Bajar" : "Transbordar"}
                              </span>
                            </div>
                          </div>

                          {index < route.segments.length - 1 && (
                            <div className="flex items-center gap-2 my-3 p-2 bg-yellow-50 rounded-lg">
                              <ArrowRight className="w-4 h-4 text-yellow-600" />
                              <span className="text-sm font-medium text-yellow-800">
                                Transbordar a Línea {route.segments[index + 1].line} {getLineDirection(route.segments[index + 1].line, route.segments[index + 1].stations)}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Información de puntos de interés */}
                {(() => {
                  const allStations = Object.values(subteData.lines).flat()
                  const originStation = allStations.find((s) => s.name === origin)
                  const destinationStation = allStations.find((s) => s.name === destination)

                  return (
                    <div className="space-y-4">
                      {originStation && <StationInfo station={originStation} />}
                      {destinationStation && originStation?.name !== destinationStation?.name && (
                        <StationInfo station={destinationStation} />
                      )}
                    </div>
                  )
                })()}
              </>
            )}

            {/* Info Card */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Train className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-blue-900">Consejos para viajar</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Comprá tu tarjeta SUBE en cualquier estación</li>
                      <li>• Las estaciones con múltiples líneas permiten transbordar</li>
                      <li>• Seguí las señalizaciones en las estaciones</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <ExploreStations />
        )}
      </div>
    </div>
  )
}
