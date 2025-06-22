import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, ShoppingBag, Palette, Utensils, TrainIcon, Landmark, Briefcase } from "lucide-react"
import type { Station, PointOfInterest } from "@/lib/subte-data"

interface StationInfoProps {
  station: Station
}

export function StationInfo({ station }: StationInfoProps) {
  const getTypeIcon = (type: PointOfInterest["type"]) => {
    const icons = {
      tourist: <MapPin className="w-4 h-4" />,
      shopping: <ShoppingBag className="w-4 h-4" />,
      culture: <Palette className="w-4 h-4" />,
      food: <Utensils className="w-4 h-4" />,
      transport: <TrainIcon className="w-4 h-4" />,
      government: <Landmark className="w-4 h-4" />,
      business: <Briefcase className="w-4 h-4" />,
    }
    return icons[type]
  }

  const getTypeColor = (type: PointOfInterest["type"]) => {
    const colors = {
      tourist: "bg-green-100 text-green-800",
      shopping: "bg-purple-100 text-purple-800",
      culture: "bg-blue-100 text-blue-800",
      food: "bg-orange-100 text-orange-800",
      transport: "bg-gray-100 text-gray-800",
      government: "bg-red-100 text-red-800",
      business: "bg-indigo-100 text-indigo-800",
    }
    return colors[type]
  }

  if (!station.pointsOfInterest || station.pointsOfInterest.length === 0) {
    return null
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Puntos de interés cerca de {station.name}
        </CardTitle>
        {station.neighborhood && <CardDescription>Barrio: {station.neighborhood}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {station.pointsOfInterest.map((poi, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className={`p-2 rounded-full ${getTypeColor(poi.type)}`}>{getTypeIcon(poi.type)}</div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{poi.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{poi.description}</p>
                <Badge variant="secondary" className="mt-2 text-xs">
                  {poi.type === "tourist" && "Turismo"}
                  {poi.type === "shopping" && "Compras"}
                  {poi.type === "culture" && "Cultura"}
                  {poi.type === "food" && "Gastronomía"}
                  {poi.type === "transport" && "Transporte"}
                  {poi.type === "government" && "Gobierno"}
                  {poi.type === "business" && "Negocios"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
