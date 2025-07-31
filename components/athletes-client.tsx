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

export function AthletesClient({ athletes, regions, categories }: AthletesClientProps) {
  const [filteredAthletes, setFilteredAthletes] = useState<Athlete[]>(athletes)
  const [searchTerm, setSearchTerm] = useState("")
  const [regionFilter, setRegionFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

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
                <SelectValue placeholder="Filter per Wilayah" />
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
                <SelectValue placeholder="Filter per Kategori" />
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

      {/* Athletes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentAthletes.map((athlete) => (
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
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Sebelumnya
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
            Selanjutnya
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Results count */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredAthletes.length)} dari {filteredAthletes.length} atlet
          {totalPages > 1 && ` (Halaman ${currentPage} dari ${totalPages})`}
        </p>
      </div>
    </div>
  )
} 