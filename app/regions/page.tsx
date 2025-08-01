import { PublicLayout } from "@/components/public-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MapPin, Users, Trophy, Swords, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { prisma } from "@/lib/prisma"
import { RegionsClient } from "@/components/regions-client"

interface Region {
  id: string
  name: string
  image: string
  athletes: number
  clubs: number
  description: string
}

interface RegionData {
  id: string
  name: string
  _count: {
    athletes: number
  }
}

export default async function RegionsPage() {
  // Fetch regions data on the server with error handling
  let regionsData: any[] = []

  try {
    regionsData = await prisma.region.findMany({
      include: {
        _count: {
          select: {
            athletes: true
          }
        }
      },
      orderBy: {
        name: "asc",
      },
    })
  } catch (error) {
    console.error('Database connection error:', error)
    // Use empty array if database is not available
    regionsData = []
  }

  // Transform data for client component
  const transformedRegions: Region[] = regionsData.map((region) => ({
    id: region.id,
    name: region.name,
    image: region.image ? `${region.image}?f_auto,q_100` : `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(region.name)}`,
    athletes: region._count.athletes,
    clubs: Math.floor(region._count.athletes / 5) + 1,
    description: region.description || `Pusat anggar IKASI ${region.name} dengan ${region._count.athletes} atlet terdaftar.`,
  }))

  return (
    <PublicLayout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Wilayah IKASI JABAR</h1>
            <p className="text-muted-foreground mt-2">
              Daftar wilayah terdaftar di sistem IKASI JABAR
            </p>
          </div>
        </div>

        <RegionsClient regions={transformedRegions} />
      </div>
    </PublicLayout>
  )
}