"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Image from "next/image"

interface NavigationItem {
  name: string
  href: string
}

interface HeaderMobileProps {
  navigation: NavigationItem[]
}

export function HeaderMobile({ navigation }: HeaderMobileProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-5 w-5 transition-transform duration-200" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-2/6 max-w-[150px] pr-0">
        <SheetHeader>
          <SheetTitle asChild>
            <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
              <Image
                src="/Logo.svg"
                alt="IKASI JABAR Logo"
                width={24}
                height={24}
                className="mr-2 h-6 w-6"
              />
              <div className="flex flex-col">
                <span className="font-bold text-sm leading-tight">IKASI JABAR</span>
              </div>
            </Link>
          </SheetTitle>
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
  )
} 