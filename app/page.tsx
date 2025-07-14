import { PublicLayout } from "@/components/public-layout"

export default function HomePage() {
  return (
    <PublicLayout>
      <section className="container py-16">
        <h1 className="text-4xl font-bold mb-4">Selamat Datang di IKASI JABAR</h1>
        <p className="text-muted-foreground mb-8">
          Sistem Manajemen Kompetisi Anggar Regional Jawa Barat
        </p>
        {/* Tambahkan konten beranda di sini */}
      </section>
    </PublicLayout>
  )
}