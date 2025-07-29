import { PublicLayout } from "@/components/public-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare,
  Send,
  Building,
  Users
} from "lucide-react"

export default function ContactPage() {
  return (
    <PublicLayout>
      <section className="container py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Hubungi Kami</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kami siap membantu Anda dengan pertanyaan seputar anggar, kompetisi, atau sistem manajemen IKASI JABAR.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Kirim Pesan</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nama Depan</Label>
                      <Input id="firstName" placeholder="Masukkan nama depan" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nama Belakang</Label>
                      <Input id="lastName" placeholder="Masukkan nama belakang" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="contoh@email.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input id="phone" placeholder="+62 812-3456-7890" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subjek</Label>
                    <Input id="subject" placeholder="Tentang apa pesan Anda?" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Pesan</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tulis pesan Anda di sini..."
                      rows={5}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Kirim Pesan
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Kontak</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Kantor Pusat IKASI JABAR</h3>
                    <p className="text-sm text-muted-foreground">
                      Jl. Padjadjaran No. 123, Bandung<br />
                      Jawa Barat, Indonesia 40132
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-sm text-muted-foreground">
                      info@ikasijabar.org<br />
                      events@ikasijabar.org<br />
                      admin@ikasijabar.org
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Telepon</h3>
                    <p className="text-sm text-muted-foreground">
                      (022) 123-4567<br />
                      (022) 123-4568<br />
                      WhatsApp: +62 812-3456-7890
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Jam Kerja</h3>
                    <p className="text-sm text-muted-foreground">
                      Senin - Jumat: 08:00 - 17:00<br />
                      Sabtu: 08:00 - 12:00<br />
                      Minggu: Tutup
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Divisi & Departemen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Divisi Kompetisi</h3>
                    <p className="text-sm text-muted-foreground">
                      Email: competition@ikasijabar.org<br />
                      Telp: (022) 123-4569
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Divisi Pelatihan</h3>
                    <p className="text-sm text-muted-foreground">
                      Email: training@ikasijabar.org<br />
                      Telp: (022) 123-4570
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Divisi Pengembangan</h3>
                    <p className="text-sm text-muted-foreground">
                      Email: development@ikasijabar.org<br />
                      Telp: (022) 123-4571
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Divisi Humas</h3>
                    <p className="text-sm text-muted-foreground">
                      Email: pr@ikasijabar.org<br />
                      Telp: (022) 123-4572
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Lokasi Kami</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Peta lokasi akan ditampilkan di sini
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Jl. Padjadjaran No. 123, Bandung, Jawa Barat
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Pertanyaan Umum</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Bagaimana cara mendaftar menjadi anggota IKASI JABAR?</h3>
                <p className="text-sm text-muted-foreground">
                  Anda dapat mendaftar melalui formulir online di website kami atau datang langsung ke kantor pusat IKASI JABAR dengan membawa dokumen yang diperlukan.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Apa saja persyaratan untuk mengikuti kompetisi?</h3>
                <p className="text-sm text-muted-foreground">
                  Persyaratan meliputi kartu anggota aktif, surat keterangan sehat, dan dokumen pendukung lainnya sesuai ketentuan kompetisi.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Bagaimana cara mengakses sistem admin?</h3>
                <p className="text-sm text-muted-foreground">
                  Sistem admin hanya dapat diakses oleh pengguna yang telah diberi akses. Silakan hubungi admin sistem untuk mendapatkan kredensial login.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Apakah ada program pelatihan untuk pemula?</h3>
                <p className="text-sm text-muted-foreground">
                  Ya, kami menyelenggarakan berbagai program pelatihan untuk semua tingkat, termasuk program khusus untuk pemula dan anak-anak.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicLayout>
  )
} 