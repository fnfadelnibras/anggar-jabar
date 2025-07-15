"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sword,
  LayoutDashboard,
  Users,
  Map,
  Calendar,
  Medal,
  UserCog,
  Settings,
  Menu,
  BarChart3,
  FileText,
  Clock,
  AlertCircle,
  Swords,
  UserPlus,
  History,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

type AdminLayoutProps = {
  children: React.ReactNode
  userRole?: "superadmin" | "admin_kontingen" | "admin_kegiatan"
}

export function AdminLayout({ children, userRole = "superadmin" }: AdminLayoutProps) {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
      roles: ["superadmin", "admin_kontingen", "admin_kegiatan"],
    },
    {
      title: "Regions",
      icon: Map,
      href: "/admin/regions",
      roles: ["superadmin", "admin_kontingen"],
    },
    {
      title: "Athletes",
      icon: Users,
      href: "/admin/athletes",
      roles: ["superadmin", "admin_kontingen"],
    },
    {
      title: "Athlete Registration",
      icon: UserPlus,
      href: "/admin/athlete-registration",
      roles: ["admin_kontingen"],
    },
    {
      title: "Events",
      icon: Calendar,
      href: "/admin/events",
      roles: ["superadmin", "admin_kegiatan"],
    },
    {
      title: "Matches",
      icon: Swords,
      href: "/admin/matches",
      roles: ["superadmin", "admin_kegiatan"],
    },
    {
      title: "Winners",
      icon: Medal,
      href: "/admin/winners",
      roles: ["superadmin", "admin_kegiatan"],
    },
    {
      title: "Users",
      icon: UserCog,
      href: "/admin/users",
      roles: ["superadmin"],
    },
    {
      title: "Activity Log",
      icon: History,
      href: "/admin/activity-log",
      roles: ["superadmin", "admin_kontingen", "admin_kegiatan"],
    },
    {
      title: "Reports",
      icon: BarChart3,
      href: "/admin/reports",
      roles: ["superadmin", "admin_kontingen", "admin_kegiatan"],
    },
    {
      title: "Documents",
      icon: FileText,
      href: "/admin/documents",
      roles: ["superadmin", "admin_kontingen", "admin_kegiatan"],
    },
    {
      title: "Schedule",
      icon: Clock,
      href: "/admin/schedule",
      roles: ["superadmin", "admin_kontingen", "admin_kegiatan"],
    },
    {
      title: "Issues",
      icon: AlertCircle,
      href: "/admin/issues",
      roles: ["superadmin"],
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/admin/settings",
      roles: ["superadmin", "admin_kontingen", "admin_kegiatan"],
    },
  ]

  const filteredMenuItems = menuItems.filter((item) => item.roles.includes(userRole))

  if (!isMounted) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - Desktop */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r bg-background md:block">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <Sword className="h-6 w-6 text-primary" />
            <span className="font-bold">Indonesia Fencing</span>
          </Link>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)] px-3 py-4">
          <div className="mb-4 px-4">
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-sm">
                  {userRole === "superadmin"
                    ? "Super Admin"
                    : userRole === "admin_kontingen"
                      ? "Jakarta Admin"
                      : "Event Admin"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {userRole === "superadmin"
                    ? "Full Access"
                    : userRole === "admin_kontingen"
                      ? "Region Access"
                      : "Event Access"}
                </div>
              </div>
            </div>
            <Badge className="w-full justify-center mt-1" variant="outline">
              {userRole === "superadmin"
                ? "Super Admin"
                : userRole === "admin_kontingen"
                  ? "Region Admin"
                  : "Event Admin"}
            </Badge>
          </div>
          <nav className="flex flex-col gap-1">
            {filteredMenuItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                  pathname === item.href || (item.href === "/admin" && pathname === "/admin")
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:pl-64 min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex h-16 items-center border-b px-6">
                <Link href="/admin" className="flex items-center gap-2">
                  <Sword className="h-6 w-6 text-primary" />
                  <span className="font-bold">Indonesia Fencing</span>
                </Link>
              </div>
              <ScrollArea className="h-[calc(100vh-4rem)] px-3 py-4">
                <div className="mb-4 px-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="Admin" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">
                        {userRole === "superadmin"
                          ? "Super Admin"
                          : userRole === "admin_kontingen"
                            ? "Jakarta Admin"
                            : "Event Admin"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {userRole === "superadmin"
                          ? "Full Access"
                          : userRole === "admin_kontingen"
                            ? "Region Access"
                            : "Event Access"}
                      </div>
                    </div>
                  </div>
                  <Badge className="w-full justify-center mt-1" variant="outline">
                    {userRole === "superadmin"
                      ? "Super Admin"
                      : userRole === "admin_kontingen"
                        ? "Region Admin"
                        : "Event Admin"}
                  </Badge>
                </div>
                <nav className="flex flex-col gap-1">
                  {filteredMenuItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                        pathname === item.href || (item.href === "/admin" && pathname === "/admin")
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  ))}
                </nav>
              </ScrollArea>
            </SheetContent>
          </Sheet>
          <div className="flex-1 flex justify-end">
            {/* Tambahkan konten header kanan di sini jika perlu */}
          </div>
        </header>
        <main className="flex-1 p-6 min-w-0">{children}</main>
      </div>
    </div>
  )
}