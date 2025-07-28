"use client"

import { PublicLayout } from "@/components/public-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, UserCheck, Lock, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

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

export default function AthletesPage() {
  const [athletesData, setAthletesData] = useState<AthleteData[]>([])
  const [filteredAthletes, setFilteredAthletes] = useState<Athlete[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [regionFilter, setRegionFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  // Fetch athletes from API
  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const response = await fetch('/api/athletes')
        const data = await response.json()
        setAthletesData(data)
        
        // Transform data to match existing layout
        const transformedAthletes = data.map((athlete: AthleteData) => ({
          id: athlete.id,
          name: athlete.name,
          region: athlete.region.name,
          category: athlete.category,
          verificationStatus: 'pending',
          image: "/placeholder.svg?height=400&width=400",
        }))
        
        setFilteredAthletes(transformedAthletes)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching athletes:', error)
        setLoading(false)
      }
    }

    fetchAthletes()
  }, [])

  // Filter athletes based on search and filters
  useEffect(() => {
    let filtered = athletesData.map((athlete: AthleteData) => ({
      id: athlete.id,
      name: athlete.name,
      region: athlete.region.name,
      category: athlete.category,
      verificationStatus: 'pending',
      image: "/placeholder.svg?height=400&width=400",
    }))

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(athlete =>
        athlete.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Region filter
    if (regionFilter !== "all") {
      filtered = filtered.filter(athlete =>
        athlete.region.toLowerCase() === regionFilter.toLowerCase()
      )
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(athlete =>
        athlete.category.toLowerCase() === categoryFilter.toLowerCase()
      )
    }

    setFilteredAthletes(filtered)
  }, [athletesData, searchTerm, regionFilter, categoryFilter])

  // Get unique regions and categories for filter options
  const getUniqueRegions = () => {
    const regions = athletesData.map(athlete => athlete.region.name)
    return [...new Set(regions)]
  }

  const getUniqueCategories = () => {
    const categories = athletesData.map(athlete => athlete.category)
    return [...new Set(categories)]
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const handleRegionFilter = (value: string) => {
    setRegionFilter(value)
  }

  const handleCategoryFilter = (value: string) => {
    setCategoryFilter(value)
  }

  if (loading) {
    return (
      <PublicLayout>
        <div className="container py-12 sm:py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading athletes...</p>
          </div>
        </div>
      </PublicLayout>
    )
  }

  return (
    <PublicLayout>
      <div className="container py-12 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Galeri Atlet Jawa Barat</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Jelajahi profil para atlet anggar berbakat dari seluruh penjuru Jawa Barat.
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="p-4 mb-8 bg-card/80 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Cari nama atlet..." 
                className="pl-10 bg-background/50"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <div>
              <Select value={regionFilter} onValueChange={handleRegionFilter}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Filter per Wilayah" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Wilayah</SelectItem>
                  {getUniqueRegions().map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={categoryFilter} onValueChange={handleCategoryFilter}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Filter per Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  {getUniqueCategories().map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Athletes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAthletes.slice(0, 12).map((athlete) => (
            <Card
              key={athlete.id}
              className="overflow-hidden group border-border/60 hover:border-primary/80 transition-colors duration-300"
            >
              <Link href={`/athletes/${athlete.id}`} className="block">
                <div className="relative h-80 w-full">
                  <Image
                    src={athlete.image || "/placeholder.svg"}
                    alt={athlete.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary">{athlete.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg truncate">{athlete.name}</h3>
                  <p className="text-sm text-muted-foreground">{athlete.region}</p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {/* No results message */}
        {filteredAthletes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Tidak ada atlet yang ditemukan dengan kriteria pencarian Anda.
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Sebelumnya
            </Button>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Selanjutnya
            </Button>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}