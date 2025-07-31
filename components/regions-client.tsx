"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MapPin, Users, Trophy, Swords, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface Region {
  id: string
  name: string
  image: string
  athletes: number
  clubs: number
  description: string
}

interface RegionsClientProps {
  regions: Region[]
}

export function RegionsClient({ regions }: RegionsClientProps) {
  const [filteredRegions, setFilteredRegions] = useState<Region[]>(regions)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter regions based on search
  useEffect(() => {
    let filtered = regions

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(region =>
        region.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredRegions(filtered)
    setCurrentPage(1) // Reset to first page when filtering
  }, [regions, searchTerm])

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

  return (
    <div>
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
                      <p className="text-sm text-muted-foreground mt-2">{region.description}</p>
                    </div>
                  </CardContent>
                  <div className="p-6 pt-0 mt-auto">
                    <Link href={`/regions/${region.id}`}>
                      <Button variant="default" className="w-full bg-slate-700 hover:bg-slate-800 text-white border-0 shadow-sm hover:shadow-md transition-all duration-200">
                        Lihat Detail
                      </Button>
                    </Link>
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{region.athletes} Atlet IKASI</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{region.clubs} Klub IKASI</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{region.description}</p>
                      <Link href={`/regions/${region.id}`}>
                        <Button variant="default" className="bg-slate-700 hover:bg-slate-800 text-white border-0 shadow-sm hover:shadow-md transition-all duration-200">
                          Lihat Detail
                        </Button>
                      </Link>
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
  )
}
