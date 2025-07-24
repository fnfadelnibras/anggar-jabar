import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

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
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}