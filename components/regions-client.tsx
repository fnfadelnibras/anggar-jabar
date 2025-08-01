"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
             {/* Search */}
       <Card className="p-4 mb-8 bg-card/80 backdrop-blur-sm">
         <div className="relative">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
           <Input 
             placeholder="Cari nama wilayah..." 
             className="pl-10 bg-background/50"
             value={searchTerm}
             onChange={(e) => handleSearch(e.target.value)}
           />
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

                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentRegions.map((region) => (
                         <Card key={region.id} className="overflow-hidden flex flex-col h-full">
                              <div className="relative aspect-[16/9] group">
                 <Image
                  src={region.image ? `${region.image}?f_auto,q_100` : "/placeholder.svg"}
                  alt={region.name}
                  width={400}
                  height={224}
                  className="w-full h-full object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  quality={100}
                  priority={false}
                />
              </div>
                             <CardHeader className="pb-3">
                 <CardTitle className="text-lg">{region.name}</CardTitle>
               </CardHeader>
               <CardContent className="flex-grow">
                 <div className="space-y-4">
                   <div className="flex items-center text-sm">
                     <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                     <span>{region.athletes} Atlet IKASI</span>
                   </div>
                   <p className="text-sm text-muted-foreground line-clamp-3">{region.description}</p>
                 </div>
               </CardContent>
              <div className="p-6 pt-0 mt-auto flex justify-center">
                <Link href={`/regions/${region.id}`}>
                  <Button variant="default" className="bg-slate-700 hover:bg-slate-800 text-white border-0 shadow-sm hover:shadow-md transition-all duration-200">
                    Lihat Detail
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

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
