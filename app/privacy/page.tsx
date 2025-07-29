import { PublicLayout } from "@/components/public-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <PublicLayout>
      <section className="container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Kebijakan Privasi</h1>
            <p className="text-lg text-muted-foreground">
              Kebijakan privasi IKASI JABAR untuk melindungi data pengguna
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Informasi yang Kami Kumpulkan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami, seperti:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Informasi pribadi (nama, alamat email, nomor telepon)</li>
                  <li>Informasi atlet (data kompetisi, prestasi, kategori)</li>
                  <li>Informasi wilayah dan organisasi</li>
                  <li>Data administratif untuk keperluan kompetisi</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Bagaimana Kami Menggunakan Informasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Informasi yang kami kumpulkan digunakan untuk:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Mengelola data atlet dan kompetisi</li>
                  <li>Menyediakan layanan sistem manajemen</li>
                  <li>Mengirim informasi terkait kompetisi dan acara</li>
                  <li>Meningkatkan kualitas layanan</li>
                  <li>Memenuhi kewajiban hukum dan regulasi</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Berbagi Informasi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Kami tidak menjual, memperdagangkan, atau mentransfer informasi pribadi Anda kepada pihak ketiga tanpa persetujuan Anda, kecuali:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Untuk memenuhi kewajiban hukum</li>
                  <li>Untuk melindungi hak dan keamanan kami</li>
                  <li>Dengan persetujuan eksplisit dari Anda</li>
                  <li>Untuk keperluan kompetisi resmi yang disetujui</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Keamanan Data</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Kami menerapkan langkah-langkah keamanan yang sesuai untuk melindungi informasi pribadi Anda dari akses yang tidak sah, perubahan, pengungkapan, atau penghancuran. Data disimpan dengan enkripsi dan akses terbatas hanya untuk personel yang berwenang.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Hak Pengguna</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Anda memiliki hak untuk:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Mengakses data pribadi Anda</li>
                  <li>Memperbaiki data yang tidak akurat</li>
                  <li>Meminta penghapusan data (dengan batasan tertentu)</li>
                  <li>Membatasi penggunaan data</li>
                  <li>Mengajukan keberatan terhadap pemrosesan data</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Cookie dan Teknologi Pelacakan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Website kami menggunakan cookie dan teknologi serupa untuk meningkatkan pengalaman pengguna, menganalisis penggunaan website, dan memberikan konten yang dipersonalisasi. Anda dapat mengontrol penggunaan cookie melalui pengaturan browser Anda.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Perubahan Kebijakan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan akan diumumkan melalui website kami dan, jika diperlukan, melalui notifikasi langsung kepada pengguna yang terdampak.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Kontak</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami di:
                </p>
                <div className="mt-4 space-y-2 text-muted-foreground">
                  <p>Email: privacy@ikasijabar.org</p>
                  <p>Telepon: (022) 123-4567</p>
                  <p>Alamat: Jl. Padjadjaran No. 123, Bandung, Jawa Barat</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 p-6 bg-muted rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
} 