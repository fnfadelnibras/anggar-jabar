import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IKASI JABAR - Ikatan Anggar Seluruh Indonesia Jawa Barat",
  description: "Sistem manajemen kompetisi anggar IKASI Jawa Barat - Ikatan Anggar Seluruh Indonesia Jawa Barat",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}