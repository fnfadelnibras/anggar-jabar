import { PublicLayout } from "@/components/public-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Trophy, ArrowRight, Swords } from "lucide-react"
import Link from "next/link"
import { Hero } from "@/components/hero"
import Image from "next/image"

export default function HomePage() {
  // West Java events data from IKASI JABAR dummy API
  const upcomingEvents = [
    {
      id: 1,
      name: "Kejuaraan Anggar IKASI Jawa Barat 2024",
      date: "15 Mei 2024",
      location: "GOR Pajajaran, Bandung",
      participants: 120,
      categories: ["Épée", "Foil", "Sabre"],
      status: "Pendaftaran Dibuka",
    },
    {
      id: 2,
      name: "Festival Anggar IKASI Bekasi 2024",
      date: "22 Juni 2024",
      location: "Stadion Patriot, Bekasi",
      participants: 85,
      categories: ["Épée", "Foil"],
      status: "Pendaftaran Dibuka",
    },
    {
      id: 3,
      name: "Turnamen Yunior IKASI Bogor 2024",
      date: "10 Juli 2024",
      location: "GOR Bogor, Bogor",
      participants: 45,
      categories: ["Épée", "Foil", "Sabre"],
      status: "Segera Dibuka",
    },
  ]

  // West Java featured athletes from IKASI JABAR
  const featuredAthletes = [
    {
      id: 1,
      name: "Andi Setiawan",
      region: "Bandung",
      category: "Épée",
      achievements: "Juara 1 Kejuaraan IKASI Jabar 2023",
      image: "/placeholder.svg?height=300&width=300&text=Andi+Setiawan",
      club: "Anggar Bandung Club",
    },
    {
      id: 2,
      name: "Sari Dewi",
      region: "Bekasi",
      category: "Foil",
      achievements: "Juara 2 Festival IKASI Bogor 2023",
      image: "/placeholder.svg?height=300&width=300&text=Sari+Dewi",
      club: "Bekasi Fencing Academy",
    },
    {
      id: 3,
      name: "Budi Pratama",
      region: "Bogor",
      category: "Sabre",
      achievements: "Juara 3 Turnamen IKASI Bekasi 2023",
      image: "/placeholder.svg?height=300&width=300&text=Budi+Pratama",
      club: "Bogor Sabre Club",
    },
  ]

  // Recent results from IKASI JABAR West Java
  const recentResults = [
    {
      event: "Kejuaraan IKASI Jabar 2023",
      winner: "Andi Setiawan",
      category: "Épée Putra",
      location: "Bandung",
      date: "15 Des 2023",
      club: "Anggar Bandung Club",
    },
    {
      event: "Festival IKASI Bogor 2023",
      winner: "Sari Dewi",
      category: "Foil Putri",
      location: "Bogor",
      date: "10 Des 2023",
      club: "Bekasi Fencing Academy",
    },
    {
      event: "Turnamen IKASI Bekasi 2023",
      winner: "Budi Pratama",
      category: "Sabre Putra",
      location: "Bekasi",
      date: "5 Des 2023",
      club: "Bogor Sabre Club",
    },
  ]

  return (
    <PublicLayout>
    <Hero/>
      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">IKASI Jawa Barat dalam Angka</h2>
            <p className="text-muted-foreground">Prestasi dan pencapaian IKASI Jawa Barat</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">150+</h3>
              <p className="text-muted-foreground">Atlet IKASI Terdaftar</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">25+</h3>
              <p className="text-muted-foreground">Event IKASI per Tahun</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">18</h3>
              <p className="text-muted-foreground">Kota/Kabupaten Jabar</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">500+</h3>
              <p className="text-muted-foreground">Medali IKASI Diraih</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Event IKASI Mendatang</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ikuti kompetisi anggar IKASI terbaru di Jawa Barat dan tunjukkan kemampuan terbaik Anda
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={event.status === "Pendaftaran Dibuka" ? "default" : "secondary"}>
                      {event.status}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Swords className="h-3 w-3 mr-1" />
                      IKASI
                    </div>
                  </div>
                  <CardTitle className="text-xl">{event.name}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <Calendar className="mr-2 h-4 w-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-2 h-4 w-4" />
                      {event.location}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Peserta IKASI</span>
                      <span className="font-medium">{event.participants} atlet</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground block mb-2">Kategori</span>
                      <div className="flex flex-wrap gap-1">
                        {event.categories.map((category) => (
                          <Badge key={category} variant="outline" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full" asChild>
                      <Link href={`/events/${event.id}`}>Lihat Detail</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/events">
                Lihat Semua Event IKASI
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Athletes */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Atlet Unggulan IKASI</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Kenali para atlet anggar terbaik IKASI dari berbagai kota di Jawa Barat
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredAthletes.map((athlete) => (
              <Card key={athlete.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <Image
                    src={athlete.image || "/placeholder.svg"}
                    alt={athlete.name}
                    fill
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-primary/90 text-white">
                      <Swords className="h-3 w-3 mr-1" />
                      IKASI
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{athlete.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapPin className="mr-1 h-4 w-4" />
                    {athlete.region}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Users className="mr-1 h-4 w-4" />
                    {athlete.club}
                  </div>
                  <Badge variant="outline" className="mb-3">
                    {athlete.category}
                  </Badge>
                  <p className="text-sm text-muted-foreground mb-4">{athlete.achievements}</p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href={`/athletes/${athlete.id}`}>Lihat Profil</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/athletes">
                Lihat Semua Atlet IKASI
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Results */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Hasil Terbaru IKASI</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hasil kompetisi anggar IKASI terbaru dari seluruh Jawa Barat
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {recentResults.map((result, index) => (
                <Card key={index} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg">{result.event}</h3>
                        <Badge variant="outline" className="text-xs">
                          <Swords className="h-3 w-3 mr-1" />
                          IKASI
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-4 w-4" />
                          {result.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          {result.date}
                        </div>
                        <div className="flex items-center">
                          <Users className="mr-1 h-4 w-4" />
                          {result.club}
                        </div>
                      </div>
                    </div>
                    <div className="text-center md:text-right">
                      <div className="font-bold text-lg">{result.winner}</div>
                      <Badge variant="outline">{result.category}</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <Link href="/results">
                  Lihat Semua Hasil IKASI
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <Swords className="h-12 w-12 text-white mr-4" />
            <div>
              <h2 className="text-3xl font-bold">Bergabunglah dengan IKASI Jawa Barat</h2>
              <p className="text-white/90">Ikatan Anggar Seluruh Indonesia Jawa Barat</p>
            </div>
          </div>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Daftarkan diri Anda dan ikuti kompetisi anggar IKASI di seluruh Jawa Barat
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/about">Tentang IKASI JABAR</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-primary"
              asChild
            >
              <Link href="/events">Daftar Event IKASI</Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
