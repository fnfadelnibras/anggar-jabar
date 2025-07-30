"use client"

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
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface Region {
  id: string
  name: string
  image: string
  athletes: number
  clubs: number
  medals: {
    gold: number
    silver: number
    bronze: number
  }
  description: string
}

interface RegionData {
  id: string
  name: string
  _count: {
    athletes: number
  }
}

export default function RegionsPage() {
  const [regionsData, setRegionsData] = useState<RegionData[]>([])
  const [filteredRegions, setFilteredRegions] = useState<Region[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Fetch regions from API
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch('/api/regions')
        const data = await response.json()
        setRegionsData(data)
        
        // Transform data to match existing layout
        const transformedRegions = data.map((region: RegionData) => ({
          id: region.id,
          name: region.name,
          image: `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(region.name)}`,
          athletes: region._count.athletes,
          clubs: Math.floor(region._count.athletes / 5) + 1,
          medals: { 
            gold: Math.floor(region._count.athletes * 0.3), 
            silver: Math.floor(region._count.athletes * 0.4), 
            bronze: Math.floor(region._count.athletes * 0.5) 
          },
          description: `Pusat anggar IKASI ${region.name} dengan ${region._count.athletes} atlet terdaftar.`,
        }))
        
        setFilteredRegions(transformedRegions)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching regions:', error)
        setLoading(false)
      }
    }

    fetchRegions()
  }, [])

  // Filter regions based on search
  useEffect(() => {
    let filtered = regionsData.map((region: RegionData) => ({
      id: region.id,
      name: region.name,
      image: `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(region.name)}`,
      athletes: region._count.athletes,
      clubs: Math.floor(region._count.athletes / 5) + 1,
      medals: { 
        gold: Math.floor(region._count.athletes * 0.3), 
        silver: Math.floor(region._count.athletes * 0.4), 
        bronze: Math.floor(region._count.athletes * 0.5) 
      },
      description: `Pusat anggar IKASI ${region.name} dengan ${region._count.athletes} atlet terdaftar.`,
    }))

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(region =>
        region.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredRegions(filtered)
    setCurrentPage(1) // Reset to first page when filtering
  }, [regionsData, searchTerm])

  // Pagination
  const totalPages = Math.ceil(filteredRegions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentRegions = filteredRegions.slice(startIndex, endIndex)

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (loading) {
    return (
      <PublicLayout>
        <div className="container py-12 sm:py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-4 border-transparent border-t-gray-400 mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading regions...</p>
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
                placeholder="Cari nama wilayah..." 
                className="pl-10 bg-background/50"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <div>
              <Select disabled>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Filter per Wilayah" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Wilayah</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select disabled>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Filter per Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <div className="py-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold">Kota dan Kabupaten IKASI</h2>
            <div className="text-sm text-muted-foreground">
              Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredRegions.length)} dari {filteredRegions.length} wilayah
            </div>
          </div>

          <Tabs defaultValue="grid" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="grid">Tampilan Grid</TabsTrigger>
              <TabsTrigger value="list">Tampilan List</TabsTrigger>
            </TabsList>

            <TabsContent value="grid" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentRegions.map((region) => (
                  <Card key={region.id} className="overflow-hidden flex flex-col">
                    <div className="relative h-48">
                      <Image
                        src={region.image || "/placeholder.svg"}
                        alt={region.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-slate-700/90 text-white border-0">
                          <Swords className="h-3 w-3 mr-1" />
                          IKASI
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{region.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{region.athletes} Atlet IKASI</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{region.clubs} Klub IKASI</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Trophy className="h-4 w-4 mr-2 text-muted-foreground" />
                          <div className="flex gap-2">
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                              {region.medals.gold} Emas
                            </Badge>
                            <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                              {region.medals.silver} Perak
                            </Badge>
                            <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                              {region.medals.bronze} Perunggu
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{region.description}</p>
                      </div>
                    </CardContent>
                    <div className="p-6 pt-0 mt-auto">
                      <Button asChild variant="default" className="w-full bg-slate-700 hover:bg-slate-800 text-white border-0 shadow-sm hover:shadow-md transition-all duration-200">
                        <Link href={`/regions/${region.id}`}>Lihat Detail</Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list" className="mt-0">
              <div className="space-y-4">
                {currentRegions.map((region) => (
                  <Card key={region.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative h-48 md:h-auto md:w-1/3 lg:w-1/4">
                        <Image
                          src={region.image || "/placeholder.svg"}
                          alt={region.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-slate-700/90 text-white border-0">
                            <Swords className="h-3 w-3 mr-1" />
                            IKASI
                          </Badge>
                        </div>
                      </div>
                      <div className="flex-1 p-6">
                        <h3 className="text-xl font-bold mb-2">{region.name}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center text-sm">
                            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{region.athletes} Atlet IKASI</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{region.clubs} Klub IKASI</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Trophy className="h-4 w-4 mr-2 text-muted-foreground" />
                            <div className="flex gap-2">
                              <span className="text-yellow-600 font-medium">{region.medals.gold} E</span>
                              <span className="text-gray-600 font-medium">{region.medals.silver} P</span>
                              <span className="text-amber-700 font-medium">{region.medals.bronze} Pr</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{region.description}</p>
                        <Button asChild variant="default" className="bg-slate-700 hover:bg-slate-800 text-white border-0 shadow-sm hover:shadow-md transition-all duration-200">
                          <Link href={`/regions/${region.id}`}>Lihat Detail</Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* No results message */}
          {filteredRegions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Tidak ada wilayah yang ditemukan dengan kriteria pencarian Anda.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-8">
              <div className="text-sm text-muted-foreground">
                Menampilkan {startIndex + 1} sampai {Math.min(endIndex, filteredRegions.length)} dari {filteredRegions.length} hasil
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Sebelumnya
                </Button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className={cn(
                        "w-8 h-8 p-0",
                        currentPage === page 
                          ? "bg-slate-700 hover:bg-slate-800 text-white border-0 shadow-sm" 
                          : "border-slate-300 hover:bg-slate-50 text-slate-700"
                      )}
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
            </div>
          )}
        </div>

        {/* Map Section */}
        <div className="bg-muted py-12 mt-12 rounded-lg">
          <div className="container">
            <div className="flex items-center mb-6">
              <Swords className="h-6 w-6 text-slate-600 mr-3" />
              <h2 className="text-2xl font-bold">Distribusi Regional IKASI</h2>
            </div>
            <div className="bg-background rounded-lg border p-4 h-[400px] flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground mb-2">Peta interaktif akan ditampilkan di sini</p>
                <p className="text-sm text-muted-foreground">
                  Menunjukkan distribusi klub dan atlet anggar IKASI di seluruh Jawa Barat
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}