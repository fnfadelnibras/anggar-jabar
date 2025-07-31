"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Swords, Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="text-center space-y-8 p-8">
        <div className="flex justify-center">
          <div className="relative">
            <Swords className="h-32 w-32 text-primary/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-bold text-primary">404</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Halaman Tidak Ditemukan</h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. 
            Mungkin halaman tersebut telah dipindahkan atau dihapus.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Kembali ke Beranda
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
        </div>
      </div>
    </div>
  )
} 