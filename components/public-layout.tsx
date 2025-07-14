import type React from "react"
import { Header } from "@/components/header"

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container">
        <Header />
      </div>
      <main className="flex-1 container pt-16">
        {children}
      </main>
      {/* Footer bisa ditambah di sini jika perlu */}
    </div>
  )
}