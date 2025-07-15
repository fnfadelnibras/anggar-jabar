import Link from "next/link";
import { Button } from "./ui/button";
import { Swords, ArrowRight } from "lucide-react";

export function Hero(){
  return (
    <section className="relative bg-gradient-to-r from-primary to-primary/80 text-white py-20">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center mb-6">
          <Swords className="h-16 w-16 text-white mr-4" />
          <div className="text-left">
            <h1 className="text-4xl md:text-6xl font-bold">IKASI JABAR</h1>
            <p className="text-xl md:text-2xl text-white/90">Ikatan Anggar Seluruh Indonesia Jawa Barat</p>
          </div>
        </div>
        <p className="text-lg md:text-xl mb-8 text-white/90">
          Sistem Manajemen Kompetisi Anggar Regional Jawa Barat
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="outline" asChild className="text-black">
            <Link href="/events">
              Lihat Event IKASI
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="default"
            className="text-white border-white hover:bg-white hover:text-primary"
            asChild
          >
            <Link href="/athletes">Profil Atlet IKASI</Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
  )

}
     