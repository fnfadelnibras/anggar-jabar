import { PublicLayout } from "@/components/public-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Trophy, 
  Users, 
  Award
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { AnimatedHeroImages } from "@/components/animated-hero-images"

interface Stats {
  athletes: number
  regions: number
}

export default async function HomePage() {
  // Fetch data on the server with error handling
  let athletes = []
  let regions = []
  
  try {
    [athletes, regions] = await Promise.all([
      prisma.athlete.findMany({
        include: { region: true }
      }),
      prisma.region.findMany({
        include: {
          _count: {
            select: { athletes: true }
          }
        }
      })
    ])
  } catch (error) {
    console.error('Database connection error:', error)
    // Use default values if database is not available
    athletes = []
    regions = []
  }

  // Calculate stats
  const stats: Stats = {
    athletes: athletes.length,
    regions: regions.length,
  }

  const statsData = [
    { icon: Users, label: "Atlet Terdaftar", value: stats.athletes.toString() },
    { icon: Trophy, label: "Wilayah Terdaftar", value: stats.regions.toString() },
  ]

  return (
    <PublicLayout>
      {/* Hero Section dengan Background Aesthetic */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/background.jpg"
            alt="Hero Background"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
        </div>
        
        {/* Gradient overlay yang lebih subtle */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-slate-900/60"></div>
        
        {/* Additional aesthetic elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="/Logo.svg"
                  alt="IKASI JABAR Logo"
                  width={64}
                  height={64}
                  className="h-16 w-16"
                />
                <h1 className="text-4xl lg:text-5xl font-bold">
                  IKASI<span className="bg-gradient-to-r from-yellow-400 via-blue-500 to-green-500 bg-clip-text text-transparent">JABAR</span>
                </h1>
              </div>
              <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-gray-100">
                Sistem Manajemen Kompetisi Anggar Regional Jawa Barat
              </h2>
              <p className="text-lg mb-8 text-gray-300">
                Platform digital terpadu untuk mengelola kompetisi anggar, data atlet, dan pengembangan olahraga anggar di Jawa Barat.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm transform hover:scale-105">
                  <Link href="/athletes">Lihat Atlet</Link>
                </Button>
                <Button asChild size="lg" className="bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm transform hover:scale-105">
                  <Link href="/regions">Lihat Wilayah</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden bg-white border border-white/10">
                <AnimatedHeroImages />
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Statistik IKASI JABAR</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            {statsData.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About IKASI JABAR */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Tentang IKASI JABAR</h2>
              <p className="text-lg mb-6">
                Ikatan Anggar Seluruh Indonesia Jawa Barat (IKASI JABAR) adalah organisasi yang bertanggung jawab 
                untuk mengembangkan dan memajukan olahraga anggar di seluruh wilayah Jawa Barat.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Trophy className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Kompetisi Berkualitas</h3>
                    <p className="text-sm text-muted-foreground">
                      Menyelenggarakan kompetisi anggar dengan standar internasional
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Pengembangan Atlet</h3>
                    <p className="text-sm text-muted-foreground">
                      Program pelatihan dan pembinaan atlet dari tingkat pemula hingga elit
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Prestasi Nasional</h3>
                    <p className="text-sm text-muted-foreground">
                      Atlet Jawa Barat telah meraih berbagai prestasi di tingkat nasional
                    </p>
                  </div>
                </div>
              </div>
              <Button asChild className="mt-6">
                <Link href="/about">Pelajari Lebih Lanjut</Link>
              </Button>
            </div>
            <div className="relative">
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden bg-white">
                <Image
                  src="/fencingteam.jpg"
                  alt="IKASI JABAR Team"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}