export interface Station {
  name: string
  line: string
  connections?: string[]
  pointsOfInterest?: PointOfInterest[]
  neighborhood?: string
}

export interface RouteSegment {
  line: string
  stations: string[]
}

export interface Route {
  segments: RouteSegment[]
  totalStations: number
  transfers: number
}

// Agregar interface para puntos de interés
export interface PointOfInterest {
  name: string
  type: "tourist" | "shopping" | "culture" | "food" | "transport" | "government" | "business"
  description: string
}

// Agregar interface para lugares importantes
export interface ImportantPlace {
  name: string
  nearestStation: string
  line: string
  walkingTime: number // en minutos
  description: string
  category: "shopping" | "tourist" | "culture" | "food" | "business" | "transport" | "government"
}

// DATOS ACTUALIZADOS según el mapa oficial del subte de Buenos Aires
export const subteData = {
  lines: {
    A: [
      {
        name: "Plaza de Mayo",
        line: "A",
        neighborhood: "Monserrat",
        pointsOfInterest: [
          { name: "Casa Rosada", type: "government" as const, description: "Sede del Poder Ejecutivo Nacional" },
          { name: "Cabildo", type: "culture" as const, description: "Museo histórico colonial" },
          { name: "Catedral Metropolitana", type: "culture" as const, description: "Catedral principal de Buenos Aires" },
          { name: "Plaza de Mayo", type: "tourist" as const, description: "Plaza histórica más importante de Argentina" },
        ],
      },
      { name: "Perú", line: "A", neighborhood: "Monserrat", connections: ["D", "E"] },
      { name: "Piedras", line: "A", neighborhood: "Monserrat" },
      {
        name: "Lima",
        line: "A",
        connections: ["C"],
        neighborhood: "Monserrat",
        pointsOfInterest: [
          {
            name: "Avenida de Mayo",
            type: "tourist" as const,
            description: "Avenida histórica que conecta Plaza de Mayo con Congreso",
          },
        ],
      },
      { name: "Sáenz Peña", line: "A", neighborhood: "Balvanera" },
      {
        name: "Congreso",
        line: "A",
        neighborhood: "Balvanera",
        pointsOfInterest: [
          { name: "Congreso Nacional", type: "government" as const, description: "Sede del Poder Legislativo argentino" },
          { name: "Plaza del Congreso", type: "tourist" as const, description: "Plaza histórica frente al Congreso" },
          {
            name: "Café Tortoni",
            type: "culture" as const,
            description: "Café histórico, uno de los más antiguos de Buenos Aires",
          },
        ],
      },
      { name: "Pasco", line: "A", neighborhood: "Balvanera" },
      { name: "Alberti", line: "A", neighborhood: "Balvanera" },
      { name: "Plaza Miserere", line: "A", neighborhood: "Balvanera", connections: ["H"] },
      { name: "Loria", line: "A", neighborhood: "Balvanera" },
      { name: "Castro Barros", line: "A", neighborhood: "Almagro" },
      { name: "Río de Janeiro", line: "A", neighborhood: "Caballito" },
      { name: "Acoyte", line: "A", neighborhood: "Caballito" },
      {
        name: "Primera Junta",
        line: "A",
        neighborhood: "Caballito",
        pointsOfInterest: [
          { name: "Parque Rivadavia", type: "tourist" as const, description: "Parque con feria de libros usados los domingos" },
        ],
      },
      { name: "Puan", line: "A", neighborhood: "Caballito" },
      { name: "Carabobo", line: "A", neighborhood: "Flores" },
      { name: "San José de Flores", line: "A", neighborhood: "Flores" },
      { name: "San Pedrito", line: "A", neighborhood: "Flores" },
    ],
    B: [
      {
        name: "L.N. Alem",
        line: "B",
        connections: ["E"],
        neighborhood: "Retiro",
        pointsOfInterest: [
          { name: "Puerto Madero", type: "tourist" as const, description: "Barrio moderno con restaurantes y rascacielos" },
          {
            name: "Reserva Ecológica",
            type: "tourist" as const,
            description: "Área natural protegida junto al Río de la Plata",
          },
        ],
      },
      {
        name: "Florida",
        line: "B",
        neighborhood: "Retiro",
        pointsOfInterest: [
          { name: "Calle Florida", type: "shopping" as const, description: "Peatonal comercial más famosa de Buenos Aires" },
          { name: "Galerías Pacífico", type: "shopping" as const, description: "Centro comercial histórico con cúpula pintada" },
        ],
      },
      {
        name: "C. Pellegrini",
        line: "B",
        connections: ["C"],
        neighborhood: "Recoleta",
        pointsOfInterest: [
          { name: "Obelisco", type: "tourist" as const, description: "Monumento icónico de Buenos Aires" },
          {
            name: "Teatro Colón",
            type: "culture" as const,
            description: "Uno de los teatros de ópera más importantes del mundo",
          },
          { name: "Avenida 9 de Julio", type: "tourist" as const, description: "Una de las avenidas más anchas del mundo" },
        ],
      },
      { name: "Uruguay", line: "B", neighborhood: "Balvanera" },
      {
        name: "Callao",
        line: "B",
        connections: ["D"],
        neighborhood: "Balvanera",
        pointsOfInterest: [
          { name: "Avenida Callao", type: "shopping" as const, description: "Importante avenida comercial" },
          { name: "Barrio de los Teatros", type: "culture" as const, description: "Zona con múltiples teatros" },
        ],
      },
      { name: "Pasteur - AMIA", line: "B", neighborhood: "Balvanera" },
      { name: "Pueyrredón", line: "B", connections: ["D", "H"], neighborhood: "Balvanera" },
      {
        name: "Carlos Gardel",
        line: "B",
        neighborhood: "Almagro",
        pointsOfInterest: [
          { name: "Museo Casa Carlos Gardel", type: "culture" as const, description: "Casa museo del famoso cantante de tango" },
          { name: "Shopping Abasto", type: "shopping" as const, description: "Gran centro comercial" },
        ],
      },
      { name: "Medrano", line: "B", neighborhood: "Villa Crespo" },
      { name: "Ángel Gallardo", line: "B", neighborhood: "Villa Crespo" },
      { name: "Malabia - O. Pugliese", line: "B", neighborhood: "Colegiales" },
      { name: "Dorrego", line: "B", neighborhood: "Colegiales" },
      {
        name: "F. Lacroze",
        line: "B",
        connections: ["D"],
        neighborhood: "Chacarita",
        pointsOfInterest: [
          {
            name: "Cementerio de la Chacarita",
            type: "culture" as const,
            description: "Cementerio donde descansan personalidades famosas",
          },
        ],
      },
      { name: "Tronador", line: "B", neighborhood: "Villa Ortúzar" },
      { name: "De los Incas - Parque Chas", line: "B", neighborhood: "Villa Ortúzar" },
      { name: "Echeverría", line: "B", neighborhood: "Villa Urquiza" },
      { name: "J.M. de Rosas", line: "B", neighborhood: "Villa Urquiza" },
    ],
    C: [
      {
        name: "Retiro",
        line: "C",
        connections: ["E"],
        neighborhood: "Retiro",
        pointsOfInterest: [
          { name: "Estación Retiro", type: "transport" as const, description: "Terminal de trenes y buses de larga distancia" },
          {
            name: "Torre de los Ingleses",
            type: "tourist" as const,
            description: "Torre del reloj donada por la comunidad británica",
          },
          { name: "Plaza San Martín", type: "tourist" as const, description: "Plaza histórica con el monumento a San Martín" },
        ],
      },
      { name: "General San Martín", line: "C", neighborhood: "San Nicolás" },
      {
        name: "Lavalle",
        line: "C",
        neighborhood: "San Nicolás",
        pointsOfInterest: [
          { name: "Calle Lavalle", type: "culture" as const, description: "Peatonal con cines y teatros" },
          { name: "Cine Atlas", type: "culture" as const, description: "Complejo de cines histórico" },
        ],
      },
      {
        name: "Diagonal Norte",
        line: "C",
        connections: ["D"],
        neighborhood: "San Nicolás",
        pointsOfInterest: [
          { name: "Banco Nación", type: "business" as const, description: "Sede central del Banco de la Nación Argentina" },
        ],
      },
      {
        name: "Av. de Mayo",
        line: "C",
        connections: ["A"],
        neighborhood: "Monserrat",
        pointsOfInterest: [
          { name: "Avenida de Mayo", type: "tourist" as const, description: "Avenida histórica con arquitectura europea" },
          { name: "Palacio Barolo", type: "culture" as const, description: "Edificio histórico inspirado en la Divina Comedia" },
        ],
      },
      { name: "Moreno", line: "C", neighborhood: "Monserrat" },
      { name: "Independencia", line: "C", connections: ["E"], neighborhood: "Monserrat" },
      { name: "San Juan", line: "C", neighborhood: "Constitución" },
      {
        name: "Constitución",
        line: "C",
        neighborhood: "Constitución",
        pointsOfInterest: [
          { name: "Estación Constitución", type: "transport" as const, description: "Terminal de trenes hacia el sur del país" },
        ],
      },
    ],
    D: [
      {
        name: "Catedral",
        line: "D",
        neighborhood: "San Nicolás",
        connections: ["A"],
        pointsOfInterest: [
          { name: "Catedral Metropolitana", type: "culture" as const, description: "Catedral principal de Buenos Aires" },
        ],
      },
      {
        name: "9 de Julio",
        line: "D",
        connections: ["C", "B"],
        neighborhood: "San Nicolás",
        pointsOfInterest: [
          { name: "Obelisco", type: "tourist" as const, description: "Símbolo de Buenos Aires en Av. 9 de Julio" },
        ],
      },
      {
        name: "Tribunales",
        line: "D",
        neighborhood: "Recoleta",
        pointsOfInterest: [
          { name: "Palacio de Justicia", type: "government" as const, description: "Sede del Poder Judicial" },
          { name: "Teatro Colón", type: "culture" as const, description: "Teatro de ópera más importante del mundo" },
        ],
      },
      { name: "Callao", line: "D", connections: ["B"], neighborhood: "Recoleta" },
      {
        name: "Facultad de Medicina",
        line: "D",
        neighborhood: "Recoleta",
        pointsOfInterest: [
          {
            name: "Cementerio de la Recoleta",
            type: "culture" as const,
            description: "Cementerio histórico donde descansa Eva Perón",
          },
          { name: "Museo Nacional de Bellas Artes", type: "culture" as const, description: "Principal museo de arte del país" },
        ],
      },
      { name: "Pueyrredón", line: "D", connections: ["B", "H"], neighborhood: "Recoleta" },
      { name: "Agüero", line: "D", neighborhood: "Recoleta" },
      { name: "Bulnes", line: "D", neighborhood: "Palermo" },
      { name: "Scalabrini Ortiz", line: "D", neighborhood: "Palermo" },
      {
        name: "Plaza Italia",
        line: "D",
        neighborhood: "Palermo",
        pointsOfInterest: [
          { name: "Plaza Italia", type: "tourist" as const, description: "Plaza con monumento a Giuseppe Garibaldi" },
          { name: "Palermo Soho", type: "shopping" as const, description: "Zona de diseño, bares y restaurantes" },
        ],
      },
      {
        name: "Palermo",
        line: "D",
        neighborhood: "Palermo",
        pointsOfInterest: [
          { name: "Bosques de Palermo", type: "tourist" as const, description: "Gran parque urbano con lagos y rosedal" },
          { name: "Jardín Botánico", type: "tourist" as const, description: "Jardín botánico con especies de todo el mundo" },
          { name: "Jardín Zoológico", type: "tourist" as const, description: "Zoológico histórico de la ciudad" },
        ],
      },
      { name: "Ministro Carranza", line: "D", neighborhood: "Belgrano" },
      { name: "Olleros", line: "D", neighborhood: "Belgrano" },
      { name: "José Hernández", line: "D", neighborhood: "Belgrano" },
      {
        name: "Juramento",
        line: "D",
        neighborhood: "Belgrano",
        pointsOfInterest: [
          { name: "Barrio Chino", type: "food" as const, description: "Zona con restaurantes y comercios asiáticos" },
        ],
      },
      { name: "Congreso de Tucumán", line: "D", neighborhood: "Belgrano" },
    ],
    E: [
      { name: "Plaza de los Virreyes", line: "E", neighborhood: "Flores" },
      { name: "Varela", line: "E", neighborhood: "Flores" },
      { name: "Medalla Milagrosa", line: "E", neighborhood: "Caballito" },
      { name: "Emilio Mitre", line: "E", neighborhood: "Caballito" },
      { name: "José María Moreno", line: "E", neighborhood: "Caballito" },
      { name: "Av. La Plata", line: "E", neighborhood: "Caballito" },
      {
        name: "Boedo",
        line: "E",
        neighborhood: "Boedo",
        pointsOfInterest: [
          {
            name: "Esquina Homero Manzi",
            type: "culture" as const,
            description: "Esquina famosa del tango, inmortalizada en 'Sur'",
          },
        ],
      },
      { name: "General Urquiza", line: "E", neighborhood: "Boedo" },
      { name: "Jujuy", line: "E", connections: ["H"], neighborhood: "Constitución" },
      { name: "Pichincha", line: "E", neighborhood: "Constitución" },
      { name: "Entre Ríos - Rodolfo Walsh", line: "E", neighborhood: "Constitución" },
      { name: "San José", line: "E", neighborhood: "Constitución" },
      { name: "Independencia", line: "E", connections: ["C"], neighborhood: "Monserrat" },
      { name: "Belgrano", line: "E", neighborhood: "Monserrat" },
      {
        name: "Bolívar",
        line: "E",
        connections: ["A"],
        neighborhood: "San Telmo",
        pointsOfInterest: [
          { name: "San Telmo", type: "tourist" as const, description: "Barrio histórico con feria dominical y tango" },
          { name: "Plaza Dorrego", type: "culture" as const, description: "Plaza histórica con feria de antigüedades" },
        ],
      },
      { name: "Correo Central", line: "E", neighborhood: "San Nicolás" },
      {
        name: "Catalinas",
        line: "E",
        neighborhood: "Puerto Madero",
        pointsOfInterest: [
          { name: "Puerto Madero", type: "business" as const, description: "Distrito financiero y gastronómico moderno" },
        ],
      },
      { name: "Retiro", line: "E", connections: ["C"], neighborhood: "Retiro" },
    ],
    H: [
      {
        name: "Facultad de Derecho",
        line: "H",
        neighborhood: "Recoleta",
        pointsOfInterest: [
          { name: "Facultad de Derecho UBA", type: "culture" as const, description: "Importante facultad universitaria" },
        ],
      },
      { name: "Las Heras", line: "H", neighborhood: "Recoleta" },
      {
        name: "Santa Fe - Carlos Jauregui",
        line: "H",
        connections: ["D"],
        neighborhood: "Barrio Norte",
        pointsOfInterest: [{ name: "Avenida Santa Fe", type: "shopping" as const, description: "Importante avenida comercial" }],
      },
      { name: "Córdoba", line: "H", neighborhood: "Balvanera" },
      { name: "Pueyrredón", line: "H", connections: ["B", "D"], neighborhood: "Balvanera" },
      {
        name: "Corrientes",
        line: "H",
        connections: ["B"],
        neighborhood: "San Nicolás",
        pointsOfInterest: [
          { name: "Avenida Corrientes", type: "culture" as const, description: "La calle que nunca duerme, zona de teatros" },
        ],
      },
      {
        name: "Once",
        line: "H",
        connections: ["A"],
        neighborhood: "Balvanera",
        pointsOfInterest: [
          { name: "Estación Once", type: "transport" as const, description: "Terminal de trenes hacia el oeste" },
          { name: "Mercado de Once", type: "shopping" as const, description: "Gran centro comercial mayorista" },
        ],
      },
      { name: "Venezuela", line: "H", neighborhood: "Monserrat" },
      { name: "Humberto 1°", line: "H", connections: ["E"], neighborhood: "San Telmo" },
      { name: "Inclán", line: "H", neighborhood: "Barracas" },
      { name: "Caseros", line: "H", neighborhood: "Barracas" },
      {
        name: "Parque Patricios",
        line: "H",
        neighborhood: "Parque Patricios",
        pointsOfInterest: [
          {
            name: "Parque de los Patricios",
            type: "tourist" as const,
            description: "Parque urbano con actividades recreativas",
          },
        ],
      },
      { name: "Hospitales", line: "H", neighborhood: "Parque Patricios" },
    ],
  },
}

// Actualizar lugares importantes con estaciones correctas
export const importantPlaces: ImportantPlace[] = [
  // Shopping Centers
  {
    name: "Shopping Abasto",
    nearestStation: "Carlos Gardel",
    line: "B",
    walkingTime: 3,
    description: "Gran centro comercial en el barrio de Almagro",
    category: "shopping",
  },
  {
    name: "Galerías Pacífico",
    nearestStation: "Florida",
    line: "B",
    walkingTime: 2,
    description: "Centro comercial histórico en pleno centro",
    category: "shopping",
  },
  {
    name: "Alto Palermo Shopping",
    nearestStation: "Bulnes",
    line: "D",
    walkingTime: 5,
    description: "Shopping en Palermo",
    category: "shopping",
  },

  // Lugares turísticos
  {
    name: "Casa Rosada",
    nearestStation: "Plaza de Mayo",
    line: "A",
    walkingTime: 2,
    description: "Sede del gobierno nacional",
    category: "government",
  },
  {
    name: "Obelisco",
    nearestStation: "C. Pellegrini",
    line: "B",
    walkingTime: 3,
    description: "Monumento icónico de Buenos Aires",
    category: "tourist",
  },
  {
    name: "Teatro Colón",
    nearestStation: "Tribunales",
    line: "D",
    walkingTime: 2,
    description: "Teatro de ópera mundialmente famoso",
    category: "culture",
  },
  {
    name: "Cementerio de la Recoleta",
    nearestStation: "Facultad de Medicina",
    line: "D",
    walkingTime: 8,
    description: "Cementerio histórico donde descansa Eva Perón",
    category: "culture",
  },
  {
    name: "Caminito",
    nearestStation: "Constitución",
    line: "C",
    walkingTime: 15,
    description: "Calle museo en La Boca (requiere colectivo desde Constitución)",
    category: "tourist",
  },
  {
    name: "Puerto Madero",
    nearestStation: "L.N. Alem",
    line: "B",
    walkingTime: 10,
    description: "Distrito moderno con restaurantes y rascacielos",
    category: "business",
  },
  {
    name: "San Telmo",
    nearestStation: "Bolívar",
    line: "E",
    walkingTime: 5,
    description: "Barrio histórico con feria dominical",
    category: "tourist",
  },
  {
    name: "Palermo Soho",
    nearestStation: "Plaza Italia",
    line: "D",
    walkingTime: 8,
    description: "Zona de diseño, bares y restaurantes",
    category: "shopping",
  },
  {
    name: "Mercado de San Telmo",
    nearestStation: "Bolívar",
    line: "E",
    walkingTime: 7,
    description: "Mercado histórico con antigüedades",
    category: "shopping",
  },
  {
    name: "Jardín Botánico",
    nearestStation: "Plaza Italia",
    line: "D",
    walkingTime: 10,
    description: "Jardín botánico con especies de todo el mundo",
    category: "tourist",
  },
  {
    name: "Bosques de Palermo",
    nearestStation: "Palermo",
    line: "D",
    walkingTime: 5,
    description: "Gran parque urbano con lagos y rosedal",
    category: "tourist",
  },
  {
    name: "Barrio Chino",
    nearestStation: "Juramento",
    line: "D",
    walkingTime: 8,
    description: "Zona con restaurantes y comercios asiáticos",
    category: "food",
  },
  {
    name: "Calle Florida",
    nearestStation: "Florida",
    line: "B",
    walkingTime: 1,
    description: "Peatonal comercial más famosa de Buenos Aires",
    category: "shopping",
  },
  {
    name: "Avenida Corrientes",
    nearestStation: "Corrientes",
    line: "H",
    walkingTime: 2,
    description: "La calle que nunca duerme, zona de teatros",
    category: "culture",
  },
  {
    name: "Once",
    nearestStation: "Once",
    line: "H",
    walkingTime: 3,
    description: "Gran centro comercial mayorista",
    category: "shopping",
  },
  {
    name: "Congreso Nacional",
    nearestStation: "Congreso",
    line: "A",
    walkingTime: 3,
    description: "Sede del Poder Legislativo argentino",
    category: "government",
  },
  {
    name: "Café Tortoni",
    nearestStation: "Av. de Mayo",
    line: "C",
    walkingTime: 3,
    description: "Café histórico, uno de los más antiguos de Buenos Aires",
    category: "culture",
  },
]

// Reemplazar completamente la función findRoute con esta versión que maneja las conexiones especiales correctamente:

export function findRoute(origin: string, destination: string): Route | null {
  console.log(`🚇 Buscando ruta de ${origin} a ${destination}`)

  if (origin === destination) return null

  // Definir todas las conexiones del sistema
  const stationConnections: { [stationName: string]: { [line: string]: string[] } } = {
    Perú: { A: ["D", "E"], D: ["A", "E"], E: ["A", "D"] },
    Lima: { A: ["C"], C: ["A"] },
    "Plaza Miserere": { A: ["H"], H: ["A"] },
    "C. Pellegrini": { B: ["C"], C: ["B"] },
    Callao: { B: ["D"], D: ["B"] },
    Pueyrredón: { B: ["D", "H"], D: ["B", "H"], H: ["B", "D"] },
    "F. Lacroze": { B: ["D"], D: ["B"] },
    Corrientes: { B: ["H"], H: ["B"] },
    Retiro: { C: ["E"], E: ["C"] },
    "Diagonal Norte": { C: ["D"], D: ["C"] },
    "Av. de Mayo": { C: ["A"], A: ["C"] },
    Independencia: { C: ["E"], E: ["C"] },
    "9 de Julio": { D: ["C", "B"], C: ["D", "B"], B: ["D", "C"] },
    "Santa Fe - Carlos Jauregui": { D: ["H"], H: ["D"] },
    Once: { H: ["A"], A: ["H"] },
    Bolívar: { A: ["E"], E: ["A"] },
    Catedral: { A: ["D"], D: ["A"] },
    "L.N. Alem": { B: ["E"], E: ["B"] },
  }

  // Conexiones especiales entre estaciones cercanas
  const specialConnections: { [key: string]: Array<{ station: string; line: string; cost: number }> } = {
    "Jujuy-E": [{ station: "Humberto 1°", line: "H", cost: 0 }], // Sin costo adicional para conexión peatonal
    "Humberto 1°-H": [{ station: "Jujuy", line: "E", cost: 0 }],
  }

  // BFS con manejo de conexiones especiales
  interface QueueItem {
    station: string
    line: string
    distance: number
    transfers: number
    path: Array<{ station: string; line: string }>
  }

  const queue: QueueItem[] = []
  const visited = new Set<string>()
  let bestRoute: Route | null = null

  // Empezar desde todas las líneas que pasan por la estación origen
  const allStations = Object.values(subteData.lines).flat()
  const originStations = allStations.filter((s) => s.name === origin)

  console.log(
    `📍 Estaciones origen:`,
    originStations.map((s) => `${s.name} (${s.line})`),
  )

  for (const originStation of originStations) {
    queue.push({
      station: origin,
      line: originStation.line,
      distance: 0,
      transfers: 0,
      path: [{ station: origin, line: originStation.line }],
    })
  }

  let iterations = 0
  const maxIterations = 1000

  while (queue.length > 0 && iterations < maxIterations) {
    iterations++

    // Ordenar por calidad: menos distancia total, luego menos transbordos
    queue.sort((a, b) => {
      const totalA = a.distance + (a.transfers * 2) // Penalizar transbordos
      const totalB = b.distance + (b.transfers * 2)
      if (totalA !== totalB) return totalA - totalB
      return a.transfers - b.transfers
    })

    const current = queue.shift()!
    const visitKey = `${current.station}-${current.line}`

    if (visited.has(visitKey)) continue
    visited.add(visitKey)

    console.log(`🔄 ${current.station} (${current.line}) - T:${current.transfers} D:${current.distance}`)

    // Si llegamos al destino
    if (current.station === destination) {
      console.log("✅ Ruta encontrada:", current.path)
      const route = buildRouteFromPath(current.path)
      if (route) {
        if (
          !bestRoute ||
          route.totalStations < bestRoute.totalStations ||
          (route.totalStations === bestRoute.totalStations && route.transfers < bestRoute.transfers)
        ) {
          bestRoute = route
          console.log("🏆 Nueva mejor ruta:", route)

          // Si encontramos una ruta muy buena, continuamos buscando un poco más
          if (route.totalStations <= 12 && route.transfers <= 2) {
            // Continuar buscando por un poco más para encontrar rutas aún mejores
            if (iterations > 200) return route
          }
        }
      }
      continue
    }

    // Limitar búsqueda - más estricto para forzar rutas cortas
    if (current.transfers > 2 || current.distance > 15) continue

    // 1. Explorar estaciones en la misma línea
    const lineStations = subteData.lines[current.line as keyof typeof subteData.lines]
    if (lineStations) {
      const currentIndex = lineStations.findIndex((s) => s.name === current.station)

      // Estación anterior
      if (currentIndex > 0) {
        const prevStation = lineStations[currentIndex - 1]
        const prevKey = `${prevStation.name}-${current.line}`
        if (!visited.has(prevKey)) {
          queue.push({
            station: prevStation.name,
            line: current.line,
            distance: current.distance + 1,
            transfers: current.transfers,
            path: [...current.path, { station: prevStation.name, line: current.line }],
          })
        }
      }

      // Estación siguiente
      if (currentIndex < lineStations.length - 1) {
        const nextStation = lineStations[currentIndex + 1]
        const nextKey = `${nextStation.name}-${current.line}`
        if (!visited.has(nextKey)) {
          queue.push({
            station: nextStation.name,
            line: current.line,
            distance: current.distance + 1,
            transfers: current.transfers,
            path: [...current.path, { station: nextStation.name, line: current.line }],
          })
        }
      }
    }

    const connections = stationConnections[current.station]
    if (connections && connections[current.line]) {
      console.log(`🔄 Transbordos en ${current.station}:`, connections[current.line])

      for (const targetLine of connections[current.line]) {
        const transferKey = `${current.station}-${targetLine}`
        if (!visited.has(transferKey)) {
          queue.push({
            station: current.station,
            line: targetLine,
            distance: current.distance,
            transfers: current.transfers + 1,
            path: [...current.path, { station: current.station, line: targetLine }],
          })
        }
      }
    }

    // 2. Explorar conexiones especiales (antes que transbordos normales para priorizarlas)
    const specialKey = `${current.station}-${current.line}`
    const specialConns = specialConnections[specialKey]
    if (specialConns) {
      console.log(`🔗 Conexiones especiales en ${current.station}:`, specialConns)

      for (const conn of specialConns) {
        const connKey = `${conn.station}-${conn.line}`
        if (!visited.has(connKey)) {
          console.log(`🚶 Conexión especial: ${current.station} (${current.line}) → ${conn.station} (${conn.line})`)
          queue.push({
            station: conn.station,
            line: conn.line,
            distance: current.distance + conn.cost,
            transfers: current.transfers + 1,
            path: [...current.path, { station: conn.station, line: conn.line }],
          })
        }
      }
    }

    // 3. Explorar transbordos normales
  }

  console.log(`🔍 Iteraciones: ${iterations}`)
  return bestRoute
}

function findDirectRoute(origin: string, destination: string): Route | null {
  const allStations = Object.values(subteData.lines).flat()

  for (const [lineName, stations] of Object.entries(subteData.lines)) {
    const originIndex = stations.findIndex((s) => s.name === origin)
    const destIndex = stations.findIndex((s) => s.name === destination)

    if (originIndex !== -1 && destIndex !== -1) {
      const start = Math.min(originIndex, destIndex)
      const end = Math.max(originIndex, destIndex)
      const stationNames = stations.slice(start, end + 1).map((s) => s.name)

      if (originIndex > destIndex) {
        stationNames.reverse()
      }

      return {
        segments: [
          {
            line: lineName,
            stations: stationNames,
          },
        ],
        totalStations: stationNames.length,
        transfers: 0,
      }
    }
  }

  return null
}

function findOneTransferRoutes(origin: string, destination: string): Route[] {
  const routes: Route[] = []
  const connections = {
    Perú: { A: ["D", "E"], D: ["A", "E"], E: ["A", "D"] },
    "Plaza Miserere": { A: ["H"], H: ["A"] },
    "C. Pellegrini": { B: ["C"], C: ["B"] },
    Callao: { B: ["D"], D: ["B"] },
    Pueyrredón: { B: ["D", "H"], D: ["B", "H"], H: ["B", "D"] },
    Corrientes: { B: ["H"], H: ["B"] },
    Retiro: { C: ["E"], E: ["C"] },
    "Diagonal Norte": { C: ["D"], D: ["C"] },
    "Av. de Mayo": { C: ["A"], A: ["C"] },
    Independencia: { C: ["E"], E: ["C"] },
    "9 de Julio": { D: ["C", "B"], C: ["D", "B"], B: ["D", "C"] },
    "Santa Fe - Carlos Jauregui": { D: ["H"], H: ["D"] },
    Once: { H: ["A"], A: ["H"] },
    Bolívar: { A: ["E"], E: ["A"] },
    Catedral: { A: ["D"], D: ["A"] },
    "L.N. Alem": { B: ["E"], E: ["B"] },
    Lima: { A: ["C"], C: ["A"] },
    "F. Lacroze": { B: ["D"], D: ["B"] },
  }

  // Conexiones especiales
  const specialConnections = {
    Jujuy: [{ station: "Humberto 1°", line: "H" }],
    "Humberto 1°": [{ station: "Jujuy", line: "E" }],
  }

  // Buscar rutas con 1 transbordo en estaciones de conexión
  for (const [transferStation, lineConnections] of Object.entries(connections)) {
    for (const [fromLine, toLines] of Object.entries(lineConnections)) {
      for (const toLine of toLines) {
        // Verificar si podemos ir de origin a transferStation en fromLine
        const segment1 = getSegmentBetweenStations(origin, transferStation, fromLine)
        if (!segment1) continue

        // Verificar si podemos ir de transferStation a destination en toLine
        const segment2 = getSegmentBetweenStations(transferStation, destination, toLine)
        if (!segment2) continue

        routes.push({
          segments: [segment1, segment2],
          totalStations: segment1.stations.length + segment2.stations.length - 1, // -1 porque transferStation se cuenta dos veces
          transfers: 1,
        })
      }
    }
  }

  // Buscar rutas con conexiones especiales
  for (const [specialStation, connections] of Object.entries(specialConnections)) {
    for (const conn of connections) {
      // Ruta: origin → specialStation → conn.station → destination
      const allStations = Object.values(subteData.lines).flat()
      const specialStationData = allStations.find((s) => s.name === specialStation)
      const connStationData = allStations.find((s) => s.name === conn.station && s.line === conn.line)

      if (specialStationData && connStationData) {
        const segment1 = getSegmentBetweenStations(origin, specialStation, specialStationData.line)
        const segment2 = getSegmentBetweenStations(conn.station, destination, conn.line)

        if (segment1 && segment2) {
          routes.push({
            segments: [segment1, { line: conn.line, stations: [conn.station] }, segment2],
            totalStations: segment1.stations.length + segment2.stations.length,
            transfers: 2,
          })
        }
      }
    }
  }

  return routes
}

function findTwoTransferRoutes(origin: string, destination: string): Route[] {
  // Implementación simplificada para rutas con 2 transbordos
  // Por ahora retornamos array vacío para mantener el código simple
  return []
}

function getSegmentBetweenStations(start: string, end: string, line: string): RouteSegment | null {
  const lineStations = subteData.lines[line as keyof typeof subteData.lines]
  if (!lineStations) return null

  const startIndex = lineStations.findIndex((s) => s.name === start)
  const endIndex = lineStations.findIndex((s) => s.name === end)

  if (startIndex === -1 || endIndex === -1) return null

  const minIndex = Math.min(startIndex, endIndex)
  const maxIndex = Math.max(startIndex, endIndex)
  const stations = lineStations.slice(minIndex, maxIndex + 1)

  // Si necesitamos ir en dirección inversa
  if (startIndex > endIndex) {
    stations.reverse()
  }

  return {
    line,
    stations: stations.map((s) => s.name),
  }
}

// En la función getAllPointsOfInterest, cambiar el return para evitar duplicados:
export function getAllPointsOfInterest(): Array<{ poi: PointOfInterest; station: Station }> {
  const allStations = Object.values(subteData.lines).flat()
  const allPois: Array<{ poi: PointOfInterest; station: Station }> = []

  allStations.forEach((station) => {
    if (station.pointsOfInterest) {
      station.pointsOfInterest.forEach((poi) => {
        allPois.push({ poi, station })
      })
    }
  })

  return allPois.sort((a, b) => a.poi.name.localeCompare(b.poi.name))
}

function buildRouteFromPath(path: Array<{ station: string; line: string }>): Route | null {
  if (!path || path.length < 2) {
    console.warn("Ruta inválida:", path)
    return null
  }

  console.log("🛤️ Construyendo ruta desde path:", path)

  const segments: RouteSegment[] = []
  let currentSegment: RouteSegment | null = null
  let totalStations = 0
  let transfers = 0

  for (let i = 0; i < path.length; i++) {
    const current = path[i]
    const previous = i > 0 ? path[i - 1] : null

    // Si es el primer elemento o cambió de línea
    if (!currentSegment || (previous && current.line !== previous.line)) {
      // Guardar el segmento anterior si existe
      if (currentSegment) {
        console.log("📍 Segmento completado:", currentSegment)
        segments.push(currentSegment)
      }
      
      // Crear nuevo segmento
      currentSegment = { line: current.line, stations: [current.station] }
      console.log("🆕 Nuevo segmento iniciado:", currentSegment)
      
      if (segments.length > 0) {
        transfers++
      }
    } else {
      // Agregar estación al segmento actual solo si no es la misma estación
      if (currentSegment.stations[currentSegment.stations.length - 1] !== current.station) {
        currentSegment.stations.push(current.station)
        console.log("➕ Estación agregada:", current.station, "al segmento línea", current.line)
      }
    }
  }

  // Agregar el último segmento
  if (currentSegment) {
    console.log("📍 Último segmento:", currentSegment)
    segments.push(currentSegment)
  }

  totalStations = path.length
  transfers = segments.length - 1

  console.log("🏁 Ruta final construida:", { segments, totalStations, transfers })

  return {
    segments,
    totalStations,
    transfers,
  }
}

// Función para obtener la dirección de una línea
export function getLineDirection(line: string, stations: string[]): string {
  console.log(`🧭 Calculando dirección para línea ${line}, estaciones:`, stations)
  
  // Terminales en orden: [primera_estación_del_array, última_estación_del_array]
  const terminals: { [key: string]: [string, string] } = {
    A: ["Plaza de Mayo", "San Pedrito"],                    // 0 → último
    B: ["L.N. Alem", "J.M. de Rosas"],                     // 0 → último  
    C: ["Retiro", "Constitución"],                         // 0 → último
    D: ["Catedral", "Congreso de Tucumán"],                // 0 → último
    E: ["Plaza de los Virreyes", "Retiro"],                // 0 → último
    H: ["Facultad de Derecho", "Hospitales"],              // 0 → último (Facultad=norte, Hospitales=sur)
  }

  // Verificar que la línea exista
  if (!terminals[line]) {
    console.warn(`⚠️ Línea ${line} no encontrada en terminales`)
    return ""
  }

  // Si solo hay una estación, intentar determinar dirección por contexto
  if (stations.length < 2) {
    console.warn(`⚠️ Menos de 2 estaciones para línea ${line}:`, stations)
    return ""
  }

  const [terminal1, terminal2] = terminals[line]
  
  // Obtener todas las estaciones de la línea para determinar la dirección
  const lineStations = subteData.lines[line as keyof typeof subteData.lines]
  if (!lineStations) {
    console.warn(`⚠️ No se encontraron estaciones para línea ${line}`)
    return ""
  }

  // Filtrar solo las estaciones que realmente pertenecen a esta línea
  const validStations = stations.filter(station => 
    lineStations.some(s => s.name === station)
  )
  
  console.log(`🔍 Estaciones válidas para línea ${line}:`, validStations)
  
  if (validStations.length < 2) {
    console.warn(`⚠️ No hay suficientes estaciones válidas para línea ${line}`)
    return ""
  }

  const startStation = validStations[0]
  const endStation = validStations[validStations.length - 1]

  console.log(`📍 Estación inicial: ${startStation}, final: ${endStation}`)

  const startIndex = lineStations.findIndex(s => s.name === startStation)
  const endIndex = lineStations.findIndex(s => s.name === endStation)

  console.log(`📊 Índice inicial: ${startIndex}, índice final: ${endIndex}`)

  // Si no encontramos las estaciones, intentar con lógica alternativa
  if (startIndex === -1 || endIndex === -1) {
    console.warn(`⚠️ No se encontraron índices para ${startStation} (${startIndex}) o ${endStation} (${endIndex})`)
    return ""
  }

  // Lógica principal: si el índice final es mayor que el inicial, vamos hacia la terminal 2
  let direction: string
  
  if (endIndex > startIndex) {
    // Va hacia adelante en el array = hacia terminal2
    direction = terminal2
    console.log(`➡️ Va hacia adelante (${startIndex} → ${endIndex}): ${direction}`)
  } else if (endIndex < startIndex) {
    // Va hacia atrás en el array = hacia terminal1  
    direction = terminal1
    console.log(`⬅️ Va hacia atrás (${startIndex} → ${endIndex}): ${direction}`)
  } else {
    // Si son iguales (misma estación), usar la estación más cercana al final de la línea
    const totalStations = lineStations.length
    const midPoint = totalStations / 2
    direction = startIndex < midPoint ? terminal2 : terminal1
    console.log(`🔄 Misma estación, usando punto medio: ${direction}`)
  }
  
  console.log(`✅ Dirección calculada: ${direction}`)
  return `dirección ${direction}`
}
