import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              404
            </h1>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
              Halaman Tidak Ditemukan
            </h2>
            <p className="text-muted-foreground max-w-[600px] text-lg md:text-xl">
              Maaf, halaman yang Anda cari tidak dapat ditemukan. 
              Mungkin halaman tersebut telah dipindahkan atau dihapus.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Kembali ke Beranda
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="javascript:history.back()" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Kembali
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
} 