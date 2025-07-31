import { PublicLayout } from "@/components/public-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, UserCheck, Lock, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { AthletesClient } from "@/components/athletes-client"

interface Athlete {
  id: string
  name: string
  region: string
  category: string
  verificationStatus: string
  image: string
}

interface AthleteData {
  id: string
  name: string
  region: {
    name: string
  }
  category: string
  status: string
}

export default async function AthletesPage() {
  // Fetch athletes data on the server
  const athletesData = await prisma.athlete.findMany({
    include: {
      region: true
    }
  })

  // Transform data for client component
  const transformedAthletes: Athlete[] = athletesData.map((athlete) => ({
    id: athlete.id,
    name: athlete.name,
    region: athlete.region.name,
    category: athlete.category,
    verificationStatus: 'pending',
    image: "/placeholder.svg?height=400&width=400",
  }))

  // Get unique regions and categories for filters
  const uniqueRegions = [...new Set(athletesData.map(a => a.region.name))]
  const uniqueCategories = [...new Set(athletesData.map(a => a.category))]

  return (
    <PublicLayout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Atlet IKASI JABAR</h1>
            <p className="text-muted-foreground mt-2">
              Daftar atlet terdaftar di sistem IKASI JABAR
            </p>
          </div>
        </div>

        <AthletesClient 
          athletes={transformedAthletes}
          regions={uniqueRegions}
          categories={uniqueCategories}
        />
      </div>
    </PublicLayout>
  )
}