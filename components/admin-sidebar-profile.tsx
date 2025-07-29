"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface AdminProfile {
  id: string
  name: string
  email: string
  avatar: string
}

export function AdminSidebarProfile() {
  const [profile, setProfile] = useState<AdminProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/admin/profile')
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
      }
    } catch (error) {
      console.error('Failed to fetch admin profile:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 mb-2">
        <Avatar className="h-8 w-8">
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
        <div className="flex-1 flex justify-center">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  const initials = profile?.name 
    ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'AD'

  return (
    <div className="flex items-center gap-2 mb-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={profile?.avatar || "/placeholder-user.jpg"} alt={profile?.name || "Admin"} />
        <AvatarFallback className="text-xs">{initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{profile?.name || "Admin User"}</p>
        <p className="text-xs text-muted-foreground truncate">Admin</p>
      </div>
    </div>
  )
} 