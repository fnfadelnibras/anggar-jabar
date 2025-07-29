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
  Bell,
  Search,
  LogOut,
  User,
  Menu,
  BarChart3,
  FileText,
  Clock,
  AlertCircle,
  Swords,
  UserPlus,
  History,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AdminProfileDropdown } from "@/components/admin-profile-dropdown"
import { AdminSidebarProfile } from "@/components/admin-sidebar-profile"


export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Simplified menu items without role-based access control
  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
    },
    {
      title: "Regions",
      icon: Map,
      href: "/admin/regions",
    },
    {
      title: "Athletes",
      icon: Users,
      href: "/admin/athletes",
    },
    {
      title: "Admins",
      icon: Shield,
      href: "/admin/admins",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/admin/settings",
    },
  ]

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
            <AdminSidebarProfile />
          </div>
          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => (
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
      <div className="flex flex-1 flex-col md:pl-64">
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
                  <AdminSidebarProfile />
                </div>
                <nav className="flex flex-col gap-1">
                  {menuItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                        pathname === item.href || (item.href === "/admin" && pathname === "/admin")
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  ))}
                </nav>
              </ScrollArea>
            </SheetContent>
          </Sheet>

          <div className="w-full flex items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[240px] lg:w-[320px]"
              />
            </div>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuContent align="end" className="w-[300px]">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-[300px] overflow-auto">
                    <DropdownMenuItem className="flex flex-col items-start cursor-pointer">
                      <div className="font-medium">New athlete registered</div>
                      <div className="text-sm text-muted-foreground">2 hours ago</div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex flex-col items-start cursor-pointer">
                      <div className="font-medium">Match results submitted</div>
                      <div className="text-sm text-muted-foreground">5 hours ago</div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex flex-col items-start cursor-pointer">
                      <div className="font-medium">System maintenance scheduled</div>
                      <div className="text-sm text-muted-foreground">1 day ago</div>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="justify-center cursor-pointer">View all notifications</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <AdminProfileDropdown />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
