import { PublicLayout } from "@/components/public-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sword, Award, Users, BookOpen, Landmark, Heart, Swords } from "lucide-react"
import { Hero } from "@/components/hero"

export default function AboutPage() {
  // IKASI JABAR team members data
  const teamMembers = [
    {
      name: "Bambang Pamungkas",
      role: "Ketua IKASI Jawa Barat",
      image: "/placeholder.svg?height=200&width=200&text=BP",
      bio: "Mantan atlet anggar Olimpiade dengan pengalaman 20+ tahun dalam administrasi olahraga.",
    },
    {
      name: "Siti Nurhaliza",
      role: "Direktur Teknik IKASI Jabar",
      image: "/placeholder.svg?height=200&width=200&text=SN",
      bio: "Wasit internasional dan pelatih dengan keahlian dalam manajemen kompetisi.",
    },
    {
      name: "Ahmad Fauzi",
      role: "Kepala Pelatih IKASI Jabar",
      image: "/placeholder.svg?height=200&width=200&text=AF",
      bio: "Mantan juara nasional dengan passion mengembangkan talenta muda.",
    },
    {
      name: "Dewi Kartika",
      role: "Koordinator Pengembangan Yunior",
      image: "/placeholder.svg?height=200&width=200&text=DK",
      bio: "Spesialis program grassroots dan identifikasi bakat di seluruh Jawa Barat.",
    },
  ]

  return (
    <PublicLayout>
    <Hero/>
      {/* Main Content */}
      <section className="w-full py-12">
        <Tabs defaultValue="mission" className="w-full">
          <div className="flex w-full justify-center">
            <TabsList className="mb-6 flex flex-wrap justify-center gap-x-1 w-auto">
              <TabsTrigger value="mission" className="rounded-md px-4 py-2 text-base font-normal transition-colors border-none shadow-none data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:font-bold data-[state=inactive]:text-muted-foreground data-[state=inactive]:font-normal hover:data-[state=inactive]:bg-gray-200">Visi & Misi</TabsTrigger>
              <TabsTrigger value="history" className="rounded-md px-4 py-2 text-base font-normal transition-colors border-none shadow-none data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:font-bold data-[state=inactive]:text-muted-foreground data-[state=inactive]:font-normal hover:data-[state=inactive]:bg-gray-200">Sejarah</TabsTrigger>
              <TabsTrigger value="team" className="rounded-md px-4 py-2 text-base font-normal transition-colors border-none shadow-none data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:font-bold data-[state=inactive]:text-muted-foreground data-[state=inactive]:font-normal hover:data-[state=inactive]:bg-gray-200">Tim Kami</TabsTrigger>
              <TabsTrigger value="partners" className="rounded-md px-4 py-2 text-base font-normal transition-colors border-none shadow-none data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:font-bold data-[state=inactive]:text-muted-foreground data-[state=inactive]:font-normal hover:data-[state=inactive]:bg-gray-200">Mitra</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="mission" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Visi & Misi IKASI JABAR</h2>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Visi</h3>
                  <p className="text-lg mb-4">
                    Menjadi organisasi anggar terdepan di Jawa Barat yang menghasilkan atlet-atlet berprestasi tingkat
                    nasional dan internasional.
                  </p>
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Misi</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Mengembangkan olahraga anggar di seluruh kota dan kabupaten di Jawa Barat</li>
                    <li>Menyelenggarakan kompetisi anggar berkualitas tinggi secara berkelanjutan</li>
                    <li>Membina dan mengembangkan atlet anggar dari tingkat pemula hingga elit</li>
                    <li>Meningkatkan kualitas pelatih dan wasit anggar di Jawa Barat</li>
                    <li>Membangun kerjasama dengan berbagai pihak untuk kemajuan anggar Jawa Barat</li>
                  </ul>
                </div>
                <p className="mb-4">
                  IKASI Jawa Barat berkomitmen untuk menciptakan komunitas anggar yang mendukung pertumbuhan,
                  sportivitas, dan keunggulan. Melalui kompetisi regional, program pelatihan, dan inisiatif
                  pengembangan, kami bertujuan untuk mengangkat prestasi anggar Jawa Barat di tingkat nasional.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <Card>
                    <CardContent className="flex items-start p-6">
                      <Award className="h-10 w-10 text-primary mr-4 mt-1" />
                      <div>
                        <h3 className="font-bold text-lg mb-2">Prestasi</h3>
                        <p className="text-sm text-muted-foreground">
                          Mengutamakan standar tertinggi dalam kompetisi, pelatihan, dan administrasi.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="flex items-start p-6">
                      <Users className="h-10 w-10 text-primary mr-4 mt-1" />
                      <div>
                        <h3 className="font-bold text-lg mb-2">Inklusivitas</h3>
                        <p className="text-sm text-muted-foreground">
                          Membuat anggar dapat diakses oleh semua masyarakat Jawa Barat.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="flex items-start p-6">
                      <BookOpen className="h-10 w-10 text-primary mr-4 mt-1" />
                      <div>
                        <h3 className="font-bold text-lg mb-2">Pendidikan</h3>
                        <p className="text-sm text-muted-foreground">
                          Mengembangkan pengetahuan dan keterampilan atlet, pelatih, dan wasit.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="flex items-start p-6">
                      <Heart className="h-10 w-10 text-primary mr-4 mt-1" />
                      <div>
                        <h3 className="font-bold text-lg mb-2">Dedikasi</h3>
                        <p className="text-sm text-muted-foreground">
                          Menumbuhkan kecintaan terhadap olahraga dan dedikasi untuk terus berkembang.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="space-y-6">
                <img
                  src="/placeholder.svg?height=400&width=600&text=IKASI+JABAR+Competition"
                  alt="IKASI JABAR Competition"
                  className="rounded-lg w-full h-auto"
                />
                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-4">Target IKASI JABAR</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Sword className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Meningkatkan partisipasi anggar di seluruh wilayah Jawa Barat</span>
                    </li>
                    <li className="flex items-start">
                      <Sword className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Mengembangkan atlet kelas dunia yang dapat bersaing secara internasional</span>
                    </li>
                    <li className="flex items-start">
                      <Sword className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Membangun pusat pelatihan berkualitas tinggi di setiap wilayah utama</span>
                    </li>
                    <li className="flex items-start">
                      <Sword className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Melatih dan mensertifikasi pelatih serta wasit berstandar internasional</span>
                    </li>
                    <li className="flex items-start">
                      <Sword className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>Menyelenggarakan kompetisi internasional untuk mengangkat profil anggar Jawa Barat</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-3xl font-bold mb-6">Sejarah IKASI Jawa Barat</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Awal Mula (1960-an)</h3>
                    <p>
                      Anggar di Jawa Barat dimulai pada tahun 1960-an sebagai olahraga khusus yang dipraktikkan terutama
                      di Bandung dan Jakarta. Asosiasi anggar regional pertama didirikan pada tahun 1965, memberikan
                      struktur pada komunitas penggemar yang berkembang.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Pertumbuhan dan Pengembangan (1970-1980)</h3>
                    <p>
                      Sepanjang tahun 1970-an dan 1980-an, anggar berkembang ke lebih banyak wilayah ketika pelatih
                      internasional mengunjungi Jawa Barat untuk mengadakan pemusatan latihan dan workshop. Kejuaraan
                      regional pertama diadakan pada tahun 1978, menandai tonggak penting bagi olahraga ini.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Pengakuan Regional (1990-an)</h3>
                    <p>
                      Pada tahun 1990-an, atlet anggar Jawa Barat mulai berpartisipasi dalam kompetisi nasional,
                      termasuk PON dan Kejuaraan Nasional. Periode ini melihat generasi pertama atlet anggar Jawa Barat
                      mencapai hasil yang menonjol di tingkat regional.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Era Modern (2000-an)</h3>
                    <p>
                      Awal tahun 2000-an membawa fokus baru pada pengembangan infrastruktur anggar di seluruh provinsi.
                      Dengan dukungan pemerintah yang meningkat dan sponsor swasta, lebih banyak fasilitas pelatihan
                      didirikan, dan program pelatihan ditingkatkan.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Pembentukan IKASI JABAR (2010)</h3>
                    <p>
                      IKASI Jawa Barat dibentuk pada tahun 2010 untuk memodernisasi dan merampingkan manajemen kompetisi
                      anggar di seluruh Jawa Barat. Dengan menerapkan sistem digital dan protokol standar, kami telah
                      meningkatkan kualitas dan aksesibilitas acara anggar di seluruh provinsi.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Masa Depan</h3>
                    <p>
                      Hari ini, IKASI JABAR terus memperluas jangkauannya, dengan fokus pada pengembangan pemuda dan
                      pertumbuhan regional. Tujuan kami adalah menjadikan Jawa Barat sebagai kekuatan anggar di
                      Indonesia dan sekitarnya, memelihara bakat dari tingkat grassroots hingga elit.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <img
                  src="/placeholder.svg?height=300&width=400&text=Historical+IKASI+Photo"
                  alt="Historical IKASI Photo"
                  className="rounded-lg w-full h-auto"
                />
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4">Tonggak Bersejarah</h3>
                    <ul className="space-y-4">
                      <li className="border-l-2 border-primary pl-4 pb-4">
                        <span className="text-sm text-muted-foreground">1965</span>
                        <p className="font-medium">Asosiasi Anggar Regional Jawa Barat pertama didirikan</p>
                      </li>
                      <li className="border-l-2 border-primary pl-4 pb-4">
                        <span className="text-sm text-muted-foreground">1978</span>
                        <p className="font-medium">Kejuaraan Regional perdana</p>
                      </li>
                      <li className="border-l-2 border-primary pl-4 pb-4">
                        <span className="text-sm text-muted-foreground">1992</span>
                        <p className="font-medium">Medali PON pertama dalam anggar</p>
                      </li>
                      <li className="border-l-2 border-primary pl-4 pb-4">
                        <span className="text-sm text-muted-foreground">2005</span>
                        <p className="font-medium">Pusat pelatihan nasional didirikan di Bandung</p>
                      </li>
                      <li className="border-l-2 border-primary pl-4 pb-4">
                        <span className="text-sm text-muted-foreground">2010</span>
                        <p className="font-medium">IKASI JABAR dibentuk untuk mengelola kompetisi regional</p>
                      </li>
                      <li className="border-l-2 border-primary pl-4">
                        <span className="text-sm text-muted-foreground">2020</span>
                        <p className="font-medium">Sistem manajemen kompetisi digital diluncurkan</p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="team" className="mt-0">
            <h2 className="text-3xl font-bold mb-6">Tim IKASI JABAR</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <Card key={member.name} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-sm text-primary mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="partners" className="mt-0">
            <h2 className="text-3xl font-bold mb-6">Mitra IKASI JABAR</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Mitra Resmi</h3>
                <div className="grid grid-cols-2 gap-6">
                  <Card className="flex items-center justify-center p-6 h-32">
                    <img
                      src="/placeholder.svg?height=80&width=160&text=Dispora+Jabar"
                      alt="Dinas Olahraga Jawa Barat"
                      className="max-h-full"
                    />
                  </Card>
                  <Card className="flex items-center justify-center p-6 h-32">
                    <img
                      src="/placeholder.svg?height=80&width=160&text=KONI+Jabar"
                      alt="KONI Jawa Barat"
                      className="max-h-full"
                    />
                  </Card>
                  <Card className="flex items-center justify-center p-6 h-32">
                    <img
                      src="/placeholder.svg?height=80&width=160&text=IKASI+Pusat"
                      alt="IKASI Pusat"
                      className="max-h-full"
                    />
                  </Card>
                  <Card className="flex items-center justify-center p-6 h-32">
                    <img
                      src="/placeholder.svg?height=80&width=160&text=FIE"
                      alt="Federation Internationale d'Escrime"
                      className="max-h-full"
                    />
                  </Card>
                </div>

                <h3 className="text-xl font-bold mb-4 mt-8">Sponsor Korporat</h3>
                <div className="grid grid-cols-3 gap-4">
                  <Card className="flex items-center justify-center p-4 h-24">
                    <img
                      src="/placeholder.svg?height=60&width=120&text=Bank+Jabar"
                      alt="Bank Jabar"
                      className="max-h-full"
                    />
                  </Card>
                  <Card className="flex items-center justify-center p-4 h-24">
                    <img
                      src="/placeholder.svg?height=60&width=120&text=Telkom+Jabar"
                      alt="Telkom Jabar"
                      className="max-h-full"
                    />
                  </Card>
                  <Card className="flex items-center justify-center p-4 h-24">
                    <img
                      src="/placeholder.svg?height=60&width=120&text=PLN+Jabar"
                      alt="PLN Jabar"
                      className="max-h-full"
                    />
                  </Card>
                  <Card className="flex items-center justify-center p-4 h-24">
                    <img
                      src="/placeholder.svg?height=60&width=120&text=Jabar+Sport"
                      alt="Jabar Sport"
                      className="max-h-full"
                    />
                  </Card>
                  <Card className="flex items-center justify-center p-4 h-24">
                    <img
                      src="/placeholder.svg?height=60&width=120&text=Bandung+Corp"
                      alt="Bandung Corp"
                      className="max-h-full"
                    />
                  </Card>
                  <Card className="flex items-center justify-center p-4 h-24">
                    <img
                      src="/placeholder.svg?height=60&width=120&text=Jabar+Media"
                      alt="Jabar Media"
                      className="max-h-full"
                    />
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Manfaat Kemitraan</h3>
                <Card>
                  <CardContent className="p-6">
                    <p className="mb-4">
                      IKASI JABAR bermitra dengan organisasi yang berbagi visi kami dalam mengembangkan anggar di Jawa
                      Barat. Melalui kemitraan ini, kami dapat memberikan peluang yang lebih baik bagi atlet, pelatih,
                      dan komunitas anggar yang lebih luas.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Landmark className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Akses ke pelatihan dan peluang kompetisi internasional</span>
                      </li>
                      <li className="flex items-start">
                        <Landmark className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Dukungan peralatan dan fasilitas untuk wilayah yang berkembang</span>
                      </li>
                      <li className="flex items-start">
                        <Landmark className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Program pendidikan pelatih dan wasit</span>
                      </li>
                      <li className="flex items-start">
                        <Landmark className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Inisiatif identifikasi dan pengembangan bakat</span>
                      </li>
                      <li className="flex items-start">
                        <Landmark className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Dukungan organisasi dan promosi acara</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <h3 className="text-xl font-bold mb-4 mt-8">Menjadi Mitra</h3>
                <Card>
                  <CardContent className="p-6">
                    <p className="mb-4">
                      Kami menyambut organisasi yang tertarik mendukung pertumbuhan anggar di Jawa Barat. Peluang
                      kemitraan tersedia di berbagai tingkat, dari dukungan komunitas lokal hingga sponsor nasional.
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Untuk informasi lebih lanjut tentang peluang kemitraan, silakan hubungi tim kemitraan kami di
                      partners@ikasijabar.org
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </PublicLayout>
  )
}
