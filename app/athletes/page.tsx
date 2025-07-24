import { PublicLayout } from "@/components/public-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, UserCheck, Lock, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AthletesPage() {
  const athletes = [
    {
      id: 1,
      name: "Asep Gunawan",
      region: "Bandung",
      category: "Épée",
      verificationStatus: "approved",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 2,
      name: "Nenden Fitria",
      region: "Bekasi",
      category: "Foil",
      verificationStatus: "approved",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 3,
      name: "Ujang Mulyana",
      region: "Cimahi",
      category: "Sabre",
      verificationStatus: "approved",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 4,
      name: "Siti Aminah",
      region: "Depok",
      category: "Épée",
      verificationStatus: "pending",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 5,
      name: "Bambang Suryo",
      region: "Karawang",
      category: "Foil",
      verificationStatus: "approved",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 6,
      name: "Dewi Lestari",
      region: "Tasikmalaya",
      category: "Sabre",
      verificationStatus: "locked",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 7,
      name: "Eka Permana",
      region: "Sukabumi",
      category: "Épée",
      verificationStatus: "approved",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 8,
      name: "Rina Marlina",
      region: "Bogor",
      category: "Foil",
      verificationStatus: "pending",
      image: "/placeholder.svg?height=400&width=400",
    },
  ]

  const getStatusBadge = (verificationStatus: string) => {
    switch (verificationStatus) {
      case "pending":
        return (
          <Badge variant="outline" className="border-yellow-400/50 text-yellow-400">
            <Clock className="w-3 h-3 mr-1.5" />
            Menunggu Verifikasi
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="border-green-400/50 text-green-400">
            <UserCheck className="w-3 h-3 mr-1.5" />
            Terverifikasi
          </Badge>
        )
      case "locked":
        return (
          <Badge variant="outline" className="border-red-400/50 text-red-400">
            <Lock className="w-3 h-3 mr-1.5" />
            Terkunci
          </Badge>
        )
      default:
        return <Badge variant="outline">{verificationStatus}</Badge>
    }
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
              <Input placeholder="Cari nama atlet..." className="pl-10 bg-background/50" />
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

        {/* Athletes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {athletes.map((athlete) => (
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
                  <div className="mt-3">{getStatusBadge(athlete.verificationStatus)}</div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

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