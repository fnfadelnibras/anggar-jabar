import { PublicLayout } from "@/components/public-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MapPin, Users, Trophy, Swords } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegionsPage() {
  // West Java cities/regencies data from IKASI JABAR dummy API
  const regions = [
    {
      id: 1,
      name: "Bandung",
      image: "/placeholder.svg?height=200&width=400&text=Bandung",
      athletes: 45,
      clubs: 8,
      medals: { gold: 15, silver: 12, bronze: 18 },
      description: "Ibu kota Jawa Barat dengan konsentrasi klub dan atlet anggar IKASI tertinggi di provinsi.",
    },
    {
      id: 2,
      name: "Bekasi",
      image: "/placeholder.svg?height=200&width=400&text=Bekasi",
      athletes: 32,
      clubs: 5,
      medals: { gold: 10, silver: 14, bronze: 9 },
      description: "Komunitas anggar IKASI yang berkembang dengan dukungan fasilitas olahraga modern.",
    },
    {
      id: 3,
      name: "Bogor",
      image: "/placeholder.svg?height=200&width=400&text=Bogor",
      athletes: 28,
      clubs: 4,
      medals: { gold: 8, silver: 11, bronze: 14 },
      description: "Dikenal dengan program pelatihan teknis IKASI dan inisiatif pengembangan pemuda.",
    },
    {
      id: 4,
      name: "Depok",
      image: "/placeholder.svg?height=200&width=400&text=Depok",
      athletes: 25,
      clubs: 3,
      medals: { gold: 7, silver: 9, bronze: 12 },
      description: "Pusat anggar IKASI dengan fokus pada pengembangan atlet kompetitif.",
    },
    {
      id: 5,
      name: "Cimahi",
      image: "/placeholder.svg?height=200&width=400&text=Cimahi",
      athletes: 22,
      clubs: 3,
      medals: { gold: 5, silver: 8, bronze: 10 },
      description: "Pusat anggar IKASI dengan partisipasi yang berkembang pesat.",
    },
    {
      id: 6,
      name: "Tasikmalaya",
      image: "/placeholder.svg?height=200&width=400&text=Tasikmalaya",
      athletes: 20,
      clubs: 2,
      medals: { gold: 6, silver: 7, bronze: 9 },
      description: "Kota dengan program anggar IKASI berbasis universitas yang kuat.",
    },
    {
      id: 7,
      name: "Sukabumi",
      image: "/placeholder.svg?height=200&width=400&text=Sukabumi",
      athletes: 18,
      clubs: 2,
      medals: { gold: 4, silver: 6, bronze: 8 },
      description: "Kabupaten dengan komunitas anggar IKASI yang solid dan berkembang.",
    },
    {
      id: 8,
      name: "Karawang",
      image: "/placeholder.svg?height=200&width=400&text=Karawang",
      athletes: 16,
      clubs: 2,
      medals: { gold: 3, silver: 5, bronze: 7 },
      description: "Pusat anggar IKASI regional dengan fasilitas pelatihan yang baik.",
    },
  ]

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
              <Input placeholder="Cari nama wilayah..." className="pl-10 bg-background/50" />
            </div>
            <div>
              <Select>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Filter per Wilayah" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Wilayah</SelectItem>
                  <SelectItem value="bandung">Bandung</SelectItem>
                  <SelectItem value="bekasi">Bekasi</SelectItem>
                  <SelectItem value="bogor">Bogor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Filter per Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="epee">Épée</SelectItem>
                  <SelectItem value="foil">Foil</SelectItem>
                  <SelectItem value="sabre">Sabre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <div className="py-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold">Kota dan Kabupaten IKASI</h2>
          </div>

          <Tabs defaultValue="grid" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="grid">Tampilan Grid</TabsTrigger>
              <TabsTrigger value="list">Tampilan List</TabsTrigger>
            </TabsList>

            <TabsContent value="grid" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regions.map((region) => (
                  <Card key={region.id} className="overflow-hidden flex flex-col">
                    <div className="relative h-48">
                      <img
                        src={region.image || "/placeholder.svg"}
                        alt={region.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary/90 text-white">
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
                      <Button asChild variant="default" className="w-full">
                        <Link href={`/regions/${region.id}`}>Lihat Detail</Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list" className="mt-0">
              <div className="space-y-4">
                {regions.map((region) => (
                  <Card key={region.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative h-48 md:h-auto md:w-1/3 lg:w-1/4">
                        <img
                          src={region.image || "/placeholder.svg"}
                          alt={region.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-primary/90 text-white">
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
                        <Button asChild variant="default">
                          <Link href={`/regions/${region.id}`}>Lihat Detail</Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Map Section */}
        <div className="bg-muted py-12 mt-12 rounded-lg">
          <div className="container">
            <div className="flex items-center mb-6">
              <Swords className="h-6 w-6 text-primary mr-3" />
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
