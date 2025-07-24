"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Swords } from "lucide-react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: "Beranda", href: "/" },
    // { name: "Event", href: "/events" },
    { name: "Atlet", href: "/athletes" },
    // { name: "Pertandingan", href: "/matches" },
    // { name: "Hasil", href: "/results" },
    { name: "Wilayah", href: "/regions" },
    { name: "Tentang", href: "/about" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Swords className="h-6 w-6 text-primary" />
            <div className="flex flex-col">
              <span className="hidden font-bold sm:inline-block text-sm leading-tight">IKASI JABAR</span>
            </div>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base  focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5 transition-transform duration-200" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-2/6 max-w-[150px] pr-0">
            <SheetHeader>
                <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                <Swords className="mr-2 h-4 w-4 text-primary" />
                <div className="flex flex-col">
                  <span className="font-bold text-sm leading-tight">IKASI JABAR</span>
                </div>
              </Link>
              <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                <div className="flex flex-col space-y-3">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-foreground/60 transition-colors hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link href="/" className="flex items-center space-x-2 md:hidden">
              <Swords className="h-6 w-6 text-primary" />
              <div className="flex flex-col">
                <span className="font-bold text-sm leading-tight">IKASI JABAR</span>
              </div>
            </Link>
          </div>
          <nav className="flex items-center space-x-2">
            <Button asChild>
              <Link href="/login">Masuk Admin</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}

