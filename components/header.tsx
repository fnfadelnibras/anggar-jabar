"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { HeaderMobile } from "@/components/header-mobile"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

const navigation = [
  { name: "Beranda", href: "/" },
  { name: "Atlet", href: "/athletes" },
  { name: "Wilayah", href: "/regions" },
  { name: "Tentang", href: "/about" },
  { name: "Kontak", href: "/contact" },
]

export function Header() {
  const pathname = usePathname()

  const navigationItems = useMemo(() => {
    return navigation.map((item) => {
      const isActive = pathname === item.href
      return {
        ...item,
        isActive
      }
    })
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image
              src="/Logo.svg"
              alt="IKASI JABAR Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <div className="flex flex-col">
              <span className="hidden font-bold sm:inline-block text-sm leading-tight">
                IKASI<span className="bg-gradient-to-r from-yellow-400 via-blue-500 to-green-500 bg-clip-text text-transparent">JABAR</span>
              </span>
            </div>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-colors hover:text-foreground/80 ${
                  item.isActive 
                    ? "text-foreground font-semibold border-b-2 border-primary" 
                    : "text-foreground/60"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        <HeaderMobile navigation={navigation} />
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link href="/" className="flex items-center space-x-2 md:hidden">
              <Image
                src="/Logo.svg"
                alt="IKASI JABAR Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <div className="flex flex-col">
                <span className="font-bold text-sm leading-tight">
                  IKASI<span className="bg-gradient-to-r from-yellow-400 via-blue-500 to-green-500 bg-clip-text text-transparent">JABAR</span>
                </span>
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

