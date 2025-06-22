"use client"

// No existing code provided. Assuming this is a new file.

// SmartLocationSelector.tsx
import type React from "react"
import { Badge } from "./ui/badge"

interface LocationOption {
  type: "station" | "poi"
  label: string
  value: string
  station: {
    name: string
    line: string
    neighborhood?: string
  }
  poi?: {
    type: "tourist" | "shopping" | "culture" | "food" | "transport" | "government" | "business"
  }
}

interface SmartLocationSelectorProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  onValueChange: (value: string) => void
  setShowSearch: (show: boolean) => void
  options: LocationOption[]
}

const getLineColor = (line: string) => {
  switch (line) {
    case "1":
      return "bg-sky-500"
    case "2":
      return "bg-red-500"
    case "3":
      return "bg-yellow-500"
    case "4":
      return "bg-green-500"
    case "5":
      return "bg-violet-500"
    case "6":
      return "bg-teal-500"
    case "7":
      return "bg-orange-500"
    case "8":
      return "bg-pink-500"
    case "9":
      return "bg-lime-500"
    case "A":
      return "bg-blue-500"
    case "B":
      return "bg-gray-500"
    case "C":
      return "bg-amber-500"
    case "D":
      return "bg-fuchsia-500"
    case "E":
      return "bg-emerald-500"
    case "H":
      return "bg-cyan-500"
    case "P":
      return "bg-rose-500"
    default:
      return "bg-gray-300"
  }
}

const SmartLocationSelector: React.FC<SmartLocationSelectorProps> = ({
  searchTerm,
  setSearchTerm,
  onValueChange,
  setShowSearch,
  options,
}) => {
  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      {filteredOptions.map((option, index) => (
        <div
          key={`${option.type}-${option.value}-${option.station.line}-${index}`}
          className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
          onClick={() => {
            onValueChange(option.station.name)
            setShowSearch(false)
            setSearchTerm("")
          }}
        >
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${getLineColor(option.station.line)}`} />
            <div className="flex-1">
              <div className="font-medium text-sm">
                {option.type === "station" ? `${option.label} (Línea ${option.station.line})` : option.label}
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-2">
                {option.type === "poi" ? (
                  <>
                    <Badge variant="secondary" className="text-xs">
                      {option.poi?.type === "tourist" && "Turismo"}
                      {option.poi?.type === "shopping" && "Compras"}
                      {option.poi?.type === "culture" && "Cultura"}
                      {option.poi?.type === "food" && "Gastronomía"}
                      {option.poi?.type === "transport" && "Transporte"}
                      {option.poi?.type === "government" && "Gobierno"}
                      {option.poi?.type === "business" && "Negocios"}
                    </Badge>
                    <span>
                      cerca de {option.station.name} (Línea {option.station.line})
                    </span>
                  </>
                ) : (
                  <span>Estación Línea {option.station.line}</span>
                )}
                {option.station.neighborhood && <span>• {option.station.neighborhood}</span>}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SmartLocationSelector
