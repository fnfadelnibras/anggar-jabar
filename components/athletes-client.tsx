"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Athlete {
  id: string
  name: string
  region: string
  category: string
  verificationStatus: string
  image: string
}

interface AthletesClientProps {
  athletes: Athlete[]
  regions: string[]
  categories: string[]
}

export function AthletesClient({ athletes: initialAthletes, regions: initialRegions, categories: initialCategories }: AthletesClientProps) {
  const [athletes, setAthletes] = useState<Athlete[]>(initialAthletes)
  const [regions, setRegions] = useState<string[]>(initialRegions)
  const [categories, setCategories] = useState<string[]>(initialCategories)
  const [filteredAthletes, setFilteredAthletes] = useState<Athlete[]>(initialAthletes)
  const [searchTerm, setSearchTerm] = useState("")
  const [regionFilter, setRegionFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Fetch fresh data from server
  const fetchAthletes = async () => {
    try {
      console.log('Fetching fresh athletes data for public page...')
      const response = await fetch('/api/athletes')
      if (!response.ok) {
        throw new Error('Failed to fetch athletes')
      }
      const data = await response.json()
      
      // Transform data for public display
      const transformedAthletes: Athlete[] = data.map((athlete: any) => ({
        id: athlete.id,
        name: athlete.name,
        region: athlete.region.name,
        category: athlete.category,
        verificationStatus: 'pending',
        image: athlete.image ? `${athlete.image}?f_auto,q_100` : "/placeholder.svg?height=400&width=400",
      }))
      
      console.log('Fresh athletes data for public:', transformedAthletes)
      setAthletes(transformedAthletes)
      
      // Update regions and categories from fresh data
      const uniqueRegions = [...new Set(data.map((a: any) => a.region.name))] as string[]
      const uniqueCategories = [...new Set(data.map((a: any) => a.category))] as string[]
      setRegions(uniqueRegions)
      setCategories(uniqueCategories)
    } catch (error) {
      console.error('Failed to fetch athletes:', error)
    }
  }

  // Filter athletes based on search and filters
  useEffect(() => {
    let filtered = athletes

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
    setCurrentPage(1) // Reset to first page when filters change
  }, [athletes, searchTerm, regionFilter, categoryFilter])

  // Fetch fresh data on component mount
  useEffect(() => {
    fetchAthletes()
  }, [])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const handleRegionFilter = (value: string) => {
    setRegionFilter(value)
  }

  const handleCategoryFilter = (value: string) => {
    setCategoryFilter(value)
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredAthletes.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentAthletes = filteredAthletes.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Fetch fresh data on component mount
  useEffect(() => {
    fetchAthletes()
  }, [])

  return (
    <div>
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
                <SelectValue placeholder="Semua Wilayah" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Wilayah</SelectItem>
                {regions.map((region) => (
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
                <SelectValue placeholder="Semua Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Menampilkan {filteredAthletes.length} dari {athletes.length} atlet
        </p>
      </div>

      {/* Athletes Grid */}
      {currentAthletes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {currentAthletes.map((athlete) => (
            <Card key={athlete.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative aspect-[4/5] group">
                <Image
                  src={athlete.image}
                  alt={athlete.name}
                  width={300}
                  height={375}
                  className="w-full h-full object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  quality={100}
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg truncate">{athlete.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{athlete.region}</span>
                    <span>•</span>
                    <span>{athlete.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {athlete.verificationStatus}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Tidak ada atlet yang ditemukan.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className="w-8 h-8 p-0"
              >
                {page}
              </Button>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
} 